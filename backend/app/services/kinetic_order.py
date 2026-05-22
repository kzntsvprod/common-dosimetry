import math
import numpy as np

# Функція інтенсивності світіння
def integral_func(T_K, kB, epsilon):
    if T_K == 0: return 0
    return math.exp(-epsilon / (kB * T_K))

# Чисельне інтегрування методом Сімпсона
def simpson_rule(f, a, b_limit, n, kB, epsilon):
    if n % 2 != 0: n += 1
    if n <= 0: return 0
    h = (b_limit - a) / n
    result = f(a, kB, epsilon) + f(b_limit, kB, epsilon)
    for i in range(1, n):
        x = a + i * h
        coef = 2 if i % 2 == 0 else 4
        result += coef * f(x, kB, epsilon)
    return result * h / 3

# Генерація кривої по методу Сімпсона
def generate_curve_simpson(T_K, s, beta, epsilon, b):
    # Стала Больцмана
    kB = 8.6173e-5
    T0 = T_K[0]
    I_array = []

    # Розрахунок ефективного коефіцієнта
    k_eff = s / beta

    for T in T_K:
        int_val = 0
        if T > T0:
            int_val = simpson_rule(integral_func, T0, T, 100, kB, epsilon)

        if abs(b - 1.0) < 0.001:
            I_val = k_eff * math.exp(-epsilon / (kB * T)) * math.exp(-k_eff * int_val)
        else:
            base = 1 + k_eff * (b - 1) * int_val
            base = max(base, 1e-10)
            I_val = k_eff * math.exp(-epsilon / (kB * T)) * math.pow(base, -b / (b - 1))
        I_array.append(I_val)
    return np.array(I_array)

# Генерація кривої за векторним інтегруванням
def generate_curve_fast(T_K, s, beta, epsilon, b):
    # Стала Больцмана
    kB = 8.6173e-5
    integrand = np.exp(-epsilon / (kB * T_K))
    delta_T = np.diff(T_K)
    avg_integrand = (integrand[:-1] + integrand[1:]) / 2.0
    step_areas = delta_T * avg_integrand

    cum_int = np.zeros_like(T_K)
    cum_int[1:] = np.cumsum(step_areas)

    # Розрахунок ефективного коефіцієнта
    k_eff = s / beta

    if abs(b - 1.0) < 0.001:
        I_array = k_eff * integrand * np.exp(-k_eff * cum_int)
    else:
        base = 1 + k_eff * (b - 1) * cum_int
        base = np.maximum(base, 1e-10)
        I_array = k_eff * integrand * np.power(base, -b / (b - 1))
    return I_array

# Перемикач режиму генерації теоретичної кривої
def generate_theoretical_curve(T_array, s, beta, epsilon, b, fast_mode=True):
    if fast_mode:
        return generate_curve_fast(T_array, s, beta, epsilon, b)
    else:
        return generate_curve_simpson(T_array, s, beta, epsilon, b)


# Знаходження параметрів оберненої задачі
def find_parameters_for_target_peak(x_exp, y_clean, max_y_exp, area_exp, T_K, beta, eps_bounds=(0.1, 2.0), s_exp_bounds=(1.0, 20.5), method="fast"):
    best_fom = float('inf')
    best_params = None
    best_curve = None
    best_delta_S = float('inf')

    # Прапорець для обраного методу
    is_fast_mode = (method == "fast")

    # Межі
    eps_min, eps_max = eps_bounds
    exp_min, exp_max = s_exp_bounds

    # Налаштування етапів сіткового пошуку
    stages = [
        (0.2, 0.05, 0.5, None, None, None),
        (0.05, 0.01, 0.1, 0.4, 0.15, 1.0),
        (0.01, 0.002, 0.02, 0.1, 0.03, 0.3),
        (0.002, 0.0005, 0.005, 0.03, 0.005, 0.1)
    ]

    # Динамічні початкові центри
    current_center_b = 1.5
    current_center_eps = (eps_min + eps_max) / 2.0
    current_center_exp = (exp_min + exp_max) / 2.0

    for stage_idx, (b_step, eps_step, exp_step_size, b_rad, eps_rad, exp_rad) in enumerate(stages):
        if stage_idx == 0:
            b_range = np.arange(1.0, 2.1, b_step)
            eps_range = np.arange(eps_min, eps_max + eps_step * 0.1, eps_step)
            exp_range = np.arange(exp_min, exp_max + exp_step_size * 0.1, exp_step_size)
        else:
            b_range = np.arange(max(1.0, current_center_b - b_rad), min(2.1, current_center_b + b_rad), b_step)
            eps_range = np.arange(max(eps_min, current_center_eps - eps_rad), min(eps_max, current_center_eps + eps_rad), eps_step)
            exp_range = np.arange(max(exp_min, current_center_exp - exp_rad), min(exp_max, current_center_exp + exp_rad), exp_step_size)

        for b in b_range:
            for epsilon in eps_range:
                for exp_step in exp_range:
                    s = 10 ** exp_step

                    I_raw = generate_theoretical_curve(T_K, s, beta, epsilon, b, fast_mode=is_fast_mode)
                    max_I_raw = np.max(I_raw)

                    if max_I_raw <= 0 or math.isnan(max_I_raw) or math.isinf(max_I_raw):
                        continue

                    scale_factor = max_y_exp / max_I_raw
                    I_scaled = I_raw * scale_factor

                    fom = np.sum(np.abs(y_clean - I_scaled)) / np.sum(y_clean) * 100

                    if fom < best_fom:
                        # Підтримка різних версій numpy
                        try:
                            area_th = np.trapezoid(I_scaled, x_exp)
                        except AttributeError:
                            area_th = np.trapz(I_scaled, x_exp)

                        delta_S = abs(area_exp - area_th) / area_exp * 100

                        best_fom = fom
                        best_delta_S = delta_S
                        best_params = (exp_step, epsilon, b)
                        best_curve = I_scaled

        if best_params:
            current_center_exp, current_center_eps, current_center_b = best_params

    return best_params, best_fom, best_delta_S, best_curve

# Розбиття та очищення даних
def parse_and_clean_data(file_content: str):
    x_data, y_data = [], []
    lines = file_content.splitlines()

    for line in lines:
        line = line.strip()
        if not line: continue

        if ';' in line:
            parts = line.split(';')
        elif '\t' in line:
            parts = line.split('\t')
        else:
            parts = line.split()

        if len(parts) < 2 and ',' in line:
            parts = line.split(',')

        parts = [p.strip() for p in parts if p.strip()]

        if len(parts) >= 2:
            try:
                x_val = float(parts[0].replace(',', '.'))
                y_val = float(parts[1].replace(',', '.'))
                x_data.append(x_val)
                y_data.append(y_val)
            except ValueError:
                continue

    x_exp = np.array(x_data)
    y_exp = np.array(y_data)

    if len(x_exp) == 0 or len(y_exp) == 0:
        raise ValueError("Не вдалося зчитати дані. Перевірте формат або розділювачі.")

    background_level = y_exp[0]

    y_clean = np.maximum(y_exp - background_level, 0)

    return x_exp, y_exp, y_clean

# Запуск програми
def process_optimization(
        file_content: str,
        beta: float = 1.0,
        eps_min: float = 0.1,
        eps_max: float = 2.0,
        s_exp_min: float = 1.0,
        s_exp_max: float = 20.5,
        method: str = "fast"
) -> dict:
    x_exp, y_raw, y_clean = parse_and_clean_data(file_content)
    T_K = x_exp + 273.15
    max_y_exp = np.max(y_clean)

    # Підтримка різних версій numpy
    try:
        area_exp = np.trapezoid(y_clean, x_exp)
    except AttributeError:
        area_exp = np.trapz(y_clean, x_exp)

    best_params, best_fom, best_delta_S, best_curve = find_parameters_for_target_peak(
        x_exp, y_clean, max_y_exp, area_exp, T_K, beta,
        eps_bounds=(eps_min, eps_max),
        s_exp_bounds=(s_exp_min, s_exp_max),
        method=method
    )

    if not best_params:
        raise ValueError("Не вдалося знайти оптимальні параметри в заданих межах.")

    best_exp_step, best_epsilon, best_b = best_params

    best_s = 10 ** best_exp_step

    # Ефективний коефіцієнт
    best_k1_effective = best_s / beta

    best_accuracy = 100 - best_fom
    ss_res = np.sum((y_clean - best_curve) ** 2)
    ss_tot = np.sum((y_clean - np.mean(y_clean)) ** 2)
    r_squared = (1 - (ss_res / ss_tot)) * 100

    peak_idx = int(np.argmax(best_curve))

    return {
        "parameters": {
            "s": float(best_s),
            "k1_effective": float(best_k1_effective),
            "beta": float(beta),
            "epsilon": float(best_epsilon),
            "b": float(best_b)
        },
        "metrics": {
            "fom": float(best_fom),
            "accuracy": float(best_accuracy),
            "r_squared": float(r_squared),
            "delta_s": float(best_delta_S)
        },
        "peak": {
            "temperature": float(x_exp[peak_idx]),
            "intensity": float(best_curve[peak_idx])
        },
        "chart_data": {
            "temperature": x_exp.tolist(),
            "experimental_intensity": y_clean.tolist(),
            "theoretical_intensity": best_curve.tolist()
        }
    }
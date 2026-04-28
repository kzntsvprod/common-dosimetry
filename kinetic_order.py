import math
import numpy as np
import matplotlib.pyplot as plt
import tkinter as tk
from tkinter import filedialog

# Отримання шляху до файлу
def select_file():
    root = tk.Tk()
    root.withdraw()
    root.attributes('-topmost', True)
    filepath = filedialog.askopenfilename(
        title="Оберіть файл з даними (.txt або .csv)",
        filetypes=(("Text and CSV", "*.txt *.csv"), ("All files", "*.*"))
    )
    return filepath

# Завантаження файлу та очищення фону
def load_and_clean_data(filepath):
    x_data, y_data = [], []
    if not filepath: return None, None, None

    with open(filepath, 'r', encoding='utf-8') as file:
        for line in file:
            line = line.strip()
            if not line: continue
            # Визначення розділювача і розбиття рядка
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
        print("Помилка: Не вдалося зчитати дані з файлу. Перевірте формат або розділювачі.")
        return None, None, None

    # Очищення фону
    slope = (y_exp[-1] - y_exp[0]) / (x_exp[-1] - x_exp[0])
    intercept = y_exp[0] - slope * x_exp[0]
    background = slope * x_exp + intercept
    y_clean = np.maximum(y_exp - background, 0)

    return x_exp, y_exp, y_clean

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
def generate_curve_simpson(T_K, k1, epsilon, b):
    # Стала Больцмана
    kB = 8.6173e-5
    T0 = T_K[0]
    I_array = []
    for T in T_K:
        int_val = 0
        if T > T0:
            int_val = simpson_rule(integral_func, T0, T, 100, kB, epsilon)

        if abs(b - 1.0) < 0.001:
            I_val = k1 * math.exp(-epsilon / (kB * T)) * math.exp(-k1 * int_val)
        else:
            base = 1 + k1 * (b - 1) * int_val
            base = max(base, 1e-10)
            I_val = k1 * math.exp(-epsilon / (kB * T)) * math.pow(base, -b / (b - 1))
        I_array.append(I_val)
    return np.array(I_array)

# Генерація кривої за векторним інтегруванням
def generate_curve_fast(T_K, k1, epsilon, b):
    # Стала Больцмана
    kB = 8.6173e-5
    integrand = np.exp(-epsilon / (kB * T_K))
    delta_T = np.diff(T_K)
    avg_integrand = (integrand[:-1] + integrand[1:]) / 2.0
    step_areas = delta_T * avg_integrand

    cum_int = np.zeros_like(T_K)
    cum_int[1:] = np.cumsum(step_areas)

    if abs(b - 1.0) < 0.001:
        I_array = k1 * integrand * np.exp(-k1 * cum_int)
    else:
        base = 1 + k1 * (b - 1) * cum_int
        base = np.maximum(base, 1e-10)
        I_array = k1 * integrand * np.power(base, -b / (b - 1))
    return I_array

# Перемикач режиму генерації теоретичної кривої
def generate_theoretical_curve(T_array, k1, epsilon, b, fast_mode=True):
    if fast_mode:
        return generate_curve_fast(T_array, k1, epsilon, b)
    else:
        return generate_curve_simpson(T_array, k1, epsilon, b)

# Знаходження параметрів оберненої задачі
def find_parameters_for_target_peak(x_exp, y_clean, max_y_exp, area_exp, T_K):
    best_fom = float('inf')
    best_params = None
    best_curve = None
    best_delta_S = float('inf')

    # Налаштування етапів
    stages = [
        (0.2, 0.05, 0.5, None, None, None),
        (0.05, 0.01, 0.1, 0.4, 0.15, 1.0),
        (0.01, 0.002, 0.02, 0.1, 0.03, 0.3),
        (0.002, 0.0005, 0.005, 0.03, 0.005, 0.1)
    ]

    current_center_b = 1.5
    current_center_eps = 1.05
    current_center_exp = 11.5

    print("\nПошук параметрів")

    for stage_idx, (b_step, eps_step, exp_step_size, b_rad, eps_rad, exp_rad) in enumerate(stages):
        print(f"\nЕТАП №{stage_idx + 1} (звуження кроку)")

        if stage_idx == 0:
            b_range = np.arange(1.0, 2.1, b_step)
            eps_range = np.arange(0.9, 2.0, eps_step)
            exp_range = np.arange(10.0, 13.5, exp_step_size)
        else:
            b_range = np.arange(max(1.0, current_center_b - b_rad), min(2.1, current_center_b + b_rad), b_step)
            eps_range = np.arange(max(0.9, current_center_eps - eps_rad), min(2.0, current_center_eps + eps_rad), eps_step)
            exp_range = np.arange(max(10.0, current_center_exp - exp_rad), min(13.5, current_center_exp + exp_rad), exp_step_size)

        for b in b_range:
            for epsilon in eps_range:
                for exp_step in exp_range:
                    k1 = 10 ** exp_step

                    I_raw = generate_theoretical_curve(T_K, k1, epsilon, b, fast_mode=True)
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
                        print(f"Новий лідер: k1=10^{exp_step:.2f}, eps={epsilon:.3f}, b={b:.2f} | FOM: {fom:.2f}%")

        if best_params:
            current_center_exp, current_center_eps, current_center_b = best_params

    return best_params, best_fom, best_delta_S, best_curve

# Запуск програми
def run_optimization():
    filepath = select_file()
    if not filepath: return

    x_exp, y_raw, y_clean = load_and_clean_data(filepath)
    if x_exp is None: return

    T_K = x_exp + 273.15
    max_y_exp = np.max(y_clean)

    # Підтримка різних версій numpy
    try:
        area_exp = np.trapezoid(y_clean, x_exp)
    except AttributeError:
        area_exp = np.trapz(y_clean, x_exp)

    best_params, best_fom, best_delta_S, best_curve = find_parameters_for_target_peak(
        x_exp, y_clean, max_y_exp, area_exp, T_K
    )

    if best_params:
        best_exp_step, best_epsilon, best_b = best_params
        best_k1 = 10 ** best_exp_step
        best_accuracy = 100 - best_fom
        ss_res = np.sum((y_clean - best_curve) ** 2)
        ss_tot = np.sum((y_clean - np.mean(y_clean)) ** 2)
        r_squared = (1 - (ss_res / ss_tot)) * 100

        print("\nОптимізацію завершено")
        print("\nРезультати:\n")
        print(f"k1: {best_k1:.2e}")
        print(f"Epsilon: {best_epsilon:.4f} еВ")
        print(f"Порядок b: {best_b:.4f}")
        print(f"Кінцевий FOM: {best_fom:.2f}%")
        print(f"Точність підгонки: {best_accuracy:.2f}%")
        print(f"R-квадрат: {r_squared:.2f}%")
        print(f"Кінцева Delta S: {best_delta_S:.2f}%")

        plt.figure(figsize=(10, 6))
        plt.plot(x_exp, y_clean, 'o', color='gray', markersize=3, label='Експеримент (очищений)')
        plt.plot(x_exp, best_curve, 'r-', linewidth=2.5, label=f'Модель (Точність: {best_accuracy:.2f}%)')

        peak_idx = np.argmax(best_curve)
        peak_T = x_exp[peak_idx]
        peak_I = best_curve[peak_idx]

        # Малювання вершини
        plt.plot(peak_T, peak_I, 'ro', markersize=6)

        # Математичний підпис поруч із крапкою
        plt.annotate(f'$T_{{max}} = {peak_T:.1f}°C$\n$I_{{max}} = {peak_I:.1f}$',
                     xy=(peak_T, peak_I),
                     xytext=(10, 0),
                     textcoords="offset points",
                     va='center',
                     color='darkred',
                     fontsize=10,
                     fontweight='bold')

        info_text = (
            f"Знайдені параметри:\n"
            f"$k_1 = {best_k1:.2e}\\ с^{{-1}}$\n"
            f"$\\epsilon = {best_epsilon:.4f}$ еВ\n"
            f"$b = {best_b:.4f}$\n"
            f"-------------------\n"
            f"FOM: {best_fom:.2f}%\n"
            f"$R^2$: {r_squared:.2f}%\n"
            f"$\\Delta S$: {best_delta_S:.2f}%"
        )

        plt.text(0.05, 0.95, info_text, transform=plt.gca().transAxes, fontsize=11,
                 verticalalignment='top',
                 bbox=dict(boxstyle='round,pad=0.5', facecolor='white', edgecolor='gray', alpha=0.9))

        plt.title('Апроксимація кривої світіння', fontsize=14, pad=15)
        plt.xlabel('Температура (°C)', fontsize=12)
        plt.ylabel('Інтенсивність світіння', fontsize=12)
        plt.legend(loc='best', fontsize=11)
        plt.grid(True, linestyle='--', alpha=0.5)
        plt.tight_layout()
        plt.show()
    else:
        print("\nНе вдалося знайти параметри.")

# Точка входу в програму
if __name__ == '__main__':
    run_optimization()
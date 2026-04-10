import math
import matplotlib.pyplot as plt

# Фізичні параметри дозиметричної моделі
T0 = 2.5e-2

# Функція інтенсивності світіння
def integral_func(x, k1, epsilon):
    if x == 0: return 0
    return k1 * math.exp(-epsilon / x)

# Чисельне інтегрування методом Сімпсона
def simpson_rule(f, a, b, n, k1, epsilon):
    if n % 2 != 0: n += 1
    if n <= 0: return 0
    h = (b - a) / n
    result = f(a, k1, epsilon) + f(b, k1, epsilon)
    for i in range(1, n):
        x = a + i * h
        coef = 2 if i % 2 == 0 else 4
        result += coef * f(x, k1, epsilon)
    return result * h / 3

# Обчислення інтеграла у межах [T0, T]
def integral(T, k1, epsilon):
    if T > T0:
        return simpson_rule(integral_func, T0, T, 1000, k1, epsilon)
    return 0

# Алгоритм динамічного пошуку температурного піка (T_max)
def find_peak_dynamic(k1, epsilon, max_T=2.0):
    # Спочатку швидко (0.01), потім дуже точно (0.0001)
    steps = [0.01, 0.0001]
    T_current = T0
    best_I = -1.0

    for step in steps:
        T = T_current + step

        # Обчислення інтенсивності для стартової точки етапу
        int_val = integral(T_current, k1, epsilon)
        I_prev = k1 * math.exp(-epsilon / T_current) * math.exp(-int_val)

        while T <= max_T:
            int_val = integral(T, k1, epsilon)
            I_current = k1 * math.exp(-epsilon / T) * math.exp(-int_val)

            if I_current < I_prev:
                # Після знаходження спаду відступ на один крок назад
                T_current = T - step
                best_I = I_prev
                break  # Зупинка циклу і перехід до наступного, дрібнішого кроку з масиву steps

            I_prev = I_current
            T += step

        else:
            # Якщо піку так і не було
            return None, None

    return round(T_current, 4), best_I

# Знаходження параметрів (k1 та eps) для певної температури
def find_parameters_for_target_peak(target_T, tolerance=0.05):
    print(f"Пошук параметрів для піку біля T = {target_T}...")

    # Перебір порядків величини для частотного фактору (k1)
    for exp in range(0, 16):
        k1 = 10 ** exp
        for e in range(1, 16):
            epsilon = e / 10.0

            peak_T, peak_I = find_peak_dynamic(k1, epsilon)

            if peak_T is not None and abs(peak_T - target_T) <= tolerance:
                print(f"  -> Знайдено: k1 = 10^{exp}, epsilon = {epsilon:.1f} (Пік при T = {peak_T:.4f})")
                return (k1, epsilon, f"Пік T~{target_T}")

    print(f"  -> Не знайдено параметрів для T = {target_T}")
    return None

# Візуалізація кривих термолюмінесценції
def plot_results(curves_to_plot):
    if not curves_to_plot:
        print("Немає даних для побудови графіка.")
        return

    plt.figure(figsize=(10, 6))
    colors = ['red', 'blue', 'green', 'orange']

    for idx, (k1, epsilon, label) in enumerate(curves_to_plot):
        peak_T, peak_I = find_peak_dynamic(k1, epsilon)

        if not peak_T:
            continue

        T_max_plot = peak_T * 1.5

        T_values = []
        I_values = []
        current_T = T0
        step = (T_max_plot - T0) / 200

        while current_T <= T_max_plot:
            int_val = integral(current_T, k1, epsilon)
            I = k1 * math.exp(-epsilon / current_T) * math.exp(-int_val)

            T_values.append(current_T)
            I_values.append(I)
            current_T += step

        color = colors[idx % len(colors)]
        plt.plot(T_values, I_values, linewidth=2, color=color, label=f'{label} (k1 = {k1:.0e}, eps = {epsilon})')
        plt.fill_between(T_values, I_values, color='gray', alpha=0.2)

        plt.plot(peak_T, peak_I, 'ro')
        plt.text(peak_T, peak_I * 1.05, f' T = {peak_T:.4f}\n I = {peak_I:.2f}', color=color)

    plt.title('Залежність інтенсивності світіння I(T) для різних k1 та epsilon')
    plt.xlabel('Температура (T)')
    plt.ylabel('Інтенсивність світіння (I)')
    plt.grid(True, linestyle='--')
    plt.tight_layout()
    plt.legend()

    plt.show()

# Запуск програми
def run_dosimetry_analysis():
    curves_to_plot = []

    # Тестове завдання
    print("1. Аналіз тестового випадку (k1 = 10^13, eps = 1.2)")
    curves_to_plot.append((1e13, 1.2, "Тест"))
    print("Виконано!")

    # Обернена задача для фіксованих точок
    print("\n2. Виконання оберненої задачі пошуку")
    targets = [0.5, 0.8]
    for target in targets:
        found_params = find_parameters_for_target_peak(target_T=target, tolerance=0.05)
        if found_params:
            curves_to_plot.append(found_params)
    print("Виконано!")

    # Виклик малювання
    print("\n3. Будування підсумкової графіки")
    plot_results(curves_to_plot)
    print("Виконано!")

# Точка входу в програму
if __name__ == '__main__':
    run_dosimetry_analysis()
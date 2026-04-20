import math
import matplotlib.pyplot as plt

# Фізичні параметри дозиметричної моделі
T0 = 1.84e-2

# Функція інтенсивності світіння
def integral_func(x, k1, epsilon):
    if x == 0: return 0
    return math.exp(-epsilon / x)

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
        return simpson_rule(integral_func, T0, T, 100, k1, epsilon)
    return 0

# Алгоритм динамічного пошуку температурного піка (T_max)
def find_peak_dynamic(k1, epsilon, max_T=4.0e-2):
    # Спочатку швидко (0.001), потім дуже точно (0.0001)
    steps = [0.001, 0.0001]
    T_current = T0

    final_best_T = T0
    final_best_I = -1.0

    for step in steps:
        T = T_current

        # Змінні для відстеження абсолютного максимуму на поточному етапі
        best_T_stage = T
        best_I_stage = -1.0
        drop_count = 0

        while T <= max_T:
            int_val = integral(T, k1, epsilon)
            I_current = k1 * math.exp(-epsilon / T) * pow((1 + k1 * int_val), -2)

            # Якщо знайшлась нова вершина - запам'ятати
            if I_current > best_I_stage:
                best_I_stage = I_current
                best_T_stage = T
                drop_count = 0  # Скидання лічильника падінь
            else:
                drop_count += 1
                # Якщо інтенсивність впала 2 рази поспіль - алгоритм перевалив за пік
                if drop_count >= 2:
                    break

            T += step

        # Старт для наступного (точнішого) кроку
        # Два кроки назад, щоб гарантовано його не пропустити екстремум
        T_current = best_T_stage - (step * 2)
        if T_current < T0:
            T_current = T0

        final_best_T = best_T_stage
        final_best_I = best_I_stage

    return round(final_best_T, 4), final_best_I

# Знаходження параметрів (k1 та eps) для певної температури
def find_parameters_for_target_peak(target_T, tolerance=0.0005):
    print(f"\nПошук масиву параметрів для піку біля T = {target_T}...")

    valid_pairs = []

    # Перебір порядків величини для частотного фактору (k1)
    for exp_step in range(10, 17):
        k1 = 10 ** exp_step

        for e in range(3, 16):
            epsilon = e / 10.0

            peak_T, peak_I = find_peak_dynamic(k1, epsilon)

            if peak_T is not None:
                diff = abs(peak_T - target_T)

                # Якщо пік потрапляє в допуск
                if diff <= tolerance:
                    valid_pairs.append((k1, epsilon, f"T~{target_T}"))

    if not valid_pairs:
        print(f"  -> Не знайдено параметрів для T = {target_T}")
        return []

    # Вивід усього масиву в консоль
    print(f"  -> Знайдено масив із {len(valid_pairs)} пар {{k1, eps}}:")
    for p in valid_pairs:
        print(f"     {{ k1 = {p[0]:.2e}, eps = {p[1]:.1f} }}")

    # Відбирання лише кількох значень для красивого графіка
    if len(valid_pairs) > 3:
        # Перша, середня й остання пари (щоб показати різницю кривих)
        subset_for_plot = [valid_pairs[0], valid_pairs[len(valid_pairs) // 2], valid_pairs[-1]]
    else:
        subset_for_plot = valid_pairs

    print(f"  -> На графік буде виведено {len(subset_for_plot)} найхарактерніші криві з цього масиву.")
    return subset_for_plot

# Візуалізація кривих термолюмінесценції
def plot_results(curves_to_plot):
    if not curves_to_plot:
        print("Немає даних для побудови графіка.")
        return

    plt.figure(figsize=(10, 6))
    colors = ['red', 'blue', 'green', 'orange', 'purple', 'cyan', 'brown']

    for idx, (k1, epsilon, label) in enumerate(curves_to_plot):
        peak_T, peak_I = find_peak_dynamic(k1, epsilon)

        if not peak_T:
            continue

        T_max_plot = 4e-2

        T_celsius_values = []
        I_values = []
        current_T = T0
        step_plot = 0.0001
        next_print_T = T0

        while current_T <= T_max_plot:
            int_val = integral(current_T, k1, epsilon)
            I = k1 * math.exp(-epsilon / current_T) * pow((1 + k1 * int_val), -2)

            T_celsius = current_T / 6.28e-5 - 273

            T_celsius_values.append(T_celsius)
            I_values.append(I)
            # Округлення для уникнення проблем з десятковою частиною
            current_T = round(current_T + step_plot, 5)

        color = colors[idx % len(colors)]

        plt.plot(T_celsius_values, I_values, linewidth=2, color=color, label=f'{label} (k1={k1:.1e}, eps={epsilon})')
        plt.fill_between(T_celsius_values, I_values, color='gray', alpha=0.1)

        peak_T_celsius = peak_T / 6.28e-5 - 273

        plt.plot(peak_T_celsius, peak_I, 'ro', markersize=5)
        plt.annotate(f' T={peak_T_celsius:.1f}°C\n I={peak_I:.1f}', (peak_T_celsius, peak_I),
                     textcoords="offset points", xytext=(8, 0), va='center', color=color, fontsize=9)

    plt.title('Залежність інтенсивності світіння I(T)')
    plt.xlabel('Температура (°C)')
    plt.ylabel('Інтенсивність світіння (I)')
    plt.grid(True, linestyle='--')

    plt.legend(loc='best')
    plt.tight_layout()

    plt.show()

# Запуск програми
def run_dosimetry_analysis():
    curves_to_plot = []

    # Тестове завдання
    print("1. Аналіз тестового випадку (k1 = 10^13, eps = 0.9)")
    curves_to_plot.append((1e13, 0.9, "Тест"))
    print("Виконано!")

    # Обернена задача для фіксованих точок
    print("\n2. Виконання оберненої задачі пошуку")
    targets = [3e-2]
    for target in targets:
        # Функція виведе весь масив у консоль, але поверне лише кілька кривих для малювання
        found_subset = find_parameters_for_target_peak(target_T=target, tolerance=0.0005)
        if found_subset:
            curves_to_plot.extend(found_subset)
    print("Виконано!")

    # Виклик малювання
    print("\n3. Будування підсумкової графіки")
    plot_results(curves_to_plot)
    print("Виконано!")

# Точка входу в програму
if __name__ == '__main__':
    run_dosimetry_analysis()
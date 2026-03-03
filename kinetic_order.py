import math
import matplotlib.pyplot as plt

# Константи
T0 = 2.5e-2
EPSILON = 1.7

# Масиви значень
k1_values = [1e12, 1e13, 1e14]
graphic_colors = ['red', 'green', 'blue']
graphic_labels = ['K1 = 10^12', 'K1 = 10^13', 'K1 = 10^14']

# Інтегрована функція
def integral_func(x, k1):
    if x == 0: return 0
    return k1 * math.exp(-EPSILON / x)

# Метод Сімпсона
def simpson_rule(f, a, b, n, k1):
    if n % 2 != 0: n += 1
    if n <= 0: return 0
    h = (b - a) / n

    result = f(a, k1) + f(b, k1)

    for i in range(1, n):
        x = a + i * h
        coef = 2 if i % 2 == 0 else 4
        result += coef * f(x, k1)

    return result * h / 3

# Обчислення інтегралу у межах [T0, T]
def integral(T, k1):
    if T > T0:
        return simpson_rule(integral_func, T0, T, 1000, k1)
    else:
        return 0

# Побудова графіка
def plot_graph():
    T_min = 1e-2
    T_max = 0.1

    step = 0.0001

    # Побудова графіку
    plt.figure(figsize=(10, 6))

    for k1, color, label in zip(k1_values, graphic_colors, graphic_labels):
        T_values = []
        I_values = []

        current_T = T_min
        while current_T <= T_max:
            # Результат інтегрування
            integral_val = integral(current_T, k1)

            # Головна формула I = K1 * math.exp(-EPSILON / T) * math.exp(-integral_val)
            I = k1 * math.exp(-EPSILON / current_T) * math.exp(-integral_val)

            T_values.append(current_T)
            I_values.append(I)

            current_T += step

        plt.plot(T_values, I_values, linewidth=2, color=color, label=label)

        # Зафарбування площі
        plt.fill_between(T_values, I_values, color='gray', alpha=0.2)

        # Знаходження піка графіку
        max_I = max(I_values)
        max_T = T_values[I_values.index(max_I)]
        plt.plot(max_T, max_I, 'ro')
        plt.text(max_T, max_I * 1.02, f' T={max_T:.4f}', color=color)

    plt.title(f'Залежність інтенсивності світіння від температури I(T)')
    plt.xlabel('Температура (T)')
    plt.ylabel('Інтенсивність світіння (I)')
    plt.grid(True, linestyle='--')
    plt.tight_layout()
    plt.legend()

    plt.show()

# Головна частина програми
if __name__ == '__main__':
    plot_graph()
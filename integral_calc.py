import math
import matplotlib.pyplot as plt

# Константи
T0 = 2.5e-2
EPSILON = 1.7
K1 = 1e13

# Інтегрована функція
def integral_func(x):
    if x == 0: return 0
    return K1 * math.exp(-EPSILON / x)

# Метод Сімпсона
def simpson_rule(f, a, b, n):
    if n % 2 != 0: n += 1
    if n <= 0: return 0
    h = (b - a) / n

    result = f(a) + f(b)

    for i in range(1, n):
        x = a + i * h
        coef = 2 if i % 2 == 0 else 4
        result += coef * f(x)

    return result * h / 3

# Обчислення інтегралу у межах [T0, T]
def integral(T):
    if T > T0:
        return simpson_rule(integral_func, T0, T, 1000)
    else:
        return 0

# Побудова графіка
def plot_graph():
    T_min = 1e-2
    T_max = 0.1

    T_values = []
    I_values = []

    step = 0.0001

    current_T = T_min
    while current_T <= T_max:
        # Результат інтегрування
        integral_val = integral(current_T)

        # Головна формула I = K1 * math.exp(-EPSILON / T) * math.exp(-integral_val)
        I = K1 * math.exp(-EPSILON / current_T) * math.exp(-integral_val)

        T_values.append(current_T)
        I_values.append(I)

        current_T += step

    # Побудова графіку
    plt.figure(figsize=(10, 6))

    plt.plot(T_values, I_values, linewidth=2)

    # Зафарбування площі
    plt.fill_between(T_values, I_values, color='green', alpha=0.1)

    plt.title(f'Залежність інтенсивності світіння від температури I(T)')
    plt.xlabel('Температура (T)')
    plt.ylabel('Інтенсивність світіння (I)')
    plt.grid(True)

    # Знаходження піка графіку
    max_I = max(I_values)
    max_T = T_values[I_values.index(max_I)]
    plt.plot(max_T, max_I, 'ro')
    plt.text(max_T, max_I, f' Пік: T = {max_T:.5f}', verticalalignment='bottom')

    plt.show()

# Головна частина програми
if __name__ == '__main__':
    plot_graph()
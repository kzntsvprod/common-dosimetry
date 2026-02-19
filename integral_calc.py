import math
import matplotlib.pyplot as plt

# Константи
T0 = 2.5e-2
EPSILON = 0.1
K1 = 1e8
K2 = 1e6

# Температура
def get_T(t):
    return T0 + 8.6e-5 * t

# Інтегрована функція
def integral_func(x):
    if x == 0: return 0
    return math.exp(-EPSILON / x)

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

# Побудова графіка
def plot_graph():
    t_min = 0
    t_max = 10000

    t_values = []
    I_values = []

    points_count = 200
    step = (t_max - t_min) / points_count

    current_t = t_min
    while current_t <= t_max:
        # Знаходження поточної температури цієї миті
        current_T = get_T(current_t)

        # Обчислення інтегралу у межах [T0, current_T]
        if current_T > T0:
            integral_val = simpson_rule(integral_func, T0, current_T, 1000)
        else:
            integral_val = 0

        # Головна формула I = k1 * exp(-eps / T) * [1 + k2 * integral(exp(-eps / x))]^(-2)
        term1 = K1 * math.exp(-EPSILON / current_T)
        term2 = (1 + K2 * integral_val)**(-2)

        I = term1 * term2

        t_values.append(current_t)
        I_values.append(I)

        current_t += step

    # Побудова графіку
    plt.figure(figsize=(10, 6))

    plt.plot(t_values, I_values, linewidth=2)

    # Зафарбування площі
    plt.fill_between(t_values, I_values, color='green', alpha=0.1)

    plt.title(f'Залежність інтенсивності світіння від часу I(t)')
    plt.xlabel('Час (t)')
    plt.ylabel('Інтенсивність світіння (I)')
    plt.grid(True)

    # Знаходження піка графіку
    max_I = max(I_values)
    max_t = t_values[I_values.index(max_I)]
    plt.plot(max_t, max_I, 'ro')
    plt.text(max_t, max_I, f' Пік: t={max_t:.1f}', verticalalignment='bottom')

    plt.show()

# Головна частина програми
if __name__ == '__main__':
    plot_graph()
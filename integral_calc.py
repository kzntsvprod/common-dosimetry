import math
import matplotlib.pyplot as plt

# Обробка функції користувача
def get_user_function(formula_str):
    # Заміна ^ на **
    formula_str = formula_str.replace('^', '**')

    # Створення словника доступних змінних (математичні функції + змінна x)
    # Це дозволяє писати sin(x) замість math.sin(x)
    context = {k: v for k, v in vars(math).items() if not k.startswith('_')}

    # Використання компільованого коду для швидкодії
    try:
        code = compile(formula_str, "<string>", "eval")
    except SyntaxError:
        raise ValueError("Некоректний синтаксис формули")

    def func(x):
        context['x'] = x
        return eval(code, {"__builtins__": None}, context)

    return func


# Метод Сімпсона
def simpson_rule(f, a, b, n):
    if n % 2 != 0: n += 1
    if n <= 0: return 0
    h = (b - a) / n

    try:
        result = f(a) + f(b)

        for i in range(1, n):
            x = a + i * h
            coef = 2 if i % 2 == 0 else 4
            result += coef * f(x)

        return result * h / 3

    except ZeroDivisionError:
        return 0

    except ValueError:
        return 0


# Побудова графіка
def plot_graph_comparison(f, formula_str, a, t_max, n_rough, n_precise):
    t_values = []
    y_rough = []
    y_precise = []

    points_count = 100
    step = (t_max - a) / points_count

    current_t = a
    while current_t <= t_max:
        t_values.append(current_t)

        # Рахуємо двома способами
        if abs(current_t - a) < 1e-9:
            val1, val2 = 0, 0
        else:
            val1 = simpson_rule(f, a, current_t, n_rough)
            val2 = simpson_rule(f, a, current_t, n_precise)

        y_rough.append(val1)
        y_precise.append(val2)
        current_t += step

    plt.figure(figsize=(10, 6))

    # Точна лінія
    plt.plot(t_values, y_precise, color='green', linewidth=2, label=f'Точно (n={n_precise})')

    # Груба лінія
    plt.plot(t_values, y_rough, color='red', linestyle='--', linewidth=1.5, label=f'Грубо (n={n_rough})')

    # Зафарбування площі
    plt.fill_between(t_values, y_precise, color='green', alpha=0.1)

    plt.title(f'Порівняння точності методу Сімпсона для {formula_str}')
    plt.xlabel('Час (t)')
    plt.ylabel('Накопичена доза')
    plt.grid(True)
    plt.legend()
    plt.show()

# Головна частина програми
if __name__ == '__main__':
    try:
        print("--- Побудова залежності інтегралу від параметра ---")

        # Ввід даних
        formula_input = input(f"Введіть функцію (за замовчуванням 'exp(-1/x)'): ")
        if not formula_input.strip():
            formula_input = "exp(-1/x)"

        f = get_user_function(formula_input)

        a = 0.01
        t_max_str = input("Максимальне t (за замовчуванням 3): ")
        if not t_max_str.strip():
            t_max = 3.0
        else:
            t_max = float(t_max_str)

        n_rough_str = input("Грубе наближення (за замовчуванням 2): ")
        if not n_rough_str.strip():
            n_rough = 2
        else:
            n_rough = int(n_rough_str)

        n_precise_str = input("Точне наближення (за замовчуванням 1000): ")
        if not n_precise_str.strip():
            n_precise = 1000
        else:
            n_precise = int(n_precise_str)

        plot_graph_comparison(f, formula_input, a, t_max, n_rough, n_precise)

    except Exception as e:
        print(f"\nПОМИЛКА: {e}")
        input("Натисніть Enter, щоб завершити роботу...")
import math

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

# Функція-обгортка, для безпечного виклику
def safe_calculate(method_func, f, a, b, n):
  try:
    res = method_func(f, a, b, n)

    # Перевірка на нестандартні результати (NaN, Infinity)
    if math.isnan(res):
      return "ПОМИЛКА: Результат не є числом (NaN)"
    if math.isinf(res):
      return "ПОМИЛКА: Результат нескінченний (Infinity)"

    return f"{res:.15f}"
  except ZeroDivisionError:
    return "ПОМИЛКА: Ділення на нуль (функція розривна)"
  except ValueError:
    return "ПОМИЛКА: Вихід за межі області визначення"
  except OverflowError:
    return "ПОМИЛКА: Число занадто велике (прямує до нескінченності)"
  except Exception as e:
    return f"ПОМИЛКА: {e}"

# Метод лівих прямокутників
def left_rectangle_rule(f, a, b, n):
  h = (b - a) / n
  result = sum(f(a + i * h) for i in range(0, n))
  return result * h

# Метод серединних прямокутників
def middle_rectangle_rule(f, a, b, n):
  h = (b - a) / n
  result = sum(f(a + (i + 0.5) * h) for i in range(0, n))
  return result * h

# Метод правих прямокутників
def right_rectangle_rule(f, a, b, n):
  h = (b - a) / n
  result = sum(f(a + i * h) for i in range(1, n + 1))
  return result * h

# Метод трапецій
def trapezoid_rule(f, a, b, n):
  h = (b - a) / n
  result = (f(a) + f(b)) / 2 + sum(f(a + i * h) for i in range(1, n))
  return result * h

# Метод Сімпсона
def simpson_rule(f, a, b, n):
  if n % 2 != 0: n += 1 # Для методу Сімпсона n має бути парним
  h = (b - a) / n
  result = f(a) + f(b)

  for i in range(1, n):
    x = a + i * h
    coef = 2 if i % 2 == 0 else 4
    result += coef * f(x)

  return result * h / 3

# Головна частина програми
if __name__ == '__main__':
  try:
    print("--- Калькулятор інтегралів ---")
    formula_input = input("Введіть функцію f(x) (наприклад, exp(-1/x) або sqrt(x)): ")
    a = float(input("Нижня межа a: "))
    b = float(input("Верхня межа b: "))
    n_input = input("Кількість розбиттів n (за замовчуванням 1000): ")

    # Перевірка кількості розбиттів
    if n_input.strip() == "":
      n = 1000
    else:
      n = int(n_input)

    if n <= 0:
      raise ValueError("Кількість розбиттів має бути додатним числом")

    f = get_user_function(formula_input)

    print("\n--- Результати ---")
    print(f"Функція: {formula_input}")
    print(f"Інтервал: [{a}, {b}], кроків: {n}")
    print(f"Метод лівих прямокутників: {safe_calculate(left_rectangle_rule, f, a, b, n)}")
    print(f"Метод середніх прямокутників: {safe_calculate(middle_rectangle_rule, f, a, b, n)}")
    print(f"Метод правих прямокутників: {safe_calculate(right_rectangle_rule, f, a, b, n)}")
    print(f"Метод трапецій: {safe_calculate(trapezoid_rule, f, a, b, n)}")
    print(f"Метод Сімпсона: {safe_calculate(simpson_rule, f, a, b, n)}")

  except ValueError:
    print("\nБудь ласка, вводьте коректні числа для меж та кількості кроків.")

  except Exception as e:
    print(f"\nКритична помилка при ініціалізації: {e}")

  input("\nНатисніть Enter, щоб завершити роботу...\n")
import { vi, expect, test, describe } from "vitest";
import { validateHabit, calculateProgress, processHabit } from "./logic";

describe("Тестування логіки Habit Tracker (Unit Tests)", () => {
  test("1. Має приймати нормальну назву", () => {
    expect(validateHabit("Спорт")).toBe("ok");
  });
  test("2. Помилка на порожній рядок", () => {
    expect(validateHabit("")).toBe("Назва не може бути порожньою");
  });
  test("3. Помилка на коротку назву", () => {
    expect(validateHabit("Йо")).toBe("Назва занадто коротка");
  });
  test("4. Помилка на довгу назву", () => {
    expect(validateHabit("Дуже довга назва для звички")).toBe(
      "Назва занадто довга",
    );
  });
  test("5. Рахує 100% прогресу", () => {
    expect(calculateProgress(10, 10)).toBe(100);
  });
  test("6. Повертає 0 при нульовому виконанні", () => {
    expect(calculateProgress(0, 5)).toBe(0);
  });
  test("7. Захист від ділення на нуль", () => {
    expect(calculateProgress(5, 0)).toBe(0);
  });
  test("8. Тест із Mock-функцією для логування", () => {
    const loggerMock = vi.fn(); // Створюємо "муляж" функції
    processHabit("Спорт", loggerMock);
    expect(loggerMock).toHaveBeenCalled(); // Перевіряємо чи її викликали
    expect(loggerMock).toHaveBeenCalledWith("Habit processed"); // Перевіряємо з яким текстом
  });
});

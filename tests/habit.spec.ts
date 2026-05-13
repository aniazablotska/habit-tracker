import { test, expect } from "@playwright/test";

// Використовуємо твій живий сайт для надійності
const filePath = 'https://habit-tracker-inky-six.vercel.app/';

test.describe("Habit Tracker - Комплексні E2E Сценарії", () => {
  
  test("Сценарій 1: Успішне додавання нової звички в історію", async ({ page }) => {
    // 1. Переходимо на сайт
    await page.goto(filePath);

    // 2. Вводимо назву звички
    const input = page.locator("#habitInput");
    await input.fill("Прочитати 10 сторінок");

    // 3. Натискаємо кнопку "Додати"
    await page.click("#addHabitBtn");

    // 4. ПЕРЕВІРКА: Чекаємо, поки текст з'явиться в контейнері списку
    // Метод toContainText має вбудоване очікування, це виправить помилку в CI
    const habitList = page.locator("#habitList");
    await expect(habitList).toContainText("Прочитати 10 сторінок", { timeout: 10000 });
  });

  test("Сценарій 2: Очищення поля вводу після успішної операції", async ({ page }) => {
    // 1. Переходимо на сайт
    await page.goto(filePath);

    // 2. Вводимо текст
    const input = page.locator("#habitInput");
    await input.fill("Йога 15 хв");

    // 3. Натискаємо кнопку
    await page.click("#addHabitBtn");

    // 4. ПЕРЕВІРКА: Спочатку чекаємо появу тексту в списку
    await expect(page.locator("#habitList")).toContainText("Йога 15 хв", { timeout: 10000 });

    // 5. ПЕРЕВІРКА: чи стало поле вводу знову порожнім
    await expect(input).toHaveValue("");
  });
});
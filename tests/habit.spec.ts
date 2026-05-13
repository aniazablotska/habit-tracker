import { test, expect } from "@playwright/test";

// Твоя реальна адреса сайту
const APP_URL = 'https://habit-tracker-inky-six.vercel.app/';

test.describe("Habit Tracker - Професійні E2E Тести", () => {

  test("Успішне додавання нової звички та її відображення", async ({ page }) => {
    // 1. Відкриваємо живий сайт
    await page.goto(APP_URL);

    // 2. Перевірка: чи завантажився інтерфейс (логотип)
    const logo = page.locator(".logo");
    await expect(logo).toBeVisible();

    // 3. Дія: Вписуємо звичку
    const input = page.locator("#habitInput");
    await input.fill("Прочитати 10 сторінок");

    // 4. Дія: Натискаємо кнопку "Додати"
    await page.click("#addHabitBtn");

    // 5. Перевірка: чи з'явилася картка звички в списку
    // Ми використовуємо toContainText, він почекає появи тексту автоматично
    const habitList = page.locator("#habitList");
    await expect(habitList).toContainText("Прочитати 10 сторінок");

    // 6. Перевірка: чи оновилася статистика "Всього"
    const totalCount = page.locator("#total-habits");
    await expect(totalCount).not.toHaveText("0");
  });

  test("Очищення поля вводу після успішної операції", async ({ page }) => {
    await page.goto(APP_URL);

    const input = page.locator("#habitInput");
    await input.fill("Йога 15 хв");
    await page.click("#addHabitBtn");

    // Чекаємо підтвердження успіху
    await expect(page.locator("#habitList")).toContainText("Йога 15 хв");

    // Перевірка: поле вводу має стати порожнім
    await expect(input).toHaveValue("");
  });

});
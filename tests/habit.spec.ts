import { test, expect } from "@playwright/test";
import path from "path";

const filePath = `file://${path.resolve("src/index.html")}`;

test.describe("Habit Tracker - Комплексні E2E Сценарії", () => {
  test("Сценарій 1: Успішне додавання нової звички в історію", async ({
    page,
  }) => {
    // 1. Переходимо на сайт
    await page.goto(filePath);

    // 2. Вводимо назву звички (Fill)
    const input = page.locator("#habitInput");
    await input.fill("Прочитати 10 сторінок");

    // 3. Натискаємо кнопку "Додати" (Click)
    await page.click("#addHabitBtn");

    // 4. ПЕРЕВІРКА: чи з'явився текст у списку (Expect)
    const historyItem = page.locator("#habitList li").first();
    await expect(historyItem).toBeVisible();
    await expect(historyItem).toContainText("Прочитати 10 сторінок");
  });

  test("Сценарій 2: Очищення поля вводу після успішної операції", async ({
    page,
  }) => {
    // 1. Переходимо на сайт
    await page.goto(filePath);

    // 2. Вводимо текст
    const input = page.locator("#habitInput");
    await input.fill("Йога 15 хв");

    // 3. Натискаємо кнопку
    await page.click("#addHabitBtn");

    // 4. ПЕРЕВІРКА: чи стало поле вводу знову порожнім (Expect)
    // Це важливий технічний крок, який часто забувають
    await expect(input).toHaveValue("");
  });
});

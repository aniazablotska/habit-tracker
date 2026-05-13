import { test, expect } from '@playwright/test';

// Твій реальний сайт
const APP_URL = 'https://habit-tracker-inky-six.vercel.app/';

test('Професійна перевірка додавання звички', async ({ page }) => {
  // 1. АВТОМАТИЧНО НАТИСКАТИ "ОК" НА ПОВІДОМЛЕННЯ (ALERTS)
  page.on('dialog', async dialog => {
    await dialog.accept();
  });

  // 2. Переходимо на сайт
  await page.goto(APP_URL);

  // 3. Додаємо звичку
  const input = page.locator('#habitInput');
  const button = page.locator('#addHabitBtn');
  
  await input.fill('Фінальний Тест');
  await button.click();

  // 4. ПЕРЕВІРКА: чи з'явився текст у списку (чекаємо до 15 секунд)
  const habitList = page.locator('#habitList');
  await expect(habitList).toContainText('Фінальний Тест', { timeout: 15000 });

  // 5. ПЕРЕВІРКА: чи поле стало порожнім
  await expect(input).toHaveValue('');
});
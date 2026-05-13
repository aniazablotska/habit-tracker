import { test, expect } from '@playwright/test';

// Твій живий сайт
const filePath = 'https://habit-tracker-inky-six.vercel.app/';

test('Сценарій: Додавання звички та перевірка результату', async ({ page }) => {
  // 1. Заходимо на сайт
  await page.goto(filePath);
  
  // Дамо роботу команду почекати, поки сайт повністю «прокинеться»
  await page.waitForLoadState('networkidle');

  // 2. Додаємо звичку
  const input = page.locator('#habitInput');
  await input.fill('Автоматичний тест');
  await page.click('#addHabitBtn');

  // 3. ПЕРЕВІРКА (найбільш надійна): 
  // Просто чекаємо, поки в списку з'явиться наш текст. 
  // Цей метод сам чекає до 15 секунд, якщо треба.
  await expect(page.locator('#habitList')).toContainText('Автоматичний тест', { timeout: 15000 });

  // 4. ПЕРЕВІРКА: чи очистилося поле
  await expect(input).toHaveValue('');
});
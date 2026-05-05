// Отримуємо статус із файлу .env
const appStatus = import.meta.env.VITE_APP_STATUS;
console.log("Current Mode:", appStatus);
// Створимо напис на сторінці (або додай це в існуючий заголовок)
const statusElement = document.createElement("p");
statusElement.style.color = "blue";
statusElement.textContent = `Статус: ${appStatus}`;
document.body.prepend(statusElement);
// Додаємо напис на самий верх сайту
const btn = document.getElementById("addHabitBtn");
const input = document.getElementById("habitInput");
const list = document.getElementById("habitList");

if (btn) {
  btn.addEventListener("click", function () {
    const text = input.value;
    if (text) {
      // Створюємо новий елемент списку
      const li = document.createElement("li");
      li.className = "habit-item";
      li.textContent = text;

      // Додаємо його на сторінку
      list.appendChild(li);

      // Очищуємо поле вводу
      input.value = "";
      console.log(`Додано звичку: ${text}`);
    }
  });
}

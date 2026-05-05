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

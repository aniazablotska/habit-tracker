import { validateHabit, calculateProgress } from "./logic.js";

// 1. Налаштування статусу (Лаба 3)
const appStatus = import.meta.env.VITE_APP_STATUS || "Unknown";
const statusEl = document.getElementById("env-status");
if (statusEl) statusEl.textContent = appStatus;

// 2. Стан програми (LocalStorage)
let habits = JSON.parse(localStorage.getItem("habits")) || [];

const input = document.getElementById("habitInput");
const btn = document.getElementById("addHabitBtn");
const list = document.getElementById("habitList");

// 3. Функція рендеру
function render() {
  list.innerHTML = "";
  let completedCount = 0;

  habits.forEach((habit, index) => {
    if (habit.completed) completedCount++;

    const li = document.createElement("li");
    li.className = "habit-card";
    li.innerHTML = `
            <div class="habit-info">
                <h4>${habit.name}</h4>
                <p>Статус: ${habit.completed ? "Виконано" : "В процесі"}</p>
            </div>
            <div class="habit-actions">
                <button class="btn-done ${habit.completed ? "active" : ""}" data-index="${index}">
                    ${habit.completed ? "✓" : "Виконати"}
                </button>
                <button class="btn-del" data-index="${index}">🗑</button>
            </div>
        `;
    list.appendChild(li);
  });

  // Оновлення статистики
  document.getElementById("total-habits").textContent = habits.length;
  document.getElementById("completed-today").textContent = completedCount;
  document.getElementById("overall-progress").textContent =
    `${calculateProgress(completedCount, habits.length)}%`;

  localStorage.setItem("habits", JSON.stringify(habits));
}

// 4. Додавання нової звички (Виправлено після Code Review)
btn.addEventListener("click", () => {
  const result = validateHabit(input.value);

  if (result === "ok") {
    habits.push({ name: input.value, completed: false });
    input.value = "";
    render(); // 
} else {
    alert(result); 
  }
});

// 5. Обробка кліків у списку
list.addEventListener("click", (e) => {
  const index = e.target.dataset.index;
  if (index === undefined) return;

  if (e.target.classList.contains("btn-done")) {
    habits[index].completed = !habits[index].completed;
  } else if (e.target.classList.contains("btn-del")) {
    habits.splice(index, 1);
  }
  render();
});

render();
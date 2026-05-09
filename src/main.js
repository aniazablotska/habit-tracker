import { validateHabit, calculateProgress } from "./logic.js";
import posthog from "posthog-js";

posthog.init(import.meta.env.VITE_POSTHOG_KEY, {
  api_host: import.meta.env.VITE_POSTHOG_HOST,
});

const appStatus = import.meta.env.VITE_APP_STATUS || "Unknown";
const statusEl = document.getElementById("env-status");
if (statusEl) statusEl.textContent = appStatus;

let habits = JSON.parse(localStorage.getItem("habits")) || [];
const input = document.getElementById("habitInput");
const btn = document.getElementById("addHabitBtn");
const list = document.getElementById("habitList");

// --- КРОК 5: Змінна для прапорця ---
let isDeleteEnabled = true; 

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
                <!-- Перевіряємо прапорець перед малюванням кнопки -->
                <button class="btn-del" data-index="${index}" style="display: ${isDeleteEnabled ? 'block' : 'none'}">
                    🗑
                </button>
            </div>
        `;
    list.appendChild(li);
  });

  document.getElementById("total-habits").textContent = habits.length;
  document.getElementById("completed-today").textContent = completedCount;
  document.getElementById("overall-progress").textContent =
    `${calculateProgress(completedCount, habits.length)}%`;

  localStorage.setItem("habits", JSON.stringify(habits));
}

// Слухаємо зміну прапорців від PostHog
posthog.onFeatureFlags(() => {
    isDeleteEnabled = posthog.isFeatureEnabled('show-delete-button');
    console.log("Стан Feature Flag 'show-delete-button':", isDeleteEnabled);
    render(); // Перемальовуємо інтерфейс з урахуванням прапорця
});

btn.addEventListener("click", () => {
  const result = validateHabit(input.value);
  if (result === "ok") {
    habits.push({ name: input.value, completed: false });
    posthog.capture("habit_added", { habit_name: input.value });
    input.value = "";
    render();
  } else {
    alert(result); 
  }
});

list.addEventListener("click", (e) => {
  const index = e.target.dataset.index;
  if (index === undefined) return;

  if (e.target.classList.contains("btn-done")) {
    habits[index].completed = !habits[index].completed;
    posthog.capture("habit_toggled", {
      habit_name: habits[index].name,
      completed: habits[index].completed,
    });
  } else if (e.target.classList.contains("btn-del")) {
    posthog.capture("habit_deleted", { habit_name: habits[index].name });
    habits.splice(index, 1);
  }
  render();
});

render();
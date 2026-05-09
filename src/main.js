import { validateHabit, calculateProgress } from "./logic.js";
import posthog from "posthog-js";
import * as Sentry from "@sentry/browser";

//  Ініціалізація Sentry
Sentry.init({
  dsn: "https://4a3e7acb79ef7e715a420c1892147e84@o4511361095237632.ingest.de.sentry.io/4511361110376528", 
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
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
// Крок 2 Лаби 6: Симуляція помилки для перевірки Sentry
const breakBtn = document.getElementById('break-btn');
if (breakBtn) {
    breakBtn.addEventListener('click', () => {
        console.log("Натиснуто кнопку паніки. Надсилаю звіт у Sentry...");
        
        // Генеруємо штучну помилку
        throw new Error("Habit Tracker Critical Error: Test incident for Lab 6");
    });
}
render();
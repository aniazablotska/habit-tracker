console.log('Habit Tracker initialized');

// Виправляємо зауваження з Code Review:

// Замість onclick в HTML, використовуємо додавання події в JS

const btn = document.getElementById('addHabitBtn');

if (btn) {
    btn.addEventListener('click', function() {
        console.log('Кнопку натиснуто! Подія оброблена в main.js');
        alert('Звичку додано (обробка в JS)');
    });
}
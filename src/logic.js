export function validateHabit(name) {
  if (!name) return "Назва не може бути порожньою";
  if (name.length < 3) return "Назва занадто коротка";
  if (name.length > 15) return "Назва занадто довга";
  return "ok";
}

export function calculateProgress(done, total) {
  if (total === 0) return 0;
  return Math.round((done / total) * 100);
}

export function processHabit(name, logger) {
  if (name === "Спорт") {
    logger("Habit processed");
    return true;
  }
  return false;
}

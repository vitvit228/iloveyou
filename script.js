const playBtn     = document.getElementById('play-btn');
const screamer    = document.getElementById('screamer');
const replayBtn   = document.getElementById('replay-btn');
const mainSound   = document.getElementById('main-sound');
const screamSound = document.getElementById('scream-sound');

let started = false;

/* Запуск цикла */
function startShow() {
  if (started) return;
  started = true;

  // Прячем кнопку повтора (если была)
  replayBtn.classList.remove('show');

  // 1. Прячем треугольник через 2 секунды
  setTimeout(() => {
    playBtn.classList.add('hidden');
  }, 2000);

  // 2. Запускаем основной звук
  mainSound.currentTime = 0;
  mainSound.play().catch(err => console.warn('Ошибка аудио:', err));
}

/* Полный сброс */
function resetShow() {
  // Стоп и перемотка звуков
  mainSound.pause();
  mainSound.currentTime = 0;
  screamSound.pause();
  screamSound.currentTime = 0;

  // Прячем скример и кнопку повтора
  screamer.classList.remove('show');
  replayBtn.classList.remove('show');

  // Возвращаем треугольник
  playBtn.classList.remove('hidden');

  started = false;
}

/* Клик по треугольнику — старт */
playBtn.addEventListener('click', startShow);

/* Когда основной звук закончился — скример */
mainSound.addEventListener('ended', () => {
  setTimeout(() => {
    screamer.classList.add('show');
    screamSound.currentTime = 0;
    screamSound.play().catch(() => {});

    // Показываем кнопку «Повторить» через 2 секунды после скримера
    setTimeout(() => {
      replayBtn.classList.add('show');
    }, 2000);
  }, 1000);
});

/* Клик по кнопке «Повторить» — полный сброс */
replayBtn.addEventListener('click', resetShow);
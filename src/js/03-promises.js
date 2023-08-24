import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

form.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  const { delay, step, amount } = event.currentTarget.elements;
  let currentDelay = Number(delay.value);
  for (let i = 1; i <= Number(amount.value); i += 1) {
    createPromise(i, currentDelay)
      .then(({ position, delay }) => {
        Notify.success(` Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(` Rejected promise ${position} in ${delay}ms`);
      });
    currentDelay += Number(step.value);
  }
  event.currentTarget.reset();
}

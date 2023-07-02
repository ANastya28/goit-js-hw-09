import Notiflix from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  let delay = Number(event.currentTarget.delay.value);
  const step = Number(event.currentTarget.step.value);
  const amount = Number(event.currentTarget.amount.value);

  if (event.currentTarget.delay.value < 0 || event.currentTarget.amount.value <= 0) {
    return Notiflix.Notify.warning("Delay step and amount values must be positive numbers and the amount value must be more than zero");
} 

  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
}

  function createPromise(position, delay) {
    const shouldResolve = Math.random() > 0.3;
    const PromiseObj = {
      position,
      delay,
    };

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldResolve) {
          resolve(PromiseObj);
      } else {
          reject(PromiseObj);
      }
      }, delay)
    });
  }
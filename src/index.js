import './styles.css';
import { getCounter, saveCounter } from './dbService';

document.addEventListener('DOMContentLoaded', async () => {
  const counterDisplay = document.getElementById('counter-display');
  const button = document.getElementById('button');
  const box = document.getElementById('counter-display-box');

  let counter = await getCounter();
  counterDisplay.innerText = `Counter: ${counter}`;

  button.classList.remove('is-skeleton');
  box.classList.remove('skeleton-block');

  document.getElementById('button').addEventListener('click', async () => {
    counter++;
    counterDisplay.innerText = `Counter: ${counter}`;
    await saveCounter(counter);
  });
});

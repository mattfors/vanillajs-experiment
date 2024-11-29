import './styles.css';
import { getCounter, saveCounter } from './dbService';
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';


library.add(faGithub, faPlus);
dom.watch();


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

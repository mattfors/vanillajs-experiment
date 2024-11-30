import { getCounter, saveCounter } from './dbService';

document.addEventListener('DOMContentLoaded', async () => {
    const counterDisplay = document.getElementById('counter-display');
    const button = document.getElementById('button');
    const box = document.getElementById('counter-display-box');

    let totalCounter = await getCounter();
    let sessionCounter = 0;
    counterDisplay.innerText = `Counter: ${totalCounter}`;

    button.classList.remove('is-skeleton');
    box.classList.remove('skeleton-block');

    button.addEventListener('click', async () => {
        sessionCounter++;
        totalCounter++;
        counterDisplay.innerText = `Counter: ${totalCounter}`;
        await saveCounter(sessionCounter);
    });
});


import { getAllCounters, deleteCounter } from './dbService';

document.addEventListener('DOMContentLoaded', async () => {
    const box = document.getElementById('data-display-box');
    const dataDisplay = document.getElementById('data-display');
    const counters = await getAllCounters();

    box.classList.remove('skeleton-block');
    counters.forEach(counter => {
        const row = document.createElement('tr');
        row.setAttribute('id', `row-${counter.id}`);
        row.innerHTML = `
            <td>${counter.id}</td>
            <td>${counter.value}</td>
            <td>${counter.lastUpdate}</td>
            <td>
                <button class="delete is-medium" data-id="${counter.id}"></button>
            </td>
    `;
        dataDisplay.appendChild(row);
    });

    document.querySelectorAll('.delete').forEach(button => {
        button.addEventListener('click', async (event) => {
            const id = event.currentTarget.getAttribute('data-id');
            await deleteCounter(id);
            document.getElementById(`row-${id}`).remove();
        });
    });
});

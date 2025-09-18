import { subscribe, getState } from './store/store.js';
import { StoreDbService } from './store/storeDbService.js';

document.addEventListener('DOMContentLoaded', async () => {
    const box = document.getElementById('data-display-box');
    const dataDisplay = document.getElementById('data-display');

    // Load initial data into store
    await StoreDbService.loadInitialData();

    // Subscribe to store updates
    const updateUI = () => {
        const state = getState();
        const counters = state.counters;

        // Clear existing data
        dataDisplay.innerHTML = '';

        // Populate table with counter data
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

        // Add event listeners to delete buttons
        document.querySelectorAll('.delete').forEach(button => {
            button.addEventListener('click', async (event) => {
                const id = event.currentTarget.getAttribute('data-id');
                try {
                    await StoreDbService.deleteCounter(id);
                } catch (error) {
                    console.error('Failed to delete counter:', error);
                }
            });
        });
    };

    subscribe(updateUI);

    // Initial UI update
    updateUI();

    box.classList.remove('skeleton-block');
});

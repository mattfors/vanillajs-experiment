import { subscribe, getState } from './store/store.js';
import { StoreDbService } from './store/storeDbService.js';

let eventFeedComponent = null;

// Lazy load EventFeedComponent when needed
async function loadEventFeed() {
    if (!eventFeedComponent) {
        const { loadEventFeedComponent } = await import('./components/EventFeedComponent.js');
        eventFeedComponent = await loadEventFeedComponent('event-feed-container');
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const counterDisplay = document.getElementById('counter-display');
    const button = document.getElementById('button');
    const box = document.getElementById('counter-display-box');

    // Load initial data into store
    await StoreDbService.loadInitialData();

    // Subscribe to store updates
    const updateUI = () => {
        const state = getState();
        counterDisplay.innerText = `Counter: ${state.totalCounter}`;
    };

    subscribe(updateUI);

    // Initial UI update
    updateUI();

    button.classList.remove('is-skeleton');
    box.classList.remove('skeleton-block');

    // Load event feed component lazily
    setTimeout(loadEventFeed, 1000);

    button.addEventListener('click', async () => {
        try {
            await StoreDbService.incrementCounter();
        } catch (error) {
            console.error('Failed to increment counter:', error);
        }
    });
});


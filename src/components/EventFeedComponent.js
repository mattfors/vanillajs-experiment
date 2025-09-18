import { subscribe, getState } from '../store/store.js';

export class EventFeedComponent {
    constructor(containerId) {
        this.containerId = containerId;
        this.container = null;
        this.unsubscribe = null;
        this.isVisible = false;
    }

    async init() {
        this.container = document.getElementById(this.containerId);
        if (!this.container) {
            console.error(`Container with id ${this.containerId} not found`);
            return;
        }

        this.render();
        this.subscribeToStore();
        this.isVisible = true;
    }

    subscribeToStore() {
        this.unsubscribe = subscribe(() => {
            if (this.isVisible) {
                this.render();
            }
        });
    }

    render() {
        const state = getState();
        const events = state.events || [];

        this.container.innerHTML = `
            <div class="box">
                <h4 class="title is-4">Event Feed</h4>
                <div class="content">
                    ${events.length === 0 
                        ? '<p class="has-text-grey">No events yet. Start clicking the counter!</p>'
                        : events.map(event => this.renderEvent(event)).join('')
                    }
                </div>
            </div>
        `;
    }

    renderEvent(event) {
        const timeAgo = this.getTimeAgo(event.timestamp);
        const iconClass = event.type === 'increment' ? 'fa-plus' : 'fa-trash';
        const colorClass = event.type === 'increment' ? 'has-text-success' : 'has-text-danger';

        return `
            <div class="notification is-light" style="margin-bottom: 0.5rem; padding: 0.75rem;">
                <div class="level is-mobile">
                    <div class="level-left">
                        <div class="level-item">
                            <span class="icon ${colorClass}">
                                <i class="fas ${iconClass}"></i>
                            </span>
                        </div>
                        <div class="level-item">
                            <div>
                                <p class="is-size-6">${event.message}</p>
                                <p class="is-size-7 has-text-grey">${timeAgo}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getTimeAgo(timestamp) {
        const now = new Date();
        const eventTime = new Date(timestamp);
        const diffMs = now - eventTime;
        const diffSecs = Math.floor(diffMs / 1000);
        const diffMins = Math.floor(diffSecs / 60);
        const diffHours = Math.floor(diffMins / 60);

        if (diffSecs < 60) {
            return `${diffSecs} seconds ago`;
        } else if (diffMins < 60) {
            return `${diffMins} minutes ago`;
        } else if (diffHours < 24) {
            return `${diffHours} hours ago`;
        } else {
            return eventTime.toLocaleDateString();
        }
    }

    destroy() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
        this.isVisible = false;
        if (this.container) {
            this.container.innerHTML = '';
        }
    }
}

// Lazy loading function
export async function loadEventFeedComponent(containerId) {
    const component = new EventFeedComponent(containerId);
    await component.init();
    return component;
}
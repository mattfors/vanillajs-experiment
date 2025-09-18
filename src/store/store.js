import { counterReducer } from './reducer.js';

// Simple Redux-like store implementation
class Store {
    constructor(reducer, initialState) {
        this.reducer = reducer;
        this.state = initialState || reducer(undefined, { type: '@@INIT' });
        this.listeners = [];
    }

    getState() {
        return this.state;
    }

    dispatch(action) {
        this.state = this.reducer(this.state, action);
        this.listeners.forEach(listener => listener());
        return action;
    }

    subscribe(listener) {
        this.listeners.push(listener);
        // Return unsubscribe function
        return () => {
            const index = this.listeners.indexOf(listener);
            if (index > -1) {
                this.listeners.splice(index, 1);
            }
        };
    }
}

// Create and export the store instance
export const store = new Store(counterReducer);

// Export convenience methods
export const getState = () => store.getState();
export const dispatch = (action) => store.dispatch(action);
export const subscribe = (listener) => store.subscribe(listener);
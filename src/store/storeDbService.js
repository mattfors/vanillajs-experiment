import { dispatch, getState } from '../store/store.js';
import { counterLoad, counterIncrement, countersLoaded, counterDelete, addEvent } from '../store/actions.js';
import * as dbService from '../dbService.js';

// Service to sync store with database
export class StoreDbService {
    
    static async loadInitialData() {
        try {
            // Load total counter
            const totalCounter = await dbService.getCounter();
            dispatch(counterLoad(totalCounter));

            // Load all counters
            const counters = await dbService.getAllCounters();
            dispatch(countersLoaded(counters));

            // Add initial load event
            const loadEvent = {
                id: Date.now(),
                type: 'load',
                message: `Application loaded with ${counters.length} counter records`,
                timestamp: new Date().toISOString()
            };
            dispatch(addEvent(loadEvent));

        } catch (error) {
            console.error('Error loading initial data:', error);
            const errorEvent = {
                id: Date.now(),
                type: 'error',
                message: `Failed to load data: ${error.message}`,
                timestamp: new Date().toISOString()
            };
            dispatch(addEvent(errorEvent));
        }
    }

    static async incrementCounter() {
        try {
            const state = getState();
            const newSessionCounter = state.sessionCounter + 1;
            const newTotalCounter = state.totalCounter + 1;

            // Save to database first
            await dbService.saveCounter(newSessionCounter);

            // Then update store
            dispatch(counterIncrement(newSessionCounter, newTotalCounter));

            return { sessionCounter: newSessionCounter, totalCounter: newTotalCounter };
        } catch (error) {
            console.error('Error incrementing counter:', error);
            const errorEvent = {
                id: Date.now(),
                type: 'error',
                message: `Failed to increment counter: ${error.message}`,
                timestamp: new Date().toISOString()
            };
            dispatch(addEvent(errorEvent));
            throw error;
        }
    }

    static async deleteCounter(id) {
        try {
            // Delete from database first
            await dbService.deleteCounter(id);

            // Then update store
            dispatch(counterDelete(Number(id)));

        } catch (error) {
            console.error('Error deleting counter:', error);
            const errorEvent = {
                id: Date.now(),
                type: 'error',
                message: `Failed to delete counter ${id}: ${error.message}`,
                timestamp: new Date().toISOString()
            };
            dispatch(addEvent(errorEvent));
            throw error;
        }
    }

    static async refreshCounters() {
        try {
            const counters = await dbService.getAllCounters();
            dispatch(countersLoaded(counters));
        } catch (error) {
            console.error('Error refreshing counters:', error);
            throw error;
        }
    }
}
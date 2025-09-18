import { ACTION_TYPES } from './actions.js';

// Initial state
const initialState = {
    totalCounter: 0,
    sessionCounter: 0,
    counters: [],
    events: [],
    loading: false
};

// Reducer function
export const counterReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.COUNTER_LOAD:
            return {
                ...state,
                totalCounter: action.payload.totalCounter,
                loading: false
            };

        case ACTION_TYPES.COUNTER_INCREMENT:
            const incrementEvent = {
                id: Date.now(),
                type: 'increment',
                message: `Counter incremented to ${action.payload.totalCounter}`,
                timestamp: action.payload.timestamp
            };
            
            return {
                ...state,
                totalCounter: action.payload.totalCounter,
                sessionCounter: action.payload.sessionCounter,
                events: [incrementEvent, ...state.events].slice(0, 50) // Keep last 50 events
            };

        case ACTION_TYPES.COUNTERS_LOADED:
            return {
                ...state,
                counters: action.payload.counters,
                loading: false
            };

        case ACTION_TYPES.COUNTER_DELETE:
            const deleteEvent = {
                id: Date.now(),
                type: 'delete',
                message: `Counter record ${action.payload.id} deleted`,
                timestamp: new Date().toISOString()
            };
            
            return {
                ...state,
                counters: state.counters.filter(counter => counter.id !== action.payload.id),
                events: [deleteEvent, ...state.events].slice(0, 50)
            };

        case ACTION_TYPES.ADD_EVENT:
            return {
                ...state,
                events: [action.payload.event, ...state.events].slice(0, 50)
            };

        default:
            return state;
    }
};
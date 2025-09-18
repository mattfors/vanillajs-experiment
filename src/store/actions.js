// Action types
export const ACTION_TYPES = {
    COUNTER_INCREMENT: 'COUNTER_INCREMENT',
    COUNTER_LOAD: 'COUNTER_LOAD',
    COUNTER_DELETE: 'COUNTER_DELETE',
    COUNTERS_LOADED: 'COUNTERS_LOADED',
    ADD_EVENT: 'ADD_EVENT'
};

// Action creators
export const counterIncrement = (sessionCounter, totalCounter) => ({
    type: ACTION_TYPES.COUNTER_INCREMENT,
    payload: {
        sessionCounter,
        totalCounter,
        timestamp: new Date().toISOString()
    }
});

export const counterLoad = (totalCounter) => ({
    type: ACTION_TYPES.COUNTER_LOAD,
    payload: { totalCounter }
});

export const counterDelete = (id) => ({
    type: ACTION_TYPES.COUNTER_DELETE,
    payload: { id }
});

export const countersLoaded = (counters) => ({
    type: ACTION_TYPES.COUNTERS_LOADED,
    payload: { counters }
});

export const addEvent = (event) => ({
    type: ACTION_TYPES.ADD_EVENT,
    payload: { event }
});
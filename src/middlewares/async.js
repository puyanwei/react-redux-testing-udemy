export default ({ dispatch }) => next => action => {
    // Check if action has a promise on its 'payload' property
    if (!action.payload || !action.payload.then) {
        return next(action);
        // No => send action to next middleware
    }
    action.payload.then(response => {
        const newAction = { ...action, payload: response };
        dispatch(newAction);
        // Yes => wait for it to resolve then dispatch it
    });
};


const eventControllers = [
    require('./CreateController'),
    require('./ReviewController')
];

module.exports = function reduce(requestState, event) {
    const eventType = event.eventType;
    const controller = eventControllers.find(c => c.eventType === eventType);
    if (controller && controller.applyToRequest) {
        return controller.applyToRequest(event, requestState);
    } else {
        return requestState;
    }
};
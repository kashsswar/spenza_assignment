const Events = require('./eventing'); // Import the 'eventing' library defined in 'eventing.js'
const logger = require('winston'); // Import the Winston logger

// Create an instance of the Events class to work with
const eventEmitter = new Events();

// Register event handlers using the 'on' method

// Register an event handler for the event "click"
eventEmitter.on('click', () => {
  console.log('Click event triggered!');
});

// Register another event handler for the event "click"
eventEmitter.on('click', () => {
  console.log('Another click event handler!');
});

// Trigger events using the 'trigger' method

// Trigger the "click" event, which will execute both event handlers
eventEmitter.trigger('click');

// Now, create a new event and trigger it
eventEmitter.on('hover', () => {
  console.log('Hover event triggered!');
});

eventEmitter.trigger('hover');

// Remove event handlers using the 'off' method

// Remove all event handlers associated with the event "click"
eventEmitter.off('click');

// Trigger the "click" event again, but this time no handlers will be executed since they were removed
eventEmitter.trigger('click');

// Note: Since this is a demonstration, the logger will print to the console instead of a file


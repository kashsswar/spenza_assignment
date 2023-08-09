// eventing.js

const mongoose = require('mongoose');
const winston = require('winston');

// Configure Winston logger to log to the app.log file
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.simple(),
  transports: [
    new winston.transports.File({ filename: 'app.log' }),
  ],
});

mongoose.connect('mongodb://localhost:27017/myappdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const triggerEventSchema = new mongoose.Schema({
  event: String,
  triggerTime: { type: Date, default: Date.now },
});

const TriggerEvent = mongoose.model('TriggerEvent', triggerEventSchema);

class Events {
  constructor() {
    this.eventHandlers = new Map();
  }

  on(eventName, callback) {
    if (!this.eventHandlers.has(eventName)) {
      this.eventHandlers.set(eventName, []);
    }

    this.eventHandlers.get(eventName).push(callback);
  }

  trigger(eventName) {
    const callbacks = this.eventHandlers.get(eventName);
    if (!callbacks || callbacks.length === 0) {
      return;
    }
  
    callbacks.forEach((callback) => callback());
  
    // Create a new document in the 'logs' collection with the 'eventName' and the current timestamp
    const newTriggerEvent = new TriggerEvent({ event: eventName });
    newTriggerEvent.save()
      .then(() => {
        logger.info(`${eventName} --> ${newTriggerEvent.triggerTime}`);
      })
      .catch((err) => {
        console.error('Error saving trigger event to MongoDB:', err);
      });
  }
  
  off(eventName) {
    this.eventHandlers.delete(eventName);
  }
}

module.exports = Events;

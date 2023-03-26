import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export default function createGoogleCalendarEvent(googleApikey, title, description, startTime, endTime) {
    const event = {
      summary: title,
      description: description,
      start: {
        dateTime: startTime,
        timeZone: 'UTC'
      },
      end: {
        dateTime: endTime,
        timeZone: 'UTC'
      }
    };
  
    const apiUrl = `https://www.googleapis.com/calendar/v3/calendars/primary/events?key=${googleApikey}`;
    const request = new Request(apiUrl, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(event)
    });
  
    fetch(request)
      .then(response => response.json())
      .then(data => console.log('Event created:', data))
      .catch(error => console.error('Error creating event:', error));
  }
  
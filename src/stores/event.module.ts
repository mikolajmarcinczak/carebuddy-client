import EventDataService from "@/services/event.service"
import {defineStore} from "pinia";
import {CalendarEvent} from "@/types/event.model";

export const useEventStore = defineStore('calendar', {
  state: () => ({
    events : [] as Array<CalendarEvent>,
    currentWeek: new Date()
  }),
  actions: {
    async addEvent(eventData: { id: string, title: string, date: string, recurring: boolean }) {
      const event = await EventDataService.createEvent(eventData);
      this.events.push(event)
      this.setNotification(event);
    },
    async fetchEventById(eventId: string) {
      const event = await EventDataService.getEventById(eventId);
      return event;
    },
    async fetchEventsByUser(userId: string) {
      const events = await EventDataService.getEventsByUser(userId);
      this.events = events;
    },
    async updateEvent(eventId: string, eventData: any) {
      const updatedEvent = await EventDataService.updateEvent(eventId, eventData);
      const index = this.events.findIndex(event => event. === eventId);
      if (index !== -1) {
        this.events.splice(index, 1, updatedEvent);
      }
    },
    async deleteEvent(eventId: string) {
      await EventDataService.deleteEvent(eventId);
      this.events = this.events.filter(event => event.id !== eventId);
    },
    async setCurrentWeek(date: Date) {
      this.currentWeek = date;
    },
    async setNotification(event: CalendarEvent) {
      console.log('Notification set for event:', event)
      const eventDate = new Date(event.time);
      const now = new Date();
      const timeUntilEvent = eventDate.getTime() - now.getTime();
      if (timeUntilEvent > 0) {
        setTimeout(() => {
          alert(`Notification:, ${event.title}`);
        }, timeUntilEvent)
      }
    }
  },
  getters: {
    eventsForCurrentWeek: (state) => (weekStart: Date) => {
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 7);
      return state.events.filter(event => {
        const eventDate = new Date(event.date);
        return event.recurring || (eventDate >= weekStart && eventDate < weekEnd);
      })
    },
    getCurrentWeek(state) {
      return state.currentWeek;
    }
  }
})
import EventDataService from "@/services/event.service"
import {defineStore} from "pinia";
import {CalendarEvent} from "@/types/event.model";
import {useUserDataStore} from "@/stores/user-data.module";

const userDataStore= useUserDataStore();

export const useEventStore = defineStore('calendar', {
  state: () => ({
    events : [] as Array<CalendarEvent>,
    currentWeek: new Date()
  }),
  actions: {
    async addEvent(eventData: CalendarEvent) {
      const event = await EventDataService.createEvent(eventData);
      this.events.push(event)
      await this.setNotification(event);
    },
    async fetchEventById(eventId: string) {
      const event = await EventDataService.getEventById(eventId);
      return event;
    },
    async fetchEventsByUser(userId: string) {
      const events = await EventDataService.getEventsByUser(userId);
      return events;
    },
    async fetchEventsForCurrentUser() {
      const userId = userDataStore.userProfile?.user?.user_id;
      let events;
      if (userId !== undefined) {
        events = await this.fetchEventsByUser(userId);
        console.log('Events:', events);
        this.events = events;
      } else {
        return [];
      }
    },
    async updateEvent(eventId: string, eventData: CalendarEvent) {
      const updatedEvent = await EventDataService.updateEvent(eventId, eventData);
      const index = this.events.findIndex(event => event.id === eventId);
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
    },
    async initStore() {
      await this.fetchEventsForCurrentUser();
    }
  },
  getters: {
    eventsForCurrentWeek: (state) => (weekStart: Date) => {
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 7);
      return state.events.filter(event => {
        const eventDate = new Date(event.time);
        return event.recurring || (eventDate >= weekStart && eventDate < weekEnd);
      })
    },
    getCurrentWeek(state) {
      return state.currentWeek;
    }
  }
})
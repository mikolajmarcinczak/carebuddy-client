import axios from "axios";
import {CalendarEvent} from "@/types/event.model";

const API_URL = import.meta.env.VITE_API_URL as string;

class EventDataService {
  async createEvent(eventData: any) {
    const response = await axios.post(`${API_URL}/event`, eventData);
    return new CalendarEvent(response);
  }

  async getEventById(eventId: string) {
    const response = await axios.get(`${API_URL}/event/${eventId}`);
    return new CalendarEvent(response);
  }

  async getEventsByUser(userId: string) {
    const response = await axios.get(`${API_URL}/event/get-many/${userId}`);
    return response.data.map((event: any) => new CalendarEvent(event));
  }

  async updateEvent(eventId: string, eventData: any) {
    const response = await axios.put(`${API_URL}/event/${eventId}`, eventData);
    return new CalendarEvent(response);
  }

  async deleteEvent(eventId: string) {
    const response = await axios.delete(`${API_URL}/event/${eventId}`);
    return response.data;
  }
}

export default new EventDataService();
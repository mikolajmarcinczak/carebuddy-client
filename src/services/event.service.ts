import apiClient from "@/utility/http-common";
import {CalendarEvent} from "@/types/event.model";

const axios = apiClient;
const API_URL = import.meta.env.VITE_API_URL as string;

class EventDataService {
  async createEvent(eventData: CalendarEvent) {
    const response = await axios.post(`${API_URL}/event`, eventData);
    return new CalendarEvent(response.data.data);
  }

  async getEventById(eventId: string) {
    const response = await axios.get(`${API_URL}/event/${eventId}`);
    return new CalendarEvent(response.data.data);
  }

  async getEventsByUser(userId: string) {
    const response = await axios.get(`${API_URL}/event/get-many/${userId}`);
    return response.data.data.map((event: any) => new CalendarEvent(event)) as CalendarEvent[];
  }

  async updateEvent(eventId: string, eventData: CalendarEvent) {
    const response = await axios.put(`${API_URL}/event/${eventId}`, eventData);
    return new CalendarEvent(response.data.data);
  }

  async deleteEvent(eventId: string) {
    const response = await axios.delete(`${API_URL}/event/${eventId}`);
    return response.data.data;
  }
}

export default new EventDataService();
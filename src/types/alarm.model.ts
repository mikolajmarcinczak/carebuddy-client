import {AxiosResponse} from "axios";
import {CalendarEvent} from "@/types/event.model";

//schema.prisma.alarm
export class Alarm {
  id: string;
  user_id: string;
  event_id: string;
  trigger_time: Date;
  message?: string;
  event: CalendarEvent;

  constructor(data: {
    id: string;
    user_id: string;
    event_id: string;
    trigger_time: Date;
    message?: string;
  }, event: CalendarEvent) {
    this.id = data.id;
    this.user_id = data.user_id;
    this.event_id = data.event_id;
    this.trigger_time = new Date(data.trigger_time);
    this.event = event;
    this.message = data.message ?? "alarm!";
  }
}
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

  constructor(data: AxiosResponse, event: CalendarEvent) {
    const responseData = data.data;

    this.id = responseData.id;
    this.user_id = responseData.user_id;
    this.event_id = responseData.event_id;
    this.trigger_time = new Date(responseData.trigger_time);
    this.event = event;

    if (responseData.message !== undefined || responseData.message !== null) {
      this.message = responseData.message;
    }
    else {
      this.message = "alarm!";
    }
  }
}
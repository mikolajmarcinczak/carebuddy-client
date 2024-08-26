import {AxiosResponse} from "axios";

//schema.prisma.event
export class CalendarEvent {
  id: string;
  user_ids: string[];
  time: Date;
  title: string;
  recurring: boolean;
  location?: string;
  description?: string;

  constructor(data: AxiosResponse) {
    const responseData = data.data;

    this.id = responseData.id;
    this.user_ids = responseData.user_ids;
    this.time = new Date(responseData.time);
    this.title = responseData.title;
    this.recurring = responseData.recurring || false;

    if (responseData.location !== undefined || responseData.location !== null) {
      this.location = responseData.location;
    }
    else {
      this.location = "";
    }

    if (responseData.description !== undefined || responseData.description !== null) {
      this.description = responseData.description;
    }
    else {
      this.description = "";
    }
  }
}
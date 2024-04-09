import {AxiosResponse} from "axios";

//schema.prisma.event
export class CalendarEvent {
  user_ids: string[];
  time: Date;
  title: string;
  location?: string;
  description?: string;

  constructor(data: AxiosResponse) {
    const responseData = data.data;

    this.user_ids = responseData.user_ids;
    this.time = new Date(responseData.time);
    this.title = responseData.title;

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
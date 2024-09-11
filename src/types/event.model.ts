//schema.prisma.event
export class CalendarEvent {
  id: string;
  user_ids: string[];
  time: string;
  title: string;
  recurring: boolean;
  location?: string;
  description?: string;

  constructor(data: {
    id: string;
    user_ids: string[];
    time: string;
    title: string;
    recurring: boolean;
    location?: string;
    description?: string;
  }) {
    this.id = data.id;
    this.user_ids = data.user_ids;
    this.time = data.time.toString();
    this.title = data.title;
    this.recurring = data.recurring;
    this.location = data.location ?? "";
    this.description = data.description ?? "";
  }
}
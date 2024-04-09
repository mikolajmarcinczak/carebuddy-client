import {AxiosResponse} from "axios";

//schema.prisma.noteentity
export class Note {
  id: string;
  user_id: string;
  related_user_ids: string[];
  related_urls: string[];
  title: string;
  content: string;
  created_at?: string;
  updated_at?: string;

  constructor(data: AxiosResponse) {
    const responseData = data.data;

    this.id = responseData.id;
    this.user_id = responseData.user_id;
    this.related_user_ids = responseData.related_user_ids;
    this.related_urls = responseData.related_urls;
    this.title = responseData.title;
    this.content = responseData.content;

    if (responseData.created_at !== undefined || responseData.created_at !== null) {
      this.created_at = responseData.created_at?.toString();
    }
    else {
      this.created_at = new Date().toLocaleString();
    }

    if (responseData.updated_at !== undefined || responseData.updated_at !== null) {
      this.updated_at = responseData.updated_at?.toString();
    }
    else {
      this.updated_at = new Date().toLocaleString();
    }
  }
}
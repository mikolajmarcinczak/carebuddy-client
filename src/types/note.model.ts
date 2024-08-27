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

  constructor(data: {
    id: string;
    user_id: string;
    related_user_ids: string[];
    related_urls: string[];
    title: string;
    content: string;
    created_at?: string;
    updated_at?: string;
  }) {

    this.id = data.id;
    this.user_id = data.user_id;
    this.related_user_ids = data.related_user_ids;
    this.related_urls = data.related_urls;
    this.title = data.title;
    this.content = data.content;
    this.created_at = data.created_at ? data.created_at.toString() : new Date().toLocaleString();
    this.updated_at = data.updated_at ? data.updated_at.toString() : new Date().toLocaleString();
  }
}
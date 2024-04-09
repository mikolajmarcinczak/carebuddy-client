import {AxiosResponse} from "axios";

//schema.prisma.knowledgebasearticle
export class Article {
  id: string;
  user_id: string;
  title: string;
  content: string;
  tags: string[];
  url?: string;
  created_at?: string;
  updated_at?: string;

  constructor(data: AxiosResponse) {
    const responseData = data.data;

    this.id = responseData.id;
    this.user_id = responseData.user_id;
    this.title = responseData.title;
    this.content = responseData.content;
    this.tags = responseData.tags;

    if (responseData.url !== undefined || responseData.url !== null) {
      this.url = responseData.url;
    } else {
      this.url = "";
    }

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
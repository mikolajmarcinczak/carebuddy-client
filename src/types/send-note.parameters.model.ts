export class SendNoteParameters {
  note_id: string;
  user_ids: string[];

  constructor(data: { note_id: string; user_ids: string[] }) {
    this.note_id = data.note_id;
    this.user_ids = data.user_ids;
  }
}
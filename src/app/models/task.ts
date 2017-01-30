export class Task {
  id: number;
  title: string;

  constructor(title: string, id?: number) {
    this.id = id || null;
    this.title = title;
  }
}

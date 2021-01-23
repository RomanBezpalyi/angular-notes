export class Note {
  public title: string;
  public description: string;
  public id?: string;
  public isDone?: boolean;

  constructor(title: string, description: string, isDone: boolean, id?: string,) {
    this.title = title;
    this.description = description;
    this.id = id;
    this.isDone = isDone;
  }
}

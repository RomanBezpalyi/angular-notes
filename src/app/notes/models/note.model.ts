export class Note {
  public title: string;
  public description: string;
  public label?: string;
  public id?: string;
  public isDone?: boolean;

  constructor(title: string, description: string, label: string, isDone: boolean, id?: string,) {
    this.title = title;
    this.description = description;
    this.label = label;
    this.id = id;
    this.isDone = isDone;
  }
}

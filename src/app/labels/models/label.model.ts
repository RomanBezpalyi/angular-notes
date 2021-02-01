export class Label {
  public title: string;
  public color: string;
  public id?: string;

  constructor(title: string, color: string, id?: string) {
    this.title = title;
    this.color = color;
    this.id = id;
  }
}

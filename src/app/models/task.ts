export class Task {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public priority: number,
    public due_date: any,
    public completed: boolean,
    private _marked: boolean = false
  ) {}

  get marked(): boolean {
    return this._marked;
  }

  set marked(m: boolean) {
    this._marked = m;
  }
}

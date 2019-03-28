export class User {
  private _name: string;
  private _date: string;

  get name(): string {
    return this._name;
  }
  set name(name: string) {
    this._name = name;
  }

  get date(): string {
    return this._date;
  }
  set date(date: string) {
    this._date = date;
  }

  getDate():string{
     var  kopieDate : string[] = this.date.split(' ');

     var dat: string= '';

     dat += kopieDate[1] + ' ';
     dat += kopieDate[2];
    return dat;
  }
}

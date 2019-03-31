export class User {
  private _name: string;
  private _date: string;
  private _lastmsg: string;

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
     var  copyDate : string[] = this.date.split(' ');

     var dat: string= '';

     dat += copyDate[1] + ' ';
     dat += copyDate[2];
    return dat;
  }

  get lastmsg(): string {
    return this._lastmsg;
  }
  set lastmsg(lastms: string) {
    this._lastmsg = lastms;
  }
}

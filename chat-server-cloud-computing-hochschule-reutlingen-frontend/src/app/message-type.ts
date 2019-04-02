export enum MessageType {
  NORMAL = "NORMAL",
  ERROR = "ERROR",
  WELCOME = "WELCOME",
  PRIVATE = "PRIVATE"
}

export namespace MessageType {

  export function parseMessageType(stringType: string): MessageType {
    const type = MessageType[stringType];
    if (type === undefined) {
      return MessageType.ERROR;
    }
    return type;
  }
}

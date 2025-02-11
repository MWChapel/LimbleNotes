export interface IMessageContent {
    body: string;
    date: string;
    userName?: string;
}

export interface IUserList {
    userID:number;
    name:string;
}

export interface IUserMessage {
    users: IUserList[]
    message:string;
}
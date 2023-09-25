import { Context } from 'telegraf';

export interface ISessionData {
  pageNumber: number;
}

export interface IBotContext extends Context {
  sessions: ISessionData;
}

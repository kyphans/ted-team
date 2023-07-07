import { UserData } from './user.types';

export type MembersResponseType = {
  count: number,
  next: string | null,
  previous:  string | null,
  results: UserData[]
}
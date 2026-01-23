export interface Guest {
  nickname: string;
  invitees: GuestRSVP;
  repliedAt?: number;
}

export interface GuestRSVP {
  [name: string]: boolean | null;
}

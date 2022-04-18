export type GuestResponse = {
  content: Guest[];
  totalPages: number;
  totalElements: number;
  numberOfElements: number;
}

export type Guest = {
  id: number;
  name: string;
  invitation: number,
  status: boolean,
  telephone: string,
  email: string,
  dependents: Dependent[]
}

export type Dependent = {
  id: number;
  name: string;
}
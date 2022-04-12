export type DependentResponse = {
  content: Dependent[];
  totalPages: number;
  totalElements: number;
}

export type Dependent = {
  id: number;
  name: string;
}
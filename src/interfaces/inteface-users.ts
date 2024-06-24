export interface IListUsers {
  users: {
    nodes: INode[];
  };
}

export interface INode {
  id: string;
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  role: string;
}

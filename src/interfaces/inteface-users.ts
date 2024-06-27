export interface IPageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  limit: number;
  offset: number;
}

export interface INode {
  id: string;
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  role: string;
}

export interface IListUsers {
  users: {
    nodes: INode[];
    pageInfo: IPageInfo;
    count: number;
  };
}

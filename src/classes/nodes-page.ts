export interface PageInfo {
  hasNextPage: boolean;
  endCursor: string;
}


export interface NodesPage<T> {
  totalCount:number;
  pageInfo:PageInfo;
  nodes:T[];
}

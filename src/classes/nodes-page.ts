export interface PageInfo {
  hasNextPage: boolean;
  endCursor: string;
}


export interface NodesPage<T> {
  totalCount:number;
  pageInfo:PageInfo;
  nodes:T[];
}

export function nodesPageSchema(nodeSchema:string){
  return `{
    totalCount
    pageInfo {
      hasNextPage
      endCursor
    }
    nodes ${nodeSchema}
  }`
}

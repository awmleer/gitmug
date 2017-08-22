export class RepoParam {
  owner:string;
  name:string;
}

export class RepoItem {
  owner:{
    login:string;
  };
  name:string;
  description:string;
  stargazers:{
    totalCount:number;
  };
  forks:{
    totalCount:number;
  };
  primaryLanguage:{
    name:string;
  };
  isPrivate:boolean;
}

export class RepoDetail extends RepoItem {
  watchers:{
    totalCount:number;
  };
  issues:{
    totalCount:number;
  };
  pullRequests:{
    totalCount:number;
  };
  releases:{
    totalCount:number;
  };
  updatedAt:string;
  isFork:boolean;
  isMirror:boolean;
  diskUsage:number;
  license:string;
  repositoryTopics:{
    nodes:{
      topic:{
        name:string;
      }
    }[];
  };
  viewerHasStarred:boolean;
}


export const repoItemSchema=`{
  owner{
    login
  }
  name
  description
  stargazers{
    totalCount
  }
  forks{
    totalCount
  }
  primaryLanguage{
    name
  }
  isPrivate
}`;

export const repoDetailSchema=`{
  name
  owner {
    login
  }
  description
  stargazers {
    totalCount
  }
  forks {
    totalCount
  }
  primaryLanguage {
    name
  }
  
  watchers{
    totalCount
  }
  issues {
    totalCount
  }
  pullRequests {
    totalCount
  }
  releases {
    totalCount
  }
  updatedAt
  isFork
  isPrivate
  isMirror
  diskUsage
  license
  repositoryTopics(first:100){
    nodes{
      topic{
        name
      }
    }
  }
  viewerHasStarred
}`;

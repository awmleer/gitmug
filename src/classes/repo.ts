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
}`;

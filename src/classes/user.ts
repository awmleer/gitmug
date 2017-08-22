import {RepoItem, repoItemSchema} from "./repo";


export class User {
  name:string='';
  login:string='';
}

export class UserStorage extends User {
  accessToken:string;
}

export class UserItem extends User {
  bio:string;
  avatarUrl:string;
}

export class UserProfile extends UserItem {
  followers:{
    totalCount:number;
  };
  following:{
    totalCount:number;
  };
  starredRepositories:{
    totalCount:number;
  };
  repositories:{
    totalCount:number;
  };
  pinnedRepositories:{
    nodes:RepoItem[];
  };
  company:string;
  location:string;
  email:string;
}

export const userSchema=`{
  name
  login
}`;

export const userItemSchema=`{
  name
  login
  bio
  avatarUrl
}`;

export const userProfileSchema=`{
  name
  login
  bio
  avatarUrl
  followers{
    totalCount
  }
  following{
    totalCount
  }
  starredRepositories{
    totalCount
  }
  repositories{
    totalCount
  }
  pinnedRepositories(first: 10){
    nodes ${repoItemSchema}
  }
  company
  location
  email
}`;

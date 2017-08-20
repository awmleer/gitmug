export class User {
  name:string;
  login:string;
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
    nodes:[{
      id:string;
      name:string;
      description:string;
    }];
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
    nodes{
      id,
      name,
      description
    }
  }
  company
  location
  email
}`;

export class User {
  name:string;
  login:string;
}


export class UserProfile {
  name:string;
  login:string;
  bio:string;
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


export class UserProfileOther extends UserProfile {

}


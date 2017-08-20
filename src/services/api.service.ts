import {Injectable} from '@angular/core';
import { request, GraphQLClient } from 'graphql-request'
import {CONST} from "../app/const";
import {Headers, Http, Response} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {User, UserItem, UserProfile, userProfileSchema, userSchema, userItemSchema} from "../classes/user";
import {NodesPage, nodesPageSchema} from "../classes/nodes-page";
import {RepoItem, repoItemSchema} from "../classes/repo";


@Injectable()
export class ApiService {
  private accessToken:string;
  private restfulHeaders:Headers;
  client:GraphQLClient;

  constructor(
    private http: Http
  ) {
    this.client=new GraphQLClient(CONST.graphqlUrl);
  }

  testQuery(){
    const query=`{
        viewer {
          login
          name
        }
      }`;
    this.client.request(query).then(data => {
      console.log(data);
    });
  }

  getAccessToken():string{
    return this.accessToken;
  }

  setAccessToken(newToken:string){
    this.accessToken=newToken;
    if (this.accessToken) {
      this.client=new GraphQLClient(CONST.graphqlUrl, { headers: {'Authorization':`bearer ${this.accessToken}`} });
      this.restfulHeaders=new Headers({'Authorization':`token ${this.accessToken}`})
    }else{
      this.client=new GraphQLClient(CONST.graphqlUrl);
      this.restfulHeaders=new Headers({});
    }
  }

  private restfulGet(url:string,params?:object):Promise<Response>{
    return this.http.get(CONST.apiUrl+url,{
      params:params,
      headers:this.restfulHeaders
    }).toPromise();
  }


  private userQueryString(login?:string):string{
    return login?`user(login: "${login}")`:'viewer';
  }


  getReceivedEvents(username){
    this.restfulGet(`/users/awmleer/received_events`).then((response)=>{
      console.log(response.json());
    });
  }


  getViewer():Promise<User>{
    const query=`{
      viewer ${userSchema}
    }`;
    return this.client.request(query).then(data=>{
      return data['viewer'];
    });
  }



  getMyProfile():Promise<UserProfile>{
    const query=`{
      viewer ${userProfileSchema}
    }`;
    return this.client.request(query).then(data=>{
      return data['viewer'];
    });
  }

  getUserProfile(login:string):Promise<UserProfile>{
    const query=`{
      user(login: "${login}") ${userProfileSchema}
    }`;
    return this.client.request(query).then(data=>{
      return data['user'];
    });
  }


  getFollowers(login:string):Promise<NodesPage<UserItem>>{
    const query=`{
      user(login: "${login}") {
        followers(first:30) ${nodesPageSchema(userItemSchema)}
      }
    }`;
    return this.client.request(query).then(data=>{
      return data['user']['followers'];
    });
  }

  getFollowing(login:string):Promise<NodesPage<UserItem>>{
    const query=`{
      user(login: "${login}") {
        following(first:30) ${nodesPageSchema(userItemSchema)}
      }
    }`;
    return this.client.request(query).then(data=>{
      return data['user']['following'];
    });
  }

  getStarredRepos(login?:string):Promise<NodesPage<RepoItem>>{
    const query=`{
      ${this.userQueryString(login)} {
    		starredRepositories(first:30) ${nodesPageSchema(repoItemSchema)}
      }
    }`;
    return this.client.request(query).then(data=>{
      if (login) {
        return data['user']['starredRepositories'];
      }else{
        return data['viewer']['starredRepositories'];
      }
    });
  }


}

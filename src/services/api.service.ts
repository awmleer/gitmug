import {Injectable} from '@angular/core';
import { request, GraphQLClient } from 'graphql-request'
import {CONST} from "../app/const";
import {Headers, Http, Response} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {User, UserItem, UserProfile} from "../classes/user";
import {NodesPage, PageInfo} from "../classes/nodes-page";


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


  getReceivedEvents(username){
    this.restfulGet(`/users/awmleer/received_events`).then((response)=>{
      console.log(response.json());
    });
  }


  getViewer():Promise<User>{
    const query=`{
      viewer {
        name
        login
      }
    }`;
    return this.client.request(query).then(data=>{
      return data['viewer'];
    });
  }

  getUserProfile():Promise<UserProfile>{
    const query=`{
      viewer {
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
      }
    }`;
    return this.client.request(query).then(data=>{
      return data['viewer'];
    });
  }


  getFollowers():Promise<NodesPage<UserItem>>{
    const query=`{
      viewer {
        followers(first:30){
          totalCount
          pageInfo{
            hasNextPage
            endCursor
          }
          nodes{
            name
            login
            bio
            avatarUrl
          }
        }
      }
    }`;
    return this.client.request(query).then(data=>{
      return data['viewer']['followers'];
    });
  }


}

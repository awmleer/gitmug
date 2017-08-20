import {Injectable} from '@angular/core';
import { request, GraphQLClient } from 'graphql-request'
import {CONST} from "../app/const";
import {Headers, Http, Response} from "@angular/http";
import 'rxjs/add/operator/toPromise';


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


  getViewer(){
    const query=`{
      viewer {
        name
        login
      }
    }`;
    return this.client.request(query);
  }





}

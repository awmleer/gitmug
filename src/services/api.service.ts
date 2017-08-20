import {Injectable} from '@angular/core';
import { request, GraphQLClient } from 'graphql-request'
import {CONST} from "../app/const";


@Injectable()
export class ApiService {
  private accessToken:string;
  client:GraphQLClient;

  constructor() {
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
    }else{
      this.client=new GraphQLClient(CONST.graphqlUrl);
    }
  }



}

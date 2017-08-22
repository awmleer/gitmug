import {Injectable} from '@angular/core';
import { request, GraphQLClient } from 'graphql-request'
import {CONST} from "../app/const";
import {Headers, Http, Response} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {User, UserItem, UserProfile, userProfileSchema, userSchema, userItemSchema} from "../classes/user";
import {NodesPage, nodesPageSchema} from "../classes/nodes-page";
import {RepoDetail, repoDetailSchema, RepoItem, repoItemSchema, RepoParam} from "../classes/repo";
import * as moment from 'moment';

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
    return this.http.get(url,{
      params:params,
      headers:this.restfulHeaders
    }).toPromise();
  }


  private userQueryString(login?:string):string{
    return login?`user(login: "${login}")`:'viewer';
  }

  private afterCursorString(cursor?:string):string{
    return cursor?`,after:"${cursor}"`:'';
  }


  getReceivedEvents(username){
    this.restfulGet(CONST.apiUrl+`/users/awmleer/received_events`).then((response)=>{
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


  getFollowers(login:string,cursor?:string):Promise<NodesPage<UserItem>>{
    const query=`{
      user(login: "${login}") {
        followers(first:30 ${this.afterCursorString(cursor)} ) ${nodesPageSchema(userItemSchema)}
      }
    }`;
    return this.client.request(query).then(data=>{
      return data['user']['followers'];
    });
  }

  getFollowing(login:string,cursor?:string):Promise<NodesPage<UserItem>>{
    const query=`{
      user(login: "${login}") {
        following(first:30 ${this.afterCursorString(cursor)} ) ${nodesPageSchema(userItemSchema)}
      }
    }`;
    return this.client.request(query).then(data=>{
      return data['user']['following'];
    });
  }

  getStargazers(repo:RepoParam,cursor?:string):Promise<NodesPage<UserItem>>{
    const query=`{
      repository(owner: "${repo.owner}", name: "${repo.name}") {
        stargazers(first:30 ${this.afterCursorString(cursor)} ) ${nodesPageSchema(userItemSchema)}
      }
    }`;
    return this.client.request(query).then(data=>{
      return data['repository']['stargazers'];
    });
  }

  getWatchers(repo:RepoParam,cursor?:string):Promise<NodesPage<UserItem>>{
    const query=`{
      repository(owner: "${repo.owner}", name: "${repo.name}") {
        watchers(first:30 ${this.afterCursorString(cursor)} ) ${nodesPageSchema(userItemSchema)}
      }
    }`;
    return this.client.request(query).then(data=>{
      return data['repository']['watchers'];
    });
  }

  getStarredRepos(login:''|string,cursor?:string):Promise<NodesPage<RepoItem>>{
    const query=`{
      ${this.userQueryString(login)} {
    		starredRepositories(first:30 ${this.afterCursorString(cursor)} , orderBy:{
          field:STARRED_AT,
          direction:DESC
        }) ${nodesPageSchema(repoItemSchema)}
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

  getOwnedRepos(login:''|string,cursor?:string):Promise<NodesPage<RepoItem>>{
    const query=`{
      ${this.userQueryString(login)} {
    		repositories(first:30 ${this.afterCursorString(cursor)} , orderBy:{
          field:UPDATED_AT,
          direction:DESC
        }) ${nodesPageSchema(repoItemSchema)}
      }
    }`;
    return this.client.request(query).then(data=>{
      if (login) {
        return data['user']['repositories'];
      }else{
        return data['viewer']['repositories'];
      }
    });
  }

  getHotRepos():Promise<NodesPage<RepoItem>>{
    //TODO use api V4
    return this.restfulGet(CONST.apiUrl+'/search/repositories',{
      'q':`created:>${moment().subtract(1,'months').format('YYYY-MM-DD')}`,
      'sort':'stars',
      'order':'desc'
    }).then((response:Response)=>{
      let items = response.json()['items'];
      let repos:RepoItem[]=[];
      for(let i=0; i<items.length; i++){
        if (i >= 30) break;
        let item=items[i];
        repos.push({
          owner:{
            login:item['owner']['login']
          },
          name:item['name'],
          description:item['description'],
          stargazers:{
            totalCount:item['stargazers_count']
          },
          forks:{
            totalCount:item['forks']
          },
          primaryLanguage:null
        });
      }
      return {
        totalCount:repos.length,
        pageInfo:{
          hasNextPage: false,
          endCursor: null
        },
        nodes:repos
      };
    });
  }

  searchRepos(searchText:string):Promise<NodesPage<RepoItem>>{
    const query=`{
      search(type: REPOSITORY, first: 30, query: "${searchText}") {
        totalCount: repositoryCount
        pageInfo{
          hasNextPage
          endCursor
        }
        nodes{
          ... on Repository ${repoItemSchema}
        }
      }
    }`;
    return this.client.request(query).then(data=>{
      return data['search'];
    });

  }


  getRepo(ownerLogin:string,name:string):Promise<RepoDetail>{//TODO refactor to RepoParam class
    const query=`{
      repository(owner: "${ownerLogin}", name: "${name}") ${repoDetailSchema}
    }`;
    return this.client.request(query).then(data=>{
      return data['repository'];
    })
  }

  getRepoReadme(repo:RepoParam):Promise<string>{
    return this.restfulGet(CONST.rawUrl+`/${repo.owner}/${repo.name}/master/README.md`).then((response:Response)=>{
      return response.text();
    }).catch(()=>{
      return null;
    });
  }

  // getRepoReadmeUrl(repo:RepoParam):Promise<string>{
  //   return this.restfulGet(CONST.apiUrl+`/repos/${repo.owner}/${repo.name}/readme`).then((response:Response)=>{
  //     return response.json()['html_url'];
  //   }).catch(()=>{
  //     return null;
  //   });
  // }


}

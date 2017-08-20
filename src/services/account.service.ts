import {Injectable} from '@angular/core';
import {InAppBrowser, InAppBrowserEvent} from "@ionic-native/in-app-browser";
import {Headers, Http, Response} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {AlertController} from "ionic-angular";
import {CONST} from "../app/const";
import {Storage} from "@ionic/storage";
import { request, GraphQLClient } from 'graphql-request'


@Injectable()
export class AccountService {

  public accessToken:string;

  constructor(
    private inAppBrowser: InAppBrowser,
    private alertCtrl: AlertController,
    private storage: Storage,
    private http: Http
  ) {}

  oAuth():Promise<null>{
    let state:string='';
    let possible="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 5; i++){
      state += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    const browser=this.inAppBrowser.create(`http://github.com/login/oauth/authorize?client_id=ca1ddf99e44c2e6cb787&redirect_uri=http%3A%2F%2Fgitpub%2Foauth%2Fcallback%2F&scope=user%20public_repo%20repo%20delete_repo%20notifications%20gist%20read:org%20read:public_key%20read:gpg_key&state=${state}`,'_blank');
    let code:string;
    if (!window['cordova']) {
      return new Promise(resolve => {
        this.alertCtrl.create({
          title: 'Please input the code parameter in the new page',
          inputs: [
            {
              name: 'code',
              placeholder: 'Code'
            }
          ],
          buttons: [
            {
              text: 'OK',
              handler: data => {
                this.getAccessToken(data.code,state).then(()=>{
                    resolve();
                });
              }
            }
          ]
        }).present();
      });

      // code=window.prompt('Please input the code parameter in the new page');
    }
    browser.show();
    browser.on('loadstart').subscribe((event:InAppBrowserEvent)=>{
      console.log(event);
      console.log(event.url);
      if (event.url.indexOf('http://gitpub/oauth/callback/')!=-1) {
        browser.close();
        code=event.url.match(/code=\w+/)[0].replace('code=','');
        let returnState=event.url.match(/state=\w+/)[0].replace('state=','');
        if (returnState != state) {
          throw new Error('State check fail');
        }
        return this.getAccessToken(code,state);
      }
    });
  }


  getAccessToken(code,state):Promise<null>{
    return this.http.post(`${CONST.githubUrl}/login/oauth/access_token`,
      `client_id=ca1ddf99e44c2e6cb787&client_secret=61335ff161c4c0fda8fbf68beb0e1bee55380414&code=${code}&redirect_uri=http%3A%2F%2Fgitpub%2Foauth%2Fcallback%2F&state=${state}`,
      {
        headers: new Headers({
          'Accept':'application/json',
          'Content-Type':'application/x-www-form-urlencoded'
        })
      }
    ).toPromise().then((response:Response)=>{
      let data = response.json();
      if (data['error']) {
        throw new Error(data['error']);
      }
      this.accessToken=data['access_token'];
      this.storage.set('accessToken',this.accessToken);
      console.log(this.accessToken);
      return;
    });
  }


  fetchAccessTokenFromStorage(){
    return this.storage.get('accessToken').then(data=>{
      this.accessToken=data;
    });
  }


  testQuery(){
    const query=`{
        viewer {
          login
          name
        }
      }`;
    const client = new GraphQLClient(CONST.graphqlUrl, { headers: {'Authorization':`bearer ${this.accessToken}`} });
    client.request(query).then(data => {
      console.log(data);
    });
  }




}

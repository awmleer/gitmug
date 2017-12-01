import {EventEmitter, Injectable} from '@angular/core';
import {InAppBrowser, InAppBrowserEvent} from "@ionic-native/in-app-browser";
import {Headers, Http, Response} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {AlertController} from "ionic-angular";
import {CONST} from "../app/const";
import {Storage} from "@ionic/storage";
import {ApiService} from "./api.service";
import {UserStorage} from "../classes/user";


@Injectable()
export class AccountService {
  user:UserStorage=new UserStorage();
  userUpdated:EventEmitter<null>=new EventEmitter<null>();
  // public accessToken:string;

  constructor(
    private inAppBrowser: InAppBrowser,
    private alertCtrl: AlertController,
    private storage: Storage,
    private apiSvc: ApiService,
    private http: Http,
  ) {}

  oAuth():Promise<void>{
    let state:string='';
    let possible="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 10; i++){
      state += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    const browser=this.inAppBrowser.create(`https://github.com/login/oauth/authorize?client_id=ca1ddf99e44c2e6cb787&redirect_uri=https%3A%2F%2Fawmleer.github.io%2FGitMug%2Foauth%2Fcallback.html&scope=user%20public_repo%20repo%20delete_repo%20notifications%20gist%20read:org%20read:public_key%20read:gpg_key&state=${state}`,'_blank');
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
                this.obtainAccessToken(data.code,state).then(()=>{
                    resolve();
                });
              }
            }
          ]
        }).present();
      });

      // code=window.prompt('Please input the code parameter in the new page');
    }else{
      browser.show();
      return new Promise((resolve, reject) => {
        let callbacksuccess=false;
        browser.on('loadstart').subscribe((event:InAppBrowserEvent)=>{
          // console.log(event);
          // console.log(event.url);
          if (event.url.indexOf('https://awmleer.github.io/GitMug/oauth/callback.html')!=-1) {
            callbacksuccess=true;
            browser.close();
            code=event.url.match(/code=\w+/)[0].replace('code=','');
            let returnState=event.url.match(/state=\w+/)[0].replace('state=','');
            if (returnState != state) {
              reject('State check fail');
            }
            this.obtainAccessToken(code,state).then(() => {
              resolve();
            });
          }
        });
        browser.on('exit').subscribe(() => {
          if (!callbacksuccess) {
            reject('Window closed');
          }
        });
      });

    }

  }


  obtainAccessToken(code,state):Promise<void>{
    return this.http.post(`${CONST.githubUrl}/login/oauth/access_token`,
      `client_id=ca1ddf99e44c2e6cb787&client_secret=61335ff161c4c0fda8fbf68beb0e1bee55380414&code=${code}&redirect_uri=https%3A%2F%2Fawmleer.github.io%2FGitMug%2Foauth%2Fcallback.html&state=${state}`,
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
      let accessToken=data['access_token'];
      this.apiSvc.setAccessToken(accessToken);
      this.user.accessToken=accessToken;
      this.userUpdated.emit();
      this.saveUserData();
      this.freshUser();
      return;
    });
  }

  saveUserData():Promise<void>{
    return this.storage.set('user',this.user);
  }

  fetchUserDataFromStorage():Promise<void>{
    return this.storage.get('user').then((user:UserStorage)=>{
      if (user) {
        this.user.login=user.login;
        this.user.name=user.name;
        this.user.accessToken=user.accessToken;
        this.userUpdated.emit();
        this.apiSvc.setAccessToken(this.user.accessToken);
      }
      return;
    });
  }


  freshUser():Promise<void>{
    if (!this.apiSvc.getAccessToken()) {
      throw new Error('No token');
    }
    return this.apiSvc.getViewer().then(user=>{
      this.user.login=user.login;
      this.user.name=user.name;
      this.userUpdated.emit();
      this.saveUserData();
    });
  }


  logout():Promise<void>{
    this.user=new UserStorage();
    this.userUpdated.emit();
    return this.saveUserData();
  }




}

import {Injectable} from '@angular/core';
import {InAppBrowser, InAppBrowserEvent} from "@ionic-native/in-app-browser";

@Injectable()
export class AccountService {

  constructor(
    private inAppBrowser: InAppBrowser
  ) {}

  oAuth(){
    const browser=this.inAppBrowser.create('http://github.com/login/oauth/authorize?client_id=ca1ddf99e44c2e6cb787&redirect_uri=http%3A%2F%2Fgitpub%2Foauth%2Fcallback%2F&scope=user%20public_repo%20repo%20delete_repo%20notifications%20gist%20read:org%20read:public_key%20read:gpg_key&state=fq0u52jq%5By3aeh%5D','_blank');
    console.log('aaa');
    browser.on('loadstart').subscribe((event:InAppBrowserEvent)=>{
      console.log(event);
      console.log(event.url);
    });
    browser.show();
  }
}

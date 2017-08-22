import { Pipe, PipeTransform } from '@angular/core';
import marked from 'marked';
import * as highlight from 'highlightjs';

@Pipe({
  name: 'markdownToHtml'
})
export class MarkdownToHtmlPipe implements PipeTransform {

  transform(text:string,baseUrl:string): string {
    //fix image file paths
    let m = marked.setOptions({
      highlight: function (code) {
        return highlight.highlightAuto(code).value;
      }
    });
    let html=m.parse(text);
    let dom=(new DOMParser()).parseFromString(html,'text/html');
    //fix <img>
    let imgs=dom.getElementsByTagName('img');
    for(let i=0;i<imgs.length;i++){
      let img=imgs[i];
      img.setAttribute(
        'src',
        img.getAttribute('src')
          .replace(/^\.\//,baseUrl+'/')
          .replace(/^\.\.\//,baseUrl+'/../')
      );
    }
    //fix <a>
    let aTags=dom.getElementsByTagName('a');
    for(let i=0;i<aTags.length;i++){
      aTags[i].removeAttribute('href');
    }
    return dom.getElementsByTagName('body')[0].innerHTML;
  }

}

import { Pipe, PipeTransform } from '@angular/core';
import marked from 'marked';
import * as highlight from 'highlightjs';

@Pipe({
  name: 'markdownToHtml'
})
export class MarkdownToHtmlPipe implements PipeTransform {

  transform(text: any): string {
    //fix image file paths
    let m = marked.setOptions({
      highlight: function (code) {
        return highlight.highlightAuto(code).value;
      }
    });
    let html=m.parse(text);
    let dom=(new DOMParser()).parseFromString(html,'text/html');
    console.log(html);
    return html;
  }

}

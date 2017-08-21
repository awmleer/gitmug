import {Component, Input} from '@angular/core';


@Component({
  selector: 'markdown',
  templateUrl: 'markdown.html'
})
export class MarkdownComponent {
  @Input()text: string;
  @Input()baseUrl: string;

  constructor() {}

}

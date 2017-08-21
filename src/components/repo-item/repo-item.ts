import {Component, Input} from '@angular/core';
import {RepoItem} from "../../classes/repo";
import {colors} from "../../classes/language-color";


@Component({
  selector: 'repo-item',
  templateUrl: 'repo-item.html'
})
export class RepoItemComponent {
  @Input() repo:RepoItem;
  @Input() showOwnerLogin:boolean=true;

  get languageColor():string{
    let color=colors[this.repo.primaryLanguage.name];
    if (!color) {
      color='#808080';
    }
    return color;
  }

  constructor() {}

}

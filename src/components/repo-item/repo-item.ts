import {Component, Input} from '@angular/core';
import {RepoItem} from "../../classes/repo";


@Component({
  selector: 'repo-item',
  templateUrl: 'repo-item.html'
})
export class RepoItemComponent {
  @Input() repo:RepoItem;
  @Input() showOwnerLogin:boolean=true;

  constructor() {}

}

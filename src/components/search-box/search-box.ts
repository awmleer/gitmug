import {Component, EventEmitter, Input, Output} from '@angular/core';


@Component({
  selector: 'search-box',
  templateUrl: 'search-box.html'
})
export class SearchBoxComponent {
  focusing:boolean=false;

  @Input()text: string;
  @Output()doSearch = new EventEmitter();
  @Output() textChange:EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  actionButtonClicked(){
    // this.focusing=true;//prevent button sliding to right
    this.textChange.emit(this.text);
    this.doSearch.emit();
  }

}

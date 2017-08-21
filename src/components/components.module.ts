import { NgModule } from '@angular/core';
import { RepoItemComponent } from './repo-item/repo-item';
import {CommonModule} from "@angular/common";
import {SearchBoxComponent} from "./search-box/search-box";
import {IonicModule} from "ionic-angular";
@NgModule({
	declarations: [
	  RepoItemComponent,
    SearchBoxComponent,
  ],
	imports: [
	  CommonModule,
    IonicModule,
  ],
	exports: [
	  RepoItemComponent,
    SearchBoxComponent,
  ]
})
export class ComponentsModule {}

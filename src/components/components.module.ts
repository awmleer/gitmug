import { NgModule } from '@angular/core';
import { RepoItemComponent } from './repo-item/repo-item';
import {CommonModule} from "@angular/common";
@NgModule({
	declarations: [
	  RepoItemComponent
  ],
	imports: [
	  CommonModule
  ],
	exports: [
	  RepoItemComponent
  ]
})
export class ComponentsModule {}

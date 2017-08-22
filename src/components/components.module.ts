import { NgModule } from '@angular/core';
import { RepoItemComponent } from './repo-item/repo-item';
import {CommonModule} from "@angular/common";
import {SearchBoxComponent} from "./search-box/search-box";
import {IonicModule} from "ionic-angular";
import { MarkdownComponent } from './markdown/markdown';
import {PipesModule} from "../pipes/pipes.module";


@NgModule({
	declarations: [
	  RepoItemComponent,
    SearchBoxComponent,
    MarkdownComponent,
  ],
	imports: [
	  CommonModule,
    IonicModule,
    PipesModule,
  ],
	exports: [
	  RepoItemComponent,
    SearchBoxComponent,
    MarkdownComponent,
  ]
})
export class ComponentsModule {}

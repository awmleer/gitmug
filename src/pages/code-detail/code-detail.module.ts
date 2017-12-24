import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CodeDetailPage } from './code-detail';
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    CodeDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(CodeDetailPage),
    PipesModule,
  ],
})
export class CodeDetailPageModule {}

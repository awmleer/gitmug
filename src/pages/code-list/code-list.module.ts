import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CodeListPage } from './code-list';

@NgModule({
  declarations: [
    CodeListPage,
  ],
  imports: [
    IonicPageModule.forChild(CodeListPage),
  ],
})
export class CodeListPageModule {}

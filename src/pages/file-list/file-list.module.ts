import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FileListPage } from './file-list';

@NgModule({
  declarations: [
    FileListPage,
  ],
  imports: [
    IonicPageModule.forChild(FileListPage),
  ],
})
export class FileListPageModule {}

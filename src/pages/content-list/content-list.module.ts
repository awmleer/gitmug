import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContentListPage } from './content-list';

@NgModule({
  declarations: [
    ContentListPage,
  ],
  imports: [
    IonicPageModule.forChild(ContentListPage),
  ],
})
export class ContentListPageModule {}

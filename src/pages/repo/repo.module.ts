import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RepoPage } from './repo';

@NgModule({
  declarations: [
    RepoPage,
  ],
  imports: [
    IonicPageModule.forChild(RepoPage),
  ],
})
export class RepoPageModule {}

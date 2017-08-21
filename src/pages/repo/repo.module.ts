import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RepoPage } from './repo';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    RepoPage,
  ],
  imports: [
    IonicPageModule.forChild(RepoPage),
    ComponentsModule,
  ],
})
export class RepoPageModule {}

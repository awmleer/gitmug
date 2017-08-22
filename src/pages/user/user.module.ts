import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {UserPage} from './user';
import {ComponentsModule} from "../../components/components.module";
import {MePage} from "./me";

@NgModule({
  declarations: [
    UserPage,
    MePage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(UserPage),
    IonicPageModule.forChild(MePage),
  ],
})
export class UserPageModule {}

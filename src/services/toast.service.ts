import {Injectable} from "@angular/core";
import {Toast, ToastController} from "ionic-angular";


@Injectable()
export class ToastService {
  constructor(
    private toastCtrl: ToastController
  ){}

  t: Toast;

  toast(message:string,duration:number=2000):void{
    if (this.t) {
      this.t.dismiss();
    }
    this.t=this.toastCtrl.create({
      message: message,
      duration: duration,
      showCloseButton: true,
      closeButtonText: 'OK',
      position: 'bottom'
    });
    this.t.present();
  }
}

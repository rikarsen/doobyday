import { Component, ViewChild } from '@angular/core';
import { Nav, NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { LoginPage } from '../login/login';
import { AuthenticationProvider } from '../../providers/auth/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  constructor (public navCtrl: NavController,
               private auth: AuthenticationProvider) {

  }

  public login (): void {
    this.auth.signOut();
    this.navCtrl.setRoot(LoginPage);
  }

  public logout (): void {
    this.auth.signOut();
    this.navCtrl.setRoot(TabsPage);
  }
}

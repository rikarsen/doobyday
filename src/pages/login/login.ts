import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomePage } from '../home/home';
import { AuthenticationProvider } from '../../providers/auth/auth';
import { SignupPage } from '../signup/signup';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public loginForm: FormGroup;
  public loginError: string;

  constructor (public navCtrl: NavController,
               private auth: AuthenticationProvider,
               private fb: FormBuilder) {
    this.loginForm = fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    });
  }

  ionViewDidLoad (): void {
  }

  public login (): void {
    let data = this.loginForm.value;

    if (!data.email) {
      return;
    }

    let credentials = {
      email: data.email,
      password: data.password,
    };
    this.auth.signInWithEmail(credentials)
      .then(
        () => this.navCtrl.setRoot(HomePage),
        error => this.loginError = error.message,
      );
  }

  public loginWithGoogle (): void {
    this.auth.signInWithGoogle()
      .then(() => this.navCtrl.setRoot(TabsPage),
        error => console.log(error.message));
  }

  public signup (): void {
    this.navCtrl.push(SignupPage);
  }
}

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomePage } from '../home/home';
import { AuthenticationProvider } from '../../providers/auth/auth';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  public signupError: string;
  public signupForm: FormGroup;

  constructor (public navCtrl: NavController,
               public fb: FormBuilder,
               private auth: AuthenticationProvider) {
    this.signupForm = fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    });
  }

  ionViewDidLoad () {
    console.log('ionViewDidLoad SignupPage');
  }

  signup (): void {
    let data = this.signupForm.value;
    let credentials = {
      email: data.email,
      password: data.password,
    };
    this.auth.signUp(credentials).then(
      () => this.navCtrl.setRoot(HomePage),
      error => this.signupError = error.message,
    );
  }

}

import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import firebase from 'firebase/app';

@Injectable()
export class AuthProvider {

  constructor(public afAuth: AngularFireAuth) {
  }

  loginUser(newEmail: string, newPassword: string): Promise<void> {
    return this.afAuth.auth.signInWithEmailAndPassword(newEmail, newPassword);
  }

  resetPassword(email: string): Promise<void> {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  logoutUser() {
    return this.afAuth.auth.signOut();
  }

  signupUser(newEmail: string, newPassword: string): Promise<void> {
    return this.afAuth.auth.createUserWithEmailAndPassword(newEmail, newPassword);
  }

  showUser() {
    return firebase.auth().currentUser;
  }

}

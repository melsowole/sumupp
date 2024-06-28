import {signIn} from '../modules/firebase.js';

export default class SignInPage{
  constructor(){
    const container = document.createElement("div");
    container.id = 'firebaseui-auth-container';

    document.body.append(container);

    signIn(container);
    
  }
}
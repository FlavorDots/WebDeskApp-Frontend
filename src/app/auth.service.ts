import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';

  public username: String = '';
  public password: String = '';

  constructor(private http: HttpClient) {}

  authenticationService(username: String, password: String) {
    return this.http
      .get(`http://localhost:8081/webapp/login/`, {
        headers: {
          Authorization: this.createBasicAuthToken(username, password),
        },
      })
      .pipe(
        map((res) => {
          this.username = username;
          this.password = password;
          this.registerSuccessfulLogin(username, password);
        })
      );
  }

  createBasicAuthToken(username: String, password: String) {
    return 'Basic ' + window.btoa(username + ':' + password);
  }

  registerSuccessfulLogin(username: any, password: String) {
    let basicAuthToken = this.createBasicAuthToken(username, password);
    // console.log(basicAuthToken);
    sessionStorage.setItem(
      this.USER_NAME_SESSION_ATTRIBUTE_NAME,
      basicAuthToken
    );

    // console.log(username);
    // console.log(password);
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    if (user === null) return false;

    return true;
  }

  getLoggedInUserName() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    if (user === null) return '';

    return user;
  }

  getIt() {
    return sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
  }

  logout() {
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    // this.username = null;
    // this.password = null;
  }
}
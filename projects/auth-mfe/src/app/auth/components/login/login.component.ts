import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  ngOnInit(): void {
    sessionStorage.setItem('authKey', 'randomUUID');
  }

  login() {
    console.log('dispatch event')
    const event = new CustomEvent('loginSuccess', { detail: { name: 'testuser' } });
    window.dispatchEvent(event);
  }
}

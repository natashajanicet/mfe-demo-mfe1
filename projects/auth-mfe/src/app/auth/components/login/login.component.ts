import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TitleTranslateService } from '../../../shared/services/title-translate.service';
import { TestService } from '../../services/test.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  assetsUrl = __webpack_public_path__;

  constructor(private titleService: TitleTranslateService, private testService: TestService) {
  }

  ngOnInit(): void {
    console.log('login component')
    this.titleService.setTitle('one');
    sessionStorage.setItem('authKey', 'randomUUID');
    this.testService.test()
  }

  login() {
    console.log('dispatch event');
    const event = new CustomEvent('loginSuccess', {
      detail: { name: 'testuser' },
    });
    window.dispatchEvent(event);
  }
}

import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TokenHandlerDirective } from './shared/directives/token-handler.directive';
import { Router } from '@angular/router';
import { Idle } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends TokenHandlerDirective {
  title = 'auth-mfe';

  

  constructor(private translate: TranslateService, protected override idle: Idle, protected override keepalive: Keepalive, protected override router: Router) {
    super(idle, keepalive, router);
    console.log('app module');
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('id');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('id');
  }

  toggleLanguage() {
    if (this.translate.currentLang === 'id') {
      this.translate.use('en');
    } else {
      this.translate.use('id');
    }
  }
}

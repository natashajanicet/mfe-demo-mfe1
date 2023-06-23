import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class TitleTranslateService {

  constructor(
    private translateService: TranslateService,
    private titleService: Title
  ) { }

  setTitle(translationKey: string) {
    this.translateService
      .get(translationKey)
      .subscribe((value) => this.titleService.setTitle(value));
  }
}

import {
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class ContainerComponent implements OnInit, OnDestroy {
  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {
    window.addEventListener('changeLang', this.onLanguageChange);
  }

  ngOnDestroy(): void {
    window.removeEventListener('changeLang', this.onLanguageChange);
  }

  onLanguageChange = (event: any) => {
    // if (event.detail.lang && )
    this.translateService.use(event.detail.lang);
  };
}

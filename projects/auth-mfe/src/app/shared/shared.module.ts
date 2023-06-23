import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthInputComponent } from './components/auth-input/auth-input.component';
import { CustomSpacerPipe } from './pipes/custom-spacer.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { TitleTranslateService } from './services/title-translate.service';
import { TokenHandlerDirective } from './directives/token-handler.directive';



@NgModule({
  declarations: [AuthInputComponent, CustomSpacerPipe, TokenHandlerDirective],
  imports: [
    CommonModule,
    TranslateModule,
  ],
  exports: [
    AuthInputComponent,
    CustomSpacerPipe,
    TranslateModule
  ],
  providers: [TitleTranslateService],
})
export class SharedModule { }

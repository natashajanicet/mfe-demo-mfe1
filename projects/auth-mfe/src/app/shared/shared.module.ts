import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthInputComponent } from './components/auth-input/auth-input.component';
import { CustomSpacerPipe } from './pipes/custom-spacer.pipe';



@NgModule({
  declarations: [AuthInputComponent, CustomSpacerPipe],
  imports: [
    CommonModule
  ],
  exports: [
    AuthInputComponent,
    CustomSpacerPipe
  ]
})
export class SharedModule { }

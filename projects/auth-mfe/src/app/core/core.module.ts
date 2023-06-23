import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './container/container.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ContainerComponent],
  imports: [CommonModule, RouterModule],
  exports: [ContainerComponent],
})
export class CoreModule {}

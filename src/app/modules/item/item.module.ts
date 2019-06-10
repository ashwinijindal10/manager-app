import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [AddComponent, ListComponent],
  imports: [
    CommonModule
  ]
})
export class ItemModule { }

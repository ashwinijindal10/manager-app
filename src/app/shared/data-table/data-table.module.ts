import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { TmpGridComponent } from './tmp-grid/tmp-grid.component';
// import { PaginationComponent } from './pagination/pagination.component';
import { MaterialModule } from '../../material/material.module';

@NgModule({
  declarations: [
    TmpGridComponent
    // PaginationComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    // PaginationComponent
  ]
})
export class DataTableModule {}

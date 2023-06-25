import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HasErrorImageDirective } from './directives/hasErrorImage.directive';
import { ProgressBarComponent } from './progress-bar/process-bar.component';
import { SearchComponent } from './search/search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';

const declarations: any = [
  HasErrorImageDirective,
  SearchComponent,
  ProgressBarComponent
]
@NgModule({
  declarations: [
   ...declarations
   ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    ...declarations,
    MaterialModule,
  ]
})
export class SharedModule { }

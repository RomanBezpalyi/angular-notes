import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { LabelsFormComponent } from './labels-form/labels-form.component';
import { LabelsTableComponent } from './labels-table/labels-table.component';
import { LabelsComponent } from './labels.component';

import { AuthGuard } from '../auth/auth.guard';

@NgModule({
  declarations: [LabelsComponent, LabelsTableComponent, LabelsFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: LabelsComponent, canActivate: [AuthGuard] },
    ]),
  ],
})
export class LabelsModule {}

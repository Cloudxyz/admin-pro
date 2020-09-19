import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ProfileComponent } from './profile/profile.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
    AccountSettingsComponent,
    ProfileComponent,
  ],
  exports: [
    DashboardComponent,
    PagesComponent,
    AccountSettingsComponent,
    RouterModule,
  ],
  imports: [CommonModule, SharedModule, RouterModule, ReactiveFormsModule],
})
export class PagesModule {}

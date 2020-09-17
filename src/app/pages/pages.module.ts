import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

@NgModule({
  declarations: [DashboardComponent, PagesComponent, AccountSettingsComponent],
  exports: [
    DashboardComponent,
    PagesComponent,
    AccountSettingsComponent,
    RouterModule,
  ],
  imports: [CommonModule, SharedModule, RouterModule],
})
export class PagesModule {}

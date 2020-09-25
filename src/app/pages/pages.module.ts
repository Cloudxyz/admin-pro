import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './maintenances/users/users.component';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
    AccountSettingsComponent,
    ProfileComponent,
    UsersComponent,
  ],
  exports: [
    DashboardComponent,
    PagesComponent,
    AccountSettingsComponent,
    RouterModule,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
  ],
})
export class PagesModule {}

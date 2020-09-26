import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ProfileComponent } from './profile/profile.component';

// Maintenances
import { UsersComponent } from './maintenances/users/users.component';
import { AdminGuard } from '../guards/admin.guard';

const childRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'account-settings',
    component: AccountSettingsComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },

  // Maintenances

  // Admin Routes
  {
    path: 'users',
    canActivate: [AdminGuard],
    component: UsersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule],
})
export class ChildRoutesModule {}

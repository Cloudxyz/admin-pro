import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesRoutingModule } from './pages/pages.routing';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthRoutingModule } from './auth/auth.routing';

const routes: Routes = [
  // path: /dashboard PagesRoutingModule
  // path: /login AuthRoutingModule
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

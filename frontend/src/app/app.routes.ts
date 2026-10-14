import { Routes } from '@angular/router';

import { UsersPage } from './features/users/components/users-page/users-page';
import { Login } from './features/auth/pages/login/login';
import { Register } from './features/auth/pages/register/register';
import { ShopPage } from './features/shop/components/shop-page/shop-page';
import { UserDetails } from './features/users/components/user-details/user-details';
import { authGuard } from './features/auth/guards/auth.guard';
import { guestGuard } from './features/auth/guards/guest.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
  },
  {
    path: 'users',
    component: UsersPage,
  },
  {
    path: 'users/:id',
    component: UserDetails,
  },
  {
    path: 'shop',
    component: ShopPage,
    canActivate: [authGuard],
  },
  {
    path: 'login',
    component: Login,
    canActivate: [guestGuard],
  },
  {
    path: 'register',
    component: Register,
    canActivate: [guestGuard],
  },
  {
    path: '**',
    redirectTo: 'users',
  },
];

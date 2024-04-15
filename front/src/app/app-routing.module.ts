import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SignupPage } from './auth/signup/signup.page';
import { LoginPage } from './auth/login/login.page';
import { AuthguardGuard } from './services/authguard.guard';
import { RoleGuard } from './services/roleguard.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default redirect to login

  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate:[AuthguardGuard,RoleGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./auth/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./orders/orders.module').then( m => m.OrdersPageModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then( m => m.AccountPageModule)
  },
  {
    path: 'track-order',
    loadChildren: () => import('./track-order/track-order.module').then( m => m.TrackOrderPageModule)
  },
  {
    path: 'delivery-partner',
    loadChildren: () => import('./delivery-partner/delivery-partner.module').then( m => m.DeliveryPartnerPageModule)
  },
  {
    path: 'create-order',
    loadChildren: () => import('./create-order/create-order.module').then( m => m.CreateOrderPageModule)
  },
  {
    path: 'vitals',
    loadChildren: () => import('./vitals/vitals.module').then( m => m.VitalsPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

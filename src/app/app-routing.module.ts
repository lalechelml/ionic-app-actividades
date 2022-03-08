import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'general/index',
    loadChildren: () =>
      import('./general/index/index.module').then((m) => m.IndexPageModule),
  },
  {
    path: 'user/register',
    loadChildren: () =>
      import('./page/user/register/register.module').then(
        (m) => m.RegisterPageModule
      ),
  },
  {
    path: 'schedule/insert',
    loadChildren: () =>
      import('./page/schedule/insert/insert.module').then(
        (m) => m.InsertPageModule
      ),
  },
  {
    path: 'schedule/list',
    loadChildren: () =>
      import('./page/schedule/list/list.module').then((m) => m.ListPageModule),
  },
  {
    path: 'edit',
    loadChildren: () => import('./page/schedule/edit/edit.module').then( m => m.EditPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path:'home',
        loadChildren: () => import('./modules/welcome/welcome.module').then(module => module.WelcomeModule)
    },
    {
      path: 'games',
      loadChildren: () => import('./modules/games/games.module').then(module => module.GamesModule)
    },
    {
      path:'',
      redirectTo: '/home',
      pathMatch: 'full'
    }
    
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

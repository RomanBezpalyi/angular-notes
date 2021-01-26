import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { NotesComponent } from './notes/notes.component';
import { NotesModule } from './notes/notes.module';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/notes' },
  { path: 'notes', component: NotesComponent },
  { path: 'auth', component: AuthComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }),
    NotesModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

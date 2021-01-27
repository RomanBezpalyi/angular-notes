import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthModule } from './auth/auth.module';
import { NotesComponent } from './notes/notes.component';
import { NotesModule } from './notes/notes.module';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/notes' },
  { path: 'notes', loadChildren: './notes/notes.module#NotesModule' },
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }),
    NotesModule,
    AuthModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

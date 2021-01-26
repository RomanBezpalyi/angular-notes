import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NotesRoutingModule } from './notes-routing.module';

import { NoteFormComponent } from './note-form/note-form.component';
import { NoteListComponent } from './note-list/note-list.component';
import { NoteComponent } from './note-list/note/note.component';
import { NoteFilterComponent } from './note-filter/note-filter.component';
import { NotesComponent } from './notes.component';

@NgModule({
  declarations: [
    NotesComponent,
    NoteFormComponent,
    NoteListComponent,
    NoteComponent,
    NoteFilterComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    ReactiveFormsModule,
    NotesRoutingModule,
  ],
})
export class NotesModule {}

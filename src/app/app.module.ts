import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { EffectsModule } from "@ngrx/effects";

import { ReactiveFormsModule } from "@angular/forms";

import { environment } from "../environments/environment";

import { AppComponent } from "./app.component";
import { NoteFormComponent } from "./notes/note-form/note-form.component";
import { NoteListComponent } from "./notes/note-list/note-list.component";
import { NoteComponent } from "./notes/note-list/note/note.component";

import * as fromApp from "./store";
import { NotesEffects } from "./notes/store";
import { NoteFilterComponent } from './notes/note-filter/note-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    NoteFormComponent,
    NoteListComponent,
    NoteComponent,
    NoteFilterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([NotesEffects]),
    StoreDevtoolsModule.instrument({logOnly: environment.production}),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { EffectsModule } from "@ngrx/effects";

import { environment } from "../environments/environment";

import { AppRoutingModule } from "./app-routing.module";

import * as fromApp from "./store";
import { NotesEffects } from "./notes/store";

import { AuthComponent } from './auth/auth.component';
import { AppComponent } from "./app.component";

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([NotesEffects]),
    StoreDevtoolsModule.instrument({logOnly: environment.production}),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

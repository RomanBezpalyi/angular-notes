import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { map } from "rxjs/operators";

import * as fromApp from "../../store";
import * as FiltersActions from "./store";

@Component({
  selector: "app-note-filter",
  templateUrl: "./note-filter.component.html",
  styleUrls: ["./note-filter.component.css"],
})
export class NoteFilterComponent implements OnInit, OnDestroy {
  noteFilterForm: FormGroup;
  subscription: Subscription;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.noteFilterForm = new FormGroup({
      query: new FormControl(''),
      status: new FormControl(''),
    });

    this.subscription = this.store.select("filters").subscribe((storeData) => {
        this.noteFilterForm.setValue({
          query: storeData.query,
          status: storeData.status,
        });
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onQueryChange() {
    this.store.dispatch(
      new FiltersActions.SetQueryFilter(this.noteFilterForm.get("query").value)
    );
  }

  onStatusChange() {
    this.store.dispatch(
      new FiltersActions.SetStatusFilter(
        this.noteFilterForm.get("status").value
      )
    );
  }
}

import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "app-list-search",
  templateUrl: "./list-search.component.html",
  styleUrls: ["./list-search.component.css"]
})
export class ListSearchComponent implements OnInit {
  listForm: FormGroup;

  @Output() inputText = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {
    this.listForm = new FormGroup({
      query: new FormControl("")
    });
  }

  get query() {
    return this.listForm.get("query");
  }

  onSubmit() {
    this.inputText.emit(this.listForm.get("query").value);
    this.listForm.reset();
  }
}

import {Component, OnInit} from '@angular/core';
import {Validators, FormBuilder} from "@angular/forms";
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    constructor(private formBuilder: FormBuilder) {}

    searchForm: FormGroup;

    ngOnInit() {
        this.searchForm = this.formBuilder.group({
            searchText: ["", Validators.required],
            searchEngine: ["", [Validators.required]]
        })
    }


    doSearch(event) {
        if(this.searchForm.value.searchEngine == 'google')
            window.open("https://www.google.com/search?q=" + this.searchForm.value.searchText, "_blank");
        else if(this.searchForm.value.searchEngine == 'bing')
            window.open("https://www.bing.com/search?q=" + this.searchForm.value.searchText, "_blank");
        else if(this.searchForm.value.searchEngine == 'ask')
            window.open("https://www.ask.com/search?q=" + this.searchForm.value.searchText, "_blank");

    }
}

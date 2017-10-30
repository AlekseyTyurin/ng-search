import {Component, OnInit} from '@angular/core';
import {Validators, FormBuilder} from "@angular/forms";
import {FormGroup, FormControl} from '@angular/forms';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    public searchForm: FormGroup;

    constructor(private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.searchForm = this.formBuilder.group({
            searchText: ["", Validators.required],
            searchEngine: ["", [Validators.required]]
        })
    }

    isFieldValid(field: string) {
        return !this.searchForm.get(field).valid && this.searchForm.get(field).touched;
    }

    displayFieldCss(field: string) {
        return {
            'has-error': this.isFieldValid(field),
            'has-feedback': this.isFieldValid(field)
        };
    }

    doSearch(event) {
        this.validateAllFormFields(this.searchForm);
        if (this.searchForm.value.searchEngine == 'google' && this.searchForm.value.searchText != "")
            window.open("https://www.google.com/search?q=" + this.searchForm.value.searchText, "_blank");
        else if (this.searchForm.value.searchEngine == 'bing' && this.searchForm.value.searchText != "")
            window.open("https://www.bing.com/search?q=" + this.searchForm.value.searchText, "_blank");
        else if (this.searchForm.value.searchEngine == 'ask' && this.searchForm.value.searchText != "")
            window.open("https://www.ask.com/search?q=" + this.searchForm.value.searchText, "_blank");
    }

    validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({onlySelf: true});
            } else if (control instanceof FormGroup) {
                this.validateAllFormFields(control);
            }
        });
    }

}

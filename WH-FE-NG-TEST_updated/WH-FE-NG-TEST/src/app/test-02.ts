/**
 * Update the following components to meet the requirements : 
 * * Bind `field` of [textfield] component to its text input
 * * Pass value of `field` from [textfield] component to [title] property of component [ng-app]
 */
import {Component, EventEmitter, NgModule, Output} from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";

@Component({
    selector : 'textfield',
    template : '<input type="text" [(ngModel)]="field" (ngModelChange)="onFieldChange()"/>'
})
export class TextField {
    field = "";
    @Output() fieldChanged = new EventEmitter<string>();

    onFieldChange() {
        this.fieldChanged.emit(this.field);
    }
}

@Component({
    selector : 'child-component',
    template : `<h2>Title:</h2><br/><textfield (fieldChanged)="handleFieldChanged($event)"></textfield>`

})
export class ChildComponent {
    @Output() fieldChanged = new EventEmitter<string>();

    handleFieldChanged(value) {
        this.fieldChanged.emit(value);
    }
}


@Component({
    selector : 'ng-app',
    template : `<div>
                    <child-component (fieldChanged)="handleFieldChanged($event)"></child-component> <br/>
                    Title is {{title}}
                </div>`
})
export class Test02Component {

    title:string = "";

    handleFieldChanged(value) {
        this.title = value;
    }
}

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: "",
                component: Test02Component
            }
        ]),
        FormsModule
    ],
    declarations : [Test02Component,ChildComponent,TextField]
})
export class Test02Module {};
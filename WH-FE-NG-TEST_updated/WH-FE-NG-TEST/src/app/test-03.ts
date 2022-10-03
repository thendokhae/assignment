/**
 * Update the following components to meet the requirements : 
 * 
 * * Bind [email] property to input[name="email"]
 * * Bind [password] property to input[name="password"]
 * 
 * Without using angular forms, validate both fields so that :
 * * email is in correct format ( ex: ends with @a.com)
 * * password contains at least one special character, one upper case character, one lower case character, one number and a minium of 8 characters in length
 * * The fields should be validated when trying to submit the form
 * * Prevent the form from doing an actual form submit and instead, after validation pass, turn on the [logged_in] flag
 * 
 * You can add error messages below each field that shows if the field is not valid
 */
import {Component, ElementRef, NgModule, ViewChild} from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";

@Component({
    selector : 'ng-app',
    template : `<form (ngSubmit)="onSubmit()" #loginForm>
                    <h2>Login</h2>
                    <br/>
                    <input type="email" value="" name="email" [ngModel]="email" required #userEmail="ngModel" (ngModelChange)="onValueChange()"
                           pattern="[^@]+@[^@]+\\.[a-zA-Z]{2,}"/>
                    <div *ngIf="!userEmail.valid && submitted"> Email address is not valid.</div>
                    <br/>
                    <input type="password" value="" name="password" [ngModel]="password" #userPassword="ngModel" required
                           pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,}$" (ngModelChange)="onValueChange()"/>
                    <div *ngIf="!userPassword.valid && submitted">Password is not valid</div>
                    <button type="submit">Submit</button>
                    <br/><br/>
                    <div *ngIf="logged_in">Logged In!</div>
                </form>`
})
export class Test03Component {

    email:string = "";
    password:string = "";

    @ViewChild('loginForm') loginForm: ElementRef<HTMLFormElement>;

    logged_in = false;
    submitted = false;

    onSubmit() {
        this.submitted = true;
        console.log('form', this.loginForm.nativeElement.checkValidity());
        if (this.loginForm.nativeElement.checkValidity()) {
            this.logged_in = true;
        }
    }

    onValueChange() {
        this.submitted = false;
    }
}

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: "",
                component: Test03Component
            }
        ]),
        FormsModule
    ],
    declarations : [Test03Component]
})
export class Test03Module {};
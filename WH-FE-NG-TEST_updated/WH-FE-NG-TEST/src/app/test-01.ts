/**
 * In the following component, update the code so that when the value of the [loan-amount] is changed:
 * * If it's blank or 0, the values of [monthly_payment] and [late_payment] becomes "N/A",
 * * If it has a value, the value of [monthly_payment] becomes 2% of [loan-ammount] and the value of [late_payment] becomes 5% of [monthly_payment].
 * * Both [monthly_payment] and [late_payment] should print in the template in currency format : $1,234
 */

import { Component, Input,NgModule  } from '@angular/core';
import { RouterModule } from "@angular/router";
import {CommonModule} from "@angular/common";

@Component({
    selector : 'ng-app',
    template : `<div>
                    <h2>Loan Details</h2>
                    <b>Monthly Payment:</b> {{(loan_amount && loan_amount > 0) ? (monthly_payment  | currency:'USD':'symbol':'1.0-0') : 'N/A'}} <br/>
                    <b>Late Payment Fee : {{(loan_amount && loan_amount > 0) ? (late_payment | currency:'USD':'symbol':'1.0-0') : 'N/A'}}</b> <br/>
                </div>`
})
export class Test01Component {

    loan_amount:number = 95885;
    monthly_payment:number = 200;
    late_payment = 10;

    constructor() {
        this.calculatePaymentValues();
    }
    calculatePaymentValues() {
        if (this.loan_amount && this.loan_amount > 0) {
            this.monthly_payment = this.loan_amount * 0.02;
            this.late_payment = this.loan_amount * 0.05;
        }
    }
}

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: "",
                component: Test01Component
            }
        ]),
        CommonModule
    ],
    declarations : [Test01Component]
})
export class Test01Module {}
/**
 * Fix the following issues in the component :
 * * ExpressionChangedAfterItHasBeenCheckedError
 * * Spot the memory leak
 * 
 */
import {Component, NgModule, Injectable, Input, OnInit, AfterViewInit, OnDestroy} from '@angular/core';
import { RouterModule, Router} from "@angular/router";
import { CommonModule } from '@angular/common';
import {BehaviorSubject, Subscription} from 'rxjs';


@Injectable()
export class TestService {
    test:BehaviorSubject<string>;

    constructor() {
        this.test  = new BehaviorSubject("angular test #5");
    }

    SetTest(test:string) {
        this.test.next(test);
    }
}

@Component({
    selector : 'ng-app',
    template : `
                <h2>Current test is:</h2>
                {{test}}
                <br/>
                <child [skip-current]="true"></child>
                `,
    styles : []
})
export class MainComponent implements OnInit, OnDestroy{
    test:string = null;
    subscriptions: Subscription;
    constructor(private _srv:TestService) {
        this.subscriptions = new Subscription();
    }

    ngOnInit() {
        this.subscriptions.add(this._srv.test.subscribe(test=>{
            this.test = test;
        }));
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}

@Component({
    selector : 'child',
    template : `Sample Child component<br/> <button (click)="Next()">next test</button>`
    
})
export class TextChildComponent implements AfterViewInit{
    
    @Input('skip-current') skip = false;

    constructor(private _srv:TestService, private _router:Router) {

    }

    Next() {
        this._router.navigate(["test-six"]);
    }

    ngAfterViewInit() {
        setTimeout(() => {
            if(this.skip) this._srv.SetTest("angular test #6");
        })
    }

}

@NgModule({
    imports : [
        CommonModule,
        RouterModule.forChild([
            {
                path : "",
                component : MainComponent
            }
        ])
    ],
    declarations : [MainComponent,TextChildComponent],
    providers : [TestService]
})
export class MainModule {};
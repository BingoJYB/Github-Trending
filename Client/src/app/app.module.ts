import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {Ng2OrderModule} from 'ng2-order-pipe';


import {AppComponent} from './app.component';
import {HttpService} from "./http.service";


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        Ng2OrderModule
    ],
    providers: [HttpService],
    bootstrap: [AppComponent]
})
export class AppModule {
}

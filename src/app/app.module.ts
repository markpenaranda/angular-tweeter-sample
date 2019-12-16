import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgbModule, NgbTabsetModule} from '@ng-bootstrap/ng-bootstrap';
import { TweetTableComponent } from './tweet-table/tweet-table.component';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { TweetState } from './store/tweet/tweet.state';

@NgModule({
  declarations: [
    AppComponent,
    TweetTableComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgbTabsetModule,
    NgxsModule.forRoot([TweetState])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

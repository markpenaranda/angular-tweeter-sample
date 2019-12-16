import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { BlankSearchQuery } from './store/tweet/tweet.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tweets-sample-angular';

  constructor(private store: Store) {}

  searchTypes = ['hashtags', 'users']

  onTabChange() {
    this.store.dispatch(new BlankSearchQuery())
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { LoadTweets, BlankSearchQuery } from '../store/tweet/tweet.action';
import { Observable, Subject } from 'rxjs';
import { Tweet } from '../models/tweet.model';
import { TweetState } from '../store/tweet/tweet.state';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-tweet-table',
  templateUrl: './tweet-table.component.html',
  styleUrls: ['./tweet-table.component.scss']
})
export class TweetTableComponent implements OnInit {

  @Input() searchType: string

  searchString: Subject<string> = new Subject();

  @Select(TweetState.tweets) tweets$: Observable<Tweet []>

  @Select(TweetState.currentSearchQuery) currentSearchQuery$: Observable<string>
  
  @Select(TweetState.currentTotalCount) currentTotalCount$: Observable<number>

  @Select(TweetState.loading) loading$: Observable<boolean>

  @Select(TweetState.loaded) loaded$: Observable<boolean>

  constructor(
    private store: Store
  ) { }

  
  ngOnInit() {
    this.searchString.pipe(debounceTime(500)).subscribe(query => {
      if(query) {
        this.store.dispatch(new  LoadTweets(this.searchType, query))
      } else {
        this.store.dispatch(new BlankSearchQuery())
      }
    })
  }

  onType(query) {
    this.searchString.next(query)
  }

  changePage($event) {
    console.log($event)
  }

}

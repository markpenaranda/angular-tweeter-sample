import { Tweet } from 'src/app/models/tweet.model';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { TweetService } from 'src/app/services/tweet.service';
import { LoadTweets, ChangePageTweets, BlankSearchQuery } from './tweet.action';
import { tap, map } from 'rxjs/operators';

export interface TweetStateModel { 
    tweets: Tweet [],
    loading: boolean, 
    loaded: boolean,
    currentPage: number,
    currentSearchType: string,
    currentSearchQuery: string,
    currentTotalPage: number,
    currentTotalCount: number,
    limitPerPage: number
}


@State<TweetStateModel> ({
    name: 'tweetState',
    defaults: {
        tweets: [],
        loading: false,
        loaded: false,
        currentPage: 1,
        currentSearchType: null,
        currentSearchQuery: null,
        currentTotalPage: 0,
        currentTotalCount: 10,
        limitPerPage: 10
    }
})
export class TweetState {

    constructor(private tweetService: TweetService) {}

    // Selectors

    @Selector()
    static loading(state: TweetStateModel) {
        return state.loading
    }

    @Selector()
    static loaded(state: TweetStateModel) {
        return state.loaded
    }

    @Selector()
    static tweets(state: TweetStateModel) {
        return state.tweets
    }

    @Selector()
    static currentTotalPage(state: TweetStateModel) {
        return state.currentTotalPage
    }

    @Selector()
    static currentTotalCount(state: TweetStateModel) {
        return state.currentTotalCount
    }

    @Selector() 
    static currentSearchQuery(state: TweetStateModel) {
        return state.currentSearchQuery
    }


    // Actions 

    @Action(BlankSearchQuery)
    blankSearchQuery(ctx: StateContext<TweetStateModel>, action: BlankSearchQuery) {
        const state = ctx.getState()
        ctx.setState({
            ...state,
            loading: false,
            loaded: true,
            currentSearchQuery: null
        })
    }

    @Action(LoadTweets)
    loadTweets(ctx: StateContext<TweetStateModel>, action: LoadTweets) {
        let state = ctx.getState()

        ctx.setState({
            ...state,
            loading: true,
            loaded: false,
            currentPage: 1,
            currentSearchType: action.searchType,
            currentSearchQuery: action.query,
        })

        return this.tweetService.getBySearchType(action.searchType, action.query, state.currentPage).pipe(
            map(res => {
                let state = ctx.getState()

                ctx.setState({
                    ...state,
                    currentTotalCount : res['count'],
                    currentTotalPage : Math.ceil(res['count']/state.limitPerPage)
                })


                return res['results'] as Tweet [] 
            }),
            tap( tweets => {
                let state = ctx.getState()
                ctx.setState({
                    ...state,
                    loading: false,
                    loaded: true,
                    tweets: tweets,
                    currentPage: 1,
                    currentSearchType: action.searchType,
                    currentSearchQuery: action.query
                })

            })
        )
    }

    @Action(ChangePageTweets)
    changePageTweets(ctx: StateContext<TweetStateModel>, action: ChangePageTweets) {
        const state = ctx.getState()

        ctx.setState({
            ...state,
            loading: true,
            loaded: false,
            currentPage: action.page
        })

        return this.tweetService.getBySearchType(state.currentSearchType, state.currentSearchQuery, state.currentPage).pipe(
            map(res => {
                return res['results'] as Tweet [] 
            }),
            tap( tweets => {

                ctx.setState({
                    ...state,
                    loading: false,
                    loaded: true,
                    tweets: tweets
                })
                
            })
        )
    }


}
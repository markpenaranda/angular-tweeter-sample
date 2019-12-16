import { Tweet } from 'src/app/models/tweet.model'

export class BlankSearchQuery {
    static readonly type = '[Tweet] Blank Search Query'

    constructor() {}    
}

export class LoadTweets {
    static readonly type = '[Tweet] Load Tweets'

    constructor(public searchType: string, public query: string) {}

}

export class LoadTweetsSuccessfully {
    static readonly type = '[Tweet] Load Tweets Successfully'

    constructor() {}    
}

export class ChangePageTweets {
    static readonly type = '[Tweet] Change Page'

    constructor(public page: number ) {}   
}




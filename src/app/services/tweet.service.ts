import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Tweet } from '../models/tweet.model';

@Injectable({providedIn: 'root'})
export class TweetService {

    pageSize: number = 10

    constructor(private http: HttpClient) {}

    getBySearchType(searchType: string, query: string, page: number = 1) {
        let pageNumber = (page > 1) ? page - 1 : 0
        let offset = this.pageSize * pageNumber
        let url = `/${searchType}/${query}?offset=${offset}`;

        return this.http.get(url)
    }
}
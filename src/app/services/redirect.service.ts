import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Redirect } from "model/Redirect";

import 'rxjs/add/operator/map';

@Injectable()
export class RedirectService {

    private store: {
        redirects: Redirect[]
    };
    private baseUrl: string;

    private totalItemsSubject: BehaviorSubject<number>;
    public totalItems$: Observable<number>

    private pageLabelSubject: BehaviorSubject<string>;
    public pageLabel$: Observable<string>

    private redirectSubject: BehaviorSubject<Redirect[]>;
    public redirects$: Observable<Redirect[]>

    constructor(private http: Http) {
        this.baseUrl = 'http://localhost:8090/api/redirects';
        this.store = { redirects: [] };

        this.totalItemsSubject = <BehaviorSubject<number>>new BehaviorSubject(0);
        this.totalItems$ = this.totalItemsSubject.asObservable();

        this.pageLabelSubject = <BehaviorSubject<string>>new BehaviorSubject("");
        this.pageLabel$ = this.pageLabelSubject.asObservable();

        this.redirectSubject = <BehaviorSubject<Redirect[]>>new BehaviorSubject([]);
        this.redirects$ = this.redirectSubject.asObservable();
    }

    load(pageNo: number, sortKey: string, sortOrder: string) {

        const params = {
            pageNumber: pageNo,
            pageSize: 10,
            sortKey: sortKey,
            sortOrder: sortOrder
        }

        this.http.get(this.baseUrl, { params })
            .map(response => response.json())
            .subscribe(data => {
                this.store.redirects = data.redirects;

                this.redirectSubject.next(Object.assign({}, this.store).redirects);
                this.totalItemsSubject.next(data.totalItems);

                const recordsFrom = ((params.pageNumber - 1) * params.pageSize) + 1;
                const recordsTo = (recordsFrom + params.pageSize) - 1;
                const message = `from: ${recordsFrom} to ${recordsTo < data.totalItems ? recordsTo : data.totalItems} of ${data.totalItems} records`
                this.pageLabelSubject.next(message);

            }, error => console.log('Could not load redirects.'));
    }

    get(id: string): Observable<Redirect> {

        const params = { id: id }

        return this.http.get(this.baseUrl + `/fetch`, { params })
            .map(res => res.json());
    }

    create(redirect: Redirect): Observable<any> {
        return this.http.post(this.baseUrl, redirect);
    }

    remove(id: string): Observable<any> {
        const params = { id: id }
        return this.http.delete(this.baseUrl, { params });
    }    

    update(redirect: Redirect) {

        const params = { id: redirect.source }

        this.http.put(this.baseUrl, redirect, { params })
            .map(response => response.json())
            .subscribe(data => {
                this.store.redirects.forEach((t, i) => {
                    if (t.source == data.source) { this.store.redirects[i] = data; }
                });

                this.redirectSubject.next(Object.assign({}, this.store).redirects);
            }, error => console.log('Could not update redirect.'));
    }

    reset(id: string) {

        const params = { id: id }

        this.http.put(this.baseUrl + `/reset`, null, { params })
            .map(response => response.json())
            .subscribe(data => {
                this.store.redirects.forEach((t, i) => {
                    if (t.source == data.source) { this.store.redirects[i] = data; }
                });

                this.redirectSubject.next(Object.assign({}, this.store).redirects);
            }, error => console.log('Could not delete redirect.'));
    }

    newObject(): Redirect {
        return {
            "id": "",
            "count": 0,
            "source": "",
            "destination": "",
            "expiry": "",
            "lastSeen": ""
        }
    }
}
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from "rxjs/Subject";

import { Redirect } from "../model/Redirect";

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';


@Injectable()
export class RedirectService {

    getRedirects(): Observable<Redirect[]> {
        let subject = new Subject<Redirect[]>()
        setTimeout(() => { subject.next(REDIRECTS); subject.complete(); }, 100)
        return subject
    }

    getRedirect(id: number): Redirect {
        return REDIRECTS.find(redirect => redirect.redirectId === id)
    }

    saveRedirect(redirect: Redirect) {
        redirect.redirectId = 999
        REDIRECTS.push(redirect)
    }

    deleteRedirect(id: number) {
        window.alert('removed ' + id);
    }
}

const REDIRECTS: Redirect[] = [
    {
        "redirectId": 2,
        "redirectCount": 186,
        "source": "http://www.game.co.uk/en/hardware/playstation-4-ps4-consoles/playstation-4-ps4-500gb-consoles",
        "destination": "http://www.game.co.uk/en/hardware/preowned-hardware/playstation/playstation-4",
        "expiry": "2012-04-23T18:25:43.511Z",
        "lastSeen": "01 Jan 2017"
    },
    {
        "redirectId": 3,
        "redirectCount": 327,
        "source": "http://www.game.co.uk/webapp/wcs/stores/servlet/HubArticleView?hubId=2017253&articleId=2017254",
        "destination": "http://www.game.co.uk/en/games/xbox-one-games/?inStockOnly=false&merchname=TopNav",
        "expiry": "2012-04-23T18:25:43.511Z",
        "lastSeen": "12 Feb 2017"
    },
    {
        "redirectId": 4,
        "redirectCount": 280,
        "source": "http://www.game.co.uk/en/hardware/nintendo-3ds-3ds-xl-and-2ds-consoles",
        "destination": "http://www.game.co.uk/en/games/games-out-now/games-out-now-on-nintendo-switch?merchname=TopNav-_-Nintendo_Games-_-GamesOutNow",
        "expiry": "2012-04-23T18:25:43.511Z",
        "lastSeen": "21 Mar 2017"
    }
]

import { Application, Request, Response } from 'express';
import { Redirect } from "model/Redirect";
import { dbRedirects } from "../mock-data";

const uuidv1 = require('uuid/v1');

export function apiHello(app: Application) {
    app.get("/", function (req, res) {
        let client = req.app.redisClient;
        client.set('company', 'Game Group');

        client.get('company', function (err, reply) {
            res.send(reply);
        });

    });
}

export function apiRedirectUrls(app: Application) {

    app.route('/api/redirects/fetch').get((req: Request, res: Response) => {

        const client = req.app.redisClient;

        client.hgetall(`redirect:${req.query.id}`, function (err, result) {
            if (err) {
            } else {
                const payload = result as Redirect;
                payload.expiry = new Date(+payload.expiry).toDateString().slice(4);
                res.status(200).json(payload);
            }
        });
    });

    app.route('/api/redirects').post((req: Request, res: Response) => {

        const client = req.app.redisClient;
        const payload = req.body as Redirect;

        client.hexists(`redirect:${payload.source}`, "source", function (err, found) {
            if (found === 1) {
                res.status(500).send({ error: "record already exist for this source" });
            }
            else {
                client.hmset(`redirect:${payload.source}`, [
                    "count", payload.count,
                    "source", payload.source,
                    "destination", payload.destination,
                    "expiry", Date.parse(payload.expiry),
                    "lastSeen", '',
                    "createdOn", new Date().valueOf(),
                ]);

                client.sadd('redirect:keys', payload.source);

                res.status(200).json(payload);
            }
        });
    });

    app.route('/api/redirects').get((req: Request, res: Response) => {

        const client = req.app.redisClient;

        let sortKey = "redirect:*->createdOn";
        let sortOrder = "DESC";

        if (req.query['sortKey']) {
            sortKey = `redirect:*->${req.query['sortKey']}`;
        }

        if (req.query['sortOrder']) {
            sortOrder = req.query['sortOrder'];
        }

        const pageNumber = parseInt(req.query['pageNumber']);
        const pageSize = parseInt(req.query['pageSize']);
        const start = (pageNumber - 1) * pageSize;

        client.scard('redirect:keys', function (err, count) {

            client.sort(
                'redirect:keys',
                'BY',
                sortKey,
                'LIMIT',
                start,
                pageSize,
                'GET',
                'redirect:*->count',
                'GET',
                'redirect:*->source',
                'GET',
                'redirect:*->destination',
                'GET',
                'redirect:*->expiry',
                'GET',
                'redirect:*->lastSeen',
                'GET',
                'redirect:*->createdOn',
                sortOrder,
                function (err, rows) {
                    if (err) throw err;

                    var items = [];
                    for (let row = 0; row < pageSize; row++) {
                        let idx = row * 6;
                        if (rows[idx] !== undefined) {
                            items.push({
                                "count": rows[idx],
                                "source": rows[idx + 1],
                                "destination": rows[idx + 2],
                                "expiry": rows[idx + 3],
                                "lastSeen": rows[idx + 4]
                            });
                        }
                    }

                    const result = {
                        totalItems: count,
                        pageNo: pageNumber,
                        redirects: items,
                    }

                    res.status(200).json(result);
                }
            );

        });

    });

    app.route('/api/redirects').put((req: Request, res: Response) => {

        const client = req.app.redisClient;

        client.hgetall(`redirect:${req.query.id}`, function (err, result) {
            if (err) {
            } else {
                const payload = req.body as Redirect;
                const existingData = result as Redirect;

                existingData.destination = payload.destination;
                existingData.expiry = payload.expiry;

                client.hmset(`redirect:${existingData.source}`, [
                    "destination", payload.destination,
                    "expiry", Date.parse(payload.expiry)
                ]);

                res.status(200).json(existingData);
            }
        });
    });

    app.route('/api/redirects').delete((req: Request, res: Response) => {

        const client = req.app.redisClient;
        const idtoDelete = req.query.id;

        client.hdel(`redirect:${idtoDelete}`, ["count", "source", "destination", "expiry", "lastSeen", "createdOn"]);
        client.srem("redirect:keys", idtoDelete);

        res.status(200).send();
    });

    app.route('/api/redirects/reset').put((req: Request, res: Response) => {

        const client = req.app.redisClient;

        client.hgetall(`redirect:${req.query.id}`, function (err, result) {
            if (err) {
            } else {
                const existingData = result as Redirect;
                existingData.count = 0;

                client.hmset(`redirect:${existingData.source}`, "count", 0);
                res.status(200).json(existingData);
            }
        });
    });

    /*********************************************/

    app.route('/api/new/bulk').post((req: Request, res: Response) => {

        const client = req.app.redisClient;

        /*
        dbRedirects.forEach(data => {

            const payload = data as Redirect;

            client.hmset(`redirect:${payload.source}`, [
                "count", payload.count,
                "source", payload.source,
                "destination", payload.destination,
                "expiry", Date.parse(payload.expiry),
                "lastSeen", Date.parse(payload.lastSeen),
                "createdOn", new Date().valueOf(),
            ]);

            client.sadd('redirect:keys', payload.source);
        });
        */

        res.status(200).send();
    });

    /*********************************************/
}
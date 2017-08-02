import { Redirect } from "model/Redirect";

export interface RedirectPageList {
    totalItems: number;
    pageNo: number;
    redirects: Redirect[]
}
import { RequestParams, HttpResponse } from './types/index';
import { HttpMethod } from '../constants/httpMethods';

export class CustomHTTP {
    private xhr: XMLHttpRequest;

    constructor() {
        this.xhr = new XMLHttpRequest();
    }

    private parseHeaders(headerStr: string): Record<string, string> {
        const headers: Record<string, string> = {};
        if (!headerStr) return headers;

        const headerPairs = headerStr.split('\u000d\u000a');
        for (let i = 0; i < headerPairs.length; i++) {
            const headerPair = headerPairs[i];
            const index = headerPair.indexOf('\u003a\u0020');
            if (index > 0) {
                const key = headerPair.substring(0, index);
                const val = headerPair.substring(index + 2);
                headers[key] = val;
            }
        }
        return headers;
    }

    private handleLoad<T>(resolve: (value: HttpResponse<T>) => void, reject: (reason: any) => void, requestParams: RequestParams) {
        if (this.xhr.status >= 200 && this.xhr.status < 300) {
            const response = JSON.parse(this.xhr.responseText) as T;
            const statusText = this.xhr.statusText || 'OK';
            const headers = this.parseHeaders(this.xhr.getAllResponseHeaders());

            const httpResponse: HttpResponse<T> = {
                data: response,
                status: this.xhr.status,
                statusText: statusText,
                headers: headers,
                config: requestParams,
            };
            resolve(httpResponse);
        } else {
            reject({
                status: this.xhr.status,
                statusText: this.xhr.statusText,
            });
        }
    }

    private handleError(reject: (reason: any) => void) {
        const statusText = this.xhr.statusText || 'Unknown Error';
        reject({
            status: this.xhr.status,
            statusText: statusText,
        });
    }

    private sendRequest<T>(requestParams: RequestParams): Promise<HttpResponse<T>> {
        const { method, url, data } = requestParams;
        return new Promise((resolve, reject) => {
            this.xhr.open(method, url, true);
            this.xhr.setRequestHeader('Content-Type', 'application/json');

            this.xhr.onload = () => this.handleLoad(resolve, reject, requestParams);
            this.xhr.onerror = () => this.handleError(reject);

            if ((method === HttpMethod.PATCH || method === HttpMethod.PUT) && data !== undefined) {
                this.xhr.send(JSON.stringify(data));
            } else {
                this.xhr.send();
            }
        });
    }

    public get<T>(url: string): Promise<HttpResponse<T>> {
        const requestParams: RequestParams = {
            method: HttpMethod.GET,
            url: url,
        };
        return this.sendRequest<T>(requestParams);
    }

    public delete<T>(url: string): Promise<HttpResponse<T>> {
        const requestParams: RequestParams = {
            method: HttpMethod.DELETE,
            url: url,
        };
        return this.sendRequest<T>(requestParams);
    }

    public post<T>(url: string, data: any): Promise<HttpResponse<T>> {
        const requestParams: RequestParams = {
            method: HttpMethod.POST,
            url: url,
            data: data,
        };
        return this.sendRequest<T>(requestParams);
    }

    public patch<T>(url: string, data: any): Promise<HttpResponse<T>> {
        const requestParams: RequestParams = {
            method: HttpMethod.PATCH,
            url: url,
            data: data,
        };
        return this.sendRequest<T>(requestParams);
    }

    public put<T>(url: string, data: any): Promise<HttpResponse<T>> {
        const requestParams: RequestParams = {
            method: HttpMethod.PUT,
            url: url,
            data: data,
        };
        return this.sendRequest<T>(requestParams);
    }
}

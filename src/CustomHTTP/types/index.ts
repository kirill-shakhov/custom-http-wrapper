export interface RequestParams {
    method: string;
    url: string;
    data?: any
}

export interface HttpResponse<T> {
    data: T;
    status: number;
    statusText: string;
    headers: Record<string, string>;
    config: RequestParams;
}


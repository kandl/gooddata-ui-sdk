export type PromiseReturnType<T> = T extends Promise<infer U> ? U : any;
export type PromiseFnReturnType<T extends (...args: any) => any> = PromiseReturnType<ReturnType<T>>;

export type PayloadParams = {
    methodName: string,
    abi: string,
    params: Array<any>,
}
export type Contract = {
    abi: Array<any>,
    address: string,
    name?: string,
}
import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Order {
    id: bigint;
    customerName: string;
    customerPhone: string;
    items: Array<[bigint, bigint]>;
    customerEmail: string;
}
export interface Donut {
    id: bigint;
    name: string;
    description: string;
    imageUrl: string;
    category: string;
    price: bigint;
}
export interface backendInterface {
    getAllDonuts(): Promise<Array<Donut>>;
    getDonutById(id: bigint): Promise<Donut>;
    getDonutsByCategory(category: string): Promise<Array<Donut>>;
    getOrderById(id: bigint): Promise<Order>;
    placeOrder(customerName: string, customerEmail: string, customerPhone: string, items: Array<[bigint, bigint]>): Promise<bigint>;
    searchDonuts(searchTerm: string): Promise<Array<Donut>>;
}

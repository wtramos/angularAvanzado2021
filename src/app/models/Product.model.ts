export interface Product {
    _id?: string;
    brand: string;
    description: string;
    image: string;
    name: string;
    offert: Offert;
    price: Price;
}

export interface Offert {
    isOffert: boolean;
    type: string;
    value: number;
}

export interface Price {
    amount: number;
    currencyType: string;
}
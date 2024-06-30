export interface Reservation {
    id: number;
    userId: number;
    date: Date;
    people: number;
    user?: User;
    table: number;
}

export interface User {
    id: number;
    name: string;
    email: string;
    reservations?: Reservation[];
}
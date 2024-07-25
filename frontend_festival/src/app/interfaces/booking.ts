import { User } from "./user";
import { Festival } from "./festival";

export interface Booking {
    _id: string
    user: User
    festival: Festival
    startDate: string
    endDate: string
    price: number
    discount: number
}

import { Address } from "./address";
import { Company } from "./comapny";
import { Posts } from "./posts";

export interface User {
    id: number;
    name: number;
    username: string;
    email: string;
    address: Address;
    phone: string;
    website: string;
    company: Company;
    posts?: Posts
}
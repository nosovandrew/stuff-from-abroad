import { User } from './user';
import { Item } from './item';

// complete order structure
export type Order = {
    user: User;
    items: Item[];
};

// interaction with the api regarding the order
import { useState } from 'react';

import { Service } from '@/types/apiService';
import { Order } from '@/types/order';

/* TYPES */
type CreateOrderResponse = {
    id: string;
    userId: string;
};

/* SERVICE LOGIC */
const useCreateOrderService = () => {
    // service obj contains fetch status and success/error data
    // maybe make custom hook?
    const [service, setService] = useState<Service<CreateOrderResponse>>({
        status: 'init',
    });
    // func: create new order and save this one in db
    const createOrder = async (order: Order) => {
        setService({ status: 'loading' });

        // make post req to database
        try {
            const result = await fetch('/api/order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(order),
            });
            const parsedResult = JSON.parse(await result.text()); // parse res from server
            setService({ status: 'loaded', payload: parsedResult });
        } catch (error) {
            // need to add checking error type
            console.error(error);
            setService({ status: 'error', error });
        }
    };

    return {
        service,
        createOrder,
    };
};

export { useCreateOrderService };

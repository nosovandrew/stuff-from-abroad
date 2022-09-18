// interaction with the api regarding the order
import { useState } from 'react';

import { Service } from '@/types/apiService';
import { Order } from '@/types/order';
import { makeApiRequest } from '@/helpers/makeApiRequest';

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
            const result = await makeApiRequest<CreateOrderResponse>('/api/order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(order),
            })
            setService({ status: 'loaded', payload: result });
        } catch (error) {
            // need to add checking error type
            setService({ status: 'error', error });
            throw error;
        }
    };

    return {
        service,
        createOrder,
    };
};

export { useCreateOrderService };

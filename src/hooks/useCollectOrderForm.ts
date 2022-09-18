import { useState, ChangeEvent, FormEvent } from 'react';

import { Order } from '@/types/order';
import { Item } from '@/types/item';
import { User } from '@/types/user';
import { useCreateOrderService } from '@/api/order';
import useForm from '@/hooks/common/useForm';

type CollectOrderFormFields = User & Item; // union User and Item types for manage input fields

const useCollectOrderForm = () => {
    /* STATE */
    // set common form functionality
    const {
        handleChange,
        handleSubmit,
        handleReset,
        data: orderFields,
        errors,
    } = useForm<CollectOrderFormFields>({
        onSubmit: () => collectAndSendOrder(), // logic for submit
        initialValues: {
            tg: '',
            url: '',
            size: '',
        },
        validations: {
            tg: {
                required: {
                    value: true,
                    message: 'Нам нужен ваш Телеграм для обратной связи.',
                },
            },
            // url pattern ??? (no spaces, no quotes, starts with protocol)
        },
    });
    const [items, setItems] = useState<Item[]>([]); // items array state
    const { service, createOrder } = useCreateOrderService(); // get api service (communication with backend)
    const [orderError, setOrderError] = useState<string | undefined>(undefined); // error msg state for collecting order proccess

    /* SPECIAL HANDLERS */
    const handleAddItem = () => {
        // add new item to list of items
        const newItem: Item = {
            url: orderFields.url,
            size: orderFields.size,
        };
        const updatedItems = [...items, newItem];
        // update state
        setItems(updatedItems);
        // reset adding item form
        handleReset('url');
        handleReset('size');
    };
    const handleRemoveItem = (idx: number) => {
        // make new array without deleted element
        const updatedItems = items.filter((_item, itemIdx) => itemIdx !== idx);
        // update state
        setItems(updatedItems);
    };

    /* HELPERS */
    const collectAndSendOrder = async () => {
        // check order obj (not implemented!)
        if (items.length === 0) {
            // throw error
            setOrderError('Добавьте хотя бы один товар');
            // remove error after 5 sec
            setTimeout(() => setOrderError(undefined), 5000);
            return;
        }
        // collect order
        const order: Order = {
            user: {
                tg: orderFields.tg,
            },
            items,
        };
        // create and save new order in database
        try {
            await createOrder(order);
            // reset form and items array
            handleReset();
            setItems([]);
            // reset order errors
            setOrderError(undefined);
        } catch (error) {
            // need to add error type and get error message
            setOrderError('Ошибка при создании заказа');
        }
    };

    return {
        orderFields,
        items,
        handleChange,
        handleSubmit,
        handleAddItem,
        handleRemoveItem,
        submitService: service, // service obj for submit action
        formValidationErrors: errors, // errors of form inputs (validation)
        orderError, // error of checking order before creating
    };
};

export default useCollectOrderForm;

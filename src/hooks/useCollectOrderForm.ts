import { useState, ChangeEvent, FormEvent } from 'react';

import { Order } from '@/types/order';
import { Item } from '@/types/item';
import { User } from '@/types/user';
import { useCreateOrderService } from '@/api/order';
import useForm from '@/hooks/common/useForm';
import isValidUrl from '@/helpers/isValidUrl';

type ItemFormFields = Item;

type CollectOrderFormFields = User;

const useCollectOrderForm = () => {
    /* STATE */
    // set "add item" form functionality
    const {
        handleChange: handleChangeItem,
        handleSubmit: handleSubmitItem,
        handleReset: handleResetItem,
        data: itemFields,
        errors: itemErrors,
    } = useForm<ItemFormFields>({
        onSubmit: () => addItem(), // logic for submit
        initialValues: {
            url: '',
            size: '',
        },
        validations: {
            // url pattern ??? (no spaces, no quotes, starts with protocol)
            url: {
                custom: {
                    isValid: isValidUrl,
                    message: 'Ссылка не указана, либо в ней есть ошибки!',
                },
            },
            size: {
                required: {
                    value: true,
                    message: 'Размер не указан!',
                },
            }
        },
    });
    // set "collect and send order" form functionality
    const {
        handleChange: handleChangeOrder,
        handleSubmit: handleSubmitOrder ,
        handleReset: handleResetOrder,
        data: orderFields,
        errors: orderErrors,
    } = useForm<CollectOrderFormFields>({
        onSubmit: () => collectAndSendOrder(), // logic for submit
        initialValues: {
            tg: '',
        },
        validations: {
            tg: {
                required: {
                    value: true,
                    message: 'Нам нужен ваш Телеграм для обратной связи.',
                },
            },
        },
    });
    const [items, setItems] = useState<Item[]>([]); // items array state
    const { service, createOrder } = useCreateOrderService(); // get api service (communication with backend)
    const [orderError, setOrderError] = useState<string | undefined>(undefined); // error msg state for collecting order proccess

    /* SPECIAL HANDLERS */
    const handleRemoveItem = (idx: number) => {
        // make new array without deleted element
        const updatedItems = items.filter((_item, itemIdx) => itemIdx !== idx);
        // update state
        setItems(updatedItems);
    };

    /* HELPERS */
    const addItem = () => {
        // add new item to list of items
        const newItem: Item = {
            url: itemFields.url,
            size: itemFields.size,
        };
        const updatedItems = [...items, newItem];
        // update state
        setItems(updatedItems);
        // reset adding item form
        handleResetItem('url');
        handleResetItem('size');
    };

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
            handleResetOrder();
            handleResetItem();
            setItems([]);
            // reset order errors
            setOrderError(undefined);
        } catch (error) {
            // need to add error type and get error message
            setOrderError('Ошибка при создании заказа');
        }
    };

    return {
        items, // items array
        // add item form
        itemFields,
        handleChangeItem,
        handleSubmitItem,
        // main collect order form
        orderFields,
        handleChangeOrder,
        handleSubmitOrder,
        handleRemoveItem, // remove already added item helper
        submitService: service, // service obj for submit action
        errors: {
            itemFormErrors: itemErrors,
            mainFormErrors: orderErrors,
            orderError, // error of checking order before creating
        },
    };
};

export default useCollectOrderForm;

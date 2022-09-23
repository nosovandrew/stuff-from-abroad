import styled from 'styled-components';
import { useRef } from 'react';

import useCollectOrderForm from '@/hooks/useCollectOrderForm';

import AddItemForm from '@/components/addItemForm';
import OrderItem from '@/components/orderItem';
import OrderingUserForm from '@/components/orderingUserForm';
import Layout from '@/components/layout';
import { CommonBtn } from '@/components/ui/button';
import {
    SuccessNotification,
    ErrorNotification,
} from '@/components/ui/notification';

const Container = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
`;

const StyledForm = styled.form`
    width: 100%;
`;

const IndexPage = () => {
    // get logic for collecting order
    const {
        items,
        itemFields,
        handleChangeItem,
        handleSubmitItem,
        orderFields,
        handleChangeOrder,
        handleSubmitOrder,
        handleRemoveItem,
        submitService,
        errors,
    } = useCollectOrderForm();

    const orderFormRef = useRef<HTMLFormElement>(null); // init ref for form to submit outside <form> tag

    const handleOutsideSubmit = () => {
        orderFormRef.current?.dispatchEvent(
            new Event('submit', { cancelable: true, bubbles: true })
        );
    };

    return (
        <Layout>
            <h1>
                Русский модный
                <br /> клуб
            </h1>
            <Container>
                {items.map((item, index) => (
                    <OrderItem
                        key={index}
                        {...{ item, idx: index, handleRemoveItem }}
                    />
                ))}
                <AddItemForm
                    {...{
                        newItem: {
                            url: itemFields.url,
                            size: itemFields.size,
                        },
                        handleChange: handleChangeItem,
                        handleSubmit: handleSubmitItem,
                        validationErrors: errors.itemFormErrors,
                    }}
                />
                <StyledForm ref={orderFormRef} onSubmit={handleSubmitOrder} autoComplete="off">
                    <OrderingUserForm
                        {...{
                            user: { tg: orderFields.tg },
                            handleChange: handleChangeOrder,
                            validationErrors: errors.mainFormErrors,
                        }}
                    />
                </StyledForm>
                <CommonBtn onClick={handleOutsideSubmit}>
                    {submitService.status === 'loading'
                        ? 'Делаем...'
                        : 'Сделать заказ'}
                </CommonBtn>
                {/* handling api service below */}
                {submitService.status === 'loaded' && submitService.payload && (
                    <SuccessNotification>
                        <span>{`Код заказа: ${submitService.payload.id}`}</span>
                    </SuccessNotification>
                )}
                {errors.orderError && (
                    <ErrorNotification>
                        <span>{errors.orderError}</span>
                    </ErrorNotification>
                )}
            </Container>
        </Layout>
    );
};

export default IndexPage;

import styled from 'styled-components';

import useCollectOrderForm from '@/hooks/useCollectOrderForm';

import AddItemForm from '@/components/addItemForm';
import OrderItem from '@/components/orderItem';
import OrderingUserForm from '@/components/orderingUserForm';
import Layout from '@/components/layout';
import { CommonBtn } from '@/components/ui/button';
import { SuccessNotification, ErrorNotification } from '@/components/ui/notification';

const StyledForm = styled.form`
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
`;

const IndexPage = () => {
    // get logic for collecting order
    const {
        orderFields,
        items,
        handleChange,
        handleSubmit,
        handleAddItem,
        handleRemoveItem,
        submitService,
        formValidationErrors,
        orderError,
    } = useCollectOrderForm();

    return (
        <Layout>
            <h1>Русский модный<br /> клуб</h1>
            <StyledForm onSubmit={handleSubmit}>
                {items.map((item, index) => (
                    <OrderItem
                        key={index}
                        {...{ item, idx: index, handleRemoveItem }}
                    />
                ))}
                <AddItemForm
                    {...{
                        newItem: {
                            url: orderFields.url,
                            size: orderFields.size,
                        },
                        handleChange,
                        handleAddItem,
                    }}
                />
                <OrderingUserForm
                    {...{ user: { tg: orderFields.tg }, handleChange }}
                />
                <CommonBtn type="submit">
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
                {orderError && (
                    <ErrorNotification>
                        <span>{orderError}</span>
                    </ErrorNotification>
                )}
            </StyledForm>
        </Layout>
    );
};

export default IndexPage;

import styled from 'styled-components';

import useCollectOrderForm from '@/hooks/useCollectOrderForm';

import AddItemForm from '@/components/addItemForm';
import OrderItem from '@/components/orderItem';
import OrderingUserForm from '@/components/orderingUserForm';

const StyledForm = styled.form`
    width: 100%;
    min-height: calc(100vh - var(--layout-pdng));
    padding: var(--layout-pdng);

    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */
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
        <StyledForm onSubmit={handleSubmit}>
            <h1>Соберите заказ</h1>
            <OrderingUserForm
                {...{ user: { tg: orderFields.tg }, handleChange }}
            />
            {items.map((item, index) => (
                <OrderItem
                    key={index}
                    {...{ item, idx: index, handleRemoveItem }}
                />
            ))}
            <AddItemForm
                {...{
                    newItem: { url: orderFields.url, size: orderFields.size },
                    handleChange,
                    handleAddItem,
                }}
            />
            <button type="submit">Сделать заказ</button>
            {/* test api service below */}
            {submitService.status === 'loading' && <span></span>}
            {submitService.status === 'loaded' && <span>✅</span>}
            {submitService.status === 'loaded' && submitService.payload && (
                <span>{`Код заказа: ${submitService.payload.id}`}</span>
            )}
            {(orderError || Object.keys(formValidationErrors).length !== 0) && <span>🚫</span>}
        </StyledForm>
    );
};

export default IndexPage;

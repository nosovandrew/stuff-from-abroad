import styled from 'styled-components';

import type { Item } from '@/types/item';

const Conatiner = styled.div`
    display: flex;
    margin: 0.5rem 0;
    gap: 1rem;
`;

type OrderItemProps = {
    idx: number;
    item: Item;
    handleRemoveItem: (idx: number) => void;
};

// added to order item
const OrderItem = ({ idx, item, handleRemoveItem }: OrderItemProps) => {
    // get item props
    const { url, size } = item;

    return (
        <Conatiner>
            <span>{url}</span>
            <span>{size}</span>
            <button onClick={() => handleRemoveItem(idx)}>Del</button>
        </Conatiner>
    );
};

export default OrderItem;

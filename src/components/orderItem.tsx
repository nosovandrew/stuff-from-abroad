import styled from 'styled-components';

import type { Item } from '@/types/item';

import Block from './ui/block';
import { RawBtn } from './ui/button';
import SvgTrash from './svgIcons/Trash';

const Conatiner = styled(Block)`
    background-color: var(--clr-base-dk);

    display: flex;
    justify-content: space-between;
    gap: 1rem;
    color: rgb(0, 0, 0);
`;

const ItemInfo = styled.div`
    flex: 1 1 90%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: calc(90% - 4rem); // minus 2*blockPadding and 2*layoutPadding

    span {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
`;

const DeleteBtn = styled(RawBtn)`
    flex: 1 1 10%;
    aspect-ratio: 1 / 1;
    margin: 0;
    padding: 1rem;
    /* background-color: var(--clr-base-dk); */
    background-color: #c7c7c7;
    border-radius: 1rem;
    // svg icon
    line-height: 0;
    font-size: 1rem;
    svg > path {
        fill: #787878;
    }
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

    const displayedUrl = url.replace(/(http)s?:\/\/(www.)?/, '') // cut protocol from url

    return (
        <Conatiner>
            <ItemInfo>
                <span>{displayedUrl}</span>
                <span>{size}</span>
            </ItemInfo>
            <DeleteBtn onClick={() => handleRemoveItem(idx)}>
                <SvgTrash />
            </DeleteBtn>
        </Conatiner>
    );
};

export default OrderItem;

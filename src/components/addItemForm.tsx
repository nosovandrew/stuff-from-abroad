import styled from 'styled-components';
import { ChangeEventHandler } from 'react';

import { Item } from '@/types/item';

const Container = styled.div`
    margin: 1rem auto;
    display: flex;
    gap: 0.5rem;
`;

type AddItemFormProps = {
    newItem: Item;
    handleChange: (key: keyof Item) => ChangeEventHandler<HTMLInputElement>;
    handleAddItem: () => void;
};

const AddItemForm = ({ newItem, handleChange, handleAddItem }: AddItemFormProps) => {
    // using data and hanlers from useForm placed in parent component
    const { url, size } = newItem;

    return (
        <Container>
            <input
                type="text"
                placeholder="Ссылка"
                name="itemUrl"
                value={url}
                onChange={handleChange('url')}
            />
            <input
                type="text"
                placeholder="Размер"
                name="itemSize"
                value={size}
                onChange={handleChange('size')}
            />
            <button
                type="button"
                onClick={handleAddItem}
            >
                Добавить
            </button>
        </Container>
    );
};

export default AddItemForm;

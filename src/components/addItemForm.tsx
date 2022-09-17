import styled from 'styled-components';
import { ChangeEventHandler } from 'react';

import { Item } from '@/types/item';

import TextInput from './ui/textInput';
import Block from './ui/block';
import { RawBtn } from './ui/button';
import SvgPlus from './svgIcons/Plus';
import { media } from '@/styles/media';

const Container = styled(Block)`
    display: flex;
    gap: 0.5rem;
`;

const InputsContainer = styled.div`
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    gap: .5rem;
`;

const AddBtn = styled(RawBtn)`
    flex: 1 1 auto;
    margin: 0;
    padding: 1rem;
    background-color: var(--clr-base-dk);
    border-radius: 1rem;
    // svg icon
    line-height: 0;
    font-size: 1rem;

    ${media.lg} {
        font-size: 1.5rem;
    }
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
            <InputsContainer>
                <TextInput
                    placeholder="Ссылка"
                    name="itemUrl"
                    value={url}
                    onChange={handleChange('url')}
                />
                <TextInput
                    placeholder="Размер"
                    name="itemSize"
                    value={size}
                    onChange={handleChange('size')}
                />
            </InputsContainer>
            <AddBtn
                type="button"
                onClick={handleAddItem}
            >
                <SvgPlus />
            </AddBtn>
        </Container>
    );
};

export default AddItemForm;

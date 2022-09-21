import styled from 'styled-components';
import { ChangeEventHandler, FormEvent } from 'react';

import { Item } from '@/types/item';

import TextInput from './ui/textInput';
import Block from './ui/block';
import { RawBtn } from './ui/button';
import SvgPlus from './svgIcons/Plus';
import { media } from '@/styles/media';
import { ErrorNotification } from './ui/notification';

const Container = styled(Block)`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const FormContainer = styled.form`
    display: flex;
    gap: 0.5rem;
`;

const InputsContainer = styled.div`
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
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
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    validationErrors: any;
};

const AddItemForm = ({
    newItem,
    handleChange,
    handleSubmit,
    validationErrors,
}: AddItemFormProps) => {
    // using data and hanlers from useForm placed in parent component
    const { url, size } = newItem;

    return (
        <Container>
            <FormContainer onSubmit={handleSubmit}>
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
                <AddBtn type="submit">
                    <SvgPlus />
                </AddBtn>
            </FormContainer>
            {validationErrors.url && (
                <ErrorNotification>{validationErrors.url}</ErrorNotification>
            )}
            {validationErrors.size && (
                <ErrorNotification>{validationErrors.size}</ErrorNotification>
            )}
        </Container>
    );
};

export default AddItemForm;

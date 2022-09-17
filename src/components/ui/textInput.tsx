import styled from 'styled-components';
import { ChangeEvent } from 'react';

const StyledLabel = styled.label`
    display: flex;
    flex-direction: column;
    color: black;
`;

const StyledInput = styled.input`
    width: 100%;
    padding: .5rem;
    /* margin: 0; */
    font-size: inherit;
    font-family: inherit;
    line-height: 1rem;
    color: inherit;
    border: 2px solid black;
    border-radius: .75rem;
    background-color: transparent;
    outline: none;
`;

type FormInputProps = {
    label?: string;
    name: string;
    placeholder?: string;
    value: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

const TextInput = ({
    label,
    name,
    placeholder,
    value,
    onChange,
}: FormInputProps) => {
    return (
        <StyledLabel>
            {label ? label : null}
            <StyledInput
                type="text"
                name={name}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
            />
        </StyledLabel>
    );
};

export default TextInput;

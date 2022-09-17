import styled from 'styled-components';
import { ChangeEventHandler } from 'react';

import { User } from '@/types/user';

import TextInput from './ui/textInput';
import Block from './ui/block';

const Container = styled(Block)`
    display: flex;
    flex-direction: column;
`;

type OrderingUserFormProps = {
    user: User;
    handleChange: (key: keyof User) => ChangeEventHandler<HTMLInputElement>;
};

const OrderingUserForm = ({ user, handleChange }: OrderingUserFormProps) => {
    return (
        <Container>
            <TextInput
                placeholder="Telegram"
                name="tgName"
                value={user.tg}
                onChange={handleChange('tg')}
            />
        </Container>
    );
};

export default OrderingUserForm;

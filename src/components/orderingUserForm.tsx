import styled from 'styled-components';
import { ChangeEventHandler } from 'react';

import { User } from '@/types/user';

import TextInput from './ui/textInput';
import Block from './ui/block';
import { ErrorNotification } from './ui/notification';

const Container = styled(Block)`
    display: flex;
    flex-direction: column;
    gap: .5rem;
`;

type OrderingUserFormProps = {
    user: User;
    handleChange: (key: keyof User) => ChangeEventHandler<HTMLInputElement>;
    validationErrors: any;
};

const OrderingUserForm = ({ user, handleChange, validationErrors }: OrderingUserFormProps) => {
    return (
        <Container>
            <TextInput
                placeholder="Telegram"
                name="tgName"
                value={user.tg}
                onChange={handleChange('tg')}
            />
            {validationErrors.tg && (
                <ErrorNotification>
                    {validationErrors.tg}
                </ErrorNotification>
            )}
        </Container>
    );
};

export default OrderingUserForm;

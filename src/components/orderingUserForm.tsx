import styled from 'styled-components';
import { ChangeEventHandler } from 'react';

import { User } from '@/types/user';

const Container = styled.div`
    margin: 1rem auto;
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
            <input
                type="text"
                placeholder="Ваш Telegram"
                name="tgName"
                value={user.tg}
                onChange={handleChange('tg')}
            />
        </Container>
    );
};

export default OrderingUserForm;

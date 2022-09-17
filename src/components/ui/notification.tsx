import styled from "styled-components";

import Block from "./block";

const Notification = styled(Block)`
    color: white;
    text-align: center;
`;

const SuccessNotification = styled(Notification)`
    background-color: #4dd25d;
`;

const ErrorNotification = styled(Notification)`
    background-color: #ED5E57;
`;

export { SuccessNotification, ErrorNotification };
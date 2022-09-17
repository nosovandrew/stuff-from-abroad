import styled from 'styled-components';

import { media } from '@/styles/media';

const Container = styled.div`
    width: 100%;
    padding: var(--layout-pdng);
    margin: 0 auto;

    ${media.lg} {
        width: 60%;
    }

    ${media.xl} {
        width: 40%;
    }
`;

type LayoutProps = {
    children: React.ReactNode | React.ReactNode[];
};

const Layout = ({ children }: LayoutProps) => {
    return <Container>{children}</Container>;
};

export default Layout;

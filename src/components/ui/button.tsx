import styled from 'styled-components';

// btn without default styles
const RawBtn = styled.button`
    padding: 0;
    margin: 0 auto;
    border: none;
    background-color: transparent;
    color: inherit;
    font-size: inherit;
    font-family: inherit;
    cursor: pointer;
`;

const CommonBtn = styled(RawBtn)`
    width: 100%;
    padding: 1rem 2rem;
    border-radius: 1rem;
    text-align: center;
    font-size: var(--fs-bigst);
    color: var(--clr-base);
    background-color: var(--clr-primary);
`;

export { RawBtn, CommonBtn };

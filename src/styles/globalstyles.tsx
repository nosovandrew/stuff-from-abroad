import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    :root {
        /* MOBILE SIZE (default) */

        /* COLOR VARIABLES */
        // neutrals
        --clr-ntrl-min: hsl(0, 0%, 100%);
        --clr-ntrl-max: hsl(0, 0%, 0%);

        /* base color, with one tint, and one shade - body and typogaphry is generally the base colour */
        --clr-base: hsl(0, 0%, 0%);
        --clr-base-lt: hsl(0, 0%, 20%);
        --clr-bg-base: hsl(0, 0%, 100%);

        /* primary brand color */
        --clr-primary: hsl(55, 88%, 72%);
        --clr-primar-test: hsl(30, 90%, 80%);

        /* FONT */
        --ff-base: 'Roboto', -apple-system, system-ui, BlinkMacSystemFont, 'Helvetica Neue',
        'Helvetica', sans-serif;
        --fs-base: 18px;
        --fw-base: 400;

        /* SHAPES */
        --brad-base: 1rem;

        /* SPACE */
        --layout-pdng: 1rem;
        --block-spacing: 1rem;
        --el-spacing: .5rem;
    }

    *,
    *:before,
    *:after {
        box-sizing: inherit;
    }

    html,
    body {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        overscroll-behavior-x: none;
        font-family: var(--ff-base);
        font-size: var(--fs-base);
        font-weight: var(--fw-base);
        /* color: var(--text-primary-color);
        background-color: var(--background-primary-color); */
        -webkit-tap-highlight-color: transparent;
    }

    a {
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0); // outline light by press on mobile
        color: inherit;
        text-decoration: none;
        cursor: pointer;
    }

    button {
        margin: 0;
        border: none;
        background-color: transparent;
        /* color: var(--text-primary-color); */
        font-size: inherit;
        font-family: inherit;
        cursor: pointer;
    }
`;

export default GlobalStyle;

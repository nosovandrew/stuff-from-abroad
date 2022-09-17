import { createGlobalStyle } from 'styled-components';

import { media } from './media';

const GlobalStyle = createGlobalStyle`
    :root {
        /* MOBILE SIZE (default) */

        /* COLOR VARIABLES */
        // neutrals
        --clr-ntrl-min: hsl(0, 0%, 100%);
        --clr-ntrl-max: hsl(0, 0%, 0%);

        /* base color, with one tint, and one shade - body and typogaphry is generally the base colour */
        --clr-base: hsl(0, 0%, 100%);
        --clr-base-dk: hsl(0, 0%, 85%);
        --clr-bg-base: hsl(0, 0%, 5%);

        /* primary brand color */
        /* --clr-primary: hsl(55, 88%, 72%); */
        --clr-primary: hsl(40, 88%, 58%);

        /* FONT */
        --ff-base: 'Ruslan Display', -apple-system, system-ui, BlinkMacSystemFont, 'Helvetica Neue',
        'Helvetica', sans-serif;
        --fs-base: 18px;
        --fs-bigr: 1.5rem; // configure
        --fs-bigst: 2rem; // configure
        --fw-base: 400;

        /* SHAPES */
        --brad-base: 1rem;

        /* SPACE */
        --layout-pdng: 1rem;

        ${media.lg} {
            --fs-base: 22px;
            /* --fs-bigr: 30px; */
            /* --fs-bigst: 50px; */
        }
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
        color: var(--clr-base);
        background-color: var(--clr-bg-base);
        -webkit-tap-highlight-color: transparent;
    }

    h1 {
        font-size: var(--fs-bigst);
    }

    a {
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0); // outline light by press on mobile
        color: inherit;
        text-decoration: none;
        cursor: pointer;
    }
`;

export default GlobalStyle;

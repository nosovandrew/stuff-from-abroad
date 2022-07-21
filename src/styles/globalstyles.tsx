import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    :root {
        /* MOBILE SIZE (default) */

        /* FONT */
        --font-serif: 'Roboto', -apple-system, system-ui, BlinkMacSystemFont, 'Helvetica Neue',
        'Helvetica', sans-serif;
        --basic-font-size: 18px;
        --basic-font-weight: 400;
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
        font-family: var(--font-serif);
        font-size: var(--basic-font-size);
        font-weight: var(--basic-font-weight);
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

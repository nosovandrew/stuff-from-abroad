import * as React from 'react';
import { SVGProps } from 'react';

const SvgTrash = (props: SVGProps<SVGSVGElement>) => (
    <svg
        width="1em"
        height="1em"
        viewBox="0 0 18 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M14 20H4a2 2 0 0 1-2-2V5H1a1 1 0 0 1 0-2h3V2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1h3a1 1 0 1 1 0 2h-1v13a2 2 0 0 1-2 2ZM4 5v13h10V5H4Zm2-3v1h6V2H6Zm6 13a1 1 0 1 1-2 0V8a1 1 0 1 1 2 0v7Zm-4 0a1 1 0 1 1-2 0V8a1 1 0 0 1 2 0v7Z"
            fill="#000"
        />
    </svg>
);

export default SvgTrash;

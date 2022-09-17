import * as React from 'react';
import { SVGProps } from 'react';

const SvgPlus = (props: SVGProps<SVGSVGElement>) => (
    <svg
        width="1em"
        height="1em"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <rect x={22.5} width={5} height={50} rx={2.5} fill="#000" />
        <rect
            x={50}
            y={22.5}
            width={5}
            height={50}
            rx={2.5}
            transform="rotate(90 50 22.5)"
            fill="#000"
        />
    </svg>
);

export default SvgPlus;

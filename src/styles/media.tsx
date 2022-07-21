const sizes = {
    // xs is default style
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    xxl: '1536px',
};

export const media = {
    // xs is default size
    sm: `@media (min-width: ${sizes.sm})`,
    md: `@media (min-width: ${sizes.md})`,
    lg: `@media (min-width: ${sizes.lg})`,
    xl: `@media (min-width: ${sizes.xl})`,
    xxl: `@media (min-width: ${sizes.xxl})`,
};
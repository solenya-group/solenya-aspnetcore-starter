import { style } from "typestyle"

export const layoutClass = style ({
    display: 'flex',
    flex: '0 1 auto',
    flexFlow: 'column',
    minHeight: '100vh',
    width: '100vw'
})

export const layoutHeaderClass = style({
    flex: '0 1 auto'
})

export const layoutContentClass = style({
    flex: '1 1 auto'
})

export const layoutFooterClass = style({
    flex: '0 1 auto'
})
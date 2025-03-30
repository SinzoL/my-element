export type LinkType = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default'

export interface LinkProps {
    type: LinkType,
    underline?: boolean,
    disabled?: boolean,
    href?: string,
    icon?: string,
    target?: string
}

export const linkEmits = {
    click: (e: MouseEvent) => e instanceof MouseEvent,
    //返回是否是鼠标点击事件
}

export type LinkEmits = typeof linkEmits
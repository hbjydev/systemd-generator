import type { PropsWithChildren } from "react";

export const A: React.FC<PropsWithChildren<{ href: string }>> = ({ href, children }) => {
    return (
        <a className="freedesktop.org" href={href}>{children}</a>
    )
}
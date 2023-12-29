import React from 'react';

export default function SubMenu({
    label,
    children,
}: {
    label: string;
    children: Array<React.ReactNode>;
}) {
    return (
        <div className="dropdown dropdown-hover">
            <div tabIndex={0} role="button" className="btn">
                {label}
            </div>
            <ul tabIndex={0} className="dropdown-content shadow bg-base-100">
                {children.map((child, index) => (
                    <li key={index}>
                        <a>{child}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

'use client';

import Link from 'next/link';
import React from 'react';

interface NavItemProps {
    href?: string;
    label: string;
    onClick?: () => void;
    className?: string;
}

const NavItem: React.FC<NavItemProps> = ({ href, label, onClick, className = '' }) => {
    const baseClasses = `relative group py-2 text-sm font-medium cursor-pointer flex justify-center items-center ${className}`;

    const underline = (
        <span className="absolute left-0 bottom-0 h-0.5 w-full bg-gradient-to-r from-blue-600 to-purple-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200" />
    );

    if (href) {
        return (
            <Link
                href={href}
                onClick={onClick}
                className={baseClasses}
            >
                <span className="">{label}</span>
                {underline}
            </Link>
        );
    }

    return (
        <span
            onClick={onClick}
            className={baseClasses}
            role="button"
        >
            <span className="">{label}</span>
            {underline}
        </span>
    );
};

export default NavItem;

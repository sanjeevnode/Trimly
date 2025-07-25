'use client';

import Link from 'next/link';
import React from 'react';

interface NavItemProps {
    href: string;
    label: string;
}

const NavItem: React.FC<NavItemProps> = ({ href, label }) => {
    return (
        <Link href={href} className="relative inline-block  group  py-0.5 h-fit text-sm font-medium">
            <span className="relative z-10">{label}</span>

            {/* Gradient underline */}
            <span className="absolute left-0 bottom-0 h-0.5 w-full bg-gradient-to-r from-blue-600 to-purple-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200" />

        </Link>
    );
};

export default NavItem;

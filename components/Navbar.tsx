"use client"

import { Link as LinkIcon, Menu } from "lucide-react"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Link from "next/link"
import GradientButton from "./custom/GradientButton"
import NavItem from "./custom/NavItem"
import { signOut, useSession } from "next-auth/react"
import { useState } from "react"

export default function Navbar() {
    const session = useSession();
    return (
        <nav className="fixed top-0 w-full border h-16 bg-white z-50">
            <div className="mx-auto max-w-7xl flex items-center justify-between px-4 py-2  h-full">
                <Link href="/" className="flex items-center">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-1 rounded">
                        <LinkIcon className="w-6 h-6 text-white" />
                    </div>
                    <span className="ml-3 text-xl font-bold font-poppins gradient-text">Trimly</span>
                </Link>
                <div className="space-x-6 hidden sm:flex items-center justify-center">
                    <NavItem href="/" label="Home" />

                    {
                        session.status === "authenticated" && (
                            <>

                                <NavItem href="/dashboard" label="Dashboard" />

                                <NavItem href="/profile" label="Profile" />
                            </>
                        )
                    }

                    <NavItem href="/contact" label="Contact" />

                    {
                        session.status === "authenticated" ? (
                            <NavItem onClick={() => signOut()} label="Logout" />
                        ) : (
                            <Link href="/login">
                                <GradientButton text="Login" />
                            </Link>
                        )
                    }
                </div>

                {/* Mobile Menu */}
                <MobileNavbar />
            </div>
        </nav>
    )
}


const MobileNavbar = () => {
    const session = useSession();
    const [open, setOpen] = useState(false);

    const handleItemClick = (action?: () => void) => {
        if (action) action();
        setOpen(false);
    };

    return (
        <div className="sm:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger>
                    <Menu className="cursor-pointer" />
                </SheetTrigger>
                <SheetContent className="w-[250px]">
                    <SheetHeader>
                        <SheetTitle className="gradient-text">
                            Trimly
                        </SheetTitle>
                    </SheetHeader>
                    <div className="flex flex-col space-y-2">

                        <NavItem
                            decoration={false}
                            href="/"
                            label="Home"
                            className="w-full flex items-center justify-center"
                            onClick={() => setOpen(false)}
                        />

                        {
                            session.status === "authenticated" && (
                                <>
                                    <NavItem
                                        decoration={false}
                                        href="/dashboard"
                                        label="Dashboard"
                                        className="w-full flex items-center justify-center"
                                        onClick={() => setOpen(false)}
                                    />

                                    <NavItem
                                        decoration={false}
                                        href="/profile"
                                        label="Profile"
                                        className="w-full flex items-center justify-center"
                                        onClick={() => setOpen(false)}
                                    />
                                </>
                            )
                        }

                        <NavItem
                            decoration={false}
                            href="/contact"
                            label="Contact"
                            className="w-full flex items-center justify-center"
                            onClick={() => setOpen(false)}
                        />

                        {
                            session.status === "authenticated" ? (
                                <NavItem
                                    decoration={false}
                                    onClick={() => handleItemClick(() => signOut())}
                                    label="Logout"
                                    className="w-full flex items-center justify-center"
                                />
                            ) : (
                                <NavItem
                                    decoration={false}
                                    href="/login"
                                    label="Login"
                                    className="w-full flex items-center justify-center"
                                    onClick={() => setOpen(false)}
                                />
                            )
                        }
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
}
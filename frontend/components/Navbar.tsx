"use client"

import { Link, Menu } from "lucide-react"
import { Button } from "./ui/button"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

export default function Navbar() {
    return (
        <nav className="fixed top-0 w-full border h-16 bg-white z-50">
            <div className="mx-auto max-w-7xl flex items-center justify-between p-4">
                <div className="flex items-center">
                    <Link className="w-6 h-6 text-blue-500 rotate-45" />
                    <span className="ml-2 text-xl font-bold">Trimly</span>
                </div>
                <div className="space-x-4 hidden sm:flex">
                    <Button variant="link" className="cursor-pointer">
                        Home
                    </Button>

                    <Button variant="link" className="cursor-pointer">
                        Dashboard
                    </Button>

                    <Button variant="link" className="cursor-pointer">
                        Profile
                    </Button>

                    <Button variant="link" className="cursor-pointer">
                        Contact
                    </Button>

                    <Button variant="outline" className="cursor-pointer">
                        Login
                    </Button>
                </div>

                {/* Mobile Menu */}
                <MobileNavbar />
            </div>
        </nav>
    )
}


const MobileNavbar = () => {
    return (
        <div className="sm:hidden">
            <Sheet>
                <SheetTrigger>
                    <Menu className="cursor-pointer" />
                </SheetTrigger>
                <SheetContent className="w-[250px]">
                    <SheetHeader>
                        <SheetTitle>
                            Trimly
                        </SheetTitle>
                    </SheetHeader>
                    <div className="flex flex-col space-y-2">
                        <Button variant="link" className="cursor-pointer">
                            Home
                        </Button>
                        <Button variant="link" className="cursor-pointer">
                            Dashboard
                        </Button>
                        <Button variant="link" className="cursor-pointer">
                            Profile
                        </Button>
                        <Button variant="link" className="cursor-pointer">
                            Contact
                        </Button>
                        <Button variant="link" className="cursor-pointer">
                            Login
                        </Button>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
}
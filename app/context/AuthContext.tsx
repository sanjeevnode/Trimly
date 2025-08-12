"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";


interface AuthContextProps {
    children: React.ReactNode;
}

const AuthContext = ({ children }: AuthContextProps) => {
    return (
        <SessionProvider>
            <AuthContextProvider>
                {children}
            </AuthContextProvider>
        </SessionProvider>
    )
}

const AuthContextProvider = ({ children }: AuthContextProps) => {
    const { status } = useSession();
    const router = useRouter();
    const path = usePathname();

    useEffect(() => {
        if (status === "unauthenticated") {
            if (path === "/") {
                router.push("/");
            } else {
                router.push("/login");
            }
        }
    }, [router, status, path]);

    return (
        <>
            {children}
        </>
    )
}

export default AuthContext

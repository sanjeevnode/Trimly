"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
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

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [router, status]);

    return (
        <>
            {children}
        </>
    )
}

export default AuthContext

"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { userStore } from "@/store/userStore";

interface StoreContextProps {
    children: React.ReactNode;
}

export const StoreContext = ({ children }: StoreContextProps) => {
    const { data: session, status } = useSession();
    const { syncUser, clearUser } = userStore();

    useEffect(() => {
        if (status === "authenticated" && session?.user?.email) {
            syncUser(session.user.email);
        } else if (status === "unauthenticated") {
            clearUser();
        }
    }, [session, status, syncUser, clearUser]);

    return <>{children}</>;
};
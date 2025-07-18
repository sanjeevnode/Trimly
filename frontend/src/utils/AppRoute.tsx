
import { Auth, Contact, Dashboard, Home, NotFound, Profile } from "@/pages/pages";
import { Route, Routes } from "react-router-dom";

export default function AppRoute() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

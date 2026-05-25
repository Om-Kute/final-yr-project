"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { BackgroundMesh } from "@/components/ui/DesignSystem";
import { useAuth } from "@/hooks/useAuth";
import { useUI } from "@/hooks/useUI";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isAuthenticated } = useAuth();
    const { sidebarOpen } = useUI();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            // router.push("/login");
        }
    }, [isAuthenticated, router]);

    return (
        <div className="h-screen bg-[#050816] flex overflow-hidden selection:bg-primary/30">
            <BackgroundMesh />
            <Sidebar />
            <div
                className={cn(
                    "transition-all duration-700 flex-1 flex flex-col h-screen min-w-0 relative z-10",
                    sidebarOpen ? "ml-72" : "ml-24"
                )}
            >
                <Header />
                <main className="flex-1 overflow-y-auto overflow-x-hidden p-8 md:p-12 relative custom-scrollbar">
                    {children}
                </main>
            </div>
        </div>
    );
}

import { useUIStore } from "@/lib/store";

export const useUI = () => {
    const sidebarOpen = useUIStore((state) => state.sidebarOpen);
    const setSidebarOpen = useUIStore((state) => state.setSidebarOpen);
    const toggleSidebar = useUIStore((state) => state.toggleSidebar);

    return {
        sidebarOpen,
        setSidebarOpen,
        toggleSidebar,
    };
};

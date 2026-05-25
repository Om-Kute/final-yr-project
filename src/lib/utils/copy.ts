import toast from "react-hot-toast";

export const copyToClipboard = async (text: string) => {
    try {
        await navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard!");
    } catch (error) {
        console.error("Copy failed", error);
        toast.error("Failed to copy");
    }
};

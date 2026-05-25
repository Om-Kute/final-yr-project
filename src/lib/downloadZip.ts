import { saveAs } from "file-saver";
import { generateZip } from "./zipGenerator";
import toast from "react-hot-toast";

/**
 * Generates and downloads a ZIP file of the project codebase.
 */
export const downloadProjectZip = async (files: Record<string, string>, projectName: string = "ai-project") => {
    const loadingToast = toast.loading("Preparing ZIP archive...");

    try {
        const blob = await generateZip(files);
        saveAs(blob, `${projectName.toLowerCase().replace(/\s+/g, "-")}.zip`);
        toast.success("Project ZIP downloaded!", { id: loadingToast });
    } catch (error) {
        console.error("ZIP Download Error:", error);
        toast.error("Failed to generate ZIP archive.", { id: loadingToast });
        throw error;
    }
};

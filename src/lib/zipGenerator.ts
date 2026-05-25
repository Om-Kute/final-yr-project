import JSZip from "jszip";

/**
 * Generates a ZIP blob from a record of files (path -> content)
 * Organizes files into an 'ai-project' root directory.
 */
export const generateZip = async (files: Record<string, string>): Promise<Blob> => {
    const zip = new JSZip();
    const root = zip.folder("ai-project");

    if (!root) throw new Error("Could not create ZIP root folder");

    Object.entries(files).forEach(([path, content]) => {
        root.file(path, content);
    });

    return await zip.generateAsync({
        type: "blob",
        compression: "DEFLATE",
        compressionOptions: { level: 6 }
    });
};

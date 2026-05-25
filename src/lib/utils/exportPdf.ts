import { jsPDF } from "jspdf";
import { toPng } from "html-to-image";
import toast from "react-hot-toast";

export const exportToPDF = async (elementId: string) => {
    const element = document.getElementById(elementId);
    if (!element) {
        toast.error("Could not find content to export");
        return;
    }

    const loadingToast = toast.loading("Generating PDF...");

    try {
        const dataUrl = await toPng(element, {
            quality: 1,
            backgroundColor: "#000000",
            pixelRatio: 2, // Equivalent to scale: 2 for high density rendering
        });

        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();

        // Calculate scaled height to maintain aspect ratio
        const imgProps = pdf.getImageProperties(dataUrl);
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("ai-architecture.pdf");

        toast.success("Export successful!", { id: loadingToast });
    } catch (error) {
        console.error("PDF Export failed", error);
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        toast.error(`Export failed: ${errorMessage}`, { id: loadingToast });
    }
};

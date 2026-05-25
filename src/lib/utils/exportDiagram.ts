import { toPng } from "html-to-image";

/**
 * Download the Mermaid diagram as SVG or PNG.
 * @param svgId   - The `id` attribute on the <svg> rendered by Mermaid
 * @param format  - "svg" or "png"
 * @param filename - Base filename (without extension)
 */
export const downloadDiagram = async (
    svgId: string,
    format: "svg" | "png" = "svg",
    filename: string = "diagram"
): Promise<void> => {
    const svgElement = document.getElementById(svgId) as SVGSVGElement | null;

    if (!svgElement) {
        console.error(`Diagram SVG element with id "${svgId}" not found.`);
        return;
    }

    try {
        if (format === "svg") {
            downloadSvg(svgElement, filename);
        } else {
            await downloadPng(svgElement, filename);
        }
    } catch (err) {
        console.error("Error exporting diagram:", err);
    }
};

function downloadSvg(svgElement: SVGSVGElement, filename: string) {
    const serializer = new XMLSerializer();
    let source = serializer.serializeToString(svgElement);

    // Ensure proper XML namespace declarations
    if (!source.match(/^<svg[^>]+xmlns="http:\/\/www\.w3\.org\/2000\/svg"/)) {
        source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
    }
    source = '<?xml version="1.0" standalone="no"?>\r\n' + source;

    const url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);
    triggerDownload(url, `${filename}.svg`);
}

async function downloadPng(svgElement: SVGSVGElement, filename: string) {
    // Find the parent container of the SVG for html-to-image
    // html-to-image works better on a div container than a raw SVG
    const container = svgElement.parentElement;
    if (!container) {
        // Fallback: wrap SVG in a temporary div
        const wrapper = document.createElement("div");
        wrapper.style.display = "inline-block";
        wrapper.style.background = "#0d1117";
        wrapper.style.padding = "24px";
        document.body.appendChild(wrapper);
        wrapper.appendChild(svgElement.cloneNode(true));

        try {
            const dataUrl = await toPng(wrapper, {
                backgroundColor: "#0d1117",
                pixelRatio: 2,
            });
            triggerDownload(dataUrl, `${filename}.png`);
        } finally {
            document.body.removeChild(wrapper);
        }
        return;
    }

    const dataUrl = await toPng(container, {
        backgroundColor: "#0d1117",
        pixelRatio: 2,
    });
    triggerDownload(dataUrl, `${filename}.png`);
}

function triggerDownload(url: string, filename: string) {
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { Download, ZoomIn, ZoomOut, Maximize } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { downloadDiagram } from "@/lib/utils/exportDiagram";
import { Card } from "@/components/ui/Card";
import { motion, AnimatePresence } from "framer-motion";

// Inject scrollbar styles once via a global approach
const SCROLLBAR_STYLE_ID = "diagram-scrollbar-styles";
const injectScrollbarStyles = () => {
    if (typeof document !== "undefined" && !document.getElementById(SCROLLBAR_STYLE_ID)) {
        const styleEl = document.createElement("style");
        styleEl.id = SCROLLBAR_STYLE_ID;
        styleEl.textContent = `
            .diagram-scroll::-webkit-scrollbar { width: 8px; height: 8px; }
            .diagram-scroll::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); border-radius: 4px; }
            .diagram-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 4px; }
            .diagram-scroll::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.3); }
        `;
        document.head.appendChild(styleEl);
    }
};

interface DiagramViewerProps {
    chart: string;
    id?: string;
}

export const DiagramViewer: React.FC<DiagramViewerProps> = ({ chart, id = "diagram" }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [isRendered, setIsRendered] = useState(false);
    const uniqueId = `mermaid-${id}`;

    useEffect(() => {
        injectScrollbarStyles();
    }, []);

    useEffect(() => {
        setIsRendered(false);
        mermaid.initialize({
            startOnLoad: false,
            theme: "dark",
            securityLevel: "loose",
            fontFamily: "Inter, sans-serif",
        });

        const timeoutId = setTimeout(async () => {
            if (containerRef.current && chart) {
                try {
                    containerRef.current.innerHTML = "";
                    const { svg, bindFunctions } = await mermaid.render(uniqueId, chart);
                    containerRef.current.innerHTML = svg;
                    if (bindFunctions) {
                        bindFunctions(containerRef.current);
                    }

                    const svgElement = containerRef.current.querySelector("svg");
                    if (svgElement) {
                        svgElement.setAttribute("id", uniqueId);
                        svgElement.style.maxWidth = "none";
                        svgElement.style.height = "auto";
                    }

                    setIsRendered(true);
                } catch (err) {
                    console.error("Mermaid render error:", err);
                    if (containerRef.current) {
                        containerRef.current.innerHTML =
                            '<div style="color:#f87171;padding:16px;border:1px solid rgba(248,113,113,0.2);border-radius:8px;background:rgba(248,113,113,0.05)">Failed to render diagram. Please check the syntax.</div>';
                    }
                }
            }
        }, 100);

        return () => clearTimeout(timeoutId);
    }, [chart, uniqueId]);

    const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.2, 3));
    const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.2, 0.5));
    const handleResetZoom = () => setZoomLevel(1);

    return (
        <Card className="flex flex-col border-white/20 bg-black/40 overflow-hidden">
            {/* Toolbar */}
            <div className="flex items-center justify-between p-3 flex-wrap gap-2 border-b border-white/10 bg-white/5">
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleZoomOut}
                        className="h-8 w-8 p-0 border-white/10 text-white/70 hover:text-white"
                    >
                        <ZoomOut className="h-4 w-4" />
                    </Button>
                    <span className="text-xs font-medium text-white/50 w-12 text-center">
                        {Math.round(zoomLevel * 100)}%
                    </span>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleZoomIn}
                        className="h-8 w-8 p-0 border-white/10 text-white/70 hover:text-white"
                    >
                        <ZoomIn className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleResetZoom}
                        className="h-8 px-2 border-white/10 text-white/70 hover:text-white ml-1"
                    >
                        <Maximize className="h-3 w-3 mr-1.5" />
                        <span className="text-xs">Reset</span>
                    </Button>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => downloadDiagram(uniqueId, "svg")}
                        className="h-8 border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/10 hover:border-indigo-500/50 transition-colors"
                        disabled={!isRendered}
                    >
                        <Download className="h-3.5 w-3.5 mr-1.5" />
                        <span className="text-xs">SVG</span>
                    </Button>
                    <Button
                        size="sm"
                        className="h-8 bg-blue-600/80 hover:bg-blue-500 text-white border border-blue-400/30 shadow-[0_0_10px_rgba(37,99,235,0.2)] transition-all font-medium"
                        onClick={() => downloadDiagram(uniqueId, "png")}
                        disabled={!isRendered}
                    >
                        <Download className="h-3.5 w-3.5 mr-1.5" />
                        <span className="text-xs">PNG</span>
                    </Button>
                </div>
            </div>

            {/* Diagram Area */}
            <div
                className="diagram-scroll w-full relative min-h-[400px] max-h-[600px] overflow-auto bg-[#0d1117] p-8"
            >
                <AnimatePresence>
                    {!isRendered && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 flex items-center justify-center bg-[#0d1117]"
                        >
                            <div className="w-8 h-8 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
                        </motion.div>
                    )}
                </AnimatePresence>

                <div
                    className="flex justify-center items-center transition-transform duration-200 ease-out min-w-max"
                    style={{
                        transform: `scale(${zoomLevel})`,
                        transformOrigin: "center top",
                    }}
                >
                    <div
                        ref={containerRef}
                        className="w-full flex justify-center py-4 text-center"
                    />
                </div>
            </div>
        </Card>
    );
};

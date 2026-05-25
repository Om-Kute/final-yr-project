import React from 'react';
import { FileCode, FileJson, FileText, File, Database, Terminal } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { useProject } from '@/hooks/useProject';

interface CodeViewerProps {
    files?: Record<string, string>;
    selectedFile?: string | null;
    setSelectedFile?: (file: string) => void;
}

function getIconForFile(filename: string) {
    if (filename.endsWith('.ts') || filename.endsWith('.tsx')) return <FileCode className="w-4 h-4 text-blue-400" />;
    if (filename.endsWith('.js') || filename.endsWith('.jsx')) return <FileCode className="w-4 h-4 text-yellow-400" />;
    if (filename.endsWith('.json')) return <FileJson className="w-4 h-4 text-green-400" />;
    if (filename.endsWith('.md')) return <FileText className="w-4 h-4 text-gray-300" />;
    if (filename.endsWith('.sql')) return <Database className="w-4 h-4 text-pink-400" />;
    return <File className="w-4 h-4 text-gray-400" />;
}

export function CodeViewer({ files: propFiles, selectedFile: propSelectedFile, setSelectedFile: propSetSelectedFile }: CodeViewerProps) {
    const { generatedCode, selectedFile: storeSelectedFile, setSelectedFile: storeSetSelectedFile } = useProject();

    const files = propFiles || generatedCode?.files || {};
    const selectedFile = propSelectedFile !== undefined ? propSelectedFile : storeSelectedFile;
    const setSelectedFile = propSetSelectedFile || storeSetSelectedFile;

    if (!files || Object.keys(files).length === 0) {
        return (
            <Card className="h-[500px] bg-black/40 border-white/10 flex items-center justify-center">
                <p className="text-white/40">No files available to view.</p>
            </Card>
        );
    }

    const filePaths = Object.keys(files);

    return (
        <div className="relative z-10 w-full h-full">
            <Card className="border-white/10 bg-[#0d1117] overflow-hidden flex flex-col md:flex-row shadow-2xl shadow-indigo-500/10 min-h-[500px] max-h-fit md:h-[600px] p-0">
                {/* Sidebar Explorer */}
                <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-white/10 bg-[#161b22] flex flex-col shrink-0 h-[250px] md:h-full overflow-hidden">
                    <div className="p-4 border-b border-white/5 uppercase tracking-wider text-xs font-bold text-white/50 flex items-center gap-2 shrink-0">
                        <Terminal className="w-4 h-4" /> Explorer
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-2 py-3 space-y-1 min-h-0">
                        {filePaths.map((path) => {
                            const parts = path.split('/');
                            const filename = parts.pop() || path;
                            const folders = parts.join(' / ');
                            const isActive = selectedFile === path;

                            return (
                                <button
                                    key={path}
                                    onClick={() => setSelectedFile(path)}
                                    className={twMerge(
                                        "w-full text-left px-3 py-2 rounded-md flex flex-col transition-all group relative overflow-hidden",
                                        isActive
                                            ? "bg-purple-500/20 border border-purple-500/50 shadow-[inset_0_0_15px_rgba(168,85,247,0.1)]"
                                            : "hover:bg-white/10 border border-transparent"
                                    )}
                                >
                                    <span className="text-[9px] text-white/20 truncate leading-none mb-1 ml-[20px] font-mono group-hover:text-white/40 transition-colors uppercase">
                                        {folders ? folders + ' /' : ''}
                                    </span>
                                    <div className="flex items-center gap-2">
                                        {getIconForFile(filename)}
                                        <span className={clsx(
                                            "text-sm truncate font-bold tracking-tight",
                                            isActive ? "text-purple-300" : "text-white/60 group-hover:text-white"
                                        )}>
                                            {filename}
                                        </span>
                                    </div>
                                    {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500" />}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Code Editor Preview */}
                <div
                    key={selectedFile || 'no-file'}
                    className="flex-1 bg-black/40 p-4 md:p-6 overflow-auto scrollbar-thin scrollbar-thumb-purple-500/20 min-h-[300px]"
                >
                    {selectedFile && files[selectedFile] ? (
                        <div className="animate-in fade-in duration-300">
                            <div className="text-xs text-gray-400 mb-4 font-mono select-none flex items-center gap-2 px-2 py-1 bg-white/5 rounded w-fit">
                                <span className="w-2 h-2 rounded-full bg-purple-500/40" />
                                {selectedFile}
                            </div>
                            <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap leading-relaxed">
                                {files[selectedFile]}
                            </pre>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-gray-500 font-medium">
                            <File className="w-12 h-12 mb-4 opacity-20" />
                            <p>No file selected or file content missing</p>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
}

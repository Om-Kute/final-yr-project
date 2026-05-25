import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
    id: string;
    name: string;
    email: string;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    setUser: (user: User | null) => void;
    logout: () => void;
}

interface UIState {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
    toggleSidebar: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            setUser: (user) => set({ user, isAuthenticated: !!user }),
            logout: () => set({ user: null, isAuthenticated: false }),
        }),
        {
            name: "auth-storage",
        }
    )
);

import type { GeneratedArchitecture } from "./aiEngine";

export type DifficultyLevel = "beginner" | "intermediate" | "advanced" | null;
export type GenerationStatus = "idle" | "processing" | "completed";
export type CodeGenerationStatus = "idle" | "generating" | "completed" | "error";

export interface GeneratedCode {
    structure: string;
    files: Record<string, string>;
}

export interface ProjectFeatures {
    authentication: boolean;
    aiFeatures: boolean;
    payment: boolean;
}

export interface SavedProject extends GeneratedArchitecture {
    id: number;
    userId?: string;
    createdAt: string;
}

export interface ChatMessage {
    role: "user" | "assistant";
    content: string;
    timestamp: string;
}

interface ProjectState {
    projectIdea: string;
    difficultyLevel: DifficultyLevel;
    selectedFeatures: ProjectFeatures;
    generationStatus: GenerationStatus;
    generatedResult: GeneratedArchitecture | null;
    generatedCode: GeneratedCode | null;
    codeGenerationStatus: CodeGenerationStatus;
    selectedFile: string | null;
    savedProjects: SavedProject[];
    chatMessages: ChatMessage[];
    isChatLoading: boolean;
    setProjectIdea: (idea: string) => void;
    setDifficultyLevel: (level: DifficultyLevel) => void;
    toggleFeature: (feature: keyof ProjectFeatures) => void;
    setGenerationStatus: (status: GenerationStatus) => void;
    setGeneratedResult: (data: GeneratedArchitecture | null) => void;
    saveProject: (project: SavedProject) => void;
    deleteProject: (id: number) => void;
    setSavedProjects: (projects: SavedProject[]) => void;
    resetProject: () => void;
    setGeneratedCode: (data: GeneratedCode | null) => void;
    setCodeGenerationStatus: (status: CodeGenerationStatus) => void;
    setSelectedFile: (file: string | null) => void;
    setChatMessages: (messages: ChatMessage[]) => void;
    addChatMessage: (message: ChatMessage) => void;
    setChatLoading: (loading: boolean) => void;
}

const initialProjectState = {
    projectIdea: "",
    difficultyLevel: null,
    selectedFeatures: {
        authentication: true,
        aiFeatures: false,
        payment: false,
    },
    generationStatus: "idle" as GenerationStatus,
    generatedResult: null,
    generatedCode: null,
    codeGenerationStatus: "idle" as CodeGenerationStatus,
    selectedFile: null,
    chatMessages: [],
    isChatLoading: false,
};

export const useProjectStore = create<ProjectState>()(
    persist(
        (set) => ({
            ...initialProjectState,
            savedProjects: [],
            setProjectIdea: (idea) => set({ projectIdea: idea }),
            setDifficultyLevel: (level) => set({ difficultyLevel: level }),
            toggleFeature: (feature) =>
                set((state) => ({
                    selectedFeatures: {
                        ...state.selectedFeatures,
                        [feature]: !state.selectedFeatures[feature],
                    },
                })),
            setGenerationStatus: (status) => set({ generationStatus: status }),
            setGeneratedResult: (data) => set({ generatedResult: data }),
            saveProject: (project) => set((state) => {
                const existingIndex = state.savedProjects.findIndex(p => p.id === project.id);
                if (existingIndex > -1) {
                    const newProjects = [...state.savedProjects];
                    newProjects[existingIndex] = project;
                    return { savedProjects: newProjects };
                }
                return { savedProjects: [...state.savedProjects, project] };
            }),
            deleteProject: (id) => set((state) => ({
                savedProjects: state.savedProjects.filter(p => p.id !== id)
            })),
            setSavedProjects: (projects) => set({ savedProjects: projects }),
            resetProject: () => set(initialProjectState),
            setGeneratedCode: (data) => set({ generatedCode: data }),
            setCodeGenerationStatus: (status) => set({ codeGenerationStatus: status }),
            setSelectedFile: (file) => set({ selectedFile: file }),
            setChatMessages: (messages) => set({ chatMessages: messages }),
            addChatMessage: (message) => set((state) => ({ chatMessages: [...state.chatMessages, message] })),
            setChatLoading: (loading) => set({ isChatLoading: loading }),
        }),
        {
            name: "project-config-storage",
        }
    )
);

export const useUIStore = create<UIState>((set) => ({
    sidebarOpen: true,
    setSidebarOpen: (open) => set({ sidebarOpen: open }),
    toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}));

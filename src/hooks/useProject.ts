import { useProjectStore } from "@/lib/store";

export const useProject = () => {
    const projectIdea = useProjectStore((state) => state.projectIdea);
    const difficultyLevel = useProjectStore((state) => state.difficultyLevel);
    const selectedFeatures = useProjectStore((state) => state.selectedFeatures);
    const generationStatus = useProjectStore((state) => state.generationStatus);
    const generatedResult = useProjectStore((state) => state.generatedResult);
    const generatedCode = useProjectStore((state) => state.generatedCode);
    const codeGenerationStatus = useProjectStore((state) => state.codeGenerationStatus);
    const selectedFile = useProjectStore((state) => state.selectedFile);
    const savedProjects = useProjectStore((state) => state.savedProjects);
    const chatMessages = useProjectStore((state) => state.chatMessages);
    const isChatLoading = useProjectStore((state) => state.isChatLoading);

    const setProjectIdea = useProjectStore((state) => state.setProjectIdea);
    const setDifficultyLevel = useProjectStore((state) => state.setDifficultyLevel);
    const toggleFeature = useProjectStore((state) => state.toggleFeature);
    const setGenerationStatus = useProjectStore((state) => state.setGenerationStatus);
    const setGeneratedResult = useProjectStore((state) => state.setGeneratedResult);
    const setGeneratedCode = useProjectStore((state) => state.setGeneratedCode);
    const setCodeGenerationStatus = useProjectStore((state) => state.setCodeGenerationStatus);
    const setSelectedFile = useProjectStore((state) => state.setSelectedFile);
    const saveProject = useProjectStore((state) => state.saveProject);
    const deleteProject = useProjectStore((state) => state.deleteProject);
    const setSavedProjects = useProjectStore((state) => state.setSavedProjects);
    const resetProject = useProjectStore((state) => state.resetProject);
    const setChatMessages = useProjectStore((state) => state.setChatMessages);
    const addChatMessage = useProjectStore((state) => state.addChatMessage);
    const setChatLoading = useProjectStore((state) => state.setChatLoading);

    const isFormValid =
        projectIdea.trim().length > 0 && difficultyLevel !== null;

    return {
        projectIdea,
        difficultyLevel,
        selectedFeatures,
        generationStatus,
        generatedResult,
        generatedCode,
        codeGenerationStatus,
        selectedFile,
        savedProjects,
        chatMessages,
        isChatLoading,
        setProjectIdea,
        setDifficultyLevel,
        toggleFeature,
        setGenerationStatus,
        setGeneratedResult,
        setGeneratedCode,
        setCodeGenerationStatus,
        setSelectedFile,
        saveProject,
        deleteProject,
        setSavedProjects,
        resetProject,
        setChatMessages,
        addChatMessage,
        setChatLoading,
        isFormValid,
    };
};

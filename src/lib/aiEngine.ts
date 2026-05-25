export interface GenerateArchitectureInput {
    idea: string;
    difficulty: string | null;
    features: {
        authentication: boolean;
        aiFeatures: boolean;
        payment: boolean;
    };
}

export interface GeneratedArchitecture {
    title: string;
    description: string;
    techStack: {
        frontend: string[];
        backend: string[];
        database: string[];
    };
    architecture: string[];
    database: string[];
    features: string[];
}

export async function generateArchitecture(data: GenerateArchitectureInput): Promise<GeneratedArchitecture> {
    const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idea: data.idea,
            difficulty: data.difficulty,
            features: [
                data.features.authentication ? "Authentication" : "",
                data.features.aiFeatures ? "AI Features" : "",
                data.features.payment ? "Payment Gateway" : ""
            ].filter(Boolean)
        }),
    });

    const result = await res.json();

    if (!res.ok) {
        throw new Error(result.error || "Failed to generate architecture");
    }

    return result;
}

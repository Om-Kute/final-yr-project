interface ParsedArchitecture {
    title: string;
    description: string;
    flow: string[];
    frontend: string[];
    backend: string[];
    database: string[];
    features: string[];
}

export function parseArchitecture(data: Record<string, any>): ParsedArchitecture {
    return {
        title: (data?.title as string) || "Untitled Project",
        description: (data?.description as string) || "No description available",
        flow: Array.isArray(data?.architecture)
            ? (data.architecture as string[])
            : ["Client", "API Gateway", "Backend Service", "Database"],
        frontend: (data?.techStack?.frontend || []) as string[],
        backend: (data?.techStack?.backend || []) as string[],
        database: (data?.techStack?.database || []) as string[],
        features: (data?.features || []) as string[]
    };
}

import { Monitor, Server, Cpu, Brain, Database, Shield, Box, Layout, Cloud, Smartphone } from "lucide-react";

export function getIconForComponent(name: string) {
    if (!name) return Box;
    const lower = name.toLowerCase();

    if (lower.includes("frontend") || lower.includes("client") || lower.includes("ui") || lower.includes("web")) return Monitor;
    if (lower.includes("mobile") || lower.includes("app")) return Smartphone;
    if (lower.includes("api") || lower.includes("gateway") || lower.includes("router")) return Server;
    if (lower.includes("backend") || lower.includes("service") || lower.includes("logic")) return Cpu;
    if (lower.includes("ai") || lower.includes("ml") || lower.includes("model") || lower.includes("engine")) return Brain;
    if (lower.includes("database") || lower.includes("db") || lower.includes("store") || lower.includes("cache")) return Database;
    if (lower.includes("auth") || lower.includes("security") || lower.includes("iam")) return Shield;
    if (lower.includes("cloud") || lower.includes("aws") || lower.includes("vercel")) return Cloud;
    if (lower.includes("layout") || lower.includes("view")) return Layout;

    return Box; // fallback
}

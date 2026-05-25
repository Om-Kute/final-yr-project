import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { DemoPreview } from "@/components/sections/DemoPreview";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { Capabilities } from "@/components/sections/Capabilities";
import { SocialProof } from "@/components/sections/SocialProof";
import { FAQ } from "@/components/sections/FAQ";
import Chatbot from "@/components/Chatbot";

export default function Home() {
    return (
        <div className="flex flex-col relative">
            <Hero />
            <SocialProof />
            <Features />
            <Capabilities />
            <DemoPreview />
            <FAQ />
            <ContactCTA />
            <Chatbot />
        </div>
    );
}

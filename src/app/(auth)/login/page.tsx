"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {

    const router = useRouter();

    const [email, setEmail] = useState("");

    const [password, setPassword] =
        useState("");

    const [error, setError] = useState("");

    const [isLoading, setIsLoading] =
        useState(false);

    const handleSubmit = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        setIsLoading(true);

        setError("");

        try {

            const res = await fetch(
                "/api/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",
                    },

                    body: JSON.stringify({
                        email,
                        password,
                    }),
                }
            );

            const data = await res.json();

            if (data.success) {

                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );

                router.push("/dashboard");

            } else {

                setError(data.error);
            }

        } catch (error) {

            setError("Something went wrong");
        }

        setIsLoading(false);
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#020617] flex items-center justify-center px-4">

            {/* Background Glow Effects */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500/20 blur-3xl rounded-full" />

            <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-600/20 blur-3xl rounded-full" />

            {/* Card */}
            <div className="relative w-full max-w-md">

                {/* Glassmorphism Card */}
                <div className="backdrop-blur-2xl bg-white/5 border border-white/10 shadow-[0_0_50px_rgba(0,255,255,0.15)] rounded-3xl p-8">

                    {/* Heading */}
                    <div className="text-center mb-8">

                        <h1 className="text-4xl font-extrabold text-white mb-2">
                            Welcome Back
                        </h1>

                        <p className="text-gray-400">
                            Login to continue building AI architectures
                        </p>

                    </div>

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        {/* Email */}
                        <div>

                            <input
                                type="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                className="w-full bg-[#0F172A]/80 border border-gray-700 text-white px-5 py-4 rounded-2xl outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30 transition-all"
                            />

                        </div>

                        {/* Password */}
                        <div>

                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                className="w-full bg-[#0F172A]/80 border border-gray-700 text-white px-5 py-4 rounded-2xl outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30 transition-all"
                            />

                        </div>

                        {/* Error */}
                        {error && (
                            <p className="text-red-400 text-sm">
                                {error}
                            </p>
                        )}

                        {/* Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(0,255,255,0.4)] transition-all duration-300"
                        >
                            {isLoading
                                ? "Logging in..."
                                : "Login"}
                        </button>

                        {/* Signup Redirect */}
                        <p className="text-center text-gray-400 text-sm pt-2">

                            Don&apos;t have an account?{" "}

                            <span
                                onClick={() =>
                                    router.push("/signup")
                                }
                                className="text-cyan-400 hover:text-cyan-300 cursor-pointer font-semibold transition-all"
                            >
                                Sign Up
                            </span>

                        </p>

                    </form>

                </div>

            </div>

        </div>
    );
}
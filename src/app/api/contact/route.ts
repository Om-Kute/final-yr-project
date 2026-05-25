import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Contact from "@/models/Contact";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, subject, message } = body;

        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: "Validation failed: all fields are required" },
                { status: 400 }
            );
        }

        await connectDB();

        const contact = await Contact.create({
            name,
            email,
            subject,
            message,
        });

        return NextResponse.json(
            { message: "Message sent successfully", data: contact },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Contact API Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error", details: error.message },
            { status: 500 }
        );
    }
}

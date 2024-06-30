import prisma from "@/app/lib/db";
import { User } from "@/app/lib/interfaces";
import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

export async function GET(req: NextRequest, res: NextResponse){
    try {
        const users: User[] = await prisma.user.findMany({
            include: {
                reservations: true
            }
        });
        
        return NextResponse.json({ users }, { status: 200 });
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json({ error }, { status: 500 });
    }
}

export async function POST(req: NextRequest, res: NextResponse){
    const { name, email }: User = await req.json()
    
    try {
        const user: User = await prisma.user.create({
            data: {
                name,
                email,
            },
        });

        return NextResponse.json({ message: "User created successfully", user }, { status: 201 });
    } catch (error) {
        console.error('Error creating user:', error);
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
            return NextResponse.json({ message: "Email already exists" }, { status: 400 });
        } else{
            return NextResponse.json({ error }, { status: 500 });
        }
    }
}
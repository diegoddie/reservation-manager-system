import prisma from "@/app/lib/db";
import { Reservation } from "@/app/lib/interfaces";
import { NextRequest, NextResponse } from "next/server";

export async function GET (req: NextRequest, { params }: { params: { email: string } }) {
    const { email } = params;
  
    try {
        const reservations: Reservation[] = await prisma.reservation.findMany({
            where: {
                user: {
                    email
                },
            },
            include: {
                user: true, 
            },
            orderBy: {
                date: 'asc',  
            },
        });

        return NextResponse.json({ reservations }, { status: 200 });
    } catch (error) {
        console.error('Error fetching reservations by user email:', error);
        return NextResponse.json({ error }, { status: 500 });
    }
}
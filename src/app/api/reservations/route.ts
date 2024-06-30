import { CLOSING_HOUR_UTC, OPENING_HOUR_UTC, SEATS_PER_TABLE, TOTAL_TABLES } from "@/app/lib/constants";
import prisma from "@/app/lib/db";
import { Reservation, User } from "@/app/lib/interfaces";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    const { email, date, people }: { email: string; date: string; people: number } = await req.json();
    
    const reservationDate = new Date(date);
    const reservationHour = reservationDate.getUTCHours();
    
    if (reservationHour < OPENING_HOUR_UTC || reservationHour >= CLOSING_HOUR_UTC) {
        return NextResponse.json({ message: "Reservation time must be between 19:00 and 24:00" }, { status: 400 });
    }

    if (people < 1 || people > SEATS_PER_TABLE) {
        return NextResponse.json({ message: `Number of people must be between 1 and ${SEATS_PER_TABLE}` }, { status: 400 });
    }

    try {
        const user: User | null = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return NextResponse.json({ message:  "User not found" }, { status: 400 });
        }

        const userExistingReservation: Reservation | null = await prisma.reservation.findFirst({
            where: {
              userId: user.id,
              date: reservationDate
            }
        });

        if (userExistingReservation) {
            return NextResponse.json({ message:  "User already has a reservation for this time slot" }, { status: 400 });
        }

        const reservationsAtTime: Reservation[] = await prisma.reservation.findMany({
            where: { date: reservationDate }
        });

        const occupiedTables: number[] = reservationsAtTime.map(reservation => reservation.table)

        // Crea un array di tavoli da 1 a TOTAL_TABLES([1, 2, 3, 4, 5]) e trova il primo tavolo che non è occupato
        const availableTable = Array.from({ length: TOTAL_TABLES }, (_, i) => i + 1).find(table => !occupiedTables.includes(table));

        if (!availableTable) {
            return NextResponse.json({ message:  "No available tables for this time slot" }, { status: 400 });
        }

        const reservation: Reservation = await prisma.reservation.create({
            data: {
                userId: user.id,
                date: reservationDate,
                people: people,
                table: availableTable
            } 
        });

        return NextResponse.json({ reservation }, { status: 201 });
    } catch (error) {
        console.error('Error creating a reservation:', error);
        return NextResponse.json({ error }, { status: 500 });
    }
}

export async function GET(req: NextRequest, res: NextResponse) {
    const startDate = req.nextUrl.searchParams.get('startDate');
    const endDate = req.nextUrl.searchParams.get('endDate');
    
    try {
        const reservations: Reservation[] = await prisma.reservation.findMany({
            where: {
                date: {
                    gte: new Date(startDate as string), 
                    lt: new Date(endDate as string),   
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
        console.error('Error fetching reservations:', error);
        return NextResponse.json({ error }, { status: 500 });
    }
}
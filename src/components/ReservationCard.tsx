import { Reservation } from '@/app/lib/interfaces'
import React from 'react'

type Props = {
    reservation: Reservation
}

function ReservationCard({reservation}: Props) {
    const formattedDate = new Date(reservation.date).toLocaleString();
    return (
        <div className="card bg-pink-100 border shadow-xl">
            <div className="card-body">
                <h2 className="card-title text-3xl font-bold">Table {reservation.table} - {reservation.user?.name}</h2>
                <p className='text-xl font-semibold'>{reservation.people} people</p>
                <p className='text-lg'>{formattedDate}</p>
                <p>{reservation.user?.email}</p>
            </div>
        </div>
    )
}

export default ReservationCard
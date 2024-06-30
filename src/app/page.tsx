'use client'

import React, { useState } from 'react';
import { Calendar, Plus, Search } from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import CreateUserModal from '@/components/CreateUserModal';
import CreateReservationModal from '@/components/CreateReservationModal';
import { Reservation } from './lib/interfaces';
import axios from 'axios';
import ReservationCard from '@/components/ReservationCard';

export default function Home() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [reservations, setReservations] = useState<Reservation[]>([]);

  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const openUserModal = () => setIsUserModalOpen(true);
  const closeUserModal = () => setIsUserModalOpen(false);

  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const openReservationModal = () => setIsReservationModalOpen(true);
  const closeReservationModal = () => setIsReservationModalOpen(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!startDate || !endDate) {
      alert('Please select both start and end dates.');
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.get('/api/reservations', {
        params: {
          startDate,
          endDate,
        },
      });
      if (response.status === 200) {
        setIsLoading(false)
        setReservations(response.data.reservations);
    }
    } catch (error) {
      console.error('Failed to fetch reservations:', error);
      alert('Failed to fetch reservations. Please try again later.');
      setIsLoading(false)
    }
  };

  return (
    <div className='bg-gray-50 min-h-screen w-full text-black'>
      <div className='justify-center p-8 text-center flex text-5xl font-bold'>
        <h1>Reservation Manager</h1>
      </div>
      <div className='px-6 flex flex-col md:flex-row gap-3 justify-center'>
        <button onClick={openUserModal} className="btn text-xl bg-white text-black hover:text-white hover:bg-purple-500"><Plus />Create User</button>
        <button onClick={openReservationModal} className="btn bg-purple-500 text-xl text-white hover:bg-purple-700"><Calendar /> New Reservation</button>
      </div>
      <div className='mt-6 px-6 flex justify-center flex-col md:flex-row gap-6'>
        <div className='flex flex-col md:flex-row gap-3 md:gap-6 justify-center items-center'>
          <div>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              showTimeSelect
              placeholderText="Select start date"
              dateFormat="Pp"
              timeIntervals={60}
              className='input bg-purple-100 border-1 border-black'
            />
          </div>
          <div>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              showTimeSelect
              placeholderText="Select end date"
              dateFormat="Pp"
              timeIntervals={60}
              className='input bg-purple-100 border-1 border-black'
            />
          </div>
        </div>
        <button onClick={handleSearch} className="btn text-xl bg-white text-black hover:text-white hover:bg-purple-500"><Search />Search Reservation</button>
      </div>
      <div className="flex flex-wrap py-10 px-10 md:px-20 justify-center items-center gap-3">
        {isLoading ? (
          <span className="loading loading-spinner loading-xl"></span>
        ) : reservations.length > 0 ? (
          reservations.map((reservation) => (
            <ReservationCard key={reservation.id} reservation={reservation} />
          ))
        ) : (
          <p>No reservations found.</p>
        )}
      </div>
      {isUserModalOpen && <CreateUserModal onClose={closeUserModal} />}
      {isReservationModalOpen && <CreateReservationModal onClose={closeReservationModal} />}
    </div>
  );
}

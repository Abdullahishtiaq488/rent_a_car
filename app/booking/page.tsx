'use client';

import { Suspense } from 'react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { BookingForm } from './BookingForm';

export default function BookingPage() {
    return (
        <div className="min-h-screen bg-gray-50" dir="rtl">
            <Navbar />
            <main className="pt-20">
                <Suspense fallback={
                    <div className="flex items-center justify-center min-h-[60vh]">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
                    </div>
                }>
                    <BookingForm />
                </Suspense>
            </main>
            <Footer />
        </div>
    );
} 
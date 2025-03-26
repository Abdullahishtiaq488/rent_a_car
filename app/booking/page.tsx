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
                {/* Hero Section */}
                <div className="relative h-[300px] overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: "url('/images/toyota-camry-2.jpg')",
                        }}
                    />
                    <div className="absolute inset-0 bg-blue-900/60"></div>
                    <div className="relative h-full flex flex-col items-center justify-center px-4 text-white z-10">
                        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center font-arabic">تأكيد الحجز</h1>
                        <p className="max-w-2xl text-center text-white/90 font-arabic">
                            مراجعة تفاصيل الحجز وإتمام عملية التأجير
                        </p>
                    </div>
                </div>

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
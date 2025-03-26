'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Car } from '../../types';
import { cars } from '../../data/cars';
import { locations } from '../../data/locations';
import { Check, Calendar, MapPin, Car as CarIcon, CreditCard, User, Phone, Mail, Shield } from 'lucide-react';
import Image from 'next/image';

export function BookingForm() {
    const searchParams = useSearchParams();

    const [bookingData, setBookingData] = useState({
        car: null as Car | null,
        location: '',
        locationName: '',
        startDate: '',
        endDate: '',
        totalDays: 0,
        totalPrice: 0,
        customerName: '',
        email: '',
        phone: '',
        paymentMethod: 'credit',
        termsAccepted: false
    });

    useEffect(() => {
        const carId = searchParams.get('carId');
        const startDate = searchParams.get('startDate');
        const endDate = searchParams.get('endDate');
        const location = searchParams.get('location');
        const totalDays = searchParams.get('totalDays');
        const totalPrice = searchParams.get('totalPrice');

        if (carId) {
            const car = cars.find(c => c.id === carId);
            if (car) {
                setBookingData(prev => ({
                    ...prev,
                    car,
                    startDate: startDate || '',
                    endDate: endDate || '',
                    location: location || '',
                    locationName: locations.find(l => l.id === location)?.name || '',
                    totalDays: parseInt(totalDays || '1'),
                    totalPrice: parseInt(totalPrice || '0')
                }));
            }
        }
    }, [searchParams]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        console.log('Booking submitted:', bookingData);
    };

    if (!bookingData.car) {
        return (
            <div className="container mx-auto px-4 py-12">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4 font-arabic">لم يتم العثور على بيانات الحجز</h1>
                    <p className="text-gray-600 mb-8 font-arabic">يرجى العودة إلى صفحة السيارات وإعادة محاولة الحجز</p>
                    <Link
                        href="/cars"
                        className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors font-arabic"
                    >
                        العودة إلى قائمة السيارات
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="p-6">
                        <h1 className="text-2xl font-bold text-gray-900 mb-6 font-arabic">تأكيد الحجز</h1>

                        {/* Car Details */}
                        <div className="flex items-center mb-6">
                            <div className="relative w-24 h-24 rounded-lg overflow-hidden">
                                <Image
                                    src={`/images/${bookingData.car.image}`}
                                    alt={bookingData.car.brand + ' ' + bookingData.car.model}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="mr-4">
                                <h2 className="text-xl font-semibold text-gray-900 font-arabic">
                                    {bookingData.car.brand} {bookingData.car.model}
                                </h2>
                                <p className="text-gray-600 font-arabic">{bookingData.car.category}</p>
                            </div>
                        </div>

                        {/* Booking Summary */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="flex items-center text-gray-600">
                                <Calendar className="w-5 h-5 ml-2" />
                                <span className="font-arabic">
                                    {bookingData.startDate} - {bookingData.endDate}
                                </span>
                            </div>
                            <div className="flex items-center text-gray-600">
                                <MapPin className="w-5 h-5 ml-2" />
                                <span className="font-arabic">{bookingData.locationName}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                                <CarIcon className="w-5 h-5 ml-2" />
                                <span className="font-arabic">{bookingData.totalDays} أيام</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                                <CreditCard className="w-5 h-5 ml-2" />
                                <span className="font-arabic">{bookingData.totalPrice} ريال</span>
                            </div>
                        </div>

                        {/* Booking Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 font-arabic">
                                        الاسم الكامل
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-arabic"
                                        value={bookingData.customerName}
                                        onChange={(e) => setBookingData(prev => ({ ...prev, customerName: e.target.value }))}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 font-arabic">
                                        البريد الإلكتروني
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-arabic"
                                        value={bookingData.email}
                                        onChange={(e) => setBookingData(prev => ({ ...prev, email: e.target.value }))}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 font-arabic">
                                        رقم الهاتف
                                    </label>
                                    <input
                                        type="tel"
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-arabic"
                                        value={bookingData.phone}
                                        onChange={(e) => setBookingData(prev => ({ ...prev, phone: e.target.value }))}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 font-arabic">
                                        طريقة الدفع
                                    </label>
                                    <select
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-arabic"
                                        value={bookingData.paymentMethod}
                                        onChange={(e) => setBookingData(prev => ({ ...prev, paymentMethod: e.target.value }))}
                                    >
                                        <option value="credit">بطاقة ائتمان</option>
                                        <option value="debit">بطاقة خصم</option>
                                        <option value="bank">تحويل بنكي</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    required
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    checked={bookingData.termsAccepted}
                                    onChange={(e) => setBookingData(prev => ({ ...prev, termsAccepted: e.target.checked }))}
                                />
                                <label className="mr-2 block text-sm text-gray-900 font-arabic">
                                    أوافق على الشروط والأحكام
                                </label>
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors font-arabic"
                                >
                                    تأكيد الحجز
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
} 
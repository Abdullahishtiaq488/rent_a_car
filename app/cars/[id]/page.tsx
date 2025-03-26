'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Navbar } from '../../../components/Navbar';
import { Footer } from '../../../components/Footer';
import { CarDetailsSlider } from '../../../components/CarDetailsSlider';
import { Car } from '../../../types';
import { cars } from '../../../data/cars';
import { locations } from '../../../data/locations';
import { CalendarIcon, Users, Fuel, Gauge, Check, Info, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function CarDetailsPage() {
    const params = useParams();
    const carId = params.id as string;

    const [car, setCar] = useState<Car | null>(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [location, setLocation] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [totalDays, setTotalDays] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        // Find the car by id
        const foundCar = cars.find(c => c.id === carId);
        if (foundCar) {
            setCar(foundCar);
            setTotalPrice(foundCar.pricePerDay);
        } else {
            setError('السيارة غير موجودة');
        }

        setLoading(false);
    }, [carId]);

    useEffect(() => {
        if (startDate && endDate && car) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            const diffTime = Math.abs(end.getTime() - start.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays <= 0) {
                setTotalDays(1);
                setTotalPrice(car.pricePerDay);
            } else {
                setTotalDays(diffDays);
                setTotalPrice(car.pricePerDay * diffDays);
            }
        }
    }, [startDate, endDate, car]);

    if (loading) {
        return (
            <main className="min-h-screen flex flex-col">
                <Navbar />
                <div className="pt-20 flex-grow flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
                </div>
                <Footer />
            </main>
        );
    }

    if (error || !car) {
        return (
            <main className="min-h-screen flex flex-col">
                <Navbar />
                <div className="pt-20 flex-grow flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-900 mb-4 font-arabic">{error || 'حدث خطأ'}</h1>
                        <p className="text-gray-600 mb-8 font-arabic">عذراً، لا يمكن العثور على السيارة المطلوبة</p>
                        <Link
                            href="/cars"
                            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors font-arabic"
                        >
                            العودة إلى قائمة السيارات
                        </Link>
                    </div>
                </div>
                <Footer />
            </main>
        );
    }

    const categoryLabels = {
        'economy': 'اقتصادية',
        'luxury': 'فاخرة',
        'suv': 'دفع رباعي',
        'sports': 'رياضية',
        'family': 'عائلية',
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Navigate to booking page with query params
        if (startDate && endDate && location) {
            window.location.href = `/booking?car=${car.id}&start=${startDate}&end=${endDate}&location=${location}&days=${totalDays}&price=${totalPrice}`;
        }
    };

    return (
        <main className="min-h-screen flex flex-col">
            <Navbar />

            <div className="pt-20 flex-grow">
                {/* Breadcrumbs */}
                <div className="bg-gray-100 py-3" dir="rtl">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center text-sm text-gray-600 font-arabic">
                            <Link href="/" className="hover:text-blue-600">الرئيسية</Link>
                            <span className="mx-2">/</span>
                            <Link href="/cars" className="hover:text-blue-600">السيارات</Link>
                            <span className="mx-2">/</span>
                            <span className="text-gray-900">{car.brand} {car.model}</span>
                        </div>
                    </div>
                </div>

                {/* Car Details */}
                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Car Images */}
                        <div className="lg:w-3/5">
                            <CarDetailsSlider images={car.images} carName={`${car.brand} ${car.model}`} />

                            {/* Car Specifications */}
                            <div className="mt-10 bg-white p-6 rounded-xl shadow-sm border border-gray-100" dir="rtl">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 font-arabic">مواصفات السيارة</h2>

                                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                    <div className="flex items-start">
                                        <div className="bg-blue-100 p-2 rounded-lg ml-3">
                                            <Users className="h-6 w-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 font-arabic">عدد المقاعد</p>
                                            <p className="font-medium font-arabic">{car.seats} مقاعد</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="bg-blue-100 p-2 rounded-lg ml-3">
                                            <Gauge className="h-6 w-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 font-arabic">ناقل الحركة</p>
                                            <p className="font-medium font-arabic">{car.transmission === 'automatic' ? 'أوتوماتيك' : 'عادي'}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="bg-blue-100 p-2 rounded-lg ml-3">
                                            <Fuel className="h-6 w-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 font-arabic">نوع الوقود</p>
                                            <p className="font-medium font-arabic">
                                                {car.fuelType === 'petrol' ? 'بنزين' :
                                                    car.fuelType === 'diesel' ? 'ديزل' :
                                                        car.fuelType === 'electric' ? 'كهرباء' : 'هجين'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="bg-blue-100 p-2 rounded-lg ml-3">
                                            <Info className="h-6 w-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 font-arabic">الموديل</p>
                                            <p className="font-medium font-arabic">{car.year}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="bg-blue-100 p-2 rounded-lg ml-3">
                                            <Info className="h-6 w-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 font-arabic">اللون</p>
                                            <p className="font-medium font-arabic">{car.color}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="bg-blue-100 p-2 rounded-lg ml-3">
                                            <Info className="h-6 w-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 font-arabic">الفئة</p>
                                            <p className="font-medium font-arabic">{categoryLabels[car.category]}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Features */}
                                <div className="mt-8">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4 font-arabic">الميزات</h3>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                        {car.features.map((feature, index) => (
                                            <div key={index} className="flex items-center">
                                                <Check className="h-5 w-5 text-green-500 ml-2" />
                                                <span className="text-gray-700 font-arabic">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Booking Form */}
                        <div className="lg:w-2/5">
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24" dir="rtl">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h1 className="text-2xl font-bold text-gray-900 mb-1 font-arabic">{car.brand} {car.model}</h1>
                                        <div className="flex items-center">
                                            <div className="flex" dir="ltr">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <svg
                                                        key={star}
                                                        className={`w-4 h-4 ${star <= Math.round(car.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                                        aria-hidden="true"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="currentColor"
                                                        viewBox="0 0 22 20"
                                                    >
                                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                    </svg>
                                                ))}
                                            </div>
                                            <p className="mr-1 text-sm text-gray-500 font-arabic">{car.rating} / 5</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-bold text-blue-600 font-arabic">{car.pricePerDay} ريال</p>
                                        <p className="text-sm text-gray-500 font-arabic">لليوم الواحد</p>
                                    </div>
                                </div>

                                {!car.availability ? (
                                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                                        <p className="text-red-600 font-arabic text-center">عذراً، هذه السيارة غير متاحة حالياً للحجز</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit}>
                                        <div className="space-y-4 mb-6">
                                            {/* Pickup Date */}
                                            <div>
                                                <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 mb-1">
                                                    تاريخ الاستلام
                                                </label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                        <CalendarIcon className="h-5 w-5 text-gray-400" />
                                                    </div>
                                                    <input
                                                        type="date"
                                                        id="start-date"
                                                        min={new Date().toISOString().split('T')[0]}
                                                        value={startDate}
                                                        onChange={(e) => setStartDate(e.target.value)}
                                                        className="block w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-right"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            {/* Return Date */}
                                            <div>
                                                <label htmlFor="end-date" className="block text-sm font-medium text-gray-700 mb-1">
                                                    تاريخ الإرجاع
                                                </label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                        <CalendarIcon className="h-5 w-5 text-gray-400" />
                                                    </div>
                                                    <input
                                                        type="date"
                                                        id="end-date"
                                                        min={startDate || new Date().toISOString().split('T')[0]}
                                                        value={endDate}
                                                        onChange={(e) => setEndDate(e.target.value)}
                                                        className="block w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-right"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            {/* Pickup Location */}
                                            <div>
                                                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                                                    موقع الاستلام
                                                </label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                        <MapPin className="h-5 w-5 text-gray-400" />
                                                    </div>
                                                    <select
                                                        id="location"
                                                        value={location}
                                                        onChange={(e) => setLocation(e.target.value)}
                                                        className="block w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-right"
                                                        required
                                                    >
                                                        <option value="">اختر موقع الاستلام</option>
                                                        {locations.map((loc) => (
                                                            <option key={loc.id} value={loc.id}>
                                                                {loc.name}، {loc.city}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Price Summary */}
                                        {startDate && endDate && (
                                            <div className="bg-gray-50 p-4 rounded-lg mb-6">
                                                <h3 className="text-lg font-semibold text-gray-900 mb-3 font-arabic">ملخص السعر</h3>

                                                <div className="space-y-2 font-arabic">
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">{car.pricePerDay} ريال × {totalDays} يوم</span>
                                                        <span className="font-medium">{car.pricePerDay * totalDays} ريال</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">رسوم الخدمة</span>
                                                        <span className="font-medium">0 ريال</span>
                                                    </div>
                                                    <div className="border-t border-gray-200 pt-2 mt-2">
                                                        <div className="flex justify-between font-bold">
                                                            <span>المجموع</span>
                                                            <span>{totalPrice} ريال</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Submit Button */}
                                        <button
                                            type="submit"
                                            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors font-arabic"
                                            disabled={!car.availability}
                                        >
                                            حجز الآن
                                        </button>
                                    </form>
                                )}

                                {/* Policy Notes */}
                                <div className="mt-6 text-sm text-gray-600 space-y-2 font-arabic">
                                    <p className="flex items-start">
                                        <Check className="h-4 w-4 text-green-500 ml-2 mt-0.5 flex-shrink-0" />
                                        <span>إلغاء مجاني قبل 24 ساعة من موعد الاستلام</span>
                                    </p>
                                    <p className="flex items-start">
                                        <Check className="h-4 w-4 text-green-500 ml-2 mt-0.5 flex-shrink-0" />
                                        <span>مطلوب تأمين قابل للاسترداد</span>
                                    </p>
                                    <p className="flex items-start">
                                        <Check className="h-4 w-4 text-green-500 ml-2 mt-0.5 flex-shrink-0" />
                                        <span>يجب أن يكون عمر السائق 21 عامًا على الأقل</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
} 
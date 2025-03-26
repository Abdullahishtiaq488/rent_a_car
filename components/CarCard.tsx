'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Car } from '../types';
import { Calendar, Users, Fuel, Gauge, Star } from 'lucide-react';

interface CarCardProps {
    car: Car;
}

export const CarCard = ({ car }: CarCardProps) => {
    const [isHovered, setIsHovered] = useState(false);

    const categoryLabels = {
        'economy': 'اقتصادية',
        'luxury': 'فاخرة',
        'suv': 'دفع رباعي',
        'sports': 'رياضية',
        'family': 'عائلية',
    };

    return (
        <div
            className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Image Container with Overlay */}
            <div className="relative h-52 w-full bg-gray-100">
                <Image
                    src={car.images[0] || '/images/car-placeholder.jpg'}
                    alt={`${car.brand} ${car.model}`}
                    fill
                    priority
                    style={{ objectFit: 'cover' }}
                    className={`transition-all duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Category Badge */}
                <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full font-arabic shadow-md">
                    {categoryLabels[car.category]}
                </div>

                {/* Availability Badge */}
                <div className={`absolute top-4 left-4 ${car.availability ? 'bg-green-500' : 'bg-red-500'} text-white text-xs font-bold px-3 py-1 rounded-full font-arabic shadow-md`}>
                    {car.availability ? 'متوفرة' : 'غير متوفرة'}
                </div>

                {/* Overlay on Hover */}
                <div
                    className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                />
            </div>

            {/* Car Info */}
            <div className="p-5 font-arabic" dir="rtl">
                <div className="flex justify-between items-start mb-3">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{car.brand} {car.model}</h3>
                        <p className="text-sm text-gray-600">موديل {car.year}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xl font-bold text-blue-600">{car.pricePerDay} ريال</p>
                        <p className="text-xs text-gray-500">لليوم الواحد</p>
                    </div>
                </div>

                {/* Rating */}
                <div className="flex items-center mb-4 bg-gray-50 rounded-lg p-2" dir="ltr">
                    <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                className={`w-4 h-4 ${star <= Math.round(car.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                                size={16}
                            />
                        ))}
                    </div>
                    <p className="ml-1 text-sm text-gray-700 font-medium">{car.rating} / 5</p>
                </div>

                {/* Car Features */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center text-gray-700 text-sm bg-gray-50 p-2 rounded-lg">
                        <Users className="h-4 w-4 ml-2 text-blue-500" />
                        <span>{car.seats} مقاعد</span>
                    </div>
                    <div className="flex items-center text-gray-700 text-sm bg-gray-50 p-2 rounded-lg">
                        <Gauge className="h-4 w-4 ml-2 text-blue-500" />
                        <span>{car.transmission === 'automatic' ? 'أوتوماتيك' : 'عادي'}</span>
                    </div>
                    <div className="flex items-center text-gray-700 text-sm bg-gray-50 p-2 rounded-lg">
                        <Fuel className="h-4 w-4 ml-2 text-blue-500" />
                        <span>
                            {car.fuelType === 'petrol' ? 'بنزين' :
                                car.fuelType === 'diesel' ? 'ديزل' :
                                    car.fuelType === 'electric' ? 'كهرباء' : 'هجين'}
                        </span>
                    </div>
                    <div className="flex items-center text-gray-700 text-sm bg-gray-50 p-2 rounded-lg">
                        <Calendar className="h-4 w-4 ml-2 text-blue-500" />
                        <span>حجز فوري</span>
                    </div>
                </div>

                {/* Action Button */}
                <Link href={`/cars/${car.id}`} className="block w-full">
                    <button
                        className={`w-full py-2.5 rounded-lg font-medium transition-all duration-300 font-arabic text-center ${car.availability
                            ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-blue-300/50'
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
                        disabled={!car.availability}
                    >
                        {car.availability ? 'حجز الآن' : 'غير متوفرة'}
                    </button>
                </Link>
            </div>
        </div>
    );
};
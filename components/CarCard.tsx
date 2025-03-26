'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Car } from '../types';
import { Calendar, Users, Fuel, Gauge } from 'lucide-react';

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
            className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Image Container with Overlay */}
            <div className="relative h-48 w-full bg-white">
                <Image
                    src={car.images[0] || '/images/car-placeholder.jpg'}
                    alt={`${car.brand} ${car.model}`}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="bg-white transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Category Badge */}
                <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full font-arabic">
                    {categoryLabels[car.category]}
                </div>

                {/* Availability Badge */}
                <div className={`absolute top-4 left-4 ${car.availability ? 'bg-green-500' : 'bg-red-500'} text-white text-xs font-bold px-3 py-1 rounded-full font-arabic`}>
                    {car.availability ? 'متوفرة' : 'غير متوفرة'}
                </div>

                {/* Overlay on Hover */}
                <div
                    className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                />
            </div>

            {/* Car Info */}
            <div className="p-5 font-arabic" dir="rtl">
                <div className="flex justify-between items-start mb-3">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{car.brand} {car.model}</h3>
                        <p className="text-sm text-gray-600">موديل {car.year}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xl font-bold text-blue-600">{car.pricePerDay} ريال</p>
                        <p className="text-xs text-gray-500">لليوم الواحد</p>
                    </div>
                </div>

                {/* Car Features */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center text-gray-700 text-sm">
                        <Users className="h-4 w-4 ml-2" />
                        <span>{car.seats} مقاعد</span>
                    </div>
                    <div className="flex items-center text-gray-700 text-sm">
                        <Gauge className="h-4 w-4 ml-2" />
                        <span>{car.transmission === 'automatic' ? 'أوتوماتيك' : 'عادي'}</span>
                    </div>
                    <div className="flex items-center text-gray-700 text-sm">
                        <Fuel className="h-4 w-4 ml-2" />
                        <span>
                            {car.fuelType === 'petrol' ? 'بنزين' :
                                car.fuelType === 'diesel' ? 'ديزل' :
                                    car.fuelType === 'electric' ? 'كهرباء' : 'هجين'}
                        </span>
                    </div>
                    <div className="flex items-center text-gray-700 text-sm">
                        <Calendar className="h-4 w-4 ml-2" />
                        <span>حجز فوري</span>
                    </div>
                </div>

                {/* Rating */}
                <div className="flex items-center mb-4" dir="ltr">
                    <div className="flex">
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
                    <p className="ml-1 text-sm text-gray-500">{car.rating} / 5</p>
                </div>

                {/* Action Button */}
                <Link href={`/cars/${car.id}`} className="block w-full">
                    <button
                        className={`w-full py-2 rounded-md font-medium transition-colors font-arabic text-center ${car.availability
                            ? 'bg-blue-600 hover:bg-blue-700 text-white'
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
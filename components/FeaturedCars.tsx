'use client';

import { useState } from 'react';
import { CarCard } from './CarCard';
import { Car } from '../types';
import { cars } from '../data/cars';
import Link from 'next/link';

export const FeaturedCars = () => {
    const [activeCategory, setActiveCategory] = useState<string>('all');

    const categories = [
        { id: 'all', label: 'جميع السيارات' },
        { id: 'luxury', label: 'سيارات فاخرة' },
        { id: 'economy', label: 'سيارات اقتصادية' },
        { id: 'suv', label: 'دفع رباعي' },
    ];

    const filteredCars = activeCategory === 'all'
        ? cars.slice(0, 6)
        : cars.filter(car => car.category === activeCategory).slice(0, 6);

    return (
        <section className="py-16 bg-gray-50" dir="rtl">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <span className="inline-block text-blue-600 font-semibold mb-2 font-arabic">سيارات مميزة</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-arabic">اختر سيارتك المفضلة</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto font-arabic">
                        اكتشف تشكيلتنا المميزة من السيارات عالية الجودة بأسعار تنافسية. نوفر لك أفضل السيارات للإيجار لتناسب احتياجاتك.
                    </p>
                </div>

                {/* Category Tabs */}
                <div className="flex flex-wrap justify-center mb-10 font-arabic">
                    <div className="inline-flex bg-white rounded-full p-1 shadow-sm mb-6">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
                                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === category.id
                                        ? 'bg-blue-600 text-white'
                                        : 'text-gray-700 hover:text-blue-600'
                                    }`}
                            >
                                {category.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Cars Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCars.map((car) => (
                        <CarCard key={car.id} car={car} />
                    ))}
                </div>

                {/* View All Button */}
                <div className="text-center mt-12">
                    <Link
                        href="/cars"
                        className="inline-block px-8 py-3 bg-white border border-blue-600 text-blue-600 font-medium rounded-md hover:bg-blue-50 transition-colors font-arabic"
                    >
                        عرض جميع السيارات
                    </Link>
                </div>
            </div>
        </section>
    );
}; 
'use client';

import { useState } from 'react';
import { CalendarIcon, MapPinIcon, Car } from 'lucide-react';

export const Hero = () => {
    const [pickupDate, setPickupDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [location, setLocation] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle search logic here
        console.log({ pickupDate, returnDate, location });
    };

    return (
        <div className="relative min-h-[600px] flex items-center font-arabic overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-black/40 z-10"
                    style={{
                        backgroundImage: `url('/images/hero-background.jpg')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'blur(0px)',
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-black/50 z-20" />
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 z-30 mt-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <div className="text-right" dir="rtl">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
                            استأجر <span className="text-blue-400">أفضل السيارات</span> بأفضل الأسعار
                        </h1>
                        <p className="text-lg text-gray-200 mb-8 max-w-xl mr-auto">
                            اكتشف تشكيلتنا الواسعة من السيارات الفاخرة والاقتصادية. رحلتك تبدأ معنا بسهولة وأمان وبأسعار تنافسية.
                        </p>

                        <div className="flex gap-4 mb-6">
                            <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg text-white">
                                <Car className="h-5 w-5 ml-2 text-blue-400" />
                                <span>+100 سيارة متنوعة</span>
                            </div>
                            <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg text-white">
                                <MapPinIcon className="h-5 w-5 ml-2 text-blue-400" />
                                <span>+10 مواقع للاستلام</span>
                            </div>
                        </div>
                    </div>

                    {/* Search Form */}
                    <div>
                        <div className="bg-white rounded-xl shadow-xl p-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-right" dir="rtl">ابحث عن سيارتك</h2>

                            <form onSubmit={handleSearch} dir="rtl">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    {/* Pickup Date */}
                                    <div>
                                        <label htmlFor="pickup-date" className="block text-sm font-medium text-gray-700 mb-1 text-right">
                                            تاريخ الاستلام
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                <CalendarIcon className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type="date"
                                                id="pickup-date"
                                                value={pickupDate}
                                                onChange={(e) => setPickupDate(e.target.value)}
                                                className="block w-full rounded-md border-gray-300 py-3 pr-10 text-right shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Return Date */}
                                    <div>
                                        <label htmlFor="return-date" className="block text-sm font-medium text-gray-700 mb-1 text-right">
                                            تاريخ الإرجاع
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                <CalendarIcon className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type="date"
                                                id="return-date"
                                                value={returnDate}
                                                onChange={(e) => setReturnDate(e.target.value)}
                                                className="block w-full rounded-md border-gray-300 py-3 pr-10 text-right shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="mb-6">
                                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1 text-right">
                                        موقع الاستلام
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                            <MapPinIcon className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <select
                                            id="location"
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                            className="block w-full rounded-md border-gray-300 py-3 pr-10 text-right shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            required
                                        >
                                            <option value="">اختر موقع الاستلام</option>
                                            <option value="riyadh-main">فرع الرياض الرئيسي</option>
                                            <option value="jeddah">فرع جدة</option>
                                            <option value="dammam">فرع الدمام</option>
                                            <option value="riyadh-airport">مطار الملك خالد الدولي</option>
                                            <option value="jeddah-airport">مطار الملك عبدالعزيز الدولي</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Search Button */}
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition-colors"
                                >
                                    البحث عن السيارات المتاحة
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Wave Decoration */}
            <div className="absolute bottom-0 left-0 right-0 z-10">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
                    <path
                        fill="#ffffff"
                        fillOpacity="1"
                        d="M0,160L48,170.7C96,181,192,203,288,202.7C384,203,480,181,576,186.7C672,192,768,224,864,224C960,224,1056,192,1152,176C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                    ></path>
                </svg>
            </div>
        </div>
    );
}; 
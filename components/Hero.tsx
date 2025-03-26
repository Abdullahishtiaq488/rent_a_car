'use client';

import { useState } from 'react';
import { CalendarIcon, MapPinIcon, Car } from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export const Hero = () => {
    const [pickupDate, setPickupDate] = useState<Date | null>(null);
    const [returnDate, setReturnDate] = useState<Date | null>(null);
    const [location, setLocation] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle search logic here
        console.log({ pickupDate, returnDate, location });
    };

    return (
        <div className="relative min-h-[700px] flex items-center font-arabic overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-black/60 z-10"
                    style={{
                        backgroundImage: `url('/images/hero-image2.jpg')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'brightness(0.7)',
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-black/70 z-20" />
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 z-30 mt-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Text Content */}
                    <div className="text-right" dir="rtl">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 drop-shadow-lg">
                            استأجر <span className="text-blue-400 animate-pulse">أفضل السيارات</span> بأفضل الأسعار
                        </h1>
                        <p className="text-lg text-gray-100 mb-10 max-w-xl mr-auto leading-relaxed">
                            اكتشف تشكيلتنا الواسعة من السيارات الفاخرة والاقتصادية. رحلتك تبدأ معنا بسهولة وأمان وبأسعار تنافسية.
                        </p>

                        <div className="flex gap-6 mb-8">
                            <div className="flex items-center bg-white/20 backdrop-blur-lg px-6 py-3 rounded-xl text-white shadow-lg hover:bg-white/25 transition-all duration-300">
                                <Car className="h-6 w-6 ml-3 text-blue-400" />
                                <span className="text-lg">+100 سيارة متنوعة</span>
                            </div>
                            <div className="flex items-center bg-white/20 backdrop-blur-lg px-6 py-3 rounded-xl text-white shadow-lg hover:bg-white/25 transition-all duration-300">
                                <MapPinIcon className="h-6 w-6 ml-3 text-blue-400" />
                                <span className="text-lg">+10 مواقع للاستلام</span>
                            </div>
                        </div>
                    </div>

                    {/* Search Form */}
                    <div>
                        <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-8 hover:shadow-blue-500/10 transition-all duration-300">
                            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-right" dir="rtl">ابحث عن سيارتك</h2>

                            <form onSubmit={handleSearch} dir="rtl">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    {/* Pickup Date */}
                                    <div>
                                        <label htmlFor="pickup-date" className="block text-sm font-semibold text-gray-700 mb-2 text-right">
                                            تاريخ الاستلام
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                                                <CalendarIcon className="h-5 w-5 text-blue-500" />
                                            </div>
                                            <DatePicker
                                                selected={pickupDate}
                                                onChange={(date) => setPickupDate(date)}
                                                dateFormat="dd/MM/yyyy"
                                                minDate={new Date()}
                                                placeholderText="اختر تاريخ الاستلام"
                                                className="block w-full rounded-xl border-gray-200 py-3.5 pr-12 text-right shadow-sm focus:border-blue-500 focus:ring-blue-500 hover:border-blue-400 transition-colors"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Return Date */}
                                    <div>
                                        <label htmlFor="return-date" className="block text-sm font-semibold text-gray-700 mb-2 text-right">
                                            تاريخ الإرجاع
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                                                <CalendarIcon className="h-5 w-5 text-blue-500" />
                                            </div>
                                            <DatePicker
                                                selected={returnDate}
                                                onChange={(date) => setReturnDate(date)}
                                                dateFormat="dd/MM/yyyy"
                                                minDate={pickupDate || new Date()}
                                                placeholderText="اختر تاريخ الإرجاع"
                                                className="block w-full rounded-xl border-gray-200 py-3.5 pr-12 text-right shadow-sm focus:border-blue-500 focus:ring-blue-500 hover:border-blue-400 transition-colors"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="mb-8">
                                    <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-2 text-right">
                                        موقع الاستلام
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                                            <MapPinIcon className="h-5 w-5 text-blue-500" />
                                        </div>
                                        <select
                                            id="location"
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                            className="block w-full rounded-xl border-gray-200 py-3.5 pr-12 text-right shadow-sm focus:border-blue-500 focus:ring-blue-500 hover:border-blue-400 transition-colors"
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
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg"
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
                        fill="#f3f4f6"
                        fillOpacity="1"
                        d="M0,160L48,170.7C96,181,192,203,288,202.7C384,203,480,181,576,186.7C672,192,768,224,864,224C960,224,1056,192,1152,176C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                    ></path>
                </svg>
            </div>
        </div>
    );
};
'use client';

import { useState } from 'react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { Phone, MapPin, Clock, Search } from 'lucide-react';
import { locations } from '../../data/locations';

export default function LocationsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCity, setSelectedCity] = useState('all');

    // Ensure locations data is available
    const locationsData = locations || [];

    // Get unique cities
    const cities = [...new Set(locationsData.map(location => location.city))].sort();

    // Filter locations based on search term and selected city
    const filteredLocations = locationsData.filter(location => {
        const matchesSearch = searchTerm === '' ||
            location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
            location.address.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCity = selectedCity === 'all' || location.city === selectedCity;

        return matchesSearch && matchesCity;
    });

    // Group locations by city for better organization
    const locationsByCity = filteredLocations.reduce((acc, location) => {
        if (!acc[location.city]) {
            acc[location.city] = [];
        }
        acc[location.city].push(location);
        return acc;
    }, {} as Record<string, typeof locationsData>);

    return (
        <main className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />

            <div className="pt-20 flex-grow">
                {/* Hero Section */}
                <section className="bg-gradient-to-b from-blue-50 to-white">
                    <div className="container mx-auto px-4 py-16 md:py-24">
                        <div className="text-center max-w-3xl mx-auto">
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-arabic">مواقع فروعنا</h1>
                            <p className="text-lg md:text-xl text-gray-700 font-arabic leading-relaxed">
                                نتواجد في مختلف مدن المملكة العربية السعودية لنكون دائماً بالقرب منك. ابحث عن الفرع الأقرب إليك من خلال الخريطة أدناه.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Search and Filter */}
                <section className="py-8 bg-white shadow-md sticky top-20 z-10" dir="rtl">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col md:flex-row gap-6 max-w-4xl mx-auto">
                            {/* Search */}
                            <div className="md:w-1/2">
                                <div className="relative">
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                                        <Search className="h-5 w-5 text-blue-500" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="ابحث عن موقع..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="block w-full pr-12 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right shadow-sm transition-all"
                                        aria-label="البحث عن موقع"
                                    />
                                </div>
                            </div>

                            {/* City Filter */}
                            <div className="md:w-1/2">
                                <div className="relative">
                                    <select
                                        value={selectedCity}
                                        onChange={(e) => setSelectedCity(e.target.value)}
                                        className="block w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right shadow-sm transition-all"
                                        aria-label="تصفية حسب المدينة"
                                    >
                                        <option value="all">جميع المدن</option>
                                        {cities.map((city) => (
                                            <option key={city} value={city}>
                                                {city}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                        <MapPin className="h-5 w-5 text-blue-500" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Locations List */}
                <section className="py-16" dir="rtl">
                    <div className="container mx-auto px-4">
                        {Object.keys(locationsByCity).length > 0 ? (
                            Object.entries(locationsByCity).map(([city, cityLocations]) => (
                                <div key={city} className="mb-16 last:mb-0">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-8 font-arabic border-r-4 border-blue-600 pr-4 pb-2">
                                        {city}
                                    </h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {cityLocations.map((location) => (
                                            <div
                                                key={location.id}
                                                className={`bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${
                                                    location.isMainBranch 
                                                        ? 'border-2 border-blue-500 bg-blue-50/30' 
                                                        : 'border border-gray-200'
                                                }`}
                                            >
                                                {location.isMainBranch && (
                                                    <div className="bg-blue-600 text-white text-xs font-bold uppercase py-1.5 px-3 rounded-full inline-block mb-4 font-arabic shadow-sm">
                                                        فرع رئيسي
                                                    </div>
                                                )}

                                                <h3 className="text-xl font-bold text-gray-900 mb-4 font-arabic">{location.name}</h3>

                                                <div className="space-y-4 mb-5">
                                                    <div className="flex items-start">
                                                        <MapPin className="h-5 w-5 text-blue-600 mt-1 ml-3 flex-shrink-0" />
                                                        <span className="text-gray-700 font-arabic">
                                                            {location.address}
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center">
                                                        <Phone className="h-5 w-5 text-blue-600 ml-3 flex-shrink-0" />
                                                        <a 
                                                            href={`tel:${location.phone}`} 
                                                            className="text-gray-700 hover:text-blue-600 transition-colors"
                                                        >
                                                            {location.phone}
                                                        </a>
                                                    </div>

                                                    <div className="flex items-center">
                                                        <Clock className="h-5 w-5 text-blue-600 ml-3 flex-shrink-0" />
                                                        <span className="text-gray-700 font-arabic">
                                                            {location.openingHours}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="flex flex-wrap gap-2 mt-4">
                                                    {location.services && location.services.map((service, idx) => (
                                                        <span
                                                            key={idx}
                                                            className="bg-gray-100 text-gray-800 text-xs py-1.5 px-3 rounded-full font-arabic"
                                                        >
                                                            {service}
                                                        </span>
                                                    ))}
                                                </div>

                                                <div className="mt-5 pt-4 border-t border-gray-200">
                                                    <a
                                                        href={location.mapUrl || `https://maps.google.com/?q=${encodeURIComponent(location.address + ', ' + location.city)}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium font-arabic transition-colors"
                                                    >
                                                        عرض على الخريطة
                                                        <MapPin className="h-4 w-4 mr-1" />
                                                    </a>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-16 bg-white rounded-xl shadow-sm my-8">
                                <div className="inline-flex justify-center items-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                                    <Search className="h-8 w-8 text-blue-600" />
                                </div>
                                <p className="text-xl text-gray-700 font-arabic mb-6">لم يتم العثور على أي فروع مطابقة لبحثك</p>
                                <button
                                    onClick={() => {
                                        setSearchTerm('');
                                        setSelectedCity('all');
                                    }}
                                    className="mt-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-arabic transition-colors shadow-md"
                                >
                                    عرض جميع الفروع
                                </button>
                            </div>
                        )}
                    </div>
                </section>

                {/* Map Section */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto text-center mb-10">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-arabic">تواجدنا على الخريطة</h2>
                            <p className="text-lg text-gray-600 font-arabic">
                                استكشف فروعنا على الخريطة التفاعلية للعثور على الموقع الأقرب إليك
                            </p>
                        </div>

                        <div className="relative h-[500px] w-full rounded-xl overflow-hidden shadow-xl">
                            {/* Embed Google Maps or any map service here */}
                            <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                                <p className="text-center text-gray-600 font-arabic px-4 text-lg">
                                    خريطة تفاعلية تعرض جميع مواقع فروعنا في المملكة العربية السعودية
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 bg-gradient-to-r from-blue-700 to-blue-600">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto text-center">
                            <h2 className="text-3xl font-bold text-white mb-6 font-arabic">هل أنت جاهز لاستئجار سيارتك؟</h2>
                            <p className="text-xl text-blue-100 mb-8 font-arabic leading-relaxed">
                                زر أقرب فرع إليك أو احجز سيارتك أونلاين الآن واستمتع بتجربة قيادة لا مثيل لها
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a
                                    href="/cars"
                                    className="inline-flex justify-center items-center px-8 py-4 bg-white hover:bg-gray-100 text-blue-700 font-bold rounded-lg transition-all shadow-md hover:shadow-lg font-arabic text-lg"
                                >
                                    استكشف السيارات
                                </a>
                                <a
                                    href="/contact"
                                    className="inline-flex justify-center items-center px-8 py-4 bg-blue-800 hover:bg-blue-900 text-white font-bold rounded-lg transition-all shadow-md hover:shadow-lg border border-blue-500 font-arabic text-lg"
                                >
                                    تواصل معنا
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <Footer />
        </main>
    );
}
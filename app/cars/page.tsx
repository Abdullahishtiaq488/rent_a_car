'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { CarCard } from '../../components/CarCard';
import { Car, CarCategory } from '../../types';
import { cars } from '../../data/cars';
import { Filter, Search, ChevronDown, ChevronUp, LayoutGrid, LayoutList } from 'lucide-react';

export default function CarsPage() {
    const [filteredCars, setFilteredCars] = useState<Car[]>(cars);
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);
    const [gridView, setGridView] = useState(true);
    const [filters, setFilters] = useState({
        category: '' as CarCategory | '',
        priceMin: 0,
        priceMax: 500,
        searchTerm: '',
        availability: false,
    });

    // Calculate max price for range slider
    const maxPrice = Math.max(...cars.map(car => car.pricePerDay));

    // Handle filter changes
    const handleFilterChange = (
        filterName: keyof typeof filters,
        value: string | number | boolean
    ) => {
        setFilters(prev => ({
            ...prev,
            [filterName]: value,
        }));
    };

    // Apply filters
    useEffect(() => {
        const applyFilters = () => {
            let result = [...cars];

            // Filter by category
            if (filters.category) {
                result = result.filter(car => car.category === filters.category);
            }

            // Filter by price range
            result = result.filter(
                car => car.pricePerDay >= filters.priceMin && car.pricePerDay <= filters.priceMax
            );

            // Filter by search term
            if (filters.searchTerm) {
                const searchLower = filters.searchTerm.toLowerCase();
                result = result.filter(
                    car =>
                        car.brand.toLowerCase().includes(searchLower) ||
                        car.model.toLowerCase().includes(searchLower)
                );
            }

            // Filter by availability
            if (filters.availability) {
                result = result.filter(car => car.availability === true);
            }

            setFilteredCars(result);
        };

        applyFilters();
    }, [filters]);

    return (
        <main className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />

            <div className="pt-20 flex-grow">
                {/* Hero Banner */}
                <div className="relative h-[250px] md:h-[300px] bg-gradient-to-r from-blue-700 to-blue-500 overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-20"
                        style={{
                            backgroundImage: "url('/images/hero-background.jpg')",
                        }}
                    />
                    <div className="relative h-full flex flex-col items-center justify-center px-4 text-white z-10">
                        <h1 className="text-3xl md:text-5xl font-bold mb-4 text-center font-arabic">استكشف تشكيلة سياراتنا</h1>
                        <p className="max-w-2xl text-center text-white/90 font-arabic text-lg">
                            اختر من بين مجموعة واسعة من السيارات الفاخرة والاقتصادية لتناسب احتياجاتك
                        </p>
                    </div>
                </div>

                {/* Main Content */}
                <div className="container mx-auto px-4 py-10 max-w-7xl">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Filters (Mobile) */}
                        <div className="lg:hidden mb-6">
                            <button
                                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                                className="w-full flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-200 transition-all hover:shadow-md"
                            >
                                <div className="flex items-center font-arabic">
                                    <Filter className="w-5 h-5 ml-2" />
                                    <span>فلترة النتائج</span>
                                </div>
                                {isFiltersOpen ? (
                                    <ChevronUp className="w-5 h-5" />
                                ) : (
                                    <ChevronDown className="w-5 h-5" />
                                )}
                            </button>

                            {isFiltersOpen && (
                                <div className="mt-4 bg-white p-6 rounded-lg shadow-sm border border-gray-200 animate-fadeIn">
                                    {/* Mobile Filters Content */}
                                    <FilterContent
                                        filters={filters}
                                        handleFilterChange={handleFilterChange}
                                        maxPrice={maxPrice}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Sidebar Filters (Desktop) */}
                        <div className="hidden lg:block w-80 flex-shrink-0">
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-24">
                                <h2 className="text-xl font-bold mb-6 font-arabic text-right">فلترة النتائج</h2>

                                <FilterContent
                                    filters={filters}
                                    handleFilterChange={handleFilterChange}
                                    maxPrice={maxPrice}
                                />
                            </div>
                        </div>

                        {/* Cars Listing */}
                        <div className="flex-grow">
                            {/* Search and View Controls */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-sm">
                                <div className="relative w-full sm:w-auto flex-grow max-w-md">
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                        <Search className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="ابحث عن السيارة..."
                                        value={filters.searchTerm}
                                        onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                                        className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 font-arabic text-right transition-all"
                                    />
                                </div>

                                <div className="flex items-center gap-4 self-end">
                                    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                                        <button
                                            onClick={() => setGridView(true)}
                                            className={`p-2.5 transition-colors ${gridView ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                                            aria-label="عرض شبكي"
                                        >
                                            <LayoutGrid className="h-5 w-5" />
                                        </button>
                                        <button
                                            onClick={() => setGridView(false)}
                                            className={`p-2.5 transition-colors ${!gridView ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                                            aria-label="عرض قائمة"
                                        >
                                            <LayoutList className="h-5 w-5" />
                                        </button>
                                    </div>

                                    <div className="text-sm text-gray-500 font-arabic bg-gray-100 px-3 py-1.5 rounded-full">
                                        {filteredCars.length} سيارة
                                    </div>
                                </div>
                            </div>

                            {/* Results Count */}
                            <div className="mb-6 bg-white p-4 rounded-lg shadow-sm" dir="rtl">
                                <h2 className="text-2xl font-bold text-gray-900 font-arabic">سياراتنا المتاحة</h2>
                                {filteredCars.length === 0 && (
                                    <p className="mt-4 text-center py-12 text-gray-500 bg-gray-50 rounded-lg font-arabic">
                                        لم يتم العثور على سيارات تطابق معايير البحث
                                    </p>
                                )}
                            </div>

                            {/* Car Cards */}
                            {gridView ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {filteredCars.map((car) => (
                                        <CarCard key={car.id} car={car} />
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {filteredCars.map((car) => (
                                        <CarListItem key={car.id} car={car} />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}

interface FilterContentProps {
    filters: {
        category: CarCategory | '';
        priceMin: number;
        priceMax: number;
        searchTerm: string;
        availability: boolean;
    };
    handleFilterChange: (
        filterName: keyof typeof filters,
        value: string | number | boolean
    ) => void;
    maxPrice: number;
}

const FilterContent = ({ filters, handleFilterChange, maxPrice }: FilterContentProps) => {
    const categoryOptions = [
        { value: '', label: 'جميع الفئات' },
        { value: 'economy', label: 'اقتصادية' },
        { value: 'luxury', label: 'فاخرة' },
        { value: 'suv', label: 'دفع رباعي' },
        { value: 'sports', label: 'رياضية' },
        { value: 'family', label: 'عائلية' },
    ];

    return (
        <div className="space-y-6 font-arabic" dir="rtl">
            {/* Category Filter */}
            <div>
                <h3 className="text-lg font-medium mb-3">فئة السيارة</h3>
                <div className="space-y-2">
                    {categoryOptions.map((option) => (
                        <label key={option.value} className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors">
                            <input
                                type="radio"
                                name="category"
                                value={option.value}
                                checked={filters.category === option.value}
                                onChange={(e) => handleFilterChange('category', e.target.value as CarCategory | '')}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="mr-2 text-gray-700">{option.label}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Price Range Filter */}
            <div>
                <h3 className="text-lg font-medium mb-3">السعر (ريال / يوم)</h3>
                <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                        <span>{filters.priceMax} ريال</span>
                        <span>{filters.priceMin} ريال</span>
                    </div>
                    <input
                        type="range"
                        min={0}
                        max={maxPrice}
                        value={filters.priceMax}
                        onChange={(e) => handleFilterChange('priceMax', Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                </div>
            </div>

            {/* Availability Filter */}
            <div>
                <label className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors">
                    <input
                        type="checkbox"
                        checked={filters.availability}
                        onChange={(e) => handleFilterChange('availability', e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 rounded"
                    />
                    <span className="mr-2 text-gray-700">إظهار السيارات المتاحة فقط</span>
                </label>
            </div>

            {/* Reset Filters Button */}
            <button
                onClick={() => {
                    handleFilterChange('category', '');
                    handleFilterChange('priceMin', 0);
                    handleFilterChange('priceMax', maxPrice);
                    handleFilterChange('searchTerm', '');
                    handleFilterChange('availability', false);
                }}
                className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md transition-colors font-medium"
            >
                إعادة ضبط الفلاتر
            </button>
        </div>
    );
};

// List View Component
interface CarListItemProps {
    car: Car;
}

const CarListItem = ({ car }: CarListItemProps) => {
    return (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md overflow-hidden transition-all border border-gray-100">
            <div className="flex flex-col sm:flex-row">
                {/* Image */}
                <div className="relative h-64 sm:h-auto sm:w-2/5 lg:w-1/3 overflow-hidden">
                    <div
                        className="h-full w-full bg-cover bg-center transform hover:scale-105 transition-transform duration-500"
                        style={{
                            backgroundImage: `url(${car.images[0] || '/images/car-placeholder.jpg'})`,
                        }}
                    />

                    {/* Category Badge */}
                    <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full font-arabic shadow-sm">
                        {car.category === 'economy' && 'اقتصادية'}
                        {car.category === 'luxury' && 'فاخرة'}
                        {car.category === 'suv' && 'دفع رباعي'}
                        {car.category === 'sports' && 'رياضية'}
                        {car.category === 'family' && 'عائلية'}
                    </div>

                    {/* Availability Badge */}
                    <div className={`absolute top-4 left-4 ${car.availability ? 'bg-green-500' : 'bg-red-500'} text-white text-xs font-bold px-3 py-1.5 rounded-full font-arabic shadow-sm`}>
                        {car.availability ? 'متوفرة' : 'غير متوفرة'}
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:w-3/5 lg:w-2/3 font-arabic" dir="rtl">
                    <div className="flex flex-col h-full">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-1">{car.brand} {car.model}</h3>
                                <p className="text-sm text-gray-600">موديل {car.year}</p>

                                {/* Rating */}
                                <div className="flex items-center mt-2" dir="ltr">
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
                            </div>
                            <div className="text-right">
                                <p className="text-2xl font-bold text-blue-600">{car.pricePerDay} ريال</p>
                                <p className="text-xs text-gray-500">لليوم الواحد</p>
                            </div>
                        </div>

                        {/* Features */}
                        <div className="flex flex-wrap gap-2 mt-3 mb-4">
                            {car.features.slice(0, 3).map((feature, index) => (
                                <span key={index} className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    {feature}
                                </span>
                            ))}
                            {car.features.length > 3 && (
                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                    +{car.features.length - 3}
                                </span>
                            )}
                        </div>

                        {/* Car Specs */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-auto bg-gray-50 p-3 rounded-lg">
                            <div className="flex items-center text-gray-700 text-sm">
                                <span>{car.transmission === 'automatic' ? 'أوتوماتيك' : 'عادي'}</span>
                            </div>
                            <div className="flex items-center text-gray-700 text-sm">
                                <span>{car.seats} مقاعد</span>
                            </div>
                            <div className="flex items-center text-gray-700 text-sm">
                                <span>
                                    {car.fuelType === 'petrol' ? 'بنزين' :
                                        car.fuelType === 'diesel' ? 'ديزل' :
                                            car.fuelType === 'electric' ? 'كهرباء' : 'هجين'}
                                </span>
                            </div>
                            <div className="flex items-center text-gray-700 text-sm">
                                <span>{car.color}</span>
                            </div>
                        </div>

                        {/* Action Button */}
                        <div className="mt-5">
                            <a
                                href={`/cars/${car.id}`}
                                className={`inline-block w-full sm:w-auto px-6 py-3 rounded-lg font-medium transition-all text-center ${car.availability
                                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow'
                                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                {car.availability ? 'عرض التفاصيل والحجز' : 'غير متوفرة'}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}; 
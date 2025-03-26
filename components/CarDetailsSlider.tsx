'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarDetailsSliderProps {
    images: string[];
    carName: string;
}

export const CarDetailsSlider = ({ images, carName }: CarDetailsSliderProps) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const goToPrevious = () => {
        const isFirstSlide = activeIndex === 0;
        const newIndex = isFirstSlide ? images.length - 1 : activeIndex - 1;
        setActiveIndex(newIndex);
    };

    const goToNext = () => {
        const isLastSlide = activeIndex === images.length - 1;
        const newIndex = isLastSlide ? 0 : activeIndex + 1;
        setActiveIndex(newIndex);
    };

    const goToSlide = (slideIndex: number) => {
        setActiveIndex(slideIndex);
    };

    if (!images || images.length === 0) {
        return (
            <div className="relative h-96 w-full bg-gray-200 rounded-lg">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    لا توجد صور متاحة
                </div>
            </div>
        );
    }

    return (
        <div className="relative w-full h-96 md:h-[500px]">
            {/* Main Slider */}
            <div className="relative h-full w-full overflow-hidden rounded-xl">
                <div
                    className="absolute inset-0 transition-opacity duration-500"
                    style={{
                        backgroundImage: `url(${images[activeIndex] || '/images/car-placeholder.jpg'})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: 0.2
                    }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                <div className="relative h-full w-full flex items-center justify-center">
                    <Image
                        src={images[activeIndex] || '/images/car-placeholder.jpg'}
                        alt={`${carName} - صورة ${activeIndex + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 70vw"
                        className="object-contain"
                        priority={activeIndex === 0}
                    />
                </div>

                {/* Navigation Arrows */}
                <button
                    onClick={goToPrevious}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-gray-800 shadow-md z-10 transition-all"
                    aria-label="السابق"
                >
                    <ChevronLeft className="h-6 w-6" />
                </button>

                <button
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-gray-800 shadow-md z-10 transition-all"
                    aria-label="التالي"
                >
                    <ChevronRight className="h-6 w-6" />
                </button>
            </div>

            {/* Thumbnails */}
            <div className="mt-4 flex justify-center space-x-2 rtl:space-x-reverse">
                {images.map((image, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-16 h-16 relative rounded-lg overflow-hidden border-2 transition-all ${activeIndex === index
                                ? 'border-blue-600 opacity-100 scale-105'
                                : 'border-transparent opacity-70 hover:opacity-100'
                            }`}
                        aria-label={`عرض صورة ${index + 1}`}
                    >
                        <Image
                            src={image || '/images/car-placeholder.jpg'}
                            alt={`${carName} - مصغرة ${index + 1}`}
                            fill
                            sizes="64px"
                            className="object-cover"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}; 
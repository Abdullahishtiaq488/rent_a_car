'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, User, Car, Phone, MapPin } from 'lucide-react';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center">
                            <Car className="h-8 w-8 text-blue-600" />
                            <span className="ml-2 text-2xl font-bold text-blue-600 font-arabic">سيارتك</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8 font-arabic" dir="rtl">
                        <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors py-2">
                            الرئيسية
                        </Link>
                        <Link href="/cars" className="text-gray-700 hover:text-blue-600 transition-colors py-2">
                            السيارات
                        </Link>
                        <Link href="/locations" className="text-gray-700 hover:text-blue-600 transition-colors py-2">
                            المواقع
                        </Link>
                        <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors py-2">
                            من نحن
                        </Link>
                        <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors py-2">
                            اتصل بنا
                        </Link>
                    </nav>

                    {/* CTA Button */}
                    <div className="hidden md:flex">
                        <Link href="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-arabic transition-colors">
                            تسجيل الدخول
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
                            aria-label={isOpen ? "إغلاق القائمة" : "فتح القائمة"}
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white font-arabic" dir="rtl">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link
                            href="/"
                            className="block text-right px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            الرئيسية
                        </Link>
                        <Link
                            href="/cars"
                            className="block text-right px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            السيارات
                        </Link>
                        <Link
                            href="/locations"
                            className="block text-right px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            المواقع
                        </Link>
                        <Link
                            href="/about"
                            className="block text-right px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            من نحن
                        </Link>
                        <Link
                            href="/contact"
                            className="block text-right px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            اتصل بنا
                        </Link>
                        <Link
                            href="/login"
                            className="block text-right px-3 py-2 text-blue-600 hover:text-blue-700 hover:bg-gray-50 transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            تسجيل الدخول
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}; 
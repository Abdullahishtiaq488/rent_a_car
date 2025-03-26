'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { Car } from '../../types';
import { cars } from '../../data/cars';
import { locations } from '../../data/locations';
import { Check, Calendar, MapPin, Car as CarIcon, CreditCard, User, Phone, Mail, Shield } from 'lucide-react';
import Image from 'next/image';

export default function BookingPage() {
    const searchParams = useSearchParams();

    const [bookingData, setBookingData] = useState({
        car: null as Car | null,
        location: '',
        locationName: '',
        startDate: '',
        endDate: '',
        totalDays: 0,
        totalPrice: 0,
    });

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        licenseNumber: '',
        paymentMethod: 'credit_card',
        cardNumber: '',
        cardExpiry: '',
        cardCVV: '',
        agreeToTerms: false,
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isBooked, setIsBooked] = useState(false);
    const [bookingId, setBookingId] = useState('');

    useEffect(() => {
        // Get query parameters
        const carId = searchParams.get('car');
        const startDate = searchParams.get('start');
        const endDate = searchParams.get('end');
        const locationId = searchParams.get('location');
        const days = searchParams.get('days');
        const price = searchParams.get('price');

        // Find car and location data
        const carData = cars.find(c => c.id === carId);
        const locationData = locations.find(l => l.id === locationId);

        if (carData && startDate && endDate && locationId && days && price) {
            setBookingData({
                car: carData,
                location: locationId,
                locationName: locationData ? `${locationData.name}، ${locationData.city}` : '',
                startDate,
                endDate,
                totalDays: parseInt(days, 10),
                totalPrice: parseInt(price, 10),
            });
        } else {
            // Redirect to home if data is missing
            window.location.href = '/';
        }
    }, [searchParams]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target as HTMLInputElement;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
        }));

        // Clear error when field is edited
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        // Name validation
        if (!formData.firstName.trim()) {
            newErrors.firstName = 'الاسم الأول مطلوب';
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = 'اسم العائلة مطلوب';
        }

        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = 'البريد الإلكتروني مطلوب';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'البريد الإلكتروني غير صالح';
        }

        // Phone validation
        if (!formData.phone.trim()) {
            newErrors.phone = 'رقم الهاتف مطلوب';
        } else if (!/^\d{10,15}$/.test(formData.phone.replace(/\D/g, ''))) {
            newErrors.phone = 'رقم الهاتف غير صالح';
        }

        // License validation
        if (!formData.licenseNumber.trim()) {
            newErrors.licenseNumber = 'رقم الرخصة مطلوب';
        }

        // Payment validation for credit card
        if (formData.paymentMethod === 'credit_card') {
            if (!formData.cardNumber.trim()) {
                newErrors.cardNumber = 'رقم البطاقة مطلوب';
            } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\D/g, ''))) {
                newErrors.cardNumber = 'رقم البطاقة غير صالح';
            }

            if (!formData.cardExpiry.trim()) {
                newErrors.cardExpiry = 'تاريخ الانتهاء مطلوب';
            } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.cardExpiry)) {
                newErrors.cardExpiry = 'تاريخ الانتهاء غير صالح (MM/YY)';
            }

            if (!formData.cardCVV.trim()) {
                newErrors.cardCVV = 'رمز CVV مطلوب';
            } else if (!/^\d{3,4}$/.test(formData.cardCVV)) {
                newErrors.cardCVV = 'رمز CVV غير صالح';
            }
        }

        // Terms agreement
        if (!formData.agreeToTerms) {
            newErrors.agreeToTerms = 'يجب الموافقة على الشروط والأحكام';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            setIsSubmitting(true);

            // Simulate API call with a timeout
            setTimeout(() => {
                // Generate random booking ID
                const randomId = Math.random().toString(36).substring(2, 10).toUpperCase();
                setBookingId(randomId);
                setIsBooked(true);
                setIsSubmitting(false);
            }, 1500);
        }
    };

    if (!bookingData.car) {
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

    if (isBooked) {
        return (
            <main className="min-h-screen flex flex-col">
                <Navbar />
                <div className="pt-20 flex-grow">
                    <div className="container mx-auto px-4 py-8 md:py-16">
                        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            {/* Success Banner */}
                            <div className="bg-green-50 p-6 border-b border-green-100">
                                <div className="flex flex-col items-center">
                                    <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                        <Check className="h-8 w-8 text-green-600" />
                                    </div>
                                    <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center font-arabic">تم تأكيد الحجز بنجاح</h1>
                                    <p className="text-gray-600 text-center font-arabic">
                                        شكراً لاختيارك سيارتك! تم إرسال تفاصيل الحجز إلى بريدك الإلكتروني.
                                    </p>
                                </div>
                            </div>

                            {/* Booking Details */}
                            <div className="p-6" dir="rtl">
                                <div className="mb-6">
                                    <h2 className="text-lg font-bold text-gray-900 mb-2 font-arabic">تفاصيل الحجز</h2>
                                    <p className="text-sm text-gray-600 font-arabic">رقم الحجز: <span className="font-medium text-gray-900">{bookingId}</span></p>
                                </div>

                                {/* Car Details */}
                                <div className="flex flex-col sm:flex-row mb-6 pb-6 border-b border-gray-100">
                                    <div className="relative h-48 sm:h-auto sm:w-1/3 mb-4 sm:mb-0">
                                        <Image
                                            src={bookingData.car.images[0] || '/images/car-placeholder.jpg'}
                                            alt={`${bookingData.car.brand} ${bookingData.car.model}`}
                                            fill
                                            className="object-cover rounded-lg"
                                        />
                                    </div>
                                    <div className="sm:w-2/3 sm:pl-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-1 font-arabic">{bookingData.car.brand} {bookingData.car.model}</h3>
                                        <p className="text-gray-600 mb-3 font-arabic">موديل {bookingData.car.year} • {bookingData.car.color}</p>

                                        <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                                            <div className="flex items-center text-gray-700">
                                                <CarIcon className="h-4 w-4 ml-2 text-gray-500" />
                                                <span className="font-arabic">
                                                    {bookingData.car.transmission === 'automatic' ? 'أوتوماتيك' : 'عادي'}
                                                </span>
                                            </div>
                                            <div className="flex items-center text-gray-700">
                                                <User className="h-4 w-4 ml-2 text-gray-500" />
                                                <span className="font-arabic">{bookingData.car.seats} مقاعد</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Reservation Details */}
                                <div className="mb-6 pb-6 border-b border-gray-100">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4 font-arabic">تفاصيل الحجز</h3>

                                    <div className="space-y-3">
                                        <div className="flex">
                                            <Calendar className="h-5 w-5 ml-3 text-gray-500 flex-shrink-0" />
                                            <div>
                                                <p className="text-sm text-gray-500 font-arabic">تاريخ الاستلام</p>
                                                <p className="font-medium font-arabic">{new Date(bookingData.startDate).toLocaleDateString('ar-SA')}</p>
                                            </div>
                                        </div>

                                        <div className="flex">
                                            <Calendar className="h-5 w-5 ml-3 text-gray-500 flex-shrink-0" />
                                            <div>
                                                <p className="text-sm text-gray-500 font-arabic">تاريخ الإرجاع</p>
                                                <p className="font-medium font-arabic">{new Date(bookingData.endDate).toLocaleDateString('ar-SA')}</p>
                                            </div>
                                        </div>

                                        <div className="flex">
                                            <MapPin className="h-5 w-5 ml-3 text-gray-500 flex-shrink-0" />
                                            <div>
                                                <p className="text-sm text-gray-500 font-arabic">موقع الاستلام</p>
                                                <p className="font-medium font-arabic">{bookingData.locationName}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Payment Details */}
                                <div className="mb-6">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4 font-arabic">تفاصيل الدفع</h3>

                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <div className="space-y-2 font-arabic">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">{bookingData.car.pricePerDay} ريال × {bookingData.totalDays} يوم</span>
                                                <span className="font-medium">{bookingData.car.pricePerDay * bookingData.totalDays} ريال</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">رسوم الخدمة</span>
                                                <span className="font-medium">0 ريال</span>
                                            </div>
                                            <div className="border-t border-gray-200 pt-2 mt-2">
                                                <div className="flex justify-between font-bold">
                                                    <span>المجموع</span>
                                                    <span>{bookingData.totalPrice} ريال</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a
                                        href="/"
                                        className="inline-flex justify-center items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors font-arabic w-full"
                                    >
                                        العودة للرئيسية
                                    </a>
                                    <button
                                        className="inline-flex justify-center items-center px-6 py-3 bg-white hover:bg-gray-50 text-gray-800 font-bold rounded-lg border border-gray-300 transition-colors font-arabic w-full"
                                        onClick={() => window.print()}
                                    >
                                        طباعة تفاصيل الحجز
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </main>
        );
    }

    return (
        <main className="min-h-screen flex flex-col">
            <Navbar />

            <div className="pt-20 flex-grow">
                {/* Breadcrumbs */}
                <div className="bg-gray-100 py-3" dir="rtl">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center text-sm text-gray-600 font-arabic">
                            <a href="/" className="hover:text-blue-600">الرئيسية</a>
                            <span className="mx-2">/</span>
                            <a href="/cars" className="hover:text-blue-600">السيارات</a>
                            <span className="mx-2">/</span>
                            <a href={`/cars/${bookingData.car.id}`} className="hover:text-blue-600">{bookingData.car.brand} {bookingData.car.model}</a>
                            <span className="mx-2">/</span>
                            <span className="text-gray-900">تأكيد الحجز</span>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center font-arabic">استكمال الحجز</h1>

                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Booking Form */}
                        <div className="lg:w-3/5">
                            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100" dir="rtl">
                                {/* Personal Information */}
                                <div className="mb-8">
                                    <h2 className="text-xl font-bold text-gray-900 mb-6 font-arabic">المعلومات الشخصية</h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* First Name */}
                                        <div>
                                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                                                الاسم الأول
                                            </label>
                                            <input
                                                type="text"
                                                id="firstName"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                className={`block w-full px-4 py-2 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-blue-500 focus:border-blue-500 text-right`}
                                            />
                                            {errors.firstName && (
                                                <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                                            )}
                                        </div>

                                        {/* Last Name */}
                                        <div>
                                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                                                اسم العائلة
                                            </label>
                                            <input
                                                type="text"
                                                id="lastName"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                className={`block w-full px-4 py-2 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-blue-500 focus:border-blue-500 text-right`}
                                            />
                                            {errors.lastName && (
                                                <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                                            )}
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                                البريد الإلكتروني
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                    <Mail className="h-5 w-5 text-gray-400" />
                                                </div>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    className={`block w-full pr-10 px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-blue-500 focus:border-blue-500 text-right`}
                                                />
                                            </div>
                                            {errors.email && (
                                                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                                            )}
                                        </div>

                                        {/* Phone */}
                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                                رقم الهاتف
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                    <Phone className="h-5 w-5 text-gray-400" />
                                                </div>
                                                <input
                                                    type="tel"
                                                    id="phone"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    className={`block w-full pr-10 px-4 py-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-blue-500 focus:border-blue-500 text-right`}
                                                    placeholder="0xxxxxxxxx"
                                                />
                                            </div>
                                            {errors.phone && (
                                                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                                            )}
                                        </div>

                                        {/* License Number */}
                                        <div className="md:col-span-2">
                                            <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-700 mb-1">
                                                رقم رخصة القيادة
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                    <User className="h-5 w-5 text-gray-400" />
                                                </div>
                                                <input
                                                    type="text"
                                                    id="licenseNumber"
                                                    name="licenseNumber"
                                                    value={formData.licenseNumber}
                                                    onChange={handleInputChange}
                                                    className={`block w-full pr-10 px-4 py-2 border ${errors.licenseNumber ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-blue-500 focus:border-blue-500 text-right`}
                                                />
                                            </div>
                                            {errors.licenseNumber && (
                                                <p className="mt-1 text-sm text-red-600">{errors.licenseNumber}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Payment Information */}
                                <div className="mb-8">
                                    <h2 className="text-xl font-bold text-gray-900 mb-6 font-arabic">معلومات الدفع</h2>

                                    {/* Payment Methods */}
                                    <div className="mb-6">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            طريقة الدفع
                                        </label>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <label className={`border rounded-lg p-4 flex items-center cursor-pointer ${formData.paymentMethod === 'credit_card' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}>
                                                <input
                                                    type="radio"
                                                    name="paymentMethod"
                                                    value="credit_card"
                                                    checked={formData.paymentMethod === 'credit_card'}
                                                    onChange={handleInputChange}
                                                    className="sr-only"
                                                />
                                                <div className="h-6 w-6 rounded-full border-2 ml-2 flex items-center justify-center">
                                                    {formData.paymentMethod === 'credit_card' && <div className="h-3 w-3 rounded-full bg-blue-600"></div>}
                                                </div>
                                                <span>بطاقة الائتمان</span>
                                            </label>

                                            <label className={`border rounded-lg p-4 flex items-center cursor-pointer ${formData.paymentMethod === 'cash' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}>
                                                <input
                                                    type="radio"
                                                    name="paymentMethod"
                                                    value="cash"
                                                    checked={formData.paymentMethod === 'cash'}
                                                    onChange={handleInputChange}
                                                    className="sr-only"
                                                />
                                                <div className="h-6 w-6 rounded-full border-2 ml-2 flex items-center justify-center">
                                                    {formData.paymentMethod === 'cash' && <div className="h-3 w-3 rounded-full bg-blue-600"></div>}
                                                </div>
                                                <span>الدفع عند الاستلام</span>
                                            </label>
                                        </div>
                                    </div>

                                    {/* Credit Card Details */}
                                    {formData.paymentMethod === 'credit_card' && (
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <div className="mb-4">
                                                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                                                    رقم البطاقة
                                                </label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                        <CreditCard className="h-5 w-5 text-gray-400" />
                                                    </div>
                                                    <input
                                                        type="text"
                                                        id="cardNumber"
                                                        name="cardNumber"
                                                        value={formData.cardNumber}
                                                        onChange={handleInputChange}
                                                        className={`block w-full pr-10 px-4 py-2 border ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-blue-500 focus:border-blue-500 text-right`}
                                                        placeholder="0000 0000 0000 0000"
                                                        maxLength={19}
                                                    />
                                                </div>
                                                {errors.cardNumber && (
                                                    <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>
                                                )}
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700 mb-1">
                                                        تاريخ الانتهاء
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="cardExpiry"
                                                        name="cardExpiry"
                                                        value={formData.cardExpiry}
                                                        onChange={handleInputChange}
                                                        className={`block w-full px-4 py-2 border ${errors.cardExpiry ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-blue-500 focus:border-blue-500 text-right`}
                                                        placeholder="MM/YY"
                                                        maxLength={5}
                                                    />
                                                    {errors.cardExpiry && (
                                                        <p className="mt-1 text-sm text-red-600">{errors.cardExpiry}</p>
                                                    )}
                                                </div>

                                                <div>
                                                    <label htmlFor="cardCVV" className="block text-sm font-medium text-gray-700 mb-1">
                                                        رمز الأمان (CVV)
                                                    </label>
                                                    <div className="relative">
                                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                            <Shield className="h-5 w-5 text-gray-400" />
                                                        </div>
                                                        <input
                                                            type="text"
                                                            id="cardCVV"
                                                            name="cardCVV"
                                                            value={formData.cardCVV}
                                                            onChange={handleInputChange}
                                                            className={`block w-full pr-10 px-4 py-2 border ${errors.cardCVV ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-blue-500 focus:border-blue-500 text-right`}
                                                            placeholder="123"
                                                            maxLength={4}
                                                        />
                                                    </div>
                                                    {errors.cardCVV && (
                                                        <p className="mt-1 text-sm text-red-600">{errors.cardCVV}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Terms and Conditions */}
                                <div className="mb-8">
                                    <label className="flex items-start">
                                        <input
                                            type="checkbox"
                                            name="agreeToTerms"
                                            checked={formData.agreeToTerms}
                                            onChange={handleInputChange}
                                            className={`h-5 w-5 ml-2 mt-0.5 ${errors.agreeToTerms ? 'border-red-500' : 'border-gray-300'}`}
                                        />
                                        <span className="text-gray-700">
                                            أوافق على <a href="#" className="text-blue-600 hover:underline">الشروط والأحكام</a> و <a href="#" className="text-blue-600 hover:underline">سياسة الخصوصية</a>
                                        </span>
                                    </label>
                                    {errors.agreeToTerms && (
                                        <p className="mt-1 text-sm text-red-600">{errors.agreeToTerms}</p>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors font-arabic relative"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span className="opacity-0">تأكيد الحجز</span>
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="animate-spin rounded-full h-6 w-6 border-2 border-t-transparent border-white"></div>
                                            </div>
                                        </>
                                    ) : (
                                        'تأكيد الحجز'
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:w-2/5">
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24" dir="rtl">
                                <h2 className="text-xl font-bold text-gray-900 mb-6 font-arabic">ملخص الحجز</h2>

                                {/* Car Details */}
                                <div className="flex mb-6 pb-6 border-b border-gray-100">
                                    <div className="relative h-20 w-20 flex-shrink-0">
                                        <Image
                                            src={bookingData.car.images[0] || '/images/car-placeholder.jpg'}
                                            alt={`${bookingData.car.brand} ${bookingData.car.model}`}
                                            fill
                                            className="object-cover rounded-lg"
                                        />
                                    </div>
                                    <div className="mr-4">
                                        <h3 className="font-bold text-gray-900 mb-1 font-arabic">{bookingData.car.brand} {bookingData.car.model}</h3>
                                        <p className="text-sm text-gray-600 font-arabic">موديل {bookingData.car.year} • {bookingData.car.color}</p>
                                    </div>
                                </div>

                                {/* Booking Details */}
                                <div className="mb-6 pb-6 border-b border-gray-100">
                                    <h3 className="font-semibold text-gray-900 mb-4 font-arabic">تفاصيل الحجز</h3>

                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 font-arabic">تاريخ الاستلام:</span>
                                            <span className="font-medium font-arabic">{new Date(bookingData.startDate).toLocaleDateString('ar-SA')}</span>
                                        </div>

                                        <div className="flex justify-between">
                                            <span className="text-gray-600 font-arabic">تاريخ الإرجاع:</span>
                                            <span className="font-medium font-arabic">{new Date(bookingData.endDate).toLocaleDateString('ar-SA')}</span>
                                        </div>

                                        <div className="flex justify-between">
                                            <span className="text-gray-600 font-arabic">مدة الإيجار:</span>
                                            <span className="font-medium font-arabic">{bookingData.totalDays} يوم</span>
                                        </div>

                                        <div className="flex justify-between">
                                            <span className="text-gray-600 font-arabic">موقع الاستلام:</span>
                                            <span className="font-medium text-left font-arabic">{bookingData.locationName}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Price Summary */}
                                <div className="mb-6">
                                    <h3 className="font-semibold text-gray-900 mb-4 font-arabic">ملخص السعر</h3>

                                    <div className="space-y-2 font-arabic">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">{bookingData.car.pricePerDay} ريال × {bookingData.totalDays} يوم</span>
                                            <span className="font-medium">{bookingData.car.pricePerDay * bookingData.totalDays} ريال</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">رسوم الخدمة</span>
                                            <span className="font-medium">0 ريال</span>
                                        </div>
                                        <div className="border-t border-gray-200 pt-2 mt-2">
                                            <div className="flex justify-between font-bold">
                                                <span>المجموع</span>
                                                <span>{bookingData.totalPrice} ريال</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Policy Notes */}
                                <div className="text-sm text-gray-600 space-y-2 font-arabic">
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
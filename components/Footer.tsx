import Link from 'next/link';
import { Car, Phone, Mail, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white pt-16 pb-8 font-arabic" dir="rtl">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Logo and About */}
                    <div>
                        <div className="flex items-center mb-4">
                            <Car className="h-8 w-8 text-blue-400" />
                            <span className="ml-2 text-2xl font-bold text-white">سيارتك</span>
                        </div>
                        <p className="text-gray-400 mb-6">
                            أفضل خدمة تأجير سيارات في المملكة العربية السعودية. نقدم مجموعة واسعة من السيارات بأسعار تنافسية وخدمة عملاء ممتازة.
                        </p>
                        <div className="flex space-x-4">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-blue-900 hover:bg-blue-800 p-2 rounded-full transition-colors"
                                aria-label="فيسبوك"
                            >
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-blue-600 hover:bg-blue-500 p-2 rounded-full transition-colors"
                                aria-label="تويتر"
                            >
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-gradient-to-tr from-purple-600 via-pink-600 to-yellow-500 hover:opacity-90 p-2 rounded-full transition-colors"
                                aria-label="انستغرام"
                            >
                                <Instagram className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-white">روابط سريعة</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/about" className="text-gray-400 hover:text-blue-400 transition-colors">
                                    من نحن
                                </Link>
                            </li>
                            <li>
                                <Link href="/cars" className="text-gray-400 hover:text-blue-400 transition-colors">
                                    السيارات المتاحة
                                </Link>
                            </li>
                            <li>
                                <Link href="/locations" className="text-gray-400 hover:text-blue-400 transition-colors">
                                    مواقعنا
                                </Link>
                            </li>
                            <li>
                                <Link href="/faqs" className="text-gray-400 hover:text-blue-400 transition-colors">
                                    الأسئلة الشائعة
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-gray-400 hover:text-blue-400 transition-colors">
                                    الشروط والأحكام
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="text-gray-400 hover:text-blue-400 transition-colors">
                                    سياسة الخصوصية
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Car Categories */}
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-white">فئات السيارات</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/cars?category=economy" className="text-gray-400 hover:text-blue-400 transition-colors">
                                    سيارات اقتصادية
                                </Link>
                            </li>
                            <li>
                                <Link href="/cars?category=luxury" className="text-gray-400 hover:text-blue-400 transition-colors">
                                    سيارات فاخرة
                                </Link>
                            </li>
                            <li>
                                <Link href="/cars?category=suv" className="text-gray-400 hover:text-blue-400 transition-colors">
                                    سيارات دفع رباعي
                                </Link>
                            </li>
                            <li>
                                <Link href="/cars?category=sports" className="text-gray-400 hover:text-blue-400 transition-colors">
                                    سيارات رياضية
                                </Link>
                            </li>
                            <li>
                                <Link href="/cars?category=family" className="text-gray-400 hover:text-blue-400 transition-colors">
                                    سيارات عائلية
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-white">اتصل بنا</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <MapPin className="h-5 w-5 text-blue-400 ml-3 mt-1 flex-shrink-0" />
                                <span className="text-gray-400">
                                    شارع العليا، حي الورود، الرياض
                                    المملكة العربية السعودية
                                </span>
                            </li>
                            <li className="flex items-center">
                                <Phone className="h-5 w-5 text-blue-400 ml-3 flex-shrink-0" />
                                <a href="tel:+966123456789" className="text-gray-400 hover:text-blue-400 transition-colors">
                                    +966 12 345 6789
                                </a>
                            </li>
                            <li className="flex items-center">
                                <Mail className="h-5 w-5 text-blue-400 ml-3 flex-shrink-0" />
                                <a href="mailto:info@yourcarrentals.com" className="text-gray-400 hover:text-blue-400 transition-colors">
                                    info@yourcarrentals.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <hr className="border-gray-800 mt-12 mb-8" />

                {/* Copyright */}
                <div className="text-center text-gray-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} سيارتك. جميع الحقوق محفوظة</p>
                </div>
            </div>
        </footer>
    );
}; 
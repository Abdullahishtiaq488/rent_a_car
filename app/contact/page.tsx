'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { Phone, Mail, MapPin, Clock, Send, ChevronLeft } from 'lucide-react';
import { locations } from '../../data/locations';
import { motion } from 'framer-motion';
import Head from 'next/head';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

    // Prevent layout shift by preloading main content
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value,
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
        if (!formData.name.trim()) {
            newErrors.name = 'الاسم مطلوب';
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

        // Subject validation
        if (!formData.subject.trim()) {
            newErrors.subject = 'الموضوع مطلوب';
        }

        // Message validation
        if (!formData.message.trim()) {
            newErrors.message = 'الرسالة مطلوبة';
        } else if (formData.message.trim().length < 20) {
            newErrors.message = 'الرسالة قصيرة جداً (الحد الأدنى 20 حرف)';
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
                setIsSubmitting(false);
                setSubmitSuccess(true);

                // Reset form
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    subject: '',
                    message: '',
                });

                // Reset success message after some time
                setTimeout(() => {
                    setSubmitSuccess(false);
                }, 5000);
            }, 1500);
        }
    };

    const toggleAccordion = (index: number) => {
        setActiveAccordion(activeAccordion === index ? null : index);
    };

    // Filter locations to display only main branches
    const mainLocations = locations.filter(location => location.isMainBranch);

    // FAQ data
    const faqItems = [
        {
            question: "ما هي متطلبات استئجار سيارة؟",
            answer: "تحتاج إلى رخصة قيادة سارية المفعول، بطاقة هوية أو جواز سفر، وبطاقة ائتمان باسمك. يجب أن يكون عمرك 21 عامًا على الأقل (قد يكون أكثر لبعض فئات السيارات)."
        },
        {
            question: "هل يمكنني إلغاء الحجز؟",
            answer: "نعم، يمكنك إلغاء الحجز مجانًا قبل 24 ساعة من موعد الاستلام. إذا قمت بالإلغاء بعد ذلك، قد يتم تطبيق رسوم الإلغاء."
        },
        {
            question: "هل التأمين مشمول في السعر؟",
            answer: "نعم، جميع إيجاراتنا تشمل التأمين الأساسي. يمكنك أيضًا اختيار تحسين التغطية التأمينية بتكلفة إضافية لراحة بالك."
        },
        {
            question: "ماذا لو تأخرت في إرجاع السيارة؟",
            answer: "نقدم فترة سماح مدتها 60 دقيقة. بعد ذلك، قد يتم احتساب يوم إضافي. نرجو الاتصال بنا في حال تأخرك لترتيب الأمر."
        }
    ];

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5 }
        }
    };

    if (!isLoaded) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <>
            <Head>
                <title>تواصل معنا | رينت أ كار</title>
                <meta name="description" content="تواصل مع رينت أ كار للاستفسارات والحجوزات. فريقنا جاهز لمساعدتك في جميع احتياجاتك." />
            </Head>

            <main className="min-h-screen flex flex-col">
                <Navbar />

                <div className="pt-20 flex-grow">
                    {/* Hero Section */}
                    <section className="relative h-[300px]">
                        <div
                            className="absolute inset-0 bg-cover bg-center z-0"
                            style={{
                                backgroundImage: "url('/images/bmw-x5-1.jpg')",
                            }}
                        />
                        <div className="absolute inset-0 bg-blue-900/70 z-0"></div>
                        <div className="container mx-auto px-4 h-full flex items-center justify-center relative z-10">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="text-center max-w-3xl mx-auto"
                            >
                                <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 font-arabic">تواصل معنا</h1>
                                <p className="text-lg md:text-xl text-white/90 font-arabic leading-relaxed">
                                    نحن هنا للإجابة على استفساراتك ومساعدتك في كل ما تحتاجه. لا تتردد في التواصل معنا عبر أي من وسائل الاتصال المتاحة.
                                </p>
                            </motion.div>
                        </div>
                    </section>

                    {/* Contact Information */}
                    <section className="py-16" dir="rtl">
                        <div className="container mx-auto px-4">
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.3 }}
                                className="grid grid-cols-1 md:grid-cols-3 gap-8"
                            >
                                <motion.div
                                    variants={itemVariants}
                                    className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 text-center hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
                                >
                                    <div className="inline-flex h-16 w-16 bg-blue-100 rounded-full items-center justify-center mb-5">
                                        <Phone className="h-8 w-8 text-blue-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 font-arabic">اتصل بنا</h3>
                                    <p className="text-gray-600 mb-2">
                                        <a href="tel:+966500000000" className="hover:text-blue-600 transition-colors">+966 50 000 0000</a>
                                    </p>
                                    <p className="text-gray-600">
                                        <a href="tel:+966550000000" className="hover:text-blue-600 transition-colors">+966 55 000 0000</a>
                                    </p>
                                </motion.div>

                                <motion.div
                                    variants={itemVariants}
                                    className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 text-center hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
                                >
                                    <div className="inline-flex h-16 w-16 bg-blue-100 rounded-full items-center justify-center mb-5">
                                        <Mail className="h-8 w-8 text-blue-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 font-arabic">راسلنا</h3>
                                    <p className="text-gray-600 mb-2">
                                        <a href="mailto:info@rentacar.sa" className="hover:text-blue-600 transition-colors">info@rentacar.sa</a>
                                    </p>
                                    <p className="text-gray-600">
                                        <a href="mailto:support@rentacar.sa" className="hover:text-blue-600 transition-colors">support@rentacar.sa</a>
                                    </p>
                                </motion.div>

                                <motion.div
                                    variants={itemVariants}
                                    className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 text-center hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
                                >
                                    <div className="inline-flex h-16 w-16 bg-blue-100 rounded-full items-center justify-center mb-5">
                                        <Clock className="h-8 w-8 text-blue-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 font-arabic">ساعات العمل</h3>
                                    <p className="text-gray-600 mb-2">الأحد - الخميس: 9:00 صباحاً - 9:00 مساءً</p>
                                    <p className="text-gray-600">الجمعة - السبت: 10:00 صباحاً - 6:00 مساءً</p>
                                </motion.div>
                            </motion.div>
                        </div>
                    </section>

                    {/* Contact Form and Locations */}
                    <section className="py-16 bg-gradient-to-b from-gray-50 to-white" dir="rtl">
                        <div className="container mx-auto px-4">
                            <div className="flex flex-col lg:flex-row gap-12">
                                {/* Contact Form */}
                                <motion.div
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.7 }}
                                    viewport={{ once: true }}
                                    className="lg:w-3/5"
                                >
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6 font-arabic">أرسل لنا رسالة</h2>

                                    {submitSuccess && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="bg-green-50 border border-green-200 rounded-lg p-5 mb-6 shadow-sm"
                                        >
                                            <p className="text-green-800 font-arabic flex items-center">
                                                <svg className="w-5 h-5 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                                تم إرسال رسالتك بنجاح. سنقوم بالرد عليك في أقرب وقت ممكن.
                                            </p>
                                        </motion.div>
                                    )}

                                    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                            {/* Name */}
                                            <div>
                                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                                    الاسم الكامل<span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    className={`block w-full px-4 py-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-blue-500 focus:border-blue-500 text-right transition-colors duration-200`}
                                                    placeholder="أدخل اسمك الكامل"
                                                />
                                                {errors.name && (
                                                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                                                )}
                                            </div>

                                            {/* Email */}
                                            <div>
                                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                                    البريد الإلكتروني<span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    className={`block w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-blue-500 focus:border-blue-500 text-right transition-colors duration-200`}
                                                    placeholder="example@email.com"
                                                />
                                                {errors.email && (
                                                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                                                )}
                                            </div>

                                            {/* Phone */}
                                            <div>
                                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                                    رقم الهاتف<span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="tel"
                                                    id="phone"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    className={`block w-full px-4 py-3 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-blue-500 focus:border-blue-500 text-right transition-colors duration-200`}
                                                    placeholder="0xxxxxxxxx"
                                                />
                                                {errors.phone && (
                                                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                                                )}
                                            </div>

                                            {/* Subject */}
                                            <div>
                                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                                    الموضوع<span className="text-red-500">*</span>
                                                </label>
                                                <select
                                                    id="subject"
                                                    name="subject"
                                                    value={formData.subject}
                                                    onChange={handleInputChange}
                                                    className={`block w-full px-4 py-3 border ${errors.subject ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-blue-500 focus:border-blue-500 text-right transition-colors duration-200 bg-white`}
                                                >
                                                    <option value="" disabled>اختر الموضوع</option>
                                                    <option value="استفسار عام">استفسار عام</option>
                                                    <option value="حجز سيارة">حجز سيارة</option>
                                                    <option value="شكوى">شكوى</option>
                                                    <option value="اقتراح">اقتراح</option>
                                                    <option value="أخرى">أخرى</option>
                                                </select>
                                                {errors.subject && (
                                                    <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Message */}
                                        <div className="mb-8">
                                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                                الرسالة<span className="text-red-500">*</span>
                                            </label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                rows={5}
                                                value={formData.message}
                                                onChange={handleInputChange}
                                                className={`block w-full px-4 py-3 border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-blue-500 focus:border-blue-500 text-right transition-colors duration-200`}
                                                placeholder="اكتب رسالتك هنا..."
                                            ></textarea>
                                            {errors.message && (
                                                <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                                            )}
                                        </div>

                                        {/* Submit Button */}
                                        <button
                                            type="submit"
                                            className="inline-flex justify-center items-center px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all duration-300 font-arabic relative shadow-md hover:shadow-lg transform hover:-translate-y-1"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <span className="opacity-0">إرسال الرسالة</span>
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <div className="animate-spin rounded-full h-6 w-6 border-2 border-t-transparent border-white"></div>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="h-5 w-5 ml-2" />
                                                    إرسال الرسالة
                                                </>
                                            )}
                                        </button>
                                    </form>
                                </motion.div>

                                {/* Locations */}
                                <motion.div
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.7 }}
                                    viewport={{ once: true }}
                                    className="lg:w-2/5"
                                >
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6 font-arabic">فروعنا الرئيسية</h2>

                                    <div className="bg-white p-8 rounded-xl shadow-lg space-y-8">
                                        {mainLocations.map((location) => (
                                            <div key={location.id} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                                                <h3 className="text-xl font-bold text-gray-900 mb-4 font-arabic">{location.name}، {location.city}</h3>

                                                <div className="space-y-3 mb-4">
                                                    <div className="flex items-start">
                                                        <MapPin className="h-5 w-5 text-blue-600 mt-1 ml-3 flex-shrink-0" />
                                                        <span className="text-gray-600 font-arabic">
                                                            {location.address}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <Phone className="h-5 w-5 text-blue-600 ml-3 flex-shrink-0" />
                                                        <a href={`tel:${location.phone}`} className="text-gray-600 hover:text-blue-600 transition-colors">
                                                            {location.phone}
                                                        </a>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <Clock className="h-5 w-5 text-blue-600 ml-3 flex-shrink-0" />
                                                        <span className="text-gray-600 font-arabic">
                                                            {location.openingHours}
                                                        </span>
                                                    </div>
                                                </div>

                                                <a
                                                    href={location.mapUrl || "https://maps.google.com"}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium font-arabic transition-colors bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg"
                                                >
                                                    عرض الموقع على الخريطة
                                                    <MapPin className="h-4 w-4 mr-2" />
                                                </a>
                                            </div>
                                        ))}

                                        <div className="pt-2">
                                            <a
                                                href="/locations"
                                                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium font-arabic transition-colors"
                                            >
                                                عرض جميع الفروع
                                                <ChevronLeft className="h-5 w-5 mr-1" />
                                            </a>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </section>

                    {/* FAQ Section */}
                    <section className="py-16 bg-gray-50" dir="rtl">
                        <div className="container mx-auto px-4">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7 }}
                                viewport={{ once: true }}
                                className="max-w-3xl mx-auto"
                            >
                                <h2 className="text-2xl font-bold text-gray-900 mb-10 text-center font-arabic">الأسئلة الشائعة</h2>

                                <div className="space-y-4">
                                    {faqItems.map((item, index) => (
                                        <div
                                            key={index}
                                            className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300"
                                        >
                                            <button
                                                onClick={() => toggleAccordion(index)}
                                                className="w-full px-6 py-5 text-right flex justify-between items-center focus:outline-none"
                                            >
                                                <h3 className="text-lg font-bold text-gray-900 font-arabic">{item.question}</h3>
                                                <div className={`transform transition-transform duration-300 ${activeAccordion === index ? 'rotate-180' : ''}`}>
                                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                                    </svg>
                                                </div>
                                            </button>
                                            <div
                                                className={`px-6 overflow-hidden transition-all duration-300 ${activeAccordion === index ? 'max-h-96 pb-5' : 'max-h-0'
                                                    }`}
                                            >
                                                <p className="text-gray-600 font-arabic">{item.answer}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </section>
                </div>

                <Footer />
            </main>
        </>
    );
}
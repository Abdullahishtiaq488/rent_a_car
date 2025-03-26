'use client';

import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import Image from 'next/image';
import { Check, Clock, Shield, Car, Star, MapPin, Users } from 'lucide-react';

export default function AboutPage() {
    return (
        <main className="min-h-screen flex flex-col">
            <Navbar />

            <div className="pt-20 flex-grow">
                {/* Hero Section */}
                <section className="bg-blue-50 py-16 md:py-24">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                            <div className="md:w-1/2 text-right">
                                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-arabic">من نحن</h1>
                                <p className="text-lg text-gray-700 mb-8 font-arabic leading-relaxed">
                                    شركة إيجار السيارات الرائدة في المملكة العربية السعودية، نقدم خدمات تأجير السيارات بأعلى مستويات الجودة والراحة. نسعى دائماً لتوفير تجربة استثنائية لعملائنا من خلال أسطول متنوع من السيارات الحديثة وخدمة عملاء متميزة.
                                </p>
                                <div className="flex flex-wrap gap-4 justify-end">
                                    <div className="flex items-center bg-white py-2 px-4 rounded-lg shadow-sm">
                                        <span className="text-xl font-bold text-blue-600 ml-2">+10,000</span>
                                        <span className="text-gray-600 font-arabic">عميل سعيد</span>
                                    </div>
                                    <div className="flex items-center bg-white py-2 px-4 rounded-lg shadow-sm">
                                        <span className="text-xl font-bold text-blue-600 ml-2">+500</span>
                                        <span className="text-gray-600 font-arabic">سيارة</span>
                                    </div>
                                    <div className="flex items-center bg-white py-2 px-4 rounded-lg shadow-sm">
                                        <span className="text-xl font-bold text-blue-600 ml-2">+15</span>
                                        <span className="text-gray-600 font-arabic">فرع</span>
                                    </div>
                                </div>
                            </div>
                            <div className="md:w-1/2 relative">
                                <div className="relative h-72 md:h-96 w-full rounded-xl overflow-hidden shadow-lg">
                                    <Image
                                        src="/images/hero-image1.jpg"
                                        alt="تأجير السيارات"
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                                </div>
                                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
                                    <div className="text-center">
                                        <p className="text-3xl font-bold text-blue-600 mb-1">15+</p>
                                        <p className="text-gray-700 font-arabic">سنة خبرة</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Our Story Section */}
                <section className="py-16" dir="rtl">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-arabic">قصتنا</h2>
                            <p className="text-gray-600 font-arabic leading-relaxed">
                                بدأت رحلتنا في عام 2008 بفكرة بسيطة: توفير خدمة تأجير سيارات موثوقة وبأسعار معقولة في المملكة العربية السعودية. منذ ذلك الحين، نمت شركتنا لتصبح واحدة من أكبر شركات تأجير السيارات في المنطقة.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                <div className="h-16 w-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                                    <Clock className="h-8 w-8 text-blue-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2 font-arabic">2008</h3>
                                <p className="text-gray-600 font-arabic">
                                    تأسست الشركة في مدينة الرياض بأسطول صغير من 10 سيارات فقط.
                                </p>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                <div className="h-16 w-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                                    <Car className="h-8 w-8 text-blue-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2 font-arabic">2015</h3>
                                <p className="text-gray-600 font-arabic">
                                    توسعنا لنصل إلى 5 فروع في أنحاء المملكة وأسطول يضم أكثر من 200 سيارة.
                                </p>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                <div className="h-16 w-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                                    <Star className="h-8 w-8 text-blue-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2 font-arabic">اليوم</h3>
                                <p className="text-gray-600 font-arabic">
                                    نفتخر بتقديم خدماتنا في أكثر من 15 مدينة مع أسطول يضم أكثر من 500 سيارة متنوعة.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Our Values Section */}
                <section className="py-16 bg-gray-50" dir="rtl">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-arabic">قيمنا</h2>
                            <p className="text-gray-600 font-arabic leading-relaxed">
                                نؤمن بأن تأجير السيارات يجب أن يكون تجربة سهلة وموثوقة وشفافة. إليك المبادئ التي تقود عملنا كل يوم.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-white p-6 rounded-xl shadow-sm flex">
                                <div className="h-12 w-12 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0 ml-4">
                                    <Shield className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 font-arabic">الأمان والموثوقية</h3>
                                    <p className="text-gray-600 font-arabic">
                                        سلامة عملائنا هي أولويتنا القصوى. جميع سياراتنا خاضعة لعمليات صيانة منتظمة ومجهزة بأحدث ميزات الأمان.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-sm flex">
                                <div className="h-12 w-12 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0 ml-4">
                                    <Check className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 font-arabic">الشفافية والنزاهة</h3>
                                    <p className="text-gray-600 font-arabic">
                                        لا رسوم مخفية ولا مفاجآت. نقدم أسعارًا واضحة وشروط بسيطة لضمان تجربة إيجار مريحة.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-sm flex">
                                <div className="h-12 w-12 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0 ml-4">
                                    <Users className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 font-arabic">خدمة العملاء المتميزة</h3>
                                    <p className="text-gray-600 font-arabic">
                                        فريق خدمة العملاء الخاص بنا متاح دائمًا لمساعدتك ودعمك في كل خطوة من رحلتك.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-sm flex">
                                <div className="h-12 w-12 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0 ml-4">
                                    <MapPin className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 font-arabic">الانتشار الواسع</h3>
                                    <p className="text-gray-600 font-arabic">
                                        تواجدنا في العديد من المدن يمنحك المرونة في استلام وإرجاع السيارة في المكان الذي يناسبك.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <section className="py-16" dir="rtl">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-arabic">فريقنا</h2>
                            <p className="text-gray-600 font-arabic leading-relaxed">
                                خلف كل سيارة رائعة يقف فريق رائع. تعرف على الأشخاص الذين يجعلون تجربتك مميزة.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                            <div className="text-center">
                                <div className="mb-4 rounded-full overflow-hidden h-40 w-40 mx-auto shadow-md relative">
                                    <Image
                                        src="/images/boy1.jpeg"
                                        alt="عضو الفريق"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 font-arabic">أحمد الشهري</h3>
                                <p className="text-gray-600 font-arabic">المدير التنفيذي</p>
                            </div>

                            <div className="text-center">
                                <div className="mb-4 rounded-full overflow-hidden h-40 w-40 mx-auto shadow-md relative">
                                    <Image
                                        src="/images/boy2.jpeg"
                                        alt="عضو الفريق"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 font-arabic">سارة العتيبي</h3>
                                <p className="text-gray-600 font-arabic">مديرة العمليات</p>
                            </div>

                            <div className="text-center">
                                <div className="mb-4 rounded-full overflow-hidden h-40 w-40 mx-auto shadow-md relative">
                                    <Image
                                        src="/images/boy3.jpeg"
                                        alt="عضو الفريق"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 font-arabic">خالد الغامدي</h3>
                                <p className="text-gray-600 font-arabic">مدير خدمة العملاء</p>
                            </div>

                            <div className="text-center">
                                <div className="mb-4 rounded-full overflow-hidden h-40 w-40 mx-auto shadow-md relative">
                                    <Image
                                        src="/images/boy4.jpeg"
                                        alt="عضو الفريق"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 font-arabic">نورة القحطاني</h3>
                                <p className="text-gray-600 font-arabic">مديرة التسويق</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 bg-blue-600" dir="rtl">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto text-center">
                            <h2 className="text-3xl font-bold text-white mb-6 font-arabic">جاهز لتجربة خدماتنا؟</h2>
                            <p className="text-blue-100 mb-8 font-arabic text-lg">
                                استأجر سيارتك اليوم واستمتع بتجربة قيادة لا مثيل لها. أسطول متنوع من السيارات بانتظارك.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a
                                    href="/cars"
                                    className="inline-flex justify-center items-center px-8 py-3 bg-white hover:bg-gray-100 text-blue-700 font-bold rounded-lg transition-colors font-arabic text-lg"
                                >
                                    استكشف السيارات
                                </a>
                                <a
                                    href="/contact"
                                    className="inline-flex justify-center items-center px-8 py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-lg transition-colors border border-blue-500 font-arabic text-lg"
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
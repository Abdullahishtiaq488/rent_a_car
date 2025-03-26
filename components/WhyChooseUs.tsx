import {
    CarFront,
    ShieldCheck,
    Clock,
    MapPin,
    Headphones,
    Wallet
} from 'lucide-react';

export const WhyChooseUs = () => {
    const features = [
        {
            icon: <CarFront className="h-14 w-14 text-blue-600" />,
            title: 'تشكيلة واسعة من السيارات',
            description: 'نوفر مجموعة واسعة من السيارات الفاخرة والاقتصادية ودفع رباعي لتناسب جميع احتياجاتك.',
        },
        {
            icon: <ShieldCheck className="h-14 w-14 text-blue-600" />,
            title: 'سلامة وجودة مضمونة',
            description: 'جميع سياراتنا يتم صيانتها بانتظام وفحصها للتأكد من جودتها وسلامتها قبل تسليمها للعملاء.',
        },
        {
            icon: <Clock className="h-14 w-14 text-blue-600" />,
            title: 'حجز سريع وسهل',
            description: 'عملية الحجز لدينا سريعة وسهلة. يمكنك حجز سيارتك عبر الإنترنت في دقائق معدودة.',
        },
        {
            icon: <MapPin className="h-14 w-14 text-blue-600" />,
            title: 'مواقع استلام متعددة',
            description: 'نوفر خدمة استلام وتسليم السيارات في مواقع متعددة بما في ذلك المطارات الرئيسية.',
        },
        {
            icon: <Headphones className="h-14 w-14 text-blue-600" />,
            title: 'دعم على مدار الساعة',
            description: 'فريق خدمة العملاء لدينا متاح على مدار الساعة طوال أيام الأسبوع لمساعدتك في أي استفسار.',
        },
        {
            icon: <Wallet className="h-14 w-14 text-blue-600" />,
            title: 'أسعار تنافسية',
            description: 'نقدم أسعار تنافسية وعروض خاصة للإيجارات طويلة المدى والعملاء المنتظمين.',
        },
    ];

    return (
        <section className="py-24 bg-gradient-to-b from-white to-gray-50" dir="rtl">
            <div className="container mx-auto px-4">
                <div className="text-center mb-20">
                    <span className="inline-block text-blue-600 font-semibold mb-3 text-lg bg-blue-50 px-4 py-1 rounded-full font-arabic">لماذا تختارنا</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-arabic">ما يميزنا عن غيرنا</h2>
                    <p className="text-gray-600 max-w-3xl mx-auto font-arabic text-lg leading-relaxed">
                        نحن نلتزم بتقديم أفضل خدمات تأجير السيارات بأعلى معايير الجودة والاحترافية لنضمن لك تجربة سفر مريحة وممتعة.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-gray-100 group"
                        >
                            <div className="mb-6 flex justify-center">
                                <div className="p-4 bg-blue-50 rounded-full group-hover:bg-blue-100 transition-all duration-300">
                                    {feature.icon}
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center font-arabic group-hover:text-blue-600 transition-colors">{feature.title}</h3>
                            <p className="text-gray-600 text-center font-arabic text-lg leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}; 
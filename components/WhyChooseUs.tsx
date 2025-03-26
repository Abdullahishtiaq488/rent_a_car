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
            icon: <CarFront className="h-12 w-12 text-blue-600" />,
            title: 'تشكيلة واسعة من السيارات',
            description: 'نوفر مجموعة واسعة من السيارات الفاخرة والاقتصادية ودفع رباعي لتناسب جميع احتياجاتك.',
        },
        {
            icon: <ShieldCheck className="h-12 w-12 text-blue-600" />,
            title: 'سلامة وجودة مضمونة',
            description: 'جميع سياراتنا يتم صيانتها بانتظام وفحصها للتأكد من جودتها وسلامتها قبل تسليمها للعملاء.',
        },
        {
            icon: <Clock className="h-12 w-12 text-blue-600" />,
            title: 'حجز سريع وسهل',
            description: 'عملية الحجز لدينا سريعة وسهلة. يمكنك حجز سيارتك عبر الإنترنت في دقائق معدودة.',
        },
        {
            icon: <MapPin className="h-12 w-12 text-blue-600" />,
            title: 'مواقع استلام متعددة',
            description: 'نوفر خدمة استلام وتسليم السيارات في مواقع متعددة بما في ذلك المطارات الرئيسية.',
        },
        {
            icon: <Headphones className="h-12 w-12 text-blue-600" />,
            title: 'دعم على مدار الساعة',
            description: 'فريق خدمة العملاء لدينا متاح على مدار الساعة طوال أيام الأسبوع لمساعدتك في أي استفسار.',
        },
        {
            icon: <Wallet className="h-12 w-12 text-blue-600" />,
            title: 'أسعار تنافسية',
            description: 'نقدم أسعار تنافسية وعروض خاصة للإيجارات طويلة المدى والعملاء المنتظمين.',
        },
    ];

    return (
        <section className="py-20 bg-white" dir="rtl">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="inline-block text-blue-600 font-semibold mb-2 font-arabic">لماذا تختارنا</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-arabic">ما يميزنا عن غيرنا</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto font-arabic">
                        نحن نلتزم بتقديم أفضل خدمات تأجير السيارات بأعلى معايير الجودة والاحترافية لنضمن لك تجربة سفر مريحة وممتعة.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-gray-50 rounded-xl p-8 transition-transform hover:-translate-y-1 hover:shadow-md"
                        >
                            <div className="mb-6 flex justify-center">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3 text-center font-arabic">{feature.title}</h3>
                            <p className="text-gray-600 text-center font-arabic">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}; 
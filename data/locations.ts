export interface Location {
  id: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  openingHours: string;
  isMainBranch: boolean;
  mapUrl?: string;
  services: string[];
}

export const locations: Location[] = [
  {
    id: 'loc-001',
    name: 'الفرع الرئيسي',
    city: 'الرياض',
    address: 'طريق الملك فهد، حي العليا، الرياض',
    phone: '+966 11 000 0000',
    openingHours: '9:00 صباحاً - 11:00 مساءً',
    isMainBranch: true,
    services: ['تأجير', 'صيانة', 'تبديل', 'غسيل']
  },
  {
    id: 'loc-002',
    name: 'فرع شمال الرياض',
    city: 'الرياض',
    address: 'طريق الملك عبدالعزيز، حي الملقا، الرياض',
    phone: '+966 11 000 0001',
    openingHours: '9:00 صباحاً - 10:00 مساءً',
    isMainBranch: false,
    services: ['تأجير', 'صيانة']
  },
  {
    id: 'loc-003',
    name: 'فرع شرق الرياض',
    city: 'الرياض',
    address: 'طريق خالد بن الوليد، حي الروضة، الرياض',
    phone: '+966 11 000 0002',
    openingHours: '9:00 صباحاً - 10:00 مساءً',
    isMainBranch: false,
    services: ['تأجير', 'غسيل']
  },
  {
    id: 'loc-004',
    name: 'الفرع الرئيسي - جدة',
    city: 'جدة',
    address: 'طريق المدينة المنورة، حي الروضة، جدة',
    phone: '+966 12 000 0000',
    openingHours: '9:00 صباحاً - 11:00 مساءً',
    isMainBranch: true,
    services: ['تأجير', 'صيانة', 'تبديل', 'غسيل']
  },
  {
    id: 'loc-005',
    name: 'فرع شمال جدة',
    city: 'جدة',
    address: 'طريق الأمير محمد بن عبدالعزيز، حي الشاطئ، جدة',
    phone: '+966 12 000 0001',
    openingHours: '9:00 صباحاً - 10:00 مساءً',
    isMainBranch: false,
    services: ['تأجير', 'صيانة']
  },
  {
    id: 'loc-006',
    name: 'الفرع الرئيسي - الدمام',
    city: 'الدمام',
    address: 'طريق الملك فهد، حي الشاطئ، الدمام',
    phone: '+966 13 000 0000',
    openingHours: '9:00 صباحاً - 11:00 مساءً',
    isMainBranch: true,
    services: ['تأجير', 'صيانة', 'تبديل', 'غسيل']
  },
  {
    id: 'loc-007',
    name: 'فرع الخبر',
    city: 'الخبر',
    address: 'طريق الأمير فيصل بن فهد، حي اليرموك، الخبر',
    phone: '+966 13 000 0001',
    openingHours: '9:00 صباحاً - 10:00 مساءً',
    isMainBranch: false,
    services: ['تأجير', 'غسيل']
  },
  {
    id: 'loc-008',
    name: 'فرع مطار الملك خالد',
    city: 'الرياض',
    address: 'مطار الملك خالد الدولي، صالة المغادرة، الرياض',
    phone: '+966 11 000 0003',
    openingHours: '24 ساعة',
    isMainBranch: false,
    services: ['تأجير', 'استلام', 'تسليم']
  },
  {
    id: 'loc-009',
    name: 'فرع مطار الملك عبدالعزيز',
    city: 'جدة',
    address: 'مطار الملك عبدالعزيز الدولي، صالة المغادرة، جدة',
    phone: '+966 12 000 0002',
    openingHours: '24 ساعة',
    isMainBranch: false,
    services: ['تأجير', 'استلام', 'تسليم']
  },
  {
    id: 'loc-010',
    name: 'فرع مطار الملك فهد',
    city: 'الدمام',
    address: 'مطار الملك فهد الدولي، صالة المغادرة، الدمام',
    phone: '+966 13 000 0002',
    openingHours: '24 ساعة',
    isMainBranch: false,
    services: ['تأجير', 'استلام', 'تسليم']
  },
  {
    id: 'loc-011',
    name: 'الفرع الرئيسي - مكة',
    city: 'مكة المكرمة',
    address: 'شارع إبراهيم الخليل، حي الهجرة، مكة المكرمة',
    phone: '+966 12 000 0003',
    openingHours: '9:00 صباحاً - 10:00 مساءً',
    isMainBranch: true,
    services: ['تأجير', 'صيانة', 'غسيل']
  },
  {
    id: 'loc-012',
    name: 'الفرع الرئيسي - المدينة',
    city: 'المدينة المنورة',
    address: 'طريق الملك عبدالله، حي العزيزية، المدينة المنورة',
    phone: '+966 14 000 0000',
    openingHours: '9:00 صباحاً - 10:00 مساءً',
    isMainBranch: true,
    services: ['تأجير', 'صيانة', 'غسيل']
  }
]; 
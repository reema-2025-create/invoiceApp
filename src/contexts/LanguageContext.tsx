import { createContext, useContext, useState, ReactNode } from "react";

type Language = "ar" | "en" | "zh";

interface Translations {
  title: string;
  subtitle: string;
  companyName: string;
  companyNamePlaceholder: string;
  address: string;
  addressPlaceholder: string;
  phone: string;
  phonePlaceholder: string;
  email: string;
  emailPlaceholder: string;
  invoiceNumber: string;
  invoiceNumberPlaceholder: string;
  date: string;
  paymentMethod: string;
  paymentMethodPlaceholder: string;
  currency: string;
  currencyPlaceholder: string;
  exporterTitle: string;
  exporterName: string;
  exporterNamePlaceholder: string;
  exporterAddress: string;
  exporterAddressPlaceholder: string;
  exporterContact: string;
  exporterContactPlaceholder: string;
  importerTitle: string;
  importerName: string;
  importerNamePlaceholder: string;
  importerAddress: string;
  importerAddressPlaceholder: string;
  importerContact: string;
  importerContactPlaceholder: string;
  items: string;
  addItem: string;
  itemNumber: string;
  description: string;
  descriptionPlaceholder: string;
  quantity: string;
  unit: string;
  unitPlaceholder: string;
  unitPrice: string;
  total: string;
  subtotal: string;
  shipping: string;
  insurance: string;
  grandTotal: string;
  incoterms: string;
  incotermsPlaceholder: string;
  bankDetails: string;
  bankName: string;
  bankNamePlaceholder: string;
  accountNumber: string;
  accountNumberPlaceholder: string;
  swiftCode: string;
  swiftCodePlaceholder: string;
  iban: string;
  ibanPlaceholder: string;
  print: string;
  newInvoice: string;
}

const translations: Record<Language, Translations> = {
  ar: {
    title: "فاتورة تجارية",
    subtitle: "نظام فواتير احترافي",
    companyName: "اسم الشركة",
    companyNamePlaceholder: "أدخل اسم شركتك",
    address: "العنوان",
    addressPlaceholder: "أدخل عنوان الشركة",
    phone: "الهاتف",
    phonePlaceholder: "+966 XXX XXX XXX",
    email: "البريد الإلكتروني",
    emailPlaceholder: "info@company.com",
    invoiceNumber: "رقم الفاتورة",
    invoiceNumberPlaceholder: "INV-001",
    date: "التاريخ",
    paymentMethod: "طريقة الدفع",
    paymentMethodPlaceholder: "تحويل بنكي / نقد",
    currency: "$",
    currencyPlaceholder: "العملة",
    exporterTitle: "بيانات المصدّر",
    exporterName: "اسم المصدّر",
    exporterNamePlaceholder: "أدخل اسم المصدّر",
    exporterAddress: "عنوان المصدّر",
    exporterAddressPlaceholder: "أدخل عنوان المصدّر",
    exporterContact: "بيانات التواصل",
    exporterContactPlaceholder: "هاتف، إيميل",
    importerTitle: "بيانات المستورد",
    importerName: "اسم المستورد",
    importerNamePlaceholder: "أدخل اسم المستورد",
    importerAddress: "عنوان المستورد",
    importerAddressPlaceholder: "أدخل عنوان المستورد",
    importerContact: "بيانات التواصل",
    importerContactPlaceholder: "هاتف، إيميل",
    items: "تفاصيل البضاعة",
    addItem: "إضافة صنف",
    itemNumber: "رقم",
    description: "وصف البضاعة",
    descriptionPlaceholder: "أدخل وصف البضاعة",
    quantity: "الكمية",
    unit: "الوحدة",
    unitPlaceholder: "كجم/قطعة/صندوق",
    unitPrice: "سعر الوحدة",
    total: "المجموع",
    subtotal: "الإجمالي الفرعي:",
    shipping: "الشحن:",
    insurance: "التأمين:",
    grandTotal: "الإجمالي الكلي:",
    incoterms: "شروط التسليم (Incoterms)",
    incotermsPlaceholder: "FOB / CIF / EXW",
    bankDetails: "معلومات التحويل البنكي",
    bankName: "اسم البنك",
    bankNamePlaceholder: "أدخل اسم البنك",
    accountNumber: "رقم الحساب",
    accountNumberPlaceholder: "XXXX XXXX XXXX",
    swiftCode: "رمز SWIFT",
    swiftCodePlaceholder: "SWIFT CODE",
    iban: "رقم IBAN",
    ibanPlaceholder: "SA XX XXXX XXXX XXXX XXXX XXXX",
    print: "طباعة الفاتورة",
    newInvoice: "فاتورة جديدة"
  },
  en: {
    title: "Commercial Invoice",
    subtitle: "Professional Invoice System",
    companyName: "Company Name",
    companyNamePlaceholder: "Enter your company name",
    address: "Address",
    addressPlaceholder: "Enter company address",
    phone: "Phone",
    phonePlaceholder: "+1 XXX XXX XXXX",
    email: "Email",
    emailPlaceholder: "info@company.com",
    invoiceNumber: "Invoice Number",
    invoiceNumberPlaceholder: "INV-001",
    date: "Date",
    paymentMethod: "Payment Method",
    paymentMethodPlaceholder: "Wire Transfer / Cash",
    currency: "$",
    currencyPlaceholder: "Currency",
    exporterTitle: "Seller / Exporter Details",
    exporterName: "Seller Name",
    exporterNamePlaceholder: "Enter seller name",
    exporterAddress: "Seller Address",
    exporterAddressPlaceholder: "Enter seller address",
    exporterContact: "Contact Information",
    exporterContactPlaceholder: "Phone, Email",
    importerTitle: "Buyer / Importer Details",
    importerName: "Buyer Name",
    importerNamePlaceholder: "Enter buyer name",
    importerAddress: "Buyer Address",
    importerAddressPlaceholder: "Enter buyer address",
    importerContact: "Contact Information",
    importerContactPlaceholder: "Phone, Email",
    items: "Item Details",
    addItem: "Add Item",
    itemNumber: "No.",
    description: "Item Description",
    descriptionPlaceholder: "Enter item description",
    quantity: "Quantity",
    unit: "Unit",
    unitPlaceholder: "kg/pcs/box",
    unitPrice: "Unit Price",
    total: "Total",
    subtotal: "Subtotal:",
    shipping: "Shipping:",
    insurance: "Insurance:",
    grandTotal: "Grand Total:",
    incoterms: "Incoterms",
    incotermsPlaceholder: "FOB / CIF / EXW",
    bankDetails: "Bank Transfer Details",
    bankName: "Bank Name",
    bankNamePlaceholder: "Enter bank name",
    accountNumber: "Account Number",
    accountNumberPlaceholder: "XXXX XXXX XXXX",
    swiftCode: "SWIFT Code",
    swiftCodePlaceholder: "SWIFT CODE",
    iban: "IBAN",
    ibanPlaceholder: "XX XX XXXX XXXX XXXX XXXX XXXX",
    print: "Print Invoice",
    newInvoice: "New Invoice"
  },
  zh: {
    title: "商业发票",
    subtitle: "专业发票系统",
    companyName: "公司名称",
    companyNamePlaceholder: "输入公司名称",
    address: "地址",
    addressPlaceholder: "输入公司地址",
    phone: "电话",
    phonePlaceholder: "+86 XXX XXXX XXXX",
    email: "电子邮件",
    emailPlaceholder: "info@company.com",
    invoiceNumber: "发票号码",
    invoiceNumberPlaceholder: "INV-001",
    date: "日期",
    paymentMethod: "付款方式",
    paymentMethodPlaceholder: "电汇/现金",
    currency: "¥",
    currencyPlaceholder: "货币",
    exporterTitle: "卖方/出口商详情",
    exporterName: "卖方名称",
    exporterNamePlaceholder: "输入卖方名称",
    exporterAddress: "卖方地址",
    exporterAddressPlaceholder: "输入卖方地址",
    exporterContact: "联系信息",
    exporterContactPlaceholder: "电话、电子邮件",
    importerTitle: "买方/进口商详情",
    importerName: "买方名称",
    importerNamePlaceholder: "输入买方名称",
    importerAddress: "买方地址",
    importerAddressPlaceholder: "输入买方地址",
    importerContact: "联系信息",
    importerContactPlaceholder: "电话、电子邮件",
    items: "物品详情",
    addItem: "添加物品",
    itemNumber: "序号",
    description: "物品描述",
    descriptionPlaceholder: "输入物品描述",
    quantity: "数量",
    unit: "单位",
    unitPlaceholder: "公斤/件/箱",
    unitPrice: "单价",
    total: "总计",
    subtotal: "小计：",
    shipping: "运费：",
    insurance: "保险：",
    grandTotal: "总计：",
    incoterms: "国际贸易术语",
    incotermsPlaceholder: "FOB / CIF / EXW",
    bankDetails: "银行转账详情",
    bankName: "银行名称",
    bankNamePlaceholder: "输入银行名称",
    accountNumber: "账号",
    accountNumberPlaceholder: "XXXX XXXX XXXX",
    swiftCode: "SWIFT代码",
    swiftCodePlaceholder: "SWIFT CODE",
    iban: "IBAN",
    ibanPlaceholder: "XX XX XXXX XXXX XXXX XXXX XXXX",
    print: "打印发票",
    newInvoice: "新发票"
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof Translations) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("ar");

  const t = (key: keyof Translations) => {
    return translations[language][key];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
};

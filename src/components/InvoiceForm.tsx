import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Plus, 
  Trash2, 
  Printer, 
  Moon, 
  Sun, 
  Languages,
  Building2,
  User,
  Package,
  CreditCard,
  Ship,
  Shield,
  Landmark
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unit: string;
  price: number;
}

const InvoiceForm = () => {
  const { language, setLanguage, t } = useLanguage();
  
  // Company Info
  const [companyName, setCompanyName] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [companyPhone, setCompanyPhone] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  
  // Invoice Info
  const [invoiceCounter, setInvoiceCounter] = useState(1);
  const [invoiceNumber, setInvoiceNumber] = useState("INV-001");
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [currency, setCurrency] = useState(t('currency'));
  
  // Customer/Importer
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  
  // Items
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: "1", description: "", quantity: 1, unit: "", price: 0 }
  ]);
  
  // Signature
  const [signatureText, setSignatureText] = useState("");
  
  const [isDark, setIsDark] = useState(false);
  
  const isRTL = language === 'ar';

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const addItem = () => {
    setItems([...items, { 
      id: Date.now().toString(), 
      description: "", 
      quantity: 1, 
      unit: "", 
      price: 0 
    }]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const total = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);

  const handlePrint = () => {
    window.print();
  };

  const handleNewInvoice = () => {
    const newCounter = invoiceCounter + 1;
    setInvoiceCounter(newCounter);
    setInvoiceNumber(`INV-${String(newCounter).padStart(3, '0')}`);
    setInvoiceDate(new Date().toISOString().split('T')[0]);
    setPaymentMethod("");
    setCustomerName("");
    setCustomerAddress("");
    setCustomerPhone("");
    setItems([{ id: "1", description: "", quantity: 1, unit: "", price: 0 }]);
    setSignatureText("");
  };

  return (
    <div className="min-h-screen bg-muted/30 py-8 px-4 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Header Controls */}
        <div className="flex justify-between items-center mb-6 no-print gap-4">
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-lg shadow-sm hover:shadow-md transition-all"
                >
                  <Languages className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={() => setLanguage('ar')}>
                  العربية
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('en')}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('zh')}>
                  中文
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsDark(!isDark)}
              className="rounded-lg shadow-sm hover:shadow-md transition-all"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
          
          <div className="text-center flex-1">
            <h1 className="text-3xl font-bold text-primary mb-1">
              {t('title')}
            </h1>
            <p className="text-sm text-muted-foreground">{t('subtitle')}</p>
          </div>
          
          <div className="w-[88px]"></div>
        </div>

        <Card className="p-12 shadow-xl border-2 invoice-container bg-card" dir={isRTL ? "rtl" : "ltr"}>
          {/* Company Header */}
          <div className="text-center mb-10 pb-8 border-b-2 border-primary/30">
            <div className="mb-5">
              <Building2 className="w-20 h-20 mx-auto text-primary mb-3" />
            </div>
            <Input 
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder={t('companyNamePlaceholder')}
              className="font-bold text-4xl text-center mb-4 border-none bg-transparent"
            />
            <div className="space-y-2 text-base text-muted-foreground">
              <Input 
                value={companyAddress}
                onChange={(e) => setCompanyAddress(e.target.value)}
                placeholder={t('addressPlaceholder')}
                className="text-center border-none bg-transparent h-10 text-base"
              />
              <div className="flex justify-center gap-6 text-base">
                <Input 
                  value={companyPhone}
                  onChange={(e) => setCompanyPhone(e.target.value)}
                  placeholder={t('phonePlaceholder')}
                  className="text-center border-none bg-transparent h-10 w-auto text-base"
                />
                <Input 
                  value={companyEmail}
                  onChange={(e) => setCompanyEmail(e.target.value)}
                  placeholder={t('emailPlaceholder')}
                  className="text-center border-none bg-transparent h-10 w-auto text-base"
                />
              </div>
            </div>
          </div>

          {/* Invoice Info */}
          <div className="mb-8 pb-6 border-b-2 border-border">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-bold text-muted-foreground">{t('invoiceNumber')}</Label>
                <Input 
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  className="h-11 font-bold text-lg"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-bold text-muted-foreground">{t('date')}</Label>
                <Input 
                  type="date"
                  value={invoiceDate}
                  onChange={(e) => setInvoiceDate(e.target.value)}
                  className="h-11 text-base"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-bold text-muted-foreground">{t('paymentMethod')}</Label>
                <Input 
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  placeholder={t('paymentMethodPlaceholder')}
                  className="h-11 text-base"
                />
              </div>
            </div>
          </div>

          {/* Customer Info */}
          <div className="mb-8 p-6 bg-muted/40 rounded-lg border-2 border-border shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <User className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-bold text-primary">{t('importerTitle')}</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <Input 
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder={t('importerNamePlaceholder')}
                className="h-11 text-base font-medium"
              />
              <Input 
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
                placeholder={t('importerAddressPlaceholder')}
                className="h-11 text-base"
              />
              <Input 
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder={t('exporterContactPlaceholder')}
                className="h-11 text-base"
              />
            </div>
          </div>

          {/* Items Table */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-5">
              <div className="flex items-center gap-3">
                <Package className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-bold text-primary">{t('items')}</h3>
              </div>
              <Button onClick={addItem} size="lg" className="no-print gap-2 shadow-md h-11 px-6 text-base">
                <Plus className="w-5 h-5" />
                {t('addItem')}
              </Button>
            </div>
            
            <div className="border-2 rounded-lg overflow-hidden shadow-sm">
              <table className="w-full">
                <thead className="bg-primary text-primary-foreground">
                  <tr>
                    <th className="p-4 text-center w-16 font-bold text-base">#</th>
                    <th className={`p-4 ${isRTL ? 'text-right' : 'text-left'} font-bold text-base`}>{t('description')}</th>
                    <th className="p-4 text-center w-28 font-bold text-base">{t('quantity')}</th>
                    <th className="p-4 text-center w-32 font-bold text-base">{t('unitPrice')}</th>
                    <th className="p-4 text-center w-40 font-bold text-base">{t('total')}</th>
                    <th className="p-4 w-16 no-print"></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={item.id} className={`border-t-2 ${index % 2 === 0 ? 'bg-muted/30' : 'bg-background'}`}>
                      <td className="p-4 text-center font-bold text-base text-muted-foreground">{index + 1}</td>
                      <td className="p-4">
                        <Input 
                          value={item.description}
                          onChange={(e) => updateItem(item.id, "description", e.target.value)}
                          placeholder={t('descriptionPlaceholder')}
                          className="h-11 text-base border-none bg-transparent font-medium"
                        />
                      </td>
                      <td className="p-4">
                        <Input 
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateItem(item.id, "quantity", parseInt(e.target.value) || 1)}
                          className="text-center h-11 text-base font-semibold"
                        />
                      </td>
                      <td className="p-4">
                        <Input 
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.price}
                          onChange={(e) => updateItem(item.id, "price", parseFloat(e.target.value) || 0)}
                          className="text-center h-11 text-base font-semibold"
                        />
                      </td>
                      <td className="p-4 text-center font-bold text-lg text-primary">
                        {(item.quantity * item.price).toFixed(2)} {currency}
                      </td>
                      <td className="p-4 text-center no-print">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          disabled={items.length === 1}
                          className="h-10 w-10 p-0"
                        >
                          <Trash2 className="w-5 h-5 text-destructive" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Total */}
          <div className="flex justify-end mb-8">
            <div className="w-full md:w-2/5">
              <div className="flex justify-between items-center p-6 bg-primary text-primary-foreground rounded-lg shadow-lg border-2 border-primary">
                <span className="text-xl font-bold">{t('grandTotal')}</span>
                <span className="text-3xl font-bold">{total.toFixed(2)} {currency}</span>
              </div>
            </div>
          </div>

          {/* Signature */}
          <div className="mt-10 pt-8 border-t-2 border-border">
            <div className="text-center">
              <Label className="text-base font-bold text-muted-foreground mb-3 block">{t('exporterTitle')} - التوقيع والختم</Label>
              <div className="mt-12 pt-6 border-t-2 border-dashed border-border inline-block px-16">
                <Input 
                  value={signatureText}
                  onChange={(e) => setSignatureText(e.target.value)}
                  placeholder="التوقيع"
                  className="text-center border-none bg-transparent font-bold text-lg"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-10 pt-8 border-t-2 flex justify-center gap-6 no-print">
            <Button onClick={handleNewInvoice} size="lg" variant="outline" className="gap-3 h-14 px-10 text-base font-bold shadow-md">
              <Plus className="w-6 h-6" />
              {t('newInvoice')}
            </Button>
            <Button onClick={handlePrint} size="lg" className="gap-3 h-14 px-10 text-base font-bold shadow-lg">
              <Printer className="w-6 h-6" />
              {t('print')}
            </Button>
          </div>
        </Card>
      </div>

      <style>{`
        @media print {
          .no-print {
            display: none !important;
          }
          .invoice-container {
            box-shadow: none !important;
            border: 1px solid #e5e7eb !important;
          }
          body {
            background: white !important;
          }
          input, textarea {
            border: none !important;
            background: transparent !important;
            padding: 0 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default InvoiceForm;

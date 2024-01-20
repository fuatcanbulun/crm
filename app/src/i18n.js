// i18n.js

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {},
  },
  tr: {
    translation: {
      accounting: "Muhasebe",
      accountingType: "Muhasebe Tipi",
      address: "Adres",
      amount: "Miktar",
      appointment: "Randevu",
      appointmentCalendar: "Randevu Takvimi",
      appointmentList: "Randevu Listesi",
      appointments: "Randevular",
      appointmentType: "Randevu Tipi",
      breaking: "Kırılma",
      calls: "Aramalar",
      cancel: "Vazgeç",
      card: "Kart",
      cash: "Nakit",
      city: "Şehir",
      createdAt: "Oluşturulma",
      createdBy: "Oluşturan",
      currencyType: "Para Birimi Tipi",
      customer: "Müşteri",
      daily: "Günlük",
      date: "Tarih",
      email: "e-posta",
      expense: "Gider",
      expenseType: "Gider Tipi",
      explanation: "Açıklama",
      firstName: "Ad",
      female: "Kadın",
      gender: "Cinsiyet",
      general: "Genel",
      giro: "Giro",
      hairCare: "Saç Bakımı",
      income: "Gelir",
      incomeExpense: "Gelir-Gider",
      incomeType: "Gelir Tipi",
      lastName: "Soyad",
      male: "Erkek",
      meeting: "Görüşme",
      monthly: "Aylık",
      notes: "Notlar",
      other: "Diğer",
      paymentType: "Ödeme Tipi",
      persons: "Kişiler",
      personsList: "Kişi Listesi",
      personType: "Kişi Tipi",
      phone1: "Telefon 1",
      phone2: "Telefon 2",
      productDefinitions: "Ürün Tanımları",
      productList: "Ürün Listesi",
      products: "Ürünler",
      productSale: "Ürün Satışı",
      save: "Kaydet",
      stock: "Stok",
      time: "Zaman",
      tl: "TL",
      usd: "USD",
      weekly: "Haftalık",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "tr", // Başlangıç dilini belirleyin
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

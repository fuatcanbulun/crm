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
      accounting_analysis: "Muhasebe Analiz",
      accounting_list: "Muhasebe Listesi",
      accounting_model: "Muhasebe Modeli",
      accounting_type: "Muhasebe Tipi",
      address: "Adres",
      amount: "Miktar",
      appointment: "Randevu",
      appointment_calendar: "Randevu Takvimi",
      appointment_list: "Randevu Listesi",
      appointments: "Randevular",
      appointment_status: "Randevu Durumu",
      appointment_type: "Randevu Tipi",
      brand: "Marka",
      brands: "Markalar",
      breaking: "Kırılma",
      calls: "Aramalar",
      cancel: "Vazgeç",
      card: "Kart",
      cash: "Nakit",
      city: "Şehir",
      created_at: "Oluşturulma",
      created_by: "Oluşturan",
      currency_type: "Para Birimi Tipi",
      customer: "Müşteri",
      daily: "Günlük",
      date: "Tarih",
      date_of_birth: "Doğum Tarihi",
      definition: "Tanım",
      delete: "Sil",
      delete_accounting: "Muhasebe Kaydı Sil",
      delete_appointment: "Randevu Sil",
      delete_brand: "Marka Sil",
      delete_person: "Kişi Sil",
      delete_product: "Ürün Sil",
      description: "Açıklama",
      detail: "Detay",
      edit: "Düzenle",
      edit_accounting: "Muhasebe Kaydı Düzenle",
      edit_appointment: "Randevu Düzenle",
      edit_brand: "Marka Düzenle",
      edit_person: "Kişi Düzenle",
      edit_product: "Ürün Düzenle",
      email: "e-Posta",
      end_time: "Bitiş Saati",
      error: "Hata",
      expense: "Gider",
      expense_type: "Gider Tipi",
      explanation: "Açıklama",
      first_name: "Ad",
      female: "Kadın",
      gender: "Cinsiyet",
      gender_type: "Cinsiyet Tipi",
      general: "Genel",
      giro: "Giro",
      glue: "Yapıştırıcı",
      hairCare: "Saç Bakımı",
      income: "Gelir",
      income_expense: "Gelir-Gider",
      income_type: "Gelir Tipi",
      last_name: "Soyad",
      login: "Giriş Yap",
      male: "Erkek",
      meeting: "Görüşme",
      monthly: "Aylık",
      movement_type: "Hareket Tipi",
      name: "İsim",
      new: "Yeni",
      new_accounting: "Yeni Muhasebe Kaydı",
      new_appointment: "Yeni Randevu",
      new_brand: "Yeni Marka",
      new_entry: "Yeni Kayıt",
      new_product: "Yeni Ürün",
      no: "Hayır",
      note: "Not",
      new_note: "Yeni Not",
      new_person: "Yeni Kişi",
      note: "Not",
      notes: "Notlar",
      other: "Diğer",
      password: "Şifre",
      payment_type: "Ödeme Tipi",
      person: "Kişi",
      person_name: "Kişi",
      persons: "Kişiler",
      persons_list: "Kişi Listesi",
      person_type: "Kişi Tipi",
      phone1: "Telefon 1",
      phone2: "Telefon 2",
      piece: "Adet",
      product: "Ürün",
      product_definitions: "Ürün Tanımları",
      product_list: "Ürün Listesi",
      products: "Ürünler",
      product_sale: "Ürün Satışı",
      product_type: "Ürün Tipi",
      prosthetic_hair: "Protez Saç",
      related_person: "İlgili Kişi",
      save: "Kaydet",
      start_time: "Başlangıç Saati",
      stock: "Stok",
      stock_content: "Stok İçeriği",
      stock_list: "Stok Listesi",
      stock_in: "Stok Girişi",
      stock_movement: "Stok Hareketi",
      stock_movements: "Stok Hareketleri",
      stock_out: "Stok Çıkışı",
      success: "Başarılı",
      time: "Zaman",
      tl: "TL",
      unit: "Birim",
      usd: "USD",
      yes: "Evet",
      weekly: "Haftalık",

      validation_email: "Lütfen geçerli bir e-posta giriniz",
      validation_max_50_characters:
        "Bu alana maksimum 50 karakter girilebilir.",
      validation_min_2_characters: "Bu alana minimum 2 karakter girilebilir.",
      validation_only_letters: "Bu alana sadece harf girilebilir.",
      validation_required: "Bu alanın doldurulması zorunludur.",
      validation_required_selection: "Bu alanın seçilmesi zorunludur.",

      message_appointment_created: "Randevu oluşturuldu.",
      message_appointment_deleted: "Randevu silindi.",
      message_appointment_updated: "Randevu güncellendi",
      message_note_created: "Not oluşturuldu.",
      message_note_deleted: "Not silindi.",
      message_note_updated: "Not güncellendi",
      message_person_created: "Kişi oluşturuldu.",
      message_person_deleted: "Kişi silindi.",
      message_person_updated: "Kişi Güncellendi",
      message_stock_updated: "Stok Güncellendi",
      message_stock_deleted: "Stok Silindi",
      message_stock_dropped: "Stoktan Düşüldü",
      message_accounting_created: "Muhasebe kaydı oluşturuldu.",
      message_accounting_deleted: "Muhasebe kaydı silindi.",
      message_accounting_updated: "Muhasebe kaydı güncellendi",
      message_product_created: "Ürün kaydı oluşturuldu.",
      message_product_deleted: "Ürün kaydı silindi.",
      message_product_updated: "Ürün kaydı güncellendi",
      message_brand_created: "Marka kaydı oluşturuldu.",
      message_brand_deleted: "Marka kaydı silindi.",
      message_brand_updated: "Marka kaydı güncellendi",

      message_sure_to_delete: "Silmek istediğinizden emin misiniz?",
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

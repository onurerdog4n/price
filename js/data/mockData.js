/**
 * Mock Data for Product Comparison
 * This file provides sample data for development and testing
 */

export const mockProducts = [
  {
    id: 1,
    name: "Apple iPhone 13 128GB",
    details: "6.1\" Super Retina XDR, A15 Bionic",
    sku: "APIP13-128",
    imageUrl: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-pink-select-2021?wid=470&hei=556&fmt=jpeg&qlt=95&.v=1629842709000",
    url: "https://www.apple.com/tr/iphone-13/",
    skuLowest: {
      price: "24.999₺",
      store: "Trendyol",
      date: "2023-05-15",
      url: "https://www.trendyol.com/apple/iphone-13-128-gb-p-153602579"
    },
    stores: [
      {
        name: "Trendyol",
        price: "24.999₺",
        date: "2023-05-15",
        seller: "Apple Türkiye",
        hasShipping: true,
        hasTag: true,
        isLowestPrice: true,
        hasUrl: true,
        url: "https://www.trendyol.com/apple/iphone-13-128-gb-p-153602579"
      },
      {
        name: "Hepsiburada",
        price: "25.499₺",
        date: "2023-05-14",
        seller: "Hepsiburada",
        hasShipping: true,
        hasTag: false,
        isLowestPrice: false,
        hasUrl: true,
        url: "https://www.hepsiburada.com/apple-iphone-13-128-gb-p-HBCV00000RKVA9"
      },
      {
        name: "Amazon",
        price: "25.699₺",
        date: "2023-05-16",
        seller: "Amazon",
        hasShipping: true,
        hasTag: true,
        isLowestPrice: false,
        hasUrl: true,
        url: "https://www.amazon.com.tr/Apple-iPhone-13-128-GB/dp/B09G9HD6PD"
      },
      {
        name: "Mediamarkt",
        price: "25.999₺",
        date: "2023-05-13",
        seller: "Mediamarkt",
        hasShipping: true,
        hasTag: false,
        isLowestPrice: false,
        hasUrl: true,
        url: "https://www.mediamarkt.com.tr/tr/product/_apple-iphone-13-128-gb-ak%C4%B1ll%C4%B1-telefon-1212835.html"
      },
      {
        name: "Vatan",
        price: "26.499₺",
        date: "2023-05-12",
        seller: "Vatan Bilgisayar",
        hasShipping: true,
        hasTag: false,
        isLowestPrice: false,
        hasUrl: true,
        url: "https://www.vatanbilgisayar.com/apple-iphone-13-128-gb.html"
      },
      {
        name: "Teknosa",
        price: "26.999₺",
        date: "2023-05-11",
        seller: "Teknosa",
        hasShipping: true,
        hasTag: true,
        isLowestPrice: false,
        hasUrl: true,
        url: "https://www.teknosa.com/apple-iphone-13-128-gb-p-125095178"
      }
    ]
  },
  {
    id: 2,
    name: "Samsung Galaxy S23 Ultra 256GB",
    details: "6.8\" Dynamic AMOLED 2X, Snapdragon 8 Gen 2",
    sku: "SAMS23U-256",
    imageUrl: "https://images.samsung.com/is/image/samsung/p6pim/tr/2302/gallery/tr-galaxy-s23-ultra-s918-sm-s918bzkctur-534848879?$650_519_PNG$",
    url: "https://www.samsung.com/tr/smartphones/galaxy-s23-ultra/",
    skuLowest: {
      price: "39.999₺",
      store: "Amazon",
      date: "2023-05-16",
      url: "https://www.amazon.com.tr/Samsung-Galaxy-S23-Ultra-256/dp/B0BSXB4L5N"
    },
    stores: [
      {
        name: "Trendyol",
        price: "40.999₺",
        date: "2023-05-15",
        seller: "Samsung Türkiye",
        hasShipping: true,
        hasTag: true,
        isLowestPrice: false,
        hasUrl: true,
        url: "https://www.trendyol.com/samsung/galaxy-s23-ultra-256-gb-p-698432145"
      },
      {
        name: "Hepsiburada",
        price: "41.499₺",
        date: "2023-05-14",
        seller: "Hepsiburada",
        hasShipping: true,
        hasTag: false,
        isLowestPrice: false,
        hasUrl: true,
        url: "https://www.hepsiburada.com/samsung-galaxy-s23-ultra-256-gb-p-HBCV00002RKVA9"
      },
      {
        name: "Amazon",
        price: "39.999₺",
        date: "2023-05-16",
        seller: "Amazon",
        hasShipping: true,
        hasTag: true,
        isLowestPrice: true,
        hasUrl: true,
        url: "https://www.amazon.com.tr/Samsung-Galaxy-S23-Ultra-256/dp/B0BSXB4L5N"
      },
      {
        name: "Mediamarkt",
        price: "42.999₺",
        date: "2023-05-13",
        seller: "Mediamarkt",
        hasShipping: true,
        hasTag: false,
        isLowestPrice: false,
        hasUrl: true,
        url: "https://www.mediamarkt.com.tr/tr/product/_samsung-galaxy-s23-ultra-256-gb-ak%C4%B1ll%C4%B1-telefon-1212836.html"
      },
      {
        name: "Vatan",
        price: "43.499₺",
        date: "2023-05-12",
        seller: "Vatan Bilgisayar",
        hasShipping: true,
        hasTag: false,
        isLowestPrice: false,
        hasUrl: true,
        url: "https://www.vatanbilgisayar.com/samsung-galaxy-s23-ultra-256-gb.html"
      },
      {
        name: "Teknosa",
        price: "43.999₺",
        date: "2023-05-11",
        seller: "Teknosa",
        hasShipping: true,
        hasTag: true,
        isLowestPrice: false,
        hasUrl: true,
        url: "https://www.teknosa.com/samsung-galaxy-s23-ultra-256-gb-p-125095179"
      }
    ]
  },
  {
    id: 3,
    name: "Apple MacBook Air M2 8GB 256GB",
    details: "13.6\" Liquid Retina, Apple M2 chip",
    sku: "APMBA-M2-256",
    imageUrl: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/macbook-air-midnight-select-20220606?wid=452&hei=420&fmt=jpeg&qlt=95&.v=1653084303665",
    url: "https://www.apple.com/tr/macbook-air-m2/",
    skuLowest: {
      price: "32.999₺",
      store: "Amazon",
      date: "2023-05-16",
      url: "https://www.amazon.com.tr/Apple-MacBook-Air-M2-256GB/dp/B0B3C5HBPQ"
    },
    stores: [
      {
        name: "Trendyol",
        price: "33.999₺",
        date: "2023-05-15",
        seller: "Apple Türkiye",
        hasShipping: true,
        hasTag: true,
        isLowestPrice: false,
        hasUrl: true,
        url: "https://www.trendyol.com/apple/macbook-air-13-6-m2-8gb-256gb-ssd-p-341245698"
      },
      {
        name: "Hepsiburada",
        price: "34.499₺",
        date: "2023-05-14",
        seller: "Hepsiburada",
        hasShipping: true,
        hasTag: false,
        isLowestPrice: false,
        hasUrl: true,
        url: "https://www.hepsiburada.com/apple-macbook-air-m2-8gb-256gb-ssd-p-HBCV00003RKVA9"
      },
      {
        name: "Amazon",
        price: "32.999₺",
        date: "2023-05-16",
        seller: "Amazon",
        hasShipping: true,
        hasTag: true,
        isLowestPrice: true,
        hasUrl: true,
        url: "https://www.amazon.com.tr/Apple-MacBook-Air-M2-256GB/dp/B0B3C5HBPQ"
      },
      {
        name: "Mediamarkt",
        price: "34.999₺",
        date: "2023-05-13",
        seller: "Mediamarkt",
        hasShipping: true,
        hasTag: false,
        isLowestPrice: false,
        hasUrl: true,
        url: "https://www.mediamarkt.com.tr/tr/product/_apple-macbook-air-13-6-m2-8gb-256gb-ssd-1212837.html"
      },
      {
        name: "Vatan",
        price: "35.499₺",
        date: "2023-05-12",
        seller: "Vatan Bilgisayar",
        hasShipping: true,
        hasTag: false,
        isLowestPrice: false,
        hasUrl: true,
        url: "https://www.vatanbilgisayar.com/apple-macbook-air-m2-8gb-256gb-ssd.html"
      },
      {
        name: "Teknosa",
        price: "35.999₺",
        date: "2023-05-11",
        seller: "Teknosa",
        hasShipping: true,
        hasTag: true,
        isLowestPrice: false,
        hasUrl: true,
        url: "https://www.teknosa.com/apple-macbook-air-m2-8gb-256gb-ssd-p-125095180"
      }
    ]
  }
];

// Default store order
export const defaultStoreOrder = [
  "Trendyol",
  "Hepsiburada",
  "Amazon",
  "Mediamarkt",
  "Vatan",
  "Teknosa",
  "PTTAvm",
  "İtopya",
  "İncehesap",
  "Nethouse",
  "Apple",
  "Beymen",
  "Pazarama",
  "A101",
  "Net Sipariş",
  "Ucuz Sepet",
  "Orkatek",
  "Oktostore",
  "Forsan",
  "Sinerji Gen TR",
  "Ebrar Bilgisayar",
  "Gamemar"
];

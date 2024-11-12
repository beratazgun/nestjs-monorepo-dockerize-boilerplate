# NestJS Monorepo Dockerize Boilerplate

Bu proje, NestJS kullanarak oluşturulmuş bir monorepo yapısıdır ve Docker ile containerize edilmiştir. Proje, iki ayrı uygulama (`monorepo-1` ve `monorepo-2`) ve ortak kullanılan kütüphaneleri (`libs/common`) içermektedir.

## Proje Yapısı

- **apps/monorepo-1**: İlk uygulama.
- **apps/monorepo-2**: İkinci uygulama.
- **libs/common**: Ortak kullanılan kütüphaneler.
- **cli**: Komut satırı arayüzü (CLI) komutları.
- **config**: Konfigürasyon dosyaları.
- **docker**: Docker ile ilgili dosyalar.
- **prisma**: Prisma ORM ile ilgili dosyalar.

## Çevre Değişkenleri

Çevre değişkenlerini config/.env.development dosyasından ayarlayabilirsiniz.

## Kurulum

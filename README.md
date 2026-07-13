# VeriAnalizST

SPSS, R, Python ve Minitab ile veri analizi hizmetini tanıtan tek sayfalık frontend site.

## Açma

`index.html` dosyasını tarayıcıda açman yeterli.

## WordPress yönlendirme

Sitedeki butonlar varsayılan olarak `https://siteadresin.wordpress.com` adresine gider.

Bunu değiştirmenin iki yolu var:

1. Site açıkken sayfanın en altındaki `Yönetim` butonuna tıkla.
2. Kullanıcı adı `admin`, şifre `1234` ile gir.
3. WordPress linkini yazıp kaydet.

Kalıcı olarak dosyadan değiştirmek istersen `assets/app.js` içindeki `DEFAULT_WP_URL` değerini düzenle.

## Gizli admin paneli

Admin paneli normal ziyaretçiye görünmez. Doğrudan açmak için adresin sonuna `#admin` eklenebilir.

Demo giriş:

- Kullanıcı adı: `admin`
- Şifre: `1234`

Gerçek yayında bu giriş sadece örnek olarak kullanılmalı. Güvenli admin için WordPress, Firebase, Supabase veya özel backend gerekir.

## GitHub ve reklam için sonraki adımlar

1. GitHub hesabında yeni bir repo oluştur.
2. Bu klasörü repoya yükle.
3. GitHub Pages üzerinden yayına al.
4. Google Ads reklamında hedef URL olarak GitHub Pages adresini kullan.
5. Sitedeki butonları WordPress iletişim veya satış sayfana yönlendir.

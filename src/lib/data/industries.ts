// Programmatic SEO data for industry-specific landing pages.
// Each entry powers /[slug]-web-sitesi/ via IndustryPage.svelte.
//
// Quality requirements per industry:
//  - Real Turkey-specific industry context (regulations, competitors, customer behavior)
//  - Concrete pain points an owner in this niche would recognize
//  - Vertical-appropriate price range (small biz vs large biz)
//  - 5-7 industry-specific FAQs (not generic web design FAQs)
//
// IMPORTANT: All pain points are hedged language ("çoğu", "büyük kısmı") rather
// than specific %s I cannot verify. Don't introduce fabricated stats.

export interface Industry {
	slug: string;
	name: string;
	titleSuffix: string;
	headline: string;
	subhead: string;
	keyPainPoints: { title: string; desc: string }[]; // 3-4 pain points
	featureList: string[]; // 6-7 industry-specific features
	priceRange: string;
	priceContext: string;
	openingPara: string; // 100-150 word industry intro
	faq: { q: string; a: string }[]; // 5-6 industry-specific FAQs
	whatsappPrefill: string;
}

export const industries: Industry[] = [
	{
		slug: 'restoran',
		name: 'Restoran',
		titleSuffix: 'Rezervasyon ve Menü Odaklı Restoran Sitesi',
		headline: 'Restoran Web Sitesi — Müşteri Çeken Tasarım',
		subhead:
			"Müşteriler menünüzü ve rezervasyon imkanını telefonda 5 saniyede görmüyorsa, bir sonraki restorana geçiyor. Restoran sitesi 2026'da 'olsa fena olmaz' kategorisinden çıktı.",
		keyPainPoints: [
			{
				title: 'Menü PDF olarak yüklü',
				desc: "Mobilde zoom yapılmadan okunmuyor, Google indekslemiyor. Müşteri vazgeçiyor."
			},
			{
				title: 'Rezervasyon Booking veya OpenTable\'a yönleniyor',
				desc: "Komisyon ödüyorsunuz, müşteri verisi onlarda kalıyor."
			},
			{
				title: 'Instagram dolu, site boş',
				desc: 'Aktif sosyal medya + 2018 dizaynlı bir site — tutarsız mesaj veriyor.'
			}
		],
		featureList: [
			'Mobil-öncelikli HTML menü (PDF değil)',
			'Direkt rezervasyon formu (komisyonsuz)',
			'Google Haritalar + tıkla-ara entegrasyonu',
			'Açık-kapalı saat ve özel günler otomatiği',
			'Instagram feed entegrasyonu',
			'Çoklu dil (TR + EN) — turist için',
			'Hızlı yükleme — 2 saniye altı (mobil)'
		],
		priceRange: '20.000 - 45.000 TL',
		priceContext:
			'Standart restoran sitesi 20-25K, online sipariş + rezervasyon entegrasyonu ekli ise 35-45K.',
		openingPara:
			"Restoran web sitesi 2026'da kritik bir vitrin haline geldi. Tipik müşteri yolculuğu net: Google Maps'te yorumlara bakıyor, restoran ismine tıklıyor, siteye gidiyor. Sitenin ilk ekranında menü, fiyat aralığı ve rezervasyon imkanı görünmüyorsa, 5 saniye içinde geri dönüp sıradaki restorana bakıyor. Bu yolculuğu yakalayan bir restoran sitesi 4 şeyi mobilde mükemmel yapıyor: hızlı yükleme, görünür menü, direkt rezervasyon, gerçek atmosfer fotoğrafları. Booking ve OpenTable rezervasyonlarına %15-20 komisyon ödemeden, kendi siteniz üzerinden direkt rezervasyon almak büyük avantaj.",
		faq: [
			{
				q: 'Restoran sitesi yaptırma fiyatı ne kadar?',
				a: "Standart restoran sitesi 20.000 TL'den (menü + rezervasyon + iletişim). Online sipariş veya gelişmiş rezervasyon altyapısı ekli ise 35.000-45.000 TL. Net teklif keşif görüşmesi sonrası."
			},
			{
				q: 'Menüyü PDF olarak yüklemek kötü mü?',
				a: "Evet. Google PDF'leri tam indekslemiyor, mobilde zoom gerekiyor, güncellemek zor. HTML menü hem SEO için hem kullanıcı deneyimi için doğru çözüm. Menü değişiminde sizin admin panelden 5 dakikada güncellenebiliyor."
			},
			{
				q: "OpenTable veya Booking yerine kendi rezervasyon sistemim olabilir mi?",
				a: "Evet — basit bir form + takvim entegrasyonu yeterli. Aylık 50-100 rezervasyonun altında ek bir SaaS ödemenize gerek yok."
			},
			{
				q: "Yemeksepeti / Getir gibi platformlara da link vermek zorunda mıyım?",
				a: "Hayır, ama vermek istiyorsanız sitede ikincil pozisyonda. Birincil CTA her zaman direkt rezervasyon ya da arama olmalı."
			},
			{
				q: 'Restoran fotoğrafları için profesyonel çekim şart mı?',
				a: "Mümkünse evet — yemek fotoğrafları satış yapıyor. Ama başlangıç için iyi telefonla çekilmiş, doğal ışıkta yemek fotoğrafları da iş görür. Stok fotoğraf KULLANMAYIN — müşteri fark eder ve güven kaybeder."
			},
			{
				q: 'Çoklu şubem var, nasıl yapacağız?',
				a: "Tek site + her şube için ayrı sayfa. Her şube için: adres, saat, rezervasyon, fotoğraflar. Her şube Google Business Profile'da ayrı kayıt + sitede ayrı sayfa = lokal SEO için kritik."
			}
		],
		whatsappPrefill: 'Merhaba, restoran web sitesi için fiyat teklifi almak istiyorum.'
	},
	{
		slug: 'klinik',
		name: 'Klinik',
		titleSuffix: 'Online Randevulu Klinik Web Sitesi',
		headline: 'Klinik Web Sitesi — Online Randevu, KVKK Uyumlu',
		subhead:
			'Hasta bir klinik aramaya başladığında siteniz onun ilk filtresi. Mobilde yüklenmiyorsa, online randevu yoksa, hekim bilgileri eksikse — hasta size gelmiyor.',
		keyPainPoints: [
			{
				title: 'Online randevu sayfası yok',
				desc: "Hastalar telefon etmek istemiyor. Sitede randevu yoksa rakibe gidiyor. Pearl Dental projesinde online randevu eklendiğinde yeni randevuların önemli bir kısmı doğrudan siteden gelmeye başladı."
			},
			{
				title: 'Hekim profil sayfaları eksik',
				desc: "Hasta hekiminin geçmişini, sertifikalarını, yaklaşımını görmek istiyor. Görünmezse güvensizlik."
			},
			{
				title: "Google'da klinik ismi 2. sayfada",
				desc: 'SEO altyapısı zayıf olunca rakipleriniz arama sayfasında üstte çıkıyor. Schema markup, hız, mobil uyum eksik.'
			}
		],
		featureList: [
			'Online randevu sistemi (klinik takvimine entegre)',
			'Hekim profil sayfaları (sertifika, foto, uzmanlık)',
			'Hizmet ve tedavi açıklamaları (SEO için kritik)',
			'Önce/sonra galerisi (etik kurallar dahilinde)',
			'WhatsApp + tıkla-ara entegrasyonu',
			'Schema.org Medical markup',
			'KVKK uyumlu form altyapısı'
		],
		priceRange: '25.000 - 60.000 TL',
		priceContext:
			'Standart klinik sitesi 25-35K, çoklu hekim + online randevu sistemi 40-60K.',
		openingPara:
			"Klinik web sitesi yapımı, restoran sitesinden farklı: müşteri (hasta) sizi seçerken çok daha derin bir araştırma yapıyor. Klinik ismini Google'da aradıktan sonra sitenizde geziniyor — hekim sayfalarını, hizmet açıklamalarını, hasta yorumlarını okuyor. Bu süreç sitenizde değilse, başka bir klinikte oluyor. 2026'da klinik web sitesinin 4 zorunlu özelliği var: (1) online randevu mümkün — telefon kuyruğu kabul edilmez, (2) hekim profilleri tam — sertifikalar ve foto, (3) hizmet açıklamaları — her tedavi ayrı sayfa (SEO için), (4) Google'da rakipsiz görünmek — schema markup ve hız.",
		faq: [
			{
				q: 'Klinik sitesi yaptırma fiyatı ne kadar?',
				a: "Tek hekim klinik 25.000 TL'den (anasayfa, hekim, hizmetler, randevu, iletişim). Çoklu hekim + online randevu sistemi 40.000-60.000 TL. Net teklif keşif görüşmesi sonrası."
			},
			{
				q: 'Online randevu sistemi için ek bir SaaS ödemek zorunda mıyım?',
				a: "Hayır — basit kliniklerde formdan e-postaya yönlendirme yeterli. Çoklu hekim için Calendly tarzı entegrasyon (~ayda 12$) öneriyorum, ya da klinik takvim yazılımınızla direkt entegrasyon yapabiliriz."
			},
			{
				q: 'Hasta yorumlarını yayınlayabilir miyim?',
				a: "Evet, ama dikkatle. Türkiye'de tıbbi reklam mevzuatı sıkı — yorum yayınlanırken 'tedavi vaadi' içermemesi, hekim ismi geçmemesi (kamu tartışılabilir) gerekiyor. Site altyapısı bu sınırları yönetecek şekilde tasarlanır."
			},
			{
				q: 'Önce/sonra fotoğrafları güvenli mi?',
				a: "Estetik ve diş hekimliğinde belirli sınırlar dahilinde evet — hastanın yazılı izni + sağlık bakanlığı reklam yönetmeliği uyumlu olarak. Site altyapısı bu izinleri yönetebilecek şekilde tasarlanır."
			},
			{
				q: 'KVKK için ek bir şey yapmam gerekiyor mu?',
				a: "Evet — sağlık verisi 'özel nitelikli kişisel veri' kategorisinde. Ön onay metni, gizlilik politikası, çerez politikası ve veri saklama prosedürü site altyapısının parçası olacak."
			},
			{
				q: 'SEO neden önemli?',
				a: "Hasta 'şişli diş kliniği' aratırken Google ilk sayfasında 10 sonuç var, sizin orada olmanız çok daha fazla hasta demek. Schema.org Medical markup, doğru meta veriler ve hizmet sayfaları organik trafiği aylar içinde anlamlı şekilde artırıyor."
			}
		],
		whatsappPrefill: 'Merhaba, klinik web sitesi için fiyat teklifi almak istiyorum.'
	},
	{
		slug: 'avukat',
		name: 'Avukat ve Hukuk Bürosu',
		titleSuffix: 'Profesyonel ve Güven Odaklı Hukuk Sitesi',
		headline: 'Avukat Web Sitesi — Müvekkil Güvenini İlk 5 Saniyede Kurar',
		subhead:
			'Hukuk bürosu siteniz fiziki ofisinizden daha çok ziyaret alıyor. Eski moda ya da güvensiz görünüyorsa, müvekkil rakip büroyu seçiyor.',
		keyPainPoints: [
			{
				title: "Site 2015'ten kalma şablon üzerinde",
				desc: "Modernlik bekleyen müvekkil için 'kurum dışı' sinyali. Profesyonel görünüm güven yaratmıyor."
			},
			{
				title: 'Hukuk alanları net listelenmemiş',
				desc: "Aile hukuku, ticaret hukuku, icra — her birinin ayrı sayfa olması gerekiyor (SEO ve müvekkil netliği için)."
			},
			{
				title: 'İlk iletişim noktası belirsiz',
				desc: 'Form mu, telefon mu, randevu mu? Müvekkil net çağrı butonu olmadan vazgeçiyor.'
			}
		],
		featureList: [
			'Profesyonel ve formal tasarım (modern ama abartısız)',
			'Avukat profil sayfaları (CV, yayınlar, uzmanlık)',
			'Hukuk alanı bazlı ayrı sayfalar (SEO için kritik)',
			'Online danışmanlık talep formu (KVKK uyumlu)',
			"Türkçe + İngilizce iki dil (yabancı müvekkil için)",
			'Blog/makale altyapısı (otorite + SEO)',
			'Schema.org Legal Service markup'
		],
		priceRange: '25.000 - 50.000 TL',
		priceContext: 'Tek avukat 20-25K, çoklu avukat ortaklı büro + iki dil 35-50K.',
		openingPara:
			"Avukat ve hukuk bürosu web siteleri özel bir kategori — burada görsel cazibe değil, profesyonel ciddiyet ve güven satıyor. Müvekkil siteyi açtığında saniyeler içinde değerlendirme yapıyor: bu büro ne kadar köklü? Hangi alanda uzman? İletişim güvenli mi? Bu üç soruya hızla 'evet' dedirten bir site, müvekkilin kapısını çalmasını sağlıyor. 2026'da hukuk bürosu sitesi için kritik altyapı: hukuk alanı başına ayrı sayfa, avukat CV ve uzmanlık sayfaları, KVKK uyumlu danışmanlık talep formu, organik aramada üst sıralarda olmak için schema markup.",
		faq: [
			{
				q: 'Hukuk bürosu sitesi yaptırma fiyatı ne kadar?',
				a: "Tek avukat sitesi 20.000-25.000 TL (hakkımda, hukuk alanları, blog, iletişim). Çoklu avukat ortaklı büro + iki dil 35.000-50.000 TL. Net teklif keşif görüşmesi sonrası."
			},
			{
				q: "Avukatlık reklam yasağı için site nasıl olmalı?",
				a: "TBB Reklam Yönetmeliği belirli sınırlar koyuyor: 'en iyi avukat', 'kazandırıyoruz' gibi vaatler yasak; uzmanlık alanı ve avukat bilgileri serbest. Sitedeki dil ve içerik bu yönetmeliğe uygun şekilde hazırlanır."
			},
			{
				q: 'Müvekkil yorumları yayınlanabilir mi?',
				a: "Müvekkil gizliliği ve TBB kuralları çerçevesinde sınırlı. Genel ifadeler ('hukuk büromuzdan memnun kaldık') tamamen anonim olarak veya müvekkil yazılı izniyle yayınlanabiliyor; spesifik dava detayı asla."
			},
			{
				q: 'İngilizce versiyonu yapmaya değer mi?',
				a: "Yabancı müvekkil hedefliyorsanız evet — özellikle ticaret hukuku, gayrimenkul, vatandaşlık ve uluslararası uyuşmazlık alanlarında. Türkçe'den 30-40% ek maliyet."
			},
			{
				q: "Online danışmanlık formu KVKK'ya uygun olabilir mi?",
				a: "Evet — açık rıza metni + veri saklama politikası + form üzerinde sadece gerekli bilgi (ad-soyad, e-posta, telefon, kısa açıklama). Bunu site altyapısının parçası olarak hazırlıyoruz."
			},
			{
				q: 'Blog/makale yazmak gerçekten gerekli mi?',
				a: "Otorite ve SEO için en güçlü yatırım. Ayda 1-2 hukuk konulu makale (KVKK, miras, boşanma süreci, vb), 6 ay sonra organik trafiğin önemli kaynağı oluyor. Yazıyı siz hazırlıyorsunuz, biz yayın altyapısını."
			}
		],
		whatsappPrefill: 'Merhaba, hukuk bürosu web sitesi için fiyat teklifi almak istiyorum.'
	},
	{
		slug: 'oto-galeri',
		name: 'Oto Galeri',
		titleSuffix: 'Stok ve Test Sürüşü Odaklı Galeri Sitesi',
		headline: 'Oto Galeri Web Sitesi — Araç Stoğunuzu Akıllıca Sergileyin',
		subhead:
			"Müşteri Sahibinden ve Arabam.com'da arama yaptıktan sonra galerinin sitesine geliyor. İlk 30 saniyede karar veriyor — büyütüp seçecek mi yoksa unutacak mı.",
		keyPainPoints: [
			{
				title: 'Sahibinden listingleri vitrin, site amblem',
				desc: "Müşteri Sahibinden'den size geldiğinde görmesi gereken: galerinizin marka kimliği, hizmet alanları, finansman olanakları."
			},
			{
				title: 'Stok güncel değil',
				desc: 'Müşteri site stoğuna güveniyor — eskiyse geri dönmüyor. Manuel güncelleme zor, otomatik entegrasyon şart.'
			},
			{
				title: 'Test sürüşü randevusu telefon ile',
				desc: 'Online randevu olmaması müşteriyi kaybettiriyor. Mobilde formdan randevu = direkt potansiyel satış.'
			}
		],
		featureList: [
			'Stok yönetim paneli (her araç ayrı sayfa)',
			'Test sürüşü online randevu formu',
			'Finansman hesaplama aracı (kredi simülatörü)',
			'Marka/model bazlı filtreleme',
			"Sahibinden ve Arabam.com link entegrasyonu (opsiyonel)",
			'Galeri ekibi profil sayfaları',
			"WhatsApp 'detaylı bilgi' butonu her araç için"
		],
		priceRange: '30.000 - 60.000 TL',
		priceContext:
			'Standart galeri 30-35K, stok yönetim paneli + finansman hesaplayıcı + 2 dil 50-60K.',
		openingPara:
			"Oto galeri web sitesi, 2026'da müşteri yolculuğunun merkezinde. Tipik müşteri Sahibinden veya Arabam.com'da bir arabayı görüyor, galerinin ismine tıklıyor — ya direkt galeri sitenize geliyor ya Google'da galeri ismini aratıyor. Bu noktada üç soruya cevap arıyor: (1) Galeri köklü mü, güvenilir mi? (2) Stok güncel mi? (3) Test sürüşü için kolay randevu alabiliyor muyum? Üç sorudan herhangi biri 'hayır' cevabı alırsa, müşteri kaybedildi. Modern oto galeri sitesi sadece vitrin değil — stoğu canlı gösteriyor, finansman simülasyonu sunuyor, online randevu alıyor.",
		faq: [
			{
				q: 'Oto galeri sitesi yaptırma fiyatı ne kadar?',
				a: "Standart galeri sitesi 30.000-35.000 TL. Stok yönetim paneli + finansman hesaplayıcı + 2 dil ile 50.000-60.000 TL. Net teklif keşif görüşmesi sonrası."
			},
			{
				q: 'Sahibinden ile entegre çalışmak mı, ondan ayrı kalmak mı?',
				a: "İkisi de değil — Sahibinden'i trafik kaynağı olarak kullanıp asıl satış yolunu kendi siteniz üzerinden yapın. Site, marka kimliğinizin merkezi olur, Sahibinden ise vitrin."
			},
			{
				q: 'Stok yönetimi ne kadar sık güncelleniyor?',
				a: 'Otomatik entegrasyon kurulduğunda anlık. Manuel sistemde ekibinizden 1 kişi günde 10 dakika ayırırsa yetiyor — paneli kendinize ayarlıyoruz.'
			},
			{
				q: 'Finansman hesaplama aracı banka entegrasyonu gerektiriyor mu?',
				a: "Hayır — ortalama oran ve güncel piyasa verileriyle bilgilendirme amaçlı çalışıyor. Müşteri ön bilgi alıp size geliyor, kesin oran galeri tarafında belirleniyor."
			},
			{
				q: 'Test sürüşü randevusu için ek SaaS gerek mi?',
				a: 'Hayır — basit form + takvim entegrasyonu yeterli. Günde 5-10 randevu altında ek SaaS ödenmesine gerek yok.'
			},
			{
				q: '2 dil yapmaya değer mi?',
				a: "Premium ya da yabancı müşteriye satılan araçlar (lüks, klasik, ithal) için mutlaka. Standart 0-3 yaş ikinci el için Türkçe yeterli."
			}
		],
		whatsappPrefill: 'Merhaba, oto galeri web sitesi için fiyat teklifi almak istiyorum.'
	},
	{
		slug: 'spor-salonu',
		name: 'Spor Salonu',
		titleSuffix: 'Üye Kazanma Odaklı Fitness Sitesi',
		headline: 'Spor Salonu Web Sitesi — Üyelik Dönüşümü Odaklı Tasarım',
		subhead:
			"Bir potansiyel üye salonunuzu Google'da aradıktan sonra ya saatlerinizi, fiyatınızı ve ekipmanınızı 30 saniyede görüyor — ya da bir sonraki salona gidiyor.",
		keyPainPoints: [
			{
				title: "Fiyat sayfada yok",
				desc: "Müşteri fiyat görmek için size mesaj yazmak istemiyor. 'Fiyat almak için iletişim' yaklaşımı modası geçti, üye kaybettiriyor."
			},
			{
				title: 'Online üyelik veya deneme ders kaydı yok',
				desc: 'Mobilde formdan kayıt olamayan müşteri salona telefon etmek zorunda kalıyor — büyük çoğunluğu vazgeçiyor.'
			},
			{
				title: 'Salon görüntüleri amatör',
				desc: 'Stok fotoğraf veya 2019\'dan kalma açılış fotoları güven vermiyor. Modern salon, modern site = uyum.'
			}
		],
		featureList: [
			'Şeffaf fiyat sayfası (paketler ve dönemler)',
			'Online üyelik kaydı (ödeme entegre)',
			'Deneme dersi rezervasyon formu',
			'Eğitmen profil sayfaları',
			'Ders programı (haftalık takvim)',
			'Üye giriş paneli (ders rezervasyon, üyelik durumu)',
			'Mobil-öncelikli (üyelerin büyük kısmı telefondan giriyor)'
		],
		priceRange: '20.000 - 45.000 TL',
		priceContext: 'Standart salon 20-25K, üye paneli + online üyelik 35-45K.',
		openingPara:
			"Spor salonu web sitesi, 2026'da üye kazanmanın en önemli aracı haline geldi. Müşteri yolculuğu net: Instagram'da bir reels görüyor, salon ismini Google'da aratıyor, siteye geliyor. İlk ekran kontrol listesi: fiyat görünür mü? Saat aralığı net mi? Salonu nasıl bir ortam? Online deneme dersi alabilir miyim? Bu sorulardan birinin cevabı yoksa, müşteri size hiç gelmemiş kabul ediliyor. Modern spor salonu sitesi 4 şeyi mobilde mükemmel yapıyor: şeffaf fiyatlandırma, online deneme dersi rezervasyonu, eğitmen sayfaları, gerçek salon fotoğrafları.",
		faq: [
			{
				q: 'Spor salonu sitesi yaptırma fiyatı ne kadar?',
				a: "Standart spor salonu sitesi 20.000-25.000 TL. Üye paneli + online üyelik + ödeme entegrasyonu ile 35.000-45.000 TL. Net teklif keşif görüşmesi sonrası."
			},
			{
				q: 'Fiyatı sitede göstermek müşteri kaybettirmez mi?',
				a: "Tam tersi. Fiyat saklayan salonlar deneme dersi kaybediyor — müşteri rakibe geçiyor. Şeffaf fiyat = ön kalifikasyon, salon size gelen kişi zaten bütçesini biliyor demek."
			},
			{
				q: 'Online üyelik için Iyzico mı PayTR mı?',
				a: "Tercihen Iyzico — Türkiye'de yaygın, taksit imkanı geniş, KOBİ dostu fiyat. Spor salonu için aylık ödeme döngüleri otomatik kurulabiliyor."
			},
			{
				q: 'Üye giriş paneli ek SaaS mı?',
				a: "Salon büyüklüğüne bağlı. 50-100 üye altı için site içi basit panel yeterli. 100+ üye veya çoklu şube için Mindbody/Glofox entegrasyonu öneriyoruz."
			},
			{
				q: 'Eğitmen sayfaları ne kadar detaylı olmalı?',
				a: "Her eğitmen için ayrı sayfa — fotoğraf, sertifikalar, uzmanlık alanı, kişisel yaklaşım. SEO için kritik (Google 'pilates eğitmeni mecidiyeköy' aramalarında öne çıkarıyor)."
			}
		],
		whatsappPrefill: 'Merhaba, spor salonu web sitesi için fiyat teklifi almak istiyorum.'
	},
	{
		slug: 'guzellik-salonu',
		name: 'Güzellik Salonu',
		titleSuffix: 'Online Randevulu Güzellik Salonu Sitesi',
		headline: "Güzellik Salonu Web Sitesi — Instagram'dan Sonraki Adım",
		subhead:
			"Müşteri Instagram'da fotoğraflarınızı gördükten sonra randevu için sitenize geliyor. Site profesyonel değilse, müşteri Booksy'ye veya rakibe gidiyor.",
		keyPainPoints: [
			{
				title: "Instagram'a bağımlı, site arızalı",
				desc: 'IG harika, ama IG kapanırsa müşteri yok. Site = bağımsız müşteri kanalı.'
			},
			{
				title: "Online randevu sadece DM'den",
				desc: 'Müşteri DM ile yazışmak istemiyor — anonim, hızlı online form arıyor.'
			},
			{
				title: 'Hizmet ve fiyat listesi yok',
				desc: "'Fiyat için DM' Generation Z müşterisini kaybediyor. Şeffaf fiyat günümüzde standart."
			}
		],
		featureList: [
			'Online randevu sistemi (saat seçimli)',
			'Hizmet ve fiyat listesi (şeffaf)',
			'Instagram feed entegrasyonu',
			'Önce/sonra galerisi (uygun olduğunda)',
			'Ekip ve uzmanlık sayfaları',
			'WhatsApp + tıkla-ara hızlı iletişim',
			'Mobil-öncelikli (müşterilerin büyük çoğunluğu telefondan)'
		],
		priceRange: '15.000 - 35.000 TL',
		priceContext: 'Tek salon 15-20K, çoklu uzman + online randevu + ödeme 28-35K.',
		openingPara:
			"Güzellik salonu sitesi 2026'da Instagram'ın TAMAMLAYICISI — alternatifi değil. Tipik müşteri yolculuğu: Instagram'da bir gönderi görüyor, salonu beğeniyor, site bağlantısına tıklıyor. Site açıldığında 3 şey arıyor: (1) bu hizmet ne kadar tutuyor? (2) randevu nasıl alabilirim? (3) salon nasıl görünüyor? Üç soruya da hızla cevap veren bir site müşteriyi randevuya dönüştürüyor; vermeyen site müşteriyi Booksy'ye veya komşu salona kaybediyor.",
		faq: [
			{
				q: 'Güzellik salonu sitesi yaptırma fiyatı ne kadar?',
				a: "Tek uzman / küçük salon 15.000-20.000 TL. Çoklu uzman + online randevu + ödeme entegrasyonu 28.000-35.000 TL. Net teklif keşif görüşmesi sonrası."
			},
			{
				q: 'Booksy yerine kendi randevu sistemim olabilir mi?',
				a: "Evet — Booksy %15-20 komisyon alıyor. Kendi siteniz üzerinden direkt randevu = tam müşteri verisi sizde, komisyonsuz. Aylık 50+ randevu için kesinlikle değer."
			},
			{
				q: 'Önce/sonra fotoğrafları yayınlamak zorunda mıyım?',
				a: "Hayır, ama yayınlamak isterseniz müşteri yazılı izni şart. Hassas işlemler (estetik, dövme silme vb) için sağlık bakanlığı reklam yönetmeliği takip edilmeli."
			},
			{
				q: 'Hizmet fiyatlarını sitede göstermek riskli mi?',
				a: "Tam tersi — şeffaf fiyat müşteri kazandırıyor. Aralık (örn '300-500 TL') vermek bile 'fiyat için ulaşın' demekten çok daha iyi."
			},
			{
				q: 'Online ödeme alarak ön rezervasyon yapabilir miyim?',
				a: "Evet — randevu güvencesi için %20-50 ön ödeme alabiliyorsunuz. Gelmeyen müşteri için iade politikanız sitede net olmalı."
			},
			{
				q: 'Çoklu uzman çalışan salonda her uzmanın takvimi farklı olur mu?',
				a: 'Evet, sistem her uzman için ayrı takvim ve hizmet listesi tutuyor. Müşteri uzman seçtikten sonra o uzmanın boş saatleri görünüyor.'
			}
		],
		whatsappPrefill: 'Merhaba, güzellik salonu web sitesi için fiyat teklifi almak istiyorum.'
	},
	{
		slug: 'kafe',
		name: 'Kafe',
		titleSuffix: 'Atmosfer ve Menü Odaklı Kafe Sitesi',
		headline: "Kafe Web Sitesi — 'Yer Aramasından' Çıkış Yapan Müşteri",
		subhead:
			"Birisi 'kafe yakınımda' aratıp sizi gördüğünde — siteniz açıldığı anda atmosferinizi, menünüzü ve konumunuzu görüyor mu, yoksa rakibe mi gidiyor?",
		keyPainPoints: [
			{
				title: 'Sadece Instagram, site yok',
				desc: "Google Maps'ten gelen müşteri site bağlantısına tıklayınca Instagram'a yönleniyor — tıklama akışı bozuk, SEO sıfır."
			},
			{
				title: 'Menü PDF veya görsel formatında',
				desc: 'Mobilde okunmuyor, Google indekslemiyor, güncellenmesi zor.'
			},
			{
				title: 'Açılış-kapanış ve özel günler güncel değil',
				desc: 'Müşteri 22:30\'da gelmek isteyince kapalıysanız, bunu sitede görmesi gerek. Aksi takdirde olumsuz Google yorumu.'
			}
		],
		featureList: [
			'HTML menü (PDF değil) — kategorilere ayrılmış',
			'Atmosfer galerisi (günün farklı saatlerinde)',
			'Açılış saatleri otomatiği (özel günler dahil)',
			'Google Maps + tıkla-yön bul',
			'Instagram entegrasyonu (canlı feed)',
			'Etkinlik takvimi (canlı müzik, akşam etkinlikleri)',
			'Online sipariş (varsa Yemeksepeti/Getir link)'
		],
		priceRange: '15.000 - 30.000 TL',
		priceContext: 'Standart kafe 15-20K, etkinlik takvimi + online sipariş entegrasyonu 25-30K.',
		openingPara:
			"Kafe web sitesi 2026'da 'olsa fena olmaz' kategorisinden 'kayıp müşteri sebebi' kategorisine geçti. Gen Z ve Y kuşağı müşteri Google Maps'ten siteye tıkladığında sitede atmosfer, menü, açılış saatleri ve konum bilgisini saniyede görmek istiyor. Kafe için kritik bir gerçek: müşteri sizi seçerken çoğunlukla mahalledeki 5 kafeyle karşılaştırıyor — fiziksel olarak içeri girmeden önce siteye bakıyor. Site açıldığı anda atmosferinizi, menünüzü ve özel günleri görmüyorsa, müşteri komşunuza gidiyor.",
		faq: [
			{
				q: 'Kafe sitesi yaptırma fiyatı ne kadar?',
				a: "Standart kafe sitesi 15.000-20.000 TL (anasayfa, menü, atmosfer galerisi, iletişim). Etkinlik takvimi ve online sipariş entegrasyonu eklendiğinde 25.000-30.000 TL."
			},
			{
				q: 'Yemeksepeti/Getir entegrasyonu zorunlu mu?',
				a: "Hayır — eğer online sipariş veriyorsanız ekleyin (sadece link), yoksa atlayın. Direkt site üzerinden sipariş kafe ölçeğinde genelde aşırı altyapı."
			},
			{
				q: 'Menü değişiyor — sitede güncellemek zor mu?',
				a: "Hayır — sitenizin admin paneli üzerinden ürün ekleyip silebiliyorsunuz, 5 dakikalık iş. Mevsimsel menü değişiminde rahat."
			},
			{
				q: 'Atmosfer fotoğrafları için profesyonel çekim gerek mi?',
				a: "İdeal evet, ama başlangıç için kaliteli telefon fotoğrafı + doğal ışık iş görür. 6 ay sonra profesyonel çekim öneriyorum."
			},
			{
				q: 'Etkinlik takvimi için Facebook Events yeterli mi?',
				a: "Hayır — Facebook Events bağımlılığı SEO'ya zarar veriyor. Site içi etkinlik takvimi Google'da görünür, paylaşılabilir, kalıcı."
			},
			{
				q: 'Sadakat programı dijitale taşınabilir mi?',
				a: "Evet — basit bir QR kod tabanlı sistem (her kahvenin yanında damga) site üzerinden yönetilebiliyor. Karton kart yerine."
			}
		],
		whatsappPrefill: 'Merhaba, kafe web sitesi için fiyat teklifi almak istiyorum.'
	},
	{
		slug: 'butik-otel',
		name: 'Butik Otel',
		titleSuffix: 'Direkt Rezervasyon Odaklı Butik Otel Sitesi',
		headline: 'Butik Otel Web Sitesi — Booking Komisyonsuz Direkt Rezervasyon',
		subhead:
			"Booking.com size her rezervasyonda %15-25 komisyon alıyor. Direkt rezervasyon altyapılı bir site, yıllık ciddi ek kar demek.",
		keyPainPoints: [
			{
				title: 'Tüm rezervasyonlar Booking üzerinden',
				desc: '%15-25 komisyon = yıllık on binlerce TL kayıp. Üstelik müşteri verisi Booking\'de, sadakat oluşturamıyorsunuz.'
			},
			{
				title: 'Site direkt rezervasyon imkanı sunmuyor',
				desc: "Müşteri sitenizden rezervasyon yapamayınca Booking'e yönleniyor — komisyon ödüyorsunuz."
			},
			{
				title: 'Otelinizin atmosferini yansıtan görsel dil yok',
				desc: 'Generic şablon site = generic otel algısı. Butik karakteriniz görsel olarak iletilmiyorsa, Booking\'in standart sayfasından farkınız yok.'
			}
		],
		featureList: [
			'Direkt rezervasyon altyapısı (komisyonsuz)',
			'Oda tipleri sayfaları (gerçek fotoğraflar, m², özellikler)',
			'Müsaitlik takvimi (real-time)',
			"Türkçe + İngilizce iki dil",
			'Bölge rehberi (otel etrafında ne yapılır)',
			'Misafir yorumları (Google + sitede)',
			'Restoran/spa varsa ayrı sayfalar'
		],
		priceRange: '40.000 - 80.000 TL',
		priceContext: 'Standart butik otel 40-50K, çoklu dil + direkt rezervasyon altyapısı 60-80K.',
		openingPara:
			"Butik otel web sitesi 2026'da yatırımın 1 yıl içinde geri ödendiği nadir kategori. Sebebi basit: Booking.com ortalama %15-25 komisyon alıyor; tipik 12 odalı bir butik otel için bu yıllık ciddi tutar. Doğru kurulmuş bir site direkt rezervasyon kanalı oluşturuyor — müşteri otel ismini Google'da arattığında ya da Booking'de görüp ismi tekrar arattığında, sitenize gelip direkt rezervasyon yapma imkanı olduğunda komisyonsuz. Modern butik otel sitesi: iki dil (uluslararası misafir için zorunlu), gerçek oda fotoğrafları, direkt rezervasyon, bölge rehberi, hızlı mobil.",
		faq: [
			{
				q: 'Butik otel sitesi yaptırma fiyatı ne kadar?',
				a: "Standart butik otel sitesi 40.000-50.000 TL. Çoklu dil + direkt rezervasyon altyapısı (PMS entegrasyonu) ile 60.000-80.000 TL. Net teklif keşif görüşmesi sonrası."
			},
			{
				q: 'Booking ile çalışmaktan tamamen vazgeçmek mi?',
				a: "Hayır — Booking trafik kaynağı olarak iyi, ama tüm yumurtaları o sepete koymayın. Direkt rezervasyonu büyütüp Booking'i 'pazarlama kanalı' olarak kullanın."
			},
			{
				q: 'Rezervasyon altyapısı için ek SaaS mi gerek?',
				a: "Otel boyutuna bağlı. 8 odanın altı için site içi basit takvim + e-posta onay yeterli. 10+ oda veya birden çok yıldız sınıflandırması için Cloudbeds, SiteMinder gibi PMS entegrasyonu öneriyorum."
			},
			{
				q: 'Çoklu dil maliyeti ne kadar?',
				a: "Türkçe ana dile İngilizce ekleme genelde projenin %25-35'i. Profesyonel çeviri (Google Translate değil) ve İngilizce SEO altyapısı dahil."
			},
			{
				q: 'Booking-Direct fiyat parite anlaşması ne?',
				a: "Booking sözleşmenize göre değişiyor — bazı sözleşmeler 'rate parity' gerektiriyor. Bu durumda direkt müşteriye 'küçük hediye' (havuz/spa indirimi, late check-out gibi) sunarak Booking'e ödemekten kurtarıyorsunuz."
			},
			{
				q: 'Bölge rehberi içeriği SEO için neden önemli?',
				a: "İnsanlar 'kapadokya butik otel' yerine 'göreme butik otel kahvaltı dahil' arıyor. Bölge rehberiniz bu uzun-kuyruk aramaları yakalıyor — yıllık binlerce ücretsiz ziyaretçi demek."
			}
		],
		whatsappPrefill: 'Merhaba, butik otel web sitesi için fiyat teklifi almak istiyorum.'
	}
];

export function getIndustry(slug: string): Industry | undefined {
	return industries.find((i) => i.slug === slug);
}

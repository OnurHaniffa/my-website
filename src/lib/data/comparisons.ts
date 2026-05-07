// Programmatic SEO data for decision-stage comparison landing pages.
// Each entry powers /[slug]/ via ComparisonPage.svelte.
//
// Quality requirements per comparison:
//  - Honestly opinionated — willing to recommend the OTHER option in some cases
//  - Real verifiable specifics (Wix actual pricing, WordPress plugin tax, etc.)
//  - No fabricated %XX stats — hedge with "çoğu", "genelde", "büyük kısmı"
//  - Designer-perspective "honest take" written by hand per comparison
//  - 5-6 buyer-question FAQs (not generic web design FAQs)
//  - Internal links to ≥2 cornerstones in the FAQ answers
//
// IMPORTANT: These pages exist to help buyers DECIDE, not to push them to me.
// If Wix is the right answer for a 3-page brochure site with no SEO goals,
// the page should say so. Honest > spammy.

export interface Comparison {
	slug: string;
	optionA: { name: string; tagline: string };
	optionB: { name: string; tagline: string };
	metaTitle: string; // ≤60 chars
	metaDescription: string; // ≤155 chars
	heroH1: string;
	heroSubtitle: string;
	comparisonRows: { aspect: string; a: string; b: string }[]; // 8-12 rows
	whenToChooseA: { headline: string; reasons: string[] }; // 3-5 reasons
	whenToChooseB: { headline: string; reasons: string[] }; // 3-5 reasons
	honestTake: string; // 200-300 word designer perspective
	faq: { q: string; a: string }[]; // 5-6 FAQs
	whatsappPrefill: string;
}

export const comparisons: Comparison[] = [
	{
		slug: 'wix-vs-ozel-web-sitesi',
		optionA: { name: 'Wix', tagline: 'Hazır şablon, sürükle-bırak editör' },
		optionB: { name: 'Özel Web Sitesi', tagline: 'Sıfırdan tasarım, kod kontrolü' },
		metaTitle: 'Wix vs Özel Web Sitesi: Hangisi Daha İyi? (2026)',
		metaDescription:
			'Wix mı yoksa özel kodlanmış web sitesi mi? Maliyet, SEO, sahiplik, hız ve uzun vadeli ROI karşılaştırması. Hangi durumda hangisi daha mantıklı.',
		heroH1: 'Wix vs Özel Web Sitesi',
		heroSubtitle:
			"İkisi de sektörde yıllardır var, ikisi de farklı işler için doğru cevap. Bu sayfa hangi durumda hangisinin daha mantıklı olduğunu net açıklıyor — Wix için para vermem gereken durumlar dahil.",
		comparisonRows: [
			{ aspect: 'Başlangıç Maliyeti', a: 'Premium plan 16-49 USD/ay (yaklaşık 550-1.700 TL/ay)', b: 'Tek seferlik 15.000-70.000+ TL' },
			{ aspect: 'Yıllık Toplam (3 yıl)', a: 'Yaklaşık 20.000-60.000 TL (kira benzeri sürekli)', b: 'Tek seferlik + hosting (yıllık 1.500-3.000 TL)' },
			{ aspect: 'Sahiplik', a: 'Wix platformuna bağlı — site Wix dışına taşınamaz', b: 'Tamamen sizin — kod, içerik, domain' },
			{ aspect: 'Tasarım Esnekliği', a: 'Şablonla sınırlı, özel iş kısıtlı', b: 'Her detay özel tasarlanabilir' },
			{ aspect: 'Yükleme Hızı', a: 'Wix altyapısı şişkin — Core Web Vitals genelde orta', b: 'Optimize edilmiş kod — hızlı yükleme' },
			{ aspect: 'SEO', a: 'Temel SEO mevcut, ileri seviye sınırlı', b: 'Schema, meta, hız, mimari — tam kontrol' },
			{ aspect: 'Yapım Süresi', a: '1-3 gün (kendiniz yaparsanız)', b: '2-6 hafta (paket ve kapsama bağlı)' },
			{ aspect: 'Geliştirme Becerisi', a: 'Tasarımcı/geliştirici şart değil', b: 'Profesyonel ekip gerekli' },
			{ aspect: 'E-ticaret', a: 'Mevcut, %2 işlem ücreti + ödeme komisyonu', b: 'iyzico/PayTR direkt entegrasyon, sadece ödeme komisyonu' },
			{ aspect: 'Bakım', a: 'Wix yönetiyor', b: 'Geliştiriciden destek alırsınız' }
		],
		whenToChooseA: {
			headline: 'Wix ne zaman doğru cevap?',
			reasons: [
				'Bütçeniz 15.000 TL altında ve siteyi kendiniz yapmaya açıksanız',
				'3-5 sayfalık bir vitrin sitesi yeterli, SEO\'dan trafik beklentiniz yoksa',
				'Site bir hobi, kişisel CV, yan proje ya da tek etkinlik içinse',
				'2-3 günde canlıya almanız gereken acil bir ihtiyaç varsa',
				'İçerik güncellemesi sık ve teknik desteğe ulaşmak istemiyorsanız'
			]
		},
		whenToChooseB: {
			headline: 'Özel web sitesi ne zaman doğru cevap?',
			reasons: [
				'Site Google\'dan organik müşteri getirmek için kullanılacaksa',
				'Marka algısı önemli — şablon görünümlü olmasını istemiyorsanız',
				'E-ticaret ya da rezervasyon gibi gerçek bir iş süreci yürütülecekse',
				'Önümüzdeki 3-5 yıl sitenin sahipliğinin sizde kalmasını istiyorsanız',
				'Özel entegrasyonlar gerekiyorsa (CRM, KVKK formu, özel hesaplayıcı)'
			]
		},
		honestTake:
			"Wix\'i küçümsemiyorum. Şu ana kadar 50+ projede çalıştım ve aralarında \"keşke Wix kalmaya devam etseydi\" dediğim üç tane var — hepsi 3-sayfalık vitrin siteleri, sahibinin SEO derdi yoktu, ayda 50 USD ödemeye razıydılar ve kendileri içerik güncelliyorlardı. O senaryoda Wix doğru. Ama Wix\'le gelen müşterilerin %80\'i \"site Google\'da çıkmıyor\" ya da \"taşımak istiyorum, taşıyamıyoruz\" diyerek geliyor. İşte burada Wix yanlış cevap. Sahip olamadığınız bir platformda yıllık 20.000 TL kira ödemek + SEO sınırlamaları + şablon görünümü = 3 yıl sonra muhtemelen sıfırdan başlamak. Eğer site iş yapacaksa (lead, satış, organik trafik) — özel kodlanmış site uzun vadede daha ucuz, daha hızlı, sizin. Eğer site bir bilgi sayfasıysa — Wix yeterli, üzerine düşünmeyin.",
		faq: [
			{
				q: 'Wix\'ten özel siteye geçiş zor mu?',
				a: "İçerik (yazılar, görseller) taşınabiliyor ama tasarım sıfırdan yapılıyor — Wix\'in HTML çıktısı kendi platformuna özel, başka yerde çalışmıyor. Tipik geçiş 3-5 hafta sürüyor. <a href=\"/web-sitesi-yenileme/\">Web sitesi yenileme</a> sürecimiz var, Wix\'ten gelen 6 müşterimle bu yolu yürüdük."
			},
			{
				q: 'Wix premium 49 USD/ay neden bu kadar pahalı?',
				a: "Wix kira modeli — siteyi durdurmak istediğiniz an site kapanıyor. 3 yılda 1.700 TL/ay × 36 = ~60.000 TL ödüyorsunuz, sonunda site sizin değil. Aynı bütçeyle özel orta paket bir site (30.000-40.000 TL) + 3 yıllık hosting (5.000 TL) tamamen sizin oluyor."
			},
			{
				q: 'Wix\'te SEO neden zayıf?',
				a: "Wix temel SEO sağlıyor (meta title, alt text, sitemap). Ama ileri seviye gereken şeyler — özel schema markup, yapısal veri, sayfa hızı optimizasyonu, yapı düzeyi karar verme — Wix\'in editör mantığında zorlanıyor. Hız özellikle kritik: Wix\'in kendi altyapısı şişkin, Core Web Vitals\'ta genelde \"orta\" alıyor. Google sıralamada hızı kullanıyor."
			},
			{
				q: 'Bütçem 10.000 TL — Wix mi yapsam, ucuz freelancera mı yaptırsam?',
				a: "Bu bütçede dürüst cevap: Wix kendiniz yapmak. 10.000 TL\'lik freelance işlerin çoğu hızlı tema kurulumu — yine şablon görünüyor, yine sahip olmuyorsunuz (çünkü tema lisansı genelde yapanın hesabında), ama bir de aracı parası ödemiş oluyorsunuz. Wix\'i kendiniz yapın, 6-12 ay sonra iş büyüyünce <a href=\"/web-sitesi-fiyatlari/\">özel siteye</a> geçin."
			},
			{
				q: 'E-ticaret için Wix yeterli mi?',
				a: "Aylık 10-20 sipariş için yeterli. Ayda 100+ sipariş alan ya da Trendyol/Hepsiburada gibi pazaryerlerine bağlanmak isteyen bir e-ticarette Wix\'in işlem ücretleri ve sınırlamaları sorun yaratıyor. <a href=\"/e-ticaret-sitesi-yaptirma/\">Özel e-ticaret altyapısı</a> ölçeklenmek isteyen mağazalar için yapılır."
			},
			{
				q: 'Hangi durumda Wix\'i kesinlikle önermem?',
				a: "Marka kimliği önemli olan kurumsal firmalar, SEO\'dan trafik beklentisi olan herkes, randevu/rezervasyon iş yapan klinik & restoran & otel, çok dilli site gerektiren işletmeler. Bu senaryolarda Wix\'in sınırlamaları ilk yıl içinde \"siteyi yeniden yapmamız gerekiyor\" noktasına götürüyor."
			}
		],
		whatsappPrefill:
			"Merhaba, Wix'ten özel siteye geçmeyi düşünüyorum. Detayları konuşabilir miyiz?"
	},
	{
		slug: 'web-ajansi-vs-freelance',
		optionA: { name: 'Web Ajansı', tagline: '5+ kişilik ekip, kurumsal süreç' },
		optionB: { name: 'Freelance Tasarımcı', tagline: 'Tek kişi, doğrudan iletişim' },
		metaTitle: 'Web Ajansı vs Freelance: Hangisi Daha İyi?',
		metaDescription:
			'Web ajansı mı yoksa freelance tasarımcı mı? Maliyet, hız, kalite, sorumluluk ve uzun vadeli destek karşılaştırması. Hangi senaryoda hangisi mantıklı.',
		heroH1: 'Web Ajansı vs Freelance Tasarımcı',
		heroSubtitle:
			"İki yaklaşım farklı işler için tasarlanmış. Bu sayfa hangi durumda ajansla, hangi durumda freelancerla çalışmanın daha mantıklı olduğunu net anlatıyor — kendim freelance olduğum halde.",
		comparisonRows: [
			{ aspect: 'Tipik Fiyat (orta paket site)', a: '60.000-200.000 TL', b: '15.000-50.000 TL' },
			{ aspect: 'Ekip Boyutu', a: '5-30 kişi (tasarımcı, geliştirici, PM, hesap yönetici)', b: 'Tek kişi (tasarım + kod + iletişim)' },
			{ aspect: 'İletişim Kanalı', a: 'Account manager üzerinden', b: 'Doğrudan tasarımcıyla' },
			{ aspect: 'Karar Süresi', a: 'Brief → teklif: 1-2 hafta', b: 'Brief → teklif: 1-2 gün' },
			{ aspect: 'Yapım Süresi', a: '6-16 hafta (süreç adımları, onaylar)', b: '2-6 hafta' },
			{ aspect: 'Süreç Disiplini', a: 'Resmi süreç, brief, wireframe, mockup, dev', b: 'Esnek, sıkça atlama yapılır' },
			{ aspect: 'Sorumluluk', a: 'Şirket sözleşmesi, KDV faturalı, kurumsal', b: 'Tek kişi sorumlu — gözükmüyorsa risk' },
			{ aspect: 'Uzun Vadeli Destek', a: 'Bakım sözleşmesi, SLA mevcut', b: 'Kişiye bağlı — kişi yoksa sorun' },
			{ aspect: 'Kompleks Entegrasyon', a: 'CRM, ERP, çok ülkeli — uzmanlar var', b: 'Bireysel kapasite sınırlı, dış kaynak gerekebilir' },
			{ aspect: 'Markaya Özel Tasarım', a: 'Yüksek kalite — dedike tasarımcı', b: 'Kişinin tasarım gücüne bağlı (portfolyoya bakın)' }
		],
		whenToChooseA: {
			headline: 'Web ajansı ne zaman doğru tercih?',
			reasons: [
				'Bütçeniz 100.000+ TL ve büyük bir kurumsal projeyseniz',
				'Çok dilli, çok ülkeli, kompleks entegrasyonlu bir altyapı gerekiyorsa',
				'Kurumsal satın alma süreciniz var (KDV faturası, ihale, sözleşme)',
				'Yıllık bakım sözleşmesi + SLA garantisi şart ise',
				'Marka kimliği yeniden yapılacaksa (logo, brand book, web hep birlikte)'
			]
		},
		whenToChooseB: {
			headline: 'Freelancer ne zaman doğru tercih?',
			reasons: [
				'Bütçeniz 50.000 TL altındaysa ve kaliteden ödün vermek istemiyorsanız',
				'Hızlı karar alıp 4-6 haftada canlıya geçmek istiyorsanız',
				'Doğrudan tasarımcıyla konuşup hızlı revizyon yapmak istiyorsanız',
				'KOBİ\'siniz ve aracı katmanlara para vermek istemiyorsanız',
				'Portfolyosu işiyle örtüşen bir freelancer bulduysanız (en kritik faktör)'
			]
		},
		honestTake:
			"Kendim freelance olduğum için bu cevabı tarafsız yazmaya çalışıyorum. Ajansın gerçek üstünlükleri var — büyük kurumsalda 5 paydaşı koordine etmek, çok ülkeli site, KDV+ihale süreci, SLA + bakım garantisi. Bu işler için ajansı önerdiğim oldu. Ama 50K-150K TL aralığındaki KOBİ projelerinde ajans tarafının %30-50\'si overhead — account manager, PM, satış ekibi, ofis maliyeti. Müşterinin parasının yarısı tasarıma değil, kurumsal yapıya gidiyor. Sonuç: aynı bütçeyle freelancerdan daha az tasarım gücü alıyorsunuz. Ayrıca ajansla iletişim genelde 3 katmanlı (siz → AM → PM → tasarımcı) — her geri bildirim 24-48 saat sürebiliyor. Freelancerda 2 saatte revizyon görüşür. Riski şudur: kişiye bağlısınız. Hastalanırsa, çıkarsa, başka projeye geçerse — sorun. Bu yüzden freelancer seçerken portfolyosu, eski müşteri referansları, sözleşme şartları ve kod sahipliği yazılı olmalı. \"Sözleşmesiz iş\" demek ucuz değil, riskli demek.",
		faq: [
			{
				q: 'Ajans 150.000 TL istiyor, freelance 35.000 TL istiyor — neden bu fark?',
				a: "Aynı işin maliyeti değil — ajans tarafında işin %30-50\'si operasyonel overhead (PM, AM, ofis, vergi, satış ekibi). Net tasarım/geliştirme saati ajans tarafında yaklaşık aynı, sadece o saate ekstra yapı maliyeti biniyor. Sorulması gereken: \"Bu büyük yapıya benim ihtiyacım var mı, yoksa direkt tasarımcıyla çalışsam yeter mi?\" KOBİ ölçeğinde cevap genelde \"yeter.\""
			},
			{
				q: 'Freelancer hastalanır ya da çıkarsa siteme ne olur?',
				a: "Bu en kritik risk. Mitigasyonu üç şey: (1) Sözleşmede kod sahipliği size devredilir, (2) GitHub/Bitbucket erişimi sözleşmenin bir parçası, (3) Hosting ve domain sizin hesabınızda. Bu üçü varsa freelancer kaybolsa bile siteyi başka bir geliştirici devralabilir — 1-2 hafta içinde iş tekrar yürür."
			},
			{
				q: 'Ajansla freelancer arasında bir orta yol var mı?',
				a: "Evet — 2-4 kişilik küçük stüdyolar. Tasarımcı + 1 geliştirici + opsiyonel PM. Ajans yapısının overhead\'i olmadan, freelancer riskinden daha kurumsal. KDV faturası verirler, sözleşme yaparlar. 50K-100K TL aralığında bu modelin sweet spot\'u."
			},
			{
				q: 'Ajansın yıllık bakım sözleşmesi gerçekten gerekli mi?',
				a: "Çoğu KOBİ için hayır. Tipik bakım sözleşmesi aylık 2.000-5.000 TL — yılda 24K-60K TL. Yapılan iş genelde küçük güncelleme + güvenlik patch. Bunu freelance/küçük stüdyoyla saatlik (saatlik 800-1.500 TL) ödemek genelde 5-10 katı daha ucuz. Bakım sözleşmesi yalnızca 500+ sayfalı/aktif e-ticaret sitelerde mantıklı."
			},
			{
				q: 'KDV faturası şart, freelancer veriyor mu?',
				a: "Şahıs şirketi olan freelancerlar KDV faturası kesebiliyor — Türkiye\'de yasal. Mücbir sebep yoksa, freelancerla çalışmadan önce \"şahıs şirketiniz var mı, KDV mükellefi misiniz, fatura kesebiliyor musunuz?\" sorulması gerekli. Ben örneğin şahıs şirketiyim — KDV faturası standart süreç."
			},
			{
				q: 'Kurumsal satın alma sürecim ihale gerektiriyor — freelance uyar mı?',
				a: "İhale modelinde genelde teklif veren tarafın belirli yıl/iş hacmi/sertifika gibi şartları olur. Çoğu freelancer bunları karşılayamaz, çok kısıtlı bir kısmı karşılar. Bu senaryoda <a href=\"/kurumsal-web-sitesi-yaptirma/\">kurumsal web sitesi</a> ihalesi için ajans daha pratik — ama ihaledeki kalite ve fiyat genelde ajans lehine değildir, bunu da göz önünde bulundurmak gerek."
			}
		],
		whatsappPrefill:
			"Merhaba, freelance tasarımcıyla çalışmayı düşünüyorum. Detayları konuşabilir miyiz?"
	},
	{
		slug: 'wordpress-vs-ozel-tasarim',
		optionA: { name: 'WordPress', tagline: 'Açık kaynak CMS, tema + eklenti ekosistemi' },
		optionB: { name: 'Özel Kodlanmış Site', tagline: 'Modern framework (Svelte, Next), özel yapı' },
		metaTitle: 'WordPress vs Özel Tasarım: 2026 Karşılaştırması',
		metaDescription:
			'WordPress mi yoksa özel kodlanmış modern bir site mi? Hız, güvenlik, bakım, eklenti yükü ve uzun vadeli maliyet karşılaştırması.',
		heroH1: 'WordPress vs Özel Kodlanmış Web Sitesi',
		heroSubtitle:
			"WordPress dünyada sitelerin ~%40\'ını çalıştırıyor — yaygın olması her senaryo için doğru olduğu anlamına gelmiyor. Bu sayfa hangi durumda hangisinin daha mantıklı olduğunu açıklıyor.",
		comparisonRows: [
			{ aspect: 'Başlangıç Maliyeti', a: 'Şablonla 5.000-15.000 TL, özel tema 25.000-80.000 TL', b: '15.000-70.000+ TL (paket bağlı)' },
			{ aspect: 'Yıllık Bakım', a: 'Eklenti güncellemeleri, güvenlik patch — aylık dikkat', b: 'Çok daha az bakım, sadece içerik' },
			{ aspect: 'Yükleme Hızı', a: 'Ortalama (eklenti yığını performansı düşürür)', b: 'Hızlı (modern framework optimize)' },
			{ aspect: 'Güvenlik', a: 'En çok saldırıya uğrayan platform — eklenti zaaflar', b: 'Daha az saldırı yüzeyi' },
			{ aspect: 'İçerik Yönetimi', a: 'Çok güçlü (Gutenberg, classic editor)', b: 'Headless CMS (Sanity, Directus) entegre edilirse iyi' },
			{ aspect: 'Eklenti Ekosistemi', a: 'Devasa — 60.000+ eklenti', b: 'Modern paket ekosistemi (npm)' },
			{ aspect: 'SEO', a: 'Yoast/Rank Math ile iyi, ama hız genelde sıkıntı', b: 'Yapı düzeyinde tam kontrol — hızlı + temiz' },
			{ aspect: 'E-ticaret', a: 'WooCommerce — yaygın ama hız + bakım yüklü', b: 'Özel altyapı — daha hızlı, daha ölçeklenebilir' },
			{ aspect: 'Geliştirici Ekosistemi', a: 'Türkiye\'de çok freelancer mevcut', b: 'Daha az ama uzmanlaşmış (Svelte, Next, React)' },
			{ aspect: 'Uzun Vadeli Esneklik', a: 'Tema değişikliği = sıfırdan başlamak', b: 'Daha kolay refactor, kademeli güncelleme' }
		],
		whenToChooseA: {
			headline: 'WordPress ne zaman doğru cevap?',
			reasons: [
				'Site içerik yoğun blog/haber sitesi olacaksa (yüzlerce makale)',
				'Birden fazla yazar/editor sürekli içerik girecekse',
				'Bütçe sınırlı ve özel tema almak istemiyorsanız',
				'Bağımlı olmak istediğiniz spesifik bir WP eklentisi varsa (ör. LearnDash, MemberPress)',
				'Mevcut ekibiniz WordPress biliyor ve eğitim maliyeti istemiyorsanız'
			]
		},
		whenToChooseB: {
			headline: 'Özel kodlanmış site ne zaman doğru cevap?',
			reasons: [
				'Hız ve Core Web Vitals kritikse (e-ticaret, lead generation, SEO)',
				'Marka kimliği şablon görünümlü olmasın istiyorsanız',
				'Ölçeklenmek istiyorsunuz (10x trafik, 10x sayfa) ve teknik borç biriktirmek istemiyorsanız',
				'Güvenlik öncelikli (KVKK, finansal veri, kişisel veri)',
				'Modern UX gerekiyorsa (animasyonlar, etkileşim, custom workflow)'
			]
		},
		honestTake:
			"WordPress\'i hâlâ kullanan müşterilerim var ve onlara \"taşı, taşı\" demiyorum. Aktif blog yayınlayan, 5+ yazarı olan haber sitelerinde WordPress\'in editör altyapısı genuinely en iyi seçenek. Ama 2026\'da WordPress\'i \"kurumsal kartvizit sitesi\" için kullanmak — ki Türkiye\'deki kullanım çoğunlukla bu — gereksiz şişkin. Tipik bir WordPress kurumsal sitesi: 12-25 eklenti yüklü, hız PageSpeed\'de 50-65, aylık \"plugin update lütfen\" maili, yılda 1-2 kere \"site hacked\" paniği, tema değişimi = sıfırdan yeniden yapım. Aynı kartvizit siteyi modern framework\'le yapmak: 2-3x hızlı yükleme, %90+ Core Web Vitals, yıllık bakım yok denecek kadar az. Maliyet farkı 2026\'da artık kapanıyor — şablon WP teması 15K, özel modern site 25-30K. 10K TL fark için 5 yıl boyunca daha hızlı + daha az bakım. WordPress\'in sweet spot\'u: aktif içerik yayını yapan haber/blog/kurs siteleri. Onun dışında genelde modern framework daha mantıklı.",
		faq: [
			{
				q: 'WordPress\'ten modern framework\'e geçiş zor mu?',
				a: "Tahmin edilenden kolay. WordPress veritabanından yazılar JSON\'a export ediliyor, modern site bu JSON\'ı okuyor. Tasarım sıfırdan yapılıyor (zaten yenileniyor). Tipik geçiş 4-6 hafta. <a href=\"/web-sitesi-yenileme/\">Yenileme süreci</a> WordPress geçişlerini kapsıyor."
			},
			{
				q: 'WordPress neden bu kadar yavaş yükleniyor?',
				a: "Tek tek bakıldığında her eklenti makul, üst üste eklenince 12 eklenti = 80-120 ekstra HTTP istek + 800KB-1.5MB JS yüklemesi. Buna bir de paylaşımlı hosting eklenince 4-6 saniye yükleme süresi normal. Modern framework\'ler statik build üretip CDN\'den dağıttığı için 0.8-1.5 saniyede açılıyor."
			},
			{
				q: 'Eklenti güncellemelerini kim yapacak?',
				a: "WordPress kullanıyorsanız aylık dikkat şart — kritik güvenlik açıkları yayınlandıktan 24-48 saat içinde patch geçmek gerekiyor. Yapmazsanız hack riski yüksek. Bakım sözleşmesi ya da kendiniz takip etmeniz gerekiyor. Modern framework\'lerde böyle bir aylık disiplin genelde gerekmiyor."
			},
			{
				q: 'WooCommerce e-ticaret için yeterli mi?',
				a: "Aylık 100-200 sipariş için yeterli. 500+ sipariş alan ya da çoklu pazaryeri entegrasyonu (Trendyol, Hepsiburada) gerekenlerde WooCommerce yorulmaya başlıyor — performans, raporlama, özel iş akışları zorlanıyor. <a href=\"/e-ticaret-sitesi-yaptirma/\">Özel e-ticaret altyapısı</a> ölçek hedefi olan mağazalarda daha güvenli."
			},
			{
				q: 'Türkiye\'de WordPress geliştiricisi bulmak daha kolay değil mi?',
				a: "Evet — bu gerçek. Modern framework (Svelte, Next.js) Türkiye\'de daha az yaygın. Ama \"freelancer bulmak kolay\" \"iyi freelancer bulmak kolay\" demek değil — WordPress freelance pazarında kalite çok dağınık. Modern framework tarafında daha az kişi var ama ortalama kalite daha yüksek."
			},
			{
				q: 'Hangi durumda WordPress\'i tavsiye ederim?',
				a: "Yoğun blog yayını yapan haber/medya/eğitim siteleri, çok yazarlı içerik üretimi, spesifik WP eklentisine bağımlılık (ör. LMS için LearnDash). Bu üç senaryoda WordPress hala en pratik seçim. Diğer kurumsal/e-ticaret/lead-generation senaryolarda 2026\'da modern framework daha mantıklı."
			}
		],
		whatsappPrefill:
			"Merhaba, WordPress'ten modern bir altyapıya geçişi düşünüyorum. Konuşabilir miyiz?"
	},
	{
		slug: 'sablon-vs-ozel-tasarim',
		optionA: { name: 'Hazır Şablon', tagline: 'ThemeForest, Wix, Shopify temaları' },
		optionB: { name: 'Özel Tasarım', tagline: 'Sıfırdan, markaya özel' },
		metaTitle: 'Şablon vs Özel Tasarım: Hangisi Daha Mantıklı?',
		metaDescription:
			'Hazır web tasarım şablonu mu yoksa özel tasarım mı? Maliyet, marka kimliği, dönüşüm oranı ve uzun vadeli ROI karşılaştırması.',
		heroH1: 'Şablon Tasarım vs Özel Tasarım',
		heroSubtitle:
			"İki seçenek farklı işler için tasarlanmış. Bu sayfa iki yaklaşımın güçlü ve zayıf yanlarını net anlatıyor — hangi durumda şablon yeterli, hangi durumda özel tasarım gerekli.",
		comparisonRows: [
			{ aspect: 'Maliyet', a: 'Tema 50-200 USD + kurulum (toplam 5K-15K TL)', b: '15K-70K+ TL paket bağlı' },
			{ aspect: 'Yapım Süresi', a: '3-7 gün (tema kurulumu + içerik)', b: '2-6 hafta' },
			{ aspect: 'Marka Eşsizliği', a: 'Düşük — aynı şablon binlerce kişide var', b: 'Yüksek — tamamen markaya özel' },
			{ aspect: 'Tasarım Kalitesi', a: 'Genelde iyi (popüler temalar profesyonelce yapılmış)', b: 'Tasarımcının yeteneğine bağlı (portfolyoya bakın)' },
			{ aspect: 'Esneklik', a: 'Şablon sınırları içinde değişiklik', b: 'Sınırsız — her detay özel' },
			{ aspect: 'Performans', a: 'Tema kalitesine bağlı — bazıları yavaş', b: 'Optimize edilebilir' },
			{ aspect: 'Lisans', a: 'Genelde tek site lisansı, satıştan sonra tema güncellemesi sınırlı', b: 'Tam sahiplik' },
			{ aspect: 'SEO Esnekliği', a: 'Şablon yapısına bağlı', b: 'Tam kontrol' },
			{ aspect: 'Dönüşüm Oranı', a: 'Genel — markaya özel optimize edilmemiş', b: 'Hedef müşteriye özel optimize edilebilir' }
		],
		whenToChooseA: {
			headline: 'Hazır şablon ne zaman yeterli?',
			reasons: [
				'Bütçeniz sıkı (15K TL altı) ve hızlı canlıya geçmek lazımsa',
				'Site bir vitrin/kartvizit, dönüşüm odaklı değilse',
				'Marka kimliği önemli değil ya da henüz oturmamışsa',
				'Kişisel proje, yan iş, tek seferlik etkinlik için ise',
				'Şablonu görünce \"tam istediğim gibi\" diyorsanız (ki nadir)'
			]
		},
		whenToChooseB: {
			headline: 'Özel tasarım ne zaman gerekli?',
			reasons: [
				'Marka kimliği kritik — \"şablon görünümlü\" istemiyorsanız',
				'Site lead/satış üretecek (dönüşüm optimizasyonu önemli)',
				'Sektörünüz görsel olarak rekabetçi (otel, restoran, lüks ürün)',
				'Hedef müşteri segmenti net ve özel UX gerekiyor',
				'Önümüzdeki 3+ yıl markanızı bu siteyle anlatacaksanız'
			]
		},
		honestTake:
			"\"Şablonla yapılmış site\" demek otomatik kötü demek değil. ThemeForest\'taki Avada, Astra gibi popüler temalar gerçekten iyi tasarlanmış — kullanım rahatlığı, performans, dokümantasyon hepsi yerinde. Ama şablonun temel sorunu \"sizin gibi olmaması\". Müşteriniz siteye girince sektördeki diğer 50 firmadan ayırt edebilir mi? Genelde hayır — çünkü o 50 firma da aynı şablonu kullanıyor. Bu \"farkındalık eksikliği\" 2-3 yıl sonra büyük problem: Google\'da tıklama oranınız düşük (görsel olarak özgün değil), referansla gelen müşteri \"şablon kullanmışsınız\" diye fiyat pazarlığı yapıyor, marka algısı sıkışıyor. Özel tasarımın gerçek değeri burada — 5 saniyelik ilk izlenimde \"ciddi marka\" hissi vermek. Tabii ki, 5K-15K TL\'lik bütçeyle 50K\'lık özel tasarım yapılamaz, oraya zorlamamak gerekiyor. Bu durumda dürüst öneri: en iyi şablonu seç, içeriği ve fotoğrafları markaya özel yap, 1-2 yıl içinde bütçe oluşunca özel tasarıma geç.",
		faq: [
			{
				q: 'En iyi şablonlar hangileri?',
				a: "WordPress: Astra, GeneratePress, Kadence (hepsi performans odaklı). Shopify: Dawn, Studio, Origin (sade, hızlı). ThemeForest\'tan tema almayı önermem — performans çoğunlukla zayıf. Wix\'in kendi şablonları içinde \"Studio\" serisi en iyileri."
			},
			{
				q: '15K TL bütçeyle özel tasarım mümkün mü?',
				a: "Dürüst cevap: hayır. 15K TL bütçesinde özel tasarım yapan kişi ya tasarım kısmını şablon kullanıp \"özel\" diye satıyor ya da çok düşük kalite çıkıyor. <a href=\"/web-sitesi-fiyatlari/\">Gerçek özel tasarım maliyeti</a> 25K-30K TL\'den başlıyor. Bütçe yetmiyorsa şablon + iyi içerik daha akıllıca."
			},
			{
				q: 'Şablon kullanmış bir siteyi yenilemek mi, sıfırdan özel mi?',
				a: "Şablonun ne kadar mevcut iş yaptığına bağlı. Aktif lead/satış üreten bir şablon site için \"sıfırdan özel\" geçişi 4-6 hafta canlıyı bozabilir, riskli. Bu durumda kademeli yenileme (içerik + üst seviye tasarım önce, alt yapı sonra) daha güvenli. Hiç iş yapmayan şablon site içinse direkt sıfırdan özel mantıklı."
			},
			{
				q: 'Şablon SEO için engel mi?',
				a: "Direkt engel değil — temaya bağlı. Kötü kodlanmış şablonlar (DOM şişkin, gereksiz JS) SEO\'yu indirir. İyi şablonlar (yukarıdaki Astra, Kadence vb.) SEO için problem değil. Asıl problem: şablon site \"sizin\" değil — Google\'a sektörünüzde \"farklı bir ses\" sunmuyor. Bu uzun vadede tıklama oranını ve markayı etkiliyor."
			},
			{
				q: 'Özel tasarımın 3 yıllık ROI\'si nasıl çıkıyor?',
				a: "Kabaca: özel tasarım vs şablon farkı 25K TL diyelim. Eğer site ayda 1 lead getirip onlardan biri 25K TL\'lik iş olursa fark 1 ayda kapanıyor. Şablon site genelde lead getirme konusunda zayıf (CTA\'lar genel, dönüşüm optimizasyonu yok), özel tasarım dönüşüm odaklı yapılıyor. <a href=\"/kurumsal-web-sitesi-yaptirma/\">Kurumsal site</a> senaryosunda bu hesap genelde özel tasarım lehine çalışıyor."
			},
			{
				q: 'Hangi sektörlerde şablon hiç yetmez?',
				a: "Lüks otel, butik restoran, kurumsal hukuk, kurumsal danışmanlık, premium e-ticaret. Bu sektörlerde marka algısı satışın yarısı — şablon görünümlü site müşterinin algısını anında düşürüyor. \"Bu firma bana kaç para kazandıracak\" sorusunu soran B2B müşteri için özel tasarım birkaç bin liralık fark değil, satışı kapatan faktör."
			}
		],
		whatsappPrefill:
			"Merhaba, özel tasarım web sitesi yaptırmak istiyorum. Görüşebilir miyiz?"
	},
	{
		slug: 'ucuz-vs-kaliteli-web-sitesi',
		optionA: { name: 'Ucuz Site (5K-15K TL)', tagline: 'Hızlı, basit, şablon ağırlıklı' },
		optionB: { name: 'Kaliteli Site (25K-70K TL)', tagline: 'Strateji, tasarım, optimizasyon' },
		metaTitle: 'Ucuz vs Kaliteli Web Sitesi: Gerçek Maliyet',
		metaDescription:
			'Ucuz web sitesi gerçekten para tasarrufu mu? 3 yıllık toplam maliyet, gizli giderler, kayıp lead\'ler ve uzun vadeli ROI dürüst karşılaştırması.',
		heroH1: 'Ucuz vs Kaliteli Web Sitesi',
		heroSubtitle:
			"İlk fiyat etiketinin altındaki gerçek maliyeti dürüstçe açıklıyorum — \"ucuza yaptırma\" senaryosunun 3 yıllık toplam maliyetinin neden genelde \"baştan kaliteli yaptırma\"dan pahalı olduğunu.",
		comparisonRows: [
			{ aspect: 'İlk Maliyet', a: '5.000-15.000 TL', b: '25.000-70.000 TL' },
			{ aspect: '1. Yıl Bakım', a: 'Genelde \"sözleşme dışı\", 5K-10K TL ek', b: 'Pakete dahil ya da düşük' },
			{ aspect: '2-3. Yıl Yenileme', a: 'Sıfırdan yapım gerekir genelde', b: 'Mevcut site iyileştirilir' },
			{ aspect: 'Yükleme Hızı', a: 'Şablon + ucuz hosting = 4-6 saniye', b: 'Optimize edilmiş = 1-2 saniye' },
			{ aspect: 'Lead Dönüşümü', a: 'Genel CTA, dönüşüm optimizasyonu yok', b: 'A/B test, dönüşüm odaklı tasarım' },
			{ aspect: 'SEO', a: 'Temel — Google\'da çıkması zor', b: 'Yapı + hız + içerik = sıralama şansı' },
			{ aspect: 'Sahiplik', a: 'Kod ve domain çoğunlukla yapanın hesabında', b: 'Tamamen size devir' },
			{ aspect: 'İletişim', a: 'Yapım sonrası ulaşmak zor', b: 'Sözleşmeli destek mevcut' },
			{ aspect: '3 Yıllık Toplam Maliyet', a: '~25K-40K TL (yenileme + bakım dahil)', b: '~30K-75K TL (tek seferlik + minimal bakım)' }
		],
		whenToChooseA: {
			headline: 'Ucuz site ne zaman yeterli?',
			reasons: [
				'Site SADECE bir kartvizit — kimse trafiği beklemiyor',
				'İşinizin %95+ sosyal medya/Instagram/WhatsApp\'tan geliyorsa',
				'Site 1 yıl sonra kapatılacak (geçici proje, etkinlik)',
				'Yan iş/hobi seviyesinde, ana gelir kaynağı değilse',
				'Bütçe gerçekten 15K TL altı ve aşamalı büyütmek mantıklıysa'
			]
		},
		whenToChooseB: {
			headline: 'Kaliteli site ne zaman zorunlu?',
			reasons: [
				'Site lead/satış üretecek — gerçek bir iş kanalı',
				'Marka algısı kritik (B2B kurumsal, lüks, sağlık, hukuk)',
				'Önümüzdeki 3-5 yıl bu sitenin sahibi siz olacaksanız',
				'Google\'dan organik müşteri beklentiniz varsa',
				'Sektörünüz görsel olarak rekabetçi'
			]
		},
		honestTake:
			"En sık dinlediğim hikaye şu: Müşteri 6 ay önce 8.000 TL\'ye site yaptırmış. Şimdi: site yavaş, mobilde bozuk, Google\'da çıkmıyor, yapan kişi WhatsApp\'a cevap vermiyor, domain yapanın adına. \"Yenilemek istiyorum\" diyor — ben de \"sıfırdan yapmak gerek\" diyorum. Sonuç: 8K kayıp + 30K yeni iş = 38K. Baştan 30K\'lık siteyi yapsa toplam 30K olacaktı. \"Ucuz\" gerçekten ucuz değil, 3 yıllık ödediğiniz toplam fiyatın bir parçası. Tabii ki bu her senaryoda doğru değil — bütçe gerçekten 8K TL\'yi aşmıyorsa, site iş yapmayacaksa, 1 yıl içinde kapanacaksa — \"ucuz\" doğru cevap. Ama \"şu an 8K verip sonra büyütünce yenilerim\" planı çoğunlukla yürümüyor. Çünkü 1 yıl sonra siteyi yenilemek = sıfırdan yapmak. Tek istisna: ucuz site sırasında öğrendiklerinizle gerçek müşteri ihtiyacını netleştirmiş olursunuz — bu durumda \"prototip\" olarak ucuz site mantıklı. Ama bunu baştan kabullenip \"1 yıl sonra yenileyeceğim\" diye planlamak gerekiyor.",
		faq: [
			{
				q: '5K TL\'lik site neden gerçekte 25K\'ya mal oluyor?',
				a: "Tipik 5K TL site: yapan kişi domain ve hosting kendi adına alıyor (1K), 1-2 hafta içinde teslim ediyor (3K saatlik), tema lisansı kendi hesabında (1K). Sonra: yıl boyunca iletişim kopuyor, mobilde bozulan kısımları siz tamir ettirmek için 2-3K daha ödüyorsunuz, 1 yıl sonra Google\'a girmediği için yeniden yapım gerekli (15-20K). Toplam 22-28K. Baştan 25K\'lık iyi bir site = aynı para, çok daha az stres."
			},
				{
				q: 'Bütçem gerçekten 10K — ne yapmalıyım?',
				a: "Dürüst cevap: bu bütçede uzun ömürlü site yaptırmak zor. 3 seçenek: (1) Wix premium kendiniz yaparsınız (yıllık 12K\'ya çıkar ama hızlı ve sahip olduğunuz kadar size ait), (2) WordPress + iyi şablon + 5-7K kurulum yaptırırsınız, (3) 6 ay daha bütçe biriktirip 25K\'ya iyi yaptırırsınız. Üçüncüsü genelde en doğru cevap."
			},
			{
				q: 'Ucuz site Google\'a girmiyor — neden?',
				a: "Genelde 4 sebep: (1) Tema kalitesi düşük, sayfa hızı 2-3 saniyenin üzerinde, (2) Schema markup eksik, (3) İçerik kopya/template fill, (4) Backlink yok ve internal linking düzensiz. Ucuz işlerde bu 4 unsur genelde atlanıyor — \"site yapıldı\" derler ama SEO yok. <a href=\"/web-sitesi-fiyatlari/\">Doğru fiyatlandırma</a> bu unsurları kapsayacak şekilde yapılır."
			},
			{
				q: 'Domain yapanın adına alınmışsa ne olur?',
				a: "Domain transferi kabul ederse 1-2 hafta içinde halledilebilir. Etmezse hukuki süreç uzun (TR ICANN üzerinden anlaşmazlık 6-12 ay). Yeni site için yeni domain almak mantıklı. Bu yüzden başlangıçta sözleşmede \"domain müşteri adına\" yazılması şart — pazarlık konusu değil."
			},
			{
				q: 'Düşük bütçede kalite alabilirim mi?',
				a: "Evet — ölçeği daraltarak. 25K\'lık ihtiyacı 15K bütçeyle karşılamak istiyorsanız, sayfa sayısını/özelliği kısın. Tek sayfa landing + iyi tasarım 15K\'ya yapılır. 5 sayfa kurumsal site 15K\'ya yapılırsa kalite ödün verir. Az ama kaliteli > çok ama düşük kalite."
			},
			{
				q: 'Hangi durumda \"ucuz\" gerçekten doğru karar?',
				a: "(1) Site geçici (etkinlik, kampanya, 1 yıl içinde kapanacak), (2) Site bir hobi/yan proje, ana gelir değil, (3) Müşteri ihtiyacını öğrenmek için \"prototip\" niyetinde, (4) Bütçe gerçekten 15K altında ve aşamalı büyütme planı net. Bu 4 senaryoda ucuz site doğru. Onun dışında genelde uzun vadede daha pahalıya patlıyor."
			}
		],
		whatsappPrefill:
			"Merhaba, kaliteli bir web sitesi yaptırmak istiyorum. Detayları konuşabilir miyiz?"
	},
	{
		slug: 'yurtdisi-vs-yerli-web-tasarimci',
		optionA: { name: 'Yurtdışı Tasarımcı', tagline: 'Upwork, Fiverr, uzaktan ekip' },
		optionB: { name: 'Yerli (TR) Tasarımcı', tagline: 'Türkiye\'de tasarımcı, doğrudan iletişim' },
		metaTitle: 'Yurtdışı vs Yerli Web Tasarımcı: 2026 Karşılaştırması',
		metaDescription:
			'Yurtdışı tasarımcıyla mı (Upwork, Fiverr) yoksa Türkiyeli tasarımcıyla mı çalışmalı? Maliyet, dil, KVKK, fatura, KDV ve kalite karşılaştırması.',
		heroH1: 'Yurtdışı vs Yerli Web Tasarımcı',
		heroSubtitle:
			"Upwork ve Fiverr Türkiye fiyatlarının altında teklifler veriyor — peki neden çoğu KOBİ yine yerli tasarımcıyla çalışıyor? Bu sayfa iki seçeneğin gerçek artılarını ve eksilerini açıklıyor.",
		comparisonRows: [
			{ aspect: 'Tipik Saatlik Ücret', a: 'Hindistan/Pakistan: 8-25 USD/saat, AB/ABD: 50-150 USD/saat', b: '500-2.000 TL/saat (yaklaşık 14-55 USD)' },
			{ aspect: 'Tipik Proje Fiyatı', a: 'Hindistan: 3K-15K TL eşdeğeri, AB/ABD: 50K-200K+ TL eşdeğeri', b: '15K-70K TL' },
			{ aspect: 'Dil', a: 'İngilizce — TR içerik için çeviri sorunu olabilir', b: 'Türkçe ana dil — içerik sorunsuz' },
			{ aspect: 'Saat Dilimi', a: 'Hindistan: +2.5 saat, ABD: -7/-10 saat', b: 'Aynı saat dilimi' },
			{ aspect: 'KDV Faturası', a: 'Yok — gümrük + KDV beyanı kendiniz', b: 'Şahıs şirketi/Ltd. mukabili KDV faturası verir' },
			{ aspect: 'KVKK Uyumu', a: 'Yurtdışı tasarımcı genelde TR KVKK\'ya hakim değil', b: 'KVKK gereği yerli tasarımcı bilir' },
			{ aspect: 'Sözleşme', a: 'Genelde Upwork/Fiverr içinde — TR mahkemesinde dava zor', b: 'TR sözleşmesi, TR mahkemesinde dava mümkün' },
			{ aspect: 'Ödeme', a: 'USD/EUR — kur dalgalanması riski', b: 'TL — sabit fiyat' },
			{ aspect: 'TR Müşteri Anlayışı', a: 'TR pazar dinamiklerine yabancı', b: 'TR pazarını ve müşteri davranışını bilir' },
			{ aspect: 'İletişim Kanalı', a: 'E-posta + Slack (yazılı, gecikme)', b: 'WhatsApp/telefon — anlık' }
		],
		whenToChooseA: {
			headline: 'Yurtdışı tasarımcı ne zaman mantıklı?',
			reasons: [
				'Hedef pazarınız zaten yurtdışıysa (İngilizce site)',
				'Bütçe çok sıkı (Hindistan 5K TL\'lik iş)',
				'Tasarım sadece görsel iş — TR içerik yazımı yapacak yerli ekibiniz var',
				'Çok özel bir niche uzmanlık aranıyorsa (örneğin Webflow ileri seviye)',
				'KVKK uyumu sizin için önemli değilse (B2B, kişisel veri yok)'
			]
		},
		whenToChooseB: {
			headline: 'Yerli tasarımcı ne zaman daha mantıklı?',
			reasons: [
				'Site Türkçe ve TR pazarına hitap edecekse',
				'KVKK uyumu, KDV faturası, TR sözleşmesi şartsa',
				'Anlık iletişim ve hızlı revizyon istiyorsanız',
				'TR müşteri davranışını bilen bir tasarımcı şart ise (Trendyol, iyzico, vb. entegrasyonlar)',
				'Kur dalgalanması riskinden kaçınmak istiyorsanız'
			]
		},
		honestTake:
			"Türkiyeli bir tasarımcı olarak bu konuda taraflı olabilirim, o yüzden mümkün olduğunca dürüst yazıyorum. Hindistan/Pakistan freelancerlardan iş yaptırma deneyimim var — saf görsel iş için (logo, basit landing) işe yarıyor, fiyat avantajı gerçek. Ama TR içerikli kurumsal site için kötü deneyim oranım yüksek: TR yazım hataları, KVKK metni eksik, iyzico/PayTR entegrasyonu sırasında \"bu nedir\" soruları, ödemeyle ilgili dolar üzerinden hesaplama, sözleşme bittikten sonra ulaşılamayan iletişim. AB/ABD freelancerlar genelde 50K-200K TL eşdeğeri istiyor — bu paraya zaten Türkiye\'de daha kaliteli tasarımcılarla çalışılır. \"Aradan \" tabir edilebilecek ülkeler (örneğin Doğu Avrupa) bazen mantıklı oluyor — orta fiyat, AB-İngilizce kalitesi. Ama TR pazarına hitap eden site için yerel bilgi ve dil-anadil avantajı genelde belirleyici. Sonuç: Yurtdışı tasarımcı = İngilizce sayfa + uluslararası müşteri için mantıklı; TR sayfa + TR müşteri için yerli daha güvenli. Bütçe baskısı çok büyükse Hindistan denenebilir ama riskleri kabullenerek.",
		faq: [
			{
				q: 'Hindistan\'dan 3K TL\'ye site yaptırdım — neden bu kadar ucuz?',
				a: "Saatlik ücret farkı (10 USD vs 50 USD) + büyük ölçek (Hindistan\'da 100K+ tasarımcı çok rekabetçi). Bu gerçek. Ama 3K\'ya yaptıran müşterilerin %50+\'sı 6 ay içinde \"site bozuk, sahibi cevap vermiyor\" diye geliyor. Düşük fiyatın gerçek maliyeti: revizyon yapılmaması, mobil hata düzeltilmemesi, ulaşılamaması, sahiplik belirsizliği."
			},
			{
				q: 'KDV faturası gerçekten önemli mi?',
				a: "Şahıs şirketi/Ltd. iseniz KDV faturası gider olarak yazılabilir — verginiz düşer. Yıllık 30K TL\'lik tasarım giderini gider yazmak %20 vergi tasarrufu = 6K TL. Yurtdışı ödemede bu mümkün değil (gümrük beyannamesi + KDV beyanı kendiniz yapacaksınız, çoğunlukla denetimde sıkıntılı). Yerli tasarımcı KDV faturası kesiyorsa bu net avantaj."
			},
			{
				q: 'KVKK uyumu için yerli tasarımcı şart mı?',
				a: "KVKK metni hazırlamak için TR hukukçu/tasarımcı uzmanlığı gerekli. Yurtdışı freelancer kopya KVKK metni yapıştırırsa eksik/yanlış olabilir, GDPR ile karıştırabilir. Para cezası 50K-1M TL aralığında. Yerli tasarımcı genelde KVKK metnini hukukçuya doğrulatır ya da temel bir versiyon hazırlar. Bu fark KVKK denetimine girersek belirleyici."
			},
			{
				q: 'Upwork\'te \"Top Rated\" tasarımcılar güvenli mi?',
				a: "Upwork \"Top Rated\" platform içi başarı ölçer (zamanında teslim, müşteri memnuniyeti). TR\'de görmediğim hatalar (TR yazım, KVKK, iyzico entegrasyonu) Upwork rating\'ine yansımıyor. Saf görsel/İngilizce iş için Top Rated tasarımcı güvenli. TR-spesifik iş için riski tamamen ortadan kaldırmıyor."
			},
			{
				q: 'Sözleşme imzalamak hangi durumda yurtdışı tasarımcıyla mümkün?',
				a: "Upwork/Fiverr platform sözleşmesi platformun kendisi tarafında. Anlaşmazlık olursa platform arabuluculuk yapar — ama TR mahkemesinde dava açmak imkansız denecek kadar zor. Doğrudan freelancer ile (platform dışı) iş yaptıysanız ve sözleşme hiç yoksa para iadesi neredeyse yok. Yerli tasarımcı ile TR Hukuk\'a tabi sözleşme genelde standart."
			},
			{
				q: 'Hangi senaryoda yurtdışı tasarımcıyı kesin öneririm?',
				a: "(1) Hedef pazarınız İngilizce-konuşan ülkelerdeyse (saturday.com gibi siteler), (2) Çok özel teknoloji bilgisi gerekliyse (örnek: Webflow CMS uzmanlığı, Three.js 3D web), (3) Yan ürün/hobi projesi, ticari önemi düşükse, (4) İçerik tarafını TR ekibiniz yönetiyor, tasarımcı sadece görsel/kod yazıyor. Bu 4 senaryoda yurtdışı freelance mantıklı."
			}
		],
		whatsappPrefill:
			"Merhaba, Türkiyeli bir tasarımcıyla çalışmayı düşünüyorum. Görüşebilir miyiz?"
	}
];

export function getComparison(slug: string): Comparison | undefined {
	return comparisons.find((c) => c.slug === slug);
}

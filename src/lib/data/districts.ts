// Programmatic SEO data for Istanbul district landing pages.
// Each entry powers /[slug]-web-tasarim/ via DistrictPage.svelte.
//
// IMPORTANT: Some "facts" embedded in this file are general industry context,
// NOT precisely verified against primary sources. Specifically:
//  - Population figures use approximate ranges and the "yaklaşık" qualifier.
//    Cross-check against TÜİK ADNKS before quoting precise numbers.
//  - Neighborhood lists are based on common knowledge; verify before using.
//  - Industry mix per district is directional, not survey-validated.
//  - Statements like "çoğu işletmenin sitesi yok" use "many" not specific %.
//
// Anything that becomes a quoted statistic in the email or ad copy MUST
// be re-verified against a primary source first.

export interface District {
	slug: string;
	name: string;
	titleSuffix: string;
	population: string;
	character: string; // 2-3 sentence description for hero
	neighborhoods: string[]; // for local-anchor specificity
	industryMix: string[]; // typical business types in the district
	whyHere: string; // 1-2 sentence "why this district matters" pitch
	openingPara: string; // longer 80-120 word intro
	microCopy: {
		nearbyDistricts: string[]; // for internal cross-linking
		specificPain: string; // a district-specific pain point
		culturalNote: string; // e.g. "creative scene", "corporate clusters"
	};
}

export const districts: District[] = [
	{
		slug: 'kadikoy',
		name: 'Kadıköy',
		titleSuffix: "Anadolu Yakası'nın Yaratıcı Merkezi",
		population: '~485.000',
		character:
			"Kadıköy, İstanbul'un Anadolu yakasında yaratıcı sektörün ve bağımsız işletmelerin merkezi. Moda, Caddebostan, Bahariye ve Yeldeğirmeni hattında binlerce küçük işletme — kafe, butik, sanat galerisi, kreatif ajans — kendi kimliklerini yansıtan dijital varlık arıyor.",
		neighborhoods: ['Moda', 'Caddebostan', 'Bahariye', 'Yeldeğirmeni', 'Bostancı'],
		industryMix: [
			'Bağımsız kafe ve restoranlar',
			'Butik mağazalar ve concept store\'lar',
			'Yaratıcı ajanslar ve stüdyolar',
			'Eğitim merkezleri ve sanat atölyeleri',
			'Bağımsız kuaför ve güzellik salonları'
		],
		whyHere:
			"Kadıköy işletmeleri marka kimliklerine düşkün — şablon site kabul etmezler. İhtiyaç: özel tasarım + hızlı teslimat + makul fiyat üçgeni.",
		openingPara:
			"Kadıköy'de işletme yürütüyorsanız, müşterilerinizin sizi nasıl bulduğunu zaten biliyorsunuz: Instagram, Google Maps, kulaktan kulağa. Ama 2026'da bunlar yetmiyor — bir müşteri ile çalışmaya karar vermeden önce çoğunlukla siteye bakıyor. Şablon görünümlü, mobilde bozuk veya 2018'den kalma bir site, Caddebostan'daki rakibinizin yeni Squarespace temasından daha kötü görünüyor — ve müşteri çoktan onu seçmiş oluyor. Kadıköy işletmelerinin en sık karşılaştığı sorun: 'sosyal medyam iyi ama site tarafında hiçbir şey yapamıyorum.' Çözüm tam sayfa yenileme değil, ihtiyaç duyduğunuz 5-7 sayfaya odaklı, sizin görselinizi ve sesinizi yansıtan özel tasarım.",
		microCopy: {
			nearbyDistricts: ['uskudar', 'atasehir', 'maltepe'],
			specificPain:
				"Caddebostan ve Moda'daki bağımsız işletmelerin çoğunda site ya hiç yok ya da Wix/Squarespace üzerinde kendi hazırlanmış temel bir sayfa.",
			culturalNote: 'Yaratıcı ve marka-bilincine sahip işletme topluluğu.'
		}
	},
	{
		slug: 'besiktas',
		name: 'Beşiktaş',
		titleSuffix: 'Avrupa Yakası Profesyonel İş Merkezi',
		population: '~190.000',
		character:
			"Beşiktaş, Levent ve Etiler ile birlikte İstanbul'un kurumsal kalbi. Mali müşavirler, hukuk büroları, sigorta acenteleri, iç mimarlık stüdyoları — burada profesyonellik vitrindir. Sitenize bakan müşteri, ajansınızı, butiğinizi veya ofisinizi seçerken aynı standartı uygular: ya iyi hazırlanmış ya da güvensiz.",
		neighborhoods: ['Levent', 'Etiler', 'Akatlar', 'Bebek', 'Ortaköy'],
		industryMix: [
			'Mali müşavirlik ve hukuk büroları',
			'Sigorta ve finans danışmanlığı',
			'İç mimarlık ve tasarım stüdyoları',
			'Mimarlık ofisleri',
			'Butik dış ticaret şirketleri'
		],
		whyHere:
			"Beşiktaş işletmeleri 'işimi ciddiye alıyorum' mesajını siteden vermek zorunda. Şablon ya da düşük kaliteli bir site, fiziki ofisinizi temsil etmiyor — kayıp müşteri demek.",
		openingPara:
			"Beşiktaş'ta — özellikle Levent ve Etiler ekseninde — işletme yürütmek demek, müşterinin sizi 'profesyonel ofis' kategorisinde değerlendirmesi demek. Bu kategoride giriş bileti net: hızlı yüklenen, mobil uyumlu, içerik dolu, güvenilir görünen bir web sitesi. Karşılaştırma çok basit: müşteri Etiler'deki üç hukuk bürosunu da Google'da arıyor. Hangisinin sitesi 2 saniyede açılıyor, hangisinde gerçek avukat fotoğrafları var, hangisinde hizmetler net listelenmiş — onu seçiyor. 2018'de yapılmış, mobilde menüsü çalışmayan bir site, fiyat fark etmeksizin elenmek demek. Kurumsal müşterileri hedefleyen Beşiktaş işletmeleri için web sitesi 'olsa fena olmaz' değil — satışın ön kapısı.",
		microCopy: {
			nearbyDistricts: ['sisli', 'beyoglu', 'bakirkoy'],
			specificPain:
				"Levent ve Etiler'deki kurumsal hizmet ofislerinin çoğu, ortaklık marka kimliği için yüksek bütçe ayırırken web sitesini en sona bırakıyor — ve fark sonradan açıklıyor.",
			culturalNote: 'Profesyonel-formal iş kültürü; B2B ağırlıklı.'
		}
	},
	{
		slug: 'sisli',
		name: 'Şişli',
		titleSuffix: "İstanbul'un Sağlık ve Ticaret Merkezi",
		population: '~265.000',
		character:
			"Şişli; sağlık merkezleri, plazalar, AVM'ler, oto galeriler ve dış ticaret şirketleriyle İstanbul'un en yoğun ticaret bölgelerinden. Mecidiyeköy, Nişantaşı ve Fulya ekseninde binlerce KOBİ, müşteri akışı için Google'a bağımlı.",
		neighborhoods: ['Mecidiyeköy', 'Nişantaşı', 'Fulya', 'Bomonti', 'Harbiye'],
		industryMix: [
			'Özel klinikler ve sağlık merkezleri',
			'Estetik ve diş kliniği zincirleri',
			'Oto galeriler ve servis',
			'Dış ticaret ofisleri',
			'Butik AVM mağazaları'
		],
		whyHere:
			"Şişli işletmeleri yüksek rekabet içinde — özellikle sağlık ve oto sektöründe Google reklam fiyatları yüksek. Organik trafik için site SEO altyapısı kritik.",
		openingPara:
			"Şişli'de — özellikle Mecidiyeköy ve Nişantaşı'nda — rekabet acımasız. Bir diş kliniği ararken müşteri 'şişli diş kliniği' arattığında Google ilk sayfada 10 sonuç var, ve siz oradaysanız fark etmek için 3 saniyeniz var. Üç şey hızla değerlendiriliyor: (1) Site mobilde düzgün açılıyor mu? (2) Hizmet listesi net mi? (3) Online randevu / arama butonu görünür mü? Üç sorudan birinin cevabı 'hayır' ise, müşteri zaten bir sonraki sonuca geçmiş. Şişli işletmesi olarak siteniz sadece 'olsun' değil — Google reklam maliyetleriniz yüksek olduğu için, organik aramadan gelen ücretsiz trafiği yakalayan bir altyapı şart.",
		microCopy: {
			nearbyDistricts: ['besiktas', 'beyoglu', 'kadikoy'],
			specificPain:
				"Şişli sağlık sektöründe Google Ads tıklama maliyetleri yüksek — organik aramayı yakalamayan kliniklerin müşteri edinme maliyeti hızla artıyor.",
			culturalNote: 'Yoğun rekabet, hızlı tempolu ticaret kültürü.'
		}
	},
	{
		slug: 'beyoglu',
		name: 'Beyoğlu',
		titleSuffix: 'Tarihi Dokuda Modern Markalar',
		population: '~225.000',
		character:
			"Beyoğlu — İstiklal, Galata, Karaköy, Cihangir hattında gastronomi, sanat, butik konaklama ve yaratıcı endüstri işletmeleri. Her işletmenin bir hikayesi var, ve siteniz o hikayeyi anlatmıyor — ya da kötü anlatıyor — ise müşteri tarihi yapıdaki esprili kafenizi farklı bir Galata mekanına dönüştürüyor.",
		neighborhoods: ['Galata', 'Karaköy', 'Cihangir', 'Çukurcuma', 'Asmalımescit'],
		industryMix: [
			'Restoran ve gastronomi',
			'Butik oteller ve pansiyonlar',
			'Sanat galerileri ve antika',
			'Yaratıcı stüdyolar (mimari, fotoğraf)',
			'Bağımsız moda ve aksesuar markaları'
		],
		whyHere:
			"Beyoğlu işletmesi olarak müşteriniz turist + yerli + uluslararası karışımı. Bilingual + mobil + hızlı + hikaye odaklı bir siteye ihtiyacınız var.",
		openingPara:
			"Beyoğlu'nda işletme yürütüyorsanız müşterilerinizin yarısı Türk değil. Karaköy'deki butik otelinize Berlin'den birisi rezervasyon yaparken siteniz İngilizce mi? Cihangir'deki kafenizin menüsü mobilde okunabilir mi? Galata'daki sanat galeriniz Instagram'da harika görünüyor ama site bağlantısı ölü mü? Beyoğlu işletmesi için site 'dijital vitrinden' fazlası — uluslararası müşteri için ilk ve genelde tek temas noktası. Tarihi yapı içindeki butik mekanların en büyük sorunu: fiziksel mekan harika görünüyor ama site WordPress 2017 teması üzerinde, mobilde zoom yapılmadan menü okunmuyor, rezervasyon Booking.com'a gidiyor ve %20 komisyon ödüyorsunuz. Çözüm direkt bağlantı + bilingual + hikaye-odaklı tasarım.",
		microCopy: {
			nearbyDistricts: ['besiktas', 'sisli', 'kadikoy'],
			specificPain:
				"Galata-Karaköy aksındaki butik otellerin çoğu Booking.com'a %15-25 komisyon ödüyor çünkü direkt rezervasyon altyapısı yok.",
			culturalNote: 'Uluslararası + yerel karışımı; hikaye odaklı pazarlama.'
		}
	},
	{
		slug: 'uskudar',
		name: 'Üsküdar',
		titleSuffix: "Anadolu Yakası'nın Geleneksel ve Sağlık Merkezi",
		population: '~530.000',
		character:
			"Üsküdar; sağlık ocakları, eğitim kurumları, dini hizmetler, yerel ticaret ve aile işletmelerinin yoğun olduğu bir bölge. Çoğu küçük-orta işletme on yıllardır faaliyette ama dijital varlıkları zayıf veya hiç yok.",
		neighborhoods: ['Bağlarbaşı', 'Kuzguncuk', 'Beylerbeyi', 'Çengelköy', 'Acıbadem'],
		industryMix: [
			'Aile sağlık merkezleri ve klinikleri',
			'Eğitim kurumları ve dershaneler',
			'Yerel marketler ve fırınlar',
			'Berber ve kuaförler',
			'Mali müşavirlik ve emlak ofisleri'
		],
		whyHere:
			"Üsküdar işletmelerinin büyük kısmında ya hiç web sitesi yok ya da çok eski. Pazarın açıklığı en büyük fırsat.",
		openingPara:
			"Üsküdar — 530.000 nüfusla İstanbul'un en kalabalık ilçelerinden biri ama dijital olarak hala 'açık' bir pazar. Burada 30 yıllık bir aile lokantası veya 15 yıllık bir özel klinik, harika bir hizmet veriyor olabilir ama Google'da arandığında ilk sayfada görünmüyor — çünkü ya site hiç yok ya WordPress 2014 teması üzerinde duruyor. Bu Üsküdar işletmeleri için bir kayıp değil, bir fırsat: rakipleriniz dijital olarak zayıf olduğu için, modern + hızlı + mobil bir site ile bölge aramalarında kolayca üst sıralara çıkabilirsiniz. Üsküdar müşterisi geleneksel ama mobile geçmiş durumda — Bağlarbaşı'ndan Kuzguncuk'a kadar her yaş grubu telefonla 'üsküdar [hizmet]' aratıyor.",
		microCopy: {
			nearbyDistricts: ['kadikoy', 'atasehir', 'maltepe'],
			specificPain:
				"Üsküdar yerel işletmelerinin Google Business Profile'ları yarı doldurulmuş — fotoğraf yok, web sitesi link bağlantısı yok, çalışma saatleri eksik.",
			culturalNote: 'Geleneksel ama dijital geçişte; kuşaklar arası müşteri.'
		}
	},
	{
		slug: 'atasehir',
		name: 'Ataşehir',
		titleSuffix: 'Yeni Finans Merkezi ve Modern Konut Bölgesi',
		population: '~425.000',
		character:
			"Ataşehir, İstanbul Finans Merkezi (İFM) ile birlikte hızla yükselen bir iş ve konut bölgesi. Plazalar, AVM'ler, yeni nesil ofisler ve genç profesyonel nüfusla rekabetçi bir pazar.",
		neighborhoods: ['İçerenköy', 'Kayışdağı', 'Yenisahra', 'Barbaros', 'Atatürk'],
		industryMix: [
			'Finansal danışmanlık ve fintech',
			'Hukuk büroları (yeni kurulan)',
			'Mimari ve iç tasarım ofisleri',
			'Kurumsal etkinlik şirketleri',
			'Modern restoran ve cafe zincirleri'
		],
		whyHere:
			"Ataşehir genç, hızla büyüyen ve dijitale yakın bir bölge — ama o yüzden rekabet de yüksek. Kalitesiz bir site burada hiç şansınız olmadığı anlamına geliyor.",
		openingPara:
			"Ataşehir 2010'dan beri sıfırdan inşa edilen bir bölge — bu hem fırsat hem zorluk. Fırsat: müşterileriniz genç, dijital-yerli, mobile-first. Zorluk: rakipleriniz de aynısı. İFM açıldığından beri bölgeye yerleşen finans şirketleri, yeni hukuk büroları ve yaratıcı ajanslar, marka kimliklerini sıfırdan inşa ediyor — ve siteniz o inşanın merkezinde. Eski Ataşehir veya bölge dışından gelen, 'site kabul' diye yapılan bir Wix sayfası, bölgenin enerjisiyle uyuşmuyor. Burada müşteri 3 saniyede karar veriyor: 'bu yeni mi, profesyonel mi, güvenli mi?' Üç soruya da 'evet' diyen bir site, kayıp olmuyor.",
		microCopy: {
			nearbyDistricts: ['kadikoy', 'uskudar', 'maltepe'],
			specificPain:
				"Ataşehir'de yeni kurulan profesyonel hizmet ofislerinin çoğu marka identity'sine yatırım yapıyor ama site temasını kendi yapıyor — sonuç tutarsız.",
			culturalNote: 'Yeni, dinamik, dijital-yerli iş kültürü.'
		}
	},
	{
		slug: 'maltepe',
		name: 'Maltepe',
		titleSuffix: 'Anadolu Yakası Sahil Hattının Genişleyen İş Bölgesi',
		population: '~520.000',
		character:
			"Maltepe; sahil bandı boyunca restoran-cafe yoğunluğu, marina, yeni konut projeleri ve yerel ticarete sahip büyüyen bir ilçe. Aile işletmeleri ve yeni nesil mekanlar yan yana.",
		neighborhoods: ['Bağlarbaşı', 'Cevizli', 'Küçükyalı', 'İdealtepe', 'Esenkent'],
		industryMix: [
			'Sahil restoran ve balıkçı işletmeleri',
			'Düğün salonları ve organizasyon',
			'Veteriner klinikleri ve pet shop',
			'Yeni nesil cafe ve fırın',
			'Emlak ofisleri (yeni proje yoğun)'
		],
		whyHere:
			"Maltepe'de en büyük sorun: harika fiziksel mekan + sıfır dijital varlık. Sahildeki balıkçınızın sitesi yok, ama Google'da 'maltepe sahil balıkçı' aratan turist boş çıkıyor.",
		openingPara:
			"Maltepe 'fiziksel olarak harika ama dijital olarak görünmez' işletmelerin yoğunlaştığı bir ilçe. Sahil bandında ortalama 5 yıllık bir restoran fiyatına aldığınız manzara var — ama Google'da 'maltepe sahil restoran' aratan kişi sizi göremezse manzaranın bir önemi yok. Burada en yaygın sorun: Instagram hesabı aktif (haftada 3 post), Google Maps doğru, ama site? Ya yok ya da Wix üzerinde 2019'da yapılıp güncellenmemiş. Bu fark hızla maliyete dönüşüyor: rakibiniz Küçükyalı'da modern siteyle aynı arama kelimelerinde üst sırada — siz sahil manzaranıza rağmen 2. sayfada. Maltepe için web sitesi ek bir vitrin değil, fiziksel mekanınızı güçlendiren temel bir altyapı.",
		microCopy: {
			nearbyDistricts: ['kadikoy', 'atasehir', 'pendik'],
			specificPain:
				"Maltepe sahil bandındaki restoran-cafelerin büyük kısmının Instagram'ı aktif ama web sitesi ya yok ya da yıllardır güncellenmemiş.",
			culturalNote: 'Aile işletmeleri + yeni nesil mekanlar karışımı.'
		}
	},
	{
		slug: 'bakirkoy',
		name: 'Bakırköy',
		titleSuffix: 'Avrupa Yakası Yerleşik İş ve Sağlık Merkezi',
		population: '~225.000',
		character:
			"Bakırköy — uzun yıllar İstanbul'un Avrupa yakası ana ticaret bölgelerinden. Capacity AVM ekseninde perakende, sağlık merkezleri, hukuk büroları ve eğitim kurumları yoğun.",
		neighborhoods: ['Yeşilköy', 'Florya', 'Ataköy', 'Yeşilyurt', 'Şenlikköy'],
		industryMix: [
			'Sağlık merkezleri (özellikle göz, diş, estetik)',
			'Hukuk büroları ve mali müşavirlik',
			'Eğitim kurumları ve dil okulları',
			'Konaklama (Yeşilköy havalimanı yakını)',
			'Perakende ve butik mağazacılık'
		],
		whyHere:
			"Bakırköy'de işletme yaşının ortalaması yüksek — yıllardır faaliyette. Bu güzel ama site genelde aynı yıllardan kalma.",
		openingPara:
			"Bakırköy'de 15-20 yıllık bir özel klinik, hukuk bürosu veya eğitim kurumu olmak büyük bir avantaj — müşteri tanır, marka oturmuş, kuş bakışı ününüz var. Ama bu avantajın gizli maliyeti: 2008'de yapılmış, mobilde bozuk bir siteniz olduğunda yeni nesil müşteri sizi 'eski moda' kategorisine itiyor. Aslında değilsiniz — sadece dijital vitriniz öyle gösteriyor. Yeşilköy'deki yeni-nesil havalimanı yolcusu otelini Booking üzerinden değil önce Google üzerinden arıyor; Florya'daki estetik kliniğine gelen müşteri Instagram'a değil Google'a güveniyor. Bakırköy için web sitesi yenileme — yeni site açma değil — büyük geri dönüş. Mevcut müşteri itibarınızı modern dijital varlığa taşıyın.",
		microCopy: {
			nearbyDistricts: ['besiktas', 'sisli', 'beyoglu'],
			specificPain:
				"Bakırköy'deki yerleşik klinik ve büroların çoğu, 5+ yıl önce yapılmış web siteleriyle çalışıyor — mobil uyumlu olmayanlar Google sıralamasında penalize ediliyor.",
			culturalNote: 'Yerleşik, güvenilir; nesil değişiminde.'
		}
	},
	{
		slug: 'pendik',
		name: 'Pendik',
		titleSuffix: 'Sabiha Gökçen Aksında Yükselen İş Bölgesi',
		population: '~750.000',
		character:
			"Pendik — Sabiha Gökçen Havalimanı, Marmaray bağlantısı ve yeni konut projeleriyle hızla genişleyen bir ilçe. Lojistik, otel-konaklama ve yeni nesil hizmet işletmeleri yoğun.",
		neighborhoods: ['Kurtköy', 'Çamçeşme', 'Esenler', 'Bahçelievler', 'Yenişehir'],
		industryMix: [
			'Otel-konaklama (havalimanı yakını)',
			'Lojistik ve depolama',
			'Otomotiv servis ve galeriler',
			'Yeni nesil cafe-restoran',
			'Eğitim merkezleri ve sürücü kursları'
		],
		whyHere:
			"Pendik'in büyüme hızı dijital varlıkları geride bırakıyor. Yeni yerleşen işletmelerin çoğu daha siteye sıra getirmedi.",
		openingPara:
			"Pendik son 10 yılda en hızlı büyüyen İstanbul ilçelerinden biri. Sabiha Gökçen havalimanından gelen turist için Kurtköy'deki bir butik otel ya da Bahçelievler'deki bir restoran 'fırsat' demek — ama bu fırsatın yakalanabilmesi için Google'da görünür olmak şart. Burada en yaygın senaryo: işletme 2 yıldır açık, müşteri akışı yerel kulaktan kulağa, ama dış müşteri yok çünkü site yok ya da çok yeni ve indekslenmemiş. Pendik dinamiği şu: havalimanı + Marmaray + yeni konut = hızla artan dış müşteri trafiği. Bu trafiği yakalayan bir site, açılışından itibaren ciddi fark yaratıyor.",
		microCopy: {
			nearbyDistricts: ['kartal', 'maltepe', 'atasehir'],
			specificPain:
				"Sabiha Gökçen yakınındaki konaklama işletmelerinin yarısı Booking-dependent — direkt rezervasyon kapasitesi yok ya da çok zayıf.",
			culturalNote: 'Hızla büyüyen, çok kültürlü, havalimanı-merkezli.'
		}
	},
	{
		slug: 'kartal',
		name: 'Kartal',
		titleSuffix: 'Anadolu Yakası Yeni Nesil İş Merkezi',
		population: '~480.000',
		character:
			"Kartal; sahil bandı, yeni iş kuleleri (Soyak, Dragos), hastane bölgesi (Dragos sağlık ekseni) ve genişleyen modern konut alanlarıyla hızla dönüşen bir ilçe.",
		neighborhoods: ['Dragos', 'Yakacık', 'Soğanlık', 'Cevizli', 'Esentepe'],
		industryMix: [
			'Özel hastane ve sağlık zincirleri',
			'Yeni nesil ofis kuleleri (Soyak)',
			'Sahil restoran ve kafeleri',
			'Spor salonları ve fitness',
			'Otomotiv servis (Dragos hattı)'
		],
		whyHere:
			"Kartal sağlık ekseni özellikle güçlü — Dragos hattındaki klinikler ve hastaneler yüksek arama hacmi alıyor.",
		openingPara:
			"Kartal — özellikle Dragos sağlık ekseni — son 5 yılda İstanbul'un Anadolu yakası sağlık merkezi haline geldi. Bir hasta 'kartal özel hastane' aratırken siz oradaysanız 1 saniyede karar verir; oradaysanız ama mobilde online randevu butonu çalışmıyorsa, bir sonraki sonuca geçer. Yakacık'taki yeni nesil ofis kuleleri ve Soğanlık'taki konut projeleri yeni profesyonel müşteri taşıyor; bu müşteri Wix tarzı sayfalarla değil, kendi mahallesinde modern görünen iş yerleriyle çalışmak istiyor. Kartal işletmeleri için site = bölgenin yeni dinamiğiyle uyumlu görünmek.",
		microCopy: {
			nearbyDistricts: ['pendik', 'maltepe', 'atasehir'],
			specificPain:
				"Dragos hattındaki sağlık merkezlerinin online randevu altyapısı genelde çağrı merkezine yönlendiriyor — gerçek dijital randevu sayısı çok düşük.",
			culturalNote: 'Sağlık + finans yoğun; yeni nesil profesyonel.'
		}
	}
];

export function getDistrict(slug: string): District | undefined {
	return districts.find((d) => d.slug === slug);
}

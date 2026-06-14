export type TopicKey = "style" | "photo" | "makeup";

export type TopicContent = {
  key: TopicKey;
  label: string;
  person: string;
  personUrl: string;
  description: string[];
  ctaLabel: string;
  ctaUrl: string;
};

export type SiteContent = {
  seo: {
    title: string;
    description: string;
  };
  projectTitle: string;
  overlineLabel: string;
  location: string;
  date: string;
  /** Short price for the header meta strip (keep in sync with signup pricing). */
  priceLabel: string;
  registerLabel: string;
  introText: string[];
  infoLines: string[];
  picnicFeature: {
    eyebrow: string;
    title: string;
    description: string[];
    includes: string[];
    openLabel: string;
    closeLabel: string;
  };
  signup: {
    title: string;
    /** Shown under the price title, lighter weight (e.g. prepayment terms). */
    titleSubline: string;
    /**
     * Optional urgency line: landing CTA hint + signup actions row. Implementation stays in
     * `summer-photo-day-experience` / `booking-form`; leave `""` to hide, or set non-empty copy to show.
     */
    spotsLeftText: string;
    intro: string[];
    fields: {
      nameLabel: string;
      namePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      instagramLabel: string;
      instagramPlaceholder: string;
    };
    button: string;
    helperText: string;
  };
  topics: TopicContent[];
};

export const siteContent: SiteContent = {
  seo: {
    title: "Wild Grace",
    description:
      "Wild Grace is a summer photo day and picnic experience in a Warsaw park with soft styling, makeup inspiration, and warm editorial portraits.",
  },
  projectTitle: "Wild Grace",
  overlineLabel: "PHOTO DAY / PICNIC EXPERIENCE",
  location: "WARSAW",
  date: "28.06.2026",
  priceLabel: "1250 PLN",
  registerLabel: "ЗАРЕГИСТРИРОВАТЬСЯ",
  introText: [
    "WILD GRACE — камерный фотодень в одном из парков Варшавы, соединённый с полноценным picnic experience.",
    "Вас ждут персонально собранный образ, макияж и съёмка в мягком дневном свете. Каждая деталь события продумана так, чтобы вы могли просто прийти и прожить этот день — красиво, легко и без спешки.",
    "После съёмки день продолжается пикником и временем для себя — чтобы замедлиться, переключиться и сохранить это ощущение лета чуть дольше.",
    "Это не просто фотосессия, а цельный girls day experience!",
    "Стоимость участия — 1250 PLN. Количество мест ограничено камерным форматом события 🤍",
  ],
  infoLines: [
    "PHOTO DAY BY",
    "@liza_karasiova",
    "@lina_tsapova",
    "PHOTO DAY / PICNIC EXPERIENCE",
  ],
  picnicFeature: {
    eyebrow: "ТОЛЬКО В ЭТОМ ФОТОДНЕ",
    title: "PICNIC EXPERIENCE",
    description: [
      "После персональной съемки мы приглашаем вас остаться в парке и прожить еще одну красивую главу этого дня.",
      "Пикник станет и продолжением визуальной истории, и спокойным временем без камеры — с общением, летним светом и деталями, которые хочется запомнить.",
    ],
    includes: [
      "СТИЛИЗОВАННАЯ ПИКНИК-ЗОНА",
      "СЕЗОННЫЕ ЦВЕТЫ И ДЕТАЛИ",
      "ЛЕГКИЕ УГОЩЕНИЯ",
      "ДОПОЛНИТЕЛЬНЫЕ ЖИВЫЕ КАДРЫ",
    ],
    openLabel: "PICNIC EXPERIENCE",
    closeLabel: "BACK TO PHOTO DAY",
  },
  signup: {
    title: "1250 PLN",
    titleSubline: "Photo Day | Picnic Experience",
    spotsLeftText: "Количество мест ограничено",
    intro: [
      "В стоимость входит подготовка образа со стилистом, makeup inspiration, персональная съемка, готовые фотографии и picnic experience после съемки.",
      "Оставьте заявку, и мы свяжемся с вами в Instagram, чтобы подтвердить место и обсудить детали образа.",
    ],
    fields: {
      nameLabel: "Имя",
      namePlaceholder: "Имя",
      emailLabel: "Email",
      emailPlaceholder: "Email",
      instagramLabel: "Instagram",
      instagramPlaceholder: "@instagram",
    },
    button: "ЗАБРОНИРОВАТЬ МЕСТО",
    helperText:
      "После заявки мы свяжемся с вами в Instagram для подтверждения бронирования.",
  },
  topics: [
    {
      key: "style",
      label: "STYLE",
      person: "@liza_karasiova",
      personUrl: "https://www.instagram.com/liza_karasiova/",
      description: [
        "У каждой девушки будет один образ, собранный индивидуально — с учётом внешности, настроения и ощущений. Мы сделаем акцент на лёгкость, воздушность и детали, которые будут гармонично сочетаться с природой парка, нашим сет-дизайном и атмосферой пикника.",
        "Это съёмка про свободу, мягкость и то самое летнее состояние, когда хочется замедлиться и почувствовать себя ближе к себе. Про образ, который не перетягивает внимание, а подчёркивает, раскрывает и делает тебя ещё ярче.",
        "Вещи подбираются персонально для каждой участницы, а при желании можно добавить что-то из своего гардероба и сочетать его с новыми элементами. Все детали обсуждаются лично — чтобы в итоге получилось по-настоящему твоё.",
      ],
      ctaLabel: "view stylist",
      ctaUrl: "https://www.instagram.com/liza_karasiova/",
    },
    {
      key: "photo",
      label: "PHOTO",
      person: "@lina_tsapova",
      personUrl: "https://www.instagram.com/lina_tsapova/",
      description: [
        "Каждая съёмка строится вокруг человека. Чутко и бережно раскрывая то, что делает каждую девушку уникальной, и помогая увидеть свою красоту по-новому.",
        "Съёмка пройдёт в парке среди натурального света и живой природы. Воздушные ткани, живые цветы и деликатный сет-дизайн создадут атмосферу лёгкости и естественной красоты.",
        "Плёнка сохранит не только образ, но и ощущение момента — словно кадры из фильма, где каждая участница становится героиней своей собственной истории.",
        "На выходе вы получите 12–15 готовых фотографий.",
      ],
      ctaLabel: "view photographer",
      ctaUrl: "https://www.instagram.com/lina_tsapova/",
    },
    {
      key: "makeup",
      label: "MAKEUP",
      person: "@mateynastya",
      personUrl: "https://www.instagram.com/mateynastya?igsh=Zzk5bWU5Z3BkMWF4",
      description: [
        "Визажист Настя подготовит макияж, который поддержит образ и останется комфортным для летней съемки на природе.",
        "В фокусе — свежая кожа, мягкое сияние, теплые натуральные оттенки и аккуратный цветовой акцент, если он подходит вашему образу.",
        "Makeup inspiration будет адаптирована к вашему образу, чтобы все детали WILD GRACE работали как единая визуальная история.",
      ],
      ctaLabel: "view makeup artist",
      ctaUrl: "https://www.instagram.com/mateynastya?igsh=Zzk5bWU5Z3BkMWF4",
    },
  ],
};

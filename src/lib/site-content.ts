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
    title: "WILD GRACE",
    description:
      "Wild Grace is a summer photo day and picnic experience in a Warsaw park with soft styling, makeup inspiration, and warm editorial portraits.",
  },
  projectTitle: "WILD GRACE",
  overlineLabel: "PHOTO DAY | PICNIC EXPERIENCE",
  location: "WARSAW",
  date: "28.06.2026",
  priceLabel: "1250 PLN",
  registerLabel: "ЗАРЕГИСТРИРОВАТЬСЯ",
  introText: [
    "WILD GRACE — камерный фотодень в одном из парков Варшавы, соединенный с полноценным picnic experience.",
    "Вас ждут персонально собранный образ, вдохновение для макияжа и съемка в мягком дневном свете с Линой Цаповой.",
    "После съемки день продолжается за красиво сервированным пикником: пледы, цветы, сезонные детали, легкие угощения и время, чтобы просто побыть в летнем моменте.",
    "Это не только съемка, а цельный girls-day experience с готовыми визуальными решениями и теплой, неспешной атмосферой.",
    "Стоимость участия — 1250 PLN. Количество мест ограничено камерным форматом события.",
  ],
  infoLines: [
    "PHOTO DAY BY",
    "@liza_karasiova",
    "@lina_tsapova",
    "PHOTO DAY | PICNIC EXPERIENCE",
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
        "Лиза Карасёва соберет образ в эстетике WILD GRACE: мягкие силуэты, натуральные ткани, светлые оттенки и один выразительный летний акцент.",
        "До фотодня вы получите персональные рекомендации по одежде, аксессуарам и сочетаниям, чтобы образ гармонично работал и в портретах, и в пикник-сцене.",
        "Главная идея — выглядеть собранно, но естественно: романтичная легкость без лишней торжественности.",
      ],
      ctaLabel: "view moodboard",
      ctaUrl: "https://www.instagram.com/liza_karasiova/",
    },
    {
      key: "photo",
      label: "PHOTO",
      person: "@lina_tsapova",
      personUrl: "https://www.instagram.com/lina_tsapova/",
      description: [
        "Лина Цапова снимет персональную серию в естественном свете: портреты среди зелени, детали образа, движение и живые моменты пикника.",
        "Во время съемки Лина мягко направляет и помогает с позированием, сохраняя ощущение легкости и настоящего летнего дня.",
        "Визуальный язык WILD GRACE — теплые оттенки, деликатный контраст и кадры с настроением пленочного дневника.",
      ],
      ctaLabel: "view photographer",
      ctaUrl: "https://www.instagram.com/lina_tsapova/",
    },
    {
      key: "makeup",
      label: "MAKEUP",
      person: "@mateynastya",
      personUrl:
        "https://www.instagram.com/mateynastya?igsh=Zzk5bWU5Z3BkMWF4",
      description: [
        "Визажист Настя подготовит макияж, который поддержит образ и останется комфортным для летней съемки на природе.",
        "В фокусе — свежая кожа, мягкое сияние, теплые натуральные оттенки и аккуратный цветовой акцент, если он подходит вашему образу.",
        "Makeup inspiration будет адаптирована к вашему образу, чтобы все детали WILD GRACE работали как единая визуальная история.",
      ],
      ctaLabel: "view makeup artist",
      ctaUrl:
        "https://www.instagram.com/mateynastya?igsh=Zzk5bWU5Z3BkMWF4",
    },
  ],
};

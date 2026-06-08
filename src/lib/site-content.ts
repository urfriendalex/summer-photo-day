export type TopicKey = "picnic" | "photo" | "mood";

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
    title: "SUMMER PHOTO DAY",
    description:
      "An outdoor summer photo day in a Warsaw park with film-inspired portraits, slow picnic details, soft styling, and an optional picnic experience.",
  },
  projectTitle: "summer photo day",
  overlineLabel: "park edition",
  location: "WARSAW PARK",
  date: "DATE TBA",
  priceLabel: "PRICE TBA",
  registerLabel: "ЗАРЕГИСТРИРОВАТЬСЯ",
  introText: [
    "Летний фотодень на природе в одном из парков Варшавы. Точная дата, локация и название проекта скоро появятся здесь.",
    "Это будет более свободный outdoor-опыт: мягкий дневной свет, зелень, пледы, фрукты, движение, пленочное настроение и портреты, которые ощущаются как теплый день, сохраненный на память.",
    "Для тех, кто выберет расширенный формат, съемка будет соединена с picnic experience: красиво собранное место, легкие детали для кадра и спокойное время после съемки.",
    "Команда поможет с образом, настроением и маршрутом по локации, чтобы кадры были живыми, естественными и чуть кинематографичными.",
    "Стоимость и пакеты будут объявлены после финального согласования программы.",
    "Количество мест будет ограничено, потому что парк, свет и темп дня лучше работают в камерном формате.",
  ],
  infoLines: [
    "PHOTO DAY BY",
    "@liza_karasiova",
    "@lina_tsapova",
    "PICNIC EXPERIENCE",
  ],
  signup: {
    title: "Пакеты — скоро",
    titleSubline: "Фото / фото + пикник",
    spotsLeftText: "Лист ожидания открыт",
    intro: [
      "Вас ждет камерный outdoor-фотодень в парке: портретная съемка, мягкая помощь в кадре, детали picnic-styling и возможность выбрать формат с полноценным пикником.",
      "Оставьте заявку, чтобы попасть в лист ожидания. Когда мы утвердим название, дату, парк и пакеты, мы первыми отправим вам детали в Instagram.",
    ],
    fields: {
      nameLabel: "Имя",
      namePlaceholder: "Имя",
      emailLabel: "Email",
      emailPlaceholder: "Email",
      instagramLabel: "Instagram",
      instagramPlaceholder: "@instagram",
    },
    button: "ПОПАСТЬ В ЛИСТ",
    helperText:
      "После заявки мы свяжемся с вами в Instagram и пришлем детали до публичного анонса.",
  },
  topics: [
    {
      key: "picnic",
      label: "PICNIC",
      person: "@liza_karasiova",
      personUrl: "https://www.instagram.com/liza_karasiova/",
      description: [
        "Picnic experience станет отдельным уровнем фотодня: не просто декор для кадра, а маленький летний ритуал в парке.",
        "Пледы, корзина, сезонные фрукты, цветы, легкая сервировка и детали будут собраны так, чтобы красиво жить в кадре и не ощущаться постановочно.",
        "Этот формат подойдет тем, кто хочет больше времени, больше воздуха и историю, в которой после портретов остается место для спокойного момента.",
        "Финальные опции picnic-пакета появятся после утверждения локации и даты.",
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
        "Съемка будет построена вокруг естественного света, движения и легкости: прогулка по парку, портреты на траве, детали рук, ткани, волос и летнего воздуха.",
        "Фотограф мягко направляет в кадре, но оставляет пространство для живого поведения. Здесь важны не идеальные позы, а ощущение дня.",
        "Визуально это ближе к пленочному дневнику: теплые тона, зелень, солнце между листьями, немного спонтанности и много мягкости.",
        "Финальное количество кадров и формат отдачи будут указаны в пакетах.",
      ],
      ctaLabel: "view photographer",
      ctaUrl: "https://www.instagram.com/lina_tsapova/",
    },
    {
      key: "mood",
      label: "MOOD",
      person: "summer team",
      personUrl: "https://www.instagram.com/lina_tsapova/",
      description: [
        "Настроение проекта пока собирается вокруг слов: парк, лето, пикник, мягкий свет, натуральные фактуры, легкая романтика без студийной торжественности.",
        "Образы будут проще и свободнее: льняные ткани, светлые слои, акценты цвета, корзины, цветы, книги, фрукты и детали, которые можно держать в руках.",
        "Верхний логотип и интро-анимация будут отличаться от Blooming Diva: вместо студийного цветения появится ощущение дневного света, раскрывающего страницу летнего дневника.",
      ],
      ctaLabel: "view updates",
      ctaUrl: "https://www.instagram.com/lina_tsapova/",
    },
  ],
};

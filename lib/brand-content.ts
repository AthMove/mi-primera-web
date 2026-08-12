export type BrandLanguage = "es" | "en" | "pt";

export interface BrandLocalizedContent {
  description: string;
  categoryLabel: string;
  intro: string[];
  buyingTips: string[];
  relatedGuides: {
    title: string;
    href: string;
  }[];
  faq: {
    question: string;
    answer: string;
  }[];
}

export type BrandLocalizedVersions = Record<
  BrandLanguage,
  BrandLocalizedContent
>;

export const brandContent: Record<
  string,
  BrandLocalizedVersions
> = {
  bullpadel: {
    es: {
      description:
        "Compra y vende palas Bullpadel de segunda mano. Encuentra modelos premium, compara precios y revisa su estado antes de comprar en ATHMOV.",

      categoryLabel: "Pádel",

      intro: [
        "Bullpadel es una de las marcas más reconocidas dentro del pádel y cuenta con modelos dirigidos tanto a jugadores avanzados como a quienes buscan una pala equilibrada para mejorar su juego. Su presencia en competición y la popularidad de gamas como Vertex, Hack o Elite hacen que también exista una demanda elevada en el mercado de segunda mano.",
        "Comprar una pala Bullpadel usada puede ser una forma de acceder a modelos premium por un precio inferior al de una unidad nueva. Antes de elegir, conviene comprobar el estado del marco, las caras, el protector, el puente y la empuñadura, además de revisar posibles grietas, reparaciones o diferencias de peso.",
        "En ATHMOV puedes consultar anuncios de Bullpadel publicados por vendedores particulares, comparar modelos y acceder a guías específicas para valorar el precio y reducir el riesgo de falsificaciones.",
      ],

      buyingTips: [
        "Comprueba que no existan grietas profundas en el marco o en las caras.",
        "Revisa si la pala ha sido reparada y solicita fotografías de detalle.",
        "Compara el peso real con el rango indicado por el fabricante.",
        "Verifica logotipos, acabados, número de serie y diseño del modelo.",
        "Valora la antigüedad, el desgaste y la demanda antes de aceptar el precio.",
      ],

      relatedGuides: [
        {
          title:
            "Bullpadel Vertex 04 de segunda mano: guía completa para comprar con seguridad",
          href: "/blog/bullpadel-vertex-04-segunda-mano",
        },
        {
          title:
            "Cómo detectar una pala de pádel falsa",
          href: "/blog/como-detectar-pala-padel-falsa",
        },
        {
          title:
            "Cómo valorar una pala de pádel de segunda mano",
          href: "/blog/como-valorar-pala-padel-segunda-mano",
        },
      ],

      faq: [
        {
          question:
            "¿Cuánto cuesta una pala Bullpadel de segunda mano?",
          answer:
            "El precio depende del modelo, la antigüedad, el estado y la demanda. Las gamas premium bien conservadas suelen mantener mejor su valor que los modelos básicos o muy usados.",
        },
        {
          question:
            "¿Qué debo revisar antes de comprar una Bullpadel usada?",
          answer:
            "Revisa el marco, las caras, el protector, el puente, la empuñadura y cualquier grieta o reparación. También conviene comprobar el peso y confirmar que el diseño corresponde al modelo anunciado.",
        },
        {
          question:
            "¿Cómo puedo saber si una pala Bullpadel es original?",
          answer:
            "Compara los logotipos, acabados, peso, colores, número de serie y detalles de fabricación con la información oficial. Un precio excesivamente bajo puede ser una señal de alerta.",
        },
        {
          question:
            "¿Dónde comprar Bullpadel de segunda mano?",
          answer:
            "Puedes encontrar palas Bullpadel usadas en ATHMOV, donde los anuncios se organizan por marca y categoría para facilitar la comparación entre modelos.",
        },
      ],
    },

    en: {
      description:
        "Buy and sell second-hand Bullpadel rackets. Find premium models, compare prices and check their condition before buying on ATHMOV.",

      categoryLabel: "Padel",

      intro: [
        "Bullpadel is one of the most recognised brands in padel and offers models aimed at both advanced players and those looking for a balanced racket to improve their game. Its presence in competition and the popularity of ranges such as Vertex, Hack and Elite also create strong demand in the second-hand market.",
        "Buying a used Bullpadel racket can be a way to access premium models for less than the price of a new one. Before choosing, check the condition of the frame, faces, protector, bridge and grip, as well as any cracks, repairs or unusual weight differences.",
        "On ATHMOV you can browse Bullpadel listings from private sellers, compare models and access specific guides to help assess prices and reduce the risk of counterfeits.",
      ],

      buyingTips: [
        "Check that there are no deep cracks in the frame or racket faces.",
        "Check whether the racket has been repaired and ask for detailed photographs.",
        "Compare the actual weight with the manufacturer's stated range.",
        "Verify logos, finishes, serial number and model design.",
        "Consider the age, wear and market demand before accepting the price.",
      ],

      relatedGuides: [
        {
          title:
            "Second-hand Bullpadel Vertex 04: complete guide to buying safely",
          href: "/blog/bullpadel-vertex-04-segunda-mano",
        },
        {
          title:
            "How to spot a fake padel racket",
          href: "/blog/como-detectar-pala-padel-falsa",
        },
        {
          title:
            "How to value a second-hand padel racket",
          href: "/blog/como-valorar-pala-padel-segunda-mano",
        },
      ],

      faq: [
        {
          question:
            "How much does a second-hand Bullpadel racket cost?",
          answer:
            "The price depends on the model, age, condition and demand. Well-maintained premium ranges usually retain their value better than entry-level or heavily used models.",
        },
        {
          question:
            "What should I check before buying a used Bullpadel racket?",
          answer:
            "Check the frame, faces, protector, bridge, grip and any cracks or repairs. It is also worth checking the weight and confirming that the design matches the advertised model.",
        },
        {
          question:
            "How can I tell if a Bullpadel racket is genuine?",
          answer:
            "Compare the logos, finishes, weight, colours, serial number and manufacturing details with official information. An unusually low price can be a warning sign.",
        },
        {
          question:
            "Where can I buy second-hand Bullpadel rackets?",
          answer:
            "You can find used Bullpadel rackets on ATHMOV, where listings are organised by brand and category to make model comparison easier.",
        },
      ],
    },

    pt: {
      description:
        "Compra e vende raquetes Bullpadel em segunda mão. Encontra modelos premium, compara preços e verifica o seu estado antes de comprar na ATHMOV.",

      categoryLabel: "Padel",

      intro: [
        "A Bullpadel é uma das marcas mais reconhecidas no padel e conta com modelos destinados tanto a jogadores avançados como a quem procura uma raquete equilibrada para melhorar o seu jogo. A sua presença em competição e a popularidade de gamas como Vertex, Hack ou Elite fazem com que exista também uma elevada procura no mercado de segunda mão.",
        "Comprar uma raquete Bullpadel usada pode ser uma forma de aceder a modelos premium por um preço inferior ao de uma unidade nova. Antes de escolher, convém verificar o estado da estrutura, faces, protetor, ponte e punho, além de procurar possíveis fissuras, reparações ou diferenças anormais de peso.",
        "Na ATHMOV podes consultar anúncios de Bullpadel publicados por vendedores particulares, comparar modelos e aceder a guias específicos para avaliar o preço e reduzir o risco de falsificações.",
      ],

      buyingTips: [
        "Verifica se não existem fissuras profundas na estrutura ou nas faces.",
        "Confirma se a raquete foi reparada e pede fotografias detalhadas.",
        "Compara o peso real com o intervalo indicado pelo fabricante.",
        "Verifica logótipos, acabamentos, número de série e design do modelo.",
        "Avalia a antiguidade, o desgaste e a procura antes de aceitar o preço.",
      ],

      relatedGuides: [
        {
          title:
            "Bullpadel Vertex 04 em segunda mão: guia completo para comprar com segurança",
          href: "/blog/bullpadel-vertex-04-segunda-mano",
        },
        {
          title:
            "Como identificar uma raquete de padel falsa",
          href: "/blog/como-detectar-pala-padel-falsa",
        },
        {
          title:
            "Como avaliar uma raquete de padel em segunda mão",
          href: "/blog/como-valorar-pala-padel-segunda-mano",
        },
      ],

      faq: [
        {
          question:
            "Quanto custa uma raquete Bullpadel em segunda mão?",
          answer:
            "O preço depende do modelo, antiguidade, estado e procura. As gamas premium bem conservadas tendem a manter melhor o seu valor do que modelos básicos ou muito usados.",
        },
        {
          question:
            "O que devo verificar antes de comprar uma Bullpadel usada?",
          answer:
            "Verifica a estrutura, faces, protetor, ponte, punho e qualquer fissura ou reparação. Também convém verificar o peso e confirmar que o design corresponde ao modelo anunciado.",
        },
        {
          question:
            "Como posso saber se uma raquete Bullpadel é original?",
          answer:
            "Compara os logótipos, acabamentos, peso, cores, número de série e detalhes de fabrico com a informação oficial. Um preço demasiado baixo pode ser um sinal de alerta.",
        },
        {
          question:
            "Onde comprar Bullpadel em segunda mão?",
          answer:
            "Podes encontrar raquetes Bullpadel usadas na ATHMOV, onde os anúncios estão organizados por marca e categoria para facilitar a comparação entre modelos.",
        },
      ],
    },
  },

  nox: {
    es: {
      description:
        "Encuentra palas Nox de segunda mano en ATHMOV. Compara modelos premium, revisa su estado y compra con mayor seguridad.",

      categoryLabel: "Pádel",

      intro: [
        "Nox es una marca especializada en pádel con una presencia destacada entre jugadores aficionados y profesionales. Modelos como AT10, ML10 o LA10 son muy buscados por su combinación de control, potencia y manejabilidad.",
        "El mercado de segunda mano permite acceder a palas Nox de gamas altas por un precio más reducido, aunque es importante revisar el estado estructural y comprobar que el producto coincide con el modelo anunciado.",
        "En ATHMOV puedes explorar palas Nox usadas, comparar precios y consultar guías para comprar con más información.",
      ],

      buyingTips: [
        "Comprueba el estado del marco, las caras y el puente.",
        "Solicita fotografías claras de posibles golpes o reparaciones.",
        "Compara el peso y los acabados con los datos oficiales.",
        "Valora el año del modelo y la demanda existente.",
        "Desconfía de precios muy inferiores al mercado.",
      ],

      relatedGuides: [
        {
          title:
            "Cómo detectar una pala de pádel falsa",
          href: "/blog/como-detectar-pala-padel-falsa",
        },
        {
          title:
            "Cómo valorar una pala de pádel de segunda mano",
          href: "/blog/como-valorar-pala-padel-segunda-mano",
        },
      ],

      faq: [
        {
          question:
            "¿Qué modelos Nox son más buscados de segunda mano?",
          answer:
            "Entre los modelos más conocidos se encuentran las gamas AT10, ML10, LA10 y VK10, aunque la demanda puede variar según el año y la versión.",
        },
        {
          question:
            "¿Cómo revisar una pala Nox usada?",
          answer:
            "Examina el marco, las caras, el puente y la empuñadura. Comprueba también el peso, los acabados y cualquier indicio de reparación.",
        },
        {
          question:
            "¿Es seguro comprar una pala Nox de segunda mano?",
          answer:
            "Puede ser una buena compra cuando el anuncio incluye fotografías detalladas, una descripción precisa y un precio coherente con el estado del producto.",
        },
      ],
    },

    en: {
      description:
        "Find second-hand Nox padel rackets on ATHMOV. Compare premium models, check their condition and buy with greater confidence.",

      categoryLabel: "Padel",

      intro: [
        "Nox is a specialist padel brand with a strong presence among both amateur and professional players. Models such as the AT10, ML10 and LA10 are highly sought after for their combination of control, power and manoeuvrability.",
        "The second-hand market makes it possible to access high-end Nox rackets at a lower price, although it is important to check their structural condition and make sure the product matches the advertised model.",
        "On ATHMOV you can explore used Nox rackets, compare prices and consult guides to help you make a more informed purchase.",
      ],

      buyingTips: [
        "Check the condition of the frame, faces and bridge.",
        "Ask for clear photographs of any impacts or repairs.",
        "Compare the weight and finishes with official specifications.",
        "Consider the model year and current demand.",
        "Be cautious of prices far below market value.",
      ],

      relatedGuides: [
        {
          title:
            "How to spot a fake padel racket",
          href: "/blog/como-detectar-pala-padel-falsa",
        },
        {
          title:
            "How to value a second-hand padel racket",
          href: "/blog/como-valorar-pala-padel-segunda-mano",
        },
      ],

      faq: [
        {
          question:
            "Which Nox models are most sought after second-hand?",
          answer:
            "Some of the best-known ranges include the AT10, ML10, LA10 and VK10, although demand may vary depending on the year and version.",
        },
        {
          question:
            "How should I inspect a used Nox racket?",
          answer:
            "Examine the frame, faces, bridge and grip. Also check the weight, finishes and any signs of previous repairs.",
        },
        {
          question:
            "Is it safe to buy a second-hand Nox racket?",
          answer:
            "It can be a good purchase when the listing includes detailed photographs, an accurate description and a price that matches the condition of the product.",
        },
      ],
    },

    pt: {
      description:
        "Encontra raquetes Nox em segunda mão na ATHMOV. Compara modelos premium, verifica o seu estado e compra com maior segurança.",

      categoryLabel: "Padel",

      intro: [
        "A Nox é uma marca especializada em padel com uma forte presença entre jogadores amadores e profissionais. Modelos como AT10, ML10 ou LA10 são muito procurados pela combinação de controlo, potência e manobrabilidade.",
        "O mercado de segunda mão permite aceder a raquetes Nox de gamas altas por um preço mais reduzido, embora seja importante verificar o estado estrutural e confirmar que o produto corresponde ao modelo anunciado.",
        "Na ATHMOV podes explorar raquetes Nox usadas, comparar preços e consultar guias para fazer uma compra mais informada.",
      ],

      buyingTips: [
        "Verifica o estado da estrutura, das faces e da ponte.",
        "Pede fotografias claras de possíveis impactos ou reparações.",
        "Compara o peso e os acabamentos com as especificações oficiais.",
        "Avalia o ano do modelo e a procura existente.",
        "Desconfia de preços muito inferiores ao valor de mercado.",
      ],

      relatedGuides: [
        {
          title:
            "Como identificar uma raquete de padel falsa",
          href: "/blog/como-detectar-pala-padel-falsa",
        },
        {
          title:
            "Como avaliar uma raquete de padel em segunda mão",
          href: "/blog/como-valorar-pala-padel-segunda-mano",
        },
      ],

           faq: [
        {
          question:
            "Quais são os modelos Nox mais procurados em segunda mão?",
          answer:
            "Entre as gamas mais conhecidas encontram-se AT10, ML10, LA10 e VK10, embora a procura possa variar consoante o ano e a versão.",
        },
        {
          question:
            "Como verificar uma raquete Nox usada?",
          answer:
            "Examina a estrutura, as faces, a ponte e o punho. Verifica também o peso, os acabamentos e quaisquer sinais de reparação.",
        },
        {
          question:
            "É seguro comprar uma raquete Nox em segunda mão?",
          answer:
            "Pode ser uma boa compra quando o anúncio inclui fotografias detalhadas, uma descrição precisa e um preço coerente com o estado do produto.",
        },
      ],
    },
  },
    taylormade: {
    es: {
      description:
        "Compra y vende material TaylorMade de segunda mano. Drivers, hierros, wedges y palos de golf premium disponibles en ATHMOV.",

      categoryLabel: "Golf",

      intro: [
        "TaylorMade es una de las marcas de golf más reconocidas del mercado, especialmente por sus drivers, hierros, maderas y wedges orientados a jugadores que buscan tecnología y rendimiento.",
        "Comprar material TaylorMade de segunda mano permite acceder a modelos recientes y gamas premium con un ahorro significativo respecto al precio nuevo.",
        "Antes de comprar, conviene verificar el estado de la cabeza, la cara, la varilla, el grip y el número de serie, además de comprobar que las especificaciones corresponden al jugador.",
      ],

      buyingTips: [
        "Revisa la cara y la corona en busca de golpes o fisuras.",
        "Comprueba la varilla, flexibilidad y longitud.",
        "Verifica el número de serie y los acabados.",
        "Examina el grip y calcula si necesita sustitución.",
        "Confirma loft, lie y configuración antes de comprar.",
      ],

      relatedGuides: [
        {
          title:
            "Cómo verificar unos palos de golf originales",
          href: "/blog/verificar-palos-golf",
        },
        {
          title:
            "Cómo calcular el precio de palos de golf de segunda mano",
          href: "/blog/como-calcular-precio-palos-golf-segunda-mano",
        },
        {
          title:
            "Cuándo comprar y vender palos de golf de segunda mano",
          href: "/blog/cuando-comprar-vender-palos-golf-segunda-mano",
        },
      ],

      faq: [
        {
          question:
            "¿Qué revisar al comprar palos TaylorMade usados?",
          answer:
            "Comprueba el estado de la cabeza, la cara, la varilla y el grip. También debes confirmar el loft, el flex y la longitud del palo.",
        },
        {
          question:
            "¿Cómo saber si un palo TaylorMade es original?",
          answer:
            "Revisa el número de serie, la calidad de los acabados, los logotipos y las especificaciones. Compáralos con información e imágenes oficiales.",
        },
        {
          question:
            "¿Qué modelos TaylorMade mantienen mejor su valor?",
          answer:
            "Las gamas recientes de drivers, hierros premium y putters populares suelen conservar mejor su valor cuando están bien cuidadas.",
        },
      ],
    },

    en: {
      description:
        "Buy and sell second-hand TaylorMade equipment. Premium drivers, irons, wedges and golf clubs available on ATHMOV.",

      categoryLabel: "Golf",

      intro: [
        "TaylorMade is one of the most recognised golf brands on the market, particularly for its drivers, irons, woods and wedges aimed at players looking for technology and performance.",
        "Buying second-hand TaylorMade equipment makes it possible to access recent models and premium ranges with significant savings compared with buying new.",
        "Before buying, check the condition of the clubhead, face, shaft, grip and serial number, and make sure the specifications are suitable for the player.",
      ],

      buyingTips: [
        "Check the face and crown for impacts, cracks or damage.",
        "Check the shaft, flex and length.",
        "Verify the serial number and quality of the finishes.",
        "Inspect the grip and consider whether it needs replacing.",
        "Confirm the loft, lie and configuration before buying.",
      ],

      relatedGuides: [
        {
          title:
            "How to verify that golf clubs are genuine",
          href: "/blog/verificar-palos-golf",
        },
        {
          title:
            "How to calculate the price of second-hand golf clubs",
          href: "/blog/como-calcular-precio-palos-golf-segunda-mano",
        },
        {
          title:
            "When to buy and sell second-hand golf clubs",
          href: "/blog/cuando-comprar-vender-palos-golf-segunda-mano",
        },
      ],

      faq: [
        {
          question:
            "What should I check when buying used TaylorMade clubs?",
          answer:
            "Check the condition of the clubhead, face, shaft and grip. You should also confirm the loft, flex and club length.",
        },
        {
          question:
            "How can I tell if a TaylorMade club is genuine?",
          answer:
            "Check the serial number, finish quality, logos and specifications, and compare them with official information and images.",
        },
        {
          question:
            "Which TaylorMade models retain their value best?",
          answer:
            "Recent driver ranges, premium irons and popular putters tend to retain their value better when they are well maintained.",
        },
      ],
    },

    pt: {
      description:
        "Compra e vende material TaylorMade em segunda mão. Drivers, ferros, wedges e tacos de golfe premium disponíveis na ATHMOV.",

      categoryLabel: "Golfe",

      intro: [
        "A TaylorMade é uma das marcas de golfe mais reconhecidas do mercado, especialmente pelos seus drivers, ferros, madeiras e wedges destinados a jogadores que procuram tecnologia e desempenho.",
        "Comprar material TaylorMade em segunda mão permite aceder a modelos recentes e gamas premium com uma poupança significativa em comparação com o preço de novo.",
        "Antes de comprar, convém verificar o estado da cabeça, face, shaft, grip e número de série, além de confirmar que as especificações são adequadas ao jogador.",
      ],

      buyingTips: [
        "Verifica a face e a coroa à procura de impactos, fissuras ou danos.",
        "Confirma o shaft, flexibilidade e comprimento.",
        "Verifica o número de série e a qualidade dos acabamentos.",
        "Examina o grip e avalia se precisa de ser substituído.",
        "Confirma o loft, lie e configuração antes de comprar.",
      ],

      relatedGuides: [
        {
          title:
            "Como verificar se uns tacos de golfe são originais",
          href: "/blog/verificar-palos-golf",
        },
        {
          title:
            "Como calcular o preço de tacos de golfe em segunda mão",
          href: "/blog/como-calcular-precio-palos-golf-segunda-mano",
        },
        {
          title:
            "Quando comprar e vender tacos de golfe em segunda mão",
          href: "/blog/cuando-comprar-vender-palos-golf-segunda-mano",
        },
      ],

      faq: [
        {
          question:
            "O que devo verificar ao comprar tacos TaylorMade usados?",
          answer:
            "Verifica o estado da cabeça, face, shaft e grip. Também deves confirmar o loft, o flex e o comprimento do taco.",
        },
        {
          question:
            "Como saber se um taco TaylorMade é original?",
          answer:
            "Verifica o número de série, a qualidade dos acabamentos, os logótipos e as especificações, e compara-os com informação e imagens oficiais.",
        },
        {
          question:
            "Que modelos TaylorMade mantêm melhor o seu valor?",
          answer:
            "As gamas recentes de drivers, ferros premium e putters populares tendem a conservar melhor o seu valor quando estão bem cuidados.",
        },
      ],
    },
  },
};
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const articleUrl =
  "https://athmov.com/blog/mejores-campos-golf-espana";

const articleImage =
  "https://athmov.com/blog/mejores-campos-golf-espana/01-portada.jpg";

export const metadata: Metadata = {
  title:
    "Los mejores campos de golf de España en 2026 | ATHMOV",

  description:
    "Descubre algunos de los mejores campos de golf de España: Valderrama, Sotogrande, Camiral, Pedreña, La Coruña y Sevilla.",

  keywords: [
    "mejores campos de golf España",
    "campos de golf España",
    "mejores clubes de golf España",
    "golf premium España",
    "dónde jugar al golf en España",
    "campos de golf exclusivos",
    "Real Club Valderrama",
    "Real Club de Golf Sotogrande",
    "Camiral Golf",
    "Real Golf de Pedreña",
  ],

  alternates: {
    canonical: articleUrl,
  },

  openGraph: {
    title:
      "Los mejores campos de golf de España en 2026",
    description:
      "Una selección de recorridos históricos, mediterráneos y atlánticos que todo aficionado al golf debería conocer.",
    url: articleUrl,
    siteName: "ATHMOV",
    type: "article",
    locale: "es_ES",

    images: [
      {
        url: articleImage,
        width: 1600,
        height: 1067,
        alt: "Campo de golf premium al atardecer",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Los mejores campos de golf de España en 2026",
    description:
      "Valderrama, Sotogrande, Camiral, Pedreña, La Coruña y Sevilla.",
    images: [articleImage],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",

  headline:
    "Los mejores campos de golf de España en 2026",

  description:
    "Selección de algunos de los campos de golf más destacados de España por su historia, diseño, entorno y experiencia de juego.",

  image: [articleImage],

  datePublished: "2026-07-27",
  dateModified: "2026-07-27",

  author: {
    "@type": "Organization",
    name: "ATHMOV",
    url: "https://athmov.com",
  },

  publisher: {
    "@type": "Organization",
    name: "ATHMOV",

    logo: {
      "@type": "ImageObject",
      url: "https://athmov.com/logo.png",
    },
  },

  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": articleUrl,
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",

  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Inicio",
      item: "https://athmov.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Blog",
      item: "https://athmov.com/blog",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Golf",
      item: "https://athmov.com/blog/golf",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Los mejores campos de golf de España",
      item: articleUrl,
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",

  mainEntity: [
    {
      "@type": "Question",
      name:
        "¿Cuál es el campo de golf más conocido de España?",

      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Real Club Valderrama es uno de los campos españoles con mayor reconocimiento internacional y fue sede de la Ryder Cup de 1997.",
      },
    },
    {
      "@type": "Question",
      name:
        "¿Cuál es la mejor zona de España para jugar al golf?",

      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Depende del tipo de experiencia que busques. Andalucía y la Costa del Sol destacan por su clima y concentración de campos, mientras que Cataluña, Cantabria y Galicia ofrecen recorridos con paisajes y condiciones diferentes.",
      },
    },
    {
      "@type": "Question",
      name:
        "¿Se puede jugar como visitante en todos los clubes?",

      acceptedAnswer: {
        "@type": "Answer",
        text:
          "No siempre. Algunos clubes son privados o limitan los horarios para visitantes. Conviene consultar sus condiciones, disponibilidad y requisitos antes de desplazarse.",
      },
    },
    {
      "@type": "Question",
      name:
        "¿Qué material conviene revisar antes de jugar?",

      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Es recomendable comprobar grips, varillas, caras de los palos, suelas, bolsa, guante, bolas, zapatos y dispositivos de medición antes de comenzar la ronda.",
      },
    },
  ],
};

const courses = [
  {
    number: "01",
    title: "Real Club Valderrama",
    location: "Sotogrande · Cádiz",
    image: "/blog/mejores-campos-golf-espana/02-valderrama.jpg",
    alt:
      "Recorrido de golf rodeado de árboles maduros inspirado en el entorno de Valderrama",
    caption:
      "Una recreación editorial inspirada en los recorridos arbolados del sur de España.",
  },
  {
    number: "02",
    title: "Real Club de Golf Sotogrande",
    location: "Sotogrande · Cádiz",
    image: "/blog/mejores-campos-golf-espana/03-sotogrande.jpg",
    alt:
      "Campo mediterráneo con bunkers y vegetación inspirado en Sotogrande",
    caption:
      "Los bunkers, la vegetación mediterránea y el juego estratégico caracterizan esta recreación.",
  },
  {
    number: "03",
    title: "Camiral, A Quinta do Lago Resort",
    location: "Caldes de Malavella · Girona",
    image: "/blog/mejores-campos-golf-espana/04-camiral.jpg",
    alt:
      "Campo de golf premium rodeado de bosque inspirado en Camiral Girona",
    caption:
      "Una interpretación visual del golf de resort integrado en un entorno forestal.",
  },
  {
    number: "04",
    title: "Real Golf de Pedreña",
    location: "Pedreña · Cantabria",
    image: "/blog/mejores-campos-golf-espana/05-pedrena.jpg",
    alt:
      "Campo de golf verde junto al mar Cantábrico inspirado en Pedreña",
    caption:
      "El paisaje del norte aporta viento, vistas abiertas y una personalidad diferente.",
  },
  {
    number: "05",
    title: "Real Club de Golf de La Coruña",
    location: "A Zapateira · A Coruña",
    image: "/blog/mejores-campos-golf-espana/06-coruna.jpg",
    alt:
      "Campo de golf atlántico inspirado en los paisajes de Galicia",
    caption:
      "Recreación editorial inspirada en la vegetación y la luz atlántica de Galicia.",
  },
  {
    number: "06",
    title: "Real Club de Golf de Sevilla",
    location: "Alcalá de Guadaíra · Sevilla",
    image: "/blog/mejores-campos-golf-espana/07-sevilla.jpg",
    alt:
      "Campo de golf andaluz entre árboles bajo la luz del atardecer",
    caption:
      "La luz cálida y los recorridos amplios definen esta interpretación del golf andaluz.",
  },
];

export default function MejoresCamposGolfEspanaArticle() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <main className="article-page">
        <article className="article-container">
          <nav
            className="breadcrumb"
            aria-label="Migas de pan"
          >
            <Link href="/">Inicio</Link>

            <span aria-hidden="true">›</span>

            <Link href="/blog">Guías</Link>

            <span aria-hidden="true">›</span>

            <Link href="/blog/golf">Golf</Link>

            <span aria-hidden="true">›</span>

            <strong>Mejores campos de golf</strong>
          </nav>

          <header className="article-header">
            <p className="eyebrow">
              ATHMOV · DESTINOS DE GOLF
            </p>

            <h1>
              Los mejores campos de golf de España en 2026
            </h1>

            <p className="article-intro">
              Recorridos históricos, diseños de referencia y
              paisajes mediterráneos y atlánticos que todo
              aficionado al golf debería conocer.
            </p>

            <div className="article-meta">
              <span>Actualizado en julio de 2026</span>
              <span>·</span>
              <span>10 minutos de lectura</span>
            </div>
          </header>

          <figure className="hero-image">
            <Image
              src="/blog/mejores-campos-golf-espana/01-portada.jpg"
              alt="Campo de golf premium con lago y montañas al atardecer"
              width={1600}
              height={1067}
              priority
              sizes="(max-width: 900px) 100vw, 1200px"
            />

            <figcaption>
              España reúne recorridos históricos, resorts de
              referencia y campos integrados en algunos de
              los paisajes más atractivos del país. Imagen
              editorial generada para ATHMOV.
            </figcaption>
          </figure>

          <section className="article-section">
            <h2>
              España, uno de los grandes destinos europeos de
              golf
            </h2>

            <p>
              España permite disfrutar del golf en entornos
              muy diferentes: bosques mediterráneos, paisajes
              atlánticos, zonas de montaña y recorridos junto
              al mar.
            </p>

            <p>
              La calidad del mantenimiento, el clima de muchas
              regiones y la presencia de clubes con una larga
              tradición han convertido al país en un destino
              habitual para jugadores nacionales e
              internacionales.
            </p>

            <p>
              En esta guía reunimos seis campos que destacan
              por su historia, su diseño, su entorno o la
              experiencia global que ofrecen.
            </p>

            <p>
              La selección no pretende establecer una
              clasificación absoluta. Cada recorrido exige
              habilidades distintas y ofrece una experiencia
              propia.
            </p>
          </section>

          <section className="article-section">
            <div className="index-box">
              <p className="index-label">
                EN ESTE ARTÍCULO
              </p>

              <ol>
                {courses.map((course) => (
                  <li key={course.number}>
                    <a
                      href={`#campo-${course.number}`}
                    >
                      {course.title}
                    </a>
                  </li>
                ))}

                <li>
                  <a href="#como-elegir">
                    Cómo elegir un campo de golf
                  </a>
                </li>
              </ol>
            </div>
          </section>

          <section
            className="course-section"
            id="campo-01"
          >
            <div className="course-heading">
              <span>{courses[0].number}</span>

              <div>
                <p>{courses[0].location}</p>
                <h2>{courses[0].title}</h2>
              </div>
            </div>

            <figure className="editorial-image">
              <Image
                src={courses[0].image}
                alt={courses[0].alt}
                width={1600}
                height={1067}
                sizes="(max-width: 900px) 100vw, 1100px"
              />

              <figcaption>
                {courses[0].caption}
              </figcaption>
            </figure>

            <div className="course-copy">
              <p>
                El Real Club Valderrama ocupa un lugar
                especial dentro de la historia del golf
                europeo. Su nombre está unido a la Ryder Cup
                de 1997, la primera edición disputada fuera de
                las Islas Británicas.
              </p>

              <p>
                Su recorrido exige precisión desde el tee,
                una buena planificación de cada golpe y
                especial atención alrededor de los greens.
                Los árboles y la colocación estratégica de
                los obstáculos penalizan las decisiones
                demasiado agresivas.
              </p>

              <div className="course-highlight">
                <span>POR QUÉ DESTACA</span>

                <p>
                  Historia internacional, estrategia y una
                  identidad reconocible desde los primeros
                  hoyos.
                </p>
              </div>
            </div>
          </section>

          <section
            className="course-section"
            id="campo-02"
          >
            <div className="course-heading">
              <span>{courses[1].number}</span>

              <div>
                <p>{courses[1].location}</p>
                <h2>{courses[1].title}</h2>
              </div>
            </div>

            <figure className="editorial-image">
              <Image
                src={courses[1].image}
                alt={courses[1].alt}
                width={1600}
                height={1067}
                sizes="(max-width: 900px) 100vw, 1100px"
              />

              <figcaption>
                {courses[1].caption}
              </figcaption>
            </figure>

            <div className="course-copy">
              <p>
                Inaugurado en 1964 y diseñado por Robert
                Trent Jones, el Real Club de Golf Sotogrande
                es una de las grandes referencias de la Costa
                del Sol.
              </p>

              <p>
                Su diseño combina belleza y estrategia. Los
                bunkers, los cambios de nivel, los árboles y
                los elementos de agua obligan a elegir bien la
                línea de salida y el punto de entrada al
                green.
              </p>

              <p>
                Es un campo especialmente atractivo para
                jugadores que disfrutan tomando decisiones y
                adaptando su estrategia a cada hoyo.
              </p>

              <div className="course-highlight">
                <span>POR QUÉ DESTACA</span>

                <p>
                  Un diseño clásico de Robert Trent Jones
                  integrado en un entorno mediterráneo.
                </p>
              </div>
            </div>
          </section>

          <section
            className="course-section"
            id="campo-03"
          >
            <div className="course-heading">
              <span>{courses[2].number}</span>

              <div>
                <p>{courses[2].location}</p>
                <h2>{courses[2].title}</h2>
              </div>
            </div>

            <figure className="editorial-image">
              <Image
                src={courses[2].image}
                alt={courses[2].alt}
                width={1600}
                height={1067}
                sizes="(max-width: 900px) 100vw, 1100px"
              />

              <figcaption>
                {courses[2].caption}
              </figcaption>
            </figure>

            <div className="course-copy">
              <p>
                El complejo conocido anteriormente como PGA
                Catalunya Golf & Wellness opera actualmente
                bajo la marca Camiral, A Quinta do Lago
                Resort.
              </p>

              <p>
                Cuenta con dos recorridos: Stadium Course y
                Tour Course. El Stadium presenta un desafío
                más exigente, con obstáculos bien defendidos y
                decisiones que requieren precisión y una buena
                gestión de la vuelta.
              </p>

              <p>
                Camiral será además la sede de la Ryder Cup de
                2031, un acontecimiento que reforzará todavía
                más su visibilidad internacional.
              </p>

              <div className="course-highlight">
                <span>POR QUÉ DESTACA</span>

                <p>
                  Dos recorridos, servicios de resort y una
                  futura Ryder Cup dentro de un mismo destino.
                </p>
              </div>
            </div>
          </section>

          <section
            className="course-section"
            id="campo-04"
          >
            <div className="course-heading">
              <span>{courses[3].number}</span>

              <div>
                <p>{courses[3].location}</p>
                <h2>{courses[3].title}</h2>
              </div>
            </div>

            <figure className="editorial-image">
              <Image
                src={courses[3].image}
                alt={courses[3].alt}
                width={1600}
                height={1067}
                sizes="(max-width: 900px) 100vw, 1100px"
              />

              <figcaption>
                {courses[3].caption}
              </figcaption>
            </figure>

            <div className="course-copy">
              <p>
                Pedreña forma parte de la memoria deportiva
                del golf español y está estrechamente ligada
                a la figura de Severiano Ballesteros.
              </p>

              <p>
                Su emplazamiento junto a la bahía aporta unas
                condiciones de juego diferentes a las de los
                campos mediterráneos. El viento puede
                transformar la estrategia y cambiar la
                dificultad de un mismo hoyo de un día para
                otro.
              </p>

              <p>
                Es un destino especialmente recomendable para
                quienes valoran la historia, el paisaje y el
                golf con identidad propia.
              </p>

              <div className="course-highlight">
                <span>POR QUÉ DESTACA</span>

                <p>
                  Tradición, paisaje cantábrico y una conexión
                  inseparable con la historia del golf
                  español.
                </p>
              </div>
            </div>
          </section>

          <section
            className="course-section"
            id="campo-05"
          >
            <div className="course-heading">
              <span>{courses[4].number}</span>

              <div>
                <p>{courses[4].location}</p>
                <h2>{courses[4].title}</h2>
              </div>
            </div>

            <figure className="editorial-image">
              <Image
                src={courses[4].image}
                alt={courses[4].alt}
                width={1600}
                height={1067}
                sizes="(max-width: 900px) 100vw, 1100px"
              />

              <figcaption>
                {courses[4].caption}
              </figcaption>
            </figure>

            <div className="course-copy">
              <p>
                El Real Club de Golf de La Coruña representa
                una de las referencias del golf gallego y
                permite descubrir una experiencia marcada por
                el clima atlántico y la vegetación del
                noroeste.
              </p>

              <p>
                La humedad, el viento y el estado del terreno
                pueden influir directamente en la elección de
                palo, el vuelo de la bola y la manera de
                atacar los greens.
              </p>

              <p>
                Jugar en Galicia exige adaptación y ofrece una
                experiencia distinta a la de los campos más
                secos del sur y del Mediterráneo.
              </p>

              <div className="course-highlight">
                <span>POR QUÉ DESTACA</span>

                <p>
                  Entorno atlántico, tradición deportiva y un
                  recorrido que premia la adaptación.
                </p>
              </div>
            </div>
          </section>

          <section
            className="course-section"
            id="campo-06"
          >
            <div className="course-heading">
              <span>{courses[5].number}</span>

              <div>
                <p>{courses[5].location}</p>
                <h2>{courses[5].title}</h2>
              </div>
            </div>

            <figure className="editorial-image">
              <Image
                src={courses[5].image}
                alt={courses[5].alt}
                width={1600}
                height={1067}
                sizes="(max-width: 900px) 100vw, 1100px"
              />

              <figcaption>
                {courses[5].caption}
              </figcaption>
            </figure>

            <div className="course-copy">
              <p>
                El Real Club de Golf de Sevilla es uno de los
                grandes nombres del golf andaluz y ha formado
                parte del calendario de competiciones de alto
                nivel.
              </p>

              <p>
                Sus espacios amplios y su carácter de campo
                de campeonato invitan a combinar distancia,
                colocación y una lectura cuidadosa de las
                zonas de caída.
              </p>

              <p>
                El clima del sur permite disfrutar de una
                temporada de juego prolongada, aunque el calor
                de los meses centrales del verano aconseja
                elegir bien el horario.
              </p>

              <div className="course-highlight">
                <span>POR QUÉ DESTACA</span>

                <p>
                  Golf de campeonato, amplitud y una
                  experiencia claramente andaluza.
                </p>
              </div>
            </div>
          </section>

          <section
            className="article-section"
            id="como-elegir"
          >
            <h2>
              Cómo elegir un campo de golf para tu próxima
              salida
            </h2>

            <p>
              El campo más prestigioso no siempre es el más
              adecuado para todos los jugadores. Antes de
              reservar, conviene valorar el nivel del grupo,
              la dificultad del recorrido y el tipo de
              experiencia que se busca.
            </p>

            <div className="criteria-grid">
              <div>
                <span>01</span>
                <h3>Nivel de dificultad</h3>
                <p>
                  Consulta la longitud, el slope, la
                  valoración y los tees disponibles.
                </p>
              </div>

              <div>
                <span>02</span>
                <h3>Acceso para visitantes</h3>
                <p>
                  Revisa si el club admite visitantes y qué
                  horarios o requisitos establece.
                </p>
              </div>

              <div>
                <span>03</span>
                <h3>Clima y temporada</h3>
                <p>
                  El calor, el viento y la lluvia pueden
                  modificar por completo la experiencia.
                </p>
              </div>

              <div>
                <span>04</span>
                <h3>Servicios disponibles</h3>
                <p>
                  Valora zona de prácticas, alquiler de
                  material, buggy, restauración y vestuarios.
                </p>
              </div>

              <div>
                <span>05</span>
                <h3>Tipo de recorrido</h3>
                <p>
                  Los campos arbolados, costeros o abiertos
                  exigen estrategias y golpes diferentes.
                </p>
              </div>

              <div>
                <span>06</span>
                <h3>Presupuesto total</h3>
                <p>
                  Incluye green fee, desplazamiento,
                  alojamiento, buggy y posibles alquileres.
                </p>
              </div>
            </div>
          </section>

          <figure className="editorial-image final-image">
            <Image
              src="/blog/mejores-campos-golf-espana/08-consejos.jpg"
              alt="Bolsa de golf con palos junto a un green al atardecer"
              width={1600}
              height={1067}
              sizes="(max-width: 900px) 100vw, 1100px"
            />

            <figcaption>
              Revisa el estado de tus palos, grips, zapatos y
              accesorios antes de desplazarte. Imagen
              editorial generada para ATHMOV.
            </figcaption>
          </figure>

          <section className="article-section">
            <h2>
              Prepara tu material antes de salir al campo
            </h2>

            <p>
              Una buena experiencia comienza antes de llegar
              al primer tee. Comprueba el estado de los grips,
              limpia las caras de los palos y revisa que la
              bolsa incluya todo lo necesario.
            </p>

            <ul>
              <li>
                Limpia las estrías de hierros y wedges.
              </li>
              <li>
                Comprueba que las varillas no presenten
                golpes, fisuras o movimientos extraños.
              </li>
              <li>
                Revisa el desgaste y la adherencia de los
                grips.
              </li>
              <li>
                Lleva bolas adecuadas para tu nivel de juego.
              </li>
              <li>
                Añade guante, tees, arreglapiques y marcador.
              </li>
              <li>
                Utiliza calzado apropiado para las condiciones
                previstas.
              </li>
            </ul>

            <p>
              Cuando necesites renovar parte de tu equipo,
              puedes consultar los{" "}
              <Link
                href="/golf"
                className="article-link"
              >
                palos de golf de segunda mano disponibles en
                ATHMOV
              </Link>
              .
            </p>
          </section>

          <section className="article-section faq-section">
            <h2>Preguntas frecuentes</h2>

            <details>
              <summary>
                ¿Cuál es el campo de golf más conocido de
                España?
              </summary>

              <p>
                Real Club Valderrama es uno de los campos
                españoles con mayor reconocimiento
                internacional y fue sede de la Ryder Cup de
                1997.
              </p>
            </details>

            <details>
              <summary>
                ¿Cuál es la mejor zona de España para jugar al
                golf?
              </summary>

              <p>
                Depende de la experiencia que busques.
                Andalucía y la Costa del Sol destacan por su
                clima y su concentración de campos, mientras
                que Cataluña, Cantabria y Galicia ofrecen
                recorridos y paisajes diferentes.
              </p>
            </details>

            <details>
              <summary>
                ¿Se puede jugar como visitante en todos los
                clubes?
              </summary>

              <p>
                No siempre. Algunos clubes son privados o
                limitan los horarios para visitantes.
                Consulta sus condiciones y disponibilidad
                antes de organizar el desplazamiento.
              </p>
            </details>

            <details>
              <summary>
                ¿Qué material conviene revisar antes de
                jugar?
              </summary>

              <p>
                Revisa grips, varillas, caras, suelas, bolsa,
                guante, bolas, zapatos y dispositivos de
                medición antes de comenzar la ronda.
              </p>
            </details>
          </section>

          <section className="article-section">
            <h2>Conclusión</h2>

            <p>
              Valderrama, Sotogrande, Camiral, Pedreña, La
              Coruña y Sevilla muestran la variedad del golf
              español.
            </p>

            <p>
              Algunos destacan por su historia internacional;
              otros por su diseño, por el paisaje o por la
              manera en la que las condiciones naturales
              influyen en cada golpe.
            </p>

            <p>
              Sea cual sea el recorrido elegido, preparar
              correctamente el material y adaptar la
              estrategia al campo es esencial para disfrutar
              de la experiencia.
            </p>
          </section>

          <section className="marketplace-cta">
            <p className="cta-eyebrow">
              THE GAME CONTINUES
            </p>

            <h2>
              El material premium merece seguir jugando
            </h2>

            <p>
              Compra y vende palos, bolsas, drivers, hierros,
              putters y accesorios de golf premium de segunda
              mano.
            </p>

            <div className="cta-buttons">
              <Link
                href="/golf"
                className="primary-button"
              >
                Ver material de golf
              </Link>

              <Link
                href="/sell"
                className="secondary-button"
              >
                Vender mi material
              </Link>
            </div>
          </section>

          <section className="related-articles">
            <p className="eyebrow">CONTINÚA LEYENDO</p>

            <h2>Guías relacionadas</h2>

            <div className="related-grid">
              <Link
                href="/blog/como-comprar-palos-golf-segunda-mano"
                className="related-card"
              >
                <span>GUÍA DE COMPRA</span>

                <h3>
                  Cómo comprar palos de golf de segunda mano
                </h3>

                <p>
                  Qué revisar en cabezas, varillas, grips y
                  números de serie antes de comprar.
                </p>
              </Link>

              <Link
                href="/blog/cuando-comprar-vender-palos-golf"
                className="related-card"
              >
                <span>MERCADO</span>

                <h3>
                  Cuándo comprar y vender palos de golf
                </h3>

                <p>
                  Descubre las mejores épocas para renovar o
                  poner a la venta tu material.
                </p>
              </Link>

              <Link
                href="/blog/golf"
                className="related-card"
              >
                <span>GUÍAS DE GOLF</span>

                <h3>
                  Más contenidos sobre golf y equipamiento
                </h3>

                <p>
                  Accede a las guías de compra, conservación y
                  autenticidad de ATHMOV.
                </p>
              </Link>
            </div>
          </section>
        </article>
      </main>

      <style>{`
        :root {
          --article-black: #080808;
          --article-soft: #f5f5f2;
          --article-white: #ffffff;
          --article-muted: #707070;
          --article-border: #deded8;
          --article-accent: #9ca746;
        }

        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        .article-page {
          min-height: 100vh;
          padding: 140px 20px 90px;
          background: var(--article-white);
          color: var(--article-black);
        }

        .article-container {
          width: min(100%, 1120px);
          margin: 0 auto;
        }

        .breadcrumb {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 9px;
          margin-bottom: 50px;
          color: var(--article-muted);
          font-size: 13px;
        }

        .breadcrumb a {
          color: inherit;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .breadcrumb a:hover {
          color: var(--article-black);
        }

        .breadcrumb strong {
          color: var(--article-black);
          font-weight: 500;
        }

        .article-header {
          width: min(100%, 950px);
          margin: 0 auto 48px;
          text-align: center;
        }

        .eyebrow,
        .cta-eyebrow {
          margin: 0 0 20px;
          color: var(--article-accent);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.22em;
        }

        .article-header h1 {
          margin: 0;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(42px, 7vw, 82px);
          font-weight: 400;
          line-height: 0.98;
          letter-spacing: -0.045em;
        }

        .article-intro {
          max-width: 760px;
          margin: 32px auto 0;
          color: #555;
          font-size: clamp(18px, 2vw, 23px);
          line-height: 1.65;
        }

        .article-meta {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 28px;
          color: var(--article-muted);
          font-size: 13px;
        }

        figure {
          margin: 0;
        }

        .hero-image,
        .editorial-image {
          margin: 0 auto 72px;
        }

        .hero-image img,
        .editorial-image img {
          display: block;
          width: 100%;
          height: auto;
          border-radius: 3px;
          object-fit: cover;
        }

        figcaption {
          margin-top: 13px;
          color: var(--article-muted);
          font-size: 12px;
          line-height: 1.5;
        }

        .article-section,
        .course-copy {
          width: min(100%, 760px);
          margin: 0 auto 72px;
        }

        .article-section h2 {
          margin: 0 0 25px;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(30px, 4vw, 48px);
          font-weight: 400;
          line-height: 1.1;
          letter-spacing: -0.025em;
        }

        .article-section h3 {
          margin: 20px 0 12px;
          font-size: 20px;
        }

        .article-section p,
        .article-section li,
        .course-copy p {
          color: #333;
          font-size: 17px;
          line-height: 1.85;
        }

        .article-section p,
        .course-copy p {
          margin: 0 0 23px;
        }

        .article-section ul {
          margin: 20px 0 28px;
          padding-left: 22px;
        }

        .article-section li {
          margin-bottom: 8px;
        }

        .article-link {
          color: var(--article-black);
          font-weight: 650;
          text-decoration-color: var(--article-accent);
          text-decoration-thickness: 2px;
          text-underline-offset: 4px;
        }

        .article-link:hover {
          color: var(--article-accent);
        }

        .index-box {
          padding: 36px;
          border: 1px solid var(--article-border);
          background: var(--article-soft);
        }

        .index-label {
          margin-bottom: 20px !important;
          color: var(--article-accent) !important;
          font-size: 11px !important;
          font-weight: 700;
          letter-spacing: 0.18em;
        }

        .index-box ol {
          margin: 0;
          padding-left: 22px;
        }

        .index-box li {
          margin-bottom: 9px;
        }

        .index-box a {
          color: var(--article-black);
          text-decoration: none;
        }

        .index-box a:hover {
          color: var(--article-accent);
        }

        .course-section {
          scroll-margin-top: 120px;
          margin-bottom: 105px;
        }

        .course-heading {
          display: grid;
          grid-template-columns: 110px 1fr;
          align-items: end;
          gap: 25px;
          margin-bottom: 35px;
          padding-bottom: 24px;
          border-bottom: 1px solid var(--article-border);
        }

        .course-heading > span {
          color: var(--article-accent);
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(50px, 7vw, 90px);
          line-height: 0.8;
        }

        .course-heading p {
          margin: 0 0 10px;
          color: var(--article-muted);
          font-size: 12px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .course-heading h2 {
          margin: 0;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(35px, 5vw, 62px);
          font-weight: 400;
          line-height: 1;
          letter-spacing: -0.03em;
        }

        .course-highlight {
          margin-top: 35px;
          padding: 28px;
          border-left: 3px solid var(--article-accent);
          background: var(--article-soft);
        }

        .course-highlight span {
          display: block;
          margin-bottom: 12px;
          color: var(--article-accent);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.15em;
        }

        .course-highlight p {
          margin: 0;
        }

        .criteria-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1px;
          margin-top: 38px;
          border: 1px solid var(--article-border);
          background: var(--article-border);
        }

        .criteria-grid > div {
          min-height: 220px;
          padding: 28px;
          background: var(--article-white);
        }

        .criteria-grid span {
          color: var(--article-accent);
          font-family: Georgia, "Times New Roman", serif;
          font-size: 30px;
        }

        .criteria-grid h3 {
          margin: 28px 0 12px;
        }

        .criteria-grid p {
          margin: 0;
          color: var(--article-muted);
          font-size: 15px;
          line-height: 1.65;
        }

        .final-image {
          margin-top: 20px;
        }

        .faq-section details {
          border-top: 1px solid var(--article-border);
        }

        .faq-section details:last-child {
          border-bottom: 1px solid var(--article-border);
        }

        .faq-section summary {
          cursor: pointer;
          padding: 23px 0;
          font-size: 17px;
          font-weight: 500;
        }

        .faq-section details p {
          padding-bottom: 20px;
        }

        .marketplace-cta {
          margin: 100px 0;
          padding: clamp(45px, 8vw, 90px);
          background: var(--article-black);
          color: var(--article-white);
          text-align: center;
        }

        .marketplace-cta h2 {
          max-width: 760px;
          margin: 0 auto;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(36px, 6vw, 68px);
          font-weight: 400;
          line-height: 1;
          letter-spacing: -0.035em;
        }

        .marketplace-cta > p:not(.cta-eyebrow) {
          max-width: 650px;
          margin: 28px auto 0;
          color: #bcbcbc;
          font-size: 18px;
          line-height: 1.7;
        }

        .cta-buttons {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 13px;
          margin-top: 38px;
        }

        .primary-button,
        .secondary-button {
          display: inline-flex;
          min-height: 50px;
          align-items: center;
          justify-content: center;
          padding: 0 24px;
          border-radius: 999px;
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          transition:
            transform 0.2s ease,
            background 0.2s ease,
            color 0.2s ease;
        }

        .primary-button {
          background: var(--article-white);
          color: var(--article-black);
        }

        .secondary-button {
          border: 1px solid #555;
          color: var(--article-white);
        }

        .primary-button:hover,
        .secondary-button:hover {
          transform: translateY(-2px);
        }

        .secondary-button:hover {
          background: var(--article-white);
          color: var(--article-black);
        }

        .related-articles {
          margin-top: 90px;
        }

        .related-articles > h2 {
          margin: 0 0 35px;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(36px, 5vw, 56px);
          font-weight: 400;
        }

        .related-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
        }

        .related-card {
          min-height: 270px;
          padding: 28px;
          border: 1px solid var(--article-border);
          color: var(--article-black);
          text-decoration: none;
          transition:
            transform 0.25s ease,
            border-color 0.25s ease;
        }

        .related-card:hover {
          transform: translateY(-4px);
          border-color: var(--article-black);
        }

        .related-card span {
          color: var(--article-accent);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.15em;
        }

        .related-card h3 {
          margin: 55px 0 16px;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 26px;
          font-weight: 400;
          line-height: 1.12;
        }

        .related-card p {
          margin: 0;
          color: var(--article-muted);
          font-size: 14px;
          line-height: 1.6;
        }

        @media (max-width: 760px) {
          .article-page {
            padding: 115px 16px 70px;
          }

          .breadcrumb {
            margin-bottom: 35px;
          }

          .article-header {
            text-align: left;
          }

          .article-meta {
            justify-content: flex-start;
          }

          .hero-image,
          .editorial-image,
          .article-section {
            margin-bottom: 55px;
          }

          .course-section {
            margin-bottom: 75px;
          }

          .course-heading {
            grid-template-columns: 65px 1fr;
            gap: 14px;
          }

          .criteria-grid,
          .related-grid {
            grid-template-columns: 1fr;
          }

          .criteria-grid > div {
            min-height: auto;
          }

          .marketplace-cta {
            margin: 70px -16px;
          }

          .related-card {
            min-height: 220px;
          }

          .related-card h3 {
            margin-top: 35px;
          }
        }
      `}</style>
    </>
  );
}
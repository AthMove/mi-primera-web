import Link from "next/link";

const relatedByCategory = {
golf: [
  {
    category: "GOLF · AUTENTICIDAD",
    title: "Cómo verificar unos palos de golf originales",
    href: "/blog/verificar-palos-golf",
  },
  {
    category: "GOLF · COMPRA",
    title: "Qué revisar antes de comprar un driver de golf de segunda mano",
    href: "/blog/que-revisar-driver-golf-segunda-mano",
  },
  {
    category: "GOLF · VALORACIÓN",
    title: "Cómo calcular el precio de palos de golf de segunda mano",
    href: "/blog/como-calcular-precio-palos-golf-segunda-mano",
  },
  {
    category: "GOLF · MERCADO",
    title: "Cuándo comprar y vender palos de golf de segunda mano",
    href: "/blog/cuando-comprar-vender-palos-golf-segunda-mano",
  },
  {
  category: "GOLF · COMPRA",
  title: "Qué revisar antes de comprar unos hierros de golf de segunda mano",
  href: "/blog/que-revisar-hierros-golf-segunda-mano",
},
{
  category: "GOLF · COMPRA",
  title: "Qué revisar antes de comprar un putter de golf de segunda mano",
  href: "/blog/que-revisar-putter-golf-segunda-mano",
},
{
  category: "GOLF · AUTENTICIDAD",
  title: "Cómo saber si un driver de golf es original",
  href: "/blog/como-saber-si-un-driver-golf-es-original",
},
{
  category: "GOLF · COMPRA",
  title: "Qué revisar antes de comprar unos hierros de golf de segunda mano",
  href: "/blog/que-revisar-hierros-golf-segunda-mano",
},
],

  padel: [
    {
      category: "PÁDEL · AUTENTICIDAD",
      title: "Cómo detectar una pala de pádel falsa",
      href: "/blog/como-detectar-pala-padel-falsa",
    },
    {
      category: "PÁDEL · MERCADO",
      title: "Cómo valorar una pala de pádel de segunda mano",
      href: "/blog/como-valorar-pala-padel-segunda-mano",
    },
  ],

  tenis: [
    {
      category: "TENIS · AUTENTICIDAD",
      title: "Cómo verificar una raqueta de tenis original",
      href: "/blog/como-verificar-raqueta-tenis-original",
    },
    {
      category: "TENIS · COMPRA",
      title: "Qué revisar antes de comprar una raqueta de tenis de segunda mano",
      href: "/blog/que-revisar-raqueta-tenis-segunda-mano",
    },
    {
      category: "TENIS · VALORACIÓN",
      title: "Cómo valorar una raqueta de tenis de segunda mano",
      href: "/blog/como-valorar-raqueta-tenis-segunda-mano",
    },
  ],

  running: [
    {
      category: "RUNNING · COMPRA",
      title: "Qué revisar antes de comprar unas zapatillas de running de segunda mano",
      href: "/blog/que-revisar-zapatillas-running-segunda-mano",
    },
    {
      category: "RUNNING · ESTADO",
      title: "Cómo saber si unas zapatillas de running están agotadas",
      href: "/blog/como-saber-si-zapatillas-running-estan-agotadas",
    },
    {
      category: "RUNNING · VALORACIÓN",
      title: "Cuántos kilómetros puede tener una zapatilla de running usada",
      href: "/blog/cuantos-kilometros-puede-tener-zapatilla-running-usada",
    },
  ],
};

type Category = keyof typeof relatedByCategory;

export default function RelatedArticles({
  category,
  currentHref,
}: {
  category: Category;
  currentHref?: string;
}) {
  const articles = relatedByCategory[category].filter(
    (article) => article.href !== currentHref
  );

  return (
    <section style={sectionStyle}>
      <p style={eyebrowStyle}>MÁS GUÍAS ATHMOV</p>

      <h2 style={titleStyle}>También te puede interesar</h2>

      <div style={gridStyle}>
        {articles.map((article) => (
          <Link key={article.href} href={article.href} style={cardStyle}>
            <span style={categoryStyle}>{article.category}</span>

            <h3 style={cardTitleStyle}>{article.title}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
}

const sectionStyle = {
  marginTop: "70px",
  paddingTop: "50px",
  borderTop: "1px solid rgba(0,0,0,0.08)",
};

const eyebrowStyle = {
  fontSize: "11px",
  letterSpacing: "3px",
  color: "#c9b896",
  fontWeight: 900,
};

const titleStyle = {
  fontSize: "34px",
  marginTop: "10px",
  marginBottom: "24px",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
  gap: "16px",
};

const cardStyle = {
  background: "#fff",
  border: "1px solid rgba(0,0,0,0.08)",
  borderRadius: "20px",
  padding: "20px",
  textDecoration: "none",
};

const categoryStyle = {
  fontSize: "10px",
  letterSpacing: "2px",
  color: "#c9b896",
  fontWeight: 900,
};

const cardTitleStyle = {
  color: "#111",
  fontSize: "20px",
  lineHeight: 1.4,
  marginTop: "10px",
};
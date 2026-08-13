"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";


const relatedByCategory = {
  golf: [
    {
      category: {
        es: "GOLF · AUTENTICIDAD",
        en: "GOLF · AUTHENTICITY",
        pt: "GOLFE · AUTENTICIDADE",
      },
      title: {
        es: "Cómo verificar unos palos de golf originales",
        en: "How to verify authentic golf clubs",
        pt: "Como verificar tacos de golfe originais",
      },
      href: "/blog/verificar-palos-golf",
    },
    {
      category: {
        es: "GOLF · COMPRA",
        en: "GOLF · BUYING",
        pt: "GOLFE · COMPRA",
      },
      title: {
        es: "Qué revisar antes de comprar un driver de golf de segunda mano",
        en: "What to check before buying a second-hand golf driver",
        pt: "O que verificar antes de comprar um driver de golfe em segunda mão",
      },
      href: "/blog/que-revisar-driver-golf-segunda-mano",
    },
    {
      category: {
        es: "GOLF · VALORACIÓN",
        en: "GOLF · VALUATION",
        pt: "GOLFE · AVALIAÇÃO",
      },
      title: {
        es: "Cómo calcular el precio de palos de golf de segunda mano",
        en: "How to calculate the price of second-hand golf clubs",
        pt: "Como calcular o preço de tacos de golfe em segunda mão",
      },
      href: "/blog/como-calcular-precio-palos-golf-segunda-mano",
    },
    {
      category: {
        es: "GOLF · MERCADO",
        en: "GOLF · MARKET",
        pt: "GOLFE · MERCADO",
      },
      title: {
        es: "Cuándo comprar y vender palos de golf de segunda mano",
        en: "When to buy and sell second-hand golf clubs",
        pt: "Quando comprar e vender tacos de golfe em segunda mão",
      },
      href: "/blog/cuando-comprar-vender-palos-golf-segunda-mano",
    },
    {
      category: {
        es: "GOLF · COMPRA",
        en: "GOLF · BUYING",
        pt: "GOLFE · COMPRA",
      },
      title: {
        es: "Qué revisar antes de comprar unos hierros de golf de segunda mano",
        en: "What to check before buying second-hand golf irons",
        pt: "O que verificar antes de comprar ferros de golfe em segunda mão",
      },
      href: "/blog/que-revisar-hierros-golf-segunda-mano",
    },
    {
      category: {
        es: "GOLF · COMPRA",
        en: "GOLF · BUYING",
        pt: "GOLFE · COMPRA",
      },
      title: {
        es: "Qué revisar antes de comprar un putter de golf de segunda mano",
        en: "What to check before buying a second-hand golf putter",
        pt: "O que verificar antes de comprar um putter de golfe em segunda mão",
      },
      href: "/blog/que-revisar-putter-golf-segunda-mano",
    },
    {
      category: {
        es: "GOLF · AUTENTICIDAD",
        en: "GOLF · AUTHENTICITY",
        pt: "GOLFE · AUTENTICIDADE",
      },
      title: {
        es: "Cómo saber si un driver de golf es original",
        en: "How to tell if a golf driver is authentic",
        pt: "Como saber se um driver de golfe é original",
      },
      href: "/blog/como-saber-si-un-driver-golf-es-original",
    },
  ],

  padel: [
    {
      category: {
        es: "PÁDEL · AUTENTICIDAD",
        en: "PADEL · AUTHENTICITY",
        pt: "PADEL · AUTENTICIDADE",
      },
      title: {
        es: "Cómo detectar una pala de pádel falsa",
        en: "How to spot a fake padel racket",
        pt: "Como detetar uma raquete de padel falsa",
      },
      href: "/blog/como-detectar-pala-padel-falsa",
    },
    {
      category: {
        es: "PÁDEL · MERCADO",
        en: "PADEL · MARKET",
        pt: "PADEL · MERCADO",
      },
      title: {
        es: "Cómo valorar una pala de pádel de segunda mano",
        en: "How to value a second-hand padel racket",
        pt: "Como avaliar uma raquete de padel em segunda mão",
      },
      href: "/blog/como-valorar-pala-padel-segunda-mano",
    },
  ],

  tenis: [
    {
      category: {
        es: "TENIS · AUTENTICIDAD",
        en: "TENNIS · AUTHENTICITY",
        pt: "TÉNIS · AUTENTICIDADE",
      },
      title: {
        es: "Cómo verificar una raqueta de tenis original",
        en: "How to verify an authentic tennis racket",
        pt: "Como verificar uma raquete de ténis original",
      },
      href: "/blog/como-verificar-raqueta-tenis-original",
    },
    {
      category: {
        es: "TENIS · COMPRA",
        en: "TENNIS · BUYING",
        pt: "TÉNIS · COMPRA",
      },
      title: {
        es: "Qué revisar antes de comprar una raqueta de tenis de segunda mano",
        en: "What to check before buying a second-hand tennis racket",
        pt: "O que verificar antes de comprar uma raquete de ténis em segunda mão",
      },
      href: "/blog/que-revisar-raqueta-tenis-segunda-mano",
    },
    {
      category: {
        es: "TENIS · VALORACIÓN",
        en: "TENNIS · VALUATION",
        pt: "TÉNIS · AVALIAÇÃO",
      },
      title: {
        es: "Cómo valorar una raqueta de tenis de segunda mano",
        en: "How to value a second-hand tennis racket",
        pt: "Como avaliar uma raquete de ténis em segunda mão",
      },
      href: "/blog/como-valorar-raqueta-tenis-segunda-mano",
    },
  ],

  running: [
    {
      category: {
        es: "RUNNING · COMPRA",
        en: "RUNNING · BUYING",
        pt: "RUNNING · COMPRA",
      },
      title: {
        es: "Qué revisar antes de comprar unas zapatillas de running de segunda mano",
        en: "What to check before buying second-hand running shoes",
        pt: "O que verificar antes de comprar sapatilhas de running em segunda mão",
      },
      href: "/blog/que-revisar-zapatillas-running-segunda-mano",
    },
    {
      category: {
        es: "RUNNING · ESTADO",
        en: "RUNNING · CONDITION",
        pt: "RUNNING · ESTADO",
      },
      title: {
        es: "Cómo saber si unas zapatillas de running están agotadas",
        en: "How to tell if running shoes are worn out",
        pt: "Como saber se umas sapatilhas de running estão gastas",
      },
      href: "/blog/como-saber-si-zapatillas-running-estan-agotadas",
    },
    {
      category: {
        es: "RUNNING · VALORACIÓN",
        en: "RUNNING · VALUATION",
        pt: "RUNNING · AVALIAÇÃO",
      },
      title: {
        es: "Cuántos kilómetros puede tener una zapatilla de running usada",
        en: "How many kilometres can used running shoes have",
        pt: "Quantos quilómetros podem ter umas sapatilhas de running usadas",
      },
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

  const { lang, t } = useLanguage();

  const articles = relatedByCategory[category].filter(
    (article) => article.href !== currentHref
  );


  return (
    <section style={sectionStyle}>
      <p style={eyebrowStyle}>{t.relatedArticlesEyebrow}</p>

      <h2 style={titleStyle}>{t.relatedArticlesTitle}</h2>

      <div style={gridStyle}>
        {articles.map((article, index) => (
          <Link key={`${article.href}-${index}`} href={article.href} style={cardStyle}>

            <span style={categoryStyle}>
  {article.category[lang]}
</span>

<h3 style={cardTitleStyle}>
  {article.title[lang]}
</h3>
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
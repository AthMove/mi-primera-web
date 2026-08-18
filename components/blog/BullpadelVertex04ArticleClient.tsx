"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";

const content = {
  es: {
    breadcrumbHome: "Inicio",
    breadcrumbGuides: "Guías",
    breadcrumbPadel: "Pádel",

    eyebrow: "ATHMOV · GUÍA DE COMPRA",

    title:
      "Bullpadel Vertex 04 de segunda mano: guía completa para comprar con seguridad",

    intro:
      "Qué revisar, cuánto pagar y cómo reducir el riesgo de falsificaciones antes de comprar una de las palas más buscadas del mercado.",

    updated: "Actualizado en julio de 2026",
    readingTime: "8 minutos de lectura",

    heroAlt:
      "Bullpadel Vertex 04 negra y dorada sobre fondo oscuro",

    heroCaption:
      "Bullpadel Vertex 04: una pala orientada a jugadores ofensivos y de nivel avanzado.",

    sectionOneTitle:
      "La Bullpadel Vertex 04 sigue siendo una de las palas más buscadas",

    sectionOneTextOne:
      "La Bullpadel Vertex 04 se ha consolidado como una de las palas de pádel de referencia para jugadores de nivel avanzado. Su potencia, estabilidad y construcción con materiales de alta gama hacen que siga siendo una de las opciones más demandadas, tanto nueva como de segunda mano.",

    sectionOneTextTwo:
      "Precisamente por su popularidad, el mercado de ocasión ofrece grandes oportunidades para quienes quieren acceder a una pala premium sin pagar el precio completo.",

    sectionOneTextThree:
      "En esta guía descubrirás qué revisar antes de comprar una Bullpadel Vertex 04 usada, cuánto deberías pagar y cómo detectar posibles señales de falsificación.",

    sectionOneLinkText:
      "palas Bullpadel de segunda mano disponibles",

    specsTitle: "Características principales",

    specShape: "Forma",
    specShapeValue: "Diamante",

    specBalance: "Balance",
    specBalanceValue: "Alto",

    specLevel: "Nivel",
    specLevelValue: "Avanzado / Competición",

    specPower: "Potencia",
    specPowerValue: "Muy alta",

    specControl: "Control",
    specControlValue: "Alto",

    specSurface: "Superficie",
    specSurfaceValue: "Xtend Carbon 12K",

    specBulletOne:
      "Marco CarbonTube 100 % carbono.",

    specBulletTwo:
      "Núcleo MultiEva.",

    specBulletThree:
      "Superficie Xtend Carbon 12K.",

    specBulletFour:
      "Diseño dirigido al juego ofensivo.",

    specClosing:
      "Es una pala pensada para jugadores que buscan máxima potencia en el remate sin renunciar a una buena estabilidad.",
      newPriceTitle: "Precio nueva",
newPriceIntro:
  "Dependiendo de la versión, el año y la tienda, una Bullpadel Vertex 04 nueva suele situarse entre:",
newPriceLabel: "Precio nueva",
newPriceRange: "250 € – 350 €",
newPriceText:
  "Durante campañas promocionales puede encontrarse por debajo de ese rango, aunque normalmente mantiene un precio elevado debido a su demanda y posicionamiento premium.",

usedPriceTitle:
  "¿Cuánto cuesta una Bullpadel Vertex 04 de segunda mano?",
usedPriceCondition: "Estado",
usedPriceGuide: "Precio orientativo",
usedPriceExcellent: "Excelente",
usedPriceVeryGood: "Muy buen estado",
usedPriceUsed: "Uso evidente",
usedPriceExcellentRange: "180 € – 240 €",
usedPriceVeryGoodRange: "150 € – 180 €",
usedPriceUsedRange: "100 € – 150 €",

warningTitle: "Atención",
warningText:
  "Un precio excesivamente bajo puede ser una señal de alerta, especialmente cuando el vendedor no aporta fotografías detalladas, factura o información clara sobre el origen de la pala.",
checkTitle:
  "Qué revisar antes de comprar",

checkFrameTitle: "1. Marco",
checkFrameIntro:
  "Comprueba que no existan:",
checkFrameBulletOne: "Grietas.",
checkFrameBulletTwo: "Reparaciones.",
checkFrameBulletThree:
  "Golpes estructurales.",
checkFrameText:
  "Los pequeños roces superficiales pueden ser normales, pero una grieta profunda puede afectar a la durabilidad y al rendimiento.",

checkFacesTitle: "2. Caras",
checkFacesTextOne:
  "Observa ambas caras con buena luz y, cuando sea posible, desde diferentes ángulos.",
checkFacesIntro: "Busca:",
checkFacesBulletOne: "Fisuras.",
checkFacesBulletTwo:
  "Desprendimientos del carbono.",
checkFacesBulletThree: "Hundimientos.",
checkFacesBulletFour:
  "Zonas con textura irregular.",

checkProtectorTitle: "3. Protector",
checkProtectorTextOne:
  "Si lleva protector, pregunta si se colocó desde el primer día. Muchas palas bien cuidadas incorporan protector desde nuevas.",
checkProtectorTextTwo:
  "No obstante, también conviene observar la zona que queda debajo, porque un protector puede ocultar golpes o reparaciones.",

checkBridgeTitle: "4. Puente",
checkBridgeText:
  "El puente es una de las zonas que más impactos y tensión soporta. Revisa que no tenga grietas, deformaciones o reparaciones.",

checkGripTitle: "5. Empuñadura",
checkGripIntro: "Comprueba:",
checkGripBulletOne:
  "El estado del grip.",
checkGripBulletTwo:
  "La ausencia de movimientos extraños.",
checkGripBulletThree:
  "Que el tapón inferior permanezca firme.",
checkGripBulletFour:
  "Que la correa de seguridad esté en buen estado.",

checkImageAlt:
  "Infografía con los puntos que deben revisarse antes de comprar una Bullpadel Vertex 04 usada",
checkImageCaption:
  "Marco, caras, protector, puente y empuñadura son las cinco zonas esenciales que debes inspeccionar.",

detailsImageAlt:
  "Detalles del marco, cara, protector, puente y empuñadura de una Bullpadel Vertex 04",
detailsImageCaption:
  "Solicita fotografías detalladas y evita valorar una pala únicamente con una imagen frontal.",  
authenticityTitle:
  "¿Cómo saber si es original?",

authenticityIntro:
  "La popularidad de la Bullpadel Vertex ha provocado la aparición de imitaciones y productos de procedencia dudosa.",

authenticityBeforeBuying:
  "Antes de comprar:",

authenticityBulletOne:
  "Solicita fotografías en alta resolución.",
authenticityBulletTwo:
  "Pide imágenes del canto y del puente.",
authenticityBulletThree:
  "Revisa acabados, colores y tipografías.",
authenticityBulletFour:
  "Comprueba la calidad y uniformidad del carbono.",
authenticityBulletFive:
  "Solicita imágenes de la etiqueta o número de serie.",
authenticityBulletSix:
  "Pide factura o comprobante de compra cuando sea posible.",

authenticityMoreInfo:
  "Puedes ampliar esta información en nuestra guía sobre",

authenticityLink:
  "cómo detectar una pala de pádel falsa",

athmovTipLabel:
  "Consejo ATHMOV",

athmovTipText:
  "Comprar a vendedores con un historial positivo, una identidad verificada y fotografías propias reduce considerablemente el riesgo.",

fivePointsImageAlt:
  "Los cinco puntos clave para revisar una Bullpadel Vertex 04 usada",
  recommendedTitle:
  "¿Para quién está recomendada?",

recommendedIntro:
  "La Bullpadel Vertex 04 está especialmente indicada para jugadores de nivel avanzado que buscan una pala potente y estable.",

recommendedBulletOne:
  "Jugadores ofensivos.",
recommendedBulletTwo:
  "Jugadores que buscan potencia en el remate.",
recommendedBulletThree:
  "Jugadores acostumbrados a balances altos.",
recommendedBulletFour:
  "Jugadores de nivel avanzado o competición.",

recommendedClosing:
  "Para jugadores principiantes o que priorizan manejabilidad y control, puede resultar exigente.",

prosTitle:
  "Ventajas",

prosBulletOne:
  "Gran potencia.",
prosBulletTwo:
  "Excelente estabilidad.",
prosBulletThree:
  "Materiales de alta gama.",
prosBulletFour:
  "Muy buena respuesta en juego ofensivo.",
prosBulletFive:
  "Alta demanda en el mercado de segunda mano.",

consTitle:
  "Desventajas",

consBulletOne:
  "Puede resultar exigente para jugadores principiantes.",
consBulletTwo:
  "Balance alto.",
consBulletThree:
  "Precio elevado incluso de segunda mano.",
consBulletFour:
  "Su popularidad aumenta el riesgo de encontrar falsificaciones.",
  faqTitle:
  "Preguntas frecuentes",

faqOneQuestion:
  "¿Cuánto debería pagar por una Bullpadel Vertex 04 usada?",
faqOneAnswer:
  "Como referencia, una unidad en excelente estado suele situarse entre 180 € y 240 €, mientras que una pala con mayor desgaste puede encontrarse entre 100 € y 150 €.",

faqTwoQuestion:
  "¿Merece la pena comprar una Bullpadel Vertex 04 de segunda mano?",
faqTwoAnswer:
  "Sí, siempre que el estado estructural sea bueno y el precio refleje su desgaste. Puede ser una forma interesante de acceder a una pala premium por menos dinero.",

faqThreeQuestion:
  "¿Cómo puedo evitar comprar una falsificación?",
faqThreeAnswer:
  "Solicita fotografías detalladas, revisa acabados y número de serie, pide prueba de compra cuando sea posible y prioriza vendedores verificados y con historial.",

faqFourQuestion:
  "¿Qué zonas son las más importantes al revisar la pala?",
faqFourAnswer:
  "El marco, las caras, el puente, la empuñadura y cualquier zona cubierta por un protector son especialmente importantes.",

conclusionTitle:
  "Conclusión",

conclusionTextOne:
  "La Bullpadel Vertex 04 puede ser una excelente compra de segunda mano para jugadores avanzados que buscan potencia y materiales de alta gama sin pagar el precio completo de una unidad nueva.",

conclusionTextTwo:
  "La clave está en revisar cuidadosamente su estado, comparar el precio con el mercado y comprobar el origen de la pala antes de cerrar la compra.",

ctaEyebrow:
  "THE GAME CONTINUES.",

ctaTitle:
  "Encuentra tu próxima Bullpadel",

ctaText:
  "Descubre palas Bullpadel de segunda mano y compra material deportivo premium con mayor información antes de decidir.",

ctaButton:
  "Ver Bullpadel de segunda mano",

relatedTitle:
  "También te puede interesar",

relatedFakeTitle:
  "Cómo detectar una pala de pádel falsa",

relatedValueTitle:
  "Cómo saber cuánto vale tu pala de pádel",

relatedPadelTitle:
  "Ver todas las guías de pádel",
},

  en: {
    breadcrumbHome: "Home",
    breadcrumbGuides: "Guides",
    breadcrumbPadel: "Padel",

    eyebrow: "ATHMOV · BUYING GUIDE",

    title:
      "Second-hand Bullpadel Vertex 04: complete guide to buying safely",

    intro:
      "What to check, how much to pay and how to reduce the risk of counterfeits before buying one of the most sought-after padel rackets on the market.",

    updated: "Updated July 2026",
    readingTime: "8 min read",

    heroAlt:
      "Black and gold Bullpadel Vertex 04 on a dark background",

    heroCaption:
      "Bullpadel Vertex 04: a racket designed for offensive and advanced-level players.",

    sectionOneTitle:
      "The Bullpadel Vertex 04 remains one of the most sought-after rackets",

    sectionOneTextOne:
      "The Bullpadel Vertex 04 has established itself as one of the benchmark padel rackets for advanced players. Its power, stability and construction with high-end materials mean it remains one of the most sought-after options, both new and second-hand.",

    sectionOneTextTwo:
      "Precisely because of its popularity, the second-hand market offers great opportunities for players who want access to a premium racket without paying the full new price.",

    sectionOneTextThree:
      "In this guide, you will learn what to check before buying a used Bullpadel Vertex 04, how much you should pay and how to spot possible signs of counterfeiting.",

    sectionOneLinkText:
      "second-hand Bullpadel rackets available",

    specsTitle: "Key specifications",

    specShape: "Shape",
    specShapeValue: "Diamond",

    specBalance: "Balance",
    specBalanceValue: "High",

    specLevel: "Level",
    specLevelValue: "Advanced / Competition",

    specPower: "Power",
    specPowerValue: "Very high",

    specControl: "Control",
    specControlValue: "High",

    specSurface: "Surface",
    specSurfaceValue: "Xtend Carbon 12K",

    specBulletOne:
      "100% carbon CarbonTube frame.",

    specBulletTwo:
      "MultiEva core.",

    specBulletThree:
      "Xtend Carbon 12K surface.",

    specBulletFour:
      "Design focused on offensive play.",

    specClosing:
      "It is designed for players looking for maximum power on smashes without giving up good stability.",
      newPriceTitle: "Price when new",
newPriceIntro:
  "Depending on the version, year and retailer, a new Bullpadel Vertex 04 usually costs between:",
newPriceLabel: "New price",
newPriceRange: "€250 – €350",
newPriceText:
  "During promotional campaigns it may be found below this range, although it usually retains a high price due to its demand and premium positioning.",

usedPriceTitle:
  "How much does a second-hand Bullpadel Vertex 04 cost?",
usedPriceCondition: "Condition",
usedPriceGuide: "Indicative price",
usedPriceExcellent: "Excellent",
usedPriceVeryGood: "Very good condition",
usedPriceUsed: "Visible wear",
usedPriceExcellentRange: "€180 – €240",
usedPriceVeryGoodRange: "€150 – €180",
usedPriceUsedRange: "€100 – €150",

warningTitle: "Attention",
warningText:
  "An unusually low price can be a warning sign, especially when the seller does not provide detailed photographs, a receipt or clear information about the racket's origin.",
checkTitle:
  "What to check before buying",

checkFrameTitle: "1. Frame",
checkFrameIntro:
  "Check that there are no:",
checkFrameBulletOne: "Cracks.",
checkFrameBulletTwo: "Repairs.",
checkFrameBulletThree:
  "Structural impacts.",
checkFrameText:
  "Small superficial marks can be normal, but a deep crack may affect durability and performance.",

checkFacesTitle: "2. Faces",
checkFacesTextOne:
  "Inspect both faces in good light and, whenever possible, from different angles.",
checkFacesIntro: "Look for:",
checkFacesBulletOne: "Cracks.",
checkFacesBulletTwo:
  "Carbon delamination.",
checkFacesBulletThree: "Dents.",
checkFacesBulletFour:
  "Areas with irregular texture.",

checkProtectorTitle: "3. Protector",
checkProtectorTextOne:
  "If the racket has a protector, ask whether it was fitted from the first day. Many well-cared-for rackets use a protector from new.",
checkProtectorTextTwo:
  "It is also worth checking the area underneath, as a protector can hide impacts or repairs.",

checkBridgeTitle: "4. Bridge",
checkBridgeText:
  "The bridge is one of the areas that withstands the most impact and stress. Check for cracks, deformation or repairs.",

checkGripTitle: "5. Grip",
checkGripIntro: "Check:",
checkGripBulletOne:
  "The condition of the grip.",
checkGripBulletTwo:
  "That there is no unusual movement.",
checkGripBulletThree:
  "That the bottom cap remains firmly in place.",
checkGripBulletFour:
  "That the safety strap is in good condition.",

checkImageAlt:
  "Infographic showing the areas to check before buying a used Bullpadel Vertex 04",
checkImageCaption:
  "The frame, faces, protector, bridge and grip are the five essential areas to inspect.",

detailsImageAlt:
  "Details of the frame, face, protector, bridge and grip of a Bullpadel Vertex 04",
detailsImageCaption:
  "Ask for detailed photographs and avoid assessing a racket from a single front-facing image.", 
authenticityTitle:
  "How can you tell if it is authentic?",

authenticityIntro:
  "The popularity of the Bullpadel Vertex has led to the appearance of imitations and products of uncertain origin.",

authenticityBeforeBuying:
  "Before buying:",

authenticityBulletOne:
  "Ask for high-resolution photographs.",
authenticityBulletTwo:
  "Request images of the edge and bridge.",
authenticityBulletThree:
  "Check finishes, colours and typography.",
authenticityBulletFour:
  "Check the quality and consistency of the carbon.",
authenticityBulletFive:
  "Ask for images of the label or serial number.",
authenticityBulletSix:
  "Request the invoice or proof of purchase whenever possible.",

authenticityMoreInfo:
  "You can find more information in our guide on",

authenticityLink:
  "how to spot a fake padel racket",

athmovTipLabel:
  "ATHMOV tip",

athmovTipText:
  "Buying from sellers with a positive track record, verified identity and their own photographs significantly reduces the risk.",

fivePointsImageAlt:
  "The five key points to check on a used Bullpadel Vertex 04",
  recommendedTitle:
  "¿Para quién está recomendada?",

recommendedIntro:
  "La Bullpadel Vertex 04 está especialmente indicada para jugadores de nivel avanzado que buscan una pala potente y estable.",

recommendedBulletOne:
  "Jugadores ofensivos.",
recommendedBulletTwo:
  "Jugadores que buscan potencia en el remate.",
recommendedBulletThree:
  "Jugadores acostumbrados a balances altos.",
recommendedBulletFour:
  "Jugadores de nivel avanzado o competición.",

recommendedClosing:
  "Para jugadores principiantes o que priorizan manejabilidad y control, puede resultar exigente.",

prosTitle:
  "Ventajas",

prosBulletOne:
  "Gran potencia.",
prosBulletTwo:
  "Excelente estabilidad.",
prosBulletThree:
  "Materiales de alta gama.",
prosBulletFour:
  "Muy buena respuesta en juego ofensivo.",
prosBulletFive:
  "Alta demanda en el mercado de segunda mano.",

consTitle:
  "Desventajas",

consBulletOne:
  "Puede resultar exigente para jugadores principiantes.",
consBulletTwo:
  "Balance alto.",
consBulletThree:
  "Precio elevado incluso de segunda mano.",
consBulletFour:
  "Su popularidad aumenta el riesgo de encontrar falsificaciones.",
  faqTitle:
  "Frequently asked questions",

faqOneQuestion:
  "How much should I pay for a used Bullpadel Vertex 04?",
faqOneAnswer:
  "As a guide, one in excellent condition usually costs between €180 and €240, while a racket with more visible wear may be found between €100 and €150.",

faqTwoQuestion:
  "Is a second-hand Bullpadel Vertex 04 worth buying?",
faqTwoAnswer:
  "Yes, provided that its structural condition is good and the price reflects its level of wear. It can be a good way to access a premium racket for less.",

faqThreeQuestion:
  "How can I avoid buying a counterfeit?",
faqThreeAnswer:
  "Ask for detailed photographs, check the finishes and serial number, request proof of purchase whenever possible and prioritise verified sellers with a track record.",

faqFourQuestion:
  "Which areas are most important to inspect?",
faqFourAnswer:
  "The frame, faces, bridge, grip and any area covered by a protector are particularly important.",

conclusionTitle:
  "Conclusion",

conclusionTextOne:
  "The Bullpadel Vertex 04 can be an excellent second-hand purchase for advanced players looking for power and high-end materials without paying the full price of a new racket.",

conclusionTextTwo:
  "The key is to inspect its condition carefully, compare the asking price with the market and verify the racket's origin before completing the purchase.",

ctaEyebrow:
  "THE GAME CONTINUES.",

ctaTitle:
  "Find your next Bullpadel",

ctaText:
  "Discover second-hand Bullpadel rackets and shop premium sports equipment with more information before making your decision.",

ctaButton:
  "View second-hand Bullpadel rackets",

relatedTitle:
  "You may also be interested in",

relatedFakeTitle:
  "How to spot a fake padel racket",

relatedValueTitle:
  "How to find out how much your padel racket is worth",

relatedPadelTitle:
  "View all padel guides",
},

  pt: {
    breadcrumbHome: "Início",
    breadcrumbGuides: "Guias",
    breadcrumbPadel: "Padel",

    eyebrow: "ATHMOV · GUIA DE COMPRA",

    title:
      "Bullpadel Vertex 04 em segunda mão: guia completo para comprar com segurança",

    intro:
      "O que verificar, quanto pagar e como reduzir o risco de falsificações antes de comprar uma das raquetes de padel mais procuradas do mercado.",

    updated: "Atualizado em julho de 2026",
    readingTime: "8 minutos de leitura",

    heroAlt:
      "Bullpadel Vertex 04 preta e dourada sobre fundo escuro",

    heroCaption:
      "Bullpadel Vertex 04: uma raquete orientada para jogadores ofensivos e de nível avançado.",

    sectionOneTitle:
      "A Bullpadel Vertex 04 continua a ser uma das raquetes mais procuradas",

    sectionOneTextOne:
      "A Bullpadel Vertex 04 consolidou-se como uma das raquetes de padel de referência para jogadores de nível avançado. A sua potência, estabilidade e construção com materiais de gama alta fazem com que continue a ser uma das opções mais procuradas, tanto nova como em segunda mão.",

    sectionOneTextTwo:
      "Precisamente devido à sua popularidade, o mercado de ocasião oferece grandes oportunidades para quem quer ter acesso a uma raquete premium sem pagar o preço total de uma nova.",

    sectionOneTextThree:
      "Neste guia vais descobrir o que verificar antes de comprar uma Bullpadel Vertex 04 usada, quanto deves pagar e como detetar possíveis sinais de falsificação.",

    sectionOneLinkText:
      "raquetes Bullpadel em segunda mão disponíveis",

    specsTitle: "Características principais",

    specShape: "Forma",
    specShapeValue: "Diamante",

    specBalance: "Equilíbrio",
    specBalanceValue: "Alto",

    specLevel: "Nível",
    specLevelValue: "Avançado / Competição",

    specPower: "Potência",
    specPowerValue: "Muito alta",

    specControl: "Controlo",
    specControlValue: "Alto",

    specSurface: "Superfície",
    specSurfaceValue: "Xtend Carbon 12K",

    specBulletOne:
      "Estrutura CarbonTube em 100 % carbono.",

    specBulletTwo:
      "Núcleo MultiEva.",

    specBulletThree:
      "Superfície Xtend Carbon 12K.",

    specBulletFour:
      "Design orientado para o jogo ofensivo.",

    specClosing:
      "É uma raquete pensada para jogadores que procuram máxima potência no remate sem abdicar de uma boa estabilidade.",
      newPriceTitle: "Preço nova",
newPriceIntro:
  "Dependendo da versão, do ano e da loja, uma Bullpadel Vertex 04 nova costuma custar entre:",
newPriceLabel: "Preço nova",
newPriceRange: "250 € – 350 €",
newPriceText:
  "Durante campanhas promocionais pode ser encontrada abaixo deste intervalo, embora normalmente mantenha um preço elevado devido à sua procura e posicionamento premium.",

usedPriceTitle:
  "Quanto custa uma Bullpadel Vertex 04 em segunda mão?",
usedPriceCondition: "Estado",
usedPriceGuide: "Preço indicativo",
usedPriceExcellent: "Excelente",
usedPriceVeryGood: "Muito bom estado",
usedPriceUsed: "Desgaste evidente",
usedPriceExcellentRange: "180 € – 240 €",
usedPriceVeryGoodRange: "150 € – 180 €",
usedPriceUsedRange: "100 € – 150 €",

warningTitle: "Atenção",
warningText:
  "Um preço excessivamente baixo pode ser um sinal de alerta, especialmente quando o vendedor não fornece fotografias detalhadas, fatura ou informações claras sobre a origem da raquete.",
checkTitle:
  "O que verificar antes de comprar",

checkFrameTitle: "1. Estrutura",
checkFrameIntro:
  "Verifica se não existem:",
checkFrameBulletOne: "Fissuras.",
checkFrameBulletTwo: "Reparações.",
checkFrameBulletThree:
  "Impactos estruturais.",
checkFrameText:
  "Pequenos riscos superficiais podem ser normais, mas uma fissura profunda pode afetar a durabilidade e o desempenho.",

checkFacesTitle: "2. Faces",
checkFacesTextOne:
  "Observa ambas as faces com boa luz e, sempre que possível, a partir de diferentes ângulos.",
checkFacesIntro: "Procura:",
checkFacesBulletOne: "Fissuras.",
checkFacesBulletTwo:
  "Descolamento do carbono.",
checkFacesBulletThree: "Afundamentos.",
checkFacesBulletFour:
  "Zonas com textura irregular.",

checkProtectorTitle: "3. Protetor",
checkProtectorTextOne:
  "Se tiver protetor, pergunta se foi colocado desde o primeiro dia. Muitas raquetes bem cuidadas usam protetor desde novas.",
checkProtectorTextTwo:
  "Também convém observar a zona por baixo, porque um protetor pode ocultar impactos ou reparações.",

checkBridgeTitle: "4. Ponte",
checkBridgeText:
  "A ponte é uma das zonas que suporta mais impactos e tensão. Verifica se não apresenta fissuras, deformações ou reparações.",

checkGripTitle: "5. Punho",
checkGripIntro: "Verifica:",
checkGripBulletOne:
  "O estado do grip.",
checkGripBulletTwo:
  "A ausência de movimentos anormais.",
checkGripBulletThree:
  "Que a tampa inferior permaneça firme.",
checkGripBulletFour:
  "Que a correia de segurança esteja em bom estado.",

checkImageAlt:
  "Infografia com os pontos que devem ser verificados antes de comprar uma Bullpadel Vertex 04 usada",
checkImageCaption:
  "Estrutura, faces, protetor, ponte e punho são as cinco zonas essenciais que deves inspecionar.",

detailsImageAlt:
  "Detalhes da estrutura, face, protetor, ponte e punho de uma Bullpadel Vertex 04",
detailsImageCaption:
  "Pede fotografias detalhadas e evita avaliar uma raquete apenas com uma imagem frontal.", 
authenticityTitle:
  "Como saber se é original?",

authenticityIntro:
  "A popularidade da Bullpadel Vertex levou ao aparecimento de imitações e produtos de origem duvidosa.",

authenticityBeforeBuying:
  "Antes de comprar:",

authenticityBulletOne:
  "Pede fotografias em alta resolução.",
authenticityBulletTwo:
  "Solicita imagens da lateral e da ponte.",
authenticityBulletThree:
  "Verifica acabamentos, cores e tipografias.",
authenticityBulletFour:
  "Confirma a qualidade e uniformidade do carbono.",
authenticityBulletFive:
  "Solicita imagens da etiqueta ou do número de série.",
authenticityBulletSix:
  "Pede fatura ou comprovativo de compra sempre que possível.",

authenticityMoreInfo:
  "Podes ampliar esta informação no nosso guia sobre",

authenticityLink:
  "como detetar uma raquete de padel falsa",

athmovTipLabel:
  "Conselho ATHMOV",

athmovTipText:
  "Comprar a vendedores com um histórico positivo, identidade verificada e fotografias próprias reduz consideravelmente o risco.",

fivePointsImageAlt:
  "Os cinco pontos principais a verificar numa Bullpadel Vertex 04 usada",
  recommendedTitle:
  "Para quem é recomendada?",

recommendedIntro:
  "A Bullpadel Vertex 04 é especialmente indicada para jogadores de nível avançado que procuram uma raquete potente e estável.",

recommendedBulletOne:
  "Jogadores ofensivos.",
recommendedBulletTwo:
  "Jogadores que procuram potência no remate.",
recommendedBulletThree:
  "Jogadores habituados a raquetes com equilíbrio alto.",
recommendedBulletFour:
  "Jogadores de nível avançado ou competição.",

recommendedClosing:
  "Para principiantes ou jogadores que dão prioridade à facilidade de manuseamento e ao controlo, pode ser exigente.",

prosTitle:
  "Vantagens",

prosBulletOne:
  "Grande potência.",
prosBulletTwo:
  "Excelente estabilidade.",
prosBulletThree:
  "Materiais de gama alta.",
prosBulletFour:
  "Excelente resposta no jogo ofensivo.",
prosBulletFive:
  "Elevada procura no mercado de segunda mão.",

consTitle:
  "Desvantagens",

consBulletOne:
  "Pode ser exigente para jogadores principiantes.",
consBulletTwo:
  "Equilíbrio alto.",
consBulletThree:
  "Preço elevado mesmo em segunda mão.",
consBulletFour:
  "A sua popularidade aumenta o risco de encontrar falsificações.",
  faqTitle:
  "Perguntas frequentes",

faqOneQuestion:
  "Quanto devo pagar por uma Bullpadel Vertex 04 usada?",
faqOneAnswer:
  "Como referência, uma unidade em excelente estado costuma custar entre 180 € e 240 €, enquanto uma raquete com maior desgaste pode ser encontrada entre 100 € e 150 €.",

faqTwoQuestion:
  "Vale a pena comprar uma Bullpadel Vertex 04 em segunda mão?",
faqTwoAnswer:
  "Sim, desde que o estado estrutural seja bom e o preço reflita o desgaste. Pode ser uma forma interessante de ter acesso a uma raquete premium por menos dinheiro.",

faqThreeQuestion:
  "Como posso evitar comprar uma falsificação?",
faqThreeAnswer:
  "Pede fotografias detalhadas, verifica os acabamentos e o número de série, solicita comprovativo de compra sempre que possível e dá prioridade a vendedores verificados e com histórico.",

faqFourQuestion:
  "Quais são as zonas mais importantes a verificar?",
faqFourAnswer:
  "A estrutura, as faces, a ponte, o punho e qualquer zona coberta por um protetor são especialmente importantes.",

conclusionTitle:
  "Conclusão",

conclusionTextOne:
  "A Bullpadel Vertex 04 pode ser uma excelente compra em segunda mão para jogadores avançados que procuram potência e materiais de gama alta sem pagar o preço total de uma raquete nova.",

conclusionTextTwo:
  "A chave está em verificar cuidadosamente o estado, comparar o preço com o mercado e confirmar a origem da raquete antes de concluir a compra.",

ctaEyebrow:
  "THE GAME CONTINUES.",

ctaTitle:
  "Encontra a tua próxima Bullpadel",

ctaText:
  "Descobre raquetes Bullpadel em segunda mão e compra material desportivo premium com mais informação antes de decidir.",

ctaButton:
  "Ver Bullpadel em segunda mão",

relatedTitle:
  "Também te pode interessar",

relatedFakeTitle:
  "Como detetar uma raquete de padel falsa",

relatedValueTitle:
  "Como saber quanto vale a tua raquete de padel",

relatedPadelTitle:
  "Ver todos os guias de padel",
},
} as const;

export default function BullpadelVertex04ArticleClient() {
  const { lang, t } = useLanguage();
  const c = content[lang];

  return (
    <>
      <main className="article-page">
        <article className="article-container">
          <nav
            className="breadcrumb"
            aria-label={t.brandBreadcrumbLabel}
          >
            <Link href="/">
              {c.breadcrumbHome}
            </Link>

            <span aria-hidden="true">›</span>

            <Link href="/blog">
              {c.breadcrumbGuides}
            </Link>

            <span aria-hidden="true">›</span>

            <Link href="/blog/padel">
              {c.breadcrumbPadel}
            </Link>

            <span aria-hidden="true">›</span>

            <strong>Bullpadel Vertex 04</strong>
          </nav>

          <header className="article-header">
            <p className="eyebrow">
              {c.eyebrow}
            </p>

            <h1>{c.title}</h1>

            <p className="article-intro">
              {c.intro}
            </p>

            <div className="article-meta">
              <span>{c.updated}</span>
              <span>·</span>
              <span>{c.readingTime}</span>
            </div>
          </header>

          <figure className="hero-image">
            <Image
              src="/blog/bullpadel-vertex-04/vertex-04-portada.jpg"
              alt={c.heroAlt}
              width={1600}
              height={1067}
              priority
              sizes="(max-width: 900px) 100vw, 1200px"
            />

            <figcaption>
              {c.heroCaption}
            </figcaption>
          </figure>
          <section className="article-section">
  <h2>{c.sectionOneTitle}</h2>

  <p>
    <Link
      href="/brands/bullpadel"
      className="article-link"
    >
      Bullpadel Vertex 04
    </Link>{" "}
    {c.sectionOneTextOne.replace(
      "La Bullpadel Vertex 04 ",
      ""
    ).replace(
      "The Bullpadel Vertex 04 ",
      ""
    ).replace(
      "A Bullpadel Vertex 04 ",
      ""
    )}
  </p>

  <p>{c.sectionOneTextTwo}</p>

  <p>{c.sectionOneTextThree}</p>

  <p>
    <Link
      href="/padel/bullpadel"
      className="article-link"
    >
      {c.sectionOneLinkText}
    </Link>{" "}
    ATHMOV.
  </p>
</section>

<section className="article-section">
  <h2>{c.specsTitle}</h2>

  <div className="specifications-grid">
    <div className="specification">
      <span>{c.specShape}</span>
      <strong>{c.specShapeValue}</strong>
    </div>

    <div className="specification">
      <span>{c.specBalance}</span>
      <strong>{c.specBalanceValue}</strong>
    </div>

    <div className="specification">
      <span>{c.specLevel}</span>
      <strong>{c.specLevelValue}</strong>
    </div>

    <div className="specification">
      <span>{c.specPower}</span>
      <strong>{c.specPowerValue}</strong>
    </div>

    <div className="specification">
      <span>{c.specControl}</span>
      <strong>{c.specControlValue}</strong>
    </div>

    <div className="specification">
      <span>{c.specSurface}</span>
      <strong>{c.specSurfaceValue}</strong>
    </div>
  </div>

  <ul>
    <li>{c.specBulletOne}</li>
    <li>{c.specBulletTwo}</li>
    <li>{c.specBulletThree}</li>
    <li>{c.specBulletFour}</li>
  </ul>

  <p>{c.specClosing}</p>
  </section>

  <section className="article-section">
  <h2>{c.newPriceTitle}</h2>

  <p>{c.newPriceIntro}</p>

  <div className="price-highlight">
    <span>{c.newPriceLabel}</span>
    <strong>{c.newPriceRange}</strong>
  </div>

  <p>{c.newPriceText}</p>
</section>

<section className="article-section">
  <h2>{c.usedPriceTitle}</h2>

  <div className="price-table">
    <div className="price-row price-heading">
      <span>{c.usedPriceCondition}</span>
      <span>{c.usedPriceGuide}</span>
    </div>

    <div className="price-row">
      <span>{c.usedPriceExcellent}</span>
      <strong>{c.usedPriceExcellentRange}</strong>
    </div>

    <div className="price-row">
      <span>{c.usedPriceVeryGood}</span>
      <strong>{c.usedPriceVeryGoodRange}</strong>
    </div>

    <div className="price-row">
      <span>{c.usedPriceUsed}</span>
      <strong>{c.usedPriceUsedRange}</strong>
    </div>
  </div>

  <div className="warning-box">
    <strong>{c.warningTitle}</strong>
    <p>{c.warningText}</p>
  </div>
</section>
<section className="article-section">
  <h2>{c.checkTitle}</h2>

  <h3>{c.checkFrameTitle}</h3>
  <p>{c.checkFrameIntro}</p>

  <ul>
    <li>{c.checkFrameBulletOne}</li>
    <li>{c.checkFrameBulletTwo}</li>
    <li>{c.checkFrameBulletThree}</li>
  </ul>

  <p>{c.checkFrameText}</p>

  <h3>{c.checkFacesTitle}</h3>
  <p>{c.checkFacesTextOne}</p>
  <p>{c.checkFacesIntro}</p>

  <ul>
    <li>{c.checkFacesBulletOne}</li>
    <li>{c.checkFacesBulletTwo}</li>
    <li>{c.checkFacesBulletThree}</li>
    <li>{c.checkFacesBulletFour}</li>
  </ul>

  <h3>{c.checkProtectorTitle}</h3>
  <p>{c.checkProtectorTextOne}</p>
  <p>{c.checkProtectorTextTwo}</p>

  <h3>{c.checkBridgeTitle}</h3>
  <p>{c.checkBridgeText}</p>

  <h3>{c.checkGripTitle}</h3>
  <p>{c.checkGripIntro}</p>

  <ul>
    <li>{c.checkGripBulletOne}</li>
    <li>{c.checkGripBulletTwo}</li>
    <li>{c.checkGripBulletThree}</li>
    <li>{c.checkGripBulletFour}</li>
  </ul>
</section>

<figure className="editorial-image">
  <Image
    src="/blog/bullpadel-vertex-04/vertex-04-revision.jpg"
    alt={c.checkImageAlt}
    width={1600}
    height={1067}
    sizes="(max-width: 900px) 100vw, 1100px"
  />

  <figcaption>
    {c.checkImageCaption}
  </figcaption>
</figure>

<figure className="editorial-image">
  <Image
    src="/blog/bullpadel-vertex-04/vertex-04-detalles.jpg"
    alt={c.detailsImageAlt}
    width={1600}
    height={1067}
    sizes="(max-width: 900px) 100vw, 1100px"
  />

  <figcaption>
    {c.detailsImageCaption}
  </figcaption>
</figure>
<section className="article-section">
  <h2>{c.recommendedTitle}</h2>

  <p>{c.recommendedIntro}</p>

  <ul>
    <li>{c.recommendedBulletOne}</li>
    <li>{c.recommendedBulletTwo}</li>
    <li>{c.recommendedBulletThree}</li>
    <li>{c.recommendedBulletFour}</li>
  </ul>

  <p>{c.recommendedClosing}</p>
</section>

<section className="article-section">
  <div className="pros-cons-grid">
    <div className="pros-cons-card">
      <h2>{c.prosTitle}</h2>

      <ul>
        <li>{c.prosBulletOne}</li>
        <li>{c.prosBulletTwo}</li>
        <li>{c.prosBulletThree}</li>
        <li>{c.prosBulletFour}</li>
        <li>{c.prosBulletFive}</li>
      </ul>
    </div>

    <div className="pros-cons-card">
      <h2>{c.consTitle}</h2>

      <ul>
        <li>{c.consBulletOne}</li>
        <li>{c.consBulletTwo}</li>
        <li>{c.consBulletThree}</li>
        <li>{c.consBulletFour}</li>
      </ul>
    </div>
  </div>
</section>

<section className="article-section">
  <h2>{c.authenticityTitle}</h2>

  <p>{c.authenticityIntro}</p>

  <p>{c.authenticityBeforeBuying}</p>

  <ul>
    <li>{c.authenticityBulletOne}</li>
    <li>{c.authenticityBulletTwo}</li>
    <li>{c.authenticityBulletThree}</li>
    <li>{c.authenticityBulletFour}</li>
    <li>{c.authenticityBulletFive}</li>
    <li>{c.authenticityBulletSix}</li>
  </ul>

  <p>
    {c.authenticityMoreInfo}{" "}
    <Link
      href="/blog/como-detectar-pala-padel-falsa"
      className="article-link"
    >
      {c.authenticityLink}
    </Link>
    .
  </p>

  <div className="athmov-tip">
    <strong>{c.athmovTipLabel}</strong>
    <p>{c.athmovTipText}</p>
  </div>
</section>

<figure className="editorial-image">
  <Image
    src="/blog/bullpadel-vertex-04/vertex-04-cinco-puntos.jpg"
    alt={c.fivePointsImageAlt}
    width={1600}
    height={1067}
    sizes="(max-width: 900px) 100vw, 1100px"
  />
</figure>
<section className="article-section">
  <h2>{c.faqTitle}</h2>

  <div className="faq-list">
    <div className="faq-item">
      <h3>{c.faqOneQuestion}</h3>
      <p>{c.faqOneAnswer}</p>
    </div>

    <div className="faq-item">
      <h3>{c.faqTwoQuestion}</h3>
      <p>{c.faqTwoAnswer}</p>
    </div>

    <div className="faq-item">
      <h3>{c.faqThreeQuestion}</h3>
      <p>{c.faqThreeAnswer}</p>
    </div>

    <div className="faq-item">
      <h3>{c.faqFourQuestion}</h3>
      <p>{c.faqFourAnswer}</p>
    </div>
  </div>
</section>

<section className="article-section">
  <h2>{c.conclusionTitle}</h2>

  <p>{c.conclusionTextOne}</p>
  <p>{c.conclusionTextTwo}</p>
</section>

<section className="article-cta">
  <p className="cta-eyebrow">
    {c.ctaEyebrow}
  </p>

  <h2>{c.ctaTitle}</h2>

  <p>{c.ctaText}</p>

  <Link
    href="/padel/bullpadel"
    className="cta-button"
  >
    {c.ctaButton}
  </Link>
</section>

<section className="related-articles">
  <h2>{c.relatedTitle}</h2>

  <div className="related-articles-grid">
    <Link
      href="/blog/como-detectar-pala-padel-falsa"
      className="related-article-card"
    >
      {c.relatedFakeTitle}
    </Link>

    <Link
      href="/blog/cuanto-vale-mi-pala-padel"
      className="related-article-card"
    >
      {c.relatedValueTitle}
    </Link>

    <Link
      href="/blog/padel"
      className="related-article-card"
    >
      {c.relatedPadelTitle}
    </Link>
  </div>
</section>
        </article>
      </main>
      <style>{`
  :root {
    --article-black: #080808;
    --article-dark: #111111;
    --article-soft: #f5f5f2;
    --article-white: #ffffff;
    --article-muted: #707070;
    --article-border: #deded8;
    --article-accent: #9ca746;
  }
    .editorial-image {
  margin: 0 auto 72px;
}

.editorial-image img {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 3px;
  object-fit: cover;
}

.article-section h3 {
  margin: 42px 0 15px;
  font-size: 20px;
  font-weight: 600;
}

  * {
    box-sizing: border-box;
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
  }

  .article-header {
    width: min(100%, 900px);
    margin: 0 auto 48px;
    text-align: center;
  }

  .eyebrow {
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

  .hero-image {
    margin: 0 auto 72px;
  }

  .hero-image img {
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

  .article-section {
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

  .article-section p,
  .article-section li {
    color: #333;
    font-size: 17px;
    line-height: 1.85;
  }

  .article-section p {
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

  .specifications-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1px;
    margin: 35px 0;
    border: 1px solid var(--article-border);
    background: var(--article-border);
  }

  .specification {
    display: flex;
    min-height: 110px;
    flex-direction: column;
    justify-content: space-between;
    gap: 16px;
    padding: 20px;
    background: var(--article-white);
  }

  .specification span {
    color: var(--article-muted);
    font-size: 12px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .specification strong {
    font-size: 18px;
    font-weight: 500;
  }

  .price-highlight {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 30px;
  margin: 35px 0;
  padding: 36px;
  background: var(--article-black);
  color: var(--article-white);
}

.price-highlight span {
  color: #bbb;
  font-size: 14px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.price-highlight strong {
  color: var(--article-accent);
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(34px, 5vw, 56px);
  font-weight: 400;
  white-space: nowrap;
}

.price-table {
  margin: 35px 0;
  border-top: 1px solid var(--article-black);
}

.price-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  padding: 18px 0;
  border-bottom: 1px solid var(--article-border);
}

.price-row strong {
  text-align: right;
}

.price-heading {
  color: var(--article-muted);
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.warning-box {
  margin-top: 35px;
  padding: 28px;
  border-left: 3px solid var(--article-accent);
  background: var(--article-soft);
}

.warning-box strong {
  display: block;
  margin-bottom: 12px;
  color: var(--article-accent);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.warning-box p {
  margin: 0;
}

.athmov-tip {
  margin-top: 35px;
  padding: 30px;
  background: var(--article-black);
  color: var(--article-white);
}

.athmov-tip strong {
  display: block;
  margin-bottom: 12px;
  color: var(--article-accent);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.athmov-tip p {
  margin: 0;
  color: #e8e8e8;
}
  .pros-cons-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}

.pros-cons-card {
  padding: 30px;
  border: 1px solid var(--article-border);
  background: var(--article-soft);
}

.pros-cons-card h2 {
  margin-bottom: 22px;
  font-size: 30px;
}

.pros-cons-card ul {
  margin: 0;
}
  .faq-list {
  border-top: 1px solid var(--article-border);
}

.faq-item {
  padding: 28px 0;
  border-bottom: 1px solid var(--article-border);
}

.faq-item h3 {
  margin: 0 0 12px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 23px;
  font-weight: 400;
  line-height: 1.3;
}

.faq-item p {
  margin: 0;
}

.article-cta {
  width: min(100%, 920px);
  margin: 90px auto;
  padding: 70px 50px;
  background: var(--article-black);
  color: var(--article-white);
  text-align: center;
}

.cta-eyebrow {
  margin: 0 0 18px;
  color: var(--article-accent);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.2em;
}

.article-cta h2 {
  margin: 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(34px, 5vw, 58px);
  font-weight: 400;
}

.article-cta > p:not(.cta-eyebrow) {
  max-width: 650px;
  margin: 22px auto 32px;
  color: #d0d0d0;
  font-size: 17px;
  line-height: 1.7;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 52px;
  padding: 0 28px;
  background: var(--article-white);
  color: var(--article-black);
  font-size: 14px;
  font-weight: 650;
  text-decoration: none;
}

.related-articles {
  width: min(100%, 920px);
  margin: 0 auto 40px;
}

.related-articles > h2 {
  margin-bottom: 30px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(30px, 4vw, 44px);
  font-weight: 400;
}

.related-articles-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.related-article-card {
  display: flex;
  min-height: 150px;
  align-items: flex-end;
  padding: 24px;
  border: 1px solid var(--article-border);
  color: var(--article-black);
  font-family: Georgia, "Times New Roman", serif;
  font-size: 20px;
  line-height: 1.3;
  text-decoration: none;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease;
}

.related-article-card:hover {
  transform: translateY(-3px);
  border-color: var(--article-black);
}

@media (max-width: 760px) {
.pros-cons-grid {
  grid-template-columns: 1fr;
}
  .article-page {
    padding: 115px 16px 70px;
  }

  .article-header {
    text-align: left;
  }

  .article-meta {
    justify-content: flex-start;
  }

  .specifications-grid {
    grid-template-columns: 1fr;
  }

  .price-highlight {
    align-items: flex-start;
    flex-direction: column;
    padding: 28px;
  }

  .price-highlight strong {
    white-space: normal;
  }
    .article-cta {
  margin: 70px auto;
  padding: 50px 24px;
  text-align: left;
}

.related-articles-grid {
  grid-template-columns: 1fr;
}
 }
`}</style>
    </>
  );
}
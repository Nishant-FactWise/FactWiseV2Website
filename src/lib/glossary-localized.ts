import type { Locale } from "./i18n";

export type LocalizedGlossaryTerm = {
  id: string;
  term: string;
  definition: string;
  seeAlso: string;
};

type GlossaryCopy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  seeFeature: string;
  ctaTitle: string;
  ctaText: string;
  ctaButton: string;
  linkAriaPrefix: string;
  terms: LocalizedGlossaryTerm[];
};

const links = {
  home: "https://factwise.io",
  req: "https://factwise.io/requisitions-to-po",
  i2p: "https://factwise.io/invoice-to-pay",
  i2q: "https://factwise.io/inquiry-to-quote",
};

const ids = [
  "source-to-pay",
  "requisition-to-po",
  "4-way-invoice-matching",
  "bom-costing",
  "landed-cost-analysis",
  "ai-negotiation",
  "inquiry-to-quote",
  "rfq-management",
  "ap-automation",
  "grn",
] as const;

const seeAlso = [links.home, links.req, links.i2p, links.i2q, links.req, links.req, links.i2q, links.req, links.i2p, links.i2p];

function terms(items: Array<[string, string]>): LocalizedGlossaryTerm[] {
  return items.map(([term, definition], index) => ({
    id: ids[index],
    term,
    definition,
    seeAlso: seeAlso[index],
  }));
}

export const glossaryCopy: Record<Locale, GlossaryCopy> = {
  en: {
    eyebrow: "Procurement Glossary",
    title: "Key Procurement Terms, Defined",
    subtitle: "Plain-language definitions for source-to-pay, invoice matching, BOM costing, and other manufacturing procurement terminology.",
    seeFeature: "See FactWise feature ->",
    ctaTitle: "See these concepts in action",
    ctaText: "FactWise puts all of these workflows into practice in one platform, built for manufacturers.",
    ctaButton: "Book a Demo ->",
    linkAriaPrefix: "Link to definition of",
    terms: terms([
      ["Source-to-Pay (S2P)", "Source-to-Pay (S2P) is the complete procurement lifecycle from identifying and sourcing suppliers, issuing RFQs, evaluating vendor quotes, generating purchase orders, receiving goods, matching and verifying vendor invoices, and processing payments. FactWise automates the entire source-to-pay cycle in a single connected platform for manufacturing companies."],
      ["Requisition-to-PO (Req-to-PO)", "Requisition-to-PO (Req-to-PO), also called PR-to-PO (Purchase Request to Purchase Order), is the internal procurement process that starts when an employee raises a purchase requisition and ends when a purchase order is generated and sent to a vendor. It includes requisition creation, multi-level approval, vendor RFQ management, vendor selection, and PO generation."],
      ["4-Way Invoice Matching", "4-Way Invoice Matching is an accounts payable process that reconciles a vendor invoice against four source documents: the Purchase Order (PO), Goods Receipt Note (GRN), Quality Check (QC) report, and Contract. Any discrepancy is flagged before payment approval, preventing overpayments, underpayments, and duplicate invoice payments."],
      ["BOM Costing (Bill of Materials Costing)", "BOM Costing, or Bill of Materials Costing, calculates the total material cost of a manufactured product by pricing each component in the Bill of Materials (BOM). Accurate BOM costing is essential for profitable customer quotes. FactWise automates this by matching components against approved vendor prices and historical purchase data."],
      ["Landed Cost Analysis", "Landed Cost Analysis calculates the total cost of a purchased item beyond unit price, including freight, customs duties, port handling fees, insurance, and applicable taxes such as GST in India. It shows the true cost of bringing goods to a manufacturer's facility and helps compare vendors by total cost, not unit price alone."],
      ["AI Negotiation Engine", "An AI Negotiation Engine uses artificial intelligence to guide buyers through vendor negotiations by analyzing incoming quotes, identifying pricing outliers, and recommending counter-positions. FactWise helps manufacturing procurement teams achieve consistent, optimized negotiation outcomes without relying only on individual experience."],
      ["Inquiry-to-Quote (I2Q)", "Inquiry-to-Quote (I2Q) is the workflow used when a manufacturer responds to a customer's Request for Quotation (RFQ). It includes receiving the inquiry, costing the BOM, sourcing components, calculating landed costs, applying margin, and sending a formatted customer quote."],
      ["RFQ Management (Request for Quotation)", "RFQ Management is the process of creating, sending, tracking, and evaluating Requests for Quotation sent to vendors. An RFQ specifies goods or services, quantities, delivery dates, and terms. Vendors respond with price quotes, and FactWise collects them in a structured format for comparison."],
      ["AP Automation (Accounts Payable Automation)", "AP Automation uses software to automate accounts payable: invoice capture, data extraction, matching against purchase orders and receipts, discrepancy resolution, approval routing, and payment scheduling. For manufacturers, this includes quality-check-based invoice verification such as 4-way matching."],
      ["Goods Receipt Note (GRN)", "A Goods Receipt Note (GRN) is created by a warehouse team when goods from a vendor arrive. It records what was received, quantity, and visible condition issues. In 4-way invoice matching, the GRN confirms goods were received before payment is approved."],
    ]),
  },
  zh: {
    eyebrow: "采购术语表",
    title: "关键采购术语解释",
    subtitle: "用清晰语言解释寻源到付款、发票匹配、BOM 成本核算以及其他制造业采购术语。",
    seeFeature: "查看 FactWise 功能 ->",
    ctaTitle: "查看这些概念如何落地",
    ctaText: "FactWise 将这些采购工作流整合到一个专为制造商打造的平台中。",
    ctaButton: "预约演示 ->",
    linkAriaPrefix: "链接到术语定义：",
    terms: terms([
      ["寻源到付款 (S2P)", "寻源到付款 (S2P) 是完整的采购生命周期，涵盖供应商识别与寻源、发出 RFQ、评估供应商报价、生成采购订单、收货、匹配并核验供应商发票，以及处理付款。FactWise 在一个互联平台中为制造企业自动化整个寻源到付款流程。"],
      ["请购到采购订单 (Req-to-PO)", "请购到采购订单 (Req-to-PO)，也称 PR-to-PO，是内部采购流程：从员工提交采购请购开始，到生成采购订单并发送给供应商结束。流程包括请购创建、多级审批、供应商 RFQ 管理、供应商选择和 PO 生成。"],
      ["四方发票匹配", "四方发票匹配是应付账款流程，会将供应商发票与四类来源文件核对：采购订单 (PO)、收货单 (GRN)、质量检查 (QC) 报告和合同。任何差异都会在付款审批前被标记，从而防止超额付款、少付和重复付款。"],
      ["BOM 成本核算（物料清单成本核算）", "BOM 成本核算是通过逐项计算物料清单 (BOM) 中每个组件价格，得出制造产品总材料成本的过程。准确的 BOM 成本核算对于盈利性客户报价至关重要。FactWise 可根据已批准供应商价格库和历史采购数据自动完成匹配。"],
      ["到岸成本分析", "到岸成本分析计算采购物品除单价之外的总成本，包括运费、关税、港口处理费、保险费以及适用税费（如印度 GST）。它反映货物到达制造商工厂的真实总成本，帮助按总成本而不只是单价比较供应商。"],
      ["人工智能谈判引擎", "人工智能谈判引擎利用人工智能指导买方进行供应商谈判：分析收到的报价、识别价格异常，并建议还价策略。FactWise 帮助制造业采购团队获得一致且优化的谈判结果，而不是只依赖个人经验。"],
      ["询价到报价 (I2Q)", "询价到报价 (I2Q) 是制造商响应客户 RFQ 的工作流。它包括接收客户询价、核算 BOM 成本、组件寻源、计算到岸成本、应用目标利润率，并发送标准化客户报价。"],
      ["RFQ 管理（报价请求管理）", "RFQ 管理是创建、发送、跟踪和评估发给供应商的报价请求的过程。RFQ 会说明所需商品或服务、数量、交付日期和条款。供应商返回价格报价，FactWise 以结构化格式收集，便于比较。"],
      ["AP 自动化（应付账款自动化）", "AP 自动化是用软件自动化应付账款流程，包括供应商发票采集、数据提取、与采购订单和收货记录匹配、差异处理、审批流转和付款排程。对制造商来说，它还包括基于质检的发票核验，例如四方匹配。"],
      ["收货单 (GRN)", "收货单 (GRN) 是供应商货物到达时由仓库团队创建的文件。它记录收到的物品、数量以及可见的状态问题。在四方发票匹配中，GRN 用于确认货物确实已收到，然后才批准付款。"],
    ]),
  },
  es: {
    eyebrow: "Glosario de compras",
    title: "Términos clave de compras, explicados",
    subtitle: "Definiciones claras de abastecimiento a pago, conciliación de facturas, costeo de BOM y otros términos de compras para manufactura.",
    seeFeature: "Ver función de FactWise ->",
    ctaTitle: "Ve estos conceptos en acción",
    ctaText: "FactWise pone estos flujos en práctica en una sola plataforma creada para fabricantes.",
    ctaButton: "Reservar demo ->",
    linkAriaPrefix: "Enlace a la definición de",
    terms: terms([
      ["Source-to-Pay (S2P, abastecimiento a pago)", "Source-to-Pay (S2P) es el ciclo completo de compras: identificar y abastecer proveedores, emitir RFQ, evaluar cotizaciones, generar órdenes de compra, recibir bienes, conciliar y verificar facturas de proveedores y procesar pagos. FactWise automatiza este ciclo completo para fabricantes en una plataforma conectada."],
      ["Requisition-to-PO (Req-to-PO)", "Requisition-to-PO, también llamado PR-to-PO, es el proceso interno que empieza cuando un empleado crea una requisición de compra y termina cuando se genera y envía una orden de compra al proveedor. Incluye creación de requisiciones, aprobaciones multinivel, gestión de RFQ, selección de proveedor y generación de PO."],
      ["Conciliación de facturas de 4 vías", "La conciliación de facturas de 4 vías compara una factura de proveedor con cuatro documentos: orden de compra (PO), nota de recepción de bienes (GRN), reporte de control de calidad (QC) y contrato. Cualquier discrepancia se marca antes de aprobar el pago para evitar sobrepagos, pagos insuficientes y facturas duplicadas."],
      ["Costeo de BOM (lista de materiales)", "El costeo de BOM calcula el costo total de materiales de un producto manufacturado al valorar cada componente de la lista de materiales (BOM). Es esencial para cotizar pedidos de clientes con rentabilidad. FactWise lo automatiza comparando componentes con precios aprobados de proveedores y datos históricos de compra."],
      ["Análisis de costo total puesto en destino", "El análisis de costo total puesto en destino calcula el costo real de un artículo más allá del precio unitario: flete, aranceles, manejo portuario, seguro e impuestos aplicables. Muestra el costo total de llevar los bienes a la planta y permite comparar proveedores por costo total, no solo por precio unitario."],
      ["Motor de negociación con IA", "Un motor de negociación con IA guía a compradores en negociaciones con proveedores analizando cotizaciones, detectando precios atípicos y recomendando contrapropuestas. FactWise ayuda a los equipos de compras manufactureras a lograr resultados consistentes y optimizados sin depender solo de experiencia individual."],
      ["Inquiry-to-Quote (I2Q, consulta a cotización)", "Inquiry-to-Quote (I2Q) es el flujo con el que un fabricante responde a una RFQ de cliente. Incluye recibir la consulta, costear el BOM, abastecer componentes, calcular costos totales, aplicar margen y enviar una cotización formal al cliente."],
      ["Gestión de RFQ (solicitud de cotización)", "La gestión de RFQ consiste en crear, enviar, rastrear y evaluar solicitudes de cotización enviadas a proveedores. Una RFQ especifica bienes o servicios, cantidades, fecha de entrega y términos. FactWise recopila las respuestas en formato estructurado para compararlas fácilmente."],
      ["Automatización AP (cuentas por pagar)", "La automatización AP usa software para automatizar cuentas por pagar: captura de facturas, extracción de datos, conciliación contra órdenes y recepciones, resolución de discrepancias, aprobaciones y programación de pagos. En manufactura incluye verificación basada en calidad, como la conciliación de 4 vías."],
      ["Nota de recepción de bienes (GRN)", "Una nota de recepción de bienes (GRN) es creada por almacén cuando llega mercancía de un proveedor. Registra qué se recibió, cantidad y problemas visibles. En la conciliación de 4 vías confirma que los bienes llegaron antes de aprobar el pago."],
    ]),
  },
  ja: {
    eyebrow: "調達用語集",
    title: "主要な調達用語をわかりやすく解説",
    subtitle: "ソーシングから支払いまで、請求書照合、BOM原価計算など、製造業調達で使われる用語を平易に説明します。",
    seeFeature: "FactWiseの機能を見る ->",
    ctaTitle: "これらの概念を実際の業務で見る",
    ctaText: "FactWiseは、製造業向けの1つのプラットフォームでこれらのワークフローを実践できます。",
    ctaButton: "デモを予約 ->",
    linkAriaPrefix: "定義へのリンク:",
    terms: terms([
      ["ソーシングから支払いまで (S2P)", "ソーシングから支払いまで (S2P) は、サプライヤーの特定とソーシング、RFQ発行、ベンダー見積評価、購入注文作成、入荷、ベンダー請求書の照合・確認、支払い処理までを含む調達ライフサイクル全体です。FactWiseは製造企業向けに、この全体を1つの接続されたプラットフォームで自動化します。"],
      ["購買依頼から発注まで (Req-to-PO)", "購買依頼から発注まで (Req-to-PO) は、従業員が購買依頼を起票してから、購入注文が作成されベンダーへ送付されるまでの社内調達プロセスです。購買依頼作成、多段階承認、ベンダーRFQ管理、ベンダー選定、PO生成を含みます。"],
      ["4点請求書照合", "4点請求書照合は、ベンダー請求書を購入注文 (PO)、入荷記録 (GRN)、品質検査 (QC) レポート、契約の4つの文書と照合する買掛金プロセスです。差異は支払い承認前に検出され、過払い、不足払い、重複支払いを防ぎます。"],
      ["BOM原価計算（部品表原価計算）", "BOM原価計算は、部品表 (BOM) に記載された各部品の価格を積み上げ、製造品の総材料費を計算するプロセスです。利益を確保した顧客見積には正確なBOM原価計算が不可欠です。FactWiseは承認済みベンダー価格と過去購買データに照合して自動化します。"],
      ["着地原価分析", "着地原価分析は、単価だけでなく、運賃、関税、港湾手数料、保険、適用税などを含めて購入品の総コストを計算します。製造拠点に貨物を届ける真の総コストを示し、単価だけでなく総コストでベンダー比較できます。"],
      ["AI交渉エンジン", "AI交渉エンジンは、受領見積を分析し、価格の外れ値を見つけ、反対提案を推奨することで、買い手のベンダー交渉を支援します。FactWiseは製造業の調達チームが個人経験だけに頼らず、一貫した最適な交渉結果を得られるようにします。"],
      ["問い合わせから見積まで (I2Q)", "問い合わせから見積まで (I2Q) は、製造業が顧客のRFQに対応するワークフローです。顧客問い合わせの受領、BOM原価計算、部品ソーシング、着地原価計算、利益率適用、整った顧客見積の送付を含みます。"],
      ["RFQ管理（見積依頼管理）", "RFQ管理は、ベンダーに送る見積依頼を作成、送信、追跡、評価するプロセスです。RFQには必要な品目やサービス、数量、納期、条件を記載します。FactWiseは回答を構造化形式で収集し、比較しやすくします。"],
      ["AP自動化（買掛金自動化）", "AP自動化は、請求書取り込み、データ抽出、注文・入荷との照合、差異解消、承認ルーティング、支払い予定作成などの買掛金業務をソフトウェアで自動化します。製造業では4点照合のような品質検査ベースの請求書確認も含みます。"],
      ["入荷記録 (GRN)", "入荷記録 (GRN) は、ベンダーから貨物が届いたときに倉庫チームが作成する文書です。受領品目、数量、目視で確認できる状態問題を記録します。4点請求書照合では、支払い承認前に実際の入荷を確認する文書になります。"],
    ]),
  },
  de: {
    eyebrow: "Beschaffungsglossar",
    title: "Wichtige Beschaffungsbegriffe erklärt",
    subtitle: "Klare Definitionen für Source-to-Pay, Rechnungsabgleich, Stücklistenkalkulation und weitere Begriffe der Fertigungsbeschaffung.",
    seeFeature: "FactWise-Funktion ansehen ->",
    ctaTitle: "Diese Konzepte in Aktion sehen",
    ctaText: "FactWise setzt diese Workflows in einer Plattform um, die für Hersteller gebaut ist.",
    ctaButton: "Demo buchen ->",
    linkAriaPrefix: "Link zur Definition von",
    terms: terms([
      ["Source-to-Pay (S2P)", "Source-to-Pay (S2P) ist der vollständige Beschaffungszyklus: Lieferanten finden und sourcen, RFQs ausgeben, Angebote bewerten, Bestellungen erstellen, Waren empfangen, Lieferantenrechnungen abgleichen und prüfen sowie Zahlungen verarbeiten. FactWise automatisiert diesen gesamten Zyklus in einer vernetzten Plattform für Fertigungsunternehmen."],
      ["Bedarfsanforderung bis Bestellung (Req-to-PO)", "Bedarfsanforderung bis Bestellung beschreibt den internen Prozess von der Einkaufsanforderung eines Mitarbeiters bis zur erstellten und an den Lieferanten gesendeten Bestellung. Dazu gehören Anforderungserstellung, mehrstufige Freigaben, RFQ-Management, Lieferantenauswahl und PO-Erstellung."],
      ["4-Wege-Rechnungsabgleich", "Beim 4-Wege-Rechnungsabgleich wird eine Lieferantenrechnung mit vier Dokumenten abgeglichen: Bestellung (PO), Wareneingang (GRN), Qualitätsprüfung (QC) und Vertrag. Abweichungen werden vor der Zahlungsfreigabe markiert, um Überzahlungen, Unterzahlungen und doppelte Zahlungen zu verhindern."],
      ["Stücklistenkalkulation (BOM Costing)", "Die Stücklistenkalkulation berechnet die gesamten Materialkosten eines gefertigten Produkts, indem jede Komponente der Stückliste (BOM) einzeln bepreist wird. Präzise BOM-Kalkulation ist entscheidend für profitable Kundenangebote. FactWise automatisiert dies über genehmigte Lieferantenpreise und historische Einkaufsdaten."],
      ["Einstandskostenanalyse", "Die Einstandskostenanalyse berechnet die tatsächlichen Gesamtkosten eines gekauften Artikels über den Stückpreis hinaus, einschließlich Fracht, Zöllen, Hafengebühren, Versicherung und Steuern. Sie zeigt die realen Kosten bis zum Werk und hilft, Lieferanten nach Gesamtkosten statt nur nach Stückpreis zu vergleichen."],
      ["KI-Verhandlungsengine", "Eine KI-Verhandlungsengine unterstützt Einkäufer in Lieferantenverhandlungen, indem sie eingehende Angebote analysiert, Preis-Ausreißer erkennt und Gegenpositionen empfiehlt. FactWise hilft Fertigungsteams, konsistente und optimierte Verhandlungsergebnisse zu erzielen."],
      ["Anfrage bis Angebot (I2Q)", "Anfrage bis Angebot (I2Q) ist der Workflow, mit dem ein Hersteller auf eine Kunden-RFQ reagiert. Er umfasst Eingang der Anfrage, BOM-Kalkulation, Komponentensourcing, Einstandskostenberechnung, Margenanwendung und Versand eines formatierten Kundenangebots."],
      ["RFQ-Management (Angebotsanfrage)", "RFQ-Management umfasst das Erstellen, Senden, Verfolgen und Bewerten von Angebotsanfragen an Lieferanten. Eine RFQ nennt Waren oder Leistungen, Mengen, Liefertermine und Konditionen. FactWise sammelt Antworten strukturiert für einfache Vergleiche."],
      ["AP-Automatisierung (Kreditorenautomatisierung)", "AP-Automatisierung nutzt Software für Kreditorenprozesse: Rechnungserfassung, Datenextraktion, Abgleich mit Bestellungen und Wareneingängen, Klärung von Abweichungen, Freigaben und Zahlungsplanung. In der Fertigung umfasst sie auch qualitätsprüfungsbasierte Rechnungsprüfung wie den 4-Wege-Abgleich."],
      ["Wareneingang (GRN)", "Ein Wareneingangsdokument (GRN) wird vom Lager erstellt, wenn Ware eines Lieferanten eintrifft. Es dokumentiert erhaltene Artikel, Mengen und sichtbare Mängel. Beim 4-Wege-Abgleich bestätigt der GRN den tatsächlichen Wareneingang vor Zahlungsfreigabe."],
    ]),
  },
  fr: {
    eyebrow: "Glossaire achats",
    title: "Les termes clés des achats, expliqués",
    subtitle: "Définitions simples du source-to-pay, du rapprochement des factures, du calcul de coût BOM et d'autres termes achats industriels.",
    seeFeature: "Voir la fonction FactWise ->",
    ctaTitle: "Voir ces concepts en action",
    ctaText: "FactWise applique ces workflows dans une seule plateforme conçue pour les fabricants.",
    ctaButton: "Réserver une démo ->",
    linkAriaPrefix: "Lien vers la définition de",
    terms: terms([
      ["Source-to-Pay (S2P, du sourcing au paiement)", "Le source-to-pay (S2P) couvre tout le cycle achats : identifier et sourcer les fournisseurs, émettre des RFQ, évaluer les devis, générer les bons de commande, réceptionner les biens, rapprocher et vérifier les factures fournisseurs, puis traiter les paiements. FactWise automatise ce cycle complet pour les industriels."],
      ["Demande d'achat à bon de commande (Req-to-PO)", "Ce processus interne commence lorsqu'un collaborateur crée une demande d'achat et se termine quand un bon de commande est généré et envoyé au fournisseur. Il inclut la création de demande, les validations multiniveaux, la gestion des RFQ, la sélection fournisseur et la génération de PO."],
      ["Rapprochement de facture à 4 niveaux", "Le rapprochement de facture à 4 niveaux compare une facture fournisseur avec quatre documents : bon de commande (PO), réception (GRN), rapport de contrôle qualité (QC) et contrat. Les écarts sont signalés avant validation du paiement afin d'éviter trop-payés, sous-paiements et doublons."],
      ["Calcul de coût BOM (nomenclature)", "Le calcul de coût BOM détermine le coût matière total d'un produit fabriqué en chiffrant chaque composant de la nomenclature (BOM). Il est essentiel pour établir des devis clients rentables. FactWise l'automatise avec les prix fournisseurs approuvés et l'historique d'achat."],
      ["Analyse du coût rendu", "L'analyse du coût rendu calcule le coût total d'un article au-delà du prix unitaire : transport, droits de douane, frais portuaires, assurance et taxes applicables. Elle montre le coût réel jusqu'au site du fabricant et permet de comparer les fournisseurs sur le coût total."],
      ["Moteur de négociation par IA", "Un moteur de négociation par IA guide les acheteurs dans les négociations fournisseurs en analysant les devis reçus, en détectant les prix atypiques et en recommandant des contre-propositions. FactWise aide les équipes achats industrielles à obtenir des résultats cohérents et optimisés."],
      ["Demande à devis (I2Q)", "La demande à devis (I2Q) est le workflow utilisé lorsqu'un fabricant répond à une RFQ client. Il inclut la réception de la demande, le calcul du coût BOM, le sourcing des composants, le calcul du coût rendu, l'application de la marge et l'envoi du devis client."],
      ["Gestion RFQ (demande de devis)", "La gestion RFQ consiste à créer, envoyer, suivre et évaluer les demandes de devis envoyées aux fournisseurs. Une RFQ précise les biens ou services, quantités, dates de livraison et conditions. FactWise collecte les réponses dans un format structuré pour faciliter la comparaison."],
      ["Automatisation AP (comptes fournisseurs)", "L'automatisation AP utilise le logiciel pour automatiser les comptes fournisseurs : capture des factures, extraction des données, rapprochement avec commandes et réceptions, résolution des écarts, validations et planification des paiements. Pour les industriels, elle inclut la vérification basée sur le contrôle qualité."],
      ["Bon de réception (GRN)", "Un bon de réception (GRN) est créé par l'entrepôt lorsque les marchandises d'un fournisseur arrivent. Il indique ce qui a été reçu, les quantités et les problèmes visibles. Dans le rapprochement à 4 niveaux, il confirme la réception avant paiement."],
    ]),
  },
  ko: {
    eyebrow: "조달 용어집",
    title: "핵심 조달 용어 설명",
    subtitle: "소싱부터 결제까지, 송장 매칭, BOM 원가 계산 등 제조 조달 용어를 쉽게 설명합니다.",
    seeFeature: "FactWise 기능 보기 ->",
    ctaTitle: "이 개념들이 실제로 작동하는 모습 보기",
    ctaText: "FactWise는 제조업체를 위해 구축된 하나의 플랫폼에서 이러한 워크플로를 실행합니다.",
    ctaButton: "데모 예약 ->",
    linkAriaPrefix: "정의 링크:",
    terms: terms([
      ["소싱부터 결제까지 (S2P)", "소싱부터 결제까지(S2P)는 공급업체 식별과 소싱, RFQ 발행, 공급업체 견적 평가, PO 생성, 입고, 공급업체 송장 매칭과 검증, 결제 처리까지 포함하는 전체 조달 생애주기입니다. FactWise는 제조 기업을 위해 이 전체 과정을 하나의 연결된 플랫폼에서 자동화합니다."],
      ["구매요청에서 발주까지 (Req-to-PO)", "구매요청에서 발주까지는 직원이 구매요청을 생성하는 순간부터 PO가 생성되어 공급업체에 발송되는 순간까지의 내부 조달 프로세스입니다. 구매요청 생성, 다단계 승인, 공급업체 RFQ 관리, 공급업체 선정, PO 생성을 포함합니다."],
      ["4자 송장 매칭", "4자 송장 매칭은 공급업체 송장을 네 가지 원본 문서와 대조하는 미지급금 프로세스입니다: PO, 입고 기록(GRN), 품질검사(QC) 보고서, 계약. 차이는 결제 승인 전에 표시되어 과지급, 과소지급, 중복 송장 결제를 방지합니다."],
      ["BOM 원가 계산", "BOM 원가 계산은 BOM에 포함된 각 구성품 가격을 산정해 제조 제품의 총 자재비를 계산하는 과정입니다. 정확한 BOM 원가 계산은 수익성 있는 고객 견적에 필수입니다. FactWise는 승인된 공급업체 가격과 과거 구매 데이터에 구성품을 매칭해 자동화합니다."],
      ["도착 원가 분석", "도착 원가 분석은 단가 외에도 운송비, 관세, 항만 처리비, 보험, 적용 세금을 포함해 구매품의 총비용을 계산합니다. 제조 현장까지 물품을 들여오는 실제 비용을 보여주며, 공급업체를 단가가 아닌 총비용으로 비교하게 합니다."],
      ["AI 협상 엔진", "AI 협상 엔진은 수신 견적을 분석하고 가격 이상치를 찾으며 반대 제안을 추천해 구매자가 공급업체와 협상하도록 돕습니다. FactWise는 제조 조달팀이 개인 경험에만 의존하지 않고 일관되고 최적화된 협상 결과를 얻도록 지원합니다."],
      ["문의에서 견적까지 (I2Q)", "문의에서 견적까지(I2Q)는 제조업체가 고객 RFQ에 응답하는 워크플로입니다. 고객 문의 수신, BOM 원가 계산, 구성품 소싱, 도착 원가 계산, 목표 마진 적용, 정식 고객 견적 발송을 포함합니다."],
      ["RFQ 관리(견적 요청 관리)", "RFQ 관리는 공급업체에 보내는 견적 요청을 생성, 발송, 추적, 평가하는 과정입니다. RFQ에는 필요한 제품이나 서비스, 수량, 납기, 조건이 포함됩니다. FactWise는 응답을 구조화된 형식으로 수집해 쉽게 비교하게 합니다."],
      ["AP 자동화(미지급금 자동화)", "AP 자동화는 송장 캡처, 데이터 추출, PO 및 입고와의 매칭, 차이 해결, 승인 라우팅, 결제 일정 수립 등 미지급금 업무를 소프트웨어로 자동화합니다. 제조업체의 경우 품질검사 기반 송장 검증인 4자 매칭도 포함됩니다."],
      ["입고 기록 (GRN)", "입고 기록(GRN)은 공급업체 물품이 도착했을 때 창고팀이 작성하는 문서입니다. 수령 품목, 수량, 눈에 보이는 상태 문제를 기록합니다. 4자 송장 매칭에서 GRN은 결제 승인 전에 실제 입고를 확인합니다."],
    ]),
  },
  pt: {
    eyebrow: "Glossário de compras",
    title: "Termos-chave de compras explicados",
    subtitle: "Definições claras para source-to-pay, conciliação de faturas, custeio de BOM e outros termos de compras na manufatura.",
    seeFeature: "Ver recurso da FactWise ->",
    ctaTitle: "Veja estes conceitos em ação",
    ctaText: "A FactWise coloca esses fluxos em prática em uma plataforma criada para fabricantes.",
    ctaButton: "Agendar demo ->",
    linkAriaPrefix: "Link para definição de",
    terms: terms([
      ["Source-to-Pay (S2P, da origem ao pagamento)", "Source-to-Pay (S2P) é o ciclo completo de compras: identificar e buscar fornecedores, emitir RFQs, avaliar cotações, gerar pedidos de compra, receber mercadorias, conciliar e verificar faturas de fornecedores e processar pagamentos. A FactWise automatiza esse ciclo para fabricantes em uma plataforma conectada."],
      ["Requisição ao pedido de compra (Req-to-PO)", "Requisição ao pedido de compra é o processo interno que começa quando uma pessoa cria uma requisição e termina quando o pedido de compra é gerado e enviado ao fornecedor. Inclui criação da requisição, aprovações multinível, gestão de RFQ, seleção de fornecedor e geração de PO."],
      ["Conciliação de faturas em 4 vias", "A conciliação em 4 vias compara uma fatura de fornecedor com quatro documentos: pedido de compra (PO), nota de recebimento (GRN), relatório de qualidade (QC) e contrato. Divergências são sinalizadas antes do pagamento, evitando pagamentos indevidos, insuficientes e duplicados."],
      ["Custeio de BOM (lista de materiais)", "O custeio de BOM calcula o custo total de materiais de um produto fabricado ao precificar cada componente da lista de materiais (BOM). É essencial para cotações rentáveis. A FactWise automatiza isso comparando componentes com preços aprovados de fornecedores e dados históricos de compra."],
      ["Análise de custo total de chegada", "A análise de custo total de chegada calcula o custo real de um item além do preço unitário, incluindo frete, impostos de importação, taxas portuárias, seguro e tributos aplicáveis. Ela mostra o custo total até a fábrica e permite comparar fornecedores por custo total."],
      ["Motor de negociação com IA", "Um motor de negociação com IA orienta compradores em negociações com fornecedores ao analisar cotações recebidas, identificar preços fora do padrão e recomendar contrapropostas. A FactWise ajuda equipes de compras industriais a obter resultados consistentes e otimizados."],
      ["Consulta à cotação (I2Q)", "Consulta à cotação (I2Q) é o fluxo usado quando um fabricante responde a uma RFQ de cliente. Inclui receber a consulta, custear a BOM, buscar componentes, calcular custos totais, aplicar margem e enviar uma cotação formal ao cliente."],
      ["Gestão de RFQ (solicitação de cotação)", "A gestão de RFQ envolve criar, enviar, rastrear e avaliar solicitações de cotação enviadas a fornecedores. Uma RFQ especifica bens ou serviços, quantidades, prazo de entrega e termos. A FactWise coleta respostas em formato estruturado para comparação."],
      ["Automação AP (contas a pagar)", "A automação AP usa software para automatizar contas a pagar: captura de faturas, extração de dados, conciliação com pedidos e recebimentos, resolução de divergências, aprovações e agendamento de pagamentos. Para fabricantes, inclui verificação baseada em qualidade, como conciliação em 4 vias."],
      ["Nota de recebimento de mercadorias (GRN)", "A nota de recebimento (GRN) é criada pelo armazém quando mercadorias de um fornecedor chegam. Registra o que foi recebido, quantidade e problemas visíveis. Na conciliação em 4 vias, confirma que os bens chegaram antes da aprovação do pagamento."],
    ]),
  },
  it: {
    eyebrow: "Glossario procurement",
    title: "Termini chiave del procurement, spiegati",
    subtitle: "Definizioni semplici di source-to-pay, matching fatture, costing BOM e altri termini del procurement manifatturiero.",
    seeFeature: "Vedi funzionalità FactWise ->",
    ctaTitle: "Guarda questi concetti in azione",
    ctaText: "FactWise applica questi workflow in un'unica piattaforma costruita per i produttori.",
    ctaButton: "Prenota una demo ->",
    linkAriaPrefix: "Link alla definizione di",
    terms: terms([
      ["Source-to-Pay (S2P, dal sourcing al pagamento)", "Source-to-Pay (S2P) è l'intero ciclo di procurement: identificare e reperire fornitori, emettere RFQ, valutare offerte, generare ordini di acquisto, ricevere merci, abbinare e verificare fatture fornitore e processare pagamenti. FactWise automatizza questo ciclo per aziende manifatturiere."],
      ["Richiesta d'acquisto a ordine (Req-to-PO)", "La richiesta d'acquisto a ordine è il processo interno che inizia quando un dipendente crea una requisizione e termina quando l'ordine di acquisto viene generato e inviato al fornitore. Include creazione richiesta, approvazioni multilivello, gestione RFQ, scelta fornitore e generazione PO."],
      ["Matching fatture a 4 vie", "Il matching fatture a 4 vie confronta una fattura fornitore con quattro documenti: ordine di acquisto (PO), ricezione merci (GRN), report qualità (QC) e contratto. Ogni discrepanza viene segnalata prima dell'approvazione al pagamento, evitando pagamenti errati o duplicati."],
      ["Costing BOM (distinta base)", "Il costing BOM calcola il costo materiale totale di un prodotto manifatturiero valorizzando ogni componente della distinta base (BOM). È essenziale per preventivi cliente profittevoli. FactWise lo automatizza confrontando componenti con prezzi fornitori approvati e dati storici di acquisto."],
      ["Analisi del costo landed", "L'analisi del costo landed calcola il costo totale di un articolo oltre al prezzo unitario, includendo trasporto, dazi, spese portuali, assicurazione e tasse. Mostra il vero costo fino allo stabilimento e consente di confrontare i fornitori sul costo totale."],
      ["Motore di negoziazione con IA", "Un motore di negoziazione con IA guida i buyer nelle negoziazioni con i fornitori analizzando offerte in ingresso, rilevando prezzi anomali e raccomandando controproposte. FactWise aiuta i team procurement manifatturieri a ottenere risultati coerenti e ottimizzati."],
      ["Richiesta a preventivo (I2Q)", "Richiesta a preventivo (I2Q) è il workflow con cui un produttore risponde alla RFQ di un cliente. Include ricezione della richiesta, costing BOM, sourcing componenti, calcolo del costo landed, applicazione del margine e invio del preventivo cliente."],
      ["Gestione RFQ (richiesta di offerta)", "La gestione RFQ consiste nel creare, inviare, tracciare e valutare richieste di offerta inviate ai fornitori. Una RFQ specifica beni o servizi, quantità, date di consegna e condizioni. FactWise raccoglie le risposte in formato strutturato per confrontarle."],
      ["Automazione AP (contabilità fornitori)", "L'automazione AP usa software per automatizzare la contabilità fornitori: acquisizione fatture, estrazione dati, matching con ordini e ricezioni, risoluzione discrepanze, approvazioni e pianificazione pagamenti. Per i produttori include verifiche basate sulla qualità, come il matching a 4 vie."],
      ["Ricezione merci (GRN)", "La ricezione merci (GRN) è creata dal magazzino quando arrivano merci da un fornitore. Registra cosa è stato ricevuto, quantità e problemi visibili. Nel matching a 4 vie conferma l'effettiva ricezione prima dell'approvazione al pagamento."],
    ]),
  },
  ar: {
    eyebrow: "قاموس مصطلحات المشتريات",
    title: "شرح مصطلحات المشتريات الأساسية",
    subtitle: "تعريفات واضحة لمصطلحات من التوريد إلى الدفع، مطابقة الفواتير، حساب تكلفة BOM، وغيرها من مصطلحات مشتريات التصنيع.",
    seeFeature: "اطلع على ميزة FactWise ->",
    ctaTitle: "شاهد هذه المفاهيم قيد التطبيق",
    ctaText: "يطبق FactWise هذه المسارات داخل منصة واحدة مصممة للمصنعين.",
    ctaButton: "احجز عرضا توضيحيا ->",
    linkAriaPrefix: "رابط إلى تعريف",
    terms: terms([
      ["من التوريد إلى الدفع (S2P)", "من التوريد إلى الدفع (S2P) هو دورة المشتريات الكاملة: تحديد الموردين وتوريدهم، إصدار RFQ، تقييم عروض الموردين، إنشاء أوامر الشراء، استلام البضائع، مطابقة فواتير الموردين والتحقق منها، ثم معالجة المدفوعات. يؤتمت FactWise هذه الدورة بالكامل في منصة مترابطة لشركات التصنيع."],
      ["من طلب الشراء إلى أمر الشراء (Req-to-PO)", "من طلب الشراء إلى أمر الشراء هو العملية الداخلية التي تبدأ عندما ينشئ الموظف طلب شراء وتنتهي عند إنشاء أمر شراء وإرساله إلى المورد. تشمل إنشاء الطلب، الموافقات متعددة المستويات، إدارة RFQ، اختيار المورد، وإنشاء PO."],
      ["مطابقة الفواتير رباعية الأطراف", "مطابقة الفواتير رباعية الأطراف هي عملية في الحسابات الدائنة تطابق فاتورة المورد مع أربعة مستندات: أمر الشراء (PO)، إشعار استلام البضائع (GRN)، تقرير فحص الجودة (QC)، والعقد. يتم تمييز أي اختلاف قبل اعتماد الدفع لمنع المدفوعات الزائدة أو الناقصة أو المكررة."],
      ["حساب تكلفة BOM (قائمة المواد)", "حساب تكلفة BOM هو عملية حساب إجمالي تكلفة المواد للمنتج المصنع عبر تسعير كل مكون في قائمة المواد. الدقة هنا ضرورية لتقديم عروض أسعار مربحة للعملاء. يؤتمت FactWise ذلك بمطابقة المكونات مع أسعار الموردين المعتمدة وبيانات الشراء التاريخية."],
      ["تحليل التكلفة النهائية للوصول", "يحسب تحليل التكلفة النهائية للوصول التكلفة الكاملة للعنصر المشتري بما يتجاوز سعر الوحدة، بما في ذلك الشحن والرسوم الجمركية ورسوم الموانئ والتأمين والضرائب المطبقة. يوضح التكلفة الحقيقية حتى منشأة المصنع ويساعد على مقارنة الموردين حسب التكلفة الإجمالية."],
      ["محرك التفاوض بالذكاء الاصطناعي", "يرشد محرك التفاوض بالذكاء الاصطناعي المشترين أثناء التفاوض مع الموردين عبر تحليل العروض الواردة، واكتشاف الأسعار الشاذة، واقتراح عروض مقابلة. يساعد FactWise فرق مشتريات التصنيع على تحقيق نتائج تفاوض متسقة ومحسنة."],
      ["من الاستفسار إلى عرض السعر (I2Q)", "من الاستفسار إلى عرض السعر (I2Q) هو مسار العمل الذي يستخدمه المصنع للرد على RFQ من العميل. يشمل استلام الاستفسار، حساب تكلفة BOM، توريد المكونات، حساب التكلفة النهائية للوصول، تطبيق الهامش، وإرسال عرض سعر منسق للعميل."],
      ["إدارة RFQ (طلب عرض السعر)", "إدارة RFQ هي عملية إنشاء وإرسال وتتبع وتقييم طلبات عروض الأسعار المرسلة إلى الموردين. يحدد RFQ السلع أو الخدمات المطلوبة والكميات وتاريخ التسليم والشروط. يجمع FactWise الردود بصيغة منظمة لتسهيل المقارنة."],
      ["أتمتة AP (الحسابات الدائنة)", "أتمتة AP تستخدم البرامج لأتمتة الحسابات الدائنة: التقاط الفواتير، استخراج البيانات، المطابقة مع أوامر الشراء والاستلام، حل الفروقات، مسارات الموافقة، وجدولة المدفوعات. بالنسبة للمصنعين، تشمل التحقق من الفواتير بناء على فحص الجودة مثل المطابقة رباعية الأطراف."],
      ["إشعار استلام البضائع (GRN)", "إشعار استلام البضائع (GRN) هو مستند ينشئه فريق المستودع عند وصول بضائع من المورد. يسجل ما تم استلامه والكمية وأي مشكلات ظاهرة. في مطابقة الفواتير رباعية الأطراف، يؤكد GRN استلام البضائع قبل اعتماد الدفع."],
    ]),
  },
};

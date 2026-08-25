import type { Locale } from "./i18n";

type TranslationSet = Omit<Record<Locale, string>, "en">;

const e = (
  source: string,
  zh: string,
  es: string,
  ja: string,
  de: string,
  fr: string,
  ko: string,
  pt: string,
  it: string,
  ar: string,
): [string, TranslationSet] => [source, { zh, es, ja, de, fr, ko, pt, it, ar }];

const entries: Array<[string, TranslationSet]> = [
  e("Product", "产品", "Producto", "製品", "Produkt", "Produit", "제품", "Produto", "Prodotto", "المنتج"),
  e("Suppliers", "供应商", "Proveedores", "サプライヤー", "Lieferanten", "Fournisseurs", "공급업체", "Fornecedores", "Fornitori", "الموردون"),
  e("Pricing", "定价", "Precios", "料金", "Preise", "Tarifs", "가격", "Preços", "Prezzi", "الأسعار"),
  e("Login", "登录", "Iniciar sesión", "ログイン", "Anmelden", "Connexion", "로그인", "Entrar", "Accedi", "تسجيل الدخول"),
  e("Request Demo", "申请演示", "Solicitar demo", "デモを依頼", "Demo anfragen", "Demander une démo", "데모 요청", "Solicitar demo", "Richiedi demo", "اطلب عرضا توضيحيا"),
  e("Start Now", "立即开始", "Empezar ahora", "今すぐ開始", "Jetzt starten", "Commencer", "지금 시작", "Começar agora", "Inizia ora", "ابدأ الآن"),
  e("Toggle Navigation Menu", "切换导航菜单", "Abrir o cerrar menú de navegación", "ナビゲーションメニューを切り替え", "Navigationsmenü umschalten", "Afficher ou masquer le menu", "탐색 메뉴 전환", "Alternar menu de navegação", "Attiva/disattiva menu di navigazione", "تبديل قائمة التنقل"),
  e("Resources", "资源", "Recursos", "リソース", "Ressourcen", "Ressources", "리소스", "Recursos", "Risorse", "الموارد"),
  e("Company", "公司", "Empresa", "会社", "Unternehmen", "Entreprise", "회사", "Empresa", "Azienda", "الشركة"),
  e("Legal", "法律", "Legal", "法務", "Rechtliches", "Juridique", "법률", "Jurídico", "Legale", "قانوني"),
  e("Inquiry to Quote", "询价到报价", "Consulta a cotización", "問い合わせから見積まで", "Anfrage bis Angebot", "Demande à devis", "문의에서 견적까지", "Consulta à cotação", "Richiesta a preventivo", "من الاستفسار إلى عرض السعر"),
  e("Requisitions to PO", "请购到采购订单", "Requisiciones a órdenes de compra", "購買依頼から発注まで", "Bedarfsanforderungen bis Bestellung", "Demandes d'achat à bons de commande", "구매요청에서 발주까지", "Requisições ao pedido de compra", "Richieste d'acquisto a ordine", "من طلبات الشراء إلى أوامر الشراء"),
  e("Invoice to Pay", "发票到付款", "Factura a pago", "請求書から支払いまで", "Rechnung bis Zahlung", "Facture à paiement", "송장에서 결제까지", "Fatura ao pagamento", "Fattura a pagamento", "من الفاتورة إلى الدفع"),
  e("For Suppliers", "面向供应商", "Para proveedores", "サプライヤー向け", "Für Lieferanten", "Pour les fournisseurs", "공급업체용", "Para fornecedores", "Per fornitori", "للموردين"),
  e("FAQ", "常见问题", "Preguntas frecuentes", "よくある質問", "FAQ", "FAQ", "자주 묻는 질문", "Perguntas frequentes", "FAQ", "الأسئلة الشائعة"),
  e("Glossary", "术语表", "Glosario", "用語集", "Glossar", "Glossaire", "용어집", "Glossário", "Glossario", "قاموس المصطلحات"),
  e("About Us", "关于我们", "Sobre nosotros", "会社概要", "Über uns", "À propos", "회사 소개", "Sobre nós", "Chi siamo", "من نحن"),
  e("Careers", "招聘", "Carreras", "採用情報", "Karriere", "Carrières", "채용", "Carreiras", "Carriere", "الوظائف"),
  e("Book a Demo", "预约演示", "Reservar demo", "デモを予約", "Demo buchen", "Réserver une démo", "데모 예약", "Agendar demo", "Prenota una demo", "احجز عرضا توضيحيا"),
  e("Contact", "联系", "Contacto", "お問い合わせ", "Kontakt", "Contact", "문의", "Contato", "Contatto", "تواصل"),
  e("Privacy Policy", "隐私政策", "Política de privacidad", "プライバシーポリシー", "Datenschutzrichtlinie", "Politique de confidentialité", "개인정보 처리방침", "Política de privacidade", "Informativa sulla privacy", "سياسة الخصوصية"),
  e("Terms of Service", "服务条款", "Términos del servicio", "利用規約", "Nutzungsbedingungen", "Conditions d'utilisation", "서비스 약관", "Termos de serviço", "Termini di servizio", "شروط الخدمة"),
  e("Cookie Policy", "Cookie 政策", "Política de cookies", "Cookie ポリシー", "Cookie-Richtlinie", "Politique relative aux cookies", "쿠키 정책", "Política de cookies", "Informativa sui cookie", "سياسة ملفات تعريف الارتباط"),
  e("DPDP Compliance", "DPDP 合规", "Cumplimiento DPDP", "DPDP コンプライアンス", "DPDP-Compliance", "Conformité DPDP", "DPDP 컴플라이언스", "Conformidade DPDP", "Conformità DPDP", "امتثال DPDP"),
  e("Cookie Settings", "Cookie 设置", "Configuración de cookies", "Cookie 設定", "Cookie-Einstellungen", "Paramètres des cookies", "쿠키 설정", "Configurações de cookies", "Impostazioni cookie", "إعدادات ملفات تعريف الارتباط"),
  e("Email", "电子邮件", "Correo electrónico", "メール", "E-Mail", "E-mail", "이메일", "E-mail", "Email", "البريد الإلكتروني"),
  e("Source-to-pay procurement intelligence for manufacturing enterprises.", "面向制造企业的寻源到付款采购智能。", "Inteligencia de compras de abastecimiento a pago para empresas manufactureras.", "製造業向けのソーシングから支払いまでの調達インテリジェンス。", "Source-to-Pay-Beschaffungsintelligenz für Fertigungsunternehmen.", "Intelligence achats du sourcing au paiement pour les entreprises industrielles.", "제조 기업을 위한 소싱부터 결제까지의 조달 인텔리전스.", "Inteligência de compras da origem ao pagamento para empresas de manufatura.", "Intelligence procurement dal sourcing al pagamento per imprese manifatturiere.", "ذكاء مشتريات من التوريد إلى الدفع للمؤسسات التصنيعية."),
  e("All rights reserved.", "保留所有权利。", "Todos los derechos reservados.", "無断転載を禁じます。", "Alle Rechte vorbehalten.", "Tous droits réservés.", "모든 권리 보유.", "Todos os direitos reservados.", "Tutti i diritti riservati.", "جميع الحقوق محفوظة."),
];

export const footerExtraTextMap: Record<Locale, Record<string, string>> = {
  en: Object.fromEntries(entries.map(([source]) => [source, source])),
  zh: Object.fromEntries(entries.map(([source, translations]) => [source, translations.zh])),
  es: Object.fromEntries(entries.map(([source, translations]) => [source, translations.es])),
  ja: Object.fromEntries(entries.map(([source, translations]) => [source, translations.ja])),
  de: Object.fromEntries(entries.map(([source, translations]) => [source, translations.de])),
  fr: Object.fromEntries(entries.map(([source, translations]) => [source, translations.fr])),
  ko: Object.fromEntries(entries.map(([source, translations]) => [source, translations.ko])),
  pt: Object.fromEntries(entries.map(([source, translations]) => [source, translations.pt])),
  it: Object.fromEntries(entries.map(([source, translations]) => [source, translations.it])),
  ar: Object.fromEntries(entries.map(([source, translations]) => [source, translations.ar])),
};

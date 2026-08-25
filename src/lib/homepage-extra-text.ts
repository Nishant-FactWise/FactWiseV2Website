import type { Locale } from "./i18n";

type TranslationSet = Omit<Record<Locale, string>, "en">;

const entries: Array<[string, TranslationSet]> = [
  [
    "HOW WE DO IT",
    { zh: "我们如何实现", es: "CÓMO LO HACEMOS", ja: "実現方法", de: "SO FUNKTIONIERT ES", fr: "COMMENT ÇA MARCHE", ko: "작동 방식", pt: "COMO FAZEMOS", it: "COME FUNZIONA", ar: "كيف ننجز ذلك" },
  ],
  [
    "Stop Adapting to Your Software.",
    { zh: "不要再迁就软件。", es: "Deje de adaptarse a su software.", ja: "ソフトウェアに合わせるのはもう終わりです。", de: "Passen Sie sich nicht länger Ihrer Software an.", fr: "Arrêtez de vous adapter à votre logiciel.", ko: "소프트웨어에 맞추는 일을 멈추세요.", pt: "Pare de se adaptar ao seu software.", it: "Smetti di adattarti al tuo software.", ar: "توقف عن التكيف مع برنامجك." },
  ],
  [
    "It Should Adapt to You.",
    { zh: "它应该适应您。", es: "Debe adaptarse a usted.", ja: "ソフトウェアがあなたに合わせるべきです。", de: "Sie sollte sich an Sie anpassen.", fr: "Il doit s'adapter à vous.", ko: "소프트웨어가 당신에게 맞춰져야 합니다.", pt: "Ele deve se adaptar a você.", it: "Dovrebbe adattarsi a te.", ar: "يجب أن يتكيف هو معك." },
  ],
  [
    "Configure Anything",
    { zh: "配置任何流程", es: "Configure cualquier cosa", ja: "あらゆる設定に対応", de: "Alles konfigurieren", fr: "Configurez tout", ko: "무엇이든 구성", pt: "Configure qualquer coisa", it: "Configura qualsiasi cosa", ar: "اضبط أي شيء" },
  ],
  [
    "Configure approval chains, custom fields, cost formulas, and event templates independently without writing code or waiting on IT. FactWise bends to how you run your business, giving your team full control of every workflow from day one.",
    { zh: "无需写代码或等待 IT，即可独立配置审批链、自定义字段、成本公式和事件模板。FactWise 会适应您的业务运行方式，让团队从第一天起就完全掌控每个工作流。", es: "Configure cadenas de aprobación, campos personalizados, fórmulas de coste y plantillas de eventos sin escribir código ni esperar a TI. FactWise se adapta a su forma de operar y da a su equipo control total de cada flujo desde el primer día.", ja: "コードを書いたり IT を待ったりせずに、承認チェーン、カスタム項目、コスト計算式、イベントテンプレートを自由に設定できます。FactWise は業務の進め方に合わせて変化し、初日からすべてのワークフローを管理できます。", de: "Konfigurieren Sie Genehmigungsketten, benutzerdefinierte Felder, Kostenformeln und Event-Vorlagen selbstständig, ohne Code oder IT-Wartezeit. FactWise passt sich Ihrer Arbeitsweise an und gibt Ihrem Team vom ersten Tag an volle Kontrolle über jeden Workflow.", fr: "Configurez vos chaînes d'approbation, champs personnalisés, formules de coût et modèles d'événements sans écrire de code ni attendre l'IT. FactWise s'adapte à votre façon de travailler et donne à votre équipe le contrôle complet de chaque workflow dès le premier jour.", ko: "코드를 작성하거나 IT를 기다리지 않고 승인 체계, 사용자 지정 필드, 비용 공식, 이벤트 템플릿을 직접 구성하세요. FactWise는 비즈니스 운영 방식에 맞춰지고 첫날부터 모든 워크플로를 완전히 제어할 수 있게 합니다.", pt: "Configure cadeias de aprovação, campos personalizados, fórmulas de custo e modelos de eventos sem código e sem depender de TI. O FactWise se adapta à forma como sua empresa opera e dá à equipe controle total de cada fluxo desde o primeiro dia.", it: "Configura catene di approvazione, campi personalizzati, formule di costo e template evento senza scrivere codice o aspettare l'IT. FactWise si adatta al tuo modo di lavorare e dà al team pieno controllo di ogni workflow dal primo giorno.", ar: "اضبط سلاسل الموافقة والحقول المخصصة ومعادلات التكلفة وقوالب الأحداث بشكل مستقل، دون كتابة كود أو انتظار فريق تقنية المعلومات. يتكيف FactWise مع طريقة إدارة أعمالك ويمنح فريقك تحكما كاملا في كل سير عمل من اليوم الأول." },
  ],
  [
    "Your Business. Your Rules. No IT Required.",
    { zh: "您的业务，您的规则，无需 IT。", es: "Su negocio. Sus reglas. Sin depender de TI.", ja: "ビジネスに合わせたルールを、IT なしで。", de: "Ihr Geschäft. Ihre Regeln. Keine IT erforderlich.", fr: "Votre entreprise. Vos règles. Sans IT.", ko: "당신의 비즈니스, 당신의 규칙, IT 없이.", pt: "Seu negócio. Suas regras. Sem TI.", it: "Il tuo business. Le tue regole. Senza IT.", ar: "أعمالك. قواعدك. بلا حاجة إلى تقنية المعلومات." },
  ],
  [
    "Scale Effortlessly",
    { zh: "轻松扩展", es: "Escale sin esfuerzo", ja: "無理なく拡張", de: "Mühelos skalieren", fr: "Passez à l'échelle sans effort", ko: "손쉽게 확장", pt: "Escale sem esforço", it: "Scala senza sforzo", ar: "توسع بسهولة" },
  ],
  [
    "AI Powered Analytics",
    { zh: "AI 驱动分析", es: "Analítica impulsada por IA", ja: "AI 搭載分析", de: "KI-gestützte Analysen", fr: "Analytique pilotée par l'IA", ko: "AI 기반 분석", pt: "Análises com IA", it: "Analytics con IA", ar: "تحليلات مدعومة بالذكاء الاصطناعي" },
  ],
  [
    "Collaborate Seamlessly",
    { zh: "无缝协作", es: "Colabore sin fricción", ja: "シームレスに連携", de: "Nahtlos zusammenarbeiten", fr: "Collaborez sans friction", ko: "매끄럽게 협업", pt: "Colabore sem atrito", it: "Collabora senza attriti", ar: "تعاون بسلاسة" },
  ],
  [
    "Factwise has significantly improved procurement digitalization and automated quotation processes, enabling faster workflows, enhanced transparency, and data-driven decision-making. We like the platform's efficiency, seamless integration, and actionable insights.",
    {
      zh: "FactWise 显著提升了采购数字化和报价流程自动化，让流程更快、透明度更高，并支持数据驱动决策。我们很认可这个平台的效率、无缝集成和可执行洞察。",
      es: "FactWise ha mejorado significativamente la digitalización de compras y los procesos automatizados de cotización, permitiendo flujos más rápidos, mayor transparencia y decisiones basadas en datos. Valoramos la eficiencia de la plataforma, su integración fluida y sus insights accionables.",
      ja: "FactWise は調達のデジタル化と見積プロセスの自動化を大きく改善し、より速いワークフロー、高い透明性、データに基づく意思決定を実現しました。プラットフォームの効率性、シームレスな連携、実用的なインサイトを高く評価しています。",
      de: "FactWise hat die Digitalisierung der Beschaffung und automatisierte Angebotsprozesse deutlich verbessert. Workflows laufen schneller, Transparenz steigt und Entscheidungen werden datenbasiert. Wir schätzen die Effizienz, nahtlose Integration und umsetzbaren Erkenntnisse der Plattform.",
      fr: "FactWise a nettement amélioré la digitalisation des achats et l'automatisation des devis, avec des flux plus rapides, plus de transparence et des décisions fondées sur les données. Nous apprécions l'efficacité de la plateforme, son intégration fluide et ses insights actionnables.",
      ko: "FactWise는 조달 디지털화와 견적 자동화 프로세스를 크게 개선하여 더 빠른 워크플로, 높은 투명성, 데이터 기반 의사결정을 가능하게 했습니다. 플랫폼의 효율성, 원활한 통합, 실행 가능한 인사이트가 인상적입니다.",
      pt: "A FactWise melhorou significativamente a digitalização de compras e os processos automatizados de cotação, permitindo fluxos mais rápidos, maior transparência e decisões orientadas por dados. Valorizamos a eficiência, a integração fluida e os insights acionáveis da plataforma.",
      it: "FactWise ha migliorato in modo significativo la digitalizzazione degli acquisti e l'automazione dei preventivi, abilitando flussi più rapidi, maggiore trasparenza e decisioni basate sui dati. Apprezziamo l'efficienza della piattaforma, l'integrazione fluida e gli insight azionabili.",
      ar: "حسّنت FactWise رقمنة المشتريات وعمليات عروض الأسعار الآلية بشكل كبير، مما أتاح سير عمل أسرع وشفافية أعلى وقرارات قائمة على البيانات. نقدر كفاءة المنصة وتكاملها السلس ورؤاها القابلة للتنفيذ.",
    },
  ],
  [
    "The Factwise app is a great consolidation of features that provides the ability to send RFx's, assess pricing, allocation, PO & AP processing, etc. all in one app. It's an extremely efficient way to manage the materials buying process.",
    {
      zh: "FactWise 应用很好地整合了多项功能，可在一个应用中发送 RFx、评估价格、分配业务、处理 PO 与 AP 等。这是一种极高效的物料采购管理方式。",
      es: "La aplicación de FactWise reúne muy bien funciones para enviar RFx, evaluar precios, asignar compras y gestionar PO y AP, todo en una sola herramienta. Es una forma extremadamente eficiente de gestionar la compra de materiales.",
      ja: "FactWise アプリは、RFx 送信、価格評価、割当、PO と AP 処理などを 1 つに統合しています。資材購買プロセスを管理する非常に効率的な方法です。",
      de: "Die FactWise App bündelt Funktionen wie RFx-Versand, Preisbewertung, Zuteilung sowie PO- und AP-Verarbeitung in einer Anwendung. Das ist ein äußerst effizienter Weg, den Materialeinkauf zu steuern.",
      fr: "L'application FactWise regroupe efficacement l'envoi de RFx, l'évaluation des prix, l'allocation, le traitement des PO et des AP, entre autres, dans une seule application. C'est une manière extrêmement efficace de gérer les achats de matières.",
      ko: "FactWise 앱은 RFx 발송, 가격 평가, 배정, PO 및 AP 처리 등을 하나의 앱에서 제공하는 훌륭한 통합 플랫폼입니다. 자재 구매 프로세스를 관리하는 매우 효율적인 방법입니다.",
      pt: "O aplicativo FactWise consolida muito bem recursos para enviar RFx, avaliar preços, alocar compras e processar PO e AP, tudo em um só lugar. É uma forma extremamente eficiente de gerenciar a compra de materiais.",
      it: "L'app FactWise consolida in modo efficace funzionalità per inviare RFx, valutare prezzi, gestire allocazioni e processare PO e AP in un'unica applicazione. È un modo estremamente efficiente per gestire l'acquisto dei materiali.",
      ar: "يجمع تطبيق FactWise بشكل ممتاز ميزات إرسال RFx وتقييم الأسعار والتخصيص ومعالجة PO و AP وغيرها في تطبيق واحد. إنها طريقة عالية الكفاءة لإدارة عملية شراء المواد.",
    },
  ],
  [
    "Factwise streamlines sourcing processes by automating non-value-adding activities, boosting efficiency and productivity. Their customizable GUI and dashboards empower users with tailored insights for smarter decision-making.",
    {
      zh: "FactWise 通过自动化非增值活动来简化寻源流程，提升效率和生产力。其可定制界面和仪表板为用户提供定制洞察，帮助更明智地决策。",
      es: "FactWise simplifica los procesos de abastecimiento al automatizar actividades sin valor añadido, aumentando la eficiencia y la productividad. Su interfaz y dashboards configurables ofrecen insights adaptados para tomar mejores decisiones.",
      ja: "FactWise は付加価値の低い作業を自動化し、ソーシングプロセスを効率化して生産性を高めます。カスタマイズ可能な GUI とダッシュボードにより、より賢い意思決定に必要な洞察を得られます。",
      de: "FactWise optimiert Sourcing-Prozesse, indem nicht wertschöpfende Tätigkeiten automatisiert werden. Das steigert Effizienz und Produktivität. Die anpassbare Oberfläche und Dashboards liefern passgenaue Erkenntnisse für bessere Entscheidungen.",
      fr: "FactWise simplifie les processus de sourcing en automatisant les activités sans valeur ajoutée, ce qui améliore l'efficacité et la productivité. Son interface et ses tableaux de bord personnalisables donnent des insights adaptés pour de meilleures décisions.",
      ko: "FactWise는 부가가치가 낮은 활동을 자동화해 소싱 프로세스를 간소화하고 효율성과 생산성을 높입니다. 맞춤형 GUI와 대시보드는 더 나은 의사결정을 위한 맞춤 인사이트를 제공합니다.",
      pt: "A FactWise simplifica os processos de sourcing ao automatizar atividades sem valor agregado, aumentando eficiência e produtividade. Sua interface e dashboards personalizáveis oferecem insights sob medida para decisões mais inteligentes.",
      it: "FactWise semplifica i processi di sourcing automatizzando le attività a basso valore aggiunto, aumentando efficienza e produttività. GUI e dashboard personalizzabili offrono insight su misura per decisioni più intelligenti.",
      ar: "تسهّل FactWise عمليات التوريد عبر أتمتة الأنشطة غير المضافة للقيمة، مما يعزز الكفاءة والإنتاجية. وتمكّن الواجهة ولوحات المعلومات القابلة للتخصيص المستخدمين برؤى مخصصة لاتخاذ قرارات أذكى.",
    },
  ],
  [
    "Our manufacturing company uses the traditional standard ERP system. With Factwise integrating with our ERP, our purchasing has become informed, organized, and effortless. The intuitive and sleek UI was a standout feature.",
    {
      zh: "我们的制造企业使用传统标准 ERP 系统。FactWise 与我们的 ERP 集成后，采购变得更有依据、更有组织，也更省力。直观而简洁的界面是一大亮点。",
      es: "Nuestra empresa manufacturera usa un ERP tradicional. Al integrar FactWise con nuestro ERP, las compras se volvieron más informadas, organizadas y sencillas. La interfaz intuitiva y pulida fue un gran diferenciador.",
      ja: "当社の製造業務では従来型の標準 ERP を使っています。FactWise が ERP と連携したことで、購買はより情報に基づき、整理され、手間なく進められるようになりました。直感的で洗練された UI も際立っています。",
      de: "Unser Fertigungsunternehmen nutzt ein klassisches ERP-System. Durch die Integration von FactWise in unser ERP ist der Einkauf informierter, organisierter und einfacher geworden. Die intuitive, klare Oberfläche sticht besonders hervor.",
      fr: "Notre entreprise industrielle utilise un ERP traditionnel. Avec l'intégration de FactWise à notre ERP, nos achats sont devenus mieux informés, mieux organisés et plus simples. L'interface intuitive et élégante est un vrai point fort.",
      ko: "우리 제조 회사는 전통적인 표준 ERP 시스템을 사용합니다. FactWise가 ERP와 통합되면서 구매 업무가 더 체계적이고 정보 기반으로, 훨씬 수월해졌습니다. 직관적이고 세련된 UI가 특히 돋보였습니다.",
      pt: "Nossa empresa de manufatura usa um ERP tradicional. Com a integração da FactWise ao nosso ERP, nossas compras ficaram mais informadas, organizadas e simples. A interface intuitiva e elegante foi um grande destaque.",
      it: "La nostra azienda manifatturiera usa un ERP tradizionale. Integrando FactWise con l'ERP, gli acquisti sono diventati più informati, organizzati e semplici. L'interfaccia intuitiva ed elegante è stata un elemento distintivo.",
      ar: "تستخدم شركتنا التصنيعية نظام ERP تقليديًا. ومع تكامل FactWise مع نظام ERP لدينا، أصبحت عمليات الشراء أكثر تنظيمًا واستنادًا إلى المعلومات وأسهل تنفيذًا. وكانت الواجهة البديهية والأنيقة ميزة بارزة.",
    },
  ],
  [
    "FactWise excels in analytics — their AI innovation transforms analysis into a user-friendly experience. Breaking free from old formats, we've minimized Excel dependency, witnessing a data-driven revolution.",
    {
      zh: "FactWise 在分析方面表现出色，其 AI 创新把分析转化为友好的使用体验。我们摆脱了旧格式，减少了对 Excel 的依赖，见证了数据驱动的变革。",
      es: "FactWise sobresale en analítica: su innovación con IA convierte el análisis en una experiencia fácil de usar. Al dejar atrás formatos antiguos, redujimos la dependencia de Excel y vimos una transformación impulsada por datos.",
      ja: "FactWise は分析機能に優れており、AI の革新によって分析が使いやすい体験に変わります。従来の形式から脱却し、Excel 依存を減らし、データドリブンな変革を実感しました。",
      de: "FactWise überzeugt in der Analytik: Die KI-Innovation macht Analysen nutzerfreundlich. Durch den Abschied von alten Formaten haben wir die Excel-Abhängigkeit reduziert und eine datengetriebene Veränderung erlebt.",
      fr: "FactWise excelle en analytique : son innovation IA transforme l'analyse en une expérience conviviale. En sortant des anciens formats, nous avons réduit notre dépendance à Excel et constaté une révolution pilotée par les données.",
      ko: "FactWise는 분석 역량이 뛰어나며, AI 혁신으로 분석을 사용자 친화적인 경험으로 바꿉니다. 기존 형식에서 벗어나 Excel 의존도를 줄였고 데이터 기반 혁신을 경험했습니다.",
      pt: "A FactWise se destaca em analytics: sua inovação em IA transforma a análise em uma experiência fácil de usar. Ao abandonar formatos antigos, reduzimos a dependência do Excel e vivenciamos uma transformação orientada por dados.",
      it: "FactWise eccelle nell'analisi: la sua innovazione IA trasforma l'analisi in un'esperienza facile da usare. Superando i vecchi formati, abbiamo ridotto la dipendenza da Excel e visto una trasformazione guidata dai dati.",
      ar: "تتميّز FactWise في التحليلات؛ فابتكارها في الذكاء الاصطناعي يحوّل التحليل إلى تجربة سهلة الاستخدام. ومن خلال الابتعاد عن الصيغ القديمة، قلّلنا الاعتماد على Excel وشهدنا تحولًا قائمًا على البيانات.",
    },
  ],
  [
    "FactWise has enabled us to make data-driven decisions in procurement. This has increased the efficiency and compliance in the team and more importantly led to cost savings which is extremely important.",
    {
      zh: "FactWise 让我们能够在采购中做出数据驱动的决策。这提高了团队效率和合规性，更重要的是带来了非常关键的成本节省。",
      es: "FactWise nos ha permitido tomar decisiones de compras basadas en datos. Esto aumentó la eficiencia y el cumplimiento del equipo y, más importante aún, generó ahorros de costos muy relevantes.",
      ja: "FactWise により、調達でデータに基づく意思決定ができるようになりました。チームの効率とコンプライアンスが向上し、さらに重要なコスト削減にもつながっています。",
      de: "FactWise ermöglicht uns datenbasierte Entscheidungen in der Beschaffung. Dadurch sind Effizienz und Compliance im Team gestiegen und, noch wichtiger, es wurden erhebliche Kosteneinsparungen erzielt.",
      fr: "FactWise nous a permis de prendre des décisions achats fondées sur les données. Cela a amélioré l'efficacité et la conformité de l'équipe et, surtout, généré des économies de coûts très importantes.",
      ko: "FactWise 덕분에 조달에서 데이터 기반 의사결정을 할 수 있게 되었습니다. 팀의 효율성과 컴플라이언스가 높아졌고, 더 중요하게는 매우 중요한 비용 절감으로 이어졌습니다.",
      pt: "A FactWise nos permitiu tomar decisões de compras orientadas por dados. Isso aumentou a eficiência e a conformidade da equipe e, mais importante, gerou economias de custo extremamente relevantes.",
      it: "FactWise ci ha permesso di prendere decisioni di procurement basate sui dati. Questo ha aumentato efficienza e conformità del team e, soprattutto, ha portato risparmi sui costi molto importanti.",
      ar: "مكّنتنا FactWise من اتخاذ قرارات مشتريات قائمة على البيانات. وقد زاد ذلك كفاءة الفريق وامتثاله، والأهم أنه أدى إلى وفورات في التكلفة ذات أهمية كبيرة.",
    },
  ],
  [
    "FactWise streamlined our quoting process, replacing manual tasks with efficient vendor and client interactions. Customizable and adaptable, it tailored to our complex workflow perfectly.",
    {
      zh: "FactWise 简化了我们的报价流程，用高效的供应商和客户互动取代了手工任务。它可定制、适应性强，完美贴合我们的复杂工作流。",
      es: "FactWise simplificó nuestro proceso de cotización, reemplazando tareas manuales por interacciones eficientes con proveedores y clientes. Configurable y adaptable, se ajustó perfectamente a nuestro flujo complejo.",
      ja: "FactWise は当社の見積プロセスを効率化し、手作業を効率的なベンダー・顧客対応に置き換えました。カスタマイズ性と適応性が高く、複雑なワークフローにぴったり合いました。",
      de: "FactWise hat unseren Angebotsprozess gestrafft und manuelle Aufgaben durch effiziente Interaktionen mit Lieferanten und Kunden ersetzt. Anpassbar und flexibel passte es perfekt zu unserem komplexen Workflow.",
      fr: "FactWise a simplifié notre processus de devis en remplaçant les tâches manuelles par des interactions efficaces avec les fournisseurs et les clients. Personnalisable et adaptable, la solution s'est parfaitement ajustée à notre workflow complexe.",
      ko: "FactWise는 수작업을 효율적인 공급업체 및 고객 상호작용으로 대체하여 견적 프로세스를 간소화했습니다. 맞춤화와 적응성이 뛰어나 복잡한 워크플로에 완벽하게 맞았습니다.",
      pt: "A FactWise simplificou nosso processo de cotação, substituindo tarefas manuais por interações eficientes com fornecedores e clientes. Personalizável e adaptável, ajustou-se perfeitamente ao nosso fluxo complexo.",
      it: "FactWise ha semplificato il nostro processo di preventivazione, sostituendo attività manuali con interazioni efficienti con fornitori e clienti. Personalizzabile e adattabile, si è adattata perfettamente al nostro workflow complesso.",
      ar: "بسّطت FactWise عملية إعداد عروض الأسعار لدينا، واستبدلت المهام اليدوية بتفاعلات فعالة مع الموردين والعملاء. وبفضل قابليتها للتخصيص والتكيف، ناسبت سير عملنا المعقد بدقة.",
    },
  ],
  [
    "FactWise has done a great job at understanding the users. The thoughtfulness in the way it is created is impressive. Even the smallest details have been thought of to make sure the user experience is excellent.",
    {
      zh: "FactWise 非常懂用户。产品设计中的用心令人印象深刻，连最小的细节都被考虑到，以确保出色的用户体验。",
      es: "FactWise ha hecho un gran trabajo entendiendo a los usuarios. La atención con la que está creado es impresionante. Incluso los detalles más pequeños están pensados para asegurar una experiencia excelente.",
      ja: "FactWise はユーザー理解に非常に優れています。作り込みの細やかさが印象的で、優れたユーザー体験を実現するために細部まで配慮されています。",
      de: "FactWise versteht die Nutzer sehr gut. Die Sorgfalt in der Umsetzung ist beeindruckend. Selbst kleinste Details wurden bedacht, um eine hervorragende Nutzererfahrung sicherzustellen.",
      fr: "FactWise a fait un excellent travail de compréhension des utilisateurs. La réflexion portée à sa conception est impressionnante. Même les plus petits détails ont été pensés pour garantir une excellente expérience utilisateur.",
      ko: "FactWise는 사용자를 이해하는 데 매우 뛰어납니다. 제품이 만들어진 방식의 세심함이 인상적입니다. 뛰어난 사용자 경험을 위해 아주 작은 세부사항까지 고려되었습니다.",
      pt: "A FactWise fez um excelente trabalho ao entender os usuários. O cuidado na forma como foi criada impressiona. Até os menores detalhes foram pensados para garantir uma ótima experiência do usuário.",
      it: "FactWise ha fatto un ottimo lavoro nel comprendere gli utenti. La cura con cui è stata realizzata è notevole. Anche i minimi dettagli sono stati pensati per garantire un'esperienza utente eccellente.",
      ar: "قامت FactWise بعمل ممتاز في فهم المستخدمين. العناية في طريقة بناء المنتج مثيرة للإعجاب، حتى أصغر التفاصيل تم التفكير فيها لضمان تجربة مستخدم ممتازة.",
    },
  ],
  [
    "Amkette sought an automated solution for their complex sourcing operation, focusing on procurement and vendor analytics. Initially designed for manufacturing, Factwise adapted swiftly.",
    {
      zh: "Amkette 需要一个自动化方案来处理复杂的寻源运营，重点关注采购和供应商分析。FactWise 最初面向制造业设计，但很快适配了他们的需求。",
      es: "Amkette buscaba una solución automatizada para su compleja operación de sourcing, centrada en compras y analítica de proveedores. Diseñada inicialmente para manufactura, FactWise se adaptó rápidamente.",
      ja: "Amkette は、調達とベンダー分析に重点を置いた複雑なソーシング業務向けの自動化ソリューションを求めていました。製造業向けに設計された FactWise は、すばやく適応しました。",
      de: "Amkette suchte eine automatisierte Lösung für komplexe Sourcing-Abläufe mit Fokus auf Beschaffung und Lieferantenanalytik. Ursprünglich für die Fertigung entwickelt, passte sich FactWise schnell an.",
      fr: "Amkette recherchait une solution automatisée pour une opération de sourcing complexe, centrée sur les achats et l'analyse fournisseurs. Initialement conçu pour l'industrie, FactWise s'est adapté rapidement.",
      ko: "Amkette는 조달과 공급업체 분석에 초점을 둔 복잡한 소싱 운영을 위한 자동화 솔루션을 찾고 있었습니다. 제조업을 위해 설계된 FactWise는 빠르게 적응했습니다.",
      pt: "A Amkette buscava uma solução automatizada para sua operação complexa de sourcing, com foco em compras e analytics de fornecedores. Projetada inicialmente para manufatura, a FactWise se adaptou rapidamente.",
      it: "Amkette cercava una soluzione automatizzata per la sua complessa attività di sourcing, con focus su procurement e analisi fornitori. Progettata inizialmente per la manifattura, FactWise si è adattata rapidamente.",
      ar: "كانت Amkette تبحث عن حل آلي لعملية توريد معقدة تركز على المشتريات وتحليلات الموردين. ورغم أن FactWise صُممت في البداية للتصنيع، فقد تكيفت بسرعة.",
    },
  ],
  [
    "Chief Procurement Officer",
    { zh: "首席采购官", es: "Director de Compras", ja: "最高調達責任者", de: "Chief Procurement Officer", fr: "Directeur des achats", ko: "최고조달책임자", pt: "Diretor de Compras", it: "Chief Procurement Officer", ar: "الرئيس التنفيذي للمشتريات" },
  ],
  [
    "VP of Procurement",
    { zh: "采购副总裁", es: "VP de Compras", ja: "調達担当副社長", de: "VP Beschaffung", fr: "VP Achats", ko: "조달 부사장", pt: "VP de Compras", it: "VP Procurement", ar: "نائب رئيس المشتريات" },
  ],
  [
    "Vice President",
    { zh: "副总裁", es: "Vicepresidente", ja: "副社長", de: "Vice President", fr: "Vice-président", ko: "부사장", pt: "Vice-presidente", it: "Vicepresidente", ar: "نائب الرئيس" },
  ],
  [
    "Co-owner",
    { zh: "共同所有人", es: "Copropietario", ja: "共同オーナー", de: "Miteigentümer", fr: "Copropriétaire", ko: "공동 소유자", pt: "Coproprietário", it: "Comproprietario", ar: "شريك مالك" },
  ],
  [
    "Sr. Director of Procurement",
    { zh: "高级采购总监", es: "Director sénior de Compras", ja: "調達シニアディレクター", de: "Senior Director Beschaffung", fr: "Directeur senior des achats", ko: "조달 수석 디렉터", pt: "Diretor sênior de Compras", it: "Direttore senior Procurement", ar: "مدير أول للمشتريات" },
  ],
  [
    "Enterprise IT Strategies, BPT",
    { zh: "企业 IT 战略，BPT", es: "Estrategias de TI empresarial, BPT", ja: "エンタープライズ IT 戦略、BPT", de: "Enterprise-IT-Strategien, BPT", fr: "Stratégies IT d'entreprise, BPT", ko: "엔터프라이즈 IT 전략, BPT", pt: "Estratégias de TI empresarial, BPT", it: "Strategie IT enterprise, BPT", ar: "استراتيجيات تقنية المعلومات المؤسسية، BPT" },
  ],
  [
    "From BOM to customer quote in record time — intelligent sourcing, automated negotiations, and true landed-cost analytics.",
    {
      zh: "从 BOM 到客户报价，速度创纪录：智能寻源、自动化谈判和真实到岸成本分析。",
      es: "Del BOM al presupuesto para el cliente en tiempo récord: sourcing inteligente, negociaciones automatizadas y análisis real del costo puesto en destino.",
      ja: "BOM から顧客見積までを記録的な速さで。インテリジェントなソーシング、自動交渉、正確な landed cost 分析を実現します。",
      de: "Von der BOM bis zum Kundenangebot in Rekordzeit: intelligentes Sourcing, automatisierte Verhandlungen und echte Landed-Cost-Analysen.",
      fr: "Du BOM au devis client en un temps record : sourcing intelligent, négociations automatisées et analyse réelle du coût rendu.",
      ko: "BOM에서 고객 견적까지 기록적인 속도로: 지능형 소싱, 자동 협상, 실제 landed cost 분석을 제공합니다.",
      pt: "Do BOM à cotação do cliente em tempo recorde: sourcing inteligente, negociações automatizadas e análise real de custo landed.",
      it: "Dal BOM al preventivo cliente in tempi record: sourcing intelligente, negoziazioni automatizzate e analisi reale del landed cost.",
      ar: "من BOM إلى عرض سعر العميل في وقت قياسي: توريد ذكي، مفاوضات آلية، وتحليلات دقيقة للتكلفة landed cost.",
    },
  ],
  [
    "BOM & cost intelligence",
    { zh: "BOM 与成本智能", es: "Inteligencia de BOM y costos", ja: "BOM とコストインテリジェンス", de: "BOM- und Kostenintelligenz", fr: "Intelligence BOM et coûts", ko: "BOM 및 비용 인텔리전스", pt: "Inteligência de BOM e custos", it: "Intelligence su BOM e costi", ar: "ذكاء BOM والتكاليف" },
  ],
  [
    "Automated vendor sourcing & negotiations",
    { zh: "自动化供应商寻源与谈判", es: "Sourcing y negociaciones con proveedores automatizados", ja: "ベンダーソーシングと交渉の自動化", de: "Automatisiertes Lieferanten-Sourcing und Verhandlungen", fr: "Sourcing fournisseurs et négociations automatisés", ko: "자동화된 공급업체 소싱 및 협상", pt: "Sourcing e negociações automatizadas com fornecedores", it: "Sourcing fornitori e negoziazioni automatizzate", ar: "توريد الموردين والتفاوض معهم آليًا" },
  ],
  [
    "One-click customer quote generation",
    { zh: "一键生成客户报价", es: "Generación de cotizaciones para clientes en un clic", ja: "ワンクリックで顧客見積を生成", de: "Kundenangebot mit einem Klick erstellen", fr: "Génération de devis client en un clic", ko: "원클릭 고객 견적 생성", pt: "Geração de cotação ao cliente com um clique", it: "Generazione preventivo cliente con un clic", ar: "إنشاء عرض سعر للعميل بنقرة واحدة" },
  ],
  [
    "Raise, approve, source, and issue purchase orders in one seamless flow — without the back and forth.",
    {
      zh: "在一个顺畅流程中提交、审批、寻源并发布采购订单，避免反复沟通。",
      es: "Crea, aprueba, abastece y emite órdenes de compra en un flujo continuo, sin idas y vueltas.",
      ja: "購買依頼、承認、ソーシング、発注を 1 つのスムーズな流れで実行し、やり取りの往復をなくします。",
      de: "Anfordern, freigeben, sourcen und Bestellungen ausstellen in einem nahtlosen Ablauf, ohne Hin und Her.",
      fr: "Créez, approuvez, sourcez et émettez des bons de commande dans un flux fluide, sans allers-retours.",
      ko: "요청, 승인, 소싱, 구매 주문 발행을 하나의 매끄러운 흐름으로 처리해 반복 커뮤니케이션을 줄입니다.",
      pt: "Solicite, aprove, faça sourcing e emita pedidos de compra em um fluxo contínuo, sem idas e vindas.",
      it: "Richiedi, approva, fai sourcing ed emetti ordini di acquisto in un flusso unico, senza continui passaggi avanti e indietro.",
      ar: "أنشئ الطلبات واعتمدها ونفّذ التوريد وأصدر أوامر الشراء في تدفق واحد سلس، دون مراسلات متكررة.",
    },
  ],
  [
    "Combine requisitions for bulk pricing",
    { zh: "合并请购以获得批量价格", es: "Combina requisiciones para precios por volumen", ja: "依頼を統合して一括価格を取得", de: "Bedarfsanforderungen für Mengenpreise bündeln", fr: "Regrouper les demandes pour obtenir des prix de volume", ko: "대량 가격 확보를 위해 구매 요청 통합", pt: "Combine requisições para obter preço por volume", it: "Combina le richieste per prezzi a volume", ar: "ادمج طلبات الشراء للحصول على أسعار الكميات" },
  ],
  [
    "Auto-filled target prices on every RFQ",
    { zh: "每个 RFQ 自动填充目标价格", es: "Precios objetivo autocompletados en cada RFQ", ja: "すべての RFQ に目標価格を自動入力", de: "Automatisch ausgefüllte Zielpreise in jeder RFQ", fr: "Prix cibles préremplis sur chaque RFQ", ko: "모든 RFQ에 목표 가격 자동 입력", pt: "Preços-alvo preenchidos automaticamente em cada RFQ", it: "Prezzi target compilati automaticamente in ogni RFQ", ar: "أسعار مستهدفة مملوءة تلقائيًا في كل RFQ" },
  ],
  [
    "Multi-vendor POs in one click",
    { zh: "一键生成多供应商 PO", es: "PO para múltiples proveedores en un clic", ja: "複数ベンダー向け PO をワンクリックで作成", de: "Mehrlieferanten-POs mit einem Klick", fr: "PO multi-fournisseurs en un clic", ko: "원클릭 다중 공급업체 PO", pt: "POs de múltiplos fornecedores em um clique", it: "PO multi-fornitore con un clic", ar: "أوامر PO متعددة الموردين بنقرة واحدة" },
  ],
  [
    "Every invoice validated against PO, GR, QC, and contract terms — so you always pay the right amount.",
    {
      zh: "每张发票都会根据 PO、GR、QC 和合同条款进行校验，确保始终支付正确金额。",
      es: "Cada factura se valida contra PO, GR, QC y términos contractuales, para que siempre pagues el importe correcto.",
      ja: "すべての請求書を PO、GR、QC、契約条件と照合し、常に正しい金額を支払えるようにします。",
      de: "Jede Rechnung wird gegen PO, GR, QC und Vertragsbedingungen geprüft, damit Sie immer den richtigen Betrag zahlen.",
      fr: "Chaque facture est validée avec le PO, le GR, le QC et les conditions contractuelles afin de toujours payer le bon montant.",
      ko: "모든 송장은 PO, GR, QC 및 계약 조건과 대조 검증되어 항상 정확한 금액만 지급됩니다.",
      pt: "Cada fatura é validada contra PO, GR, QC e termos contratuais, para que você sempre pague o valor correto.",
      it: "Ogni fattura viene validata rispetto a PO, GR, QC e termini contrattuali, così paghi sempre l'importo corretto.",
      ar: "يتم التحقق من كل فاتورة مقابل PO و GR و QC وشروط العقد، حتى تدفع دائمًا المبلغ الصحيح.",
    },
  ],
  [
    "AI-powered invoice generation",
    { zh: "AI 驱动的发票生成", es: "Generación de facturas con IA", ja: "AI による請求書生成", de: "KI-gestützte Rechnungserstellung", fr: "Génération de factures par IA", ko: "AI 기반 송장 생성", pt: "Geração de faturas com IA", it: "Generazione fatture basata su IA", ar: "إنشاء الفواتير بالذكاء الاصطناعي" },
  ],
  [
    "Flexible GR, QC & payment sequencing",
    { zh: "灵活的 GR、QC 与付款顺序", es: "Secuenciación flexible de GR, QC y pagos", ja: "GR、QC、支払い順序を柔軟に設定", de: "Flexible Abfolge von GR, QC und Zahlung", fr: "Séquençage flexible GR, QC et paiement", ko: "유연한 GR, QC 및 결제 순서", pt: "Sequenciamento flexível de GR, QC e pagamento", it: "Sequenza flessibile di GR, QC e pagamenti", ar: "تسلسل مرن لـ GR و QC والمدفوعات" },
  ],
  [
    "Always pay the right amount — automatically",
    { zh: "始终自动支付正确金额", es: "Paga siempre el importe correcto, automáticamente", ja: "常に正しい金額を自動で支払い", de: "Automatisch immer den richtigen Betrag zahlen", fr: "Payez toujours le bon montant, automatiquement", ko: "항상 정확한 금액을 자동으로 지급", pt: "Pague sempre o valor correto automaticamente", it: "Paga sempre l'importo corretto, automaticamente", ar: "ادفع دائمًا المبلغ الصحيح تلقائيًا" },
  ],
  [
    "Configure approval hierarchies by amount, vendor type, or item tags.",
    { zh: "按金额、供应商类型或物料标签配置审批层级。", es: "Configura jerarquías de aprobación por importe, tipo de proveedor o etiquetas de artículo.", ja: "金額、ベンダー種別、品目タグごとに承認階層を設定できます。", de: "Konfigurieren Sie Genehmigungshierarchien nach Betrag, Lieferantentyp oder Artikel-Tags.", fr: "Configurez les hiérarchies d'approbation par montant, type de fournisseur ou tags d'article.", ko: "금액, 공급업체 유형 또는 품목 태그별 승인 계층을 구성합니다.", pt: "Configure hierarquias de aprovação por valor, tipo de fornecedor ou tags de item.", it: "Configura gerarchie di approvazione per importo, tipo fornitore o tag articolo.", ar: "اضبط تسلسلات الموافقة حسب المبلغ أو نوع المورد أو وسوم الأصناف." },
  ],
  [
    "Build custom formulas and watch them apply automatically.",
    { zh: "构建自定义公式，并让其自动应用。", es: "Crea fórmulas personalizadas y observa cómo se aplican automáticamente.", ja: "カスタム計算式を作成し、自動適用できます。", de: "Erstellen Sie eigene Formeln und lassen Sie sie automatisch anwenden.", fr: "Créez des formules personnalisées et laissez-les s'appliquer automatiquement.", ko: "사용자 지정 공식을 만들고 자동 적용되도록 합니다.", pt: "Crie fórmulas personalizadas e veja-as serem aplicadas automaticamente.", it: "Crea formule personalizzate e applicale automaticamente.", ar: "أنشئ معادلات مخصصة واجعلها تُطبق تلقائيًا." },
  ],
  [
    "Your system. Your way. From day one.",
    { zh: "你的系统，你的方式，从第一天开始。", es: "Tu sistema. A tu manera. Desde el primer día.", ja: "あなたのシステムを、あなたの方法で。初日から。", de: "Ihr System. Ihre Arbeitsweise. Vom ersten Tag an.", fr: "Votre système. Votre façon de travailler. Dès le premier jour.", ko: "당신의 시스템을 당신의 방식으로, 첫날부터.", pt: "Seu sistema. Do seu jeito. Desde o primeiro dia.", it: "Il tuo sistema. A modo tuo. Dal primo giorno.", ar: "نظامك. بطريقتك. من اليوم الأول." },
  ],
  [
    "More Volume. More Complexity. Same Simplicity.",
    { zh: "更大规模，更高复杂度，同样简单。", es: "Más volumen. Más complejidad. La misma simplicidad.", ja: "量が増えても、複雑になっても、同じシンプルさ。", de: "Mehr Volumen. Mehr Komplexität. Dieselbe Einfachheit.", fr: "Plus de volume. Plus de complexité. La même simplicité.", ko: "더 많은 물량, 더 높은 복잡성, 같은 단순함.", pt: "Mais volume. Mais complexidade. A mesma simplicidade.", it: "Più volume. Più complessità. La stessa semplicità.", ar: "حجم أكبر. تعقيد أكبر. نفس البساطة." },
  ],
  [
    "Alternate items per line and bulk imports.",
    { zh: "按行管理替代物料，并支持批量导入。", es: "Artículos alternativos por línea e importaciones masivas.", ja: "明細ごとの代替品と一括インポートに対応。", de: "Alternativartikel je Position und Massenimporte.", fr: "Articles alternatifs par ligne et imports en masse.", ko: "라인별 대체 품목과 대량 가져오기.", pt: "Itens alternativos por linha e importações em massa.", it: "Articoli alternativi per riga e importazioni massive.", ar: "أصناف بديلة لكل بند واستيراد جماعي." },
  ],
  [
    "Multi-requisition combining for better pricing.",
    { zh: "合并多个请购以获得更优价格。", es: "Combinación de múltiples requisiciones para mejores precios.", ja: "複数の購買依頼をまとめ、より良い価格を実現。", de: "Mehrere Bedarfsanforderungen bündeln, um bessere Preise zu erzielen.", fr: "Regroupement de plusieurs demandes pour de meilleurs prix.", ko: "더 나은 가격을 위한 다중 구매 요청 통합.", pt: "Combinação de várias requisições para melhores preços.", it: "Combinazione di più richieste per prezzi migliori.", ar: "دمج طلبات شراء متعددة للحصول على أسعار أفضل." },
  ],
  [
    "The Right Data. At Every Decision Point.",
    { zh: "在每个决策点提供正确数据。", es: "Los datos correctos en cada punto de decisión.", ja: "すべての意思決定ポイントに、正しいデータを。", de: "Die richtigen Daten an jedem Entscheidungspunkt.", fr: "Les bonnes données à chaque point de décision.", ko: "모든 의사결정 지점에 올바른 데이터.", pt: "Os dados certos em cada ponto de decisão.", it: "I dati giusti in ogni punto decisionale.", ar: "البيانات الصحيحة عند كل نقطة قرار." },
  ],
  [
    "Stop guessing. Start knowing.",
    { zh: "停止猜测，开始掌握。", es: "Deja de adivinar. Empieza a saber.", ja: "推測をやめ、把握を始める。", de: "Nicht mehr raten. Wissen.", fr: "Arrêtez de deviner. Commencez à savoir.", ko: "추측을 멈추고, 정확히 파악하세요.", pt: "Pare de adivinhar. Comece a saber.", it: "Smetti di indovinare. Inizia a sapere.", ar: "توقف عن التخمين. وابدأ بالمعرفة." },
  ],
  [
    "Every Team. Every Vendor. One Platform.",
    { zh: "每个团队、每个供应商，一个平台。", es: "Cada equipo. Cada proveedor. Una plataforma.", ja: "すべてのチーム、すべてのベンダーを 1 つのプラットフォームに。", de: "Jedes Team. Jeder Lieferant. Eine Plattform.", fr: "Chaque équipe. Chaque fournisseur. Une plateforme.", ko: "모든 팀, 모든 공급업체, 하나의 플랫폼.", pt: "Cada equipe. Cada fornecedor. Uma plataforma.", it: "Ogni team. Ogni fornitore. Una piattaforma.", ar: "كل فريق. كل مورد. منصة واحدة." },
  ],
  [
    "No handoff emails. No spreadsheet versions. Real-time.",
    { zh: "没有交接邮件，没有多个表格版本，实时协作。", es: "Sin correos de traspaso. Sin versiones de hojas de cálculo. En tiempo real.", ja: "引き継ぎメールも、表計算の版管理も不要。リアルタイムで連携。", de: "Keine Übergabe-E-Mails. Keine Tabellen-Versionen. Echtzeit.", fr: "Pas d'e-mails de transfert. Pas de versions de tableur. En temps réel.", ko: "인수인계 이메일도, 스프레드시트 버전도 없이 실시간으로.", pt: "Sem e-mails de repasse. Sem versões de planilhas. Em tempo real.", it: "Niente email di passaggio. Niente versioni di fogli di calcolo. In tempo reale.", ar: "لا رسائل تسليم. لا نسخ متعددة من الجداول. كل شيء لحظي." },
  ],
  [
    "Standardized item master",
    { zh: "标准化物料主数据", es: "Maestro de artículos estandarizado", ja: "標準化された品目マスター", de: "Standardisierter Artikelstamm", fr: "Référentiel articles standardisé", ko: "표준화된 품목 마스터", pt: "Cadastro mestre de itens padronizado", it: "Anagrafica articoli standardizzata", ar: "سجل أصناف موحد" },
  ],
  [
    "Project spun up instantly",
    { zh: "项目即时创建", es: "Proyecto creado al instante", ja: "プロジェクトを即時作成", de: "Projekt sofort angelegt", fr: "Projet lancé instantanément", ko: "프로젝트 즉시 생성", pt: "Projeto criado instantaneamente", it: "Progetto avviato all'istante", ar: "إنشاء المشروع فورًا" },
  ],
  [
    "Multi-level requisition approvals",
    { zh: "多级请购审批", es: "Aprobaciones de requisición multinivel", ja: "多段階の購買依頼承認", de: "Mehrstufige Bedarfsfreigaben", fr: "Approbations de demande multiniveaux", ko: "다단계 구매 요청 승인", pt: "Aprovações de requisição multinível", it: "Approvazioni richieste multilivello", ar: "موافقات طلب شراء متعددة المستويات" },
  ],
  [
    "Live item & spend analytics",
    { zh: "实时物料与支出分析", es: "Analítica en vivo de artículos y gasto", ja: "品目と支出のライブ分析", de: "Live-Analysen zu Artikeln und Ausgaben", fr: "Analytique articles et dépenses en direct", ko: "실시간 품목 및 지출 분석", pt: "Analytics em tempo real de itens e gastos", it: "Analisi live di articoli e spesa", ar: "تحليلات مباشرة للأصناف والإنفاق" },
  ],
  [
    "Prices auto-filled from contracts & past POs",
    { zh: "从合同和历史 PO 自动填充价格", es: "Precios autocompletados desde contratos y PO históricos", ja: "契約と過去の PO から価格を自動入力", de: "Preise automatisch aus Verträgen und früheren POs befüllt", fr: "Prix préremplis depuis les contrats et anciens PO", ko: "계약 및 과거 PO에서 가격 자동 입력", pt: "Preços preenchidos a partir de contratos e POs anteriores", it: "Prezzi compilati da contratti e PO precedenti", ar: "تعبئة الأسعار تلقائيًا من العقود وأوامر PO السابقة" },
  ],
  [
    "Platform-native negotiation — no emails",
    { zh: "平台内原生谈判，无需邮件", es: "Negociación nativa en la plataforma, sin correos", ja: "メール不要のプラットフォーム内交渉", de: "Plattforminterne Verhandlung, ohne E-Mails", fr: "Négociation native dans la plateforme, sans e-mails", ko: "이메일 없는 플랫폼 내 협상", pt: "Negociação nativa da plataforma, sem e-mails", it: "Negoziazione nativa in piattaforma, senza email", ar: "تفاوض داخل المنصة، دون بريد إلكتروني" },
  ],
  [
    "Landed-cost bid comparison & scoring",
    { zh: "到岸成本投标比较与评分", es: "Comparación y puntuación de ofertas por costo landed", ja: "landed cost に基づく入札比較とスコアリング", de: "Angebotsvergleich und Bewertung nach Landed Cost", fr: "Comparaison et notation des offres au coût rendu", ko: "landed cost 기반 입찰 비교 및 점수화", pt: "Comparação e pontuação de propostas por custo landed", it: "Confronto e scoring offerte su landed cost", ar: "مقارنة العطاءات وتقييمها حسب التكلفة landed cost" },
  ],
  [
    "True landed cost with custom formulas",
    { zh: "通过自定义公式计算真实到岸成本", es: "Costo landed real con fórmulas personalizadas", ja: "カスタム計算式で正確な landed cost を算出", de: "Echter Landed Cost mit eigenen Formeln", fr: "Coût rendu réel avec formules personnalisées", ko: "맞춤 공식으로 실제 landed cost 계산", pt: "Custo landed real com fórmulas personalizadas", it: "Landed cost reale con formule personalizzate", ar: "تكلفة landed cost حقيقية بمعادلات مخصصة" },
  ],
  [
    "Contract pricing terms on tap",
    { zh: "合同价格条款随时可用", es: "Términos de precio de contrato al alcance", ja: "契約価格条件をすぐに参照", de: "Vertragliche Preisbedingungen sofort verfügbar", fr: "Conditions tarifaires contractuelles à portée de main", ko: "계약 가격 조건 즉시 활용", pt: "Termos de preço contratual sempre disponíveis", it: "Termini prezzo contrattuali subito disponibili", ar: "شروط تسعير العقود متاحة فورًا" },
  ],
  [
    "Best prices from past POs",
    { zh: "来自历史 PO 的最佳价格", es: "Mejores precios de PO anteriores", ja: "過去の PO から最良価格を取得", de: "Beste Preise aus früheren POs", fr: "Meilleurs prix issus des anciens PO", ko: "과거 PO의 최적 가격", pt: "Melhores preços de POs anteriores", it: "Migliori prezzi dai PO precedenti", ar: "أفضل الأسعار من أوامر PO السابقة" },
  ],
  [
    "Live market price benchmarks",
    { zh: "实时市场价格基准", es: "Benchmarks de precios de mercado en vivo", ja: "市場価格ベンチマークをリアルタイム表示", de: "Live-Benchmarks für Marktpreise", fr: "Benchmarks de prix marché en direct", ko: "실시간 시장 가격 벤치마크", pt: "Benchmarks de preço de mercado em tempo real", it: "Benchmark prezzi di mercato live", ar: "معايير أسعار السوق مباشرة" },
  ],
  [
    "One-click PO from the winning bid",
    { zh: "从中标报价一键生成 PO", es: "PO en un clic desde la oferta ganadora", ja: "落札案件からワンクリックで PO 作成", de: "PO mit einem Klick aus dem Gewinnerangebot", fr: "PO en un clic depuis l'offre gagnante", ko: "낙찰 입찰에서 원클릭 PO 생성", pt: "PO em um clique a partir da proposta vencedora", it: "PO con un clic dall'offerta vincente", ar: "إنشاء PO بنقرة واحدة من العرض الفائز" },
  ],
  [
    "Vendor invoice created on-platform",
    { zh: "供应商发票在平台内创建", es: "Factura de proveedor creada en la plataforma", ja: "ベンダー請求書をプラットフォーム上で作成", de: "Lieferantenrechnung auf der Plattform erstellt", fr: "Facture fournisseur créée sur la plateforme", ko: "공급업체 송장을 플랫폼에서 생성", pt: "Fatura do fornecedor criada na plataforma", it: "Fattura fornitore creata in piattaforma", ar: "إنشاء فاتورة المورد داخل المنصة" },
  ],
  [
    "Goods receipt verification",
    { zh: "收货验证", es: "Verificación de recepción de mercancías", ja: "入荷確認", de: "Wareneingangsprüfung", fr: "Vérification de réception des marchandises", ko: "입고 검증", pt: "Verificação de recebimento de mercadorias", it: "Verifica ricevimento merci", ar: "التحقق من استلام البضائع" },
  ],
  [
    "4-way quality & contract match",
    { zh: "质量与合同四方匹配", es: "Conciliación de calidad y contrato en 4 vías", ja: "品質と契約の 4-way 照合", de: "4-Wege-Abgleich von Qualität und Vertrag", fr: "Rapprochement 4 voies qualité et contrat", ko: "품질 및 계약 4-way 매칭", pt: "Conferência 4 vias de qualidade e contrato", it: "Match a 4 vie tra qualità e contratto", ar: "مطابقة رباعية للجودة والعقد" },
  ],
  [
    "Auto-release once conditions met",
    { zh: "条件满足后自动放款", es: "Liberación automática al cumplirse las condiciones", ja: "条件達成後に自動リリース", de: "Automatische Freigabe, sobald Bedingungen erfüllt sind", fr: "Déblocage automatique lorsque les conditions sont remplies", ko: "조건 충족 시 자동 릴리스", pt: "Liberação automática quando as condições forem atendidas", it: "Rilascio automatico al soddisfacimento delle condizioni", ar: "إطلاق تلقائي عند استيفاء الشروط" },
  ],
  [
    "From project creation to final quote — structure procurement with competitive bidding, multi-round negotiations, and data-driven shortlisting.",
    { zh: "从项目创建到最终报价，通过竞争性投标、多轮谈判和数据驱动筛选来结构化采购。", es: "Desde la creación del proyecto hasta la cotización final: estructura compras con licitaciones competitivas, negociaciones por rondas y preselección basada en datos.", ja: "プロジェクト作成から最終見積まで、競争入札、複数回交渉、データに基づく絞り込みで調達を構造化します。", de: "Von der Projekterstellung bis zum finalen Angebot: Strukturieren Sie Beschaffung mit Wettbewerbsausschreibungen, mehrstufigen Verhandlungen und datenbasierter Vorauswahl.", fr: "De la création du projet au devis final : structurez les achats avec des appels d'offres compétitifs, des négociations multi-tours et une présélection pilotée par les données.", ko: "프로젝트 생성부터 최종 견적까지, 경쟁 입찰, 다단계 협상, 데이터 기반 숏리스트로 조달을 구조화합니다.", pt: "Da criação do projeto à cotação final: estruture compras com concorrência competitiva, negociações em várias rodadas e shortlist orientado por dados.", it: "Dalla creazione del progetto al preventivo finale: struttura il procurement con gare competitive, negoziazioni multi-round e shortlist guidate dai dati.", ar: "من إنشاء المشروع إلى عرض السعر النهائي: نظّم المشتريات عبر عطاءات تنافسية ومفاوضات متعددة الجولات وقوائم مختصرة قائمة على البيانات." },
  ],
  [
    "Three-way matching: PO, GR, and Invoice",
    { zh: "三方匹配：PO、GR 和发票", es: "Conciliación de tres vías: PO, GR y factura", ja: "3-way 照合：PO、GR、請求書", de: "3-Wege-Abgleich: PO, GR und Rechnung", fr: "Rapprochement 3 voies : PO, GR et facture", ko: "3-way 매칭: PO, GR, 송장", pt: "Conferência 3 vias: PO, GR e fatura", it: "Match a 3 vie: PO, GR e fattura", ar: "مطابقة ثلاثية: PO و GR والفاتورة" },
  ],
  [
    "Full path — Invoice → GR → QC → Pay",
    { zh: "完整路径：发票 → GR → QC → 付款", es: "Ruta completa: factura → GR → QC → pago", ja: "完全経路：請求書 → GR → QC → 支払い", de: "Vollständiger Pfad: Rechnung → GR → QC → Zahlung", fr: "Parcours complet : facture → GR → QC → paiement", ko: "전체 경로: 송장 → GR → QC → 지급", pt: "Fluxo completo: fatura → GR → QC → pagamento", it: "Percorso completo: fattura → GR → QC → pagamento", ar: "المسار الكامل: الفاتورة → GR → QC → الدفع" },
  ],
  [
    "Express — Invoice → QC → Pay (skip GR)",
    { zh: "快速路径：发票 → QC → 付款（跳过 GR）", es: "Express: factura → QC → pago (omite GR)", ja: "迅速処理：請求書 → QC → 支払い（GR をスキップ）", de: "Express: Rechnung → QC → Zahlung (GR überspringen)", fr: "Express : facture → QC → paiement (GR ignoré)", ko: "익스프레스: 송장 → QC → 지급(GR 생략)", pt: "Expresso: fatura → QC → pagamento (sem GR)", it: "Express: fattura → QC → pagamento (salta GR)", ar: "المسار السريع: الفاتورة → QC → الدفع (تجاوز GR)" },
  ],
  [
    "Direct — Invoice → GR → Pay (skip QC)",
    { zh: "直接路径：发票 → GR → 付款（跳过 QC）", es: "Directo: factura → GR → pago (omite QC)", ja: "直接処理：請求書 → GR → 支払い（QC をスキップ）", de: "Direkt: Rechnung → GR → Zahlung (QC überspringen)", fr: "Direct : facture → GR → paiement (QC ignoré)", ko: "직접 경로: 송장 → GR → 지급(QC 생략)", pt: "Direto: fatura → GR → pagamento (sem QC)", it: "Diretto: fattura → GR → pagamento (salta QC)", ar: "المسار المباشر: الفاتورة → GR → الدفع (تجاوز QC)" },
  ],
  [
    "Every sourcing event runs on clean data, market intelligence, and agreed terms. FactWise gives you the building blocks to source smarter — before a single RFQ goes out.",
    { zh: "每个寻源事件都基于干净数据、市场情报和已约定条款运行。FactWise 在任何 RFQ 发出前，就为更智能的寻源提供基础模块。", es: "Cada evento de sourcing opera con datos limpios, inteligencia de mercado y términos acordados. FactWise te da los bloques para comprar mejor antes de emitir un solo RFQ.", ja: "すべてのソーシングイベントは、クリーンなデータ、市場インテリジェンス、合意済み条件の上で実行されます。FactWise は RFQ 発行前から、より賢いソーシングの土台を提供します。", de: "Jedes Sourcing-Event läuft auf sauberen Daten, Marktinformationen und vereinbarten Bedingungen. FactWise liefert die Bausteine für smarteres Sourcing, bevor eine einzige RFQ versendet wird.", fr: "Chaque événement de sourcing s'appuie sur des données propres, l'intelligence marché et des conditions convenues. FactWise fournit les briques pour sourcer plus intelligemment avant même l'envoi d'une RFQ.", ko: "모든 소싱 이벤트는 정제된 데이터, 시장 인텔리전스, 합의된 조건을 기반으로 실행됩니다. FactWise는 RFQ가 나가기 전부터 더 스마트한 소싱을 위한 기반을 제공합니다.", pt: "Cada evento de sourcing roda sobre dados limpos, inteligência de mercado e termos acordados. A FactWise fornece os blocos para comprar melhor antes mesmo de uma RFQ ser enviada.", it: "Ogni evento di sourcing si basa su dati puliti, market intelligence e termini concordati. FactWise offre i mattoni per fare sourcing in modo più intelligente prima ancora di inviare una RFQ.", ar: "تعمل كل فعالية توريد على بيانات نظيفة وذكاء سوقي وشروط متفق عليها. تمنحك FactWise اللبنات اللازمة للتوريد بذكاء قبل إرسال أي RFQ." },
  ],
  [
    "Expert onboarding from Day 1",
    { zh: "从第 1 天起专家入驻支持", es: "Onboarding experto desde el día 1", ja: "初日から専門家がオンボーディング支援", de: "Experten-Onboarding ab Tag 1", fr: "Onboarding expert dès le premier jour", ko: "1일 차부터 전문가 온보딩", pt: "Onboarding especializado desde o primeiro dia", it: "Onboarding esperto dal giorno 1", ar: "تهيئة خبراء من اليوم الأول" },
  ],
  [
    "Go Live. With Full Support.",
    { zh: "上线，并获得全程支持。", es: "Puesta en marcha con soporte completo.", ja: "本番稼働を、全面サポート付きで。", de: "Go-live mit vollständiger Unterstützung.", fr: "Mise en production avec accompagnement complet.", ko: "전면 지원과 함께 Go Live.", pt: "Entre em produção com suporte completo.", it: "Go-live con supporto completo.", ar: "انطلق مع دعم كامل." },
  ],
  [
    "Replace Manual Work. Gain Speed.",
    { zh: "替代手工工作，提升速度。", es: "Reemplaza el trabajo manual. Gana velocidad.", ja: "手作業を置き換え、スピードを高める。", de: "Manuelle Arbeit ersetzen. Geschwindigkeit gewinnen.", fr: "Remplacez le travail manuel. Gagnez en vitesse.", ko: "수작업을 대체하고 속도를 높이세요.", pt: "Substitua o trabalho manual. Ganhe velocidade.", it: "Sostituisci il lavoro manuale. Guadagna velocità.", ar: "استبدل العمل اليدوي واكسب السرعة." },
  ],
  [
    "Unlock Savings. Compound Intelligence.",
    { zh: "释放节省，让智能持续复利。", es: "Desbloquea ahorros. Haz crecer la inteligencia.", ja: "コスト削減を解き放ち、インテリジェンスを積み上げる。", de: "Einsparungen freisetzen. Intelligenz aufbauen.", fr: "Débloquez des économies. Faites progresser l'intelligence.", ko: "절감을 실현하고 인텔리전스를 축적하세요.", pt: "Desbloqueie economias. Acumule inteligência.", it: "Sblocca risparmi. Fai crescere l'intelligence.", ar: "أطلق الوفورات وراكم الذكاء." },
  ],
  [
    "RFQ TURNAROUND",
    { zh: "RFQ 周转时间", es: "TIEMPO DE RFQ", ja: "RFQ 処理時間", de: "RFQ-DURCHLAUFZEIT", fr: "DÉLAI RFQ", ko: "RFQ 처리 시간", pt: "TEMPO DE RFQ", it: "TEMPO RFQ", ar: "زمن إنجاز RFQ" },
  ],
  [
    "APPROVAL CYCLE",
    { zh: "审批周期", es: "CICLO DE APROBACIÓN", ja: "承認サイクル", de: "GENEHMIGUNGSZYKLUS", fr: "CYCLE D'APPROBATION", ko: "승인 주기", pt: "CICLO DE APROVAÇÃO", it: "CICLO DI APPROVAZIONE", ar: "دورة الموافقة" },
  ],
  [
    "Margins going up",
    { zh: "利润率正在提升", es: "Los márgenes están subiendo", ja: "利益率が上昇中", de: "Margen steigen", fr: "Les marges augmentent", ko: "마진이 상승 중", pt: "Margens em alta", it: "Margini in crescita", ar: "الهوامش ترتفع" },
  ],
  [
    "Achieved 3% annual profit increase by automating multi-currency RfQs and sourcing workflows",
    { zh: "通过自动化多币种 RFQ 和寻源工作流，实现年利润提升 3%", es: "Logró un aumento anual de beneficios del 3% automatizando RFQ multidivisa y flujos de sourcing", ja: "多通貨 RFQ とソーシングワークフローの自動化により年間利益を 3% 向上", de: "3 % jährliche Gewinnsteigerung durch Automatisierung von Mehrwährungs-RFQs und Sourcing-Workflows", fr: "A obtenu 3 % de hausse annuelle des bénéfices en automatisant les RFQ multidevises et les workflows de sourcing", ko: "다중 통화 RFQ 및 소싱 워크플로 자동화로 연간 이익 3% 증가 달성", pt: "Alcançou aumento anual de lucro de 3% ao automatizar RFQs multimoeda e fluxos de sourcing", it: "Ha ottenuto un aumento annuo dell'utile del 3% automatizzando RFQ multivaluta e workflow di sourcing", ar: "حقق زيادة سنوية في الربح بنسبة 3% عبر أتمتة RFQ متعددة العملات وسير عمل التوريد" },
  ],
  [
    "Enabled 18x ROI within the first year by automating complex landed cost calculations",
    { zh: "通过自动化复杂到岸成本计算，在第一年实现 18 倍 ROI", es: "Generó 18x de ROI en el primer año al automatizar cálculos complejos de costo landed", ja: "複雑な landed cost 計算の自動化により初年度に 18 倍の ROI を実現", de: "18-fachen ROI im ersten Jahr durch Automatisierung komplexer Landed-Cost-Berechnungen ermöglicht", fr: "A généré un ROI de 18x la première année en automatisant les calculs complexes de coût rendu", ko: "복잡한 landed cost 계산 자동화로 첫해 18배 ROI 달성", pt: "Gerou ROI de 18x no primeiro ano ao automatizar cálculos complexos de custo landed", it: "Ha generato un ROI di 18x nel primo anno automatizzando calcoli complessi di landed cost", ar: "حقق عائد استثمار 18x خلال السنة الأولى عبر أتمتة حسابات landed cost المعقدة" },
  ],
  [
    "Streamlined manual quoting workflows into a high-speed automated multi-currency process",
    { zh: "将手工报价流程简化为高速自动化多币种流程", es: "Transformó flujos manuales de cotización en un proceso automatizado multidivisa de alta velocidad", ja: "手作業の見積ワークフローを高速な多通貨自動プロセスへ変革", de: "Manuelle Angebotsprozesse in einen schnellen automatisierten Mehrwährungsprozess überführt", fr: "A transformé les workflows manuels de devis en processus automatisé multidevise à grande vitesse", ko: "수동 견적 워크플로를 고속 자동화 다중 통화 프로세스로 전환", pt: "Transformou fluxos manuais de cotação em um processo automatizado multimoeda de alta velocidade", it: "Ha trasformato workflow manuali di quotazione in un processo automatizzato multivaluta ad alta velocità", ar: "حوّل سير عمل عروض الأسعار اليدوي إلى عملية آلية متعددة العملات عالية السرعة" },
  ],
  [
    "Reduced procurement cycle time by 60% with automated index based pricing",
    { zh: "通过自动化指数定价，将采购周期缩短 60%", es: "Redujo el ciclo de compras un 60% con precios automatizados basados en índices", ja: "指数連動価格の自動化により調達サイクルを 60% 短縮", de: "Beschaffungszyklus durch automatisierte indexbasierte Preisfindung um 60 % reduziert", fr: "A réduit le cycle achats de 60 % grâce à une tarification indexée automatisée", ko: "자동화된 지수 기반 가격 책정으로 조달 주기 60% 단축", pt: "Reduziu o ciclo de compras em 60% com precificação automatizada baseada em índices", it: "Ha ridotto del 60% il ciclo di procurement con pricing indicizzato automatizzato", ar: "خفض زمن دورة المشتريات بنسبة 60% باستخدام تسعير آلي قائم على المؤشرات" },
  ],
  [
    "Manage indirect spend, simplify maintenance, repair, and operations procurement, and track tool lifecycle costs.",
    { zh: "管理间接支出，简化维护、维修和运营采购，并跟踪工具生命周期成本。", es: "Gestiona el gasto indirecto, simplifica compras de mantenimiento, reparación y operaciones, y controla costos del ciclo de vida de herramientas.", ja: "間接費を管理し、保守・修理・運用調達を簡素化し、工具のライフサイクルコストを追跡します。", de: "Indirekte Ausgaben verwalten, MRO-Beschaffung vereinfachen und Werkzeug-Lebenszykluskosten verfolgen.", fr: "Gérez les dépenses indirectes, simplifiez les achats de maintenance, réparation et opérations, et suivez les coûts de cycle de vie des outils.", ko: "간접 지출을 관리하고 유지보수, 수리, 운영 조달을 간소화하며 도구 수명주기 비용을 추적합니다.", pt: "Gerencie gastos indiretos, simplifique compras de manutenção, reparo e operações e acompanhe custos do ciclo de vida de ferramentas.", it: "Gestisci la spesa indiretta, semplifica gli acquisti MRO e monitora i costi del ciclo di vita degli strumenti.", ar: "أدر الإنفاق غير المباشر، وبسّط مشتريات الصيانة والإصلاح والعمليات، وتتبع تكاليف دورة حياة الأدوات." },
  ],
  [
    "Streamline component sourcing, manage complex PCB BOMs, and ensure supply chain resilience.",
    { zh: "简化元器件寻源，管理复杂 PCB BOM，并确保供应链韧性。", es: "Simplifica el sourcing de componentes, gestiona BOM de PCB complejos y asegura resiliencia en la cadena de suministro.", ja: "部品ソーシングを効率化し、複雑な PCB BOM を管理し、サプライチェーンの強靭性を確保します。", de: "Komponenten-Sourcing optimieren, komplexe PCB-BOMs verwalten und Lieferkettenresilienz sichern.", fr: "Simplifiez le sourcing de composants, gérez des BOM PCB complexes et assurez la résilience de la supply chain.", ko: "부품 소싱을 간소화하고 복잡한 PCB BOM을 관리하며 공급망 회복탄력성을 보장합니다.", pt: "Simplifique o sourcing de componentes, gerencie BOMs de PCB complexos e garanta resiliência da cadeia de suprimentos.", it: "Semplifica il sourcing dei componenti, gestisci BOM PCB complessi e assicura resilienza della supply chain.", ar: "بسّط توريد المكونات، وأدر BOM الخاصة بلوحات PCB المعقدة، واضمن مرونة سلسلة الإمداد." },
  ],
  [
    "Optimize direct spend for tier-1 suppliers, manage multi-level BOMs, and source quality components seamlessly.",
    { zh: "优化一级供应商的直接支出，管理多层 BOM，并顺畅采购优质零部件。", es: "Optimiza el gasto directo para proveedores tier-1, gestiona BOM multinivel y abastece componentes de calidad sin fricción.", ja: "ティア 1 サプライヤー向けの直接材支出を最適化し、多階層 BOM を管理し、高品質部品をスムーズに調達します。", de: "Direkte Ausgaben für Tier-1-Lieferanten optimieren, mehrstufige BOMs verwalten und Qualitätskomponenten nahtlos sourcen.", fr: "Optimisez les dépenses directes pour les fournisseurs tier-1, gérez les BOM multiniveaux et sourcez des composants de qualité facilement.", ko: "Tier-1 공급업체의 직접 지출을 최적화하고 다단계 BOM을 관리하며 품질 부품을 원활하게 소싱합니다.", pt: "Otimize gastos diretos para fornecedores tier-1, gerencie BOMs multinível e faça sourcing de componentes de qualidade sem atrito.", it: "Ottimizza la spesa diretta per fornitori tier-1, gestisci BOM multilivello e fai sourcing di componenti di qualità senza attriti.", ar: "حسّن الإنفاق المباشر لموردي tier-1، وأدر BOM متعددة المستويات، ووفّر مكونات عالية الجودة بسلاسة." },
  ],
  [
    "Ensure compliance, manage critical lab supplies, and achieve zero-error procurement for life-saving operations.",
    { zh: "确保合规，管理关键实验室用品，并为生命相关运营实现零错误采购。", es: "Asegura cumplimiento, gestiona suministros críticos de laboratorio y logra compras sin errores para operaciones vitales.", ja: "コンプライアンスを確保し、重要なラボ用品を管理し、生命に関わる業務でミスのない調達を実現します。", de: "Compliance sichern, kritische Laborbedarfe verwalten und fehlerfreie Beschaffung für lebenswichtige Abläufe erreichen.", fr: "Assurez la conformité, gérez les fournitures de laboratoire critiques et atteignez des achats sans erreur pour les opérations vitales.", ko: "컴플라이언스를 보장하고 핵심 실험실 소모품을 관리하며 생명과 직결된 운영을 위한 무오류 조달을 달성합니다.", pt: "Garanta conformidade, gerencie suprimentos laboratoriais críticos e alcance compras sem erros para operações vitais.", it: "Garantisci conformità, gestisci forniture di laboratorio critiche e ottieni procurement senza errori per operazioni salvavita.", ar: "اضمن الامتثال، وأدر مستلزمات المختبر الحيوية، وحقق مشتريات بلا أخطاء للعمليات المنقذة للحياة." },
  ],
  [
    "Digitalize direct procurement, manage complex bills of materials, and secure raw materials with automated workflows.",
    { zh: "数字化直接采购，管理复杂 BOM，并通过自动化工作流保障原材料供应。", es: "Digitaliza compras directas, gestiona BOM complejos y asegura materias primas con flujos automatizados.", ja: "直接材調達をデジタル化し、複雑な BOM を管理し、自動化ワークフローで原材料を確保します。", de: "Direkte Beschaffung digitalisieren, komplexe Stücklisten verwalten und Rohmaterialien mit automatisierten Workflows sichern.", fr: "Digitalisez les achats directs, gérez des nomenclatures complexes et sécurisez les matières premières avec des workflows automatisés.", ko: "직접 조달을 디지털화하고 복잡한 BOM을 관리하며 자동화된 워크플로로 원자재를 확보합니다.", pt: "Digitalize compras diretas, gerencie BOMs complexos e assegure matérias-primas com fluxos automatizados.", it: "Digitalizza il procurement diretto, gestisci BOM complessi e assicura materie prime con workflow automatizzati.", ar: "رقمن المشتريات المباشرة، وأدر قوائم BOM المعقدة، وأمّن المواد الخام بسير عمل آلي." },
  ],
  [
    "Simplify procurement of complex electrical components, manage multi-vendor bids, and ensure spec compliance for switchboard assembly.",
    { zh: "简化复杂电气元件采购，管理多供应商报价，并确保配电柜装配符合规格。", es: "Simplifica la compra de componentes eléctricos complejos, gestiona ofertas de múltiples proveedores y asegura cumplimiento de especificaciones para tableros.", ja: "複雑な電気部品調達を簡素化し、複数ベンダー入札を管理し、配電盤組立の仕様遵守を確保します。", de: "Beschaffung komplexer elektrischer Komponenten vereinfachen, Mehrlieferantenangebote verwalten und Spezifikationskonformität für Schaltanlagen sichern.", fr: "Simplifiez l'achat de composants électriques complexes, gérez les offres multi-fournisseurs et assurez la conformité des spécifications pour l'assemblage de tableaux.", ko: "복잡한 전기 부품 조달을 간소화하고 다중 공급업체 입찰을 관리하며 배전반 조립의 사양 준수를 보장합니다.", pt: "Simplifique a compra de componentes elétricos complexos, gerencie propostas de múltiplos fornecedores e garanta conformidade de especificações para montagem de painéis.", it: "Semplifica l'acquisto di componenti elettrici complessi, gestisci offerte multi-fornitore e garantisci conformità specifiche per quadri elettrici.", ar: "بسّط شراء المكونات الكهربائية المعقدة، وأدر عروض موردين متعددين، واضمن مطابقة المواصفات لتجميع لوحات التوزيع." },
  ],
  [
    "India's Digital Personal Data Protection Act compliant. Secure handling of supplier data, consent tracking, and data localization by design.",
    { zh: "符合印度《数字个人数据保护法》。从设计上保障供应商数据安全处理、同意跟踪和数据本地化。", es: "Cumple con la Ley de Protección de Datos Personales Digitales de India. Manejo seguro de datos de proveedores, seguimiento de consentimiento y localización de datos por diseño.", ja: "インドのデジタル個人データ保護法に準拠。サプライヤーデータの安全な取り扱い、同意追跡、データローカライゼーションを設計段階から実装。", de: "Konform mit Indiens Digital Personal Data Protection Act. Sicherer Umgang mit Lieferantendaten, Einwilligungsverfolgung und Datenlokalisierung by design.", fr: "Conforme à la loi indienne sur la protection des données personnelles numériques. Gestion sécurisée des données fournisseurs, suivi des consentements et localisation des données dès la conception.", ko: "인도 디지털 개인정보 보호법을 준수합니다. 공급업체 데이터의 안전한 처리, 동의 추적, 데이터 현지화를 설계 단계부터 지원합니다.", pt: "Compatível com a Lei Indiana de Proteção de Dados Pessoais Digitais. Tratamento seguro de dados de fornecedores, rastreamento de consentimento e localização de dados por design.", it: "Conforme al Digital Personal Data Protection Act indiano. Gestione sicura dei dati fornitori, tracciamento del consenso e localizzazione dei dati by design.", ar: "متوافق مع قانون حماية البيانات الشخصية الرقمية في الهند. معالجة آمنة لبيانات الموردين، وتتبع الموافقات، وتوطين البيانات حسب التصميم." },
  ],
  [
    "Enterprise-grade security posture for your procurement data. We maintain strict controls to ensure your sensitive business information remains secure.",
    { zh: "为采购数据提供企业级安全态势。我们保持严格控制，确保敏感业务信息安全。", es: "Postura de seguridad empresarial para tus datos de compras. Mantenemos controles estrictos para proteger tu información empresarial sensible.", ja: "調達データに対するエンタープライズ級のセキュリティ体制。厳格な管理により機密ビジネス情報を保護します。", de: "Enterprise-Sicherheitsniveau für Ihre Beschaffungsdaten. Strenge Kontrollen schützen sensible Geschäftsinformationen.", fr: "Posture de sécurité de niveau entreprise pour vos données achats. Nous maintenons des contrôles stricts afin de protéger vos informations sensibles.", ko: "조달 데이터를 위한 엔터프라이즈급 보안 체계입니다. 민감한 비즈니스 정보를 안전하게 보호하기 위해 엄격한 통제를 유지합니다.", pt: "Postura de segurança corporativa para seus dados de compras. Mantemos controles rigorosos para proteger informações empresariais sensíveis.", it: "Postura di sicurezza enterprise per i dati di procurement. Manteniamo controlli rigorosi per proteggere le informazioni aziendali sensibili.", ar: "مستوى أمان مؤسسي لبيانات المشتريات لديك. نحافظ على ضوابط صارمة لضمان بقاء معلوماتك التجارية الحساسة آمنة." },
  ],
  [
    "Every PO, invoice approval, supplier bid, and data access is timestamped and locked. Full traceability for finance and procurement audits.",
    { zh: "每个 PO、发票审批、供应商报价和数据访问都会加时间戳并锁定，为财务和采购审计提供完整可追溯性。", es: "Cada PO, aprobación de factura, oferta de proveedor y acceso a datos queda sellado con hora y bloqueado. Trazabilidad completa para auditorías financieras y de compras.", ja: "すべての PO、請求書承認、サプライヤー入札、データアクセスにタイムスタンプを付けてロック。財務・調達監査の完全な追跡性を提供します。", de: "Jede PO, Rechnungsfreigabe, Lieferantenabgabe und jeder Datenzugriff wird zeitgestempelt und gesperrt. Vollständige Nachvollziehbarkeit für Finanz- und Beschaffungsaudits.", fr: "Chaque PO, approbation de facture, offre fournisseur et accès aux données est horodaté et verrouillé. Traçabilité complète pour les audits finance et achats.", ko: "모든 PO, 송장 승인, 공급업체 입찰, 데이터 접근은 타임스탬프가 찍히고 잠깁니다. 재무 및 조달 감사를 위한 완전한 추적성을 제공합니다.", pt: "Cada PO, aprovação de fatura, proposta de fornecedor e acesso a dados é registrado com data/hora e bloqueado. Rastreabilidade completa para auditorias financeiras e de compras.", it: "Ogni PO, approvazione fattura, offerta fornitore e accesso ai dati viene marcato temporalmente e bloccato. Tracciabilità completa per audit finance e procurement.", ar: "يتم ختم كل PO وموافقة فاتورة وعطاء مورد ووصول إلى البيانات بالوقت وقفلها. تتبع كامل لتدقيقات المالية والمشتريات." },
  ],
  [
    "Source-to-pay procurement intelligence for manufacturing enterprises.",
    { zh: "面向制造企业的源到付采购智能。", es: "Inteligencia de compras source-to-pay para empresas manufactureras.", ja: "製造業向け source-to-pay 調達インテリジェンス。", de: "Source-to-Pay-Beschaffungsintelligenz für Fertigungsunternehmen.", fr: "Intelligence achats source-to-pay pour les entreprises industrielles.", ko: "제조 기업을 위한 source-to-pay 조달 인텔리전스.", pt: "Inteligência de compras source-to-pay para empresas de manufatura.", it: "Intelligence di procurement source-to-pay per imprese manifatturiere.", ar: "ذكاء مشتريات source-to-pay للمؤسسات التصنيعية." },
  ],
  [
    "For Suppliers",
    { zh: "面向供应商", es: "Para proveedores", ja: "サプライヤー向け", de: "Für Lieferanten", fr: "Pour les fournisseurs", ko: "공급업체용", pt: "Para fornecedores", it: "Per fornitori", ar: "للموردين" },
  ],
  [
    "Book a Demo",
    { zh: "预约演示", es: "Reservar demo", ja: "デモを予約", de: "Demo buchen", fr: "Réserver une démo", ko: "데모 예약", pt: "Agendar demo", it: "Prenota una demo", ar: "احجز عرضًا توضيحيًا" },
  ],
  [
    "Contact",
    { zh: "联系", es: "Contacto", ja: "お問い合わせ", de: "Kontakt", fr: "Contact", ko: "문의", pt: "Contato", it: "Contatto", ar: "تواصل" },
  ],
  [
    "DPDP Compliance",
    { zh: "DPDP 合规", es: "Cumplimiento DPDP", ja: "DPDP コンプライアンス", de: "DPDP-Compliance", fr: "Conformité DPDP", ko: "DPDP 컴플라이언스", pt: "Conformidade DPDP", it: "Conformità DPDP", ar: "امتثال DPDP" },
  ],
  [
    "Our team configures workflows, migrates your catalogue, and trains your users. FactWise is tailored to your needs.",
    { zh: "我们的团队会配置工作流、迁移目录并培训用户。FactWise 会按你的需求定制。", es: "Nuestro equipo configura flujos, migra tu catálogo y capacita a tus usuarios. FactWise se adapta a tus necesidades.", ja: "当社チームがワークフロー設定、カタログ移行、ユーザートレーニングを行います。FactWise はお客様のニーズに合わせて調整されます。", de: "Unser Team konfiguriert Workflows, migriert Ihren Katalog und schult Ihre Nutzer. FactWise wird an Ihre Anforderungen angepasst.", fr: "Notre équipe configure les workflows, migre votre catalogue et forme vos utilisateurs. FactWise est adapté à vos besoins.", ko: "우리 팀이 워크플로를 구성하고 카탈로그를 마이그레이션하며 사용자를 교육합니다. FactWise는 귀사의 요구에 맞게 조정됩니다.", pt: "Nossa equipe configura fluxos, migra seu catálogo e treina seus usuários. A FactWise é adaptada às suas necessidades.", it: "Il nostro team configura i workflow, migra il catalogo e forma gli utenti. FactWise viene adattata alle tue esigenze.", ar: "يقوم فريقنا بضبط سير العمل وترحيل الكتالوج وتدريب المستخدمين. يتم تخصيص FactWise وفق احتياجاتك." },
  ],
  [
    "RFQs take hours instead of days. Approvals are automated, letting your team focus on decisions that matter.",
    { zh: "RFQ 从几天缩短到几小时。审批自动完成，让团队专注于真正重要的决策。", es: "Las RFQ toman horas en lugar de días. Las aprobaciones se automatizan para que tu equipo se enfoque en decisiones importantes.", ja: "RFQ は数日ではなく数時間で完了。承認は自動化され、チームは重要な意思決定に集中できます。", de: "RFQs dauern Stunden statt Tage. Genehmigungen werden automatisiert, damit Ihr Team sich auf wichtige Entscheidungen konzentriert.", fr: "Les RFQ prennent des heures plutôt que des jours. Les approbations sont automatisées pour que votre équipe se concentre sur les décisions clés.", ko: "RFQ가 며칠이 아니라 몇 시간 안에 처리됩니다. 승인은 자동화되어 팀은 중요한 결정에 집중할 수 있습니다.", pt: "RFQs levam horas em vez de dias. Aprovações são automatizadas, permitindo que sua equipe foque nas decisões importantes.", it: "Le RFQ richiedono ore invece di giorni. Le approvazioni sono automatizzate, così il team si concentra sulle decisioni importanti.", ar: "تستغرق RFQ ساعات بدلًا من أيام. تتم الموافقات آليًا، مما يتيح لفريقك التركيز على القرارات المهمة." },
  ],
  [
    "Procurement intelligence compounds over time. Costs come down and margins go up as you uncover strategic savings.",
    { zh: "采购智能会随时间复利增长。随着战略性节省被发现，成本下降、利润率提升。", es: "La inteligencia de compras se acumula con el tiempo. Los costos bajan y los márgenes suben al descubrir ahorros estratégicos.", ja: "調達インテリジェンスは時間とともに蓄積されます。戦略的な削減機会を見つけることで、コストは下がり利益率は上がります。", de: "Beschaffungsintelligenz verstärkt sich mit der Zeit. Kosten sinken und Margen steigen, wenn strategische Einsparungen sichtbar werden.", fr: "L'intelligence achats se renforce avec le temps. Les coûts baissent et les marges augmentent à mesure que vous identifiez des économies stratégiques.", ko: "조달 인텔리전스는 시간이 지날수록 축적됩니다. 전략적 절감 기회를 발견하면서 비용은 낮아지고 마진은 높아집니다.", pt: "A inteligência de compras se acumula com o tempo. Custos caem e margens sobem conforme você identifica economias estratégicas.", it: "L'intelligence di procurement cresce nel tempo. I costi scendono e i margini aumentano quando emergono risparmi strategici.", ar: "يتراكم ذكاء المشتريات بمرور الوقت. تنخفض التكاليف وترتفع الهوامش مع اكتشاف وفورات استراتيجية." },
  ],
  [
    "Legacy data migration & validation",
    { zh: "历史数据迁移与验证", es: "Migración y validación de datos heredados", ja: "レガシーデータ移行と検証", de: "Migration und Validierung von Altdaten", fr: "Migration et validation des données historiques", ko: "레거시 데이터 마이그레이션 및 검증", pt: "Migração e validação de dados legados", it: "Migrazione e validazione dati legacy", ar: "ترحيل البيانات القديمة والتحقق منها" },
  ],
  [
    "Role-based access & approval chains",
    { zh: "基于角色的访问与审批链", es: "Acceso por roles y cadenas de aprobación", ja: "ロールベースアクセスと承認チェーン", de: "Rollenbasierter Zugriff und Genehmigungsketten", fr: "Accès basé sur les rôles et chaînes d'approbation", ko: "역할 기반 접근 및 승인 체인", pt: "Acesso por função e cadeias de aprovação", it: "Accesso basato sui ruoli e catene di approvazione", ar: "وصول قائم على الأدوار وسلاسل موافقات" },
  ],
  [
    "Autonomous procurement approvals",
    { zh: "自主采购审批", es: "Aprobaciones de compras autónomas", ja: "自律的な調達承認", de: "Autonome Beschaffungsgenehmigungen", fr: "Approbations achats autonomes", ko: "자율 조달 승인", pt: "Aprovações autônomas de compras", it: "Approvazioni procurement autonome", ar: "موافقات مشتريات ذاتية" },
  ],
  [
    "Real-time supply chain visibility",
    { zh: "实时供应链可视化", es: "Visibilidad de la cadena de suministro en tiempo real", ja: "サプライチェーンのリアルタイム可視性", de: "Echtzeit-Transparenz der Lieferkette", fr: "Visibilité supply chain en temps réel", ko: "실시간 공급망 가시성", pt: "Visibilidade da cadeia de suprimentos em tempo real", it: "Visibilità supply chain in tempo reale", ar: "رؤية فورية لسلسلة الإمداد" },
  ],
  [
    "Advanced vendor performance tracking",
    { zh: "高级供应商绩效跟踪", es: "Seguimiento avanzado del desempeño de proveedores", ja: "高度なベンダーパフォーマンス追跡", de: "Erweitertes Lieferanten-Performance-Tracking", fr: "Suivi avancé de la performance fournisseurs", ko: "고급 공급업체 성과 추적", pt: "Acompanhamento avançado de desempenho de fornecedores", it: "Monitoraggio avanzato delle performance fornitori", ar: "تتبع متقدم لأداء الموردين" },
  ],
  [
    "Auditable ROI & cost savings",
    { zh: "可审计 ROI 与成本节省", es: "ROI y ahorros auditables", ja: "監査可能な ROI とコスト削減", de: "Prüfbarer ROI und Kosteneinsparungen", fr: "ROI et économies auditables", ko: "감사 가능한 ROI 및 비용 절감", pt: "ROI e economias auditáveis", it: "ROI e risparmi verificabili", ar: "عائد استثمار ووفورات قابلة للتدقيق" },
  ],
  [
    "Strategic sourcing & forecasting",
    { zh: "战略寻源与预测", es: "Sourcing estratégico y previsión", ja: "戦略的ソーシングと予測", de: "Strategisches Sourcing und Prognosen", fr: "Sourcing stratégique et prévision", ko: "전략적 소싱 및 예측", pt: "Sourcing estratégico e previsão", it: "Sourcing strategico e forecasting", ar: "توريد استراتيجي وتنبؤ" },
  ],
  [
    "Consolidated multi-entity reporting",
    { zh: "多实体合并报表", es: "Reportes consolidados multi-entidad", ja: "複数法人の統合レポート", de: "Konsolidiertes Reporting über mehrere Einheiten", fr: "Reporting consolidé multi-entités", ko: "다중 법인 통합 리포팅", pt: "Relatórios consolidados multi-entidade", it: "Reporting consolidato multi-entità", ar: "تقارير موحدة متعددة الكيانات" },
  ],
  [
    "RFQ / RFI / RFP",
    { zh: "RFQ / RFI / RFP", es: "RFQ / RFI / RFP", ja: "RFQ / RFI / RFP", de: "RFQ / RFI / RFP", fr: "RFQ / RFI / RFP", ko: "RFQ / RFI / RFP", pt: "RFQ / RFI / RFP", it: "RFQ / RFI / RFP", ar: "RFQ / RFI / RFP" },
  ],
  [
    "Run sourcing events and collect structured bids from vendors.",
    { zh: "运行寻源事件并从供应商收集结构化报价。", es: "Ejecuta eventos de sourcing y recopila ofertas estructuradas de proveedores.", ja: "ソーシングイベントを実行し、ベンダーから構造化された入札を収集します。", de: "Sourcing-Events durchführen und strukturierte Angebote von Lieferanten sammeln.", fr: "Lancez des événements de sourcing et collectez des offres structurées auprès des fournisseurs.", ko: "소싱 이벤트를 실행하고 공급업체의 구조화된 입찰을 수집합니다.", pt: "Execute eventos de sourcing e colete propostas estruturadas dos fornecedores.", it: "Esegui eventi di sourcing e raccogli offerte strutturate dai fornitori.", ar: "شغّل فعاليات التوريد واجمع عروضًا منظمة من الموردين." },
  ],
  [
    "Bid Analytics",
    { zh: "投标分析", es: "Analítica de ofertas", ja: "入札分析", de: "Angebotsanalyse", fr: "Analyse des offres", ko: "입찰 분석", pt: "Análise de propostas", it: "Analisi offerte", ar: "تحليلات العطاءات" },
  ],
  [
    "Compare bids, run scenarios, and pick the best landed cost.",
    { zh: "比较报价、运行场景并选择最佳到岸成本。", es: "Compara ofertas, ejecuta escenarios y elige el mejor costo landed.", ja: "入札を比較し、シナリオを実行し、最適な landed cost を選定します。", de: "Angebote vergleichen, Szenarien durchspielen und den besten Landed Cost auswählen.", fr: "Comparez les offres, simulez des scénarios et choisissez le meilleur coût rendu.", ko: "입찰을 비교하고 시나리오를 실행해 최적의 landed cost를 선택합니다.", pt: "Compare propostas, rode cenários e escolha o melhor custo landed.", it: "Confronta offerte, esegui scenari e scegli il miglior landed cost.", ar: "قارن العطاءات وشغّل السيناريوهات واختر أفضل تكلفة landed cost." },
  ],
  [
    "Quote Sheet",
    { zh: "报价单", es: "Hoja de cotización", ja: "見積シート", de: "Angebotsblatt", fr: "Feuille de devis", ko: "견적 시트", pt: "Planilha de cotação", it: "Scheda preventivo", ar: "ورقة عرض السعر" },
  ],
  [
    "Generate the customer-facing quote sheet in one click.",
    { zh: "一键生成面向客户的报价单。", es: "Genera la hoja de cotización para el cliente en un clic.", ja: "顧客向け見積シートをワンクリックで生成します。", de: "Kundenorientiertes Angebotsblatt mit einem Klick erstellen.", fr: "Générez la feuille de devis client en un clic.", ko: "고객용 견적 시트를 원클릭으로 생성합니다.", pt: "Gere a planilha de cotação para o cliente em um clique.", it: "Genera la scheda preventivo per il cliente con un clic.", ar: "أنشئ ورقة عرض السعر للعميل بنقرة واحدة." },
  ],
  [
    "BOM Cost",
    { zh: "BOM 成本", es: "Costo BOM", ja: "BOM コスト", de: "BOM-Kosten", fr: "Coût BOM", ko: "BOM 비용", pt: "Custo BOM", it: "Costo BOM", ar: "تكلفة BOM" },
  ],
  [
    "Roll up BOM costs with live prices and alternates.",
    { zh: "用实时价格和替代件汇总 BOM 成本。", es: "Consolida costos BOM con precios en vivo y alternativos.", ja: "ライブ価格と代替品を使って BOM コストを積み上げます。", de: "BOM-Kosten mit Live-Preisen und Alternativen zusammenführen.", fr: "Consolidez les coûts BOM avec prix en direct et alternatives.", ko: "실시간 가격과 대체품으로 BOM 비용을 집계합니다.", pt: "Consolide custos BOM com preços em tempo real e alternativas.", it: "Raggruppa i costi BOM con prezzi live e alternative.", ar: "اجمع تكاليف BOM باستخدام أسعار مباشرة وبدائل." },
  ],
  [
    "Inventory",
    { zh: "库存", es: "Inventario", ja: "在庫", de: "Bestand", fr: "Stock", ko: "재고", pt: "Estoque", it: "Inventario", ar: "المخزون" },
  ],
  [
    "Supplier Network",
    { zh: "供应商网络", es: "Red de proveedores", ja: "サプライヤーネットワーク", de: "Lieferantennetzwerk", fr: "Réseau fournisseurs", ko: "공급업체 네트워크", pt: "Rede de fornecedores", it: "Rete fornitori", ar: "شبكة الموردين" },
  ],
  [
    "Connects to your existing supplier directory & catalogs.",
    { zh: "连接到现有供应商目录和目录库。", es: "Se conecta a tu directorio y catálogos de proveedores existentes.", ja: "既存のサプライヤーディレクトリとカタログに接続します。", de: "Verbindet sich mit Ihrem bestehenden Lieferantenverzeichnis und Katalogen.", fr: "Se connecte à votre annuaire fournisseurs et à vos catalogues existants.", ko: "기존 공급업체 디렉터리 및 카탈로그와 연결됩니다.", pt: "Conecta-se ao diretório e catálogos de fornecedores existentes.", it: "Si collega alla directory fornitori e ai cataloghi esistenti.", ar: "يتصل بدليل الموردين والكتالوجات الحالية لديك." },
  ],
  [
    "Notifications",
    { zh: "通知", es: "Notificaciones", ja: "通知", de: "Benachrichtigungen", fr: "Notifications", ko: "알림", pt: "Notificações", it: "Notifiche", ar: "الإشعارات" },
  ],
  [
    "FactWise capability — webhooks & alerts to Slack, email and Teams.",
    { zh: "FactWise 能力：通过 webhook 和提醒连接 Slack、邮件与 Teams。", es: "Capacidad de FactWise: webhooks y alertas hacia Slack, correo y Teams.", ja: "FactWise 機能：Slack、メール、Teams への webhook とアラート。", de: "FactWise-Funktion: Webhooks und Alerts für Slack, E-Mail und Teams.", fr: "Fonction FactWise : webhooks et alertes vers Slack, e-mail et Teams.", ko: "FactWise 기능: Slack, 이메일, Teams로 보내는 webhook 및 알림.", pt: "Recurso FactWise: webhooks e alertas para Slack, e-mail e Teams.", it: "Funzionalità FactWise: webhook e avvisi verso Slack, email e Teams.", ar: "قدرة FactWise: webhooks وتنبيهات إلى Slack والبريد الإلكتروني وTeams." },
  ],
  [
    "The Source-to-Pay platform that runs on top of the systems you already have.",
    { zh: "运行在你现有系统之上的 Source-to-Pay 平台。", es: "La plataforma Source-to-Pay que funciona sobre los sistemas que ya tienes.", ja: "既存システムの上で動く Source-to-Pay プラットフォーム。", de: "Die Source-to-Pay-Plattform, die auf Ihren bestehenden Systemen läuft.", fr: "La plateforme Source-to-Pay qui fonctionne avec vos systèmes existants.", ko: "이미 보유한 시스템 위에서 작동하는 Source-to-Pay 플랫폼.", pt: "A plataforma Source-to-Pay que roda sobre os sistemas que você já possui.", it: "La piattaforma Source-to-Pay che funziona sopra i sistemi che hai già.", ar: "منصة Source-to-Pay التي تعمل فوق الأنظمة التي تمتلكها بالفعل." },
  ],
  [
    "FactWise capability — built-in procurement dashboards & savings reporting.",
    { zh: "FactWise 能力：内置采购仪表板与节省报告。", es: "Capacidad de FactWise: dashboards de compras e informes de ahorro integrados.", ja: "FactWise 機能：組み込みの調達ダッシュボードと削減レポート。", de: "FactWise-Funktion: integrierte Beschaffungsdashboards und Einsparungsberichte.", fr: "Fonction FactWise : tableaux de bord achats intégrés et reporting des économies.", ko: "FactWise 기능: 내장 조달 대시보드 및 절감 리포트.", pt: "Recurso FactWise: dashboards de compras e relatórios de economia integrados.", it: "Funzionalità FactWise: dashboard procurement e report risparmi integrati.", ar: "قدرة FactWise: لوحات مشتريات وتقارير وفورات مدمجة." },
  ],
  [
    "Enterprise-grade security posture for your procurement data. We maintain strict controls to ensure your sensitive business information remains secure.",
    { zh: "为采购数据提供企业级安全态势。我们保持严格控制，确保敏感业务信息安全。", es: "Postura de seguridad empresarial para tus datos de compras. Mantenemos controles estrictos para proteger tu información empresarial sensible.", ja: "調達データに対するエンタープライズ級のセキュリティ体制。厳格な管理により機密ビジネス情報を保護します。", de: "Enterprise-Sicherheitsniveau für Ihre Beschaffungsdaten. Strenge Kontrollen schützen sensible Geschäftsinformationen.", fr: "Posture de sécurité de niveau entreprise pour vos données achats. Nous maintenons des contrôles stricts afin de protéger vos informations sensibles.", ko: "조달 데이터를 위한 엔터프라이즈급 보안 체계입니다. 민감한 비즈니스 정보를 안전하게 보호하기 위해 엄격한 통제를 유지합니다.", pt: "Postura de segurança corporativa para seus dados de compras. Mantemos controles rigorosos para proteger informações empresariais sensíveis.", it: "Postura di sicurezza enterprise per i dati di procurement. Manteniamo controlli rigorosi per proteggere le informazioni aziendali sensibili.", ar: "مستوى أمان مؤسسي لبيانات المشتريات لديك. نحافظ على ضوابط صارمة لضمان بقاء معلوماتك التجارية الحساسة آمنة." },
  ],
  [
    "For companies managing global supply chains. Built-in workflows for data processing agreements, right to erasure, and consent management.",
    { zh: "适用于管理全球供应链的企业。内置数据处理协议、删除权和同意管理工作流。", es: "Para empresas que gestionan cadenas de suministro globales. Flujos integrados para acuerdos de procesamiento de datos, derecho de supresión y gestión de consentimiento.", ja: "グローバルサプライチェーンを管理する企業向け。データ処理契約、削除権、同意管理のワークフローを内蔵。", de: "Für Unternehmen mit globalen Lieferketten. Integrierte Workflows für Datenverarbeitungsverträge, Recht auf Löschung und Einwilligungsmanagement.", fr: "Pour les entreprises gérant des chaînes d'approvisionnement mondiales. Workflows intégrés pour les accords de traitement des données, le droit à l'effacement et la gestion du consentement.", ko: "글로벌 공급망을 관리하는 기업을 위한 기능입니다. 데이터 처리 계약, 삭제권, 동의 관리를 위한 내장 워크플로를 제공합니다.", pt: "Para empresas que gerenciam cadeias globais. Fluxos integrados para acordos de processamento de dados, direito ao apagamento e gestão de consentimento.", it: "Per aziende che gestiscono supply chain globali. Workflow integrati per accordi di trattamento dati, diritto alla cancellazione e gestione del consenso.", ar: "للشركات التي تدير سلاسل إمداد عالمية. سير عمل مدمج لاتفاقيات معالجة البيانات وحق المحو وإدارة الموافقات." },
  ],
  [
    "Granular permission layers ensure only authorized personnel can approve requisitions, release POs, or access sensitive pricing data.",
    { zh: "细粒度权限层确保只有授权人员才能批准请购、发布 PO 或访问敏感价格数据。", es: "Capas granulares de permisos aseguran que solo personal autorizado apruebe requisiciones, libere PO o acceda a datos sensibles de precios.", ja: "きめ細かな権限レイヤーにより、承認済み担当者だけが購買依頼承認、PO 発行、機密価格データへのアクセスを行えます。", de: "Granulare Berechtigungsebenen stellen sicher, dass nur autorisierte Personen Bedarfsanforderungen freigeben, POs auslösen oder sensible Preisdaten einsehen.", fr: "Des permissions granulaires garantissent que seules les personnes autorisées approuvent les demandes, émettent des PO ou accèdent aux prix sensibles.", ko: "세분화된 권한 계층으로 승인된 직원만 구매 요청 승인, PO 릴리스 또는 민감한 가격 데이터 접근이 가능합니다.", pt: "Camadas granulares de permissão garantem que apenas pessoas autorizadas aprovem requisições, liberem POs ou acessem dados sensíveis de preço.", it: "Livelli di autorizzazione granulari assicurano che solo personale autorizzato possa approvare richieste, rilasciare PO o accedere a dati prezzo sensibili.", ar: "تضمن طبقات الصلاحيات الدقيقة أن الموظفين المصرح لهم فقط يمكنهم اعتماد الطلبات أو إصدار PO أو الوصول إلى بيانات تسعير حساسة." },
  ],
  [
    "You own your procurement data. Flexible export options ensure you are never locked in, with clear data isolation across tenants.",
    { zh: "采购数据归你所有。灵活导出选项确保你不会被锁定，并在租户之间保持清晰的数据隔离。", es: "Tus datos de compras son tuyos. Las opciones flexibles de exportación evitan el bloqueo y mantienen aislamiento claro entre tenants.", ja: "調達データはお客様のものです。柔軟なエクスポートによりロックインを防ぎ、テナント間の明確なデータ分離を保ちます。", de: "Ihre Beschaffungsdaten gehören Ihnen. Flexible Exportoptionen verhindern Lock-in und sorgen für klare Datentrennung zwischen Mandanten.", fr: "Vos données achats vous appartiennent. Des options d'export flexibles évitent l'enfermement et assurent une isolation claire entre tenants.", ko: "조달 데이터의 소유자는 고객입니다. 유연한 내보내기 옵션으로 종속을 방지하고 테넌트 간 데이터 격리를 명확히 유지합니다.", pt: "Seus dados de compras pertencem a você. Opções flexíveis de exportação evitam aprisionamento e garantem isolamento claro entre tenants.", it: "I dati di procurement sono tuoi. Opzioni di export flessibili evitano lock-in e garantiscono chiara separazione dei dati tra tenant.", ar: "بيانات المشتريات ملك لك. تضمن خيارات التصدير المرنة عدم تقييدك، مع عزل واضح للبيانات بين المستأجرين." },
  ],
  [
    "From internal demand to approved purchase order — capture requisitions, source competitively, and convert winning bids into compliant POs.",
    { zh: "从内部需求到已批准的采购订单：捕获请购、竞争性寻源，并将中标报价转为合规 PO。", es: "De la demanda interna a la orden de compra aprobada: captura requisiciones, abastece competitivamente y convierte ofertas ganadoras en PO conformes.", ja: "社内需要から承認済み PO まで、購買依頼を取得し、競争的にソーシングし、落札案件をコンプライアンス対応の PO に変換します。", de: "Vom internen Bedarf bis zur genehmigten Bestellung: Bedarfsanforderungen erfassen, wettbewerblich sourcen und Gewinnerangebote in konforme POs umwandeln.", fr: "De la demande interne au PO approuvé : capturez les demandes, sourcez de façon compétitive et convertissez les offres gagnantes en PO conformes.", ko: "내부 수요에서 승인된 PO까지: 구매 요청을 수집하고 경쟁 소싱을 수행하며 낙찰 입찰을 컴플라이언스에 맞는 PO로 전환합니다.", pt: "Da demanda interna ao pedido aprovado: capture requisições, faça sourcing competitivo e converta propostas vencedoras em POs conformes.", it: "Dalla domanda interna al PO approvato: acquisisci richieste, fai sourcing competitivo e converti le offerte vincenti in PO conformi.", ar: "من الطلب الداخلي إلى أمر الشراء المعتمد: التقط طلبات الشراء، ونفّذ توريدًا تنافسيًا، وحوّل العروض الفائزة إلى أوامر PO متوافقة." },
  ],
  [
    "From purchase order to final payment — choose the right verification path based on your supplier trust level and order criticality.",
    { zh: "从采购订单到最终付款：根据供应商信任等级和订单关键性选择正确的验证路径。", es: "De la orden de compra al pago final: elige la ruta de verificación adecuada según el nivel de confianza del proveedor y la criticidad del pedido.", ja: "購買注文から最終支払いまで、サプライヤーの信頼度と注文の重要度に応じて適切な検証経路を選択します。", de: "Von der Bestellung bis zur finalen Zahlung: Wählen Sie je nach Lieferantenvertrauen und Kritikalität der Bestellung den richtigen Prüfpfad.", fr: "Du bon de commande au paiement final : choisissez le bon parcours de vérification selon le niveau de confiance fournisseur et la criticité de la commande.", ko: "구매 주문에서 최종 지급까지: 공급업체 신뢰 수준과 주문 중요도에 따라 적절한 검증 경로를 선택합니다.", pt: "Do pedido de compra ao pagamento final: escolha a rota de verificação certa conforme o nível de confiança do fornecedor e a criticidade do pedido.", it: "Dal PO al pagamento finale: scegli il percorso di verifica corretto in base al livello di fiducia del fornitore e alla criticità dell'ordine.", ar: "من أمر الشراء إلى الدفع النهائي: اختر مسار التحقق المناسب بناءً على مستوى الثقة بالمورد وأهمية الطلب." },
  ],
  [
    "Multi-vendor RfQ with structured approvals",
    { zh: "带结构化审批的多供应商 RFQ", es: "RFQ multiproveedor con aprobaciones estructuradas", ja: "構造化承認付きの複数ベンダー RFQ", de: "Mehrlieferanten-RFQ mit strukturierten Genehmigungen", fr: "RFQ multi-fournisseurs avec approbations structurées", ko: "구조화된 승인을 갖춘 다중 공급업체 RFQ", pt: "RFQ multi-fornecedor com aprovações estruturadas", it: "RFQ multi-fornitore con approvazioni strutturate", ar: "RFQ متعدد الموردين مع موافقات منظمة" },
  ],
  [
    "Real-time negotiation tracking per line item",
    { zh: "按行项目实时跟踪谈判", es: "Seguimiento de negociación en tiempo real por línea", ja: "明細ごとの交渉をリアルタイム追跡", de: "Echtzeit-Verfolgung von Verhandlungen je Position", fr: "Suivi des négociations en temps réel par ligne", ko: "라인 품목별 실시간 협상 추적", pt: "Acompanhamento de negociação em tempo real por linha", it: "Tracciamento negoziazioni in tempo reale per riga", ar: "تتبع التفاوض لحظيًا لكل بند" },
  ],
  [
    "Automated bid comparison and scoring engine",
    { zh: "自动化投标比较与评分引擎", es: "Motor automatizado de comparación y puntuación de ofertas", ja: "入札比較とスコアリングの自動エンジン", de: "Automatisierte Angebotsvergleichs- und Bewertungsengine", fr: "Moteur automatisé de comparaison et notation des offres", ko: "자동 입찰 비교 및 점수화 엔진", pt: "Motor automatizado de comparação e pontuação de propostas", it: "Motore automatico di confronto e scoring offerte", ar: "محرك آلي لمقارنة العطاءات وتقييمها" },
  ],
  [
    "Quote calculator with landed cost analysis",
    { zh: "带到岸成本分析的报价计算器", es: "Calculadora de cotizaciones con análisis de costo landed", ja: "landed cost 分析付き見積計算機", de: "Angebotsrechner mit Landed-Cost-Analyse", fr: "Calculateur de devis avec analyse du coût rendu", ko: "landed cost 분석 포함 견적 계산기", pt: "Calculadora de cotação com análise de custo landed", it: "Calcolatore preventivo con analisi landed cost", ar: "حاسبة عروض أسعار مع تحليل landed cost" },
  ],
  [
    "Project-level spend visibility dashboard",
    { zh: "项目级支出可视化仪表板", es: "Dashboard de visibilidad de gasto por proyecto", ja: "プロジェクト別支出可視化ダッシュボード", de: "Dashboard für Ausgabentransparenz auf Projektebene", fr: "Tableau de bord de visibilité des dépenses par projet", ko: "프로젝트 수준 지출 가시성 대시보드", pt: "Dashboard de visibilidade de gastos por projeto", it: "Dashboard visibilità spesa a livello progetto", ar: "لوحة رؤية الإنفاق على مستوى المشروع" },
  ],
  [
    "Department-level requisition capture",
    { zh: "部门级请购捕获", es: "Captura de requisiciones por departamento", ja: "部門別の購買依頼取得", de: "Bedarfserfassung auf Abteilungsebene", fr: "Capture des demandes au niveau département", ko: "부서 수준 구매 요청 수집", pt: "Captura de requisições por departamento", it: "Acquisizione richieste a livello reparto", ar: "التقاط طلبات الشراء على مستوى القسم" },
  ],
  [
    "Competitive sourcing with structured RfQ",
    { zh: "通过结构化 RFQ 进行竞争性寻源", es: "Sourcing competitivo con RFQ estructurada", ja: "構造化 RFQ による競争的ソーシング", de: "Wettbewerbliches Sourcing mit strukturierter RFQ", fr: "Sourcing compétitif avec RFQ structurée", ko: "구조화된 RFQ 기반 경쟁 소싱", pt: "Sourcing competitivo com RFQ estruturada", it: "Sourcing competitivo con RFQ strutturata", ar: "توريد تنافسي عبر RFQ منظمة" },
  ],
  [
    "One-click PO generation from winning bid",
    { zh: "从中标报价一键生成 PO", es: "Generación de PO en un clic desde la oferta ganadora", ja: "落札案件からワンクリックで PO 生成", de: "PO-Erstellung mit einem Klick aus dem Gewinnerangebot", fr: "Génération de PO en un clic depuis l'offre gagnante", ko: "낙찰 입찰에서 원클릭 PO 생성", pt: "Geração de PO em um clique a partir da proposta vencedora", it: "Generazione PO con un clic dall'offerta vincente", ar: "إنشاء PO بنقرة واحدة من العرض الفائز" },
  ],
  [
    "Budget validation and approval workflows",
    { zh: "预算验证与审批工作流", es: "Validación presupuestaria y flujos de aprobación", ja: "予算検証と承認ワークフロー", de: "Budgetprüfung und Genehmigungsworkflows", fr: "Validation budgétaire et workflows d'approbation", ko: "예산 검증 및 승인 워크플로", pt: "Validação de orçamento e fluxos de aprovação", it: "Validazione budget e workflow approvativi", ar: "التحقق من الميزانية وسير عمل الموافقات" },
  ],
  [
    "Supplier performance benchmarking",
    { zh: "供应商绩效基准分析", es: "Benchmarking de desempeño de proveedores", ja: "サプライヤーパフォーマンスのベンチマーク", de: "Benchmarking der Lieferantenleistung", fr: "Benchmarking de performance fournisseurs", ko: "공급업체 성과 벤치마킹", pt: "Benchmarking de desempenho de fornecedores", it: "Benchmark performance fornitori", ar: "مقارنة أداء الموردين" },
  ],
  [
    "Flexible bypass routes for trusted suppliers",
    { zh: "面向可信供应商的灵活跳过路径", es: "Rutas de bypass flexibles para proveedores confiables", ja: "信頼済みサプライヤー向けの柔軟なバイパス経路", de: "Flexible Bypass-Routen für vertrauenswürdige Lieferanten", fr: "Parcours de contournement flexibles pour les fournisseurs de confiance", ko: "신뢰 공급업체를 위한 유연한 우회 경로", pt: "Rotas flexíveis de bypass para fornecedores confiáveis", it: "Percorsi di bypass flessibili per fornitori fidati", ar: "مسارات تجاوز مرنة للموردين الموثوقين" },
  ],
  [
    "Automated payment release after approvals",
    { zh: "审批后自动释放付款", es: "Liberación automática de pagos tras aprobaciones", ja: "承認後に支払いを自動リリース", de: "Automatische Zahlungsfreigabe nach Genehmigungen", fr: "Déblocage automatique des paiements après approbations", ko: "승인 후 자동 결제 릴리스", pt: "Liberação automática de pagamento após aprovações", it: "Rilascio automatico del pagamento dopo le approvazioni", ar: "إطلاق المدفوعات تلقائيًا بعد الموافقات" },
  ],
  [
    "Real-time payment status tracking",
    { zh: "实时付款状态跟踪", es: "Seguimiento del estado de pagos en tiempo real", ja: "支払いステータスのリアルタイム追跡", de: "Echtzeit-Tracking des Zahlungsstatus", fr: "Suivi du statut des paiements en temps réel", ko: "실시간 결제 상태 추적", pt: "Acompanhamento do status de pagamento em tempo real", it: "Tracciamento stato pagamenti in tempo reale", ar: "تتبع حالة الدفع لحظيًا" },
  ],
  [
    "Early payment discount capture",
    { zh: "捕获提前付款折扣", es: "Captura de descuentos por pago anticipado", ja: "早期支払い割引の取得", de: "Nutzung von Skonti bei vorzeitiger Zahlung", fr: "Capture des remises pour paiement anticipé", ko: "조기 결제 할인 포착", pt: "Captura de desconto por pagamento antecipado", it: "Acquisizione sconti per pagamento anticipato", ar: "الاستفادة من خصومات الدفع المبكر" },
  ],
  [
    "Invoice Capture",
    { zh: "发票采集", es: "Captura de facturas", ja: "請求書取り込み", de: "Rechnungserfassung", fr: "Capture des factures", ko: "송장 캡처", pt: "Captura de faturas", it: "Acquisizione fatture", ar: "التقاط الفواتير" },
  ],
  [
    "Ingest supplier invoices automatically.",
    { zh: "自动导入供应商发票。", es: "Ingiere facturas de proveedores automáticamente.", ja: "サプライヤー請求書を自動取り込みします。", de: "Lieferantenrechnungen automatisch erfassen.", fr: "Ingestione automatique des factures fournisseurs.", ko: "공급업체 송장을 자동으로 수집합니다.", pt: "Ingerir faturas de fornecedores automaticamente.", it: "Acquisisci automaticamente le fatture fornitore.", ar: "استوعب فواتير الموردين تلقائيًا." },
  ],
  [
    "3-Way Match",
    { zh: "三方匹配", es: "Conciliación 3 vías", ja: "3-way 照合", de: "3-Wege-Abgleich", fr: "Rapprochement 3 voies", ko: "3-way 매칭", pt: "Conferência 3 vias", it: "Match a 3 vie", ar: "مطابقة ثلاثية" },
  ],
  [
    "Validate invoice against PO, GR and contract terms.",
    { zh: "根据 PO、GR 和合同条款验证发票。", es: "Valida la factura contra PO, GR y términos contractuales.", ja: "PO、GR、契約条件に対して請求書を検証します。", de: "Rechnung gegen PO, GR und Vertragsbedingungen prüfen.", fr: "Validez la facture avec le PO, le GR et les conditions contractuelles.", ko: "PO, GR 및 계약 조건과 송장을 검증합니다.", pt: "Valide a fatura contra PO, GR e termos contratuais.", it: "Valida la fattura rispetto a PO, GR e termini contrattuali.", ar: "تحقق من الفاتورة مقابل PO و GR وشروط العقد." },
  ],
  [
    "Payments",
    { zh: "付款", es: "Pagos", ja: "支払い", de: "Zahlungen", fr: "Paiements", ko: "결제", pt: "Pagamentos", it: "Pagamenti", ar: "المدفوعات" },
  ],
  [
    "Release controlled payments once matched.",
    { zh: "匹配完成后释放受控付款。", es: "Libera pagos controlados una vez conciliados.", ja: "照合完了後に管理された支払いをリリースします。", de: "Kontrollierte Zahlungen nach erfolgreichem Abgleich freigeben.", fr: "Débloquez des paiements contrôlés une fois rapprochés.", ko: "매칭 완료 후 통제된 결제를 릴리스합니다.", pt: "Libere pagamentos controlados após a conferência.", it: "Rilascia pagamenti controllati dopo il match.", ar: "أطلق المدفوعات المضبوطة بعد المطابقة." },
  ],
  [
    "Audit Trail",
    { zh: "审计追踪", es: "Pista de auditoría", ja: "監査証跡", de: "Audit-Trail", fr: "Piste d'audit", ko: "감사 추적", pt: "Trilha de auditoria", it: "Audit trail", ar: "مسار التدقيق" },
  ],
  [
    "Full immutable history of every action.",
    { zh: "每个操作的完整不可变历史。", es: "Historial completo e inmutable de cada acción.", ja: "すべての操作の完全で変更不可の履歴。", de: "Vollständige unveränderliche Historie jeder Aktion.", fr: "Historique complet et immuable de chaque action.", ko: "모든 작업의 완전한 불변 기록.", pt: "Histórico completo e imutável de cada ação.", it: "Cronologia completa e immutabile di ogni azione.", ar: "سجل كامل غير قابل للتغيير لكل إجراء." },
  ],
  [
    "Analytics",
    { zh: "分析", es: "Analítica", ja: "分析", de: "Analytik", fr: "Analytique", ko: "분석", pt: "Analytics", it: "Analytics", ar: "التحليلات" },
  ],
  [
    "API / MCP",
    { zh: "API / MCP", es: "API / MCP", ja: "API / MCP", de: "API / MCP", fr: "API / MCP", ko: "API / MCP", pt: "API / MCP", it: "API / MCP", ar: "API / MCP" },
  ],
  [
    "FactWise capability — REST APIs + MCP so AI agents can query and act on every module.",
    { zh: "FactWise 能力：REST API + MCP，让 AI 代理可查询并操作每个模块。", es: "Capacidad de FactWise: REST APIs + MCP para que agentes de IA consulten y actúen en cada módulo.", ja: "FactWise 機能：REST API + MCP により、AI エージェントが各モジュールを照会・操作できます。", de: "FactWise-Funktion: REST APIs + MCP, damit KI-Agenten jedes Modul abfragen und Aktionen ausführen können.", fr: "Fonction FactWise : REST APIs + MCP pour que les agents IA interrogent et agissent sur chaque module.", ko: "FactWise 기능: REST API + MCP로 AI 에이전트가 모든 모듈을 조회하고 실행할 수 있습니다.", pt: "Recurso FactWise: REST APIs + MCP para agentes de IA consultarem e agirem em cada módulo.", it: "Funzionalità FactWise: REST API + MCP affinché gli agenti IA possano interrogare e agire su ogni modulo.", ar: "قدرة FactWise: واجهات REST API + MCP حتى يتمكن وكلاء الذكاء الاصطناعي من الاستعلام والتنفيذ على كل وحدة." },
  ],
];

const landingAnimationSupplementEntries: Array<[string, TranslationSet]> = [
  [
    "One workspace",
    { zh: "一个工作区", es: "Un espacio de trabajo", ja: "1 つのワークスペース", de: "Ein Arbeitsbereich", fr: "Un espace de travail", ko: "하나의 워크스페이스", pt: "Um espaço de trabalho", it: "Un unico workspace", ar: "مساحة عمل واحدة" },
  ],
  [
    "Live · in real time",
    { zh: "实时运行", es: "En vivo · en tiempo real", ja: "ライブ · リアルタイム", de: "Live · in Echtzeit", fr: "En direct · en temps réel", ko: "라이브 · 실시간", pt: "Ao vivo · em tempo real", it: "Live · in tempo reale", ar: "مباشر · في الوقت الفعلي" },
  ],
  [
    "Target ₹4.95L",
    { zh: "目标 ₹4.95L", es: "Objetivo ₹4.95L", ja: "目標 ₹4.95L", de: "Ziel ₹4.95L", fr: "Objectif ₹4.95L", ko: "목표 ₹4.95L", pt: "Meta ₹4.95L", it: "Target ₹4.95L", ar: "الهدف ₹4.95L" },
  ],
  [
    "3 bids in",
    { zh: "已收到 3 个报价", es: "3 ofertas recibidas", ja: "3 件の入札を受領", de: "3 Angebote eingegangen", fr: "3 offres reçues", ko: "입찰 3건 접수", pt: "3 propostas recebidas", it: "3 offerte ricevute", ar: "تم استلام 3 عروض" },
  ],
  [
    "Autobot",
    { zh: "自动助手", es: "Asistente automático", ja: "自動ボット", de: "Autobot", fr: "Assistant automatique", ko: "자동 봇", pt: "Assistente automático", it: "Autobot", ar: "المساعد الآلي" },
  ],
  [
    "Counter at",
    { zh: "还价为", es: "Contraoferta en", ja: "対案は", de: "Gegenangebot bei", fr: "Contre-offre à", ko: "역제안", pt: "Contraproposta em", it: "Controproposta a", ar: "عرض مقابل عند" },
  ],
  [
    "FOB Mumbai.",
    { zh: "孟买 FOB。", es: "FOB Mumbai.", ja: "FOB ムンバイ。", de: "FOB Mumbai.", fr: "FOB Mumbai.", ko: "FOB 뭄바이.", pt: "FOB Mumbai.", it: "FOB Mumbai.", ar: "FOB مومباي." },
  ],
  [
    "−4.6% vs target",
    { zh: "较目标低 −4.6%", es: "−4,6 % vs objetivo", ja: "目標比 −4.6%", de: "−4,6 % ggü. Ziel", fr: "−4,6 % vs objectif", ko: "목표 대비 −4.6%", pt: "−4,6% vs meta", it: "−4,6% vs target", ar: "−4.6% مقابل الهدف" },
  ],
  [
    "A · low",
    { zh: "A · 低", es: "A · bajo", ja: "A · 低", de: "A · niedrig", fr: "A · faible", ko: "A · 낮음", pt: "A · baixo", it: "A · basso", ar: "A · منخفض" },
  ],
  [
    "Mumbai · 14 days",
    { zh: "孟买 · 14 天", es: "Mumbai · 14 días", ja: "ムンバイ · 14 日", de: "Mumbai · 14 Tage", fr: "Mumbai · 14 jours", ko: "뭄바이 · 14일", pt: "Mumbai · 14 dias", it: "Mumbai · 14 giorni", ar: "مومباي · 14 يوما" },
  ],
  [
    "Net 30 · 3-way match",
    { zh: "30 天账期 · 三方匹配", es: "Net 30 · conciliación de 3 vías", ja: "Net 30 · 3-way 照合", de: "Netto 30 · 3-Wege-Abgleich", fr: "Net 30 · rapprochement 3 voies", ko: "Net 30 · 3-way 매칭", pt: "Net 30 · conferência 3 vias", it: "Net 30 · match a 3 vie", ar: "صافي 30 · مطابقة ثلاثية" },
  ],
  [
    "From ACME Mfg · raised in FactWise",
    { zh: "来自 ACME Mfg · 在 FactWise 中创建", es: "De ACME Mfg · creada en FactWise", ja: "ACME Mfg から · FactWise で作成", de: "Von ACME Mfg · in FactWise erstellt", fr: "Depuis ACME Mfg · créée dans FactWise", ko: "ACME Mfg 발행 · FactWise에서 생성", pt: "De ACME Mfg · criada no FactWise", it: "Da ACME Mfg · creata in FactWise", ar: "من ACME Mfg · تم إنشاؤها في FactWise" },
  ],
  [
    "Settled · UTR-77410",
    { zh: "已结算 · UTR-77410", es: "Liquidado · UTR-77410", ja: "決済済み · UTR-77410", de: "Beglichen · UTR-77410", fr: "Réglé · UTR-77410", ko: "정산 완료 · UTR-77410", pt: "Liquidado · UTR-77410", it: "Regolato · UTR-77410", ar: "تمت التسوية · UTR-77410" },
  ],
  [
    "REQ → PAID · 6 days",
    { zh: "REQ → 已付款 · 6 天", es: "REQ → pagado · 6 días", ja: "REQ → 支払済み · 6 日", de: "REQ → bezahlt · 6 Tage", fr: "REQ → payé · 6 jours", ko: "REQ → 지급 완료 · 6일", pt: "REQ → pago · 6 dias", it: "REQ → pagato · 6 giorni", ar: "REQ → مدفوع · 6 أيام" },
  ],
  [
    "↻ loop",
    { zh: "↻ 循环", es: "↻ ciclo", ja: "↻ ループ", de: "↻ Schleife", fr: "↻ boucle", ko: "↻ 루프", pt: "↻ ciclo", it: "↻ ciclo", ar: "↻ دورة" },
  ],
];

const animationAndCaseStudyEntries: Array<[string, TranslationSet]> = [
  [
    "Real-time bid intelligence and historical pricing.",
    { zh: "实时投标智能与历史价格。", es: "Inteligencia de ofertas en tiempo real y precios históricos.", ja: "リアルタイム入札インテリジェンスと履歴価格。", de: "Echtzeit-Angebotsintelligenz und historische Preise.", fr: "Intelligence des offres en temps réel et historique des prix.", ko: "실시간 입찰 인텔리전스와 과거 가격.", pt: "Inteligência de propostas em tempo real e preços históricos.", it: "Intelligence offerte in tempo reale e prezzi storici.", ar: "ذكاء العطاءات في الوقت الفعلي والأسعار التاريخية." },
  ],
  [
    "Live KPIs and spend visibility for stakeholders.",
    { zh: "为相关方提供实时 KPI 和支出可视化。", es: "KPI en vivo y visibilidad del gasto para los interesados.", ja: "関係者向けのライブ KPI と支出可視化。", de: "Live-KPIs und Ausgabentransparenz für Stakeholder.", fr: "KPI en direct et visibilité des dépenses pour les parties prenantes.", ko: "이해관계자를 위한 실시간 KPI와 지출 가시성.", pt: "KPIs ao vivo e visibilidade de gastos para stakeholders.", it: "KPI live e visibilità della spesa per gli stakeholder.", ar: "مؤشرات KPI مباشرة ورؤية للإنفاق لأصحاب المصلحة." },
  ],
  [
    "Each module, each role, each permission — kept in context.",
    { zh: "每个模块、每个角色、每项权限都保留在业务上下文中。", es: "Cada módulo, cada rol y cada permiso se mantienen en contexto.", ja: "各モジュール、各ロール、各権限を文脈の中で管理。", de: "Jedes Modul, jede Rolle, jede Berechtigung bleibt im Kontext.", fr: "Chaque module, chaque rôle, chaque permission reste dans son contexte.", ko: "각 모듈, 역할, 권한이 모두 맥락 안에서 유지됩니다.", pt: "Cada módulo, função e permissão permanece no contexto.", it: "Ogni modulo, ruolo e autorizzazione resta nel contesto.", ar: "كل وحدة وكل دور وكل صلاحية تبقى ضمن السياق." },
  ],
  [
    "Vendors bid, raise invoices, and track payments inside.",
    { zh: "供应商可在平台内投标、开票并跟踪付款。", es: "Los proveedores ofertan, emiten facturas y rastrean pagos dentro de la plataforma.", ja: "ベンダーは同じ環境内で入札、請求、支払い追跡ができます。", de: "Lieferanten bieten, stellen Rechnungen und verfolgen Zahlungen direkt in der Plattform.", fr: "Les fournisseurs soumettent leurs offres, émettent leurs factures et suivent les paiements dans la plateforme.", ko: "공급업체는 플랫폼 안에서 입찰하고 송장을 발행하며 결제를 추적합니다.", pt: "Fornecedores enviam propostas, emitem faturas e acompanham pagamentos dentro da plataforma.", it: "I fornitori offrono, emettono fatture e tracciano i pagamenti nella piattaforma.", ar: "يقدم الموردون العطاءات ويصدرون الفواتير ويتتبعون المدفوعات داخل المنصة." },
  ],
  [
    "More vendors. More items. Same effort.",
    { zh: "更多供应商，更多物料，同样的工作量。", es: "Más proveedores. Más artículos. El mismo esfuerzo.", ja: "ベンダーが増えても、品目が増えても、同じ負荷で対応。", de: "Mehr Lieferanten. Mehr Artikel. Gleicher Aufwand.", fr: "Plus de fournisseurs. Plus d'articles. Le même effort.", ko: "더 많은 공급업체와 품목도 같은 노력으로.", pt: "Mais fornecedores. Mais itens. O mesmo esforço.", it: "Più fornitori. Più articoli. Stesso effort.", ar: "موردون أكثر. أصناف أكثر. نفس الجهد." },
  ],
  [
    "Profit increase",
    { zh: "利润提升", es: "Aumento de ganancias", ja: "利益向上", de: "Gewinnsteigerung", fr: "Hausse du profit", ko: "이익 증가", pt: "Aumento do lucro", it: "Aumento profitto", ar: "زيادة الأرباح" },
  ],
  [
    "Process speed",
    { zh: "流程速度", es: "Velocidad del proceso", ja: "処理速度", de: "Prozessgeschwindigkeit", fr: "Vitesse du processus", ko: "프로세스 속도", pt: "Velocidade do processo", it: "Velocità processo", ar: "سرعة العملية" },
  ],
  [
    "Cost saved",
    { zh: "节省成本", es: "Costo ahorrado", ja: "削減コスト", de: "Eingesparte Kosten", fr: "Coûts économisés", ko: "절감 비용", pt: "Custo economizado", it: "Costi risparmiati", ar: "التكلفة الموفرة" },
  ],
  [
    "ROI achieved",
    { zh: "实现 ROI", es: "ROI logrado", ja: "達成 ROI", de: "Erreichter ROI", fr: "ROI obtenu", ko: "달성한 ROI", pt: "ROI alcançado", it: "ROI ottenuto", ar: "العائد المحقق" },
  ],
  [
    "Accuracy",
    { zh: "准确率", es: "Precisión", ja: "精度", de: "Genauigkeit", fr: "Précision", ko: "정확도", pt: "Precisão", it: "Accuratezza", ar: "الدقة" },
  ],
  [
    "Faster quoting",
    { zh: "报价更快", es: "Cotización más rápida", ja: "見積の高速化", de: "Schnellere Angebotserstellung", fr: "Devis plus rapides", ko: "더 빠른 견적", pt: "Cotações mais rápidas", it: "Preventivi più rapidi", ar: "عروض أسعار أسرع" },
  ],
  [
    "Error reduction",
    { zh: "错误减少", es: "Reducción de errores", ja: "エラー削減", de: "Fehlerreduzierung", fr: "Réduction des erreurs", ko: "오류 감소", pt: "Redução de erros", it: "Riduzione errori", ar: "تقليل الأخطاء" },
  ],
  [
    "Cycle reduction",
    { zh: "周期缩短", es: "Reducción del ciclo", ja: "サイクル短縮", de: "Zyklusverkürzung", fr: "Réduction du cycle", ko: "주기 단축", pt: "Redução do ciclo", it: "Riduzione ciclo", ar: "تقليل الدورة" },
  ],
  [
    "Cost savings",
    { zh: "成本节省", es: "Ahorros de costos", ja: "コスト削減", de: "Kosteneinsparungen", fr: "Économies de coûts", ko: "비용 절감", pt: "Economia de custos", it: "Risparmi sui costi", ar: "وفورات التكلفة" },
  ],
  [
    "8 min read",
    { zh: "阅读 8 分钟", es: "Lectura de 8 min", ja: "8分で読めます", de: "8 Min. Lesezeit", fr: "8 min de lecture", ko: "8분 읽기", pt: "Leitura de 8 min", it: "Lettura 8 min", ar: "قراءة 8 دقائق" },
  ],
  [
    "5 min read",
    { zh: "阅读 5 分钟", es: "Lectura de 5 min", ja: "5分で読めます", de: "5 Min. Lesezeit", fr: "5 min de lecture", ko: "5분 읽기", pt: "Leitura de 5 min", it: "Lettura 5 min", ar: "قراءة 5 دقائق" },
  ],
  [
    "6 min read",
    { zh: "阅读 6 分钟", es: "Lectura de 6 min", ja: "6分で読めます", de: "6 Min. Lesezeit", fr: "6 min de lecture", ko: "6분 읽기", pt: "Leitura de 6 min", it: "Lettura 6 min", ar: "قراءة 6 دقائق" },
  ],
  [
    "7 min read",
    { zh: "阅读 7 分钟", es: "Lectura de 7 min", ja: "7分で読めます", de: "7 Min. Lesezeit", fr: "7 min de lecture", ko: "7분 읽기", pt: "Leitura de 7 min", it: "Lettura 7 min", ar: "قراءة 7 دقائق" },
  ],
  [
    "Electronics manufacturing",
    { zh: "电子制造", es: "Fabricación electrónica", ja: "電子機器製造", de: "Elektronikfertigung", fr: "Fabrication électronique", ko: "전자 제조", pt: "Manufatura eletrônica", it: "Produzione elettronica", ar: "تصنيع الإلكترونيات" },
  ],
  [
    "Automotive components",
    { zh: "汽车零部件", es: "Componentes automotrices", ja: "自動車部品", de: "Automobilkomponenten", fr: "Composants automobiles", ko: "자동차 부품", pt: "Componentes automotivos", it: "Componenti automotive", ar: "مكونات السيارات" },
  ],
  [
    "Maintenance & Operations",
    { zh: "维护与运营", es: "Mantenimiento y operaciones", ja: "保全・運用", de: "Wartung und Betrieb", fr: "Maintenance et opérations", ko: "유지보수 및 운영", pt: "Manutenção e operações", it: "Manutenzione e operations", ar: "الصيانة والعمليات" },
  ],
  [
    "Global Supply Chain",
    { zh: "全球供应链", es: "Cadena de suministro global", ja: "グローバルサプライチェーン", de: "Globale Lieferkette", fr: "Chaîne d'approvisionnement mondiale", ko: "글로벌 공급망", pt: "Cadeia de suprimentos global", it: "Supply chain globale", ar: "سلسلة التوريد العالمية" },
  ],
  [
    "MRO",
    { zh: "MRO", es: "MRO", ja: "MRO", de: "MRO", fr: "MRO", ko: "MRO", pt: "MRO", it: "MRO", ar: "MRO" },
  ],
  [
    "Achieved 3% annual profit increase by automating multi-currency RfQs and sourcing workflows",
    { zh: "通过自动化多币种 RFQ 和寻源流程，实现年度利润提升 3%", es: "Logró un aumento anual de ganancias del 3% automatizando RFQ multidivisa y flujos de sourcing", ja: "多通貨 RFQ とソーシング業務を自動化し、年間利益を 3% 向上", de: "3 % jährliche Gewinnsteigerung durch automatisierte mehrwährungsfähige RFQs und Sourcing-Workflows", fr: "A obtenu 3 % de profit annuel en plus grâce à l'automatisation des RFQ multidevises et du sourcing", ko: "다중 통화 RFQ와 소싱 워크플로 자동화로 연간 이익 3% 증가 달성", pt: "Alcançou aumento anual de lucro de 3% automatizando RFQs multimoeda e fluxos de sourcing", it: "Ha ottenuto un aumento annuo del profitto del 3% automatizzando RFQ multivaluta e flussi di sourcing", ar: "حقق زيادة سنوية في الأرباح بنسبة 3% عبر أتمتة RFQ متعددة العملات وسير عمل التوريد" },
  ],
  [
    "Enabled 18x ROI within the first year by automating complex landed cost calculations",
    { zh: "通过自动化复杂到岸成本计算，在第一年实现 18 倍 ROI", es: "Habilitó un ROI de 18x en el primer año automatizando cálculos complejos de costo landed", ja: "複雑な landed cost 計算を自動化し、初年度に 18 倍の ROI を実現", de: "18-fachen ROI im ersten Jahr durch Automatisierung komplexer Landed-Cost-Berechnungen ermöglicht", fr: "A permis un ROI de 18x dès la première année en automatisant les calculs complexes de coût rendu", ko: "복잡한 landed cost 계산 자동화로 첫해 18배 ROI 달성", pt: "Gerou ROI de 18x no primeiro ano automatizando cálculos complexos de custo landed", it: "Ha generato un ROI di 18x nel primo anno automatizzando calcoli complessi di landed cost", ar: "حقق عائدا 18x في السنة الأولى عبر أتمتة حسابات التكلفة landed المعقدة" },
  ],
  [
    "Streamlined manual quoting workflows into a high-speed automated multi-currency process",
    { zh: "将手工报价流程简化为高速自动化的多币种流程", es: "Transformó flujos manuales de cotización en un proceso automatizado multidivisa de alta velocidad", ja: "手作業の見積ワークフローを高速な多通貨自動プロセスへ刷新", de: "Manuelle Angebotsworkflows in einen schnellen automatisierten Mehrwährungsprozess überführt", fr: "A transformé les devis manuels en un processus multidevise automatisé et rapide", ko: "수동 견적 워크플로를 고속 자동 다중 통화 프로세스로 전환", pt: "Transformou cotações manuais em um processo automatizado multimoeda de alta velocidade", it: "Ha trasformato i preventivi manuali in un processo multivaluta automatizzato e veloce", ar: "حوّل عمليات عروض الأسعار اليدوية إلى عملية آلية متعددة العملات وسريعة" },
  ],
  [
    "Reduced procurement cycle time by 60% with automated index based pricing",
    { zh: "通过自动化指数定价，将采购周期缩短 60%", es: "Redujo el ciclo de compras en 60% con precios automatizados basados en índices", ja: "自動化された指数連動価格により、調達サイクルを 60% 短縮", de: "Beschaffungszyklus durch automatisierte indexbasierte Preisgestaltung um 60 % reduziert", fr: "A réduit le cycle d'achat de 60 % grâce à une tarification indexée automatisée", ko: "자동 인덱스 기반 가격 책정으로 조달 주기를 60% 단축", pt: "Reduziu o ciclo de compras em 60% com precificação automatizada baseada em índice", it: "Ha ridotto del 60% il ciclo procurement con prezzi indicizzati automatizzati", ar: "قلل دورة المشتريات بنسبة 60% من خلال تسعير آلي قائم على المؤشرات" },
  ],
  [
    "Decision Intelligence",
    { zh: "决策智能", es: "Inteligencia de decisión", ja: "意思決定インテリジェンス", de: "Entscheidungsintelligenz", fr: "Intelligence décisionnelle", ko: "의사결정 인텔리전스", pt: "Inteligência de decisão", it: "Intelligence decisionale", ar: "ذكاء القرار" },
  ],
  [
    "The Right Data at Every Decision Point",
    { zh: "在每个决策点提供正确数据", es: "Los datos correctos en cada punto de decisión", ja: "すべての意思決定ポイントに正しいデータを", de: "Die richtigen Daten an jedem Entscheidungspunkt", fr: "Les bonnes données à chaque point de décision", ko: "모든 의사결정 지점에 올바른 데이터", pt: "Os dados certos em cada ponto de decisão", it: "I dati giusti in ogni punto decisionale", ar: "البيانات الصحيحة عند كل نقطة قرار" },
  ],
  [
    "Live Engine",
    { zh: "实时引擎", es: "Motor en vivo", ja: "ライブエンジン", de: "Live-Engine", fr: "Moteur en direct", ko: "라이브 엔진", pt: "Motor ao vivo", it: "Motore live", ar: "محرك مباشر" },
  ],
  [
    "Live Margin KPIs",
    { zh: "实时利润率 KPI", es: "KPI de margen en vivo", ja: "ライブ利益率 KPI", de: "Live-Margen-KPIs", fr: "KPI de marge en direct", ko: "실시간 마진 KPI", pt: "KPIs de margem ao vivo", it: "KPI margine live", ar: "مؤشرات هامش مباشرة" },
  ],
  [
    "Margin Focus",
    { zh: "利润率重点", es: "Foco en margen", ja: "利益率重視", de: "Margenfokus", fr: "Priorité marge", ko: "마진 집중", pt: "Foco na margem", it: "Focus margine", ar: "تركيز الهامش" },
  ],
  [
    "Cycle Time",
    { zh: "周期时间", es: "Tiempo de ciclo", ja: "サイクルタイム", de: "Durchlaufzeit", fr: "Temps de cycle", ko: "주기 시간", pt: "Tempo de ciclo", it: "Tempo ciclo", ar: "زمن الدورة" },
  ],
  [
    "PO Accuracy",
    { zh: "PO 准确率", es: "Precisión de PO", ja: "PO 精度", de: "PO-Genauigkeit", fr: "Précision des PO", ko: "PO 정확도", pt: "Precisão de PO", it: "Accuratezza PO", ar: "دقة PO" },
  ],
  [
    "Spend / SKU",
    { zh: "每 SKU 支出", es: "Gasto / SKU", ja: "SKU あたり支出", de: "Ausgaben / SKU", fr: "Dépense / SKU", ko: "SKU당 지출", pt: "Gasto / SKU", it: "Spesa / SKU", ar: "الإنفاق / SKU" },
  ],
  [
    "Price",
    { zh: "价格", es: "Precio", ja: "価格", de: "Preis", fr: "Prix", ko: "가격", pt: "Preço", it: "Prezzo", ar: "السعر" },
  ],
  [
    "Quantity",
    { zh: "数量", es: "Cantidad", ja: "数量", de: "Menge", fr: "Quantité", ko: "수량", pt: "Quantidade", it: "Quantità", ar: "الكمية" },
  ],
  [
    "Quality",
    { zh: "质量", es: "Calidad", ja: "品質", de: "Qualität", fr: "Qualité", ko: "품질", pt: "Qualidade", it: "Qualità", ar: "الجودة" },
  ],
  [
    "Risk",
    { zh: "风险", es: "Riesgo", ja: "リスク", de: "Risiko", fr: "Risque", ko: "리스크", pt: "Risco", it: "Rischio", ar: "المخاطر" },
  ],
  [
    "YTD Spend",
    { zh: "年初至今支出", es: "Gasto YTD", ja: "年初来支出", de: "Ausgaben YTD", fr: "Dépenses YTD", ko: "연초 이후 지출", pt: "Gasto YTD", it: "Spesa YTD", ar: "الإنفاق منذ بداية العام" },
  ],
  [
    "Direct Materials",
    { zh: "直接材料", es: "Materiales directos", ja: "直接材料", de: "Direkte Materialien", fr: "Matières directes", ko: "직접 자재", pt: "Materiais diretos", it: "Materiali diretti", ar: "مواد مباشرة" },
  ],
  [
    "Indirect Materials",
    { zh: "间接材料", es: "Materiales indirectos", ja: "間接材料", de: "Indirekte Materialien", fr: "Matières indirectes", ko: "간접 자재", pt: "Materiais indiretos", it: "Materiali indiretti", ar: "مواد غير مباشرة" },
  ],
  [
    "Logistics",
    { zh: "物流", es: "Logística", ja: "物流", de: "Logistik", fr: "Logistique", ko: "물류", pt: "Logística", it: "Logistica", ar: "اللوجستيات" },
  ],
  [
    "Operations",
    { zh: "运营", es: "Operaciones", ja: "運用", de: "Betrieb", fr: "Opérations", ko: "운영", pt: "Operações", it: "Operations", ar: "العمليات" },
  ],
  [
    "Recommend",
    { zh: "推荐", es: "Recomendar", ja: "推奨", de: "Empfehlen", fr: "Recommander", ko: "추천", pt: "Recomendar", it: "Consiglia", ar: "توصية" },
  ],
  [
    "Confidence Signal",
    { zh: "置信信号", es: "Señal de confianza", ja: "信頼度シグナル", de: "Vertrauenssignal", fr: "Signal de confiance", ko: "신뢰 신호", pt: "Sinal de confiança", it: "Segnale di confidenza", ar: "إشارة الثقة" },
  ],
  [
    "Award Bharat Steel",
    { zh: "授予 Bharat Steel", es: "Adjudicar a Bharat Steel", ja: "Bharat Steel に発注", de: "Bharat Steel beauftragen", fr: "Attribuer à Bharat Steel", ko: "Bharat Steel에 낙찰", pt: "Adjudicar à Bharat Steel", it: "Assegna a Bharat Steel", ar: "إرساء العقد على Bharat Steel" },
  ],
  [
    "BOM Explorer · RFQ",
    { zh: "BOM 浏览器 · RFQ", es: "Explorador BOM · RFQ", ja: "BOM エクスプローラー · RFQ", de: "BOM-Explorer · RFQ", fr: "Explorateur BOM · RFQ", ko: "BOM 탐색기 · RFQ", pt: "Explorador de BOM · RFQ", it: "Esploratore BOM · RFQ", ar: "مستكشف BOM · RFQ" },
  ],
  [
    "Multi-level · Sub-BOMs · At any scale",
    { zh: "多层级 · 子 BOM · 任意规模", es: "Multinivel · Sub-BOM · A cualquier escala", ja: "多階層 · サブ BOM · どの規模にも対応", de: "Mehrstufig · Sub-BOMs · In jeder Größenordnung", fr: "Multi-niveaux · Sous-BOM · À toute échelle", ko: "다단계 · 하위 BOM · 모든 규모", pt: "Multinível · Sub-BOMs · Em qualquer escala", it: "Multilivello · Sub-BOM · A qualsiasi scala", ar: "متعدد المستويات · BOM فرعية · بأي نطاق" },
  ],
  [
    "Level 1 — Sub-Assemblies",
    { zh: "第 1 层 — 子组件", es: "Nivel 1 — Subensambles", ja: "レベル 1 — サブアセンブリ", de: "Ebene 1 — Unterbaugruppen", fr: "Niveau 1 — Sous-ensembles", ko: "레벨 1 — 하위 조립품", pt: "Nível 1 — Subconjuntos", it: "Livello 1 — Sottoassiemi", ar: "المستوى 1 — تجميعات فرعية" },
  ],
  [
    "Level 2 — Sub-BOM",
    { zh: "第 2 层 — 子 BOM", es: "Nivel 2 — Sub-BOM", ja: "レベル 2 — サブ BOM", de: "Ebene 2 — Sub-BOM", fr: "Niveau 2 — Sous-BOM", ko: "레벨 2 — 하위 BOM", pt: "Nível 2 — Sub-BOM", it: "Livello 2 — Sub-BOM", ar: "المستوى 2 — BOM فرعية" },
  ],
  [
    "Level 3 — Sub-Sub-BOM",
    { zh: "第 3 层 — 子子 BOM", es: "Nivel 3 — Sub-sub-BOM", ja: "レベル 3 — サブサブ BOM", de: "Ebene 3 — Sub-Sub-BOM", fr: "Niveau 3 — Sous-sous-BOM", ko: "레벨 3 — 하위-하위 BOM", pt: "Nível 3 — Sub-sub-BOM", it: "Livello 3 — Sub-sub-BOM", ar: "المستوى 3 — BOM فرعية إضافية" },
  ],
  [
    "RFQ · Multi-Plant Merge",
    { zh: "RFQ · 多工厂合并", es: "RFQ · Fusión multi-planta", ja: "RFQ · 複数工場合算", de: "RFQ · Mehrwerk-Zusammenführung", fr: "RFQ · Fusion multi-sites", ko: "RFQ · 다중 공장 병합", pt: "RFQ · Mescla multi-planta", it: "RFQ · Unione multi-stabilimento", ar: "RFQ · دمج عدة مصانع" },
  ],
  [
    "3000 items",
    { zh: "3000 个物料", es: "3000 artículos", ja: "3000 品目", de: "3000 Artikel", fr: "3000 articles", ko: "3000개 품목", pt: "3000 itens", it: "3000 articoli", ar: "3000 صنف" },
  ],
  [
    "100 vendors",
    { zh: "100 家供应商", es: "100 proveedores", ja: "100 社のベンダー", de: "100 Lieferanten", fr: "100 fournisseurs", ko: "100개 공급업체", pt: "100 fornecedores", it: "100 fornitori", ar: "100 مورد" },
  ],
  [
    "At any scale",
    { zh: "任意规模", es: "A cualquier escala", ja: "どの規模にも対応", de: "In jeder Größenordnung", fr: "À toute échelle", ko: "모든 규모에서", pt: "Em qualquer escala", it: "A qualsiasi scala", ar: "بأي نطاق" },
  ],
  [
    "Tier-1 OEM · Production unit",
    { zh: "一级 OEM · 生产单元", es: "OEM Tier-1 · Unidad de producción", ja: "Tier-1 OEM · 生産ユニット", de: "Tier-1-OEM · Produktionseinheit", fr: "OEM Tier-1 · Unité de production", ko: "Tier-1 OEM · 생산 단위", pt: "OEM Tier-1 · Unidade de produção", it: "OEM Tier-1 · Unità produttiva", ar: "OEM من المستوى الأول · وحدة إنتاج" },
  ],
  [
    "Levels",
    { zh: "层级", es: "Niveles", ja: "階層", de: "Ebenen", fr: "Niveaux", ko: "레벨", pt: "Níveis", it: "Livelli", ar: "مستويات" },
  ],
  [
    "Parts",
    { zh: "零件", es: "Piezas", ja: "部品", de: "Teile", fr: "Pièces", ko: "부품", pt: "Peças", it: "Parti", ar: "أجزاء" },
  ],
  [
    "Vendors",
    { zh: "供应商", es: "Proveedores", ja: "ベンダー", de: "Lieferanten", fr: "Fournisseurs", ko: "공급업체", pt: "Fornecedores", it: "Fornitori", ar: "الموردون" },
  ],
  [
    "3 plants · 100 vendors",
    { zh: "3 个工厂 · 100 家供应商", es: "3 plantas · 100 proveedores", ja: "3 工場 · 100 社のベンダー", de: "3 Werke · 100 Lieferanten", fr: "3 sites · 100 fournisseurs", ko: "3개 공장 · 100개 공급업체", pt: "3 plantas · 100 fornecedores", it: "3 stabilimenti · 100 fornitori", ar: "3 مصانع · 100 مورد" },
  ],
  [
    "Leverage",
    { zh: "议价杠杆", es: "Apalancamiento", ja: "交渉力", de: "Hebelwirkung", fr: "Levier", ko: "협상 레버리지", pt: "Alavancagem", it: "Leva negoziale", ar: "قوة تفاوضية" },
  ],
  [
    "Bid Analysis — Steel Pipes RFQ",
    { zh: "投标分析 — 钢管 RFQ", es: "Análisis de ofertas — RFQ de tubos de acero", ja: "入札分析 — 鋼管 RFQ", de: "Angebotsanalyse — RFQ für Stahlrohre", fr: "Analyse des offres — RFQ tubes acier", ko: "입찰 분석 — 강관 RFQ", pt: "Análise de propostas — RFQ de tubos de aço", it: "Analisi offerte — RFQ tubi in acciaio", ar: "تحليل العطاءات — RFQ أنابيب فولاذية" },
  ],
  [
    "3 vendors · comparing total landed cost",
    { zh: "3 家供应商 · 对比总到岸成本", es: "3 proveedores · comparando costo landed total", ja: "3 社のベンダー · 総 landed cost を比較", de: "3 Lieferanten · Vergleich der gesamten Landed Costs", fr: "3 fournisseurs · comparaison du coût rendu total", ko: "3개 공급업체 · 총 landed cost 비교", pt: "3 fornecedores · comparando custo landed total", it: "3 fornitori · confronto del landed cost totale", ar: "3 موردين · مقارنة إجمالي التكلفة landed" },
  ],
  [
    "Create Formula",
    { zh: "创建公式", es: "Crear fórmula", ja: "数式を作成", de: "Formel erstellen", fr: "Créer une formule", ko: "공식 만들기", pt: "Criar fórmula", it: "Crea formula", ar: "إنشاء معادلة" },
  ],
  [
    "Looks cheapest",
    { zh: "看起来最便宜", es: "Parece más barato", ja: "一見最安", de: "Wirkt am günstigsten", fr: "Semble le moins cher", ko: "가장 저렴해 보임", pt: "Parece mais barato", it: "Sembra più economico", ar: "يبدو الأرخص" },
  ],
  [
    "✓ True Best",
    { zh: "✓ 真正最优", es: "✓ Mejor real", ja: "✓ 真の最適", de: "✓ Wirklich am besten", fr: "✓ Vraiment le meilleur", ko: "✓ 실제 최적", pt: "✓ Melhor real", it: "✓ Vero migliore", ar: "✓ الأفضل فعليا" },
  ],
  [
    "Hidden costs",
    { zh: "隐藏成本", es: "Costos ocultos", ja: "隠れコスト", de: "Versteckte Kosten", fr: "Coûts cachés", ko: "숨은 비용", pt: "Custos ocultos", it: "Costi nascosti", ar: "تكاليف مخفية" },
  ],
  [
    "Formula Builder · Total Landed Cost",
    { zh: "公式构建器 · 总到岸成本", es: "Constructor de fórmulas · Costo landed total", ja: "数式ビルダー · 総 landed cost", de: "Formel-Builder · Gesamte Landed Costs", fr: "Créateur de formule · Coût rendu total", ko: "공식 빌더 · 총 landed cost", pt: "Construtor de fórmula · Custo landed total", it: "Builder formula · Landed cost totale", ar: "منشئ المعادلات · إجمالي التكلفة landed" },
  ],
  [
    "Click fields to add them to your formula",
    { zh: "点击字段，将其加入公式", es: "Haz clic en los campos para añadirlos a tu fórmula", ja: "フィールドをクリックして数式に追加", de: "Felder anklicken, um sie zur Formel hinzuzufügen", fr: "Cliquez sur les champs pour les ajouter à votre formule", ko: "필드를 클릭해 공식에 추가하세요", pt: "Clique nos campos para adicioná-los à fórmula", it: "Fai clic sui campi per aggiungerli alla formula", ar: "انقر على الحقول لإضافتها إلى المعادلة" },
  ],
  [
    "Available Fields",
    { zh: "可用字段", es: "Campos disponibles", ja: "利用可能なフィールド", de: "Verfügbare Felder", fr: "Champs disponibles", ko: "사용 가능한 필드", pt: "Campos disponíveis", it: "Campi disponibili", ar: "الحقول المتاحة" },
  ],
  [
    "Formula Expression",
    { zh: "公式表达式", es: "Expresión de fórmula", ja: "数式", de: "Formelausdruck", fr: "Expression de formule", ko: "공식 표현식", pt: "Expressão da fórmula", it: "Espressione formula", ar: "تعبير المعادلة" },
  ],
  [
    "IF / ELSE logic",
    { zh: "IF / ELSE 逻辑", es: "Lógica IF / ELSE", ja: "IF / ELSE ロジック", de: "IF / ELSE-Logik", fr: "Logique IF / ELSE", ko: "IF / ELSE 로직", pt: "Lógica IF / ELSE", it: "Logica IF / ELSE", ar: "منطق IF / ELSE" },
  ],
  [
    "Logic Preview",
    { zh: "逻辑预览", es: "Vista previa de lógica", ja: "ロジックプレビュー", de: "Logikvorschau", fr: "Aperçu de la logique", ko: "로직 미리보기", pt: "Prévia da lógica", it: "Anteprima logica", ar: "معاينة المنطق" },
  ],
  [
    "Unit Price",
    { zh: "单价", es: "Precio unitario", ja: "単価", de: "Stückpreis", fr: "Prix unitaire", ko: "단가", pt: "Preço unitário", it: "Prezzo unitario", ar: "سعر الوحدة" },
  ],
  [
    "Shipping",
    { zh: "运输费", es: "Envío", ja: "送料", de: "Versand", fr: "Expédition", ko: "배송비", pt: "Frete", it: "Spedizione", ar: "الشحن" },
  ],
  [
    "Duty %",
    { zh: "关税 %", es: "Arancel %", ja: "関税 %", de: "Zoll %", fr: "Droit %", ko: "관세 %", pt: "Imposto %", it: "Dazio %", ar: "الرسوم %" },
  ],
  [
    "Tax",
    { zh: "税费", es: "Impuesto", ja: "税", de: "Steuer", fr: "Taxe", ko: "세금", pt: "Imposto", it: "Imposta", ar: "الضريبة" },
  ],
  [
    "Apply to All Vendors",
    { zh: "应用到所有供应商", es: "Aplicar a todos los proveedores", ja: "全ベンダーに適用", de: "Auf alle Lieferanten anwenden", fr: "Appliquer à tous les fournisseurs", ko: "모든 공급업체에 적용", pt: "Aplicar a todos os fornecedores", it: "Applica a tutti i fornitori", ar: "تطبيق على جميع الموردين" },
  ],
  [
    "True landed cost",
    { zh: "真实到岸成本", es: "Costo landed real", ja: "真の landed cost", de: "Echte Landed Costs", fr: "Coût rendu réel", ko: "실제 landed cost", pt: "Custo landed real", it: "Landed cost reale", ar: "التكلفة landed الحقيقية" },
  ],
  [
    "True Cost",
    { zh: "真实成本", es: "Costo real", ja: "真のコスト", de: "Echte Kosten", fr: "Coût réel", ko: "실제 비용", pt: "Custo real", it: "Costo reale", ar: "التكلفة الحقيقية" },
  ],
  [
    "Build an IF/ELSE formula",
    { zh: "构建 IF/ELSE 公式", es: "Crea una fórmula IF/ELSE", ja: "IF/ELSE 数式を作成", de: "Eine IF/ELSE-Formel erstellen", fr: "Créer une formule IF/ELSE", ko: "IF/ELSE 공식 만들기", pt: "Crie uma fórmula IF/ELSE", it: "Crea una formula IF/ELSE", ar: "أنشئ معادلة IF/ELSE" },
  ],
  [
    "unknown — quote hides duty, shipping & tax.",
    { zh: "未知 — 报价隐藏了关税、运输费和税费。", es: "desconocido — la cotización oculta arancel, envío e impuestos.", ja: "不明 — 見積には関税、送料、税が隠れています。", de: "unbekannt — das Angebot verbirgt Zoll, Versand und Steuern.", fr: "inconnu — le devis masque droits, expédition et taxes.", ko: "알 수 없음 — 견적에 관세, 배송비, 세금이 숨겨져 있습니다.", pt: "desconhecido — a cotação oculta imposto, frete e taxas.", it: "sconosciuto — il preventivo nasconde dazi, spedizione e imposte.", ar: "غير معروفة — يخفي العرض الرسوم والشحن والضريبة." },
  ],
  [
    "to apply the right logic per vendor.",
    { zh: "为每个供应商应用正确逻辑。", es: "para aplicar la lógica correcta por proveedor.", ja: "ベンダーごとに正しいロジックを適用します。", de: "um je Lieferant die richtige Logik anzuwenden.", fr: "pour appliquer la bonne logique par fournisseur.", ko: "공급업체별로 올바른 로직을 적용합니다.", pt: "para aplicar a lógica certa por fornecedor.", it: "per applicare la logica corretta per fornitore.", ar: "لتطبيق المنطق الصحيح لكل مورد." },
  ],
  [
    "True landed cost revealed — normalized to ₹ for a fair comparison",
    { zh: "真实到岸成本已显示 — 统一换算为 ₹，便于公平比较", es: "Costo landed real revelado — normalizado a ₹ para una comparación justa", ja: "真の landed cost を表示 — 公平比較のため ₹ に正規化", de: "Echte Landed Costs sichtbar — für fairen Vergleich auf ₹ normalisiert", fr: "Coût rendu réel révélé — normalisé en ₹ pour une comparaison équitable", ko: "실제 landed cost 공개 — 공정 비교를 위해 ₹로 정규화", pt: "Custo landed real revelado — normalizado para ₹ para comparação justa", it: "Landed cost reale rivelato — normalizzato in ₹ per un confronto equo", ar: "تم كشف التكلفة landed الحقيقية — موحدة إلى ₹ لمقارنة عادلة" },
  ],
  [
    "Click expression bar to type…",
    { zh: "点击表达式栏开始输入…", es: "Haz clic en la barra de expresión para escribir…", ja: "数式バーをクリックして入力…", de: "In die Ausdrucksleiste klicken und tippen …", fr: "Cliquez sur la barre d'expression pour saisir…", ko: "표현식 바를 클릭해 입력…", pt: "Clique na barra de expressão para digitar…", it: "Fai clic sulla barra espressione per digitare…", ar: "انقر على شريط التعبير للكتابة…" },
  ],
  [
    "fields added",
    { zh: "个字段已添加", es: "campos añadidos", ja: "フィールド追加済み", de: "Felder hinzugefügt", fr: "champs ajoutés", ko: "개 필드 추가됨", pt: "campos adicionados", it: "campi aggiunti", ar: "حقول مضافة" },
  ],
  [
    "3 vendors quoted — but which one is truly cheapest?",
    { zh: "3 家供应商已报价 — 但哪一家才是真正最低成本？", es: "3 proveedores cotizaron — ¿cuál es realmente el más económico?", ja: "3 社のベンダーが見積済み — 本当に最も低コストなのはどこか？", de: "3 Lieferanten haben angeboten — welcher ist wirklich am günstigsten?", fr: "3 fournisseurs ont soumis un devis — lequel est réellement le moins coûteux ?", ko: "3개 공급업체가 견적을 제출 — 실제로 가장 저렴한 곳은 어디일까요?", pt: "3 fornecedores enviaram cotação — qual é realmente o mais econômico?", it: "3 fornitori hanno quotato — qual è davvero il più conveniente?", ar: "قدّم 3 موردين عروضًا — فمن الأرخص فعليًا؟" },
  ],
  [
    "Building an IF/ELSE formula to calculate true landed cost per vendor",
    { zh: "正在构建 IF/ELSE 公式，用于计算每个供应商的真实到岸成本", es: "Creando una fórmula IF/ELSE para calcular el costo landed real por proveedor", ja: "ベンダー別の真の landed cost を計算する IF/ELSE 数式を作成中", de: "IF/ELSE-Formel zur Berechnung echter Landed Costs je Lieferant wird erstellt", fr: "Création d'une formule IF/ELSE pour calculer le coût rendu réel par fournisseur", ko: "공급업체별 실제 landed cost 계산을 위한 IF/ELSE 공식 작성 중", pt: "Criando uma fórmula IF/ELSE para calcular o custo landed real por fornecedor", it: "Creazione di una formula IF/ELSE per calcolare il landed cost reale per fornitore", ar: "جارٍ إنشاء معادلة IF/ELSE لحساب التكلفة landed الحقيقية لكل مورد" },
  ],
  [
    "Formula complete — applying IF/ELSE logic to all 3 vendors at once",
    { zh: "公式已完成 — 正在一次性对 3 家供应商应用 IF/ELSE 逻辑", es: "Fórmula completa — aplicando lógica IF/ELSE a los 3 proveedores a la vez", ja: "数式が完成 — 3 社のベンダーすべてに IF/ELSE ロジックを一括適用", de: "Formel fertig — IF/ELSE-Logik wird gleichzeitig auf alle 3 Lieferanten angewendet", fr: "Formule terminée — application de la logique IF/ELSE aux 3 fournisseurs en une fois", ko: "공식 완료 — 3개 공급업체에 IF/ELSE 로직을 한 번에 적용 중", pt: "Fórmula concluída — aplicando lógica IF/ELSE aos 3 fornecedores de uma vez", it: "Formula completata — applicazione della logica IF/ELSE a tutti e 3 i fornitori", ar: "اكتملت المعادلة — جارٍ تطبيق منطق IF/ELSE على الموردين الثلاثة دفعة واحدة" },
  ],
  [
    "Scanning each vendor — duty > 0 takes the IF branch, others take ELSE",
    { zh: "正在扫描每个供应商 — 关税 > 0 走 IF 分支，其余走 ELSE", es: "Escaneando cada proveedor — arancel > 0 usa la rama IF; los demás usan ELSE", ja: "各ベンダーをスキャン中 — 関税 > 0 は IF 分岐、それ以外は ELSE", de: "Jeder Lieferant wird geprüft — Zoll > 0 nutzt IF, alle anderen ELSE", fr: "Analyse de chaque fournisseur — droit > 0 suit IF, les autres ELSE", ko: "각 공급업체 스캔 중 — 관세 > 0은 IF 분기, 나머지는 ELSE", pt: "Verificando cada fornecedor — imposto > 0 usa IF; os demais usam ELSE", it: "Scansione di ogni fornitore — dazio > 0 usa IF, gli altri ELSE", ar: "جارٍ فحص كل مورد — الرسوم > 0 تستخدم فرع IF، والبقية ELSE" },
  ],
  [
    "Shenzhen Co. wins — the \"cheapest\" quote wasn't the best deal",
    { zh: "Shenzhen Co. 胜出 — “看起来最便宜”的报价并不是最佳交易", es: "Shenzhen Co. gana — la cotización “más barata” no era la mejor opción", ja: "Shenzhen Co. が選定 — 「最安」に見えた見積は最良条件ではありませんでした", de: "Shenzhen Co. gewinnt — das „günstigste“ Angebot war nicht der beste Deal", fr: "Shenzhen Co. l'emporte — le devis « le moins cher » n'était pas la meilleure option", ko: "Shenzhen Co. 선정 — “가장 저렴한” 견적이 최선은 아니었습니다", pt: "Shenzhen Co. vence — a cotação “mais barata” não era o melhor negócio", it: "Vince Shenzhen Co. — l'offerta “più economica” non era la migliore", ar: "تفوز Shenzhen Co. — العرض \"الأرخص\" لم يكن أفضل صفقة" },
  ],
  [
    "Tata Steel wins — the \"cheapest\" quote wasn't the best deal",
    { zh: "Tata Steel 胜出 — “看起来最便宜”的报价并不是最佳交易", es: "Tata Steel gana — la cotización “más barata” no era la mejor opción", ja: "Tata Steel が選定 — 「最安」に見えた見積は最良条件ではありませんでした", de: "Tata Steel gewinnt — das „günstigste“ Angebot war nicht der beste Deal", fr: "Tata Steel l'emporte — le devis « le moins cher » n'était pas la meilleure option", ko: "Tata Steel 선정 — “가장 저렴한” 견적이 최선은 아니었습니다", pt: "Tata Steel vence — a cotação “mais barata” não era o melhor negócio", it: "Vince Tata Steel — l'offerta “più economica” non era la migliore", ar: "تفوز Tata Steel — العرض \"الأرخص\" لم يكن أفضل صفقة" },
  ],
  [
    "EuroMetal wins — the \"cheapest\" quote wasn't the best deal",
    { zh: "EuroMetal 胜出 — “看起来最便宜”的报价并不是最佳交易", es: "EuroMetal gana — la cotización “más barata” no era la mejor opción", ja: "EuroMetal が選定 — 「最安」に見えた見積は最良条件ではありませんでした", de: "EuroMetal gewinnt — das „günstigste“ Angebot war nicht der beste Deal", fr: "EuroMetal l'emporte — le devis « le moins cher » n'était pas la meilleure option", ko: "EuroMetal 선정 — “가장 저렴한” 견적이 최선은 아니었습니다", pt: "EuroMetal vence — a cotação “mais barata” não era o melhor negócio", it: "Vince EuroMetal — l'offerta “più economica” non era la migliore", ar: "تفوز EuroMetal — العرض \"الأرخص\" لم يكن أفضل صفقة" },
  ],
  [
    "/ unit",
    { zh: "/ 单位", es: "/ unidad", ja: "/ 単位", de: "/ Einheit", fr: "/ unité", ko: "/ 단위", pt: "/ unidade", it: "/ unità", ar: "/ وحدة" },
  ],
  [
    "Duty > 0 → (Unit Price + Shipping) × (1 + Duty%) + Tax",
    { zh: "关税 > 0 →（单价 + 运输费）×（1 + 关税%）+ 税费", es: "Arancel > 0 → (Precio unitario + Envío) × (1 + Arancel%) + Impuesto", ja: "関税 > 0 →（単価 + 送料）×（1 + 関税%）+ 税", de: "Zoll > 0 → (Stückpreis + Versand) × (1 + Zoll%) + Steuer", fr: "Droit > 0 → (Prix unitaire + Expédition) × (1 + Droit %) + Taxe", ko: "관세 > 0 → (단가 + 배송비) × (1 + 관세%) + 세금", pt: "Imposto > 0 → (Preço unitário + Frete) × (1 + Imposto%) + Taxa", it: "Dazio > 0 → (Prezzo unitario + Spedizione) × (1 + Dazio%) + Imposta", ar: "الرسوم > 0 → (سعر الوحدة + الشحن) × (1 + الرسوم%) + الضريبة" },
  ],
  [
    "Unit Price + Shipping + Tax",
    { zh: "单价 + 运输费 + 税费", es: "Precio unitario + Envío + Impuesto", ja: "単価 + 送料 + 税", de: "Stückpreis + Versand + Steuer", fr: "Prix unitaire + Expédition + Taxe", ko: "단가 + 배송비 + 세금", pt: "Preço unitário + Frete + Taxa", it: "Prezzo unitario + Spedizione + Imposta", ar: "سعر الوحدة + الشحن + الضريبة" },
  ],
  [
    "of",
    { zh: "/", es: "de", ja: "/", de: "von", fr: "sur", ko: "/", pt: "de", it: "di", ar: "من" },
  ],
  [
    "is the true best deal",
    { zh: "才是真正最佳交易", es: "es la mejor opción real", ja: "が真の最適条件です", de: "ist wirklich der beste Deal", fr: "est réellement la meilleure option", ko: "이 실제 최적 조건입니다", pt: "é o melhor negócio real", it: "è davvero l'offerta migliore", ar: "هي الصفقة الأفضل فعليًا" },
  ],
  [
    "IF/ELSE formula applied · auto-normalized to ₹",
    { zh: "已应用 IF/ELSE 公式 · 自动统一换算为 ₹", es: "Fórmula IF/ELSE aplicada · normalizada automáticamente a ₹", ja: "IF/ELSE 数式を適用 · ₹ に自動正規化", de: "IF/ELSE-Formel angewendet · automatisch auf ₹ normalisiert", fr: "Formule IF/ELSE appliquée · normalisée automatiquement en ₹", ko: "IF/ELSE 공식 적용 · ₹로 자동 정규화", pt: "Fórmula IF/ELSE aplicada · normalizada automaticamente para ₹", it: "Formula IF/ELSE applicata · normalizzata automaticamente in ₹", ar: "تم تطبيق معادلة IF/ELSE · وتوحيدها تلقائيًا إلى ₹" },
  ],
  [
    "Operating Without Data",
    { zh: "缺少数据的运营", es: "Operación sin datos", ja: "データなしの運用", de: "Betrieb ohne Daten", fr: "Opérer sans données", ko: "데이터 없는 운영", pt: "Operação sem dados", it: "Operare senza dati", ar: "تشغيل بلا بيانات" },
  ],
  [
    "Operational Signal Locked",
    { zh: "运营信号已锁定", es: "Señal operativa fijada", ja: "運用シグナルをロック", de: "Operatives Signal gesichert", fr: "Signal opérationnel verrouillé", ko: "운영 신호 고정", pt: "Sinal operacional fixado", it: "Segnale operativo bloccato", ar: "تم تثبيت الإشارة التشغيلية" },
  ],
  [
    "Real-Time Bid Intelligence",
    { zh: "实时投标智能", es: "Inteligencia de ofertas en tiempo real", ja: "リアルタイム入札インテリジェンス", de: "Echtzeit-Angebotsintelligenz", fr: "Intelligence des offres en temps réel", ko: "실시간 입찰 인텔리전스", pt: "Inteligência de propostas em tempo real", it: "Intelligence offerte in tempo reale", ar: "ذكاء العطاءات في الوقت الفعلي" },
  ],
  [
    "Historical Pricing Trend",
    { zh: "历史价格趋势", es: "Tendencia histórica de precios", ja: "履歴価格トレンド", de: "Historischer Preistrend", fr: "Tendance historique des prix", ko: "과거 가격 추세", pt: "Tendência histórica de preços", it: "Trend storico dei prezzi", ar: "اتجاه الأسعار التاريخية" },
  ],
  [
    "Vendor Performance Radar",
    { zh: "供应商绩效雷达", es: "Radar de desempeño de proveedores", ja: "ベンダーパフォーマンスレーダー", de: "Lieferantenleistungs-Radar", fr: "Radar de performance fournisseur", ko: "공급업체 성과 레이더", pt: "Radar de desempenho do fornecedor", it: "Radar performance fornitori", ar: "رادار أداء الموردين" },
  ],
  [
    "YTD Spend Distribution",
    { zh: "年初至今支出分布", es: "Distribución de gasto YTD", ja: "年初来支出の分布", de: "Ausgabenverteilung YTD", fr: "Répartition des dépenses YTD", ko: "연초 이후 지출 분포", pt: "Distribuição de gastos YTD", it: "Distribuzione spesa YTD", ar: "توزيع الإنفاق منذ بداية العام" },
  ],
  [
    "Smart Recommendation",
    { zh: "智能建议", es: "Recomendación inteligente", ja: "スマート推奨", de: "Intelligente Empfehlung", fr: "Recommandation intelligente", ko: "스마트 추천", pt: "Recomendação inteligente", it: "Raccomandazione intelligente", ar: "توصية ذكية" },
  ],
  [
    "Consolidated Decision Captured",
    { zh: "已记录整合决策", es: "Decisión consolidada registrada", ja: "統合判断を記録済み", de: "Konsolidierte Entscheidung erfasst", fr: "Décision consolidée enregistrée", ko: "통합 의사결정 기록됨", pt: "Decisão consolidada registrada", it: "Decisione consolidata acquisita", ar: "تم تسجيل القرار الموحد" },
  ],
  [
    "Command Center",
    { zh: "指挥中心", es: "Centro de control", ja: "コマンドセンター", de: "Kommandozentrale", fr: "Centre de commande", ko: "커맨드 센터", pt: "Centro de comando", it: "Centro di comando", ar: "مركز التحكم" },
  ],
  [
    "Auto-Processing",
    { zh: "自动处理", es: "Procesamiento automático", ja: "自動処理", de: "Automatische Verarbeitung", fr: "Traitement automatique", ko: "자동 처리", pt: "Processamento automático", it: "Elaborazione automatica", ar: "معالجة تلقائية" },
  ],
  [
    "Which vendor wins this award?",
    { zh: "哪家供应商会赢得此次定标？", es: "¿Qué proveedor gana esta adjudicación?", ja: "どのベンダーがこの発注先に選ばれるか？", de: "Welcher Lieferant gewinnt diese Vergabe?", fr: "Quel fournisseur remporte cette attribution ?", ko: "어느 공급업체가 이 낙찰을 받을까요?", pt: "Qual fornecedor vence esta adjudicação?", it: "Quale fornitore vince questa assegnazione?", ar: "أي مورد سيفوز بهذا الإسناد؟" },
  ],
  [
    "Decision made on gut feel...",
    { zh: "决策仍依赖直觉……", es: "Decisión tomada por intuición...", ja: "勘に頼った意思決定...", de: "Entscheidung nach Bauchgefühl ...", fr: "Décision prise à l'intuition...", ko: "직감에 의존한 의사결정...", pt: "Decisão tomada por intuição...", it: "Decisione presa a sensazione...", ar: "قرار مبني على الحدس..." },
  ],
  [
    "Connecting historical prices, vendor metrics, & raw bids...",
    { zh: "正在连接历史价格、供应商指标和原始报价……", es: "Conectando precios históricos, métricas de proveedores y ofertas sin procesar...", ja: "履歴価格、ベンダー指標、未加工の入札データを接続中...", de: "Historische Preise, Lieferantenkennzahlen und Rohangebote werden verbunden ...", fr: "Connexion des prix historiques, indicateurs fournisseurs et offres brutes...", ko: "과거 가격, 공급업체 지표, 원시 입찰 데이터를 연결 중...", pt: "Conectando preços históricos, métricas de fornecedores e propostas brutas...", it: "Collegamento di prezzi storici, metriche fornitori e offerte grezze...", ar: "جارٍ ربط الأسعار التاريخية ومؤشرات الموردين والعطاءات الخام..." },
  ],
  [
    "Quote",
    { zh: "报价", es: "Cotización", ja: "見積", de: "Angebot", fr: "Devis", ko: "견적", pt: "Cotação", it: "Offerta", ar: "عرض السعر" },
  ],
  [
    "Score",
    { zh: "评分", es: "Puntuación", ja: "スコア", de: "Score", fr: "Score", ko: "점수", pt: "Pontuação", it: "Punteggio", ar: "الدرجة" },
  ],
  [
    "12-Month Historical Pricing · SKU-1003",
    { zh: "12 个月历史价格 · SKU-1003", es: "Precio histórico de 12 meses · SKU-1003", ja: "12 か月の履歴価格 · SKU-1003", de: "12-Monats-Preishistorie · SKU-1003", fr: "Historique des prix sur 12 mois · SKU-1003", ko: "12개월 과거 가격 · SKU-1003", pt: "Histórico de preços de 12 meses · SKU-1003", it: "Storico prezzi 12 mesi · SKU-1003", ar: "سجل أسعار 12 شهرًا · SKU-1003" },
  ],
  [
    "Month",
    { zh: "月份", es: "Mes", ja: "月", de: "Monat", fr: "Mois", ko: "월", pt: "Mês", it: "Mese", ar: "الشهر" },
  ],
];

const parallaxDashboardEntries: Array<[string, TranslationSet]> = [
  [
    "Three vendors. Five plants. No clear answer. Decisions made on hunches.",
    { zh: "三家供应商，五个工厂，答案并不清晰。过去只能凭直觉决策。", es: "Tres proveedores. Cinco plantas. Sin una respuesta clara. Decisiones basadas en intuición.", ja: "3 社のベンダー、5 つの工場。明確な答えがなく、勘に頼った意思決定でした。", de: "Drei Lieferanten. Fünf Werke. Keine klare Antwort. Entscheidungen nach Bauchgefühl.", fr: "Trois fournisseurs. Cinq sites. Aucune réponse claire. Des décisions prises à l'intuition.", ko: "공급업체 3곳, 공장 5곳. 명확한 답이 없어 직감으로 결정했습니다.", pt: "Três fornecedores. Cinco plantas. Sem resposta clara. Decisões por intuição.", it: "Tre fornitori. Cinque stabilimenti. Nessuna risposta chiara. Decisioni basate sull'intuito.", ar: "ثلاثة موردين. خمسة مصانع. لا توجد إجابة واضحة. قرارات تعتمد على الحدس." },
  ],
  [
    "FactWise turns on. Every operational signal consolidates instantly.",
    { zh: "FactWise 启动后，所有运营信号即时汇总。", es: "FactWise se activa. Cada señal operativa se consolida al instante.", ja: "FactWise が起動し、すべての業務シグナルが即座に集約されます。", de: "FactWise wird aktiviert. Jedes operative Signal wird sofort konsolidiert.", fr: "FactWise s'active. Chaque signal opérationnel est consolidé instantanément.", ko: "FactWise가 켜지면 모든 운영 신호가 즉시 통합됩니다.", pt: "O FactWise entra em ação. Cada sinal operacional é consolidado instantaneamente.", it: "FactWise si attiva. Ogni segnale operativo viene consolidato all'istante.", ar: "يبدأ FactWise العمل. يتم توحيد كل إشارة تشغيلية فورا." },
  ],
  [
    "Real-time bid intelligence — quotes update across vendors as they land.",
    { zh: "实时投标智能 — 供应商报价一到达即更新。", es: "Inteligencia de ofertas en tiempo real: las cotizaciones se actualizan al llegar.", ja: "リアルタイム入札インテリジェンス — 見積は到着次第、ベンダー横断で更新されます。", de: "Echtzeit-Angebotsintelligenz: Angebote werden beim Eingang lieferantenübergreifend aktualisiert.", fr: "Intelligence des offres en temps réel : les devis se mettent à jour dès leur arrivée.", ko: "실시간 입찰 인텔리전스 — 견적이 도착하는 즉시 공급업체별로 업데이트됩니다.", pt: "Inteligência de propostas em tempo real: cotações atualizam assim que chegam.", it: "Intelligence offerte in tempo reale: le quotazioni si aggiornano appena arrivano.", ar: "ذكاء العطاءات في الوقت الفعلي — يتم تحديث العروض فور وصولها." },
  ],
  [
    "12 months of price history. Know what 'fair' really looks like.",
    { zh: "12 个月价格历史，让您知道什么才是真正公平的价格。", es: "12 meses de historial de precios. Sepa cómo se ve realmente un precio justo.", ja: "12 か月の価格履歴で、「適正価格」を正しく把握できます。", de: "12 Monate Preisverlauf. Erkennen Sie, was wirklich fair ist.", fr: "12 mois d'historique prix. Sachez à quoi ressemble réellement un prix juste.", ko: "12개월 가격 이력으로 진짜 공정 가격을 파악합니다.", pt: "12 meses de histórico de preços. Saiba como é um preço justo de verdade.", it: "12 mesi di storico prezzi. Sai davvero che cosa è equo.", ar: "سجل أسعار 12 شهرا. اعرف كيف يبدو السعر العادل فعلا." },
  ],
  [
    "Vendor performance: OTD, quality, risk — scored, ranked, compared.",
    { zh: "供应商绩效：OTD、质量、风险 — 评分、排序、对比。", es: "Desempeño de proveedores: OTD, calidad y riesgo — puntuado, clasificado y comparado.", ja: "ベンダー実績：OTD、品質、リスクをスコア化、順位付け、比較。", de: "Lieferantenleistung: OTD, Qualität, Risiko — bewertet, gereiht, verglichen.", fr: "Performance fournisseur : OTD, qualité, risque — notés, classés, comparés.", ko: "공급업체 성과: OTD, 품질, 리스크를 점수화, 순위화, 비교합니다.", pt: "Desempenho de fornecedores: OTD, qualidade e risco — pontuados, ranqueados e comparados.", it: "Performance fornitori: OTD, qualità, rischio — valutati, classificati, confrontati.", ar: "أداء الموردين: OTD والجودة والمخاطر — تقييم وترتيب ومقارنة." },
  ],
  [
    "Live spend visibility. Surfacing category and operations distribution YTD.",
    { zh: "实时支出可视化，呈现年初至今的品类与运营分布。", es: "Visibilidad de gasto en vivo. Muestra distribución por categoría y operaciones YTD.", ja: "支出をライブで可視化。年初来のカテゴリ別・業務別分布を表示します。", de: "Live-Ausgabentransparenz. Kategorie- und Betriebsverteilung YTD sichtbar machen.", fr: "Visibilité des dépenses en direct. Répartition par catégorie et opérations YTD.", ko: "실시간 지출 가시성. 연초 이후 카테고리와 운영 분포를 보여줍니다.", pt: "Visibilidade de gastos ao vivo. Exibe distribuição por categoria e operações YTD.", it: "Visibilità live della spesa. Distribuzione per categoria e operations YTD.", ar: "رؤية مباشرة للإنفاق. إظهار توزيع الفئات والعمليات منذ بداية العام." },
  ],
  [
    "Margin protected. KPIs flip green. You see it before finance asks.",
    { zh: "利润率得到保护，KPI 转为绿色。财务询问前您已掌握。", es: "Margen protegido. Los KPI pasan a verde. Lo ves antes de que Finanzas pregunte.", ja: "利益率を守り、KPI はグリーンへ。財務から聞かれる前に把握できます。", de: "Marge geschützt. KPIs werden grün. Sie sehen es, bevor Finance fragt.", fr: "Marge protégée. Les KPI passent au vert. Vous le voyez avant la finance.", ko: "마진이 보호되고 KPI가 녹색으로 전환됩니다. 재무팀이 묻기 전에 확인합니다.", pt: "Margem protegida. KPIs ficam verdes. Você vê antes do Financeiro perguntar.", it: "Margine protetto. KPI in verde. Lo vedi prima che lo chieda la finanza.", ar: "الهامش محمي. تتحول مؤشرات KPI إلى الأخضر. تراها قبل أن يسأل فريق المالية." },
  ],
  [
    "Award Bharat Steel — 94% confidence, recommendation logged.",
    { zh: "授予 Bharat Steel — 94% 置信度，推荐已记录。", es: "Adjudicar a Bharat Steel — 94% de confianza, recomendación registrada.", ja: "Bharat Steel に発注 — 信頼度 94%、推奨を記録済み。", de: "Bharat Steel beauftragen — 94 % Vertrauen, Empfehlung protokolliert.", fr: "Attribuer à Bharat Steel — 94 % de confiance, recommandation journalisée.", ko: "Bharat Steel에 낙찰 — 신뢰도 94%, 추천 기록 완료.", pt: "Adjudicar à Bharat Steel — 94% de confiança, recomendação registrada.", it: "Assegna a Bharat Steel — confidenza 94%, raccomandazione registrata.", ar: "إرساء العقد على Bharat Steel — ثقة 94%، تم تسجيل التوصية." },
  ],
  [
    "5.8% below last year · historical downward trend detected",
    { zh: "比去年低 5.8% · 检测到历史下降趋势", es: "5,8% por debajo del año pasado · tendencia histórica a la baja detectada", ja: "昨年比 5.8% 低下 · 履歴上の下降傾向を検出", de: "5,8 % unter Vorjahr · historischer Abwärtstrend erkannt", fr: "5,8 % sous l'an dernier · tendance historique à la baisse détectée", ko: "작년 대비 5.8% 낮음 · 과거 하락 추세 감지", pt: "5,8% abaixo do ano passado · tendência histórica de queda detectada", it: "5,8% sotto l'anno scorso · trend storico al ribasso rilevato", ar: "أقل من العام الماضي بنسبة 5.8% · تم اكتشاف اتجاه هبوطي تاريخي" },
  ],
  [
    "Vendor score 91/100 — OTD 96%, Quality rating: A+",
    { zh: "供应商评分 91/100 — OTD 96%，质量评级：A+", es: "Puntuación proveedor 91/100 — OTD 96%, calidad: A+", ja: "ベンダースコア 91/100 — OTD 96%、品質評価：A+", de: "Lieferantenscore 91/100 — OTD 96 %, Qualitätsbewertung: A+", fr: "Score fournisseur 91/100 — OTD 96 %, qualité : A+", ko: "공급업체 점수 91/100 — OTD 96%, 품질 등급: A+", pt: "Pontuação do fornecedor 91/100 — OTD 96%, qualidade: A+", it: "Punteggio fornitore 91/100 — OTD 96%, qualità: A+", ar: "درجة المورد 91/100 — OTD 96%، تقييم الجودة: A+" },
  ],
  [
    "Margin impact: +3.1pts. Consolidated audit log stored.",
    { zh: "利润率影响：+3.1 个百分点。合并审计日志已保存。", es: "Impacto en margen: +3,1 pts. Registro de auditoría consolidado guardado.", ja: "利益率への影響：+3.1pt。統合監査ログを保存済み。", de: "Margeneffekt: +3,1 Punkte. Konsolidiertes Audit-Log gespeichert.", fr: "Impact marge : +3,1 pts. Journal d'audit consolidé stocké.", ko: "마진 영향: +3.1pt. 통합 감사 로그 저장됨.", pt: "Impacto na margem: +3,1 pts. Log de auditoria consolidado salvo.", it: "Impatto margine: +3,1 pt. Audit log consolidato salvato.", ar: "تأثير الهامش: +3.1 نقطة. تم حفظ سجل تدقيق موحد." },
  ],
  [
    "Awarded · ₹7.7K under historical avg captured",
    { zh: "已授予 · 捕获低于历史均价 ₹7.7K 的节省", es: "Adjudicado · ₹7,7K por debajo del promedio histórico capturado", ja: "発注済み · 履歴平均より ₹7.7K 低い削減を獲得", de: "Beauftragt · ₹7,7K unter historischem Durchschnitt gesichert", fr: "Attribué · ₹7,7K sous la moyenne historique capturés", ko: "낙찰 완료 · 과거 평균 대비 ₹7.7K 절감 포착", pt: "Adjudicado · ₹7,7K abaixo da média histórica capturado", it: "Assegnato · ₹7,7K sotto la media storica acquisiti", ar: "تم الإرساء · تم التقاط ₹7.7K أقل من المتوسط التاريخي" },
  ],
  [
    "Request",
    { zh: "请求", es: "Solicitud", ja: "リクエスト", de: "Anfrage", fr: "Demande", ko: "요청", pt: "Solicitação", it: "Richiesta", ar: "طلب" },
  ],
  [
    "Routed",
    { zh: "已路由", es: "Enrutado", ja: "ルーティング済み", de: "Weitergeleitet", fr: "Routé", ko: "라우팅됨", pt: "Roteado", it: "Instradato", ar: "تم التوجيه" },
  ],
  [
    "RFQ launched",
    { zh: "RFQ 已发布", es: "RFQ lanzada", ja: "RFQ 開始", de: "RFQ gestartet", fr: "RFQ lancée", ko: "RFQ 시작됨", pt: "RFQ lançada", it: "RFQ avviata", ar: "تم إطلاق RFQ" },
  ],
  [
    "Bids in",
    { zh: "投标已收到", es: "Ofertas recibidas", ja: "入札受領", de: "Angebote eingegangen", fr: "Offres reçues", ko: "입찰 접수", pt: "Propostas recebidas", it: "Offerte ricevute", ar: "وصلت العطاءات" },
  ],
  [
    "Negotiate",
    { zh: "谈判", es: "Negociar", ja: "交渉", de: "Verhandeln", fr: "Négocier", ko: "협상", pt: "Negociar", it: "Negozia", ar: "تفاوض" },
  ],
  [
    "Approve",
    { zh: "审批", es: "Aprobar", ja: "承認", de: "Genehmigen", fr: "Approuver", ko: "승인", pt: "Aprovar", it: "Approva", ar: "موافقة" },
  ],
  [
    "PO issued",
    { zh: "PO 已发出", es: "PO emitida", ja: "PO 発行済み", de: "PO ausgestellt", fr: "PO émis", ko: "PO 발행됨", pt: "PO emitido", it: "PO emesso", ar: "تم إصدار PO" },
  ],
  [
    "Invoice",
    { zh: "发票", es: "Factura", ja: "請求書", de: "Rechnung", fr: "Facture", ko: "송장", pt: "Fatura", it: "Fattura", ar: "فاتورة" },
  ],
  [
    "Paid",
    { zh: "已付款", es: "Pagado", ja: "支払い済み", de: "Bezahlt", fr: "Payé", ko: "지급 완료", pt: "Pago", it: "Pagato", ar: "مدفوع" },
  ],
  [
    "Internal · 5 teams",
    { zh: "内部 · 5 个团队", es: "Interno · 5 equipos", ja: "社内 · 5 チーム", de: "Intern · 5 Teams", fr: "Interne · 5 équipes", ko: "내부 · 5개 팀", pt: "Interno · 5 equipes", it: "Interno · 5 team", ar: "داخلي · 5 فرق" },
  ],
  [
    "Purchase Request · Smart Pump Assembly",
    { zh: "采购申请 · 智能泵组件", es: "Solicitud de compra · Ensamble de bomba inteligente", ja: "購買依頼 · スマートポンプ組立品", de: "Bestellanforderung · Smart-Pumpenbaugruppe", fr: "Demande d'achat · Ensemble pompe intelligente", ko: "구매 요청 · 스마트 펌프 조립품", pt: "Requisição de compra · Conjunto de bomba inteligente", it: "Richiesta acquisto · Assieme pompa smart", ar: "طلب شراء · مجموعة مضخة ذكية" },
  ],
  [
    "Draft",
    { zh: "草稿", es: "Borrador", ja: "下書き", de: "Entwurf", fr: "Brouillon", ko: "초안", pt: "Rascunho", it: "Bozza", ar: "مسودة" },
  ],
  [
    "→ Sourcing",
    { zh: "→ 寻源", es: "→ Sourcing", ja: "→ ソーシング", de: "→ Sourcing", fr: "→ Sourcing", ko: "→ 소싱", pt: "→ Sourcing", it: "→ Sourcing", ar: "→ التوريد" },
  ],
  [
    "RFQ-208 · Pump assembly · Q3",
    { zh: "RFQ-208 · 泵组件 · Q3", es: "RFQ-208 · Ensamble de bomba · Q3", ja: "RFQ-208 · ポンプ組立品 · Q3", de: "RFQ-208 · Pumpenbaugruppe · Q3", fr: "RFQ-208 · Ensemble pompe · T3", ko: "RFQ-208 · 펌프 조립품 · Q3", pt: "RFQ-208 · Conjunto de bomba · T3", it: "RFQ-208 · Assieme pompa · Q3", ar: "RFQ-208 · مجموعة مضخة · الربع الثالث" },
  ],
  [
    "Live",
    { zh: "实时", es: "En vivo", ja: "ライブ", de: "Live", fr: "En direct", ko: "실시간", pt: "Ao vivo", it: "Live", ar: "مباشر" },
  ],
  [
    "12 line items",
    { zh: "12 个行项目", es: "12 líneas", ja: "12 明細", de: "12 Positionen", fr: "12 lignes", ko: "12개 라인 품목", pt: "12 linhas", it: "12 righe", ar: "12 بندا" },
  ],
  [
    "Closes 48h",
    { zh: "48 小时后截止", es: "Cierra en 48 h", ja: "48 時間で締切", de: "Schließt in 48 Std.", fr: "Clôture dans 48 h", ko: "48시간 후 마감", pt: "Fecha em 48h", it: "Chiude tra 48h", ar: "يغلق خلال 48 ساعة" },
  ],
  [
    "Invited",
    { zh: "已邀请", es: "Invitado", ja: "招待済み", de: "Eingeladen", fr: "Invité", ko: "초대됨", pt: "Convidado", it: "Invitato", ar: "مدعو" },
  ],
  [
    "Auto-selected by tag + history",
    { zh: "按标签 + 历史自动选择", es: "Autoseleccionado por etiqueta + historial", ja: "タグ + 履歴で自動選定", de: "Automatisch nach Tag + Historie ausgewählt", fr: "Sélection automatique par tag + historique", ko: "태그 + 이력으로 자동 선택", pt: "Selecionado automaticamente por tag + histórico", it: "Selezionato automaticamente per tag + storico", ar: "اختيار تلقائي حسب الوسم + السجل" },
  ],
  [
    "Bid Comparison · landed cost",
    { zh: "投标对比 · 到岸成本", es: "Comparación de ofertas · costo landed", ja: "入札比較 · landed cost", de: "Angebotsvergleich · Landed Costs", fr: "Comparaison des offres · coût rendu", ko: "입찰 비교 · landed cost", pt: "Comparação de propostas · custo landed", it: "Confronto offerte · landed cost", ar: "مقارنة العطاءات · التكلفة landed" },
  ],
  [
    "Vendor",
    { zh: "供应商", es: "Proveedor", ja: "ベンダー", de: "Lieferant", fr: "Fournisseur", ko: "공급업체", pt: "Fornecedor", it: "Fornitore", ar: "المورد" },
  ],
  [
    "Landed",
    { zh: "到岸成本", es: "Landed", ja: "Landed", de: "Landed", fr: "Rendu", ko: "Landed", pt: "Landed", it: "Landed", ar: "Landed" },
  ],
  [
    "Δ Target",
    { zh: "Δ 目标", es: "Δ objetivo", ja: "Δ 目標", de: "Δ Ziel", fr: "Δ cible", ko: "Δ 목표", pt: "Δ meta", it: "Δ target", ar: "Δ الهدف" },
  ],
  [
    "Currency-normalised · duty + freight applied",
    { zh: "币种已标准化 · 已应用关税 + 运费", es: "Moneda normalizada · arancel + flete aplicados", ja: "通貨正規化済み · 関税 + 運賃適用済み", de: "Währung normalisiert · Zoll + Fracht angewendet", fr: "Devise normalisée · droits + fret appliqués", ko: "통화 정규화 · 관세 + 운임 적용", pt: "Moeda normalizada · imposto + frete aplicados", it: "Valuta normalizzata · dazi + trasporto applicati", ar: "تم توحيد العملة · تطبيق الرسوم + الشحن" },
  ],
  [
    "Auto-negotiation · Round 2",
    { zh: "自动谈判 · 第 2 轮", es: "Autonegociación · Ronda 2", ja: "自動交渉 · ラウンド 2", de: "Auto-Verhandlung · Runde 2", fr: "Auto-négociation · Tour 2", ko: "자동 협상 · 2라운드", pt: "Autonegociação · Rodada 2", it: "Auto-negoziazione · Round 2", ar: "تفاوض آلي · الجولة 2" },
  ],
  [
    "Target landed cost",
    { zh: "目标到岸成本", es: "Costo landed objetivo", ja: "目標 landed cost", de: "Ziel-Landed-Cost", fr: "Coût rendu cible", ko: "목표 landed cost", pt: "Custo landed alvo", it: "Landed cost target", ar: "التكلفة landed المستهدفة" },
  ],
  [
    ". Can you match?",
    { zh: "。可以匹配吗？", es: ". ¿Puedes igualarlo?", ja: "。対応できますか？", de: ". Können Sie das erreichen?", fr: ". Pouvez-vous vous aligner ?", ko: ". 맞출 수 있나요?", pt: ". Você consegue igualar?", it: ". Puoi allinearti?", ar: ". هل يمكنك مطابقتها؟" },
  ],
  [
    "Accepted. Lead time + payment terms locked.",
    { zh: "已接受。交期 + 付款条款已锁定。", es: "Aceptado. Plazo de entrega + condiciones de pago bloqueados.", ja: "承諾済み。リードタイム + 支払条件を確定。", de: "Akzeptiert. Lieferzeit + Zahlungsbedingungen fixiert.", fr: "Accepté. Délai + conditions de paiement verrouillés.", ko: "수락됨. 리드타임 + 결제 조건 확정.", pt: "Aceito. Prazo + condições de pagamento bloqueados.", it: "Accettato. Lead time + termini di pagamento bloccati.", ar: "تم القبول. تم تثبيت المهلة + شروط الدفع." },
  ],
  [
    "Savings vs initial bid",
    { zh: "相对初始投标的节省", es: "Ahorro vs oferta inicial", ja: "初回入札比の削減", de: "Einsparung ggü. Erstangebot", fr: "Économie vs offre initiale", ko: "초기 입찰 대비 절감", pt: "Economia vs proposta inicial", it: "Risparmio vs offerta iniziale", ar: "الوفورات مقابل العطاء الأولي" },
  ],
  [
    "Award approval · APR-441",
    { zh: "授标审批 · APR-441", es: "Aprobación de adjudicación · APR-441", ja: "発注承認 · APR-441", de: "Zuschlagsfreigabe · APR-441", fr: "Approbation d'attribution · APR-441", ko: "낙찰 승인 · APR-441", pt: "Aprovação de adjudicação · APR-441", it: "Approvazione assegnazione · APR-441", ar: "موافقة الإرساء · APR-441" },
  ],
  [
    "Award to",
    { zh: "授予", es: "Adjudicar a", ja: "発注先", de: "Zuschlag an", fr: "Attribuer à", ko: "낙찰 대상", pt: "Adjudicar a", it: "Assegna a", ar: "الإرساء إلى" },
  ],
  [
    "Total value",
    { zh: "总价值", es: "Valor total", ja: "総額", de: "Gesamtwert", fr: "Valeur totale", ko: "총액", pt: "Valor total", it: "Valore totale", ar: "القيمة الإجمالية" },
  ],
  [
    "Saving",
    { zh: "节省", es: "Ahorro", ja: "削減", de: "Einsparung", fr: "Économie", ko: "절감", pt: "Economia", it: "Risparmio", ar: "توفير" },
  ],
  [
    "Risk score",
    { zh: "风险评分", es: "Puntuación de riesgo", ja: "リスクスコア", de: "Risikoscore", fr: "Score risque", ko: "리스크 점수", pt: "Pontuação de risco", it: "Punteggio rischio", ar: "درجة المخاطر" },
  ],
  [
    "Reject",
    { zh: "拒绝", es: "Rechazar", ja: "却下", de: "Ablehnen", fr: "Rejeter", ko: "거절", pt: "Rejeitar", it: "Rifiuta", ar: "رفض" },
  ],
  [
    "Approve award",
    { zh: "批准授标", es: "Aprobar adjudicación", ja: "発注を承認", de: "Zuschlag genehmigen", fr: "Approuver l'attribution", ko: "낙찰 승인", pt: "Aprovar adjudicação", it: "Approva assegnazione", ar: "اعتماد الإرساء" },
  ],
  [
    "APPROVED",
    { zh: "已批准", es: "APROBADO", ja: "承認済み", de: "GENEHMIGT", fr: "APPROUVÉ", ko: "승인됨", pt: "APROVADO", it: "APPROVATO", ar: "تمت الموافقة" },
  ],
  [
    "Purchase Order · sent to vendor",
    { zh: "采购订单 · 已发送给供应商", es: "Orden de compra · enviada al proveedor", ja: "発注書 · ベンダーへ送信済み", de: "Bestellung · an Lieferant gesendet", fr: "Bon de commande · envoyé au fournisseur", ko: "구매 주문 · 공급업체로 전송", pt: "Pedido de compra · enviado ao fornecedor", it: "Ordine di acquisto · inviato al fornitore", ar: "أمر شراء · أرسل إلى المورد" },
  ],
  [
    "Issued",
    { zh: "已发出", es: "Emitido", ja: "発行済み", de: "Ausgestellt", fr: "Émis", ko: "발행됨", pt: "Emitido", it: "Emesso", ar: "صادر" },
  ],
  [
    "Visible to ACME · live",
    { zh: "ACME 可见 · 实时", es: "Visible para ACME · en vivo", ja: "ACME に表示 · ライブ", de: "Für ACME sichtbar · live", fr: "Visible par ACME · en direct", ko: "ACME에 표시 · 실시간", pt: "Visível para ACME · ao vivo", it: "Visibile ad ACME · live", ar: "مرئي لـ ACME · مباشر" },
  ],
  [
    "Delivery",
    { zh: "交付", es: "Entrega", ja: "納期", de: "Lieferung", fr: "Livraison", ko: "납품", pt: "Entrega", it: "Consegna", ar: "التسليم" },
  ],
  [
    "Payment terms",
    { zh: "付款条款", es: "Condiciones de pago", ja: "支払条件", de: "Zahlungsbedingungen", fr: "Conditions de paiement", ko: "결제 조건", pt: "Condições de pagamento", it: "Termini di pagamento", ar: "شروط الدفع" },
  ],
  [
    "Authorised:",
    { zh: "已授权：", es: "Autorizado:", ja: "承認者：", de: "Autorisiert:", fr: "Autorisé :", ko: "승인자:", pt: "Autorizado:", it: "Autorizzato:", ar: "مصرح:" },
  ],
  [
    "Vendor invoice · on-platform",
    { zh: "供应商发票 · 平台内", es: "Factura de proveedor · en plataforma", ja: "ベンダー請求書 · プラットフォーム上", de: "Lieferantenrechnung · auf der Plattform", fr: "Facture fournisseur · sur plateforme", ko: "공급업체 송장 · 플랫폼 내", pt: "Fatura do fornecedor · na plataforma", it: "Fattura fornitore · in piattaforma", ar: "فاتورة المورد · داخل المنصة" },
  ],
  [
    "3-way matched",
    { zh: "三方匹配完成", es: "Conciliado 3 vías", ja: "3-way 照合済み", de: "3-Wege-Abgleich erfolgt", fr: "Rapproché 3 voies", ko: "3-way 매칭 완료", pt: "Conferido em 3 vias", it: "Match a 3 vie completato", ar: "مطابقة ثلاثية مكتملة" },
  ],
  [
    "Invoice total",
    { zh: "发票总额", es: "Total de factura", ja: "請求合計", de: "Rechnungssumme", fr: "Total facture", ko: "송장 합계", pt: "Total da fatura", it: "Totale fattura", ar: "إجمالي الفاتورة" },
  ],
  [
    "Auto-matched in context · no email chase",
    { zh: "在上下文中自动匹配 · 无需邮件追踪", es: "Auto-conciliado en contexto · sin perseguir emails", ja: "文脈内で自動照合 · メール追跡不要", de: "Im Kontext automatisch abgeglichen · kein E-Mail-Nachfassen", fr: "Rapproché automatiquement en contexte · aucun suivi email", ko: "맥락 안에서 자동 매칭 · 이메일 추적 불필요", pt: "Auto-conferido no contexto · sem cobrança por e-mail", it: "Abbinato automaticamente nel contesto · niente rincorse via email", ar: "مطابقة تلقائية ضمن السياق · دون ملاحقة بالبريد" },
  ],
  [
    "Payment released",
    { zh: "付款已释放", es: "Pago liberado", ja: "支払いリリース済み", de: "Zahlung freigegeben", fr: "Paiement débloqué", ko: "결제 릴리스됨", pt: "Pagamento liberado", it: "Pagamento rilasciato", ar: "تم إطلاق الدفع" },
  ],
  [
    "Paid to ACME Mfg",
    { zh: "已支付给 ACME Mfg", es: "Pagado a ACME Mfg", ja: "ACME Mfg へ支払い済み", de: "An ACME Mfg bezahlt", fr: "Payé à ACME Mfg", ko: "ACME Mfg에 지급 완료", pt: "Pago para ACME Mfg", it: "Pagato ad ACME Mfg", ar: "تم الدفع إلى ACME Mfg" },
  ],
  [
    "ACME notified · in real time",
    { zh: "ACME 已实时通知", es: "ACME notificado · en tiempo real", ja: "ACME へリアルタイム通知", de: "ACME benachrichtigt · in Echtzeit", fr: "ACME notifié · en temps réel", ko: "ACME 실시간 알림 완료", pt: "ACME notificado · em tempo real", it: "ACME notificata · in tempo reale", ar: "تم إخطار ACME · في الوقت الفعلي" },
  ],
  [
    "End-to-end cycle time",
    { zh: "端到端周期时间", es: "Tiempo de ciclo end-to-end", ja: "エンドツーエンドのサイクル時間", de: "End-to-End-Durchlaufzeit", fr: "Temps de cycle de bout en bout", ko: "엔드투엔드 주기 시간", pt: "Tempo de ciclo ponta a ponta", it: "Tempo ciclo end-to-end", ar: "زمن الدورة من البداية للنهاية" },
  ],
  [
    "Every step · every stakeholder · one platform",
    { zh: "每一步 · 每个相关方 · 一个平台", es: "Cada paso · cada interesado · una plataforma", ja: "すべてのステップ · すべての関係者 · ひとつのプラットフォーム", de: "Jeder Schritt · jeder Stakeholder · eine Plattform", fr: "Chaque étape · chaque partie prenante · une plateforme", ko: "모든 단계 · 모든 이해관계자 · 하나의 플랫폼", pt: "Cada etapa · cada stakeholder · uma plataforma", it: "Ogni fase · ogni stakeholder · una piattaforma", ar: "كل خطوة · كل صاحب مصلحة · منصة واحدة" },
  ],
];

const bomAndWorkflowMicrocopyEntries: Array<[string, TranslationSet]> = [
  [
    "EV Drivetrain · RX-7",
    { zh: "EV 动力总成 · RX-7", es: "Tren motriz EV · RX-7", ja: "EV ドライブトレイン · RX-7", de: "EV-Antriebsstrang · RX-7", fr: "Groupe motopropulseur EV · RX-7", ko: "EV 구동계 · RX-7", pt: "Powertrain EV · RX-7", it: "Powertrain EV · RX-7", ar: "مجموعة نقل حركة EV · RX-7" },
  ],
  [
    "Motor",
    { zh: "电机", es: "Motor", ja: "モーター", de: "Motor", fr: "Moteur", ko: "모터", pt: "Motor", it: "Motore", ar: "محرك" },
  ],
  [
    "Gearbox",
    { zh: "齿轮箱", es: "Caja de cambios", ja: "ギアボックス", de: "Getriebe", fr: "Boîte de vitesses", ko: "기어박스", pt: "Caixa de câmbio", it: "Cambio", ar: "علبة تروس" },
  ],
  [
    "Gear Housing",
    { zh: "齿轮壳体", es: "Carcasa de engranaje", ja: "ギアハウジング", de: "Getriebegehäuse", fr: "Carter d'engrenage", ko: "기어 하우징", pt: "Carcaça da engrenagem", it: "Alloggiamento ingranaggi", ar: "غلاف التروس" },
  ],
  [
    "Drive Shaft Assy",
    { zh: "传动轴组件", es: "Conjunto de eje de transmisión", ja: "ドライブシャフト Assy", de: "Antriebswellenbaugruppe", fr: "Ensemble arbre de transmission", ko: "구동축 조립품", pt: "Conjunto do eixo de transmissão", it: "Assieme albero motore", ar: "مجموعة عمود الإدارة" },
  ],
  [
    "Bearing Set 32mm",
    { zh: "32mm 轴承套件", es: "Juego de rodamientos 32 mm", ja: "ベアリングセット 32mm", de: "Lagersatz 32 mm", fr: "Jeu de roulements 32 mm", ko: "베어링 세트 32mm", pt: "Conjunto de rolamentos 32 mm", it: "Set cuscinetti 32 mm", ar: "مجموعة محامل 32 مم" },
  ],
  [
    "Forged Shaft",
    { zh: "锻造轴", es: "Eje forjado", ja: "鍛造シャフト", de: "Geschmiedete Welle", fr: "Arbre forgé", ko: "단조 샤프트", pt: "Eixo forjado", it: "Albero forgiato", ar: "عمود مطروق" },
  ],
  [
    "Spline Coupling",
    { zh: "花键联轴器", es: "Acoplamiento estriado", ja: "スプラインカップリング", de: "Keilkupplung", fr: "Accouplement cannelé", ko: "스플라인 커플링", pt: "Acoplamento estriado", it: "Giunto scanalato", ar: "وصلة مخددة" },
  ],
  [
    "parts",
    { zh: "个零件", es: "piezas", ja: "部品", de: "Teile", fr: "pièces", ko: "개 부품", pt: "peças", it: "parti", ar: "أجزاء" },
  ],
  [
    "+3 alternates",
    { zh: "+3 个替代项", es: "+3 alternativos", ja: "+3 代替品", de: "+3 Alternativen", fr: "+3 alternatives", ko: "+3개 대체품", pt: "+3 alternativos", it: "+3 alternative", ar: "+3 بدائل" },
  ],
  [
    "qty",
    { zh: "数量", es: "cant.", ja: "数量", de: "Menge", fr: "qté", ko: "수량", pt: "qtd.", it: "q.tà", ar: "كمية" },
  ],
  [
    "lines",
    { zh: "行", es: "líneas", ja: "明細", de: "Positionen", fr: "lignes", ko: "라인", pt: "linhas", it: "righe", ar: "بنود" },
  ],
  [
    "RFQ-EVT-9043 · 3 plants",
    { zh: "RFQ-EVT-9043 · 3 个工厂", es: "RFQ-EVT-9043 · 3 plantas", ja: "RFQ-EVT-9043 · 3 工場", de: "RFQ-EVT-9043 · 3 Werke", fr: "RFQ-EVT-9043 · 3 sites", ko: "RFQ-EVT-9043 · 3개 공장", pt: "RFQ-EVT-9043 · 3 plantas", it: "RFQ-EVT-9043 · 3 stabilimenti", ar: "RFQ-EVT-9043 · 3 مصانع" },
  ],
  [
    "54 lines · 3,300 units · 100 vendors",
    { zh: "54 行 · 3,300 件 · 100 家供应商", es: "54 líneas · 3.300 unidades · 100 proveedores", ja: "54 明細 · 3,300 ユニット · 100 社", de: "54 Positionen · 3.300 Einheiten · 100 Lieferanten", fr: "54 lignes · 3 300 unités · 100 fournisseurs", ko: "54개 라인 · 3,300개 단위 · 100개 공급업체", pt: "54 linhas · 3.300 unidades · 100 fornecedores", it: "54 righe · 3.300 unità · 100 fornitori", ar: "54 بندا · 3,300 وحدة · 100 مورد" },
  ],
  [
    "Quoted price",
    { zh: "报价价格", es: "Precio cotizado", ja: "見積価格", de: "Angebotspreis", fr: "Prix proposé", ko: "견적 가격", pt: "Preço cotado", it: "Prezzo quotato", ar: "السعر المعروض" },
  ],
  [
    "Vendor leverage",
    { zh: "供应商议价杠杆", es: "Apalancamiento con proveedores", ja: "ベンダー交渉力", de: "Lieferantenhebel", fr: "Levier fournisseur", ko: "공급업체 협상력", pt: "Alavancagem de fornecedor", it: "Leva fornitore", ar: "قوة تفاوض مع المورد" },
  ],
  [
    "faster",
    { zh: "更快", es: "más rápido", ja: "高速化", de: "schneller", fr: "plus rapide", ko: "더 빠름", pt: "mais rápido", it: "più veloce", ar: "أسرع" },
  ],
  [
    "Manual",
    { zh: "手动", es: "Manual", ja: "手作業", de: "Manuell", fr: "Manuel", ko: "수동", pt: "Manual", it: "Manuale", ar: "يدوي" },
  ],
  [
    "Priya created REQ-417 · 12 line items",
    { zh: "Priya 创建了 REQ-417 · 12 个行项目", es: "Priya creó REQ-417 · 12 líneas", ja: "Priya が REQ-417 を作成 · 12 明細", de: "Priya hat REQ-417 erstellt · 12 Positionen", fr: "Priya a créé REQ-417 · 12 lignes", ko: "Priya가 REQ-417 생성 · 12개 라인", pt: "Priya criou REQ-417 · 12 linhas", it: "Priya ha creato REQ-417 · 12 righe", ar: "أنشأت Priya الطلب REQ-417 · 12 بندا" },
  ],
  [
    "Auto-routed to Sourcing — no email, no handoff",
    { zh: "自动路由到寻源 — 无需邮件、无需交接", es: "Enrutado automáticamente a Sourcing — sin email ni traspaso", ja: "ソーシングへ自動ルーティング — メールも引き継ぎも不要", de: "Automatisch an Sourcing weitergeleitet — keine E-Mail, keine Übergabe", fr: "Routé automatiquement vers le sourcing — pas d'email, pas de transfert", ko: "소싱으로 자동 라우팅 — 이메일과 인수인계 없음", pt: "Roteado automaticamente para Sourcing — sem e-mail, sem passagem", it: "Instradato automaticamente al sourcing — niente email, niente handoff", ar: "توجيه تلقائي إلى التوريد — دون بريد أو تسليم يدوي" },
  ],
  [
    "Raj invited 3 vendors to RFQ-208",
    { zh: "Raj 邀请 3 家供应商参与 RFQ-208", es: "Raj invitó a 3 proveedores a RFQ-208", ja: "Raj が RFQ-208 に 3 社を招待", de: "Raj hat 3 Lieferanten zu RFQ-208 eingeladen", fr: "Raj a invité 3 fournisseurs à RFQ-208", ko: "Raj가 RFQ-208에 공급업체 3곳 초대", pt: "Raj convidou 3 fornecedores para RFQ-208", it: "Raj ha invitato 3 fornitori a RFQ-208", ar: "دعا Raj ثلاثة موردين إلى RFQ-208" },
  ],
  [
    "ACME bid received · −3.2% vs target price",
    { zh: "已收到 ACME 投标 · 比目标价低 −3.2%", es: "Oferta de ACME recibida · −3,2% vs precio objetivo", ja: "ACME 入札を受領 · 目標価格比 −3.2%", de: "ACME-Angebot erhalten · −3,2 % ggü. Zielpreis", fr: "Offre ACME reçue · −3,2 % vs prix cible", ko: "ACME 입찰 수신 · 목표가 대비 −3.2%", pt: "Proposta da ACME recebida · −3,2% vs preço-alvo", it: "Offerta ACME ricevuta · −3,2% vs prezzo target", ar: "تم استلام عطاء ACME · أقل من السعر المستهدف بـ −3.2%" },
  ],
  [
    "Meera released payment · ACME notified instantly",
    { zh: "Meera 已释放付款 · ACME 已即时通知", es: "Meera liberó el pago · ACME notificado al instante", ja: "Meera が支払いをリリース · ACME に即時通知", de: "Meera hat Zahlung freigegeben · ACME sofort benachrichtigt", fr: "Meera a débloqué le paiement · ACME notifié instantanément", ko: "Meera가 결제 릴리스 · ACME 즉시 알림", pt: "Meera liberou o pagamento · ACME notificada instantaneamente", it: "Meera ha rilasciato il pagamento · ACME notificata subito", ar: "أطلقت Meera الدفع · تم إخطار ACME فورا" },
  ],
];

export const homepageExtraTextMap = Object.fromEntries(
  (["en", "zh", "es", "ja", "de", "fr", "ko", "pt", "it", "ar"] as Locale[]).map((locale) => [
    locale,
    Object.fromEntries(
      [...entries, ...animationAndCaseStudyEntries, ...parallaxDashboardEntries, ...bomAndWorkflowMicrocopyEntries, ...landingAnimationSupplementEntries].map(([source, translations]) => [
        source,
        locale === "en" ? source : translations[locale],
      ]),
    ),
  ]),
) as Record<Locale, Record<string, string>>;

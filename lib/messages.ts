export type Lang = "ko" | "en";

export const messages: Record<Lang, Record<string, string>> = {
  ko: {
    // Nav
    "nav.home": "Home",
    "nav.products": "Products",
    "nav.ailab": "AI Lab",
    "nav.about": "About",
    "nav.partnership": "Partnership",
    "nav.contact": "Contact",
    "nav.partnerCta": "Partner with us",

    // Home
    "home.hero.title.1": "Create Faster, ",
    "home.hero.title.2": "Move Whik.",
    "home.hero.subtitle":
      "AI로 창작의 경계를 허뭅니다. Whik Ecosystem은 스토리 제작부터 3D·AR, B2B AI PoC까지 하나로 연결합니다.",
    "home.hero.viewProducts": "제품 둘러보기",
    "home.hero.partnerInquiry": "파트너 문의",

    // Home cards
    "home.card.studio.title": "Whik Studio",
    "home.card.studio.desc": "AI 기반 모션웹툰·스토리 제작",
    "home.card.3d.title": "Whik 3D Converter",
    "home.card.3d.desc": "이미지 1장으로 3D·AR 생성",
    "home.card.lab.title": "Whik AI Lab",
    "home.card.lab.desc": "B2B AI PoC 및 컨설팅",
    "home.card.more": "자세히 보기 →",

    // Products page
    "products.header.title": "Whik Products",
    "products.header.subtitle": "AI 기반 창작을 가속하는 두 가지 핵심 도구",
    "products.studio.more": "데모 문의 →",
    "products.3d.more": "도입 상담 →",

    // About
    "about.kicker": "About Whik",
    "about.hero.title": "AI로 창작의 경계를 허무는 혁신",
    "about.hero.desc":
      "Whik은 스토리텔링에서 3D·AR, B2B AI PoC까지 이어지는 통합 생태계를 구축합니다. 누구나 더 빠르게 창작하고, 더 쉽게 배포할 수 있도록.",
    "about.vision": "Vision",
    "about.vision.title": "모든 창작자가 AI의 힘을 쉽게 활용할 수 있는 세상",
    "about.vision.desc":
      "Create Faster, Move Whik. 접근 가능한 인터페이스와 지능형 도구를 통해 아이디어가 곧 결과물이 되는 미래를 지향합니다.",
    "about.mission": "Mission",
    "about.mission.desc":
      "스토리텔링부터 3D·AR, B2B AI까지 연결된 워크플로우를 제공하여 창작과 비즈니스의 간극을 줄입니다.",
    "about.values": "Values",
    "about.values.accessible": "누구나 쉽게 쓰는 인터페이스와 온보딩",
    "about.values.intelligent": "AI 기반 자동화와 보조 기능으로 속도 향상",
    "about.values.integrated": "Studio–3D–AI가 하나의 생태계로 동작",
    "about.milestones": "Milestones",

    "about.ms.1.year": "2025.11",
    "about.ms.1.title": "Whik AI Lab 론칭",
    "about.ms.1.desc": "B2B PoC/컨설팅 허브 오픈",

    "about.ms.2.year": "2026 상반기",
    "about.ms.2.title": "Whik Studio · 3D 오픈베타",
    "about.ms.2.desc": "크리에이터 사용자 테스트",

    "about.ms.3.year": "2027+",
    "about.ms.3.title": "Ecosystem 확장",
    "about.ms.3.desc": "Toon · Edu · 글로벌 파트너십",

    "about.globalReady.title": "Global Ready",
    "about.globalReady.desc": "EN · KR · JP · ZH 지원, 해외 파트너 연계",
    "about.partnerCta": "파트너 문의",

    // Partnership
    "p.kicker": "Partnership",
    "p.hero.title": "함께 성장하는 파트너십",
    "p.hero.desc":
      "기업의 디지털 전환부터 크리에이터/콘텐츠 협업, AI 기술 연동까지. Whik과 함께 빠르고 단단한 결과를 만드세요.",
    "p.pills.enterprise": "Enterprise",
    "p.pills.creator": "Creator/Content",
    "p.pills.tech": "Tech & R&D",
    "p.pills.invest": "Investment",

    "p.enterprise.title": "기업 파트너십",
    "p.enterprise.li1": "맞춤형 AI PoC 기획·개발",
    "p.enterprise.li2": "기술 컨설팅 및 교육",
    "p.enterprise.li3": "장기 전환/운영 파트너십",

    "p.creator.title": "콘텐츠 파트너십",
    "p.creator.li1": "Studio 도구 공급",
    "p.creator.li2": "3D/AR 콘텐츠 제작 지원",
    "p.creator.li3": "수익 공유 모델",

    "p.tech.title": "기술 파트너십",
    "p.tech.li1": "API 연동 및 통합",
    "p.tech.li2": "오픈소스 기여",
    "p.tech.li3": "공동 연구·실험",

    "p.why.title": "Why Whik",
    "p.why.li1": "스토리–3D–AI를 하나의 워크플로우로 묶는 통합력",
    "p.why.li2": "라이트한 UI/온보딩으로 빠른 팀 도입",
    "p.why.li3": "PoC→프로덕션까지 이어지는 실행 중심 협업",

    "p.effects.title": "도입 효과",
    "p.effects.speed.value": "↑3x",
    "p.effects.speed.label": "콘텐츠 제작 속도",
    "p.effects.cost.value": "↓40%",
    "p.effects.cost.label": "PoC 비용",
    "p.effects.acc.value": "↑92%",
    "p.effects.acc.label": "3D 변환 정확도(예시)",
    "p.effects.prod.value": "→Prod.",
    "p.effects.prod.label": "프로덕션 연계",

    "p.process.title": "협업 프로세스",
    "p.process.01.title": "Discovery",
    "p.process.01.desc": "목표 정의 · 요구사항 수집",
    "p.process.02.title": "Design",
    "p.process.02.desc": "아키텍처 · 데이터 · UX 설계",
    "p.process.03.title": "PoC",
    "p.process.03.desc": "파일럿 기능 개발/테스트",
    "p.process.04.title": "Scale",
    "p.process.04.desc": "운영/고도화 · 성과확장",

    "p.invest.title": "투자 문의",
    "p.invest.desc": "Whik의 성장에 함께하세요 · 시리즈 B 라운드 준비 중",
    "p.invest.cta": "투자 담당자 연락",

    "p.cta.title": "파트너십 문의",
    "p.cta.desc": "Whik와 함께 혁신을 만들어가세요.",
    "p.cta.primary": "문의하기",
    "p.cta.secondary": "이메일로 문의",

    // Footer
    "footer.copyright": "© Whik Company 2025",
    "footer.email": "contact@whik.company",

    // Contact
    "contact.title": "Contact",
    "contact.subtitle": "파트너십/투자/일반 문의",
    "contact.name": "이름",
    "contact.email": "이메일",
    "contact.company": "회사명(선택)",
    "contact.message": "메시지",
    "contact.send": "Send",
    "contact.sending": "Sending...",
    "contact.success": "문의가 접수되었습니다.",
  },

  en: {
    // Nav
    "nav.home": "Home",
    "nav.products": "Products",
    "nav.ailab": "AI Lab",
    "nav.about": "About",
    "nav.partnership": "Partnership",
    "nav.contact": "Contact",
    "nav.partnerCta": "Partner with us",

    // Home
    "home.hero.title.1": "Create Faster, ",
    "home.hero.title.2": "Move Whik.",
    "home.hero.subtitle":
      "We remove the boundaries of creation with AI. The Whik ecosystem connects storytelling to 3D/AR and B2B AI PoC—all in one.",
    "home.hero.viewProducts": "View products",
    "home.hero.partnerInquiry": "Partner inquiry",

    // Home cards
    "home.card.studio.title": "Whik Studio",
    "home.card.studio.desc": "AI-powered motion webtoon & storytelling",
    "home.card.3d.title": "Whik 3D Converter",
    "home.card.3d.desc": "Generate 3D & AR from a single image",
    "home.card.lab.title": "Whik AI Lab",
    "home.card.lab.desc": "B2B AI PoC & consulting",
    "home.card.more": "Learn more →",

    // Products page
    "products.header.title": "Whik Products",
    "products.header.subtitle": "Two core tools that accelerate AI-driven creation",
    "products.studio.more": "Request a demo →",
    "products.3d.more": "Talk to sales →",

    // About
    "about.kicker": "About Whik",
    "about.hero.title": "Innovation that removes the boundaries of creation",
    "about.hero.desc":
      "Whik builds an integrated ecosystem that spans storytelling, 3D/AR, and B2B AI PoC—so anyone can create faster and distribute easier.",
    "about.vision": "Vision",
    "about.vision.title": "A world where every creator can easily use AI",
    "about.vision.desc":
      "Create Faster, Move Whik. With accessible interfaces and intelligent tools, ideas become outcomes instantly.",
    "about.mission": "Mission",
    "about.mission.desc":
      "We provide a connected workflow from storytelling to 3D/AR and B2B AI, narrowing the gap between creation and business.",
    "about.values": "Values",
    "about.values.accessible": "Accessible onboarding & UI for everyone",
    "about.values.intelligent": "AI automation & assistance for speed",
    "about.values.integrated": "Studio–3D–AI working as one ecosystem",
    "about.milestones": "Milestones",

    "about.ms.1.year": "2025.11",
    "about.ms.1.title": "Whik AI Lab launch",
    "about.ms.1.desc": "B2B PoC/consulting hub opens",

    "about.ms.2.year": "2026 H1",
    "about.ms.2.title": "Whik Studio · 3D open beta",
    "about.ms.2.desc": "Creator user testing",

    "about.ms.3.year": "2027+",
    "about.ms.3.title": "Ecosystem expansion",
    "about.ms.3.desc": "Toon · Edu · global partnerships",

    "about.globalReady.title": "Global Ready",
    "about.globalReady.desc": "Supports EN · KR · JP · ZH, with global partners",
    "about.partnerCta": "Contact partnerships",

    // Partnership
    "p.kicker": "Partnership",
    "p.hero.title": "Partnerships that grow together",
    "p.hero.desc":
      "From enterprise digital transformation to creator/content collaboration and AI integrations—build fast and solid with Whik.",
    "p.pills.enterprise": "Enterprise",
    "p.pills.creator": "Creator/Content",
    "p.pills.tech": "Tech & R&D",
    "p.pills.invest": "Investment",

    "p.enterprise.title": "Enterprise Partnerships",
    "p.enterprise.li1": "Custom AI PoC planning & development",
    "p.enterprise.li2": "Technical consulting & training",
    "p.enterprise.li3": "Long-term transformation/operations",

    "p.creator.title": "Content Partnerships",
    "p.creator.li1": "Provide Studio tools",
    "p.creator.li2": "Support 3D/AR content production",
    "p.creator.li3": "Revenue-sharing model",

    "p.tech.title": "Technology Partnerships",
    "p.tech.li1": "API integration and consolidation",
    "p.tech.li2": "Open-source contributions",
    "p.tech.li3": "Joint research & experiments",

    "p.why.title": "Why Whik",
    "p.why.li1": "Unified workflow that connects Story–3D–AI",
    "p.why.li2": "Lightweight UI/onboarding for fast team adoption",
    "p.why.li3": "Execution-focused collaboration from PoC to production",

    "p.effects.title": "Business Impact",
    "p.effects.speed.value": "↑3x",
    "p.effects.speed.label": "Content production speed",
    "p.effects.cost.value": "↓40%",
    "p.effects.cost.label": "PoC cost",
    "p.effects.acc.value": "↑92%",
    "p.effects.acc.label": "3D conversion accuracy (sample)",
    "p.effects.prod.value": "→Prod.",
    "p.effects.prod.label": "Production handoff",

    "p.process.title": "Collaboration Process",
    "p.process.01.title": "Discovery",
    "p.process.01.desc": "Define goals · collect requirements",
    "p.process.02.title": "Design",
    "p.process.02.desc": "Architecture · data · UX design",
    "p.process.03.title": "PoC",
    "p.process.03.desc": "Build/test pilot features",
    "p.process.04.title": "Scale",
    "p.process.04.desc": "Operate/improve · scale outcomes",

    "p.invest.title": "Investment",
    "p.invest.desc": "Join Whik's growth · preparing for Series B",
    "p.invest.cta": "Contact investment team",

    "p.cta.title": "Partnership Inquiry",
    "p.cta.desc": "Build innovation with Whik.",
    "p.cta.primary": "Contact us",
    "p.cta.secondary": "Email us",

    // Footer
    "footer.copyright": "© Whik Company 2025",
    "footer.email": "contact@whik.company",

    // Contact
    "contact.title": "Contact",
    "contact.subtitle": "Partnership/Investment/General inquiries",
    "contact.name": "Name",
    "contact.email": "Email",
    "contact.company": "Company (optional)",
    "contact.message": "Message",
    "contact.send": "Send",
    "contact.sending": "Sending...",
    "contact.success": "Your inquiry has been received.",
  },
};

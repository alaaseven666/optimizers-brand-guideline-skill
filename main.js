const UI_STRINGS = {
    en: {
        heroTitle: "Discover the Wild",
        heroSub: "Exploring the deep connection between humans and our furry companions.",
        readMore: "Read Story",
        logo: "OPTIMIZERS",
        navBlog: "Blog",
        navBrand: "Brand Guidelines"
    },
    ar: {
        heroTitle: "اكتشف البرية",
        heroSub: "استكشاف العلاقة العميقة بين البشر ورفاقنا ذوي الفراء.",
        readMore: "اقرأ القصة",
        logo: "أوبتمايزرز",
        navBlog: "المدونة",
        navBrand: "هوية العلامة"
    }
};

const POSTS = [
    { id: 1, category: "dogs", en: { title: "The Silent Guardian", exc: "Exploring the role of loyal companions." }, ar: { title: "الحارس الصامت", exc: "استكشاف دور الرفقاء المخلصين." }, img: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=800" },
    { id: 2, category: "cats", en: { title: "Majesty of the Feline", exc: "Understanding the graceful hunter." }, ar: { title: "جلالة القطط", exc: "فهم الصياد اللطيف." }, img: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=800" },
    { id: 3, category: "dogs", en: { title: "Infinite Loyalty", exc: "Why dogs are truly our best friends." }, ar: { title: "ولاء لا نهائي", exc: "لماذا الكلاب حقاً أفضل أصدقائنا." }, img: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=800" },
    { id: 4, category: "cats", en: { title: "Urban Shadows", exc: "Cats in the modern landscape." }, ar: { title: "ظلال حضرية", exc: "القطط في المشهد الحديث." }, img: "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?auto=format&fit=crop&q=80&w=800" }
];

let state = {
    theme: localStorage.getItem('v2_theme') || 'dark',
    lang: localStorage.getItem('v2_lang') || 'en',
    currentView: 'blog'
};

function init() {
    applyTheme();
    applyLang();
    renderPosts();
    bindEvents();
}

function applyTheme() {
    document.documentElement.setAttribute('data-theme', state.theme);
    localStorage.setItem('v2_theme', state.theme);
}

function applyLang() {
    document.documentElement.setAttribute('lang', state.lang);
    document.documentElement.setAttribute('dir', state.lang === 'ar' ? 'rtl' : 'ltr');
    document.getElementById('langToggle').textContent = state.lang === 'en' ? 'AR' : 'EN';
    
    // Update texts
    const strings = UI_STRINGS[state.lang];
    document.getElementById('t-hero-title').textContent = strings.heroTitle;
    document.getElementById('t-hero-sub').textContent = strings.heroSub;
    document.querySelectorAll('.nav-link').forEach(link => {
        const view = link.dataset.view;
        link.textContent = view === 'blog' ? strings.navBlog : strings.navBrand;
    });
    
    renderPosts();
    localStorage.setItem('v2_lang', state.lang);
}

function renderPosts() {
    const grid = document.getElementById('blogGrid');
    if (!grid) return;
    
    grid.innerHTML = POSTS.map(post => `
        <article class="post-card">
            <img src="${post.img}" class="post-img" alt="">
            <div class="post-content">
                <span class="post-tag">${post.category}</span>
                <h3>${post[state.lang].title}</h3>
                <p style="color: var(--text-muted); font-size: 0.9rem; margin: 10px 0;">${post[state.lang].exc}</p>
                <div style="color: var(--accent-adaptive); font-weight: 800; font-size: 0.8rem; margin-top: 20px;">
                    ${UI_STRINGS[state.lang].readMore} →
                </div>
            </div>
        </article>
    `).join('');
}

function bindEvents() {
    document.getElementById('themeToggle').addEventListener('click', () => {
        state.theme = state.theme === 'dark' ? 'light' : 'dark';
        applyTheme();
    });

    document.getElementById('langToggle').addEventListener('click', () => {
        state.lang = state.lang === 'en' ? 'ar' : 'en';
        applyLang();
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            const targetView = link.dataset.view;
            document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
            document.getElementById(targetView + 'View').classList.add('active');
        });
    });
}

init();

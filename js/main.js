/**
 * 煮趣 CSE 官网 - 公共 JavaScript
 */

// ===========================
// 工具函数
// ===========================

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

// ===========================
// 导航栏
// ===========================

function initNavbar() {
  const navbar = $('.navbar');
  const hamburger = $('.hamburger');
  const mobileMenu = $('.mobile-menu');

  // 滚动样式
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  // 汉堡菜单
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    // 点击菜单项关闭
    $$('a', mobileMenu).forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // 点击外部关闭
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && !mobileMenu.contains(e.target)) {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // 高亮当前页面
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  $$('.navbar-nav a, .mobile-menu a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPath || (currentPath === 'index.html' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
}

// ===========================
// 语言切换
// ===========================

const i18n = {
  zh: {
    nav_home: '首页',
    nav_services: '服务',
    nav_cases: '案例',
    nav_resources: '资源·社区',
    nav_global: '出海专页',
    nav_insights: '洞见',
    nav_contact: '合作',
    cta_free: '免费诊断',
    float_cta: '🎯 免费增长诊断',
  },
  en: {
    nav_home: 'Home',
    nav_services: 'Services',
    nav_cases: 'Case Studies',
    nav_resources: 'Resources',
    nav_global: 'Global',
    nav_insights: 'Insights',
    nav_contact: 'Contact',
    cta_free: 'Free Consult',
    float_cta: '🎯 Free Diagnosis',
  }
};

function initLangSwitch() {
  const langBtns = $$('.lang-btn');
  let currentLang = localStorage.getItem('cse_lang') || 'zh';

  function setLang(lang) {
    currentLang = lang;
    localStorage.setItem('cse_lang', lang);
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';

    langBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // 更新所有带 data-i18n 的元素
    $$('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (i18n[lang][key]) {
        el.textContent = i18n[lang][key];
      }
    });
  }

  langBtns.forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
  });

  setLang(currentLang);
}

// ===========================
// 悬浮CTA + 回到顶部
// ===========================

function initFloatCTA() {
  const backToTop = $('.back-to-top');
  if (!backToTop) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===========================
// FAQ 折叠
// ===========================

function initFAQ() {
  $$('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      // 关闭所有
      $$('.faq-item').forEach(i => i.classList.remove('open'));

      // 切换当前
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });
}

// ===========================
// 服务卡片折叠
// ===========================

function initServiceCards() {
  $$('.service-card').forEach(card => {
    const header = card.querySelector('.service-card-header');
    if (header) {
      header.addEventListener('click', () => {
        card.classList.toggle('expanded');
      });
    }
  });
}

// ===========================
// 案例筛选
// ===========================

function initCaseFilter() {
  const filterBtns = $$('.filter-btn');
  const caseCards = $$('.case-card-wrap');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      caseCards.forEach(card => {
        if (filter === 'all' || card.dataset.tags?.includes(filter)) {
          card.style.display = '';
          card.style.animation = 'fadeInUp 0.4s ease both';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// ===========================
// 轮播
// ===========================

function initCarousel(containerSel) {
  const container = $(containerSel);
  if (!container) return;

  const track = container.querySelector('.carousel-track');
  const items = $$('.carousel-item', track);
  const dotsContainer = container.querySelector('.carousel-dots');
  const prevBtn = container.querySelector('.carousel-prev');
  const nextBtn = container.querySelector('.carousel-next');

  if (!track || items.length === 0) return;

  let current = 0;
  let visibleCount = getVisibleCount();
  const total = Math.ceil(items.length / visibleCount);

  function getVisibleCount() {
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  }

  // 创建dots
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < total; i++) {
      const dot = document.createElement('div');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    }
  }

  function updateDots() {
    if (!dotsContainer) return;
    $$('.carousel-dot', dotsContainer).forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  function goTo(index) {
    visibleCount = getVisibleCount();
    const maxIndex = Math.ceil(items.length / visibleCount) - 1;
    current = Math.max(0, Math.min(index, maxIndex));
    const itemWidth = items[0].offsetWidth + 24;
    track.style.transform = `translateX(-${current * visibleCount * itemWidth}px)`;
    updateDots();
  }

  if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

  // 自动播放
  let autoPlay = setInterval(() => goTo(current + 1 > Math.ceil(items.length / visibleCount) - 1 ? 0 : current + 1), 4500);

  container.addEventListener('mouseenter', () => clearInterval(autoPlay));
  container.addEventListener('mouseleave', () => {
    autoPlay = setInterval(() => goTo(current + 1 > Math.ceil(items.length / visibleCount) - 1 ? 0 : current + 1), 4500);
  });

  window.addEventListener('resize', () => goTo(0));
}

// ===========================
// 计数动画
// ===========================

function animateCounter(el, target, suffix = '', duration = 1800) {
  const start = Date.now();
  const startVal = 0;

  function update() {
    const elapsed = Date.now() - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(startVal + (target - startVal) * eased);
    el.textContent = current + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

function initCounters() {
  const counters = $$('[data-counter]');
  if (counters.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = true;
        const target = parseInt(entry.target.dataset.counter);
        const suffix = entry.target.dataset.suffix || '';
        animateCounter(entry.target, target, suffix);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

// ===========================
// 滚动动画
// ===========================

function initScrollAnimations() {
  const elements = $$('[data-animate]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.animateDelay || '0';
        entry.target.style.animationDelay = delay + 'ms';
        entry.target.classList.add('animate-fadeInUp');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });
}

// ===========================
// 表单提交
// ===========================

function initForms() {
  $$('.contact-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const btn = form.querySelector('[type="submit"]');
      const originalText = btn.textContent;

      btn.textContent = '发送中...';
      btn.disabled = true;

      // 模拟提交
      setTimeout(() => {
        btn.textContent = '✓ 已提交！';
        btn.style.background = '#2B5E3B';

        // 显示感谢消息
        const thanks = form.querySelector('.form-thanks');
        if (thanks) {
          form.style.display = 'none';
          thanks.style.display = 'block';
        } else {
          setTimeout(() => {
            btn.textContent = originalText;
            btn.disabled = false;
            btn.style.background = '';
            form.reset();
          }, 3000);
        }
      }, 1200);
    });
  });
}

// ===========================
// 邮件订阅
// ===========================

function initEmailCapture() {
  $$('.email-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const btn = form.querySelector('button');

      if (!input.value || !input.value.includes('@')) {
        input.style.borderColor = 'red';
        return;
      }

      btn.textContent = '✓ 已订阅！';
      btn.disabled = true;
      input.disabled = true;
      input.style.borderColor = '';
    });
  });
}

// ===========================
// Logo滚动墙（复制为2倍）
// ===========================

function initLogoWall() {
  $$('.logo-track').forEach(track => {
    const items = track.innerHTML;
    track.innerHTML = items + items;
  });
}

// ===========================
// 初始化所有
// ===========================

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initLangSwitch();
  initFloatCTA();
  initFAQ();
  initServiceCards();
  initCaseFilter();
  initCarousel('.cases-carousel');
  initCounters();
  initScrollAnimations();
  initForms();
  initEmailCapture();
  initLogoWall();
});

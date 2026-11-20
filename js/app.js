// originzero.art application logic
// Handles bilingual state, contact form formatting, and interactive navigation

(function () {
  'use strict';

  // Application configuration
  const CONFIG = {
    defaultLang: 'en',
    defaultTheme: 'dark',
    contactEmail: 'contact@originzero.art', // Destination for creator inquiries
    founderPortalUrl: 'https://banszky.men/#contact', // Founder direct contact portal
    repositoryUrl: 'https://github.com/originzero-art/originzero.art', // Public open-source repository
    storageKey: 'originzero_preferred_language',
    themeStorageKey: 'originzero_preferred_theme'
  };

  // State
  let currentLang = CONFIG.defaultLang;
  let currentTheme = CONFIG.defaultTheme;

  // Check stored preference if previously toggled by user; otherwise strictly default to English
  try {
    const saved = localStorage.getItem(CONFIG.storageKey);
    if (saved === 'ro' || saved === 'en') {
      currentLang = saved;
    }
  } catch (e) {
    currentLang = CONFIG.defaultLang;
  }

  // Check stored theme preference
  try {
    const savedTheme = localStorage.getItem(CONFIG.themeStorageKey);
    if (savedTheme === 'light' || savedTheme === 'dark') {
      currentTheme = savedTheme;
    }
  } catch (e) {
    currentTheme = CONFIG.defaultTheme;
  }

  // DOM Elements
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = document.getElementById('theme-icon');
  const langToggleBtn = document.getElementById('lang-toggle-btn');
  const langLabelCurrent = document.getElementById('lang-label-current');
  const contactForm = document.getElementById('creator-contact-form');
  const formFeedback = document.getElementById('form-feedback');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const primaryNav = document.getElementById('primary-nav');

  /**
   * Safe accessor for the bilingual translation dictionary
   * @param {string} lang - 'en' or 'ro'
   * @returns {object|null}
   */
  function getTranslationsDict(lang) {
    let dict = null;
    if (typeof window !== 'undefined' && window.TRANSLATIONS) {
      dict = window.TRANSLATIONS;
    } else if (typeof TRANSLATIONS !== 'undefined') {
      dict = TRANSLATIONS;
    }
    if (dict && dict[lang]) {
      return dict[lang];
    }
    return null;
  }

  /**
   * Apply translations to the document
   * @param {string} lang - 'en' or 'ro'
   */
  function applyLanguage(lang) {
    const t = getTranslationsDict(lang);
    if (!t) {
      console.warn('Translations unavailable for language:', lang);
      return;
    }
    currentLang = lang;

    // Set root html lang attribute
    document.documentElement.lang = lang;

    // Update document title and meta description
    if (t.meta_title) document.title = t.meta_title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && t.meta_desc) {
      metaDesc.setAttribute('content', t.meta_desc);
    }
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle && t.meta_title) {
      ogTitle.setAttribute('content', t.meta_title);
    }
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc && t.meta_desc) {
      ogDesc.setAttribute('content', t.meta_desc);
    }

    function isSafeHref(href) {
      if (!href) return false;
      return (
        href.startsWith('https://originzero.art') ||
        href.startsWith('https://757.originzero.art') ||
        href.startsWith('https://spartan.originzero.art') ||
        href.startsWith('https://crimadezignz.originzero.art') ||
        href.startsWith('https://banszky.men') ||
        href.startsWith('/') ||
        href === 'acord-gramatical.html'
      );
    }

    function renderTranslatedMarkup(el, rawMarkup) {
      el.textContent = '';
      const parser = new DOMParser();
      const doc = parser.parseFromString(rawMarkup, 'text/html');
      const frag = document.createDocumentFragment();

      function cloneSafeNode(node) {
        if (node.nodeType === Node.TEXT_NODE) {
          return document.createTextNode(node.nodeValue || '');
        }
        if (node.nodeType !== Node.ELEMENT_NODE) {
          return null;
        }
        const tag = node.tagName.toLowerCase();
        if (tag !== 'a' && tag !== 'span' && tag !== 'strong') {
          return document.createTextNode(node.textContent || '');
        }
        const out = document.createElement(tag);
        const cls = node.getAttribute('class');
        if (cls) out.setAttribute('class', cls);
        if (tag === 'a') {
          const href = node.getAttribute('href') || '';
          if (isSafeHref(href)) {
            out.setAttribute('href', href);
          }
          const target = node.getAttribute('target');
          if (target === '_blank') {
            out.setAttribute('target', '_blank');
            out.setAttribute('rel', 'noopener noreferrer');
          }
          const title = node.getAttribute('title');
          if (title) out.setAttribute('title', title);
        }
        Array.from(node.childNodes).forEach(function (child) {
          const safeChild = cloneSafeNode(child);
          if (safeChild) out.appendChild(safeChild);
        });
        return out;
      }

      Array.from(doc.body.childNodes).forEach(function (child) {
        const safeChild = cloneSafeNode(child);
        if (safeChild) frag.appendChild(safeChild);
      });
      el.appendChild(frag);
    }

    // Update text elements with data-i18n
    const translatableElements = document.querySelectorAll('[data-i18n]');
    translatableElements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (key && Object.prototype.hasOwnProperty.call(t, key) && t[key] !== undefined) {
        if (typeof t[key] === 'string' && (t[key].includes('<a ') || t[key].includes('<span ') || t[key].includes('<strong '))) {
          renderTranslatedMarkup(el, t[key]);
        } else {
          el.textContent = t[key];
        }
      }
    });

    // Update placeholders
    const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
    placeholderElements.forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (key && Object.prototype.hasOwnProperty.call(t, key) && t[key] !== undefined) {
        el.setAttribute('placeholder', t[key]);
      }
    });

    // Update aria labels
    const ariaElements = document.querySelectorAll('[data-i18n-aria]');
    ariaElements.forEach(el => {
      const key = el.getAttribute('data-i18n-aria');
      if (key && Object.prototype.hasOwnProperty.call(t, key) && t[key] !== undefined) {
        el.setAttribute('aria-label', t[key]);
      }
    });

    // Update image alt texts
    const altElements = document.querySelectorAll('[data-i18n-alt]');
    altElements.forEach(el => {
      const key = el.getAttribute('data-i18n-alt');
      if (key && Object.prototype.hasOwnProperty.call(t, key) && t[key] !== undefined) {
        el.setAttribute('alt', t[key]);
      }
    });

    // Update switcher visuals
    if (langLabelCurrent) {
      langLabelCurrent.textContent = lang.toUpperCase();
    }
    const enIndicator = document.getElementById('lang-indicator-en');
    const roIndicator = document.getElementById('lang-indicator-ro');
    if (enIndicator && roIndicator) {
      if (lang === 'en') {
        enIndicator.classList.add('active');
        roIndicator.classList.remove('active');
        enIndicator.setAttribute('aria-pressed', 'true');
        roIndicator.setAttribute('aria-pressed', 'false');
      } else {
        roIndicator.classList.add('active');
        enIndicator.classList.remove('active');
        roIndicator.setAttribute('aria-pressed', 'true');
        enIndicator.setAttribute('aria-pressed', 'false');
      }
    }

    // Note: Form input values (name, mail, craft, text) are strictly preserved during language switch
  }

  // Set explicit language
  function setLanguage(lang) {
    if (lang !== 'en' && lang !== 'ro') return;
    applyLanguage(lang);
    try {
      localStorage.setItem(CONFIG.storageKey, lang);
    } catch (e) {
      // Storage unavailable or disabled
    }
  }

  // Toggle Language Handler
  function toggleLanguage() {
    const nextLang = currentLang === 'en' ? 'ro' : 'en';
    setLanguage(nextLang);
  }

  const enIndicator = document.getElementById('lang-indicator-en');
  const roIndicator = document.getElementById('lang-indicator-ro');

  if (roIndicator) {
    roIndicator.addEventListener('click', function (e) {
      e.stopPropagation();
      setLanguage('ro');
    });
  }

  if (enIndicator) {
    enIndicator.addEventListener('click', function (e) {
      e.stopPropagation();
      setLanguage('en');
    });
  }

  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', function () {
      toggleLanguage();
    });
  }

  /**
   * Apply visual theme
   * @param {string} theme - 'dark' or 'light'
   */
  function applyTheme(theme) {
    currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    if (themeIcon) {
      themeIcon.textContent = theme === 'light' ? '☀' : '◐';
    }
    if (themeToggleBtn) {
      themeToggleBtn.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false');
    }
  }

  function toggleTheme() {
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    try {
      localStorage.setItem(CONFIG.themeStorageKey, nextTheme);
    } catch (e) {
      // Storage unavailable
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }

  // Mobile navigation drawer toggle
  if (mobileMenuBtn && primaryNav) {
    mobileMenuBtn.addEventListener('click', function () {
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      const nextState = !isExpanded;
      mobileMenuBtn.setAttribute('aria-expanded', String(nextState));
      mobileMenuBtn.textContent = nextState ? '✕' : '☰';
      primaryNav.classList.toggle('nav-open', nextState);
    });

    // Close menu when clicking nav links
    primaryNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function () {
        primaryNav.classList.remove('nav-open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenuBtn.textContent = '☰';
      });
    });
  }

  // Contact Form Submission Handler
  if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const nameInput = document.getElementById('creator-name');
      const emailInput = document.getElementById('creator-email');
      const craftInput = document.getElementById('creator-craft');
      const messageInput = document.getElementById('creator-message');

      const nameVal = nameInput ? nameInput.value.trim() : '';
      const emailVal = emailInput ? emailInput.value.trim() : '';
      const craftVal = craftInput ? craftInput.value : '';
      const messageVal = messageInput ? messageInput.value.trim() : '';

      const t = getTranslationsDict(currentLang) || {};

      // Reset feedback
      if (formFeedback) {
        formFeedback.textContent = '';
        formFeedback.className = 'form-feedback-area';
      }

      // Validation
      if (!nameVal || !emailVal) {
        if (formFeedback) {
          formFeedback.textContent = t.form_err_required;
          formFeedback.classList.add('feedback-error');
          formFeedback.setAttribute('role', 'alert');
        }
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailVal)) {
        if (formFeedback) {
          formFeedback.textContent = t.form_err_email;
          formFeedback.classList.add('feedback-error');
          formFeedback.setAttribute('role', 'alert');
        }
        return;
      }

      const craftName = craftInput && craftInput.selectedOptions && craftInput.selectedOptions[0]
        ? craftInput.selectedOptions[0].textContent
        : craftVal;

      // Loading state on button
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn ? submitBtn.textContent : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = t.form_submitting || (currentLang === 'ro' ? 'Se trimite mesajul...' : 'Sending inquiry...');
      }

      // Transmit inquiry to origin contact endpoint
      fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: nameVal,
          email: emailVal,
          craft: craftName,
          message: messageVal
        })
      })
      .then(async function (response) {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalBtnText;
        }

        if (response.ok) {
          const resData = await response.json().catch(() => ({ success: true }));
          if (resData && resData.success) {
            if (formFeedback) {
              formFeedback.textContent = t.form_sent_success || (currentLang === 'ro'
                ? 'Îți mulțumim! Solicitarea ta a fost transmisă direct către contact@originZero.Art. Ți-am trimis o confirmare și pe adresa de e-mail.'
                : 'Thank you! Your inquiry has been sent directly to contact@originZero.Art. A confirmation has also been sent to your email.');
              formFeedback.className = 'form-feedback-area feedback-success';
              formFeedback.setAttribute('role', 'status');
            }
            // Clear inputs
            if (nameInput) nameInput.value = '';
            if (emailInput) emailInput.value = '';
            if (craftInput) craftInput.selectedIndex = 0;
            if (messageInput) messageInput.value = '';
            if (formSuccessBox) formSuccessBox.hidden = true;
            return;
          }
        }
        // Server returned an error
        if (formFeedback) {
          formFeedback.textContent = t.form_send_error || (currentLang === 'ro'
            ? 'Mesajul nu a putut fi transmis automat. Te rugăm să ne scrii direct la contact@originZero.Art.'
            : 'Unable to deliver your message automatically. Please write directly to contact@originZero.Art.');
          formFeedback.className = 'form-feedback-area feedback-error';
          formFeedback.setAttribute('role', 'alert');
        }
      })
      .catch(function () {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalBtnText;
        }
        if (formFeedback) {
          formFeedback.textContent = t.form_send_error || (currentLang === 'ro'
            ? 'Mesajul nu a putut fi transmis automat. Te rugăm să ne scrii direct la contact@originZero.Art.'
            : 'Unable to deliver your message automatically. Please write directly to contact@originZero.Art.');
          formFeedback.className = 'form-feedback-area feedback-error';
          formFeedback.setAttribute('role', 'alert');
        }
      });
    });
  }

  /**
   * Luxury Motion Engine: Dynamic Cursor Spotlight on Luxury Cards
   */
  function initSpotlightTracking() {
    const cards = document.querySelectorAll('.luxury-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', function (e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--spotlight-x', x + 'px');
        card.style.setProperty('--spotlight-y', y + 'px');
      });
    });
  }

  /**
   * Luxury Motion Engine: Scroll Reveal with Intersection Observer
   */
  function initScrollReveal() {
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealElements = document.querySelectorAll('.reveal-on-scroll');

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      revealElements.forEach(el => el.classList.add('revealed'));
      return;
    }

    const observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  }

  /**
   * Luxury Motion Engine: Subtle 3D Perspective Tilt for Hero Visual
   */
  function initHeroTilt() {
    const heroCard = document.querySelector('.hero-visual-card');
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!heroCard || prefersReducedMotion) return;

    heroCard.addEventListener('mousemove', function (e) {
      const rect = heroCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;
      heroCard.style.transform = 'perspective(1000px) rotateX(' + rotateX.toFixed(2) + 'deg) rotateY(' + rotateY.toFixed(2) + 'deg) translateY(-4px)';
    });

    heroCard.addEventListener('mouseleave', function () {
      heroCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  }

  /**
   * Information & Community Model Modal Dialog
   * Modern Web Guidance: Native HTML5 <dialog> & Top Layer API
   */
  function initInfoModal() {
    const infoBtn = document.getElementById('info-modal-btn');
    const modal = document.getElementById('info-modal');
    const closeBtn = document.getElementById('info-modal-close');
    if (!infoBtn || !modal) return;

    function openModal() {
      if (typeof modal.showModal === 'function') {
        modal.showModal();
      } else {
        modal.setAttribute('open', '');
      }
      if (closeBtn) closeBtn.focus();
    }

    function closeModal() {
      if (typeof modal.close === 'function') {
        modal.close();
      } else {
        modal.removeAttribute('open');
      }
      infoBtn.focus();
    }

    infoBtn.addEventListener('click', function (e) {
      e.preventDefault();
      openModal();
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', function (e) {
        e.preventDefault();
        closeModal();
      });
    }

    // Modern light-dismiss: close when clicking on the native ::backdrop outside dialog bounds
    modal.addEventListener('click', function (e) {
      const rect = modal.getBoundingClientRect();
      const isInside = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInside) {
        closeModal();
      }
    });

    // Native <dialog> triggers 'cancel' on Escape key
    modal.addEventListener('cancel', function () {
      setTimeout(function () {
        infoBtn.focus();
      }, 0);
    });
  }

  // Initialize on DOM load
  document.addEventListener('DOMContentLoaded', function () {
    applyLanguage(currentLang);
    applyTheme(currentTheme);
    initSpotlightTracking();
    initScrollReveal();
    initHeroTilt();
    initInfoModal();
  });
})();


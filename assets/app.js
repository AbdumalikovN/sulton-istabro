(() => {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = document.documentElement;

  /* ------------------------------------------------------------------
     Wedding facts — change them here and the whole page follows.
     ------------------------------------------------------------------ */
  const WHEN = Date.UTC(2026, 9, 31, 13, 0, 0);           // 31.10.2026 18:00 Tashkent (UTC+5)
  const VENUE = { lat: 41.428516, lon: 69.35919 };         // Premier Hall, Qibray
  const CAL = { days: 31, firstWeekdayMonFirst: 3, day: 31 };

  const T = {
    kr: {
      html: 'uz-Cyrl', title: 'Султонбек ва Истабро — никоҳ тўйи',
      groom: 'Султонбек', bride: 'Истабро', va: 'ва', mono: 'С&И',
      l_names: 'Султонбек ва Истабро', l_names0: 'Султонбек ва Истабро',
      gate_kicker: 'Сизга мактуб бор', gate_press: 'Муҳрни босинг', gate_hint: 'Муҳр синади — мактуб очилади',
      dear_guest: 'Азиз меҳмонимиз', dear_named: 'Ҳурматли {name}',
      l_dear_guest: 'Ҳурматли меҳмонимиз!', l_dear_named: 'Ҳурматли {name}!',
      hero_sub: 'никоҳ тўйи', hero_date: '31 октябрь 2026', hero_time: 'шанба, соат 18:00', scroll: 'Пастга суринг',
      l_salom: 'Ассалому алайкум!', l_p1: 'Сизни азиз фарзандларимиз',
      l_p2: 'ларнинг никоҳ тўйлари муносабати билан 2026 йил 31 октябрь куни соат 18:00 да бўлиб ўтадиган «Висол оқшоми»га таклиф этамиз.',
      l_sign1: 'Ҳурмат ва эҳтиром ила', l_sign2: 'АБДУМАЛИК ХОЖИ ота ўғли АШРАФ СОДИКОВлар оиласи',
      d_title: 'Тўй куни', d_hint: 'Гулларни бармоғингиз билан суриб, санани очинг', d_done: 'Ана шу кун!', d_open: 'Очиш',
      d_weekday: 'шанба', d_month: 'октябрь 2026', d_time: 'соат 18:00',
      cal_title: 'Октябрь 2026', wd: ['Ду', 'Се', 'Чор', 'Пай', 'Жу', 'Шан', 'Як'],
      v_title: 'Вақт ва манзил', v_name: '«PRIMIER HALL» ресторани', v_addr: 'Қибрай тумани, Маданият массив',
      v_day: 'Шанба, 31 октябрь', v_route: 'Йўналиш олиш', v_cal: 'Календарга қўшиш',
      s_route: 'Қайси иловада очамиз?', s_cal: 'Қайси календарга қўшамиз?', cancel: 'Бекор қилиш',
      a_yn: 'Yandex Навигатор', a_ym: 'Yandex Хариталар', a_gm: 'Google Maps', a_2g: '2GIS', a_am: 'Apple Хариталар',
      a_gc: 'Google Календар', a_ics: 'Apple / Outlook календари',
      c_title: 'Тўйгача қолди', c_now: 'Тўй куни етиб келди!', c_d: 'кун', c_h: 'соат', c_m: 'дақиқа', c_s: 'сония',
      c_wait: 'Сизни интизорлик билан кутамиз', c_sign: 'Ҳурмат ва эҳтиром ила, Содиковлар оиласи', c_top: 'Бошига қайтиш',
      ev_title: 'Султонбек ва Истабро — никоҳ тўйи', ev_place: 'PRIMIER HALL ресторани, Қибрай тумани, Маданият массив',
    },
    uz: {
      html: 'uz-Latn', title: 'Sultonbek va Istabro — nikoh to‘yi',
      groom: 'Sultonbek', bride: 'Istabro', va: 'va', mono: 'S&I',
      l_names: 'Sultonbek va Istabro', l_names0: 'Sultonbek va Istabro',
      gate_kicker: 'Sizga maktub bor', gate_press: 'Muhrni bosing', gate_hint: 'Muhr sinadi — maktub ochiladi',
      dear_guest: 'Aziz mehmonimiz', dear_named: 'Hurmatli {name}',
      l_dear_guest: 'Hurmatli mehmonimiz!', l_dear_named: 'Hurmatli {name}!',
      hero_sub: 'nikoh to‘yi', hero_date: '31-oktabr 2026', hero_time: 'shanba, soat 18:00', scroll: 'Pastga suring',
      l_salom: 'Assalomu alaykum!', l_p1: 'Sizni aziz farzandlarimiz',
      l_p2: 'larning nikoh to‘ylari munosabati bilan 2026-yil 31-oktabr kuni soat 18:00 da bo‘lib o‘tadigan «Visol oqshomi»ga taklif etamiz.',
      l_sign1: 'Hurmat va ehtirom ila', l_sign2: 'ABDUMALIK HOJI ota o‘g‘li ASHRAF SODIKOVlar oilasi',
      d_title: 'To‘y kuni', d_hint: 'Gullarni barmog‘ingiz bilan surib, sanani oching', d_done: 'Ana shu kun!', d_open: 'Ochish',
      d_weekday: 'shanba', d_month: 'oktabr 2026', d_time: 'soat 18:00',
      cal_title: 'Oktabr 2026', wd: ['Du', 'Se', 'Chor', 'Pay', 'Ju', 'Shan', 'Yak'],
      v_title: 'Vaqt va manzil', v_name: '«PRIMIER HALL» restorani', v_addr: 'Qibray tumani, Madaniyat massivi',
      v_day: 'Shanba, 31-oktabr', v_route: 'Yo‘nalish olish', v_cal: 'Kalendarga qo‘shish',
      s_route: 'Qaysi ilovada ochamiz?', s_cal: 'Qaysi kalendarga qo‘shamiz?', cancel: 'Bekor qilish',
      a_yn: 'Yandex Navigator', a_ym: 'Yandex Xaritalar', a_gm: 'Google Maps', a_2g: '2GIS', a_am: 'Apple Xaritalar',
      a_gc: 'Google Kalendar', a_ics: 'Apple / Outlook kalendari',
      c_title: 'To‘ygacha qoldi', c_now: 'To‘y kuni yetib keldi!', c_d: 'kun', c_h: 'soat', c_m: 'daqiqa', c_s: 'soniya',
      c_wait: 'Sizni intizorlik bilan kutamiz', c_sign: 'Hurmat va ehtirom ila, Sodikovlar oilasi', c_top: 'Boshiga qaytish',
      ev_title: 'Sultonbek va Istabro — nikoh to‘yi', ev_place: 'PRIMIER HALL restorani, Qibray tumani, Madaniyat massivi',
    },
    ru: {
      html: 'ru', title: 'Султонбек и Истабро — свадьба',
      groom: 'Султонбек', bride: 'Истабро', va: 'и', mono: 'С&И',
      l_names: 'Султонбека и Истабро', l_names0: 'Султонбек и Истабро',
      gate_kicker: 'Вам письмо', gate_press: 'Нажмите на печать', gate_hint: 'Печать сломается — письмо откроется',
      dear_guest: 'Дорогой гость', dear_named: '{name}',
      l_dear_guest: 'Дорогой гость!', l_dear_named: '{name}!',
      hero_sub: 'свадебный вечер', hero_date: '31 октября 2026', hero_time: 'суббота, 18:00', scroll: 'Листайте вниз',
      l_salom: 'Ассалому алайкум!', l_p1: 'Приглашаем Вас на свадебный вечер наших дорогих детей',
      l_p2: '«Висол оқшоми» состоится 31 октября 2026 года в 18:00.',
      l_sign1: 'С уважением и почтением,', l_sign2: 'семья АШРАФА СОДИКОВА, сына АБДУМАЛИКА ХОЖИ ота',
      d_title: 'День свадьбы', d_hint: 'Смахните цветы пальцем — под ними дата', d_done: 'Вот этот день!', d_open: 'Открыть',
      d_weekday: 'суббота', d_month: 'октября 2026', d_time: 'в 18:00',
      cal_title: 'Октябрь 2026', wd: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
      v_title: 'Время и место', v_name: 'Ресторан «PRIMIER HALL»', v_addr: 'Кибрайский район, массив Маданият',
      v_day: 'Суббота, 31 октября', v_route: 'Построить маршрут', v_cal: 'Добавить в календарь',
      s_route: 'В каком приложении открыть?', s_cal: 'В какой календарь добавить?', cancel: 'Отмена',
      a_yn: 'Яндекс Навигатор', a_ym: 'Яндекс Карты', a_gm: 'Google Maps', a_2g: '2ГИС', a_am: 'Apple Карты',
      a_gc: 'Google Календарь', a_ics: 'Календарь Apple / Outlook',
      c_title: 'До свадьбы осталось', c_now: 'День свадьбы настал!', c_d: 'дней', c_h: 'часов', c_m: 'минут', c_s: 'секунд',
      c_wait: 'Ждём Вас с нетерпением', c_sign: 'С уважением, семья Содиковых', c_top: 'В начало',
      ev_title: 'Султонбек и Истабро — свадьба', ev_place: 'Ресторан PRIMIER HALL, Кибрайский район, массив Маданият',
    },
  };

  /* ---------- guest name + language from the link ---------- */
  const qs = new URLSearchParams(location.search);
  const guest = (qs.get('m') || '').replace(/[<>]/g, '').replace(/\s+/g, ' ').trim().slice(0, 60);
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* private mode */ } },
  };
  let lang = qs.get('til') || store.get('til') || 'kr';
  if (!T[lang]) lang = 'kr';
  let revealed = false, over = false;

  function text(key) {
    const t = T[lang];
    if (key === 'gate_dear') return guest ? t.dear_named.replace('{name}', guest) : t.dear_guest;
    if (key === 'l_dear') return guest ? t.l_dear_named.replace('{name}', guest) : t.l_dear_guest;
    if (key === 'd_hint' && revealed) return t.d_done;
    if (key === 'c_title' && over) return t.c_now;
    return t[key];
  }
  function applyLang() {
    const t = T[lang];
    root.lang = t.html; document.title = t.title;
    $$('[data-i18n]').forEach(el => { const v = text(el.dataset.i18n); if (v != null) el.textContent = v; });
    $$('[data-i18n-aria]').forEach(el => { const v = text(el.dataset.i18nAria); if (v != null) el.setAttribute('aria-label', v); });
    $$('.lang button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
    buildCalendar();
  }
  $$('.lang button').forEach(b => b.addEventListener('click', () => { lang = b.dataset.lang; store.set('til', lang); applyLang(); }));

  /* ---------- calendar ---------- */
  function buildCalendar() {
    const grid = $('#cal'); if (!grid) return;
    const cells = T[lang].wd.map(w => `<span class="wd">${w}</span>`);
    for (let i = 0; i < CAL.firstWeekdayMonFirst; i++) cells.push('<span></span>');
    for (let d = 1; d <= CAL.days; d++) {
      cells.push(d === CAL.day
        ? `<span class="is-day" aria-current="date">${d}<svg viewBox="0 0 56 56" aria-hidden="true"><circle cx="28" cy="28" r="25"/></svg></span>`
        : `<span>${d}</span>`);
    }
    grid.innerHTML = cells.join('');
  }

  /* ---------- countdown: digits roll over ---------- */
  const pad = n => String(n).padStart(2, '0');
  function setDigit(id, v) {
    const b = $('#' + id); const cur = b.querySelector('span:not(.out)');
    if (cur && cur.textContent === v) return;
    if (!cur || reduce) { b.textContent = ''; const s = document.createElement('span'); s.textContent = v; b.appendChild(s); return; }
    cur.classList.add('out'); cur.addEventListener('animationend', () => cur.remove(), { once: true });
    const s = document.createElement('span'); s.className = 'new'; s.textContent = v; b.appendChild(s);
    setTimeout(() => cur.isConnected && cur.remove(), 600);
  }
  function tick() {
    let left = Math.floor((WHEN - Date.now()) / 1000);
    if (left <= 0) { left = 0; if (!over) { over = true; $('#cdLabel').textContent = text('c_title'); } }
    setDigit('cdD', String(Math.floor(left / 86400)));
    setDigit('cdH', pad(Math.floor(left % 86400 / 3600)));
    setDigit('cdM', pad(Math.floor(left % 3600 / 60)));
    setDigit('cdS', pad(left % 60));
  }

  /* ---------- sprites: rose petals and leaves cut from the lithograph ---------- */
  const SPRITES = ['bloom-2', 'bloom-3', 'bloom-4', 'rleaf-1', 'rleaf-2', 'bloom-1'].map(n => {
    const im = new Image(); im.decoding = 'async'; im.src = `assets/art/${n}.webp`; return im;
  });
  const spritesReady = Promise.all(SPRITES.map(im => new Promise(res => {
    if (im.complete && im.naturalWidth) res(); else { im.onload = res; im.onerror = res; }
  })));
  const pick = () => Math.random() * 5 | 0;   // the big bloom (index 5) is for the veil only
  function drawSprite(ctx, x, y, s, rot, flip, alpha, kind) {
    const im = SPRITES[kind]; if (!im || !im.naturalWidth) return;
    const k = s / Math.max(im.naturalWidth, im.naturalHeight), w = im.naturalWidth * k, h = im.naturalHeight * k;
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(flip, 1); ctx.globalAlpha = alpha;
    ctx.drawImage(im, -w / 2, -h / 2, w, h); ctx.restore();
  }

  /* ---------- petals drifting down the room ---------- */
  const sky = (() => {
    const cv = $('#petals'), ctx = cv.getContext('2d');
    let w = 0, h = 0, petals = [], bits = [], last = 0;
    const fresh = (anywhere) => {
      const depth = Math.random();                      // 0 far … 1 near
      return {
        x: Math.random() * w, y: anywhere ? Math.random() * h : -40 - Math.random() * 80,
        depth, s: 14 + depth * 26, rot: Math.random() * 6.28, vr: (Math.random() - .5) * 1.2,
        vy: 12 + depth * 26, sway: .4 + Math.random() * .7, amp: 10 + Math.random() * 24, ph: Math.random() * 6.28,
        fl: .5 + Math.random() * 1.2, kind: pick(),
      };
    };
    function size() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = cv.clientWidth; h = cv.clientHeight; cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      petals = Array.from({ length: Math.round(Math.max(8, Math.min(26, w * h / 36000))) }, () => fresh(true));
      draw(0, 0);
    }
    function draw(t, dt) {
      ctx.clearRect(0, 0, w, h);
      for (const p of petals) {
        p.y += p.vy * dt; p.rot += p.vr * dt;
        if (p.y > h + 50) Object.assign(p, fresh(false));
        const x = p.x + Math.sin(t * p.sway + p.ph) * p.amp;
        drawSprite(ctx, x, p.y, p.s, p.rot, Math.cos(t * p.fl + p.ph) * .8 + .2, .55 + p.depth * .4, p.kind);
      }
      for (let i = bits.length - 1; i >= 0; i--) {
        const d = bits[i]; d.life -= dt / d.ttl;
        if (d.life <= 0) { bits.splice(i, 1); continue; }
        d.x += d.vx; d.y += d.vy; d.vy += d.leaf ? .05 : .03; d.vx *= .985;
        if (d.leaf) { d.rot += d.vr; drawSprite(ctx, d.x, d.y, d.r, d.rot, Math.cos(d.rot * 1.7), Math.min(1, d.life * 1.6), d.kind); }
        else { ctx.fillStyle = `rgba(${236 + (d.tone * 18 | 0)},${170 + (d.tone * 50 | 0)},${150 + (d.tone * 40 | 0)},${d.life})`; ctx.beginPath(); ctx.arc(d.x, d.y, d.r * (.5 + d.life * .5), 0, 6.2832); ctx.fill(); }
      }
    }
    function loop(now) {
      if (!document.hidden && now - last > 30) { const dt = Math.min(.06, (now - last) / 1000); last = now; draw(now / 1000, dt); }
      requestAnimationFrame(loop);
    }
    function burst(x, y, n = 40, asLeaves = false) {
      if (reduce) return;
      for (let i = 0; i < n; i++) {
        const ang = Math.random() * 6.2832, v = .6 + Math.random() * (asLeaves ? 4.6 : 3.4);
        bits.push({ x, y, vx: Math.cos(ang) * v, vy: Math.sin(ang) * v - 1.6, life: 1, ttl: .9 + Math.random() * 1.3, tone: Math.random(),
          leaf: asLeaves, r: asLeaves ? 18 + Math.random() * 22 : .9 + Math.random() * 2.2, rot: Math.random() * 6.28, vr: (Math.random() - .5) * .3, kind: pick() });
      }
    }
    function fling(x, y, dx, dy) {
      if (reduce || bits.length > 90) return;
      bits.push({ x, y, vx: dx * .12 + (Math.random() - .5) * 2.4, vy: dy * .12 - 1 - Math.random() * 1.6, life: 1, ttl: .8 + Math.random() * .7, tone: 0,
        leaf: true, r: 22 + Math.random() * 22, rot: Math.random() * 6.28, vr: (Math.random() - .5) * .34, kind: pick() });
    }
    size(); spritesReady.then(() => draw(0, 0));
    let rz; addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(size, 150); });
    if (!reduce) requestAnimationFrame(loop);
    return { burst, fling };
  })();

  /* ---------- scroll: parallax, foil shine ---------- */
  const hero = $('#hero');
  let ticking = false;
  function onScroll() {
    if (ticking) return; ticking = true;
    requestAnimationFrame(() => {
      const max = Math.max(1, root.scrollHeight - innerHeight);
      root.style.setProperty('--p', Math.min(1, Math.max(0, scrollY / max)).toFixed(4));
      root.style.setProperty('--shine', ((scrollY / innerHeight) * 46 % 100).toFixed(2));
      root.style.setProperty('--sy', Math.min(scrollY, hero.offsetHeight).toFixed(1) + 'px');
      ticking = false;
    });
  }
  addEventListener('scroll', onScroll, { passive: true });

  /* ---------- reveals ---------- */
  $$('section').forEach(sec => $$('.rv', sec).forEach((el, i) => el.style.setProperty('--i', i)));
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in'); io.unobserve(e.target);
    }), { threshold: .28 });
    $$('main section:not(.hero)').forEach(s => io.observe(s));
    const sheet = $('#letterSheet');
    const io2 = new IntersectionObserver(es => { if (es[0].isIntersecting) { sheet.classList.add('is-unfolded'); io2.disconnect(); } }, { threshold: .55 });
    io2.observe(sheet);
  } else { $$('main section').forEach(s => s.classList.add('in')); $('#letterSheet').classList.add('is-unfolded'); }

  /* ---------- the gate: butterfly, seal, letter, iris ---------- */
  const gate = $('#gate'), env = $('#env'), seal = $('#seal'), bf = $('#bf');
  let opening = false;
  if (!reduce) {
    bf.classList.add('is-flying');
    bf.addEventListener('animationend', e => { if (e.animationName === 'bf-in') { bf.classList.remove('is-flying'); bf.classList.add('is-resting'); } });
  } else { bf.classList.add('is-resting'); }

  function pageButterfly() {
    if (reduce) return;
    const el = document.createElement('div'); el.className = 'bf bf--page';
    el.innerHTML = bf.querySelector('.bf__body').outerHTML;
    const W = innerWidth, H = innerHeight;
    el.style.offsetPath = `path("M ${-W * .2} ${H * .22} C ${W * .1} ${H * .05}, ${W * .3} ${H * .38}, ${W * .5} ${H * .2} S ${W * .8} ${H * .04}, ${W * .95} ${H * .18} S ${W * 1.15} ${H * .3}, ${W * 1.3} ${H * .2}")`;
    document.body.appendChild(el);
    requestAnimationFrame(() => el.classList.add('is-crossing'));
    el.addEventListener('animationend', e => { if (e.animationName === 'bf-cross') el.remove(); });
  }

  function iris() {
    const r = seal.getBoundingClientRect();
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    gate.style.setProperty('--ix', cx + 'px'); gate.style.setProperty('--iy', cy + 'px'); gate.style.setProperty('--ir', '0px');
    scrollTo(0, 0);
    document.body.classList.remove('is-sealed'); document.body.classList.add('is-open');
    onScroll();
    gate.classList.add('is-iris');
    const R = Math.hypot(Math.max(cx, innerWidth - cx), Math.max(cy, innerHeight - cy)) + 40;
    const t0 = performance.now(), D = reduce ? 1 : 1400;
    (function step(now) {
      const t = Math.min(1, (now - t0) / D), e = t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      gate.style.setProperty('--ir', (R * e).toFixed(1) + 'px');
      if (t < 1) requestAnimationFrame(step);
      else { gate.classList.add('is-gone'); setTimeout(pageButterfly, 1800); }
    })(t0);
  }

  function openGate() {
    if (opening) return; opening = true;
    env.classList.add('is-pressed'); gate.classList.add('is-opening');
    const r = seal.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    setTimeout(() => {
      env.classList.add('is-open');
      bf.classList.remove('is-resting'); bf.classList.add('is-away');
      setTimeout(() => { sky.burst(cx, cy, 36); sky.burst(cx, cy, 10, true); }, 700);
    }, reduce ? 0 : 650);
    setTimeout(iris, reduce ? 50 : 4600);
  }
  seal.addEventListener('click', openGate);
  $('#pressBtn').addEventListener('click', openGate);
  env.addEventListener('click', e => { if (e.target.closest('.seal') === null) openGate(); });

  /* ---------- the date under a drift of roses ---------- */
  (() => {
    const ticket = $('#ticket'), cv = $('#foil'), hint = $('#scratchHint'), hand = $('#hand');
    const ctx = cv.getContext('2d', { willReadFrequently: true });
    let down = false, lx = 0, ly = 0, started = false, lastCheck = 0, paintedW = 0;
    let inView = false, demoRuns = 0, demoTimer = 0, demoBusy = false;

    function paint() {
      const r = cv.getBoundingClientRect(); if (!r.width) return;
      paintedW = r.width; demoRuns = 0;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = Math.round(r.width * dpr); cv.height = Math.round(r.height * dpr); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const w = r.width, h = r.height;
      const g = ctx.createLinearGradient(0, 0, w, h);
      g.addColorStop(0, '#7C865A'); g.addColorStop(.55, '#8E9468'); g.addColorStop(1, '#6F7750');
      ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
      const n = Math.round(w * h / 520);
      ctx.shadowColor = 'rgba(30,36,18,.45)'; ctx.shadowBlur = 6; ctx.shadowOffsetY = 2;
      for (let i = 0; i < n; i++) {
        const k = i / n, kind = i % 3 === 0 ? 3 + (i >> 1) % 2 : [5, 0, 1, 2][i % 4];
        drawSprite(ctx, -10 + Math.random() * (w + 20), -10 + Math.random() * (h + 20), 70 + k * 60 + Math.random() * 20,
          (Math.random() - .5) * 1.4, Math.random() > .5 ? 1 : -1, 1, kind);
      }
      ctx.shadowColor = 'transparent'; ctx.globalAlpha = 1;
    }
    function reveal() {
      if (revealed) return; revealed = true;
      ticket.classList.add('is-open'); hint.textContent = text('d_hint');
      const r = ticket.getBoundingClientRect();
      sky.burst(r.left + r.width / 2, r.top + r.height / 2, 24, true); sky.burst(r.left + r.width / 2, r.top + r.height / 2, 30);
    }
    function clearedRatio() {
      const { width, height } = cv, data = ctx.getImageData(0, 0, width, height).data;
      let clear = 0, total = 0;
      for (let i = 3; i < data.length; i += 4 * 24) { total++; if (data[i] < 40) clear++; }
      return clear / total;
    }
    function scratch(x, y) {
      ctx.globalCompositeOperation = 'destination-out'; ctx.lineWidth = 46; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      ctx.beginPath(); ctx.moveTo(lx, ly); ctx.lineTo(x, y); ctx.stroke(); ctx.globalCompositeOperation = 'source-over';
      lx = x; ly = y;
      const now = performance.now();
      if (now - lastCheck > 220) { lastCheck = now; if (clearedRatio() > .42) reveal(); }
    }
    const pos = e => { const r = cv.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };

    function demo() {
      clearTimeout(demoTimer);
      if (started || revealed || reduce || !inView || demoBusy) return;
      const r = cv.getBoundingClientRect(), w = r.width, h = r.height;
      const pts = [[.86, .9], [.2, .74], [.8, .62]];
      const clears = demoRuns++ === 0, t0 = performance.now(), Tm = 1900;
      let px = null, py = null;
      demoBusy = true; hand.style.opacity = 1;
      (function step(now) {
        if (started || revealed) { hand.style.opacity = 0; demoBusy = false; return; }
        const t = Math.min(1, Math.max(0, (now - t0) / Tm));
        const seg = t < .55 ? 0 : 1, k = seg ? (t - .55) / .45 : t / .55;
        const e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
        const x = (pts[seg][0] + (pts[seg + 1][0] - pts[seg][0]) * e) * w, y = (pts[seg][1] + (pts[seg + 1][1] - pts[seg][1]) * e) * h;
        hand.style.transform = `translate(${(x - 19).toFixed(1)}px,${(y - 3).toFixed(1)}px) rotate(-14deg)`;
        if (clears && px !== null) {
          ctx.globalCompositeOperation = 'destination-out'; ctx.lineWidth = 28; ctx.lineCap = 'round';
          ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(x, y); ctx.stroke(); ctx.globalCompositeOperation = 'source-over';
          if (Math.random() > .62) sky.fling(r.left + x, r.top + y, x - px, y - py);
        }
        px = x; py = y;
        if (t < 1) requestAnimationFrame(step);
        else { hand.style.opacity = 0; demoBusy = false; demoTimer = setTimeout(demo, 2400); }
      })(t0);
    }
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(es => { inView = es[0].isIntersecting; if (inView) demoTimer = setTimeout(demo, 900); else clearTimeout(demoTimer); }, { threshold: .8 }).observe(ticket);
    }
    cv.addEventListener('pointerdown', e => {
      down = true; started = true; hand.style.opacity = 0; [lx, ly] = pos(e);
      try { cv.setPointerCapture(e.pointerId); } catch (err) { /* ok */ }
      scratch(lx + .1, ly + .1); sky.fling(e.clientX, e.clientY, 0, 0);
    });
    cv.addEventListener('pointermove', e => {
      if (!down) return;
      const [x, y] = pos(e), dx = x - lx, dy = y - ly; scratch(x, y);
      if (Math.random() > .55) sky.fling(e.clientX, e.clientY, dx, dy);
    });
    const up = () => { down = false; };
    cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', up);
    $('#foilOpen').addEventListener('click', reveal);
    paint(); spritesReady.then(() => { if (!started && !revealed) paint(); });
    addEventListener('resize', () => { if (!started && !revealed && !demoBusy && Math.abs(cv.getBoundingClientRect().width - paintedW) > 1) paint(); });
  })();

  /* ---------- the venue card leans toward the hand ---------- */
  (() => {
    const el = $('#tilt'); if (!el || reduce) return;
    const set = (rx, ry) => { el.style.setProperty('--rx', rx.toFixed(2) + 'deg'); el.style.setProperty('--ry', ry.toFixed(2) + 'deg'); };
    el.addEventListener('pointermove', e => {
      if (e.pointerType === 'touch') return;
      const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      set(-y * 9, x * 11);
    });
    el.addEventListener('pointerleave', () => set(0, 0));
    if ('DeviceOrientationEvent' in window && typeof DeviceOrientationEvent.requestPermission !== 'function') {
      let base = null;
      addEventListener('deviceorientation', e => {
        if (e.beta == null || e.gamma == null) return;
        if (base === null) base = { b: e.beta, g: e.gamma };
        const db = Math.max(-18, Math.min(18, e.beta - base.b)), dg = Math.max(-18, Math.min(18, e.gamma - base.g));
        set(-db * .35, dg * .4);
      }, { passive: true });
    }
  })();

  /* ---------- bottom sheet: maps and calendars ---------- */
  (() => {
    const box = $('#sheetbox'), list = $('#sheetList'), title = $('#sheetTitle');
    let opener = null; const ll = `${VENUE.lat},${VENUE.lon}`;
    function links(kind) {
      const t = T[lang];
      if (kind === 'route') {
        const items = [
          [t.a_yn, `yandexnavi://build_route_on_map?lat_to=${VENUE.lat}&lon_to=${VENUE.lon}`],
          [t.a_ym, `https://yandex.uz/maps/?rtext=~${ll}&rtt=auto`],
          [t.a_gm, `https://www.google.com/maps/dir/?api=1&destination=${ll}`],
          [t.a_2g, `https://2gis.uz/geo/${VENUE.lon},${VENUE.lat}`],
        ];
        if (/iPhone|iPad|Macintosh/.test(navigator.userAgent)) items.push([t.a_am, `https://maps.apple.com/?daddr=${ll}`]);
        return items;
      }
      const g = new URLSearchParams({ action: 'TEMPLATE', text: t.ev_title, dates: '20261031T130000Z/20261031T180000Z', location: t.ev_place, details: 'https://sulton-istabro.uz/' });
      return [[t.a_gc, `https://calendar.google.com/calendar/render?${g}`], [t.a_ics, 'taklifnoma.ics', true]];
    }
    function open(kind, from) {
      opener = from; title.textContent = T[lang][kind === 'route' ? 's_route' : 's_cal']; list.textContent = '';
      links(kind).forEach(([label, href, dl]) => {
        const a = document.createElement('a'); a.textContent = label; a.href = href;
        if (dl) a.setAttribute('download', 'sulton-istabro.ics'); else if (href.startsWith('http')) { a.target = '_blank'; a.rel = 'noopener'; }
        a.addEventListener('click', () => setTimeout(close, 200)); list.appendChild(a);
      });
      box.hidden = false; const first = $('a', list); if (first) first.focus({ preventScroll: true });
    }
    function close() { if (box.hidden) return; box.hidden = true; if (opener) opener.focus({ preventScroll: true }); }
    $$('[data-sheet]').forEach(b => b.addEventListener('click', () => open(b.dataset.sheet, b)));
    $$('[data-close]', box).forEach(b => b.addEventListener('click', close));
    addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  })();

  /* ---------- go ---------- */
  applyLang();
  tick(); setInterval(tick, 1000);
  onScroll();
})();

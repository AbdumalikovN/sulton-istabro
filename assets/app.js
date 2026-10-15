(() => {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------
     Wedding facts — change them here and the whole page follows.
     ------------------------------------------------------------------ */
  const WHEN = Date.UTC(2026, 9, 31, 13, 0, 0);           // 31.10.2026 18:00 Tashkent (UTC+5)
  const VENUE = { lat: 41.428516, lon: 69.35919 };         // Premier Hall, Qibray
  const CAL = { year: 2026, month: 9, days: 31, firstWeekdayMonFirst: 3, day: 31 };

  const T = {
    kr: {
      html: 'uz-Cyrl',
      title: 'Султонбек ва Истабро — никоҳ тўйи',
      groom: 'Султонбек', bride: 'Истабро', va: 'ва', mono: 'С&И',
      l_names: 'Султонбек ва Истабро', l_names0: 'Султонбек ва Истабро',
      gate_kicker: 'Сизга мактуб бор',
      gate_hint: 'Муҳрни босинг — мактуб очилади',
      dear_guest: 'Азиз меҳмонимиз', dear_named: 'Ҳурматли {name}',
      l_dear_guest: 'Ҳурматли меҳмонимиз!', l_dear_named: 'Ҳурматли {name}!',
      hero_sub: 'никоҳ тўйи', hero_date: '31 октябрь 2026', hero_time: 'шанба, соат 18:00',
      scroll: 'Пастга суринг',
      l_salom: 'Ассалому алайкум!',
      l_p1: 'Сизни азиз фарзандларимиз',
      l_p2: 'ларнинг никоҳ тўйлари муносабати билан 2026 йил 31 октябрь куни соат 18:00 да бўлиб ўтадиган «Висол оқшоми»га таклиф этамиз.',
      l_sign1: 'Ҳурмат ва эҳтиром ила',
      l_sign2: 'АБДУМАЛИК ХОЖИ ота ўғли АШРАФ СОДИКОВлар оиласи',
      d_title: 'Тўй куни', d_hint: 'Япроқларни бармоғингиз билан суриб, санани очинг', d_done: 'Ана шу кун!', d_open: 'Очиш',
      d_weekday: 'шанба', d_month: 'октябрь 2026', d_time: 'соат 18:00',
      cal_title: 'Октябрь 2026', wd: ['Ду', 'Се', 'Чор', 'Пай', 'Жу', 'Шан', 'Як'],
      v_title: 'Вақт ва манзил', v_name: '«PRIMIER HALL» ресторани', v_addr: 'Қибрай тумани, Маданият массив',
      v_day: 'Шанба, 31 октябрь', v_route: 'Йўналиш олиш', v_cal: 'Календарга қўшиш',
      s_route: 'Қайси иловада очамиз?', s_cal: 'Қайси календарга қўшамиз?', cancel: 'Бекор қилиш',
      a_yn: 'Yandex Навигатор', a_ym: 'Yandex Хариталар', a_gm: 'Google Maps', a_2g: '2GIS', a_am: 'Apple Хариталар',
      a_gc: 'Google Календар', a_ics: 'Apple / Outlook календари',
      c_title: 'Тўйгача қолди', c_now: 'Тўй куни етиб келди!',
      c_d: 'кун', c_h: 'соат', c_m: 'дақиқа', c_s: 'сония',
      c_wait: 'Сизни интизорлик билан кутамиз', c_sign: 'Ҳурмат ва эҳтиром ила, Содиковлар оиласи', c_top: 'Бошига қайтиш',
      ev_title: 'Султонбек ва Истабро — никоҳ тўйи', ev_place: 'PRIMIER HALL ресторани, Қибрай тумани, Маданият массив',
    },
    uz: {
      html: 'uz-Latn',
      title: 'Sultonbek va Istabro — nikoh to‘yi',
      groom: 'Sultonbek', bride: 'Istabro', va: 'va', mono: 'S&I',
      l_names: 'Sultonbek va Istabro', l_names0: 'Sultonbek va Istabro',
      gate_kicker: 'Sizga maktub bor',
      gate_hint: 'Muhrni bosing — maktub ochiladi',
      dear_guest: 'Aziz mehmonimiz', dear_named: 'Hurmatli {name}',
      l_dear_guest: 'Hurmatli mehmonimiz!', l_dear_named: 'Hurmatli {name}!',
      hero_sub: 'nikoh to‘yi', hero_date: '31-oktabr 2026', hero_time: 'shanba, soat 18:00',
      scroll: 'Pastga suring',
      l_salom: 'Assalomu alaykum!',
      l_p1: 'Sizni aziz farzandlarimiz',
      l_p2: 'larning nikoh to‘ylari munosabati bilan 2026-yil 31-oktabr kuni soat 18:00 da bo‘lib o‘tadigan «Visol oqshomi»ga taklif etamiz.',
      l_sign1: 'Hurmat va ehtirom ila',
      l_sign2: 'ABDUMALIK HOJI ota o‘g‘li ASHRAF SODIKOVlar oilasi',
      d_title: 'To‘y kuni', d_hint: 'Yaproqlarni barmog‘ingiz bilan surib, sanani oching', d_done: 'Ana shu kun!', d_open: 'Ochish',
      d_weekday: 'shanba', d_month: 'oktabr 2026', d_time: 'soat 18:00',
      cal_title: 'Oktabr 2026', wd: ['Du', 'Se', 'Chor', 'Pay', 'Ju', 'Shan', 'Yak'],
      v_title: 'Vaqt va manzil', v_name: '«PRIMIER HALL» restorani', v_addr: 'Qibray tumani, Madaniyat massivi',
      v_day: 'Shanba, 31-oktabr', v_route: 'Yo‘nalish olish', v_cal: 'Kalendarga qo‘shish',
      s_route: 'Qaysi ilovada ochamiz?', s_cal: 'Qaysi kalendarga qo‘shamiz?', cancel: 'Bekor qilish',
      a_yn: 'Yandex Navigator', a_ym: 'Yandex Xaritalar', a_gm: 'Google Maps', a_2g: '2GIS', a_am: 'Apple Xaritalar',
      a_gc: 'Google Kalendar', a_ics: 'Apple / Outlook kalendari',
      c_title: 'To‘ygacha qoldi', c_now: 'To‘y kuni yetib keldi!',
      c_d: 'kun', c_h: 'soat', c_m: 'daqiqa', c_s: 'soniya',
      c_wait: 'Sizni intizorlik bilan kutamiz', c_sign: 'Hurmat va ehtirom ila, Sodikovlar oilasi', c_top: 'Boshiga qaytish',
      ev_title: 'Sultonbek va Istabro — nikoh to‘yi', ev_place: 'PRIMIER HALL restorani, Qibray tumani, Madaniyat massivi',
    },
    ru: {
      html: 'ru',
      title: 'Султонбек и Истабро — свадьба',
      groom: 'Султонбек', bride: 'Истабро', va: 'и', mono: 'С&И',
      l_names: 'Султонбека и Истабро', l_names0: 'Султонбек и Истабро',
      gate_kicker: 'Вам письмо',
      gate_hint: 'Нажмите на печать — письмо откроется',
      dear_guest: 'Дорогой гость', dear_named: '{name}',
      l_dear_guest: 'Дорогой гость!', l_dear_named: '{name}!',
      hero_sub: 'свадебный вечер', hero_date: '31 октября 2026', hero_time: 'суббота, 18:00',
      scroll: 'Листайте вниз',
      l_salom: 'Ассалому алайкум!',
      l_p1: 'Приглашаем Вас на свадебный вечер наших дорогих детей',
      l_p2: '«Висол оқшоми» состоится 31 октября 2026 года в 18:00.',
      l_sign1: 'С уважением и почтением,',
      l_sign2: 'семья АШРАФА СОДИКОВА, сына АБДУМАЛИКА ХОЖИ ота',
      d_title: 'День свадьбы', d_hint: 'Смахните листья пальцем — под ними дата', d_done: 'Вот этот день!', d_open: 'Открыть',
      d_weekday: 'суббота', d_month: 'октября 2026', d_time: 'в 18:00',
      cal_title: 'Октябрь 2026', wd: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
      v_title: 'Время и место', v_name: 'Ресторан «PRIMIER HALL»', v_addr: 'Кибрайский район, массив Маданият',
      v_day: 'Суббота, 31 октября', v_route: 'Построить маршрут', v_cal: 'Добавить в календарь',
      s_route: 'В каком приложении открыть?', s_cal: 'В какой календарь добавить?', cancel: 'Отмена',
      a_yn: 'Яндекс Навигатор', a_ym: 'Яндекс Карты', a_gm: 'Google Maps', a_2g: '2ГИС', a_am: 'Apple Карты',
      a_gc: 'Google Календарь', a_ics: 'Календарь Apple / Outlook',
      c_title: 'До свадьбы осталось', c_now: 'День свадьбы настал!',
      c_d: 'дней', c_h: 'часов', c_m: 'минут', c_s: 'секунд',
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
  let revealed = false;
  let over = false;

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
    document.documentElement.lang = t.html;
    document.title = t.title;
    $$('[data-i18n]').forEach(el => { const v = text(el.dataset.i18n); if (v != null) el.textContent = v; });
    $$('[data-i18n-aria]').forEach(el => { const v = text(el.dataset.i18nAria); if (v != null) el.setAttribute('aria-label', v); });
    $$('.lang button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
    buildCalendar();
  }
  $$('.lang button').forEach(b => b.addEventListener('click', () => {
    lang = b.dataset.lang; store.set('til', lang); applyLang();
  }));

  /* ---------- calendar ---------- */
  function buildCalendar() {
    const grid = $('#cal');
    if (!grid) return;
    const cells = T[lang].wd.map(w => `<span class="wd">${w}</span>`);
    for (let i = 0; i < CAL.firstWeekdayMonFirst; i++) cells.push('<span></span>');
    for (let d = 1; d <= CAL.days; d++) cells.push(d === CAL.day ? `<span class="is-day" aria-current="date">${d}</span>` : `<span>${d}</span>`);
    grid.innerHTML = cells.join('');
  }

  /* ---------- countdown ---------- */
  const pad = n => String(n).padStart(2, '0');
  function tick() {
    let left = Math.floor((WHEN - Date.now()) / 1000);
    if (left <= 0) {
      left = 0;
      if (!over) { over = true; $('#cdLabel').textContent = text('c_title'); }
    }
    $('#cdD').textContent = Math.floor(left / 86400);
    $('#cdH').textContent = pad(Math.floor(left % 86400 / 3600));
    $('#cdM').textContent = pad(Math.floor(left % 3600 / 60));
    $('#cdS').textContent = pad(left % 60);
  }

  /* ---------- autumn air: chinar leaves drifting down, gold dust on touch ---------- */
  // Leaves are cut from an 1870s chromolithograph (L. Prang & Co., public domain)
  const SPRITES = [1, 2, 3, 4, 5].map(i => { const im = new Image(); im.decoding = 'async'; im.src = `assets/art/leaf-${i}.webp`; return im; });
  const spritesReady = Promise.all(SPRITES.map(im => new Promise(res => {
    if (im.complete && im.naturalWidth) res(); else { im.onload = res; im.onerror = res; }
  })));
  const pickLeaf = () => Math.random() * SPRITES.length | 0;

  // centred on (x, y); s is the leaf's longest side
  function drawLeaf(ctx, x, y, s, rot, flip, alpha, kind) {
    const im = SPRITES[kind];
    if (!im || !im.naturalWidth) return;
    const k = s / Math.max(im.naturalWidth, im.naturalHeight), w = im.naturalWidth * k, h = im.naturalHeight * k;
    ctx.save();
    ctx.translate(x, y); ctx.rotate(rot); ctx.scale(flip, 1);
    ctx.globalAlpha = alpha;
    ctx.drawImage(im, -w / 2, -h / 2, w, h);
    ctx.restore();
  }

  const sky = (() => {
    const cv = $('#leaves');
    const ctx = cv.getContext('2d');
    let w = 0, h = 0, dpr = 1, leaves = [], bits = [], last = 0, p = 0;

    const fresh = (anywhere) => ({
      x: Math.random() * w, y: anywhere ? Math.random() * h : -30 - Math.random() * 80,
      s: 18 + Math.random() * 20, rot: Math.random() * 6.28, vr: (Math.random() - .5) * 1.1,
      vy: 16 + Math.random() * 26, sway: .5 + Math.random() * .9, amp: 14 + Math.random() * 26,
      ph: Math.random() * 6.28, fl: .6 + Math.random() * 1.3,
      kind: pickLeaf(),
    });

    function size() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = cv.clientWidth; h = cv.clientHeight;
      cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.max(9, Math.min(34, w * h / 30000)));
      leaves = Array.from({ length: count }, () => fresh(true));
      draw(0, 0);
    }

    function draw(t, dt) {
      ctx.clearRect(0, 0, w, h);
      const alpha = .8 - .32 * p;
      for (const l of leaves) {
        l.y += l.vy * dt; l.rot += l.vr * dt;
        if (l.y > h + 40) Object.assign(l, fresh(false));
        const x = l.x + Math.sin(t * l.sway + l.ph) * l.amp;
        drawLeaf(ctx, x, l.y, l.s, l.rot, Math.cos(t * l.fl + l.ph) * .8 + .2, alpha, l.kind);
      }
      for (let i = bits.length - 1; i >= 0; i--) {
        const d = bits[i];
        d.life -= dt / d.ttl;
        if (d.life <= 0) { bits.splice(i, 1); continue; }
        d.x += d.vx; d.y += d.vy; d.vy += d.leaf ? .05 : .035; d.vx *= .985;
        if (d.leaf) {
          d.rot += d.vr;
          drawLeaf(ctx, d.x, d.y, d.r, d.rot, Math.cos(d.rot * 1.7), Math.min(1, d.life * 1.6), d.kind);
        } else {
          ctx.fillStyle = `rgba(${235 + (d.tone * 20 | 0)},${160 + (d.tone * 60 | 0)},${175 + (d.tone * 40 | 0)},${d.life})`;
          ctx.beginPath(); ctx.arc(d.x, d.y, d.r * (.5 + d.life * .5), 0, 6.2832); ctx.fill();
        }
      }
    }

    function loop(now) {
      if (!document.hidden && now - last > 30) {
        const dt = Math.min(.06, (now - last) / 1000);
        last = now; draw(now / 1000, dt);
      }
      requestAnimationFrame(loop);
    }

    function burst(x, y, n = 46, asLeaves = false) {
      if (reduce) return;
      for (let i = 0; i < n; i++) {
        const ang = Math.random() * 6.2832, v = .6 + Math.random() * (asLeaves ? 4.4 : 3.2);
        bits.push({
          x, y, vx: Math.cos(ang) * v, vy: Math.sin(ang) * v - 1.4, life: 1, ttl: .9 + Math.random() * 1.2, tone: Math.random(),
          leaf: asLeaves, r: asLeaves ? 18 + Math.random() * 22 : .8 + Math.random() * 1.9,
          rot: Math.random() * 6.28, vr: (Math.random() - .5) * .3, kind: pickLeaf(),
        });
      }
    }
    function sprinkle(x, y) {
      if (reduce || bits.length > 120) return;
      bits.push({ x, y, vx: (Math.random() - .5) * .8, vy: -.2 - Math.random() * .5, r: .7 + Math.random() * 1.2, life: 1, ttl: .7 + Math.random() * .6, tone: Math.random() });
    }
    function fling(x, y, dx, dy) {
      if (reduce || bits.length > 90) return;
      bits.push({
        x, y, vx: dx * .12 + (Math.random() - .5) * 2.4, vy: dy * .12 - 1 - Math.random() * 1.6, life: 1, ttl: .8 + Math.random() * .7, tone: 0,
        leaf: true, r: 20 + Math.random() * 20, rot: Math.random() * 6.28, vr: (Math.random() - .5) * .34, kind: pickLeaf(),
      });
    }

    size();
    spritesReady.then(() => draw(0, 0));
    let rz;
    addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(size, 150); });
    if (!reduce) requestAnimationFrame(loop);
    return { burst, sprinkle, fling, setProgress(v) { p = v; if (reduce) draw(0, 0); } };
  })();

  let lastDust = 0;
  addEventListener('pointermove', e => {
    if (e.pointerType === 'touch') return;
    const now = performance.now();
    if (now - lastDust > 45) { lastDust = now; sky.sprinkle(e.clientX, e.clientY); }
  }, { passive: true });

  /* ---------- scroll: the evening deepens, the foil catches light ---------- */
  const root = document.documentElement;
  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const max = Math.max(1, root.scrollHeight - innerHeight);
      const p = Math.min(1, Math.max(0, scrollY / max));
      root.style.setProperty('--p', p.toFixed(4));
      root.style.setProperty('--shine', ((scrollY / innerHeight) * 46 % 100).toFixed(2));
      sky.setProgress(p);
      ticking = false;
    });
  }
  addEventListener('scroll', onScroll, { passive: true });

  /* ---------- gate: break the seal ---------- */
  const gate = $('#gate'), env = $('#env'), seal = $('#seal');
  function openGate() {
    if (env.classList.contains('is-open')) return;
    env.classList.add('is-open');
    gate.classList.add('is-opening');
    const r = seal.getBoundingClientRect();
    sky.burst(r.left + r.width / 2, r.top + r.height / 2, 34);
    const finish = () => {
      scrollTo(0, 0);
      document.body.classList.remove('is-sealed');
      document.body.classList.add('is-open');
      gate.classList.add('is-gone');
      setTimeout(() => { gate.hidden = true; }, 1100);
    };
    setTimeout(finish, reduce ? 0 : 3100);
  }
  env.addEventListener('click', openGate);

  /* ---------- the date under a drift of leaves ---------- */
  (() => {
    const ticket = $('#ticket'), cv = $('#foil'), hint = $('#scratchHint'), hand = $('#hand');
    const ctx = cv.getContext('2d', { willReadFrequently: true });
    let down = false, lx = 0, ly = 0, started = false, lastCheck = 0, paintedW = 0;
    let inView = false, demoRuns = 0, demoTimer = 0, demoBusy = false;

    function paint() {
      const r = cv.getBoundingClientRect();
      if (!r.width) return;
      paintedW = r.width; demoRuns = 0;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = Math.round(r.width * dpr); cv.height = Math.round(r.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const w = r.width, h = r.height;
      const g = ctx.createLinearGradient(0, 0, w, h);
      g.addColorStop(0, '#6B7646'); g.addColorStop(.55, '#8E9468'); g.addColorStop(1, '#5F6B3C');
      ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
      // a drift of leaves, small ones underneath, big ones on top
      const n = Math.round(w * h / 230);
      ctx.shadowColor = 'rgba(30,36,18,.4)'; ctx.shadowBlur = 5; ctx.shadowOffsetY = 1.5;
      for (let i = 0; i < n; i++) {
        const k = i / n;
        drawLeaf(ctx, -10 + Math.random() * (w + 20), -10 + Math.random() * (h + 20), 44 + k * 34 + Math.random() * 14,
          Math.random() * 6.2832, Math.random() > .5 ? 1 : -1, 1, i % SPRITES.length);
      }
      ctx.shadowColor = 'transparent'; ctx.globalAlpha = 1;
    }

    function reveal() {
      if (revealed) return;
      revealed = true;
      ticket.classList.add('is-open');
      hint.textContent = text('d_hint');
      const r = ticket.getBoundingClientRect();
      sky.burst(r.left + r.width / 2, r.top + r.height / 2, 30, true);
      sky.burst(r.left + r.width / 2, r.top + r.height / 2, 30);
    }

    function clearedRatio() {
      const { width, height } = cv;
      const data = ctx.getImageData(0, 0, width, height).data;
      let clear = 0, total = 0;
      for (let i = 3; i < data.length; i += 4 * 24) { total++; if (data[i] < 40) clear++; }
      return clear / total;
    }

    function scratch(x, y) {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = 46; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      ctx.beginPath(); ctx.moveTo(lx, ly); ctx.lineTo(x, y); ctx.stroke();
      ctx.globalCompositeOperation = 'source-over';
      lx = x; ly = y;
      const now = performance.now();
      if (now - lastCheck > 220) { lastCheck = now; if (clearedRatio() > 0.42) reveal(); }
    }
    const pos = e => { const r = cv.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };

    // The hint: a hand sweeps across the leaves, and on its first pass really clears a strip
    function demo() {
      clearTimeout(demoTimer);
      if (started || revealed || reduce || !inView || demoBusy) return;
      const r = cv.getBoundingClientRect(), w = r.width, h = r.height;
      const pts = [[.86, .9], [.2, .74], [.8, .62]];
      const clears = demoRuns++ === 0, t0 = performance.now(), T = 1900;
      let px = null, py = null;
      demoBusy = true; hand.style.opacity = 1;
      (function step(now) {
        if (started || revealed) { hand.style.opacity = 0; demoBusy = false; return; }
        const t = Math.min(1, Math.max(0, (now - t0) / T));
        const seg = t < .55 ? 0 : 1, k = seg ? (t - .55) / .45 : t / .55;
        const e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
        const x = (pts[seg][0] + (pts[seg + 1][0] - pts[seg][0]) * e) * w;
        const y = (pts[seg][1] + (pts[seg + 1][1] - pts[seg][1]) * e) * h;
        hand.style.transform = `translate(${(x - 19).toFixed(1)}px,${(y - 3).toFixed(1)}px) rotate(-14deg)`;
        if (clears && px !== null) {
          ctx.globalCompositeOperation = 'destination-out';
          ctx.lineWidth = 28; ctx.lineCap = 'round';
          ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(x, y); ctx.stroke();
          ctx.globalCompositeOperation = 'source-over';
          if (Math.random() > .62) sky.fling(r.left + x, r.top + y, x - px, y - py);
        }
        px = x; py = y;
        if (t < 1) requestAnimationFrame(step);
        else { hand.style.opacity = 0; demoBusy = false; demoTimer = setTimeout(demo, 2400); }
      })(t0);
    }
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(es => {
        inView = es[0].isIntersecting;
        if (inView) demoTimer = setTimeout(demo, 600); else clearTimeout(demoTimer);
      }, { threshold: .8 }).observe(ticket);
    }

    cv.addEventListener('pointerdown', e => {
      down = true; started = true; hand.style.opacity = 0; [lx, ly] = pos(e);
      try { cv.setPointerCapture(e.pointerId); } catch (err) { /* ok */ }
      scratch(lx + 0.1, ly + 0.1);
      sky.fling(e.clientX, e.clientY, 0, 0);
    });
    cv.addEventListener('pointermove', e => {
      if (!down) return;
      const [x, y] = pos(e); const dx = x - lx, dy = y - ly; scratch(x, y);
      if (Math.random() > 0.55) sky.fling(e.clientX, e.clientY, dx, dy);
    });
    const up = () => { down = false; };
    cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', up);
    $('#foilOpen').addEventListener('click', reveal);

    paint();
    spritesReady.then(() => { if (!started && !revealed) paint(); });
    addEventListener('resize', () => {
      if (!started && !revealed && !demoBusy && Math.abs(cv.getBoundingClientRect().width - paintedW) > 1) paint();
    });
  })();

  /* ---------- bottom sheet: maps and calendars ---------- */
  (() => {
    const box = $('#sheetbox'), list = $('#sheetList'), title = $('#sheetTitle');
    let opener = null;
    const ll = `${VENUE.lat},${VENUE.lon}`;

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
      const g = new URLSearchParams({
        action: 'TEMPLATE', text: t.ev_title, dates: '20261031T130000Z/20261031T180000Z',
        location: t.ev_place, details: 'https://sulton-istabro.uz/',
      });
      return [
        [t.a_gc, `https://calendar.google.com/calendar/render?${g}`],
        [t.a_ics, 'taklifnoma.ics', true],
      ];
    }

    function open(kind, from) {
      opener = from;
      title.textContent = T[lang][kind === 'route' ? 's_route' : 's_cal'];
      list.textContent = '';
      links(kind).forEach(([label, href, dl]) => {
        const a = document.createElement('a');
        a.textContent = label; a.href = href;
        if (dl) a.setAttribute('download', 'sulton-istabro.ics');
        else if (href.startsWith('http')) { a.target = '_blank'; a.rel = 'noopener'; }
        a.addEventListener('click', () => setTimeout(close, 200));
        list.appendChild(a);
      });
      box.hidden = false;
      const first = $('a', list); if (first) first.focus({ preventScroll: true });
    }
    function close() {
      if (box.hidden) return;
      box.hidden = true;
      if (opener) opener.focus({ preventScroll: true });
    }
    $$('[data-sheet]').forEach(b => b.addEventListener('click', () => open(b.dataset.sheet, b)));
    $$('[data-close]', box).forEach(b => b.addEventListener('click', close));
    addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  })();

  /* ---------- go ---------- */
  applyLang();
  tick(); setInterval(tick, 1000);
  onScroll();
})();

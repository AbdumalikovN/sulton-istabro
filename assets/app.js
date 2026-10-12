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
      d_title: 'Тўй куни', d_hint: 'Тилла пардани бармоғингиз билан артинг', d_done: 'Ана шу кун!', d_open: 'Очиш',
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
      d_title: 'To‘y kuni', d_hint: 'Tilla pardani barmog‘ingiz bilan arting', d_done: 'Ana shu kun!', d_open: 'Ochish',
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
      d_title: 'День свадьбы', d_hint: 'Сотрите золото пальцем', d_done: 'Вот этот день!', d_open: 'Открыть',
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

  /* ---------- the sky: stars, dust, a falling star now and then ---------- */
  const sky = (() => {
    const cv = $('#stars');
    const ctx = cv.getContext('2d');
    let w = 0, h = 0, dpr = 1, stars = [], dust = [], shot = null, nextShot = 6000, last = 0, p = 0;

    function size() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = cv.clientWidth; h = cv.clientHeight;
      cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(260, w * h / 5200));
      let seed = 20261031;
      const rnd = () => (seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296;
      stars = Array.from({ length: count }, () => {
        const big = rnd() > 0.93;
        return {
          x: rnd() * w, y: Math.pow(rnd(), 1.35) * h,
          r: big ? 1.3 + rnd() * 0.7 : 0.45 + rnd() * 0.75,
          a: 0.35 + rnd() * 0.65, sp: 0.4 + rnd() * 1.6, ph: rnd() * 6.28,
          gold: rnd() > 0.72, big,
        };
      });
      draw(performance.now());
    }

    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      const night = 0.5 + 0.5 * Math.min(1, p * 2.2);
      for (const s of stars) {
        const tw = reduce ? 0.85 : 0.62 + 0.38 * Math.sin(t / 1000 * s.sp + s.ph);
        const a = s.a * tw * night * (0.35 + 0.65 * (1 - s.y / h * (1 - p)));
        ctx.fillStyle = s.gold ? `rgba(246,226,160,${a})` : `rgba(240,240,255,${a})`;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 6.2832); ctx.fill();
        if (s.big) {
          ctx.strokeStyle = `rgba(246,231,176,${a * 0.5})`; ctx.lineWidth = 0.6;
          ctx.beginPath(); ctx.moveTo(s.x - s.r * 3.2, s.y); ctx.lineTo(s.x + s.r * 3.2, s.y);
          ctx.moveTo(s.x, s.y - s.r * 3.2); ctx.lineTo(s.x, s.y + s.r * 3.2); ctx.stroke();
        }
      }
      for (let i = dust.length - 1; i >= 0; i--) {
        const d = dust[i];
        d.life -= 1 / 60 / d.ttl;
        if (d.life <= 0) { dust.splice(i, 1); continue; }
        d.x += d.vx; d.y += d.vy; d.vy += 0.035; d.vx *= 0.985;
        ctx.fillStyle = `rgba(246,${205 + (d.tone * 30 | 0)},${120 + (d.tone * 60 | 0)},${d.life})`;
        ctx.beginPath(); ctx.arc(d.x, d.y, d.r * (0.5 + d.life * 0.5), 0, 6.2832); ctx.fill();
      }
      if (shot) {
        shot.t += 1 / 60 / 0.9;
        if (shot.t >= 1) shot = null;
        else {
          const x = shot.x + shot.dx * shot.t, y = shot.y + shot.dy * shot.t;
          const g = ctx.createLinearGradient(x, y, x - shot.dx * 0.22, y - shot.dy * 0.22);
          const a = Math.sin(shot.t * Math.PI) * 0.9;
          g.addColorStop(0, `rgba(255,246,216,${a})`); g.addColorStop(1, 'rgba(255,246,216,0)');
          ctx.strokeStyle = g; ctx.lineWidth = 1.4; ctx.lineCap = 'round';
          ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - shot.dx * 0.22, y - shot.dy * 0.22); ctx.stroke();
        }
      }
    }

    function loop(t) {
      if (!document.hidden && t - last > 30) {
        if (!shot && (nextShot -= t - last) < 0) {
          nextShot = 9000 + Math.random() * 9000;
          shot = { x: w * (0.15 + Math.random() * 0.5), y: h * (0.05 + Math.random() * 0.25), dx: w * 0.42 + 120, dy: h * 0.16 + 40, t: 0 };
        }
        last = t; draw(t);
      }
      requestAnimationFrame(loop);
    }

    function burst(x, y, n = 46) {
      if (reduce) return;
      for (let i = 0; i < n; i++) {
        const ang = Math.random() * 6.2832, v = 0.6 + Math.random() * 3.2;
        dust.push({ x, y, vx: Math.cos(ang) * v, vy: Math.sin(ang) * v - 1.2, r: 0.8 + Math.random() * 1.9, life: 1, ttl: 0.9 + Math.random() * 1.2, tone: Math.random() });
      }
    }
    function sprinkle(x, y) {
      if (reduce || dust.length > 120) return;
      dust.push({ x, y, vx: (Math.random() - 0.5) * 0.8, vy: -0.2 - Math.random() * 0.5, r: 0.7 + Math.random() * 1.2, life: 1, ttl: 0.7 + Math.random() * 0.6, tone: Math.random() });
    }

    size();
    let rz;
    addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(size, 150); });
    if (!reduce) requestAnimationFrame(loop);
    return { burst, sprinkle, setProgress(v) { p = v; if (reduce) draw(0); } };
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
    setTimeout(finish, reduce ? 0 : 2500);
  }
  env.addEventListener('click', openGate);

  /* ---------- the gold veil over the date ---------- */
  (() => {
    const ticket = $('#ticket'), cv = $('#foil'), hint = $('#scratchHint');
    const ctx = cv.getContext('2d', { willReadFrequently: true });
    let down = false, lx = 0, ly = 0, started = false, lastCheck = 0;

    function paint() {
      const r = cv.getBoundingClientRect();
      if (!r.width) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = Math.round(r.width * dpr); cv.height = Math.round(r.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const w = r.width, h = r.height;
      const g = ctx.createLinearGradient(0, 0, w, h);
      [[0, '#A47B28'], [0.18, '#DDBD6C'], [0.36, '#FBF0C4'], [0.52, '#CFA850'], [0.7, '#A47B28'], [0.88, '#EBD594'], [1, '#B98F34']]
        .forEach(([o, c]) => g.addColorStop(o, c));
      ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
      // brushed grain
      for (let i = 0; i < 900; i++) {
        ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255,248,214,.16)' : 'rgba(110,80,20,.13)';
        ctx.fillRect(Math.random() * w, Math.random() * h, 6 + Math.random() * 22, 0.6);
      }
      // girih lattice pressed into the foil
      const s = 40, R = s / 2, ri = R * Math.cos(Math.PI / 4) / Math.cos(Math.PI / 8);
      ctx.strokeStyle = 'rgba(110,80,20,.38)'; ctx.lineWidth = 0.9;
      for (let cy = R - (s - (h % s)) / 2; cy < h + R; cy += s) {
        for (let cx = R - (s - (w % s)) / 2; cx < w + R; cx += s) {
          ctx.beginPath();
          for (let k = 0; k < 16; k++) {
            const a = Math.PI / 8 * k, rr = k % 2 ? ri : R;
            ctx[k ? 'lineTo' : 'moveTo'](cx + rr * Math.sin(a), cy - rr * Math.cos(a));
          }
          ctx.closePath(); ctx.stroke();
        }
      }
    }

    function reveal() {
      if (revealed) return;
      revealed = true;
      ticket.classList.add('is-open');
      hint.textContent = text('d_hint');
      const r = ticket.getBoundingClientRect();
      sky.burst(r.left + r.width / 2, r.top + r.height / 2, 70);
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

    cv.addEventListener('pointerdown', e => {
      down = true; started = true; [lx, ly] = pos(e);
      try { cv.setPointerCapture(e.pointerId); } catch (err) { /* ok */ }
      scratch(lx + 0.1, ly + 0.1);
      sky.sprinkle(e.clientX, e.clientY);
    });
    cv.addEventListener('pointermove', e => {
      if (!down) return;
      const [x, y] = pos(e); scratch(x, y);
      if (Math.random() > 0.5) sky.sprinkle(e.clientX, e.clientY);
    });
    const up = () => { down = false; };
    cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', up);
    $('#foilOpen').addEventListener('click', reveal);

    paint();
    addEventListener('resize', () => { if (!started && !revealed) paint(); });
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

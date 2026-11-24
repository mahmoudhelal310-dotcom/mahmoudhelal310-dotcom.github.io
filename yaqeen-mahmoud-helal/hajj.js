/* مناسك الحج والعمرة: دليل خطوة بخطوة + أدعية + أنواع النسك */
(window.NoorModules = window.NoorModules || []).push((N) => {
  'use strict';
  const { $, $$, esc, routes } = N;

  const UMRAH_STEPS = [
    { t: 'الإحرام من الميقات', d: 'الاغتسال والتطيب قبل الإحرام، ثم نية الدخول في النسك من الميقات المحدد لبلدك، والتلبية بصوت مرتفع للرجال.' },
    { t: 'الطواف بالكعبة', d: 'سبعة أشواط حول الكعبة تبدأ وتنتهي عند الحجر الأسود، يُستحب الرَّمَل (الإسراع) في الثلاثة الأولى للرجال فقط في طواف القدوم.' },
    { t: 'ركعتان خلف مقام إبراهيم', d: 'بعد الطواف، إن تيسّر ذلك، وإلا ففي أي مكان من المسجد.' },
    { t: 'السعي بين الصفا والمروة', d: 'سبعة أشواط، يبدأ من الصفا وينتهي بالمروة، مع الدعاء المأثور عند كل منهما.' },
    { t: 'الحلق أو التقصير', d: 'الحلق أفضل للرجال، والمرأة تقصّر قدر أنملة من شعرها. وبهذا يتم التحلل من الإحرام وتنتهي العمرة.' },
  ];

  const HAJJ_STEPS = [
    { t: 'اليوم الثامن — يوم التروية', d: 'الإحرام بالحج من مكان الإقامة، والتوجه إلى مِنى والمبيت بها، وأداء الصلوات الخمس مقصورة غير مجموعة.' },
    { t: 'اليوم التاسع — يوم عرفة', d: 'التوجه إلى عرفة والوقوف بها من الزوال حتى غروب الشمس (ركن الحج الأعظم)، والإكثار من الدعاء والذكر والاستغفار.' },
    { t: 'المبيت بمزدلفة', d: 'بعد غروب شمس يوم عرفة يُتجه إلى مزدلفة للمبيت بها، وجمع الحصى اللازم لرمي الجمرات.' },
    { t: 'اليوم العاشر — يوم النحر', d: 'رمي جمرة العقبة الكبرى بسبع حصيات، ثم الذبح أو الهدي، ثم الحلق أو التقصير (التحلل الأول)، ثم طواف الإفاضة والسعي لمن لم يسعَ مع طواف القدوم.' },
    { t: 'أيام التشريق (11، 12، وأحياناً 13)', d: 'المبيت بمنى، ورمي الجمرات الثلاث (الصغرى فالوسطى فالكبرى) كل يوم بعد زوال الشمس بسبع حصيات لكل جمرة.' },
    { t: 'طواف الوداع', d: 'آخر عمل قبل مغادرة مكة، وهو واجب على غير الحائض والنفساء.' },
  ];

  const ANWA = [
    { t: 'التمتع', d: 'الإحرام بالعمرة في أشهر الحج والتحلل منها، ثم الإحرام بالحج من مكة في نفس العام. وهو النوع الأكثر شيوعاً، وفيه هدي.' },
    { t: 'القِران', d: 'الإحرام بالعمرة والحج معاً من الميقات، ولا يتحلل حتى يفرغ من أعمال الحج. وفيه هدي.' },
    { t: 'الإفراد', d: 'الإحرام بالحج وحده دون عمرة قبله، ولا هدي فيه، ثم يعتمر بعد الفراغ من الحج إن أراد.' },
  ];

  const MEEQAT = [
    { t: 'ذو الحليفة (أبيار علي)', d: 'ميقات أهل المدينة المنورة، ومن مرّ بها قاصداً مكة.' },
    { t: 'الجُحفة (قريباً منها رابغ اليوم)', d: 'ميقات أهل الشام ومصر والمغرب العربي.' },
    { t: 'قَرن المنازل (السيل الكبير)', d: 'ميقات أهل نجد والطائف، ومن يمرّ بها من أهل الخليج قادماً عبر البر.' },
    { t: 'يلملم', d: 'ميقات أهل اليمن.' },
    { t: 'ذات عِرق', d: 'ميقات أهل العراق والمشرق.' },
  ];
  const MEEQAT_NOTE = 'من يسافر جواً ولا يمرّ بأحد هذه المواقيت يُحرم عند محاذاتها من الجو (تُعلن غالباً في الطائرة)، ومن يسكن بين مكة والميقات يُحرم من مكان سكنه، وأهل مكة يُحرمون منها للحج ويخرجون لأدنى الحل للعمرة.';

  const MAHDHURAT_BOTH = [
    'قصّ الشعر أو الأظافر عمداً',
    'استعمال الطيب في البدن أو الثوب بعد نية الإحرام',
    'عقد النكاح، سواء لنفسه أو لغيره',
    'الجماع ومقدماته كالتقبيل والمباشرة بشهوة',
    'قتل صيد البر البري أو الإعانة عليه',
    'قطع شجر الحرم أو نباته الأخضر',
  ];
  const MAHDHURAT_MEN = ['لبس المخيط، وهو ما فُصِّل على قدر العضو كالقميص والسراويل', 'تغطية الرأس بملاصق كالغترة أو القبعة'];
  const MAHDHURAT_WOMEN = ['تغطية الوجه بالنقاب والكفين بالقفازين (ولها التستر عن الأجانب بسدل الخمار من غير أن يلامس وجهها)'];

  const ARKAN = ['الإحرام', 'الوقوف بعرفة', 'طواف الإفاضة', 'السعي بين الصفا والمروة'];
  const WAJIBAT = ['الإحرام من الميقات المحدد', 'الوقوف بعرفة إلى الغروب لمن وقف نهاراً', 'المبيت بمزدلفة ليلة النحر', 'المبيت بمنى ليالي أيام التشريق', 'رمي الجمرات مرتبة', 'الحلق أو التقصير', 'طواف الوداع لغير الحائض والنفساء'];
  const ARKAN_NOTE = 'الأركان لا يصح الحج بدونها ولا يُجبر تركها بذبح، أما الواجبات فيصح الحج مع تركها لكن يلزم دم جبراناً.';

  const DUAS = [
    { t: 'التلبية', body: 'لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لَا شَرِيكَ لَكَ' },
    { t: 'عند رؤية الكعبة', body: 'اللَّهُمَّ زِدْ هَذَا الْبَيْتَ تَشْرِيفًا وَتَعْظِيمًا وَتَكْرِيمًا وَمَهَابَةً، وَزِدْ مَنْ شَرَّفَهُ وَكَرَّمَهُ مِمَّنْ حَجَّهُ أَوِ اعْتَمَرَهُ تَشْرِيفًا وَتَكْرِيمًا وَتَعْظِيمًا وَبِرًّا' },
    { t: 'بين الركن اليماني والحجر الأسود', body: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ' },
    { t: 'يوم عرفة', body: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ (خير الدعاء دعاء يوم عرفة)' },
  ];

  function renderHub() {
    N.view.innerHTML = `
      <div class="card center">
        <p class="hadith-text" style="font-size:1.05rem">«الْحَجُّ عَرَفَةُ» — «العُمْرَةُ إِلَى العُمْرَةِ كَفَّارَةٌ لِمَا بَيْنَهُمَا، وَالْحَجُّ المَبْرُورُ لَيْسَ لَهُ جَزَاءٌ إِلَّا الجَنَّةُ»</p>
      </div>
      <div class="tw-grid">
        <button class="tw-card all" data-go="hajj/umrah"><span>🕋</span><b>مناسك العمرة</b><small>خطوة بخطوة</small></button>
        <button class="tw-card fav" data-go="hajj/hajj"><span>🏔️</span><b>مناسك الحج</b><small>يوماً بيوم</small></button>
        <button class="tw-card" data-go="hajj/types"><span>📋</span><b>أنواع النسك</b><small>تمتع، قِران، إفراد</small></button>
        <button class="tw-card" data-go="hajj/meeqat"><span>🧭</span><b>مواقيت الإحرام</b><small>المواقيت الخمسة</small></button>
        <button class="tw-card" data-go="hajj/mahdhurat"><span>🚫</span><b>محظورات الإحرام</b><small>للرجال والنساء</small></button>
        <button class="tw-card" data-go="hajj/arkan"><span>⚖️</span><b>أركان وواجبات الحج</b><small>الفرق بينهما</small></button>
        <button class="tw-card" data-go="hajj/duas"><span>🤲</span><b>أدعية ومأثورات</b><small>التلبية وغيرها</small></button>
      </div>
      <p class="muted" style="font-size:.82rem;margin-top:10px">هذا دليل عام مختصر، ولا يغني عن سؤال أهل العلم عن تفاصيل حالتك الخاصة أو مذهبك.</p>`;
    $$('[data-go]').forEach((b) => { b.onclick = () => N.go(b.dataset.go); });
  }

  function steps(list) {
    return `<div class="roadmap">${list.map((s, i) => `
      <div class="rm-step done">
        <div class="rm-dot">${i + 1}</div>
        <div class="rm-card"><b>${esc(s.t)}</b><p>${esc(s.d)}</p></div>
      </div>`).join('')}</div>`;
  }

  function renderUmrah() {
    N.setTitle('مناسك العمرة');
    N.view.innerHTML = steps(UMRAH_STEPS);
  }
  function renderHajj() {
    N.setTitle('مناسك الحج');
    N.view.innerHTML = steps(HAJJ_STEPS);
  }
  function renderTypes() {
    N.setTitle('أنواع النسك');
    N.view.innerHTML = ANWA.map((a) => `<div class="card"><h3>${esc(a.t)}</h3><p style="margin:0;line-height:1.9">${esc(a.d)}</p></div>`).join('');
  }
  function renderMeeqat() {
    N.setTitle('مواقيت الإحرام');
    N.view.innerHTML = steps(MEEQAT) + `<p class="muted" style="font-size:.85rem;margin-top:10px">${esc(MEEQAT_NOTE)}</p>`;
  }
  function list(items) { return `<ul style="margin:0;padding-inline-start:20px;line-height:2.1">${items.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>`; }
  function renderMahdhurat() {
    N.setTitle('محظورات الإحرام');
    N.view.innerHTML = `
      <div class="card"><h3>محظورات على الجنسين</h3>${list(MAHDHURAT_BOTH)}</div>
      <div class="card"><h3>خاصة بالرجال</h3>${list(MAHDHURAT_MEN)}</div>
      <div class="card"><h3>خاصة بالنساء</h3>${list(MAHDHURAT_WOMEN)}</div>`;
  }
  function renderArkan() {
    N.setTitle('أركان وواجبات الحج');
    N.view.innerHTML = `
      <div class="card"><h3>أركان الحج (4)</h3>${list(ARKAN)}</div>
      <div class="card"><h3>واجبات الحج</h3>${list(WAJIBAT)}</div>
      <p class="muted" style="font-size:.85rem">${esc(ARKAN_NOTE)}</p>`;
  }
  function renderDuas() {
    N.setTitle('أدعية ومأثورات');
    N.view.innerHTML = DUAS.map((d) => `<div class="card"><h3>${esc(d.t)}</h3><p class="hadith-text" style="font-size:1.1rem">${esc(d.body)}</p></div>`).join('');
  }

  const PAGES = {
    umrah: { title: 'مناسك العمرة', render: renderUmrah },
    hajj: { title: 'مناسك الحج', render: renderHajj },
    types: { title: 'أنواع النسك', render: renderTypes },
    meeqat: { title: 'مواقيت الإحرام', render: renderMeeqat },
    mahdhurat: { title: 'محظورات الإحرام', render: renderMahdhurat },
    arkan: { title: 'أركان وواجبات الحج', render: renderArkan },
    duas: { title: 'أدعية ومأثورات', render: renderDuas },
  };
  function render(sub) {
    const p = PAGES[sub];
    if (!p) { renderHub(); routes.hajj.title = 'مناسك الحج والعمرة'; N.setTitle('مناسك الحج والعمرة'); routes.hajj.back = 'home'; return; }
    routes.hajj.title = p.title; routes.hajj.back = 'hajj';
    N.setTitle(p.title);
    p.render();
  }
  routes.hajj = { title: 'مناسك الحج والعمرة', render, back: 'home' };
});

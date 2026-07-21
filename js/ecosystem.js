window.I18N_PAGE_DICT = {
      'eco.hint': { en: 'Click any planet to explore · Scroll to zoom', ar: 'انقر على أي كوكب للاستكشاف · مرر للتكبير' },
      'eco.comingSoon': { en: 'Coming soon', ar: 'قريبًا' },
      'eco.exploreInside': { en: 'Explore inside', ar: 'استكشف بالداخل' },
      'eco.openSection': { en: 'Open full section <i class="fi fi-rr-arrow-small-right"></i>', ar: 'افتح القسم كاملاً ←' },
    };

const C=document.getElementById('solarCanvas');
const ctx=C.getContext('2d');
let W=C.width=window.innerWidth;
let H=C.height=window.innerHeight;
let cx=W/2, cy=H/2+30;
let scale=1, targetScale=1;
let panelOpen=false;
let hovered=null;
let time=0;
let mx=0,my=0,rfx=0,rfy=0;

// CURSOR
const cur=document.getElementById('cur');
const ring=document.getElementById('ring');
document.addEventListener('mousemove',e=>{
  mx=e.clientX;my=e.clientY;
  cur.style.transform=`translate(${mx-5}px,${my-5}px)`;
});
(function animRing(){
  rfx+=(mx-rfx-16)*.1;
  rfy+=(my-rfy-16)*.1;
  ring.style.transform=`translate(${rfx}px,${rfy}px)`;
  requestAnimationFrame(animRing);
})();

// PLANETS DATA
const planets=[
  {
    id:'regulator',
    name:'Regulatory body',
    nameAr:'الجهة التنظيمية',
    short:'CHI',
    shortAr:'CHI',
    ico:String.fromCodePoint(0xe37e),
    icoFont:'uicons-solid-rounded',
    color:'#A78BFA',
    radius:28,
    orbit:180,
    speed:0.0003,
    angle:Math.PI*0.1,
    tag:'Regulatory body',
    tagAr:'الجهة التنظيمية',
    comingSoon:true,
    desc:'CHI sets the rules that every hospital, insurer, and doctor must follow in Saudi Arabia. Internationally, equivalent bodies do the same. This is the foundation of the entire system.',
    descAr:'يضع مجلس التأمين الصحي (CHI) القواعد التي يجب أن يتبعها كل مستشفى وشركة تأمين وطبيب في المملكة العربية السعودية. وعالميًا، تقوم جهات مماثلة بالدور نفسه. هذه هي الركيزة الأساسية للنظام بالكامل.',
    subs:[
      {ico:'📜',title:'What is CHI?',desc:'The Council of Health Insurance — Saudi regulator'},
      {ico:'⚖️',title:'Rules for doctors',desc:'Compliance, obligations & penalties'},
      {ico:'🖥️',title:'NPHIES system',desc:'Saudi national health data platform'},
      {ico:'🌍',title:'International bodies',desc:'CMS, NHS, DHA & global comparison'},
      {ico:'🔍',title:'Audit standards',desc:'How inspections work & what they check'},
    ],
    subsAr:[
      {ico:'📜',title:'ما هو مجلس التأمين الصحي؟',desc:'مجلس التأمين الصحي (CHI) — الجهة التنظيمية السعودية'},
      {ico:'⚖️',title:'القواعد الخاصة بالأطباء',desc:'الالتزام، والواجبات، والعقوبات'},
      {ico:'🖥️',title:'نظام نفيس (NPHIES)',desc:'المنصة الوطنية السعودية لتبادل البيانات الصحية'},
      {ico:'🌍',title:'الجهات التنظيمية الدولية',desc:'CMS وNHS وDHA ومقارنة عالمية'},
      {ico:'🔍',title:'معايير التدقيق',desc:'كيف تتم عمليات التفتيش وما الذي تفحصه'},
    ]
  },
  {
    id:'provider',
    name:'Provider',
    nameAr:'مقدم الخدمة',
    short:'Hospital & clinics',
    shortAr:'المستشفيات والعيادات',
    ico: String.fromCodePoint(0xe182),
    icoFont: 'uicons-solid-straight',
    color:'#00C896',
    radius:34,
    orbit:280,
    speed:0.00022,
    angle:Math.PI*0.85,
    tag:'Provider',
    tagAr:'مقدم الخدمة',
    comingSoon:true,
    desc:'The provider is where care is delivered — hospital, clinic, or imaging center. As a radiologist, this is your world. Understanding how the provider interacts with insurers and regulators makes you exceptional.',
    descAr:'مقدم الخدمة هو المكان الذي تُقدَّم فيه الرعاية — المستشفى أو العيادة أو مركز التصوير الطبي. وباعتبارك أخصائي أشعة، فهذا هو عالمك. فهم كيفية تفاعل مقدم الخدمة مع شركات التأمين والجهات التنظيمية هو ما يجعلك متميزًا.',
    subs:[
      {ico:'🩻',title:'Radiology department',desc:'Workflow, reporting & quality standards'},
      {ico:'🚨',title:'Emergency imaging',desc:'Urgent requests & pre-auth bypass'},
      {ico:'💳',title:'Billing & ICD coding',desc:'How claims are built and submitted'},
      {ico:'🖥️',title:'RIS / PACS systems',desc:'The software behind every scan'},
      {ico:'📋',title:'Report standards',desc:'What a good radiology report looks like'},
      {ico:'✅',title:'Pre-auth requests',desc:'Writing requests that get approved'},
    ],
    subsAr:[
      {ico:'🩻',title:'قسم الأشعة',desc:'سير العمل، وإعداد التقارير، ومعايير الجودة'},
      {ico:'🚨',title:'التصوير الطبي الطارئ',desc:'الطلبات العاجلة وتجاوز التصريح المسبق'},
      {ico:'💳',title:'الفوترة وترميز ICD',desc:'كيف يتم إعداد المطالبات وتقديمها'},
      {ico:'🖥️',title:'أنظمة RIS / PACS',desc:'البرمجيات التي تقف وراء كل فحص'},
      {ico:'📋',title:'معايير التقارير',desc:'كيف يبدو تقرير الأشعة الجيد'},
      {ico:'✅',title:'طلبات التصريح المسبق',desc:'كتابة طلبات يتم اعتمادها'},
    ]
  },
  {
    id:'insurance',
    name:'Insurance company',
    nameAr:'شركة التأمين',
    short:'Payer & gatekeeper',
    shortAr:'الجهة الدافعة والرقيبة',
    ico:String.fromCodePoint(0xe8e7),
    icoFont:'uicons-solid-straight',
    color:'#4A9EFF',
    radius:32,
    orbit:390,
    speed:0.00016,
    angle:Math.PI*1.5,
    tag:'Insurance company',
    tagAr:'شركة التأمين',
    comingSoon:true,
    desc:'The insurer reviews every request before approving care. Understanding how they think — what they look for, why they deny, and how to appeal — is the most practical skill any radiologist can master.',
    descAr:'تراجع شركة التأمين كل طلب قبل الموافقة على تقديم الرعاية. فهم طريقة تفكيرها — ما تبحث عنه، وأسباب الرفض، وكيفية تقديم الاستئناف — هو أكثر مهارة عملية يمكن لأي أخصائي أشعة أن يتقنها.',
    subs:[
      {ico:'⭐',title:'Pre-authorization',desc:'The core step — how to get approvals fast'},
      {ico:'🔍',title:'Medical necessity',desc:'The criteria insurers use to decide'},
      {ico:'❌',title:'Denial management',desc:'Why requests fail & how to fix them'},
      {ico:'⚖️',title:'Appeals process',desc:'How to overturn a denied request'},
      {ico:'🔢',title:'ICD & CPT coding',desc:'The codes that determine payment'},
      {ico:'⏱️',title:'TAT benchmarks',desc:'Expected response times & your rights'},
    ],
    subsAr:[
      {ico:'⭐',title:'التصريح المسبق',desc:'الخطوة الأساسية — كيفية الحصول على الموافقات بسرعة'},
      {ico:'🔍',title:'الضرورة الطبية',desc:'المعايير التي تعتمدها شركات التأمين لاتخاذ القرار'},
      {ico:'❌',title:'إدارة الرفض',desc:'أسباب رفض الطلبات وكيفية معالجتها'},
      {ico:'⚖️',title:'إجراءات الاستئناف',desc:'كيفية عكس قرار رفض الطلب'},
      {ico:'🔢',title:'ترميز ICD وCPT',desc:'الرموز التي تحدد قيمة الدفع'},
      {ico:'⏱️',title:'معايير زمن الاستجابة (TAT)',desc:'أوقات الاستجابة المتوقعة وحقوقك'},
    ]
  },
  {
    id:'cycle',
    name:'Care cycle',
    nameAr:'دورة الرعاية',
    short:'How it all connects',
    shortAr:'كيف يرتبط كل شيء',
    ico:String.fromCodePoint(0xe2c9),
    icoFont:'uicons-bold-rounded',
    color:'#FF6B6B',
    radius:26,
    orbit:490,
    speed:0.0001,
    angle:Math.PI*0.4,
    tag:'The care cycle',
    tagAr:'دورة الرعاية',
    comingSoon:true,
    desc:'Every entity connects in one continuous loop: patient arrives <i class="fi fi-rr-arrow-small-right"></i> pre-auth submitted <i class="fi fi-rr-arrow-small-right"></i> insurer reviews <i class="fi fi-rr-arrow-small-right"></i> imaging performed <i class="fi fi-rr-arrow-small-right"></i> report written <i class="fi fi-rr-arrow-small-right"></i> claim submitted <i class="fi fi-rr-arrow-small-right"></i> payment made. Understanding the full loop makes you exceptional at every step.',
    descAr:'تتصل كل الجهات في حلقة واحدة متواصلة: يصل المريض ← يُقدَّم طلب التصريح المسبق ← تراجعه شركة التأمين ← يُجرى التصوير ← يُكتب التقرير ← تُقدَّم المطالبة ← تتم عملية الدفع. فهم هذه الحلقة كاملة يجعلك متميزًا في كل خطوة.',
    subs:[
      {ico:'🚶',title:'Patient journey',desc:'The full path from symptom to result'},
      {ico:'⏳',title:'Where delays happen',desc:'The two biggest bottlenecks explained'},
      {ico:'💰',title:'Claim to payment',desc:'How money moves through the system'},
      {ico:'✈️',title:'International cases',desc:'Cross-border & travel insurance'},
      {ico:'🔁',title:'Feedback loop',desc:'How outcomes improve the system'},
    ],
    subsAr:[
      {ico:'🚶',title:'رحلة المريض',desc:'المسار الكامل من ظهور الأعراض إلى النتيجة'},
      {ico:'⏳',title:'أين تحدث التأخيرات',desc:'أكبر عائقين في العملية موضحان بالتفصيل'},
      {ico:'💰',title:'من المطالبة إلى الدفع',desc:'كيف تتحرك الأموال داخل النظام'},
      {ico:'✈️',title:'الحالات الدولية',desc:'التأمين عبر الحدود وتأمين السفر'},
      {ico:'🔁',title:'حلقة التغذية الراجعة',desc:'كيف تُحسّن النتائج النظام'},
    ]
  },
];

// MOONS (smaller satellites)
const moons=[
  {parentId:'provider', name:'AI in radiology', nameAr:'الذكاء الاصطناعي في الأشعة', ico:'🧠', color:'#A78BFA', radius:14, orbitRadius:80, speed:0.0008, angle:0},
  {parentId:'insurance', name:'Patient rights', nameAr:'حقوق المريض', ico:'🧑‍⚕️', color:'#4A9EFF', radius:13, orbitRadius:72, speed:0.0007, angle:2.1},
  {parentId:'regulator', name:'Updates & news', nameAr:'التحديثات والأخبار', ico:'📰', color:'#F5A623', radius:13, orbitRadius:68, speed:0.0009, angle:1.2},
  {parentId:'cycle', name:'Research hub', nameAr:'مركز الأبحاث', ico:'🔬', color:'#00C896', radius:12, orbitRadius:65, speed:0.00075, angle:3.5},
];

// STAR FIELD
const stars=Array.from({length:200},()=>({
  x:Math.random()*W, y:Math.random()*H,
  r:Math.random()*1.2+.2,
  o:Math.random()*.6+.2,
  twinkle:Math.random()*Math.PI*2
}));

function getPlanetPos(p){
  return {
    x: cx + Math.cos(p.angle)*p.orbit*scale,
    y: cy + Math.sin(p.angle)*p.orbit*scale*0.45
  };
}

function getMoonPos(m){
  const parent=planets.find(p=>p.id===m.parentId);
  if(!parent)return{x:0,y:0};
  const pp=getPlanetPos(parent);
  return {
    x: pp.x + Math.cos(m.angle)*m.orbitRadius*scale,
    y: pp.y + Math.sin(m.angle)*m.orbitRadius*scale*0.5
  };
}

function drawStars(){
  stars.forEach(s=>{
    s.twinkle+=0.01;
    const o=s.o*(0.7+0.3*Math.sin(s.twinkle));
    ctx.beginPath();
    ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
    ctx.fillStyle=`rgba(6,6,8,${o})`;
    ctx.fill();
  });
}

function drawOrbit(p){
  ctx.beginPath();
  ctx.ellipse(cx, cy, p.orbit*scale, p.orbit*scale*0.45, 0, 0, Math.PI*2);
  ctx.strokeStyle='rgba(6,6,8,0.08)';
  ctx.lineWidth=1;
  ctx.stroke();
}

function drawSun(){
  // Glow
  const grd=ctx.createRadialGradient(cx,cy,0,cx,cy,90*scale);
  grd.addColorStop(0,'rgba(0,200,150,0.25)');
  grd.addColorStop(0.5,'rgba(0,200,150,0.08)');
  grd.addColorStop(1,'rgba(0,200,150,0)');
  ctx.beginPath();
  ctx.arc(cx,cy,90*scale,0,Math.PI*2);
  ctx.fillStyle=grd;
  ctx.fill();
  // Core
  ctx.beginPath();
  ctx.arc(cx,cy,44*scale,0,Math.PI*2);
  ctx.fillStyle='rgba(13,13,26,1)';
  ctx.fill();
  ctx.beginPath();
  ctx.arc(cx,cy,44*scale,0,Math.PI*2);
  ctx.strokeStyle='rgba(0,200,150,0.5)';
  ctx.lineWidth=1.5;
  ctx.stroke();
  // Label
  ctx.font=`${Math.max(10,16*scale)}px 'Clash Display'`;
  ctx.fillStyle='rgba(0,200,150,0.9)';
  ctx.textAlign='center';
  ctx.textBaseline='middle';
  ctx.fillText('iHealth',cx,cy-8*scale);
  ctx.font=`${Math.max(8,11*scale)}px 'Cabinet Grotesk'`;
  ctx.fillStyle='rgba(6,6,8,0.45)';
  ctx.fillText('ACADEMY',cx,cy+8*scale);
}

function drawPlanet(p){
  const pos=getPlanetPos(p);
  const r=p.radius*scale;
  const isHov=(hovered===p.id);
  // Ambient breathing glow — always on, so every planet feels alive, not just on hover
  const pulse=0.55+0.45*Math.sin(time*0.03+p.angle*3);
  const ambR=r*(1.8+0.3*pulse);
  const ag=ctx.createRadialGradient(pos.x,pos.y,0,pos.x,pos.y,ambR);
  ag.addColorStop(0,p.color+Math.round((isHov?38:20)*pulse+10).toString(16).padStart(2,'0'));
  ag.addColorStop(1,p.color+'00');
  ctx.beginPath();ctx.arc(pos.x,pos.y,ambR,0,Math.PI*2);
  ctx.fillStyle=ag;ctx.fill();
  // Extra hover glow on top
  if(isHov){
    const g=ctx.createRadialGradient(pos.x,pos.y,0,pos.x,pos.y,r*2.5);
    g.addColorStop(0,p.color+'40');
    g.addColorStop(1,p.color+'00');
    ctx.beginPath();ctx.arc(pos.x,pos.y,r*2.5,0,Math.PI*2);
    ctx.fillStyle=g;ctx.fill();
  }
  // Shadow
  ctx.beginPath();ctx.arc(pos.x+2,pos.y+2,r,0,Math.PI*2);
  ctx.fillStyle='rgba(0,0,0,0.4)';ctx.fill();
  // Body
  ctx.beginPath();ctx.arc(pos.x,pos.y,r,0,Math.PI*2);
  ctx.fillStyle=isHov?p.color:p.color+'BB';ctx.fill();
  // Slow self-spin highlight, so the body itself visibly rotates, not just the orbit
  const spinAngle=time*0.02+p.angle*2;
  ctx.save();
  ctx.beginPath();ctx.arc(pos.x,pos.y,r,0,Math.PI*2);ctx.clip();
  ctx.beginPath();
  ctx.ellipse(pos.x+Math.cos(spinAngle)*r*0.5,pos.y+Math.sin(spinAngle)*r*0.5,r*0.4,r*0.22,spinAngle,0,Math.PI*2);
  ctx.fillStyle='rgba(255,255,255,0.18)';ctx.fill();
  ctx.restore();
  // Ring for some — slowly tumbles for a Saturn-like living look
  if(p.id==='regulator'||p.id==='cycle'){
    ctx.beginPath();
    ctx.ellipse(pos.x,pos.y,r*1.6,r*0.4,time*0.01,0,Math.PI*2);
    ctx.strokeStyle=p.color+'50';ctx.lineWidth=2*scale;ctx.stroke();
  }
  // Icon
  const icoSize=Math.max(12,p.radius*scale*0.8);
  ctx.font=p.icoFont?`${icoSize}px '${p.icoFont}'`:`${icoSize}px serif`;
  ctx.textAlign='center';ctx.textBaseline='middle';
  ctx.fillStyle=p.icoFont?'#fff':ctx.fillStyle;
  ctx.fillText(p.ico,pos.x,pos.y);
  // Name label
  const isAr=window.I18N&&window.I18N.currentLang()==='ar';
  const dispName=(isAr&&p.nameAr)?p.nameAr:p.name;
  const dispShort=(isAr&&p.shortAr)?p.shortAr:p.short;
  ctx.font=`600 ${Math.max(9,11*scale)}px 'Cabinet Grotesk'`;
  ctx.fillStyle=isHov?'rgba(6,6,8,0.9)':'rgba(6,6,8,0.6)';
  ctx.textAlign='center';ctx.textBaseline='top';
  ctx.fillText(dispName,pos.x,pos.y+r+6*scale);
  ctx.font=`${Math.max(7,9*scale)}px 'Cabinet Grotesk'`;
  ctx.fillStyle='rgba(6,6,8,0.4)';
  ctx.fillText(dispShort,pos.x,pos.y+r+18*scale);
}

function drawMoon(m){
  const pos=getMoonPos(m);
  const r=m.radius*scale;
  const isHov=(hovered==='moon-'+m.name);
  ctx.beginPath();ctx.arc(pos.x,pos.y,r,0,Math.PI*2);
  ctx.fillStyle=isHov?m.color:m.color+'88';ctx.fill();
  ctx.font=`${Math.max(8,m.radius*scale*0.9)}px serif`;
  ctx.textAlign='center';ctx.textBaseline='middle';
  ctx.fillText(m.ico,pos.x,pos.y);
}

function drawConnectionLines(){
  // Subtle lines from sun to planets
  planets.forEach(p=>{
    const pos=getPlanetPos(p);
    ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(pos.x,pos.y);
    ctx.strokeStyle='rgba(0,200,150,0.04)';ctx.lineWidth=1;ctx.stroke();
  });
}

function animate(){
  ctx.clearRect(0,0,W,H);
  time+=1;
  // Smooth zoom
  scale+=(targetScale-scale)*.06;
  // Move planets
  planets.forEach(p=>{p.angle+=p.speed*(2-scale+0.5)});
  moons.forEach(m=>{m.angle+=m.speed*(2-scale+0.5)});

  drawStars();
  drawConnectionLines();
  planets.forEach(p=>drawOrbit(p));
  drawSun();
  moons.forEach(m=>drawMoon(m));
  planets.forEach(p=>drawPlanet(p));

  requestAnimationFrame(animate);
}
animate();

// HIT TEST
function hitTest(x,y){
  for(const p of planets){
    const pos=getPlanetPos(p);
    const r=p.radius*scale;
    const dx=x-pos.x,dy=y-pos.y;
    if(dx*dx+dy*dy<=r*r*2.5)return{type:'planet',data:p};
  }
  for(const m of moons){
    const pos=getMoonPos(m);
    const r=m.radius*scale;
    const dx=x-pos.x,dy=y-pos.y;
    if(dx*dx+dy*dy<=r*r*2.5)return{type:'moon',data:m};
  }
  return null;
}

// MOUSE EVENTS
C.addEventListener('mousemove',e=>{
  const hit=hitTest(e.clientX,e.clientY);
  if(hit){
    hovered=hit.type==='planet'?hit.data.id:'moon-'+hit.data.name;
    C.style.cursor='none';
    ring.style.width='52px';ring.style.height='52px';
    ring.style.borderColor='rgba(0,200,150,0.7)';
    if(hit.type==='moon'){
      const tip=document.getElementById('moonTip');
      const isArMoon=window.I18N&&window.I18N.currentLang()==='ar';
      const moonName=(isArMoon&&hit.data.nameAr)?hit.data.nameAr:hit.data.name;
      tip.textContent=hit.data.ico+' '+moonName;
      tip.style.left=(e.clientX+14)+'px';
      tip.style.top=(e.clientY-10)+'px';
      tip.classList.add('show');
    } else {
      document.getElementById('moonTip').classList.remove('show');
    }
  } else {
    hovered=null;
    ring.style.width='32px';ring.style.height='32px';
    ring.style.borderColor='rgba(0,200,150,0.4)';
    document.getElementById('moonTip').classList.remove('show');
  }
});

C.addEventListener('click',e=>{
  const hit=hitTest(e.clientX,e.clientY);
  if(!hit)return;
  document.getElementById('hintBar').classList.add('hidden');
  if(hit.type==='planet') openPanel(hit.data);
  else{
    const parent=planets.find(p=>p.id===hit.data.parentId);
    if(parent) openPanel(parent);
  }
});

// SCROLL ZOOM
C.addEventListener('wheel',e=>{
  e.preventDefault();
  targetScale=Math.max(0.5,Math.min(1.8,targetScale-e.deltaY*0.0008));
},{passive:false});

// PANEL
let currentPanelPlanet=null;
function openPanel(p){
  panelOpen=true;
  currentPanelPlanet=p;
  const isAr=window.I18N&&window.I18N.currentLang()==='ar';
  const dispName=(isAr&&p.nameAr)?p.nameAr:p.name;
  const dispTag=(isAr&&p.tagAr)?p.tagAr:p.tag;
  const dispDesc=(isAr&&p.descAr)?p.descAr:p.desc;
  const dispSubs=(isAr&&p.subsAr)?p.subsAr:p.subs;
  document.getElementById('p-ico').style.display='none';
  const tag=document.getElementById('p-tag');
  tag.textContent=dispTag;
  tag.style.background=p.color+'18';
  tag.style.color=p.color;
  tag.style.border='1px solid '+p.color+'44';
  document.getElementById('p-soon').classList.toggle('show', !!p.comingSoon);
  document.getElementById('p-title').textContent=dispName;
  document.getElementById('p-desc').innerHTML=dispDesc;
  document.getElementById('p-subs').innerHTML=dispSubs.map(s=>`
    <div class="sub-item">
      <span class="sub-item-ico">${s.ico}</span>
      <div>
        <div class="sub-item-title">${s.title}</div>
        <div class="sub-item-desc">${s.desc}</div>
      </div>
    </div>
  `).join('');
  const btn=document.getElementById('p-btn');
  btn.innerHTML=isAr?('استكشف '+dispName+' ←'):('Explore '+dispName+' <i class="fi fi-rr-arrow-small-right"></i>');
  btn.style.background=p.color;
  btn.style.color=p.id==='provider'?'#060608':'#060608';
  document.getElementById('panel').classList.add('open');
}

function closePanel(){
  document.getElementById('panel').classList.remove('open');
  panelOpen=false;
}

// Re-render the currently open panel (and refresh the coming-soon badge text)
// when the language toggles, since panel content is set via JS, not data-i18n.
document.addEventListener('ih:langchange',()=>{
  if(panelOpen&&currentPanelPlanet) openPanel(currentPanelPlanet);
});

// RESIZE
window.addEventListener('resize',()=>{
  W=C.width=window.innerWidth;
  H=C.height=window.innerHeight;
  cx=W/2;cy=H/2+30;
  stars.forEach(s=>{s.x=Math.random()*W;s.y=Math.random()*H});
});

AOS.init({
      duration: 700,
      easing: 'ease',
      once: true,
      offset: 80
    });

const CEO = { abbr:"MA", role:"Founder & CEO", name:"Dr. Musab M. Ahmed" };

const TIER1 = [
  { abbr:"OPS", dept:"Success Lead" },
  { abbr:"MED ED", dept:"Academic Dean" }
];
const TIER2 = [
  { abbr:"FIN", dept:"Finance Lead" },
  { abbr:"TECH", dept:"Technology Lead" },
  { abbr:"PARTNER", dept:"Partnerships Lead" }
];
const TIER3 = [
  { abbr:"CHRO", dept:"Human Resources" },
  { abbr:"CAIO", dept:"Artificial Intelligence" },
  { abbr:"CRO", dept:"Research" },
  { abbr:"CINO", dept:"Innovation" }
];

const PALETTE = {
  ceo:   { light:"#FFFFFF", mid:"#EAF2FF", dark:"#B9CEF2", ring:"#3B7BF6" },
  tier1: { light:"#EAF2FF", mid:"#3B7BF6", dark:"#0F2A5C", ring:"#8FB4FF" },
  tier2: { light:"#DCE6F5", mid:"#5B7DAE", dark:"#1A2A42", ring:"#9FB4D4" },
  tier3: { light:"#C7CEDA", mid:"#4B5568", dark:"#161B26", ring:"#6B7484" }
};

/* seeded PRNG for reproducible organic layout */
function makeRand(seed){
  let s = seed;
  return () => { s = (s*9301+49297) % 233280; return s/233280; };
}

function layoutTierBand(nodes, r, bandY, spread, rand, padding){
  // start with a rough horizontal spread, then relax with pairwise repulsion + spring to band
  const pts = nodes.map((n, i) => ({
    x: (i - (nodes.length-1)/2) * (r*2.3) + (rand()-0.5)*30,
    y: bandY + (rand()-0.5)*spread,
    r
  }));
  for(let iter=0; iter<220; iter++){
    for(let i=0;i<pts.length;i++){
      for(let j=i+1;j<pts.length;j++){
        const dx = pts[j].x-pts[i].x, dy = pts[j].y-pts[i].y;
        const dist = Math.sqrt(dx*dx+dy*dy) || 0.001;
        const minDist = pts[i].r+pts[j].r+padding;
        if(dist < minDist){
          const push = (minDist-dist)/2;
          const ux = dx/dist, uy = dy/dist;
          pts[i].x -= ux*push; pts[i].y -= uy*push;
          pts[j].x += ux*push; pts[j].y += uy*push;
        }
      }
    }
    pts.forEach(p=>{
      p.y += (bandY - p.y) * 0.09;
      p.x += (0 - p.x) * 0.01;
    });
  }
  return pts;
}

function orbGradient(id, pal){
  return `<radialGradient id="${id}" cx="35%" cy="27%" r="75%">
    <stop offset="0%" stop-color="${pal.light}"/>
    <stop offset="55%" stop-color="${pal.mid}"/>
    <stop offset="100%" stop-color="${pal.dark}"/>
  </radialGradient>`;
}

function ceoOrbMarkup(r, photoHref, ringColor, bobDelay){
  return `
    <g class="orb-group bob" data-idx="0" style="animation-delay:${bobDelay}s; transform-origin:0px 0px;">
      <g class="orb-scale" data-idx="0" data-base-r="${r}" style="transform-origin:0px 0px;">
        <ellipse cx="0" cy="${r*1.12}" rx="${r*0.78}" ry="${r*0.15}" fill="#000" opacity="0.28"/>
        <circle class="orb-ring" cx="0" cy="0" r="${r+5}" fill="none" stroke="${ringColor}" stroke-width="1.5"/>
        <circle cx="0" cy="0" r="${r}" fill="#EAF2FF" stroke="${ringColor}" stroke-width="3"/>
        <image href="${photoHref}" x="${-r}" y="${-r*1.18}" width="${r*2}" height="${r*3}" clip-path="url(#ceoPhotoClip)" preserveAspectRatio="none"/>
        <rect x="${-r}" y="${r*0.32}" width="${r*2}" height="${r*0.68}" fill="url(#ceoScrim)" clip-path="url(#ceoPhotoClip)"/>
      </g>
    </g>`;
}

function orbMarkup(idx, x, y, r, gradId, ringColor, abbrText, abbrSize, strokeExtra, bobDelay){
  return `
    <g class="orb-group bob" data-idx="${idx}" style="animation-delay:${bobDelay}s; transform-origin:${x}px ${y}px;">
      <g class="orb-scale" data-idx="${idx}" data-base-r="${r}" style="transform-origin:${x}px ${y}px;">
        <ellipse cx="${x}" cy="${y+r*0.94}" rx="${r*0.78}" ry="${r*0.15}" fill="#000" opacity="0.38"/>
        <circle class="orb-ring" cx="${x}" cy="${y}" r="${r+5}" fill="none" stroke="${ringColor}" stroke-width="1.5"/>
        <circle class="orb" cx="${x}" cy="${y}" r="${r}" fill="url(#${gradId})" ${strokeExtra||""}/>
        <ellipse cx="${x-r*0.32}" cy="${y-r*0.4}" rx="${r*0.27}" ry="${r*0.15}" fill="#fff" opacity="0.4"/>
        <text x="${x}" y="${y+abbrSize*0.08}" class="abbr" style="font-size:${abbrSize}px;">${abbrText}</text>
      </g>
    </g>`;
}

function build(){
  const rand = makeRand(7);
  const rCeo = 78, r1 = 60, r2 = 47, r3 = 39;

  const bandY1 = 210, bandY2 = 390, bandY3 = 560;
  const pts1 = layoutTierBand(TIER1, r1, bandY1, 12, rand, 60);
  const pts2 = layoutTierBand(TIER2, r2, bandY2, 14, rand, 30);
  const pts3 = layoutTierBand(TIER3, r3, bandY3, 16, rand, 46);

  let defs = [
    `<clipPath id="ceoPhotoClip"><circle cx="0" cy="0" r="${rCeo}"/></clipPath>`,
    `<linearGradient id="ceoScrim" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0B1B30" stop-opacity="0"/>
      <stop offset="100%" stop-color="#0B1B30" stop-opacity="0.88"/>
    </linearGradient>`,
    orbGradient("gradT1", PALETTE.tier1),
    orbGradient("gradT2", PALETTE.tier2),
    orbGradient("gradT3", PALETTE.tier3)
  ];
  let els = [];
  let radiusByIdx = {}; // idx -> base radius, for scale-ratio math

  // CEO orb (idx 0) — founder's photo, clipped to the circle
  radiusByIdx[0] = rCeo;
  els.push(ceoOrbMarkup(rCeo, "images/founder-ceo-formal.png", PALETTE.ceo.ring, 0));
  els.push(`
    <text x="0" y="${rCeo*0.58}" class="ceo-role" style="font-size:11px;">${CEO.role}</text>
    <text x="0" y="${rCeo*0.80}" class="ceo-name" style="font-size:14px;">${CEO.name}</text>
  `);

  let idx = 1;
  function renderTier(pts, nodes, gradId, ring, abbrSize, deptSize, deptColor, delayBase){
    pts.forEach((p, i)=>{
      radiusByIdx[idx] = p.r;
      els.push(orbMarkup(idx, p.x, p.y, p.r, gradId, ring, nodes[i].abbr, abbrSize, "", delayBase + i*0.5));
      els.push(`<text x="${p.x}" y="${p.y+p.r+22}" class="dept" style="font-size:${deptSize}px; fill:${deptColor};">${nodes[i].dept}</text>`);
      idx++;
    });
  }
  renderTier(pts1, TIER1, "gradT1", PALETTE.tier1.ring, 14, 12.5, "var(--ink-dim)", 0.2);
  renderTier(pts2, TIER2, "gradT2", PALETTE.tier2.ring, 12, 11.5, "var(--ink-dim)", 0.6);
  renderTier(pts3, TIER3, "gradT3", PALETTE.tier3.ring, 10.5, 11, "var(--ink-faint)", 1.0);

  const allPts = [{x:0,y:0,r:rCeo}, ...pts1, ...pts2, ...pts3];
  const minX = Math.min(...allPts.map(p=>p.x-p.r)) - 30;
  const maxX = Math.max(...allPts.map(p=>p.x+p.r)) + 30;
  const minY = -rCeo - 44;
  const maxY = Math.max(...allPts.map(p=>p.y+p.r)) + 44;

  const svg = `<svg viewBox="${minX} ${minY} ${maxX-minX} ${maxY-minY}" xmlns="http://www.w3.org/2000/svg">
    <defs>${defs.join("")}</defs>
    ${els.join("")}
  </svg>`;
  document.getElementById("stage").innerHTML = svg;

  wireInteraction(radiusByIdx, rCeo, r1);
}

function wireInteraction(radiusByIdx, rCeo, rSuccess){
  const state = { elevatedIdx:null };

  function setScale(targetIdx, factor){
    const el = document.querySelector(`.orb-scale[data-idx="${targetIdx}"]`);
    if(el) el.style.transform = factor === 1 ? "" : `scale(${factor})`;
  }

  document.querySelectorAll(".orb-group").forEach(group=>{
    group.addEventListener("click", ()=>{
      const idx = parseInt(group.dataset.idx, 10);

      if(idx === 0){
        // clicked CEO — go straight to the founder's profile
        window.location = "founder.html";
        return;
      }

      // clicked a non-CEO orb
      if(state.elevatedIdx === idx){
        setScale(idx, 1); state.elevatedIdx = null;
      } else {
        if(state.elevatedIdx !== null) setScale(state.elevatedIdx, 1);
        const baseR = radiusByIdx[idx];
        setScale(idx, rCeo/baseR);
        state.elevatedIdx = idx;
      }
    });
  });
}

build();

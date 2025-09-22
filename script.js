// Projects data - replace / extend with your own projects and images
const projects = [
    { id: 'p1', 
      title: 'Aurora UI Kit', 
      role: 'Frontend, Motion', 
      tech: ['HTML', 'CSS', 'GSAP'], 
      thumbGradient: `url('../assets/ai-hoshino.png')`, 
      desc: 'A micro-interaction driven UI-kit with accessible components and fluid transitions. Built to demonstrate motion-first design.', 
      type: 'big', 
      live: '#', 
      source: '#' 
    },
    { id: 'p2', 
      title: 'AI Resume Analyser', 
      role: 'Frontend', 
      tech: ['JS', 'Canvas', 'Redux'], 
      thumbGradient: `url('../assets/resume-analyser.png')`, 
      desc: 'Tool for annotating and exporting timestamped notes — performance-focused and keyboard friendly.', 
      type: 'mini', 
      live: '#', 
      source: '#' 
    },
    { id: 'p3', 
      title: 'PhotoSnap Website', 
      role: 'Frontend, Design', 
      tech: ['HTML', 'CSS', 'GSAP'], 
      thumbGradient: `url('../assets/photosnap.png.png')`, 
      desc: 'Prototype of a low-latency player UI with adaptive visuals and animated state transitions.', 
      type: 'mini', 
      live: '#', 
      source: '#' 
    },
];

const hero = document.querySelector('.hero');
const details = document.getElementById('project-list');
const panel = document.getElementById('panel');
const panelThumb = document.getElementById('panelThumb');
const panelTitle = document.getElementById('panelTitle');
const panelDesc = document.getElementById('panelDesc');
const panelTags = document.getElementById('panelTags');
const liveLink = document.getElementById('liveLink');
const codeLink = document.getElementById('codeLink');

// Create hero tiles
projects.forEach((p, i) => {
    const tile = document.createElement('article');
    tile.className = 'tile';
    tile.classList.add(p.type);
    tile.dataset.id = p.id;
    tile.innerHTML = `
        <div class="thumb" style="background-image: ${p.thumbGradient};"></div>
        <div class="reveal"></div>
        <div class="meta">
          <h3>${p.title}</h3>
          <p>${p.role} · ${p.tech.join(', ')}</p>
        </div>
      `;
    tile.addEventListener('click', () => openPanel(p));
    tile.addEventListener('keydown', e => { if (e.key === 'Enter') openPanel(p) });
    tile.tabIndex = 0;
    hero.appendChild(tile);
});


// Panel open/close
function openPanel(p) {
    panelThumb.style.background = p.thumbGradient;
    panelTitle.textContent = p.title;
    panelDesc.textContent = p.desc;
    panelTags.innerHTML = p.tech.map(t => `<span class="tag">${t}</span>`).join('');
    liveLink.href = p.live;
    codeLink.href = p.source;

    panel.classList.add('open');
    panel.setAttribute('aria-hidden', 'false');

    // animate panel in with GSAP
    gsap.killTweensOf(panel);
    gsap.fromTo(panel, { x: 60, opacity: 0, scale: 0.98 }, { x: 0, opacity: 1, scale: 1, duration: 0.42, ease: 'power3.out' });
    // focus management
    document.getElementById('panelClose').focus();
}

function closePanel() {
    gsap.to(panel, {
        x: 40, opacity: 0, scale: 0.98, duration: 0.32, ease: 'power2.in', onComplete: () => {
            panel.classList.remove('open');
            panel.setAttribute('aria-hidden', 'true');
        }
    });
}
document.getElementById('panelClose').addEventListener('click', closePanel);
// keyboard escape close
window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closePanel(); });

// small accessibility: focus visible style
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') document.body.classList.add('user-is-tabbing');
});

// On load micro animation: slightly pulse the logo
gsap.from('.logo', { scale: 0.9, opacity: 0.9, duration: 0.9, ease: 'elastic.out(1,0.6)', delay: 0.5 });

// If you'd like to add analytics or more dynamic content,
// replace the projects array with a fetch or a CMS export.

// Dark/light toggle
const btn = document.getElementById('themeToggle');
btn.onclick = () => {
    document.body.classList.toggle('light');
    btn.textContent = document.body.classList.contains('light') ? '🌙' : '☀️';
};

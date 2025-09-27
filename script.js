// Projects data - replace / extend with your own projects and images
const projects = [
    { id: 'p1', 
      title: 'AI Resume Analyzer', 
      role: 'Frontend, Backend integration', 
      tech: ['React + Vite', 'React Router', 'Tailwind CSS', 'Zustand', 'Puter.js'], 
      thumbGradient: `url('../assets/ai-resume-analyser.png')`, 
      desc1: 'The AI Resume Analyzer is a web application built with Puter.js that leverages artificial intelligence to evaluate resumes and provide actionable feedback.', 
      desc2: 'Users can upload their resumes and receive an analysis covering structure, skills, and overall presentation.',
      type: 'big', 
      live: 'https://ai-resume-analyzer-xi-seven.vercel.app/', 
      source: 'https://github.com/sheet848/ai-resume-analyzer' 
    },
    { id: 'p2', 
      title: 'Video Annotation App', 
      role: 'Frontend', 
      tech: ['React + Vite', 'Redux', 'CSS'], 
      thumbGradient: `url('../assets/video-annotate-app.png')`, 
      desc1: 'The Video Annotation App is a web-based tool that allows users to interact with video content by adding annotations, highlights, and comments at specific timestamps. It is designed to enhance learning and content review by making videos more interactive and insightful.', 
      type: 'mini', 
      live: 'https://github.com/sheet848/video-annotate', 
      source: 'https://video-annotate.vercel.app/' 
    },
    { id: 'p3', 
      title: 'PhotoSnap Website', 
      role: 'Frontend, Design', 
      tech: ['React', 'React Router', 'SCSS'], 
      thumbGradient: `url('../assets/photosnap.png')`, 
      desc1: 'The Photosnap Website is a multi-page responsive web project. It focuses on creating a clean, modern photography platform where users can explore and showcase visual stories through engaging layouts.',
      desc2: 'The site emphasizes responsive design and reusable components, ensuring that it delivers a seamless experience across desktop, tablet, and mobile devices.', 
      type: 'mini', 
      live: 'https://photosnap-website-two.vercel.app/', 
      source: 'https://github.com/sheet848/photosnap-website' 
    },
];

const hero = document.querySelector('.hero');
const details = document.getElementById('project-list');
const panel = document.getElementById('panel');
const panelThumb = document.getElementById('panelThumb');
const panelTitle = document.getElementById('panelTitle');
const panelDesc1 = document.getElementById('panelDesc1');
const panelDesc2 = document.getElementById('panelDesc2');
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
    panelDesc1.textContent = p.desc1;
    panelDesc2.textContent = p.desc2;
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
    btn.textContent = document.body.classList.contains('light') ? '⚫️' : '⚪';
};

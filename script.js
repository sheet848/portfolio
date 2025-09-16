const projects = [
      { id: 'p1', title: 'Aurora UI Kit', role: 'Frontend, Motion', tech: ['HTML', 'CSS', 'GSAP'], thumbGradient: 'linear-gradient(135deg,#00f0ff,#ff6ad5)', desc: 'A micro-interaction driven UI-kit with accessible components and fluid transitions. Built to demonstrate motion-first design.', live: '#', source: '#' },
      { id: 'p2', title: 'Video Annotation App', role: 'Frontend', tech: ['JS', 'Canvas', 'Redux'], thumbGradient: 'linear-gradient(135deg,#ff6ad5,#90ff7a)', desc: 'Tool for annotating and exporting timestamped notes — performance-focused and keyboard friendly.', live: '#', source: '#' },
      { id: 'p3', title: 'Mini Streaming UI', role: 'Frontend, Design', tech: ['HTML', 'CSS', 'GSAP'], thumbGradient: 'linear-gradient(135deg,#90ff7a,#00f0ff)', desc: 'Prototype of a low-latency player UI with adaptive visuals and animated state transitions.', live: '#', source: '#' },
      { id: 'p4', title: 'Interactive Resume', role: 'Frontend', tech: ['HTML', 'CSS', 'JS'], thumbGradient: 'linear-gradient(135deg,#ffb86b,#ff6ad5)', desc: 'An interactive resume that surfaces projects first and shows your story through layout and motion.', live: '#', source: '#' },
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
      tile.dataset.id = p.id;
      tile.innerHTML = `
        <div class="thumb" style="background:${p.thumbGradient};"></div>
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

    // tiny polish: hover tilt parallax on tiles
    document.querySelectorAll('.tile').forEach(tile => {
      tile.addEventListener('mousemove', (e) => {
        const rect = tile.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        gsap.to(tile, { rotationY: x * 6, rotationX: -y * 6, transformOrigin: 'center', duration: 0.4, ease: 'power3.out' });
      });
      tile.addEventListener('mouseleave', () => {
        gsap.to(tile, { rotationY: 0, rotationX: 0, duration: 0.5, ease: 'power3.out' });
      });
    });

    // Make internal nav smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', (e) => {
        const href = a.getAttribute('href');
        if (href.length > 1) {
          e.preventDefault();
          document.querySelector(href).scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

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

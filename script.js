const nav = document.querySelector('.nav');
const glow = document.querySelector('.cursor-glow');
const menuBtn = document.querySelector('.menu-btn');

window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 20));

window.addEventListener('mousemove', (e) => {
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});

menuBtn?.addEventListener('click', () => nav.classList.toggle('mobile-open'));
document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => nav.classList.remove('mobile-open')));

const interestData = {
  robotics: ["ROBOTICS", "I like making machines think, move, and react to the world around them."],
  aerospace: ["AEROSPACE", "Rovers, rockets, drones and spacecraft sit at a really fun intersection of physics and engineering. I'm interested in how we make machines work where the environment isn't forgiving."],
  physics: ["PHYSICS", "Astrophysics, particle physics, dark matter, accelerators, basically any question that starts with “but why does the universe do that?”"],
  vlsi: ["VLSI", "I'm interested in how complicated systems can be built from tiny electronic building blocks, and how hardware design connects to the software running on top of it."],
  music: ["MUSIC", `I play guitar, sing and write songs. Turns out, circuits and chords get along pretty well.<br><span class="swift-reference">“I can make the whole place shimmer.” ✦</span><br><a class="interest-link" href="https://www.instagram.com/sing.now.bhavya/" target="_blank" rel="noopener">visit my singing page ↗</a>`],
  writing: ["WRITING", `I love turning ideas into words, from science and technology pieces to the random thoughts that refuse to stay in my head.<br><a class="interest-link" href="https://medium.com/@vbhavyareddy7" target="_blank" rel="noopener">read my writing on Medium ↗</a>`],
  reading: ["READING", `Books are another way to disappear for a while, especially stories that pull me completely into another world.`],
  photography: ["PHOTOGRAPHY", `I love photography for the same reason I love pretty skies: sometimes something is beautiful for only a moment, and I like keeping a little piece of it.<br><a class="interest-link" href="#photography">see my camera roll ↗</a>`]
};

document.querySelectorAll('.star').forEach(star => {
  star.addEventListener('click', () => {
    document.querySelectorAll('.star').forEach(s => s.classList.remove('active'));
    star.classList.add('active');
    const [title, text] = interestData[star.dataset.interest];
    document.querySelector('#interest-panel').innerHTML = `<span>✦ ${title}</span><p>${text}</p>`;
  });
});

const articleData = {
  welcome: {
    label: "ORIENTATION NEWSLETTER · PAGE 1",
    title: "Welcome, Class of 2030",
    meta: "Co-authored with Sanvith Murari & Sameeha Yasmin",
    body: "A warm welcome to CBIT's incoming batch, reflecting on finding your way around campus, discovering clubs and friendships, and growing into the next four years.",
    note: "The piece closes by welcoming the Class of 2030 to script their own version of Happy Days.",
    image: "assets/transcendent-welcome-article.png"
  },
  dystopian: {
    label: "SCIENCE & TECHNOLOGY · PAGE 12",
    title: "Dystopian Technology or Human Paranoia as Usual?",
    meta: "Bhavya Veeramreddy · Sub-Editor",
    body: "An exploration of AI-powered glasses, including accessibility features such as live transcription, translation and scene description, alongside questions about privacy and facial data.",
    note: "The article asks whether today's reaction to AI glasses echoes earlier waves of technology-driven paranoia.",
    image: "assets/transcendent-dystopian-article.png"
  },
  mri: {
    label: "SCIENCE & TECHNOLOGY · TRANSCENDENT",
    title: "What If Getting an MRI Was as Easy as Taking a Photo?",
    meta: "Bhavya Veeramreddy · Sub-Editor",
    body: "A look at Midjourney Medical's Ultrasonic CT (USCT) technology and the idea of making medical imaging easier, faster and more accessible.",
    note: "The piece explores how ultrasound, large-scale sensing and computing could make routine imaging feel less intimidating and more accessible.",
    image: "assets/transcendent-mri-article.png"
  }
};

const articleTrack = document.querySelector('#article-track');
const articleSlides = [...document.querySelectorAll('.article-slide')];
let articleIndex = 0;
function showArticleSlide(index) {
  if (!articleTrack || !articleSlides.length) return;
  articleIndex = (index + articleSlides.length) % articleSlides.length;
  articleTrack.style.transform = `translateX(-${articleIndex * 100}%)`;
}
document.querySelector('#article-prev')?.addEventListener('click', () => showArticleSlide(articleIndex - 1));
document.querySelector('#article-next')?.addEventListener('click', () => showArticleSlide(articleIndex + 1));

const articleModal = document.querySelector('#article-modal');
const articleModalContent = document.querySelector('#article-modal-content');
function openArticle(key) {
  const a = articleData[key];
  if (!a || !articleModalContent) return;
  articleModalContent.innerHTML = `
    ${a.image ? `<a class="article-full-image-link" href="${a.image}" target="_blank" rel="noopener" aria-label="Open full article image"><img class="article-modal-image" src="${a.image}" alt="${a.title}"></a>` : `<div class="article-modal-cover"><span>VOL. 15 · ISSUE 1</span><b>WELCOME,<br>CLASS OF 2030</b></div>`}
    <div class="eyebrow">${a.label}</div>
    <h3>${a.title}</h3>
    <p class="article-modal-meta">${a.meta}</p>
    <p>${a.body}</p>
    <p>${a.note}</p>`;
  articleModal.classList.add('open');
  articleModal.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
}
articleSlides.forEach(slide => slide.addEventListener('click', () => openArticle(slide.dataset.article)));
let articleTouchStartX = 0;
let articleTouchStartY = 0;
articleTrack?.addEventListener('touchstart', (e) => {
  const t = e.changedTouches[0];
  articleTouchStartX = t.clientX;
  articleTouchStartY = t.clientY;
}, {passive:true});
articleTrack?.addEventListener('touchend', (e) => {
  const t = e.changedTouches[0];
  const dx = t.clientX - articleTouchStartX;
  const dy = t.clientY - articleTouchStartY;
  if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
    showArticleSlide(articleIndex + (dx < 0 ? 1 : -1));
  }
}, {passive:true});
function closeArticleModal() {
  articleModal?.classList.remove('open');
  articleModal?.setAttribute('aria-hidden','true');
  if (!document.querySelector('#project-modal.open')) document.body.style.overflow='';
}
document.querySelector('#article-modal-close')?.addEventListener('click', closeArticleModal);
document.querySelector('.article-modal-backdrop')?.addEventListener('click', closeArticleModal);

const imageModal = document.querySelector('#image-modal');
const imageModalImg = document.querySelector('#image-modal-img');
function openImageModal(src, alt='') {
  if (!imageModal || !imageModalImg) return;
  imageModalImg.src = src;
  imageModalImg.alt = alt;
  imageModal.classList.add('open');
  imageModal.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
}
function closeImageModal() {
  imageModal?.classList.remove('open');
  imageModal?.setAttribute('aria-hidden','true');
  if (!document.querySelector('#project-modal.open') && !document.querySelector('#article-modal.open')) document.body.style.overflow='';
}
document.querySelector('#team-image-trigger')?.addEventListener('click', () => openImageModal('assets/transcendent-team.png', 'Full Transcendent team photo'));
document.querySelector('.image-modal-close')?.addEventListener('click', closeImageModal);
document.querySelector('.image-modal-backdrop')?.addEventListener('click', closeImageModal);
document.querySelectorAll('.photo-image-card').forEach(card => {
  card.addEventListener('click', () => openImageModal(card.dataset.photo, card.dataset.photoAlt || 'Photography'));
});

const projects = {
  rover: {
    title: "Autonomous Rover",
    category: "ROBOTICS / COMPUTER VISION",
    body: `<p>A proposed autonomous navigation system where the rover first identifies a target class, searches its surroundings, then moves toward the target while using perception and distance sensing to stay safe.</p>
      <h4>System idea</h4>
      <ul><li>Camera → Raspberry Pi → OpenCV preprocessing → YOLO target detection</li><li>LiDAR provides distance information for navigation and obstacle awareness</li><li>Raspberry Pi sends movement decisions to an ESP32</li><li>ESP32 controls the motors through an L298N motor driver</li></ul>
      <h4>Key technologies</h4><p>Raspberry Pi · ESP32 · OpenCV · YOLO · LiDAR · L298N · Python/C++</p>
      <div class="embedded-report"><div class="embedded-report-head"><span>TECHNICAL REPORT</span><small>scroll inside the report</small></div><iframe title="Autonomous Rover Technical Report" src="assets/autonomous-rover-navigation-report.pdf#toolbar=0&navpanes=0&scrollbar=1" loading="lazy"></iframe><div class="embedded-report-actions"><a class="pdf-fullscreen-btn" href="assets/autonomous-rover-navigation-report.pdf" target="_blank" rel="noopener">view full screen ↗</a></div></div>`
  },
  coppelia: {
    title: "CoppeliaSim Rover",
    category: "SIMULATION / CONTROL",
    body: `<p>A simulated rover task focused on implementing PID line-following logic in C and integrating the controller with a CoppeliaSim environment.</p>
      <h4>What I explored</h4><ul><li>Reading sensor information from the simulated rover</li><li>Calculating error relative to the desired path</li><li>Using proportional, integral and derivative terms</li><li>Converting controller output into motor commands</li></ul>
      <div class="embedded-report"><div class="embedded-report-head"><span>PID TECHNICAL REPORT</span><small>scroll inside the report</small></div><iframe title="PID Line Following Rover Technical Report" src="assets/pid-line-following-rover.pdf#toolbar=0&navpanes=0&scrollbar=1" loading="lazy"></iframe><div class="embedded-report-actions"><a class="pdf-fullscreen-btn" href="assets/pid-line-following-rover.pdf" target="_blank" rel="noopener">view full screen ↗</a></div></div>
      <div class="project-video"><video controls playsinline preload="metadata" src="assets/pid-line-following-simulation.mp4"></video><small>PID line-following simulation · working demonstration</small></div>`
  },
  workshop: {
    title: "Obstacle-Avoidance Rover",
    category: "HARDWARE / WORKSHOP",
    body: `<p>A hands-on rover built during a robotics workshop. The project combined an ESP32 microcontroller with motor control and ultrasonic sensing.</p>
      <h4>Hardware</h4><ul><li>ESP32 microcontroller</li><li>L298N motor driver</li><li>4 DC geared motors + wheels</li><li>HC-SR04 ultrasonic sensor</li><li>Rover chassis + battery holder</li></ul>
      <p>The project was an early practical step into combining sensing, embedded control and physical robotics.</p>`
  }
};

const modal = document.querySelector('#project-modal');
const modalContent = document.querySelector('#modal-content');
document.querySelectorAll('[data-project]').forEach(btn => {
  btn.addEventListener('click', () => {
    const p = projects[btn.dataset.project];
    modalContent.innerHTML = `<div class="eyebrow">${p.category}</div><h3>${p.title}</h3>${p.body}`;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  });
});
function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden','true');
  document.body.style.overflow = '';
}
document.querySelector('#project-modal .modal-close')?.addEventListener('click', closeModal);
document.querySelector('#project-modal .modal-backdrop')?.addEventListener('click', closeModal);
document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeModal(); closeArticleModal(); closeImageModal(); } });

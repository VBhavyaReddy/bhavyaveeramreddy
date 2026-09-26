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
  robotics: ["ROBOTICS", "I like the combination of electronics, control, software and physical movement — especially when a machine actually responds to the world around it."],
  aerospace: ["AEROSPACE", "Rovers, rockets, drones and spacecraft sit at a really fun intersection of physics and engineering. I'm interested in how we make machines work where the environment isn't forgiving."],
  physics: ["PHYSICS", "Astrophysics, particle physics, dark matter, accelerators — basically any question that starts with “but why does the universe do that?”"],
  vlsi: ["VLSI", "I'm interested in how complicated systems can be built from tiny electronic building blocks, and how hardware design connects to the software running on top of it."],
  music: ["MUSIC", "I play guitar, sing and write songs. Engineering brain off. Music brain on. (Sometimes both are on at the same time.)"]
};

document.querySelectorAll('.star').forEach(star => {
  star.addEventListener('click', () => {
    document.querySelectorAll('.star').forEach(s => s.classList.remove('active'));
    star.classList.add('active');
    const [title, text] = interestData[star.dataset.interest];
    document.querySelector('#interest-panel').innerHTML = `<span>✦ ${title}</span><p>${text}</p>`;
  });
});

const projects = {
  rover: {
    title: "Autonomous Rover",
    category: "ROBOTICS / COMPUTER VISION",
    body: `<p>A proposed autonomous navigation system where the rover first identifies a target class, searches its surroundings, then moves toward the target while using perception and distance sensing to stay safe.</p>
      <h4>System idea</h4>
      <ul><li>Camera → Raspberry Pi → OpenCV preprocessing → YOLO target detection</li><li>LiDAR provides distance information for navigation and obstacle awareness</li><li>Raspberry Pi sends movement decisions to an ESP32</li><li>ESP32 controls the motors through an L298N motor driver</li></ul>
      <h4>Key technologies</h4><p>Raspberry Pi · ESP32 · OpenCV · YOLO · LiDAR · L298N · Python/C++</p>`
  },
  coppelia: {
    title: "CoppeliaSim Rover",
    category: "SIMULATION / CONTROL",
    body: `<p>A simulated rover task focused on implementing PID line-following logic in C and integrating the controller with a CoppeliaSim environment.</p>
      <h4>What I explored</h4><ul><li>Reading sensor information from the simulated rover</li><li>Calculating error relative to the desired path</li><li>Using proportional, integral and derivative terms</li><li>Converting controller output into motor commands</li></ul>`
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
document.querySelector('.modal-close').addEventListener('click', closeModal);
document.querySelector('.modal-backdrop').addEventListener('click', closeModal);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

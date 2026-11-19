document.addEventListener('DOMContentLoaded', () => {
  /* =========================================
     1. EFEITO DE LANTERNA NO CURSOR
     ========================================= */
  const flashlight = document.getElementById('flashlight');
  window.addEventListener('mousemove', (e) => {
    flashlight.style.setProperty('--mouse-x', `${e.clientX}px`);
    flashlight.style.setProperty('--mouse-y', `${e.clientY}px`);
  });

  /* =========================================
     2. PARTÍCULAS DE POEIRA EM SUSPENSÃO (CANVAS)
     ========================================= */
  const canvas = document.getElementById('dust-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  class DustParticle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 1.8 + 0.4;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = -Math.random() * 0.35 - 0.1;
      this.alpha = Math.random() * 0.45 + 0.1;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.y < 0 || this.x < 0 || this.x > canvas.width) {
        this.reset();
        this.y = canvas.height;
      }
    }
    draw() {
      ctx.fillStyle = `rgba(216, 200, 168, ${this.alpha})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  for (let i = 0; i < 65; i++) {
    particles.push(new DustParticle());
  }

  function animateDust() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animateDust);
  }
  animateDust();

  /* =========================================
     3. CRONOLOGIA INTERATIVA (ESTÁGIOS DA ASSOMBRAÇÃO)
     ========================================= */
  const stagesData = {
    1: {
      title: 'Estágio I: Infestação',
      quote: '“Começa com passos no corredor, batidas nas paredes e o cheiro de carne podre.”',
      description:
        'A entidade testa os limites dos moradores da casa. Ruídos inexplicáveis surgem durante a madrugada e animais demonstram terror instintivo.',
      events: [
        'Todos os relógios param simultaneamente às 03:07 AM (horário da morte de Bathsheba).',
        'A cachorra Sadie recusa-se a entrar na residência e é encontrada morta no quintal.',
        'As meninas ouvem palmas vindas do porão durante a brincadeira de esconde-esconde.'
      ]
    },
    2: {
      title: 'Estágio II: Opressão',
      quote: '“A entidade escolhe o elo mais fraco da família para quebrar sua vontade física e mental.”',
      description:
        'Os fenômenos tornam-se físicos e agressivos. O objetivo do demônio é exaurir a vítima escolhida até que sua resistência espiritual entre em colapso.',
      events: [
        'Carolyn acorda diariamente com hematomas escuros espalhados pelos braços e pernas.',
        'Quadros caem das escadas e portas batem com violência sobrehumanas.',
        'Christine tem os pés puxados durante a noite por uma figura invisível.'
      ]
    },
    3: {
      title: 'Estágio III: Possessão',
      quote: '“Sem autorização formal da Igreja, Ed Warren realiza o rito de exorcismo no porão.”',
      description:
        'No estágio final, Bathsheba toma controle completo do corpo de Carolyn, tentando levá-la a sacrificar suas próprias filhas, repetindo a maldição de 1863.',
      events: [
        'Carolyn tenta fugir com April e Christine para o porão durante uma tempestade.',
        'Lorraine alcança a alma de Carolyn lembrando-a de uma memória feliz na praia.',
        'O demônio é expulso de volta ao inferno, libertando a família Perron.'
      ]
    }
  };

  const timelineContent = document.getElementById('timeline-content');
  const tabButtons = document.querySelectorAll('.tab-btn');

  function renderStage(stageKey) {
    const data = stagesData[stageKey];
    timelineContent.innerHTML = `
      <h3>${data.title}</h3>
      <span class="stage-quote">${data.quote}</span>
      <p>${data.description}</p>
      <ul>
        ${data.events.map((ev) => `<li>${ev}</li>`).join('')}
      </ul>
    `;
  }

  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      tabButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      renderStage(btn.dataset.stage);
    });
  });

  renderStage(1);

  /* =========================================
     4. MODAL DO MUSEU OCULTO DOS WARREN
     ========================================= */
  const artifactsData = {
    annabelle: {
      code: 'ARTEFATO #001 // CONTENÇÃO MÁXIMA',
      title: 'Boneca Annabelle',
      description:
        'Originalmente uma boneca Raggedy Ann dada a uma estudante de enfermagem em 1970. Não é possuída pelo espírito de uma menina, mas usada como condutor por uma entidade demoníaca inumana que buscava possuir um hospedeiro humano.',
      protocol: 'Protocolo: Trancada em caixa de vidro abençoada. Um padre abençoa o local duas vezes por mês.'
    },
    musicbox: {
      code: 'ARTEFATO #014 // CASO PERRON',
      title: 'Caixa de Música com Espelho',
      description:
        'Encontrada por April Perron nos terrenos da fazenda em Harrisville. Quando a manivela é girada e a melodia toca, o espelho reflete espíritos invisíveis a olho nu posicionados atrás de quem observa.',
      protocol: 'Protocolo: Manter o mecanismo travado. Proibido acionar a melodia.'
    },
    clock: {
      code: 'ARTEFATO #019 // CASO PERRON',
      title: 'Relógio de Pêndulo da Fazenda',
      description:
        'Pertencia aos antigos moradores da casa em Rhode Island. Mesmo após ter suas engrenagens reparadas, seus ponteiros sempre travavam exatamente às 03:07 da manhã em zombaria à Santíssima Trindade.',
      protocol: 'Protocolo: Mantido sem corda na sala de contenção.'
    },
    organ: {
      code: 'ARTEFATO #042 // REGISTRO SONORO',
      title: 'Órgão de Tubos',
      description:
        'Recuperado de uma residência assombrada onde acordes fúnebres eram ouvidos exatamente à meia-noite, mesmo com o instrumento completamente desconectado e trancado.',
      protocol: 'Protocolo: Isolado e selado com água benta.'
    }
  };

  const modal = document.getElementById('artifact-modal');
  const closeModalBtn = document.getElementById('close-modal');
  const modalBackdrop = document.querySelector('.modal-backdrop');

  document.querySelectorAll('.artifact-card').forEach((card) => {
    card.addEventListener('click', () => {
      const info = artifactsData[card.dataset.artifact];
      document.getElementById('modal-code').textContent = info.code;
      document.getElementById('modal-title').textContent = info.title;
      document.getElementById('modal-description').textContent = info.description;
      document.getElementById('modal-protocol').textContent = info.protocol;
      modal.classList.remove('hidden');
    });
  });

  function closeModal() {
    modal.classList.add('hidden');
  }
  closeModalBtn.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', closeModal);

  /* =========================================
     5. ÁUDIO AMBIENTE SOMBRIO (WEB AUDIO API)
     ========================================= */
  let audioCtx = null;
  let isPlayingAudio = false;
  let droneOsc1, droneOsc2, tickInterval;

  const audioToggle = document.getElementById('audio-toggle');
  const audioIcon = document.getElementById('audio-icon');

  function toggleAmbientAudio() {
    if (!isPlayingAudio) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();

      // Drone grave sombrio
      droneOsc1 = audioCtx.createOscillator();
      droneOsc2 = audioCtx.createOscillator();
      const masterGain = audioCtx.createGain();

      droneOsc1.type = 'sawtooth';
      droneOsc1.frequency.setValueAtTime(55, audioCtx.currentTime); // Lá grave

      droneOsc2.type = 'sine';
      droneOsc2.frequency.setValueAtTime(58.5, audioCtx.currentTime); // Batimento dissonante

      const filter = audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(140, audioCtx.currentTime);

      masterGain.gain.setValueAtTime(0.08, audioCtx.currentTime);

      droneOsc1.connect(filter);
      droneOsc2.connect(filter);
      filter.connect(masterGain);
      masterGain.connect(audioCtx.destination);

      droneOsc1.start();
      droneOsc2.start();

      // Tique-taque sutil de relógio a cada 1 segundo
      tickInterval = setInterval(() => {
        if (!audioCtx) return;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(800, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.03, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.05);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.05);
      }, 1000);

      isPlayingAudio = true;
      audioIcon.textContent = '🔊';
    } else {
      clearInterval(tickInterval);
      if (droneOsc1) droneOsc1.stop();
      if (droneOsc2) droneOsc2.stop();
      if (audioCtx) audioCtx.close();
      audioCtx = null;
      isPlayingAudio = false;
      audioIcon.textContent = '🔇';
    }
  }

  audioToggle.addEventListener('click', toggleAmbientAudio);

  /* =========================================
     6. EASTER EGG: 03:07 AM (DUAS PALMAS NO ESCURO)
     ========================================= */
  const clockTrigger = document.getElementById('clock-trigger');
  const clapOverlay = document.getElementById('clap-overlay');

  function playClapSound(delay = 0) {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const bufferSize = ctx.sampleRate * 0.15;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.025));
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1100;

    const gain = ctx.createGain();
    gain.gain.value = 0.6;

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(ctx.currentTime + delay);
  }

  clockTrigger.addEventListener('click', () => {
    clapOverlay.classList.remove('hidden');
    document.body.classList.add('shake-screen');

    playClapSound(0.3);
    playClapSound(0.85);

    setTimeout(() => {
      document.body.classList.remove('shake-screen');
    }, 500);

    setTimeout(() => {
      clapOverlay.classList.add('hidden');
    }, 3400);
  });
});
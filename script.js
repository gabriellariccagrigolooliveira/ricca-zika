// Banco de dados dos dossiês confidenciais
const dossiersData = {
  warrens: {
    code: "ARQUIVO #01 // INVESTIGADORES",
    stamp: "CONFIDENCIAL",
    title: "Ed & Lorraine Warren",
    paragraphs: [
      "Edward Warren Miney (1926–2006) foi o único demonologista leigo reconhecido pela Igreja Católica. Ao lado de sua esposa Lorraine (1927–2019), clarividente e médium de transe, fundou em 1952 a New England Society for Psychic Research (NESPR).",
      "Em 1971, ao investigarem a fazenda dos Perron, Lorraine imediatamente detectou uma presença maligna presa à propriedade — uma entidade que não apenas assombrava a casa, mas buscava destruir a matriarca da família.",
      "Os registros em fita magnética e fotografias coletados por Ed durante o caso de Harrisville permanecem entre os documentos mais perturbadores de seu acervo."
    ]
  },
  bathsheba: {
    code: "ARQUIVO #02 // ENTIDADE INUMANA",
    stamp: "PERIGO EXTREMO",
    title: "Bathsheba Sherman",
    paragraphs: [
      "Nascida em 1812 em Rhode Island, Bathsheba Thayer casou-se com Judson Sherman e viveu na propriedade que mais tarde pertenceria à família Perron.",
      "De acordo com a investigação histórica conduzida pelos Warren, Bathsheba praticava bruxaria e teria sacrificado seu próprio filho recém-nascido como oferenda ao demônio antes de tirar a própria vida em 1885, amaldiçoando qualquer pessoa que ousasse tomar suas terras.",
      "Seu espírito demoníaco concentra-se em possuir mães que vivem na casa, forçando-as a repetir o ato contra seus próprios filhos."
    ]
  },
  annabelle: {
    code: "ARQUIVO #03 // MUSEU DO OCULTO",
    stamp: "CONTIDA EM VIDRO BENTO",
    title: "A Boneca Annabelle",
    paragraphs: [
      "Antes de irem a Harrisville, os Warren investigaram o caso de duas enfermeiras atormentadas por uma boneca de pano Raggedy Ann que parecia se mover sozinha e deixar bilhetes manuscritos.",
      "Lorraine descobriu que a boneca nunca foi possuída pelo espírito de uma criança, mas sim manipulada como um conduíte por uma entidade inumana que buscava um hospedeiro humano.",
      "Hoje, a boneca permanece trancada em uma caixa de madeira e vidro abençoado no Museu do Oculto dos Warren, em Monroe, Connecticut, com o aviso: 'POSITIVAMENTE NÃO ABRA'."
    ]
  },
  musicbox: {
    code: "ARQUIVO #04 // OBJETO DE CONTATO",
    stamp: "EVIDÊNCIA REGISTRADA",
    title: "A Caixa de Música",
    paragraphs: [
      "Encontrada por April Perron nos terrenos da fazenda, a antiga caixa de música possui um pequeno espelho giratório que, quando acionado, revela reflexos de espíritos presos à propriedade.",
      "Quando a melodia termina abruptamente, uma presença se manifesta logo atrás de quem observa o espelho.",
      "O objeto foi recolhido por Ed e Lorraine Warren após o exorcismo em Harrisville para evitar novas aberturas de contato espiritual."
    ]
  }
};

// Controle do Modal de Dossiês
const modal = document.getElementById("dossier-modal");
const closeModalBtn = document.getElementById("close-modal");
const modalStamp = document.getElementById("modal-stamp");
const modalCode = document.getElementById("modal-code");
const modalTitle = document.getElementById("modal-title");
const modalBody = document.getElementById("modal-body");

document.querySelectorAll(".folder-card").forEach((card) => {
  card.addEventListener("click", () => {
    const key = card.getAttribute("data-dossier");
    const data = dossiersData[key];
    if (!data) return;

    modalStamp.textContent = data.stamp;
    modalCode.textContent = data.code;
    modalTitle.textContent = data.title;
    modalBody.innerHTML = data.paragraphs.map((p) => `<p>${p}</p>`).join("");

    modal.classList.remove("hidden");
  });
});

closeModalBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
  }
});

// Modo "Apagar Luzes" (Lanterna no cursor)
const btnLights = document.getElementById("btn-lights");
const overlay = document.getElementById("flashlight-overlay");

btnLights.addEventListener("click", () => {
  document.body.classList.toggle("lights-off");
  const isDark = document.body.classList.contains("lights-off");
  btnLights.textContent = isDark ? "💡 Acender Luzes" : "🔦 Apagar Luzes";
});

window.addEventListener("mousemove", (e) => {
  overlay.style.setProperty("--x", `${e.clientX}px`);
  overlay.style.setProperty("--y", `${e.clientY}px`);
});

window.addEventListener("touchmove", (e) => {
  if (e.touches.length > 0) {
    overlay.style.setProperty("--x", `${e.touches[0].clientX}px`);
    overlay.style.setProperty("--y", `${e.touches[0].clientY}px`);
  }
});

// Sintetizador de Áudio (Web Audio API — sem precisar baixar MP3)
let audioCtx = null;
let ambientOsc = null;
let isAmbientOn = false;

function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
}

// Som ambiente sombrio (Drone grave)
const btnAudio = document.getElementById("btn-audio");

btnAudio.addEventListener("click", () => {
  initAudio();

  if (!isAmbientOn) {
    const osc1 = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc1.type = "sawtooth";
    osc1.frequency.value = 48; // Frequência grave sombria

    osc2.type = "sine";
    osc2.frequency.value = 51; // Batimento binaural inquietante

    const filter = audioCtx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 140;

    gain.gain.value = 0.08;

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);

    osc1.start();
    osc2.start();

    ambientOsc = { osc1, osc2 };
    isAmbientOn = true;
    btnAudio.textContent = "🔊 Áudio: ON";
  } else {
    if (ambientOsc) {
      ambientOsc.osc1.stop();
      ambientOsc.osc2.stop();
      ambientOsc = null;
    }
    isAmbientOn = false;
    btnAudio.textContent = "🔇 Áudio: OFF";
  }
});

// Efeito sonoro das "Duas Palmas na Escuridão"
function triggerClapSound(delay = 0) {
  initAudio();
  const now = audioCtx.currentTime + delay;

  const bufferSize = audioCtx.sampleRate * 0.15;
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (audioCtx.sampleRate * 0.025));
  }

  const noise = audioCtx.createBufferSource();
  noise.buffer = buffer;

  const filter = audioCtx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = 1100;
  filter.Q.value = 1.2;

  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(0.6, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(audioCtx.destination);

  noise.start(now);
}

const btnClaps = document.getElementById("btn-claps");

btnClaps.addEventListener("click", () => {
  triggerClapSound(0);
  triggerClapSound(0.28);

  document.body.classList.remove("clap-flash");
  void document.body.offsetWidth; // Reinicia animação
  document.body.classList.add("clap-flash");
});
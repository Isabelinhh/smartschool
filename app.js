// ==============================
//   SMART SCHOOL — app.js
// ==============================

/**
 * Navega entre telas (sempre fullscreen, uma por vez)
 */
function goTo(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(screenId);
  if (target) {
    target.classList.add('active');
    // Volta ao topo do scroll-content
    const sc = target.querySelector('.scroll-content');
    if (sc) sc.scrollTop = 0;
    window.scrollTo(0, 0);
  }
}

/**
 * Alterna aba Pendentes / Concluídas
 */
function switchTab(tab) {
  document.getElementById('tab-pendentes').classList.toggle('active', tab === 'pendentes');
  document.getElementById('tab-concluidas').classList.toggle('active', tab === 'concluidas');
  document.getElementById('lista-pendentes').classList.toggle('hidden', tab !== 'pendentes');
  document.getElementById('lista-concluidas').classList.toggle('hidden', tab !== 'concluidas');
}

/**
 * Toggle visibilidade da senha
 */
document.querySelector('.toggle-password')?.addEventListener('click', function () {
  const input = document.getElementById('login-senha');
  const isPass = input.type === 'password';
  input.type = isPass ? 'text' : 'password';
  this.classList.toggle('fa-eye', !isPass);
  this.classList.toggle('fa-eye-slash', isPass);
});

/**
 * Botão Entrar — shake se campos vazios, senão navega
 */
document.getElementById('btn-entrar')?.addEventListener('click', function (e) {
  e.stopPropagation();
  const email = document.getElementById('login-email').value.trim();
  const senha = document.getElementById('login-senha').value.trim();

  if (!email || !senha) {
    const card = document.querySelector('.login-card');
    card.style.animation = 'none';
    void card.offsetHeight;
    card.style.animation = 'shake 0.4s ease';
    return;
  }

  goTo('screen-painel');
});

/**
 * Botão Enviar Tarefa — feedback visual
 */
document.querySelector('.btn-enviar')?.addEventListener('click', function () {
  if (this.disabled) return;
  const original = this.textContent;
  this.textContent = '✓ Enviado!';
  this.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
  this.style.boxShadow = '0 6px 20px rgba(34,197,94,0.4)';
  this.disabled = true;

  setTimeout(() => {
    this.textContent = original;
    this.style.background = '';
    this.style.boxShadow = '';
    this.disabled = false;
  }, 2500);
});

/**
 * Animação de entrada dos cards ao trocar de tela
 */
function animateIn(screenEl) {
  const items = screenEl.querySelectorAll(
    '.task-card, .task-item, .material-item, .date-card, .detail-card, .subject-badge'
  );
  items.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = `opacity 0.3s ease ${i * 0.06}s, transform 0.3s ease ${i * 0.06}s`;
    requestAnimationFrame(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  });
}

// Observa mudanças de tela ativa para disparar animação
const observer = new MutationObserver(mutations => {
  mutations.forEach(m => {
    if (m.target.classList.contains('active') && m.type === 'attributes') {
      animateIn(m.target);
    }
  });
});

document.querySelectorAll('.screen').forEach(s => {
  observer.observe(s, { attributes: true, attributeFilter: ['class'] });
});

/**
 * Init
 */
document.addEventListener('DOMContentLoaded', () => {
  // Garante que começa no login
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('screen-login').classList.add('active');
  animateIn(document.getElementById('screen-login'));
});

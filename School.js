function entrar() {
  document.getElementById('login').classList.remove('active');
  document.getElementById('home').classList.add('active');
}

function trocarTela(tela) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(tela).classList.add('active');
}

const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
menuToggle.addEventListener('click', () => {
  nav.classList.toggle('open');
  menuToggle.textContent = nav.classList.contains('open') ? '×' : '☰';
});
document.querySelectorAll('.nav a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open'); menuToggle.textContent = '☰';
}));

// Animação de entrada conforme os elementos aparecem na tela.
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Filtros da vitrine de produtos.
document.querySelectorAll('.filter').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(b => b.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    document.querySelectorAll('.product-card').forEach(card => {
      card.classList.toggle('hidden', filter !== 'todos' && card.dataset.category !== filter);
    });
  });
});

// Cada produto abre uma conversa com o nome da ideia já preenchido.
document.querySelectorAll('.quote-product').forEach(button => {
  button.addEventListener('click', () => {
    const product = button.dataset.product;
    const message = `Olá, Craft Art 3D! Tenho interesse em: ${product}. Gostaria de saber os modelos, cores e valores.`;
    window.open(`https://wa.me/5519977690904?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
  });
});

document.querySelectorAll('[data-service]').forEach(link => {
  link.addEventListener('click', () => {
    const message = `Olá, Craft Art 3D! Tenho interesse em ${link.dataset.service}. Podemos conversar?`;
    link.href = `https://wa.me/5519977690904?text=${encodeURIComponent(message)}`;
    link.target = '_blank';
  });
});

// Barra de progresso da página e destaque do ano.
const progress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
});
document.getElementById('year').textContent = new Date().getFullYear();

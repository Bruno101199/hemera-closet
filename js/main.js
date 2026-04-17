// ===== HEADER SCROLL =====
const header = document.querySelector('.header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// ===== HERO ANIMATION ON LOAD =====
window.addEventListener('load', () => {
  const tagline  = document.querySelector('.hero-tagline');
  const subtitle = document.querySelector('.hero-subtitle');
  if (tagline)  tagline.classList.add('visible');
  if (subtitle) subtitle.classList.add('visible');
});

// ===== FADE UP ANIMATION ON SCROLL =====
const fadeEls = document.querySelectorAll('.fade-up');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(el => {
    if (el.isIntersecting) {
      el.target.classList.add('visible');
      observer.unobserve(el.target);
    }
  });
}, { threshold: 0.12 });

fadeEls.forEach(el => observer.observe(el));

// ===== CATEGORY FILTER =====
const categoryPills = document.querySelectorAll('.category-pill');
const productCards  = document.querySelectorAll('.product-card');

categoryPills.forEach(pill => {
  pill.addEventListener('click', () => {
    categoryPills.forEach(p => p.classList.remove('active'));
    pill.classList.add('active');

    const cat = pill.dataset.cat;

    productCards.forEach(card => {
      if (cat === 'todos' || card.dataset.cat === cat) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// ===== BENEFITS CAROUSEL =====
const track   = document.querySelector('.carousel-track');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
const dots    = document.querySelectorAll('.carousel-dot');

if (track) {
  let currentIndex = 0;
  const cards = track.querySelectorAll('.benefit-card');
  const cardWidth = 300 + 24; // width + gap

  function getVisibleCount() {
    return Math.floor((window.innerWidth - 80) / cardWidth);
  }

  function maxIndex() {
    return Math.max(0, cards.length - getVisibleCount());
  }

  function goTo(index) {
    currentIndex = Math.max(0, Math.min(index, maxIndex()));
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
  }

  if (nextBtn) nextBtn.addEventListener('click', () => goTo(currentIndex + 1));
  if (prevBtn) prevBtn.addEventListener('click', () => goTo(currentIndex - 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

  // Auto-advance
  setInterval(() => goTo((currentIndex + 1) % (maxIndex() + 1)), 4200);

  goTo(0);
}

// ===== PRODUCT PAGE: SIZE SELECTOR =====
const sizeButtons = document.querySelectorAll('.size-btn');
sizeButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    sizeButtons.forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
  });
});

// ===== ADD TO CART =====
const cartBtnEl   = document.querySelector('.btn-cart');
const cartCountEl = document.querySelector('.cart-count');
let cartItems = 0;

if (cartBtnEl) {
  cartBtnEl.addEventListener('click', () => {
    const selectedSize = document.querySelector('.size-btn.selected');
    if (!selectedSize) {
      alert('Por favor, selecione um tamanho antes de adicionar ao carrinho.');
      return;
    }
    cartItems++;
    if (cartCountEl) cartCountEl.textContent = cartItems;

    const original = cartBtnEl.textContent;
    cartBtnEl.textContent = '✓ ADICIONADO';
    cartBtnEl.style.background = '#2d6a4f';
    cartBtnEl.style.color = '#fff';
    setTimeout(() => {
      cartBtnEl.textContent = original;
      cartBtnEl.style.background = '';
      cartBtnEl.style.color = '';
    }, 2200);
  });
}

// ===== BUY NOW (redirect to WhatsApp) =====
const buyBtnEl = document.querySelector('.btn-buy');
if (buyBtnEl) {
  buyBtnEl.addEventListener('click', () => {
    const selectedSize = document.querySelector('.size-btn.selected');
    const title = document.querySelector('.product-title');
    const price = document.querySelector('.price-main');

    if (!selectedSize) {
      alert('Por favor, selecione um tamanho antes de comprar.');
      return;
    }

    const productName = title ? title.innerText.replace('\n', ' ') : 'produto';
    const productPrice = price ? price.textContent : '';
    const sizeName = selectedSize.textContent;
    const msg = encodeURIComponent(
      `Olá! Gostaria de comprar: *${productName}* — Tamanho: ${sizeName} — ${productPrice}. Vi no site da Hemera Closet.`
    );
    window.open(`https://wa.me/5548988474654?text=${msg}`, '_blank');
  });
}

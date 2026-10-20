// app.js

// Auth Logic
const USER_KEY = 'ensilados_user';
const SESSION_KEY = 'ensilados_session';

function registerUser(name, email, password) {
  const user = { name, email, password };
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  loginUser(email, password);
}

function loginUser(email, password) {
  const storedUserStr = localStorage.getItem(USER_KEY);
  if (storedUserStr) {
    const storedUser = JSON.parse(storedUserStr);
    if (storedUser.email === email && storedUser.password === password) {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(storedUser));
      return true;
    }
  }
  // Hardcoded fallback for demonstration
  if(email === 'usuario@email.com' && password === '12345678') {
      const demoUser = {name: 'Juan Pérez', email: 'usuario@email.com', isPremium: true};
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(demoUser));
      return true;
  }
  return false;
}

window.logoutUser = function() {
  sessionStorage.removeItem(SESSION_KEY);
  window.location.href = 'login.html';
}

function getCurrentUser() {
  const sessionStr = sessionStorage.getItem(SESSION_KEY);
  if (sessionStr) {
    return JSON.parse(sessionStr);
  }
  return null;
}

// UI State Updates
document.addEventListener('DOMContentLoaded', () => {
  const user = getCurrentUser();
  updateAuthUI(user);
  setupAuthForms();
  setupCartLogic();
  setupQuoteLogic();
});

function updateAuthUI(user) {
  const loginLink = document.getElementById('login-nav-link');
  const userDropdown = document.getElementById('user-nav-dropdown');
  const userNameEl = document.getElementById('auth-user-name');
  
  if (user) {
    if (loginLink) loginLink.style.display = 'none';
    if (userDropdown) {
        userDropdown.classList.remove('hidden');
        userDropdown.style.display = 'block';
        if (userNameEl) userNameEl.textContent = user.name;
    }
  } else {
    if (loginLink) loginLink.style.display = 'flex';
    if (userDropdown) {
        userDropdown.classList.add('hidden');
        userDropdown.style.display = 'none';
    }
  }
}

function setupAuthForms() {
  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('reg-name').value;
      const email = document.getElementById('reg-email').value;
      const pass = document.getElementById('reg-pass').value;
      registerUser(name, email, pass);
      window.location.href = 'pedidos.html';
    });
  }

  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value;
      const pass = document.getElementById('login-pass').value;
      if (loginUser(email, pass)) {
        window.location.href = 'pedidos.html';
      } else {
        alert('Credenciales incorrectas. Para prueba rápida usa: usuario@email.com / 12345678');
      }
    });
  }
}

// Cart Logic
let cart = { product1: 2, product2: 0 };
const prices = { product1: 1450, product2: 1200 };
const baseShipping = 350;

function setupCartLogic() {
  if (!document.getElementById('pedidos-container')) return;

  const updateUI = () => {
    document.getElementById('qty-p1').textContent = cart.product1;
    document.getElementById('qty-p2').textContent = cart.product2;
    
    let subtotal = (cart.product1 * prices.product1) + (cart.product2 * prices.product2);
    let totalTons = cart.product1 + cart.product2;
    let shipping = totalTons > 0 ? baseShipping : 0;
    
    document.getElementById('subtotal-tons').textContent = `Subtotal (${totalTons} Ton)`;
    document.getElementById('subtotal-price').textContent = `$${subtotal.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
    document.getElementById('shipping-price').textContent = `$${shipping.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
    
    let total = subtotal + shipping;
    document.getElementById('total-price').textContent = `$${total.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
  };

  // Bind Buttons Product 1
  document.getElementById('btn-add-p1').addEventListener('click', () => { cart.product1++; updateUI(); });
  document.getElementById('btn-rm-p1').addEventListener('click', () => { if(cart.product1 > 0) cart.product1--; updateUI(); });
  
  // Bind Buttons Product 2
  document.getElementById('btn-add-p2').addEventListener('click', () => { cart.product2++; updateUI(); });
  document.getElementById('btn-rm-p2').addEventListener('click', () => { if(cart.product2 > 0) cart.product2--; updateUI(); });

  // Checkout
  document.getElementById('btn-checkout').addEventListener('click', () => {
    let totalTons = cart.product1 + cart.product2;
    if (totalTons === 0) {
      alert('Tu carrito está vacío. Agrega al menos 1 tonelada de producto.');
      return;
    }
    
    const address = document.getElementById('checkout-address').value;
    if (!address) {
      alert('Por favor provee una dirección de entrega válida.');
      return;
    }

    alert(`¡Pedido procesado con éxito para enviar a: ${address}!\nRecibirás un correo con la guía de remisión.`);
    cart = { product1: 0, product2: 0 };
    updateUI();
  });
  
  updateUI();
}

// Quote Logic
function setupQuoteLogic() {
  const btnAnalyze = document.getElementById('btn-analyze');
  if (!btnAnalyze) return;

  btnAnalyze.addEventListener('click', () => {
    const loc = document.getElementById('quote-loc').value;
    const tons = parseInt(document.getElementById('quote-tons').value) || 0;
    
    if (!loc || tons <= 0) {
      alert('Por favor inserta una ubicación válida y toneladas (mayor a 0) para realizar el cálculo.');
      return;
    }
    
    // Simulate API call delay with random result
    const distanceKm = Math.floor(Math.random() * 800) + 50; 
    const cost = Math.floor((distanceKm * 0.8 * tons) + baseShipping).toLocaleString('en-US', {minimumFractionDigits:2});
    
    alert(`🗺️ Carga Analizada hacia: ${loc}\n📍 Distancia Estimada: ${distanceKm} km\n💲 Costo Aproximado de Envío: $${cost} MXN`);
  });
}

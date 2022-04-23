'use strict';

const basketCounterEl = document.querySelector('.cartIconWrap span');
const basketTotalEl = document.querySelector('.basketTotal');
const basketTotalValueEl = document.querySelector('.basketTotalValue');
const basketEl = document.querySelector('.basket');
const basket = {};

//show basket
document.querySelector('.cartIconWrap').addEventListener('click', () => {
    basketEl.classList.toggle('hidden');
  });
//event for button
document.querySelector('.featuredItems').addEventListener('click', event => {
    if (!event.target.closest('.addToCart')) {
      return;
    }
    const featuredItemEl = event.target.closest('.featuredItem');
    const id = Number(featuredItemEl.dataset.id);
    const name = featuredItemEl.dataset.name;
    const price = Number(featuredItemEl.dataset.price);
    
    addToCart(id, name, price);
  });


  function addToCart(id, name, price) {
  if (!(id in basket)) {
    basket[id] = {id: id, name: name, price: price, count: 0};
  }
  
  basket[id].count++;
  basketCounterEl.textContent = getCountBasket().toString();
  basketTotalValueEl.textContent = getPriceBasket();
  addProduct(id);
  }


function getCountBasket() {
    return Object.values(basket).reduce(function(sum, product) {
        return sum + product.count; 
    }, 0);
  }
  
  function getPriceBasket() {
    return Object.values(basket).reduce(function(sum, product) {
        return sum + product.price * product.count; 
    }, 0);
  }
  
  function addProduct(productId) {
    const basketRowEl = basketEl.querySelector(`.basketRow[data-id="${productId}"]`);
    if (!basketRowEl) {
        addRowForBasket(productId);
      return;
    }
    const product = basket[productId];
    basketRowEl.querySelector('.productCount').textContent = product.count;
    basketRowEl.querySelector('.productTotalRow').textContent = (product.price * product.count);
  }

  function addRowForBasket(productId) {
    const productRow = `
      <div class="basketRow" data-id="${productId}">
        <div>${basket[productId].name}</div>
        <div>
          <span class="productCount">${basket[productId].count}</span> шт.
        </div>
        <div>$${basket[productId].price}</div>
        <div>
          $<span class="productTotalRow">${(basket[productId].price * basket[productId].count)}</span>
        </div>
      </div>
      `;
    basketTotalEl.insertAdjacentHTML("beforebegin", productRow);
  }
  
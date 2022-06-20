'use strict';

const modeButton = document.querySelectorAll('.mode_button');
const mode = document.querySelectorAll('.mode');
const tabTop = document.getElementsByClassName('top_tab');
const tabBottom = document.querySelectorAll('.bottom_tab');
const tabs = document.getElementsByClassName('leftPage_tab');
const containerMovements = document.querySelector('.movements');
const tabsMovements = document.getElementById('leftTab');
const areaProduct = document.getElementsByClassName('Product');
const areaQuantity = document.getElementsByClassName('Quantity');
const areaTotal = document.getElementsByClassName('Total');
const menuPage = document.getElementById('menu');
const inputProductName = document.querySelector('.input.input_Product');
const inputProductPrice = document.querySelector('.input.input_Price');
const btnCloseAdd = document.querySelector('.close_add');
const add = document.querySelector('.add');
const ordersNum = document.querySelector('.orders');
const itemsNum = document.querySelector('.items');
const subTotalNum = document.querySelector('.subTotal');
const taxNum = document.querySelector('.tax');
const totalNum = document.querySelector('.total');
const btnPay = document.querySelector('.pay');
const btnHold = document.querySelector('.hold');
const btnCard = document.querySelector('.Card.select__item');
const btnCash = document.querySelector('.Cash.select__item');
const payTab = document.querySelector('.payTab');
const btnPaid = document.querySelector('.Paid_btn');
const totalTab = document.querySelector('.total_payTab');
const inputAmount = document.querySelector('.input.input_Amount');
const btnCloseInputAmount = document.querySelector('.close_inputAmount_btn');
const amountText = document.querySelector('.amountText');

let orderNum = 1;
let tabPosition = -1;

const products = [];
Array.from(tabs).forEach((e, i) => {
  const productName = tabTop[i].innerHTML;
  const productPrice = Number(tabBottom[i].innerHTML).toFixed(2);
  const productTmp = {
    name: productName,
    quantity: 1,
    price: Number(productPrice),
    total: Number(productPrice),
  };
  products.push(productTmp);
  if (i == tabTop.length - 1) return;
  const html = `<div class="row">s
               <div class="Product Area col-md-3">
               ${productName}
            </div>
            <div class="Quantity Area col-md-3">
              ${1}
            </div>
            <div class="Area col-md-3">
              ${productPrice}
            </div>
            <div class="Total Area col-md-1.5">
              ${productPrice}
            </div>
            </div>`;
  containerMovements.insertAdjacentHTML('beforeend', html);
});
console.log(products);
// Controlling the mode button (top button, switching);
modeButton.forEach((e, i) => {
  modeButton[i].addEventListener('click', function () {
    mode.forEach(element => {
      element.classList.add('hidden');
    });
    modeButton.forEach(element => {
      element.classList.remove('active');
    });

    mode[i].classList.remove('hidden');
    modeButton[i].classList.add('active');
  });
});

function addTab() {
  const productName = inputProductName.value;
  const productPrice = Number(inputProductPrice.value).toFixed(2);
  console.log(inputProductName.value);
  console.log(productPrice);
  const tab = document.getElementById('leftTab');
  const button = document.createElement('button');
  const children1 = document.createElement('div');
  const children2 = document.createElement('div');
  button.className = 'leftPage_tab';
  children1.className = 'top_tab';
  children1.innerHTML = productName;
  children2.className = 'bottom_tab';
  children2.innerHTML = productPrice;
  button.appendChild(children1);
  button.appendChild(children2);
  const plus = tab.removeChild(tabs[tabs.length - 1]);
  tab.appendChild(button);
  tab.appendChild(plus);
  console.log(tabsMovements.children.length);
  add.classList.add('hidden');
}

tabs[tabs.length - 1].addEventListener('click', function (e) {
  console.log('PLUS');
  add.classList.remove('hidden');
  btnCloseAdd.addEventListener('click', addTab, true);
  inputProductName.value = '';
  inputProductPrice.value = '';
});
btnCloseAdd.removeEventListener('click', addTab, false);

let numOfItems = 0;
let subTotal = 0;
let tax = 0;
let total = 0;
function displayTotal() {
  products.forEach(product => {
    numOfItems += product.quantity;
    subTotal += product.price * product.quantity;
    tax = subTotal * 0.0825;
    total = subTotal + tax;
  });
  ordersNum.innerHTML = `Order #${orderNum}`;
  itemsNum.innerHTML = `Items: ${numOfItems - 1}`;
  subTotalNum.innerHTML = `SubTotal: ${String(subTotal.toFixed(2))}`;
  taxNum.innerHTML = `Tax: ${String(tax.toFixed(2))}`;
  totalNum.innerHTML = `Total: ${String(total.toFixed(2))}`;
}

$(tabs).on('click', takeE);
displayTotal();
function takeE() {
  window.onclick = e => {
    e.preventDefault();
    const productName = e.target.parentNode.children[0].innerHTML;
    const productPrice = Number(
      e.target.parentNode.children[1].innerHTML
    ).toFixed(2);
    console.log(products);
    // Plus
    if (
      productName === '<br><br>+' ||
      !e.target.parentNode.matches('.leftPage_tab')
    ) {
      console.log('plusE');
      return;
    } else if (products.find(e => e.name === productName)) {
      // Area
      let productPosition = 0;
      products.forEach((e, i) => {
        if (e.name === productName) {
          productPosition = i;
        }
      });
      areaQuantity[productPosition].innerHTML = ++products[productPosition]
        .quantity;
      areaTotal[productPosition].innerHTML = (
        products[productPosition].quantity * products[productPosition].price
      ).toFixed(2);
      displayTotal();
    } else {
      const productTmp = {
        name: productName,
        quantity: 1,
        price: Number(productPrice),
        total: Number(productPrice),
      };
      products.splice(products.length - 1, 0, productTmp);
      const html = `<div class="row">
                     <div class="Product Area col-md-3">
                     ${productName}
                  </div>
                  <div class="Quantity Area col-md-3">
                    ${1}
                  </div>
                  <div class="Area col-md-3">
                    ${productPrice}
                  </div>
                  <div class="Total Area col-md-2">
                    ${productPrice}
                  </div>
                  </div>`;
      containerMovements.insertAdjacentHTML('beforeend', html);
      displayTotal();
    }
  };
}

let keysPressed = {};
document.addEventListener('keydown', e => {
  keysPressed[e.key] = true;

  if (keysPressed['Control'] && e.key == 'z') {
    const tab = document.getElementById('leftTab');
    tab.removeChild(tabs[tabs.length - 2]);
  } else if (keysPressed['Control'] && e.key == 'x') {
    products.splice(products.length - 2, 1);
    containerMovements.removeChild(
      containerMovements.childNodes[containerMovements.childNodes.length - 1]
    );
    console.log(products);
    displayTotal();
  }
});

document.addEventListener('keyup', e => {
  keysPressed[e.key] = false;
});

// Pay button
btnPay.addEventListener('click', e => {
  e.preventDefault();
  payTab.classList.remove('hidden');
});

btnCard.addEventListener('click', e => {
  btnCard.classList.add('hidden');
  btnCash.classList.add('hidden');
  btnPaid.classList.remove('hidden');
  totalTab.classList.remove('hidden');
  totalTab.innerHTML = `$${total.toFixed(2)}`;
});

btnCash.addEventListener('click', e => {
  btnCard.classList.add('hidden');
  btnCash.classList.add('hidden');
  amountText.classList.remove('hidden');
  inputAmount.classList.remove('hidden');
  btnCloseInputAmount.classList.remove('hidden');
});
btnPaid.addEventListener('click', e => {
  payTab.classList.add('hidden');
  btnCard.classList.remove('hidden');
  btnCash.classList.remove('hidden');
  btnPaid.classList.add('hidden');
  totalTab.classList.add('hidden');
  products.forEach((e, i, arr) => {});
});

btnCloseInputAmount.addEventListener('click', e => {
  totalTab.classList.remove('hidden');
  const change = inputAmount.value;
  totalTab.innerHTML = `$${String(
    Number(Number(total).toFixed(2) - change).toFixed(2)
  )}`;
  inputAmount.value = '';
  inputAmount.classList.add('hidden');
  btnPaid.classList.remove('hidden');
  amountText.classList.add('hidden');
  inputAmount.classList.add('hidden');
  btnCloseInputAmount.classList.add('hidden');
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !payTab.classList.contains('hidden')) {
    payTab.classList.add('hidden');
  }
  if (e.key === 'Escape' && !add.classList.contains('hidden')) {
    add.classList.add('hidden');
  }
});

// Hold button
btnHold.addEventListener('click', e => {
  e.preventDefault();
  console.log('Hi');
});

// const displayMovements = function (movements, sort = false) {
//   containerMovements.innerHTML = '';

//   const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

//   movs.forEach(function (mov, i) {
//     const type = mov > 0 ? 'deposit' : 'withdrawal';

//     const html = `
//       <div class="movements__row">
//         <div class="movements__type movements__type--${type}">${
//       i + 1
//     } ${type}</div>
//         <div class="movements__value">${mov}€</div>
//       </div>
//     `;

//     containerMovements.insertAdjacentHTML('afterbegin', html);
//   });
// };

//Tabs
//     tabsMovements.addEventListener('click', function (e)
//     {
//      console.log(tabs.length);
//      const tab = e.target;
//     $(tab).on('click', function(e)
//     {
//       e.preventDefault();
//       const Product = tab.children[0].innerHTML;
//       console.log(tab.children[0].innerHTML);
//       if ( tab.children[0].innerHTML === "<br><br>+")
//       {
//         // Tabs
//         console.log('PLUS');
//         add.classList.remove('hidden');
//         btnCloseAdd.addEventListener('click', addTab,true);
//         inputProductName.value = '';
//         inputProductPrice.value = '';
//         console.log(tabs.length);
//       }
//       else if (arr.some((e,i,arr) => arr[i][0] === Product))
//       {
//         // Area
//           console.log(areaQuantity);
//           console.log(tabs);
//           console.log(arr);
//           // console.log(arr[i][2]);
//           // areaQuantity[arr[i][2]].innerHTML = ++arr[i][1];
//       }
//       else
//       {
//         // Area
//           // arr.splice(arr.length - 1, 0, [tabs[i].innerHTML, 1, order]);
//           const html = `<div class="row">
//                <div class="Product Area col-md-3">
//                ${tab.children[0].innerHTML}
//             </div>
//             <div class="Quantity Area col-md-3">
//               ${1}
//             </div>
//             <div class="Area col-md-3">
//               ${tab.children[1].innerHTML}
//             </div>
//             <div class="Area col-md-2">
//               ${12}
//             </div>
//             </div>`;
//             containerMovements.insertAdjacentHTML('beforeend', html);
//       }
//       console.log("out");
//     })
//   });
//  btnCloseAdd.removeEventListener('click', addTab,false);

// tabs[tabs.length - 1].addEventListener('click', () => {
//   const tab = document.getElementById('leftTab');
//   const button = document.createElement('button');
//   const children1 = document.createElement('div');
//   const children2 = document.createElement('div');
//   button.className = "leftPage_tab";
//   children1.className = "top_tab";
//   children1.innerHTML = "Strawberry";
//   children2.className = "bottom_tab";
//   children2.innerHTML = "12000";
//   button.appendChild(children1);
//   button.appendChild(children2);
//   const plus = tab.removeChild(tabs[tabs.length - 1]);
//   tab.appendChild(button);
//   tab.appendChild(plus);
//   console.log("plus");
// })

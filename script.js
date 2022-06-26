'use strict';

const modeButton = document.querySelectorAll('.mode_button');
const mode = document.querySelectorAll('.mode');
const tabTop = document.getElementsByClassName('top_tab');
const tabBottom = document.querySelectorAll('.bottom_tab');
const tabs = document.getElementsByClassName('leftPage_tab');
const containerMovements = document.querySelector('.movements');
const tabsMenu = document.getElementById('leftTabMenu');
const areaProduct = document.getElementsByClassName('Product');
const areaQuantity = document.getElementsByClassName('Quantity');
const areaTotal = document.getElementsByClassName('Total');
const menuPage = document.getElementById('menu');
const inputProductName = document.querySelector('.input.input_Product');
const inputProductPrice = document.querySelector('.input.input_Price');
const btnCloseAdd = document.querySelector('.close_add');
const add = document.querySelector('.add');
const displayOrdersNum = document.querySelector('.displayOrders');
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
const rowsProducts = document.getElementsByClassName('row PQET');
console.log(rowsProducts);
// hold button
const leftPageTabOrders = document.getElementsByClassName(
  'orders_leftPage_tab'
);
const leftTabOrders = document.getElementById('leftTabOrders');
const ordersTopTab = document.getElementsByClassName('orders_top_tab');
const ordersBottomTab = document.getElementsByClassName('orders_bottom_tab');

// history button 
const movementsRowsHistory = document.getElementsByClassName(
  'rows.movements__row_history'
);
const movementsHistory = document.getElementById(
  'movements_history'
);
let orderNum = 1;
let tabPosition = -1;
const historyStorage = [];
const products = [];
const ordersHolder = [];
// Menu functions
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
  const html = `<div class="row PQET">
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
  if (
    Array.from(tabTop).find(
      e => e.innerHTML.toLowerCase() === productName.toLowerCase()
    )
  ) {
    alert('Duplicate Tab not allowed');
    add.classList.add('hidden');
    return;
  }
  console.log(inputProductName.value);
  console.log(productPrice);
  const tab = document.getElementById('leftTabMenu');
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
  console.log(tab);
  const plus = tab.removeChild(tabs[tabs.length - 1]);
  tab.appendChild(button);
  tab.appendChild(plus);
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
  console.log(products);
  numOfItems = 0;
  subTotal = 0;
  tax = 0;
  total = 0;
  products.forEach(product => {
    numOfItems += product.quantity;
    subTotal += product.price * product.quantity;
    tax = subTotal * 0.0825;
    total = subTotal + tax;
  });
  displayOrdersNum.innerHTML = `Order #${orderNum}`;
  itemsNum.innerHTML = `Items: ${numOfItems - 1}`;
  subTotalNum.innerHTML = `SubTotal: ${String(subTotal.toFixed(2))}`;
  taxNum.innerHTML = `Tax: ${String(tax.toFixed(2))}`;
  totalNum.innerHTML = `Total: ${String(total.toFixed(2))}`;
}
displayTotal();
window.addEventListener('click', function (e) {
  e.preventDefault();
  const productName = e.target.parentNode.children[0].innerHTML;
  const productPrice = Number(
    e.target.parentNode.children[1].innerHTML
  ).toFixed(2);
  // Plus
  if (
    productName === '<br><br>+' ||
    !e.target.parentNode.matches('.leftPage_tab')
  ) {
    console.log('plusE');
    return;
  } else if (
    products.find(e => e.name.toLowerCase() === productName.toLowerCase())
  ) {
    // Area
    const product = products.find(
      e => e.name.toLowerCase() === productName.toLowerCase()
    );
    let productPosition = 0;
    console.log(areaProduct);
    Array.from(areaProduct).forEach((e, i) => {
      if (e.innerHTML.trim() === productName) {
        productPosition = i;
        console.log(i);
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
    const html = `<div class="row PQET">
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
    displayTotal();
  }
});

const restoreDeleteTab = [];
const restoreDeleteItemsMovements = [];
const restoreDeleteProducts = [];
let keysPressed = {};
document.addEventListener('keydown', e => {
  keysPressed[e.key] = true;

  if (keysPressed['Control'] && e.key == 'z') {
    if (tabs.length == 1) return;
    restoreDeleteTab.push(tabs[tabs.length - 2]);
    tabsMenu.removeChild(tabs[tabs.length - 2]);
    console.log(restoreDeleteTab);
  } else if (keysPressed['Control'] && e.key == 'x') {
    if (containerMovements.childNodes.length == 0 || products.length == 1)
      return;
    if (restoreDeleteProducts.find(e => e.ordersNum === orderNum)){
        restoreDeleteProducts.forEach( e => {
          if (e.ordersNum === orderNum){
            e.productsDeleted.push(products.at(-2));
          }
        });
         restoreDeleteItemsMovements.forEach( e => {
          if (e.ordersNum === orderNum){
            e.itemDeleted.push(containerMovements.childNodes[containerMovements.childNodes.length - 1]);
          }
        })
    }
    else{
    const productTmp = {
      ordersNum: orderNum,
      productsDeleted: [products.at(-2)]
    };
    const itemTmp = {
      ordersNum: orderNum,
      itemDeleted: [
        containerMovements.childNodes[containerMovements.childNodes.length - 1],
      ],
    };
    restoreDeleteProducts.push(productTmp);
    restoreDeleteItemsMovements.push(itemTmp);
    }
    //  const ordersDisplay = ordersHolder.find(
    // element => element.displayOrdersNum == orderNumber
    // restoreDeleteProducts.push()
    // restoreDeleteProducts.push(products.at(-2));
    products.splice(products.length - 2, 1);
    // restoreDeleteItemsMovements.push(
    //   containerMovements.childNodes[containerMovements.childNodes.length - 1]
    // );
    containerMovements.removeChild(
      containerMovements.childNodes[containerMovements.childNodes.length - 1]
    );
    console.log(restoreDeleteProducts);
    displayTotal();
  } else if (keysPressed['Control'] && e.key == 'c') {
    if (restoreDeleteTab.length == 0) return;
    const tab = document.getElementById('leftTabMenu');
    const plus = tabsMenu.removeChild(tabs[tabs.length - 1]);
    tab.appendChild(restoreDeleteTab.pop());
    tab.appendChild(plus);
  } else if (keysPressed['Control'] && e.key == 'v') {
    if (restoreDeleteItemsMovements.length == 0)
      return;
    const restoreProducts = restoreDeleteProducts.find(
    element => element.ordersNum == orderNum);
    const restoreItems = restoreDeleteItemsMovements.find(
      element => element.ordersNum == orderNum
    );
    if (restoreProducts.productsDeleted.length == 0) return;
      console.log(restoreProducts.productsDeleted.length);
    console.log(restoreItems);
    containerMovements.appendChild(restoreItems.itemDeleted.pop());
    const productPlus = products.pop();
    products.push(restoreProducts.productsDeleted.pop());
    products.push(productPlus);
    displayTotal();
  }
});

document.addEventListener('keyup', e => {
  keysPressed[e.key] = false;
});

// Pay button
btnPay.addEventListener('click', e => {
  e.preventDefault();
   if (!modeButton[0].classList.contains('active')) {
     console.log('Please go to MENU inorder to checkout');
     return;
   }
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
  // History == ordersHolder.push(products);
  console.log(orders);
  console.log(ordersTopTab);
  console.log(orderNum);
  const historyTmp = {
    historyNumber: orderNum,
    historyProducts: products.slice()
  }
  historyStorage.push(historyTmp);
  let productLength = products.length;
  let tabPosition = -1;
  const orderNumber = `Orders ${orderNum}`;
  for (let i = 0; i < productLength - 1; i++) {
    products.shift();
    rowsProducts[1].remove();
  }
  const tab = document.getElementById('leftTabOrders');
  if (ordersTopTab.length != 0){
  Array.from(ordersTopTab).forEach((el, i) => {
      console.log(el.innerHTML.trim());
    if (el.innerHTML.trim() === orderNumber) {
      tabPosition = i;
      console.log(i);
    }
  });
  tab.removeChild(leftPageTabOrders[tabPosition]);
  }
  addRowHistory();
  if (largestOrderNumber != orderNum){
    orderNum = largestOrderNumber;
  }
  displayTotal();
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

let largestOrderNumber = 0;
// Hold button
btnHold.addEventListener('click', e => {
  if (modeButton[1].classList.contains('active')) {
    console.log('Error trying to duplicate hold');
    return;
  }
  console.log(orderNum);
  console.log(ordersHolder.displayOrdersNum);
  e.preventDefault();
  console.log('Hold');
  console.log(products);
  const orderTmp = {
    displayOrdersNum: orderNum,
    productsSummary: products.slice(),
  };
  if (ordersHolder.find(e => e.displayOrdersNum === orderNum)) {
    ordersHolder.forEach((el, i) => {
      if (el.displayOrdersNum === orderNum) {
        ordersHolder.splice(i, 1);
      }
    });
  }
  ordersHolder.push(orderTmp);
  console.log(products);
  console.log(ordersHolder);
  let productLength = products.length;
  for (let i = 0; i < productLength - 1; i++) {
    products.shift();
    rowsProducts[1].remove();
  }
  addRemoveTabOrder();
  largestOrderNumber = Math.max(largestOrderNumber, orderNum);
  displayTotal();
});

// Hold functions
function addRemoveTabOrder() {
  const orderNumber = `Orders ${orderNum}`;
  const tab = document.getElementById('leftTabOrders');
  let tabPosition = -1;
  if (Array.from(ordersTopTab).find(el => el.innerHTML === orderNumber)) {
    Array.from(ordersTopTab).forEach((el, i) => {
      if (el.innerHTML.trim() === orderNumber) {
        tabPosition = i;
      }
    });
    tab.removeChild(leftPageTabOrders[tabPosition]);
  }
  const button = document.createElement('button');
  const children1 = document.createElement('div');
  const children2 = document.createElement('div');
  button.className = 'orders_leftPage_tab';
  children1.className = 'orders_top_tab';
  children1.innerHTML = orderNumber;
  children2.className = 'orders_bottom_tab';
  children2.innerHTML = '';
  button.appendChild(children1);
  button.appendChild(children2);
  tab.appendChild(button);
  orderNum++;
}
console.log(products);
function displayHoldOrder(productsSummary) {}

window.addEventListener('click', function (e) {
  e.preventDefault();
  console.log(ordersHolder);
  const orderNumber = Number(
    e.target.parentNode.children[0].innerHTML.slice(-1)
  );
  const ordersDisplay = ordersHolder.find(
    element => element.displayOrdersNum == orderNumber
  );
  if (ordersDisplay == undefined || orderNum == orderNumber) return;
  if (modeButton[1].classList.contains('active') && orderNumber != orderNum) {
    const productLength = products.length;
    for (let i = 0; i < productLength - 1; i++) {
      products.shift();
      rowsProducts[1].remove();
    }
  }
  orderNum = orderNumber;
  const plus = products.pop();
  ordersDisplay.productsSummary.forEach(el => {
    if (el.name === '<br><br>+') return;
    products.push(el);
    const html = `<div class="row PQET">
               <div class="Product Area col-md-3">
               ${el.name}
            </div>
            <div class="Quantity Area col-md-3">
              ${el.quantity}
            </div>
            <div class="Area col-md-3">
              ${el.price}
            </div>
            <div class="Total Area col-md-1.5">
              ${el.total}
            </div>
            </div>`;
    containerMovements.insertAdjacentHTML('beforeend', html);
  });
  console.log(products);
  products.push(plus);
  displayTotal();
});


// HISTORY functions
function addRowHistory() {
  const orderNumber = `Orders ${orderNum}`;
  const movements = document.getElementById('movements_history');
  const row = document.createElement('div');
  const col1 = document.createElement('div');
  const col2 = document.createElement('div');
  row.className = 'row movements__row_history';
  col1.className = 'col-md-7';
  col1.innerHTML = orderNumber;
  col2.className = 'col-md-3';
  col2.innerHTML = '00/00/0000';
  row.appendChild(col1);
  row.appendChild(col2);
  movements.appendChild(row);
}

window.addEventListener('click', function(e) {
  console.log(e.target.parentNode.children[0].innerHTML)

  const historyNumber = Number(
    e.target.parentNode.children[0].innerHTML.slice(-1)
  );
  const historyDisplay = historyStorage.find(
    element => element.historyNumber == historyNumber
  );
  console.log(historyDisplay);

  historyDisplay.historyProducts.forEach(el => {
    if (el.name === '<br><br>+') return;
    products.push(el);
    const html = `<div class="row PQET">
               <div class="Product Area col-md-3">
               ${el.name}
            </div>
            <div class="Quantity Area col-md-3">
              ${el.quantity}
            </div>
            <div class="Area col-md-3">
              ${el.price}
            </div>
            <div class="Total Area col-md-1.5">
              ${el.total}
            </div>
            </div>`;
    containerMovements.insertAdjacentHTML('beforeend', html);
  });
})
// const movementsRowsHistory = document.getElementsByClassName(
//   'row.movements__row_history'
// );
// const movementsHistory = document.getElementsByClassName('movements_history');
// Array.from(movementsRowsHistory).for
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

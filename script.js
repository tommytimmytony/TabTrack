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
const movementsHistory = document.getElementById('movements_history');
let orderNum = 1;
//let tabPosition = -1;
let historyStorage = [];
const products = [];
let ordersHolder = [];
// Menu functions
const initialProducts = {
  product1: {
    name: 'Apple',
    price: 4.25,
  },
  product2: {
    name: 'Banana',
    price: 5.99,
  },
  product3: {
    name: 'Orange',
    price: 10.0,
  },
  product4: {
    name: 'Watermelons',
    price: 4.99,
  },
  product5: {
    name: 'Kiwi',
    price: 3.0,
  },
  product6: {
    name: 'Mango',
    price: 2.0,
  },
};

function restore(name, price) {
  const productName = name;
  const productPrice = Number(price).toFixed(2);
  if (
    Array.from(tabTop).find(
      e => e.innerHTML.toLowerCase() === productName.toLowerCase()
    )
  ) {
    console.log('Found Duplicate');
    return;
  }
  const tab = document.getElementById('leftTabMenu');
  const button = document.createElement('button');
  const children1 = document.createElement('div');
  const children2 = document.createElement('div');
  button.className = 'leftPage_tab';
  children1.className = 'top_tab';
  children1.innerHTML = productName;
  children2.className = 'bottom_tab';
  children2.innerHTML = productPrice.toString();
  button.appendChild(children1);
  button.appendChild(children2);
  const plus = tab.removeChild(tabs[tabs.length - 1]);
  tab.appendChild(button);
  tab.appendChild(plus);
}

if (localStorage.getItem('Menu') === null) {
  console.log(localStorage.getItem('Menu') === null);
  console.log('initilizing...');
}
if (localStorage.getItem('Menu') === null) {
  for (const product in initialProducts) {
    restore(initialProducts[product].name, initialProducts[product].price);
  }
  for (const product in initialProducts) {
    const productName = initialProducts[product].name;
    const productPrice = initialProducts[product].price.toFixed(2);
    const productTmp = {
      name: productName,
      quantity: 1,
      price: Number(productPrice),
      total: Number(productPrice),
    };
    products.push(productTmp);
    updateMovements(productTmp);
  }
  localStorage.setItem('Menu', '[]');
  localStorage.setItem('Orders', '[]');
  localStorage.setItem('History', '[]');
  let data = JSON.parse(localStorage.getItem('Menu'));
  data = products.slice();
  localStorage.setItem('Menu', JSON.stringify(data));
} else {
  const products = JSON.parse(localStorage.getItem('Menu'));
  for (const product in products) {
    restore(products[product].name, products[product].price);
  }
  const orders = JSON.parse(localStorage.getItem('Orders'));
  for (const order in orders) {
    addRemoveTabOrder(orders[order].OrdersNum);
  }
  ordersHolder = orders.slice();
  const histories = JSON.parse(localStorage.getItem('History'));
  for (const history in histories ){
    addRowHistory(
      histories[history].historyNumber,
      histories[history].date.day,
      histories[history].date.month,
      histories[history].date.year
    );
  }
  historyStorage = histories.slice();
}

// Controlling the mode button (top button, switching);
modeButton.forEach((e, i) => {
  modeButton[i].addEventListener('click', function () {
    mode.forEach(element => {
      element.classList.add('hidden');
    });
    modeButton.forEach(element => {
      element.classList.remove('active');
    });
    if (historyIsAcitve == true) {
      let productLength = products.length;
      for (let i = 0; i < productLength - 1; i++) {
        products.shift();
        rowsProducts[1].remove();
      }
      orderNum = largestOrderNumber;
      displayTotal();
      historyIsAcitve = false;
    }
    mode[i].classList.remove('hidden');
    modeButton[i].classList.add('active');
    largestOrderNumber = Math.max(largestOrderNumber, orderNum);
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
  if (productName === '') {
    console.log('Please enter a name');
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

  // local Storage
  const productTmp = {
    name: productName,
    quantity: 1,
    price: Number(productPrice),
    total: Number(productPrice),
  };
  const data = JSON.parse(localStorage.getItem('Menu'));
  data.push(productTmp);
  localStorage.setItem('Menu', JSON.stringify(data));
}

// PLus tab
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
  itemsNum.innerHTML = `Items: ${numOfItems}`;
  subTotalNum.innerHTML = `SubTotal: ${String(subTotal.toFixed(2))}`;
  taxNum.innerHTML = `Tax: ${String(tax.toFixed(2))}`;
  totalNum.innerHTML = `Total: ${String(total.toFixed(2))}`;
}

displayTotal();

document.addEventListener('click', function (e) {
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
    // movement container
    const productObject = products.find(
      e => e.name.toLowerCase() === productName.toLowerCase()
    );
    const productRows = Array.from(rowsProducts).find(
      e =>
        e.childNodes[1].innerHTML.toLowerCase().trim() ===
        productName.toLowerCase()
    );

    productRows.childNodes[3].innerHTML = ++productObject.quantity;
    productRows.childNodes[7].innerHTML = (
      productObject.quantity * productObject.price
    ).toFixed(2);
    displayTotal();
    productObject.total = Number(
      (productObject.quantity * productObject.price).toFixed(2)
    );
  } else {
    const productTmp = {
      name: productName,
      quantity: 1,
      price: Number(productPrice),
      total: Number(productPrice),
    };
    products.push(productTmp);
    updateMovements(productTmp);
    displayTotal();
  }
});

function updateMovements(restore) {
  const html = `<div class="row PQET">
                     <div class="Product Area col-md-3">
                     ${restore.name}
                  </div>
                  <div class="Quantity Area col-md-3">
                    ${restore.quantity}
                  </div>
                  <div class="Area col-md-3">
                    ${restore.price.toFixed(2)}
                  </div>
                  <div class="Total Area col-md-1.5">
                     ${restore.total.toFixed(2)}
                  </div>
                  </div>`;
  containerMovements.insertAdjacentHTML('beforeend', html);
}

// if reset it gone
const restoreDeleteTab = [];
const restoreDeleteProducts = [];
const restoreLocalStorage = [];
let keysPressed = {};
// const arr = [1,2,3,4];
//   console.log(arr.splice(2,1));
//   console.log(arr);
document.addEventListener('keydown', e => {
  if(!modeButton[0].classList.contains('active')) return;
  keysPressed[e.key] = true;
  if (keysPressed['Control'] && e.key == 'z') {
    if (tabs.length == 1) return;
    restoreDeleteTab.push(tabs[tabs.length - 2]);
    tabsMenu.removeChild(tabs[tabs.length - 2]);
    //local Storage
    const data = JSON.parse(localStorage.getItem('Menu'));
    restoreLocalStorage.push(data.pop());
    localStorage.setItem('Menu', JSON.stringify(data));
  } else if (keysPressed['Control'] && e.key == 'x') {
    if (rowsProducts.length < 2) return;
    //const productRows = rowsProducts[rowsProducts.length - 1];
    restoreDeleteProducts.push(products[products.length - 1]);
    products.splice(products.length - 1, 1);
    containerMovements.removeChild(rowsProducts[rowsProducts.length - 1]);
    displayTotal();
  } else if (keysPressed['Control'] && e.key == 'c') {
    if (restoreDeleteTab.length == 0) return;
    const tab = document.getElementById('leftTabMenu');
    const plus = tabsMenu.removeChild(tabs[tabs.length - 1]);
    tab.appendChild(restoreDeleteTab.pop());
    tab.appendChild(plus);
    // local Storage
    const data = JSON.parse(localStorage.getItem('Menu'));
    data.push(restoreLocalStorage.pop());
    localStorage.setItem('Menu', JSON.stringify(data));
  } else if (keysPressed['Control'] && e.key == 'v') {
    if (restoreDeleteProducts.length == 0) return;
    const restoreItem = restoreDeleteProducts.pop();
    products.push(restoreItem);
    updateMovements(restoreItem);
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
    alert('Please return to Menu first');
    return;
  }
  e.preventDefault();
  console.log('Hold');
  const orderTmp = {
    OrdersNum: orderNum,
    productsSummary: products.slice(),
  };
  // updating ordersNum && data in local Storage
  const data = JSON.parse(localStorage.getItem('Orders'));
  ordersHolder.forEach((el, i) => {
    if (el.OrdersNum === orderNum) {
      ordersHolder.splice(i, 1);
      data.splice(i, 1);
    }
  });
  ordersHolder.push(orderTmp);
  data.push(orderTmp);
  localStorage.setItem('Orders', JSON.stringify(data));

  while (products.length != 0) {
    products.shift();
    rowsProducts[1].remove();
  }
  addRemoveTabOrder(orderNum);
  largestOrderNumber = Math.max(largestOrderNumber, orderNum);
  orderNum = largestOrderNumber;
  displayTotal();
});

// Hold functions
function addRemoveTabOrder(number) {
  const orderNumber = `Orders ${number}`;
  const tab = document.getElementById('leftTabOrders');

  //Removing old order tab
  Array.from(ordersTopTab).forEach((el, i) => {
    if (el.innerHTML.trim() === orderNumber) {
      tab.removeChild(leftPageTabOrders[i]);
    }
  });

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

document.addEventListener('click', function (e) {
  if (
    !modeButton[1].classList.contains('active') &&
    !e.target.parentNode.matches('.orders_leftPage_tab')
  )
    return;
  e.preventDefault();
  console.log(ordersHolder);
  const orderNumber = Number(
    e.target.parentNode.children[0].innerHTML.slice(-1)
  );
  const orders = ordersHolder.find(el => el.OrdersNum == orderNumber);
  if (orders == undefined || orderNum == orderNumber) return;
  // if (modeButton[1].classList.contains('active') && orderNumber != orderNum) {

  while (products.length != 0) {
    products.shift();
    rowsProducts[1].remove();
  }
  //}
  orderNum = orderNumber;
  console.log(orders);
  console.log(orders.productsSummary);
  orders.productsSummary.forEach(order => {
    updateMovements(order);
    products.push(order);
  });
  displayTotal();
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
  let today = new Date();
  const historyTmp = {
    historyNumber: orderNum,
    date: {
      day: today.getDate(), 
      month: today.getMonth(),
      year: today.getFullYear(),
    },
    historyProducts: products.slice(),
  };
    historyStorage.push(historyTmp);
  const history = JSON.parse(localStorage.getItem("History"));
  history.push(historyTmp);
  localStorage.setItem('History', JSON.stringify(history));

  const orderNumber = `Orders ${orderNum}`;
  while (products.length != 0) {
    products.shift();
    rowsProducts[1].remove();
  }
  const tab = document.getElementById('leftTabOrders');
  if (ordersTopTab.length != 0) {
    const order = JSON.parse(localStorage.getItem('Orders'));
    Array.from(ordersTopTab).forEach((el, i) => {
      // console.log(el.innerHTML.trim());
      if (el.innerHTML.trim() === orderNumber) {
        tab.removeChild(leftPageTabOrders[i]);
        order.splice(i,1)
      }
    });
    localStorage.setItem('Orders', JSON.stringify(order));
  }
  addRowHistory(orderNum, today.getDate(), today.getMonth(), today.getFullYear());
  largestOrderNumber = Math.max(largestOrderNumber, orderNum);
  if (largestOrderNumber != orderNum) {
    orderNum = largestOrderNumber;
  }
  if (ordersTopTab.length == 0) {
    orderNum++;
  }
  displayTotal();
});

// HISTORY functions
function addRowHistory(number, day, month, year) {
  const orderNumber = `Orders ${number}`;
  const movements = document.getElementById('movements_history');
  const row = document.createElement('div');
  const col1 = document.createElement('div');
  const col2 = document.createElement('div');
  let dd = String(day).padStart(2, '0');
  let mm = String(month + 1).padStart(2, '0'); //January is 0!
  let yyyy = year;

  const today = mm + '/' + dd + '/' + yyyy;
  row.className = 'row movements__row_history';
  col1.className = 'col-md-7';
  col1.innerHTML = orderNumber;
  col2.className = 'col-md-3';
  col2.innerHTML = today;
  row.appendChild(col1);
  row.appendChild(col2);
  movements.appendChild(row);
}

let historyIsAcitve = false;
document.addEventListener('click', function (e) {
  console.log(historyStorage);
  const historyNumber = Number(
    e.target.parentNode.children[0].innerHTML.slice(-1)
  );
  const historyDisplay = historyStorage.find(
    element => element.historyNumber == historyNumber
  );
  if (
    modeButton[2].classList.contains('active') &&
    historyDisplay != undefined
  ) {
    while(products.length != 0) {
      products.shift();
      rowsProducts[1].remove();
    }
    displayTotal();
  }
  if (historyDisplay == undefined) return;
  historyDisplay.historyProducts.forEach(el => {
    products.push(el);
    updateMovements(el);
  });
  // const data = localStorage.getItem("History");
  // data.push(historyStorage);
  console.log(products);
  orderNum = historyNumber;
  historyIsAcitve = true;
  displayTotal();
});

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

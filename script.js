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


let orderNum = 1;
let tabPosition = -1;

const product = [];
Array.from(tabs).forEach((e,i) => {
  const productName = tabTop[i].innerHTML;
  const productPrice = Number(tabBottom[i].innerHTML).toFixed(2);
  const productTmp = {
    name: productName,
    quantity: 1,
    price: productPrice,
    total: productPrice,
  }
  product.push(productTmp);
});

const arr = [];
Array.from(tabs).forEach((e, i) => {
  const productName = tabTop[i].innerHTML;
  const productPrice = Number(tabBottom[i].innerHTML).toFixed(2);
  arr.push([tabTop[i].innerHTML, 1, productPrice, productPrice, ++tabPosition]);
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
            <div class="Delete Area col-md-0.5">
              X
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

function displayTotal ()
{
  let iN = 0;
  let sTN = 0;
  let tN = 0;
 arr.forEach((e, i, arr) => {
   iN += arr[i][1];
   sTN += Number(arr[i][3] * arr[i][1]);
   tN = sTN * 0.0825;
 });
 ordersNum.innerHTML = `Order #${orderNum}`;
 itemsNum.innerHTML = `Items: ${iN - 1}`;
 subTotalNum.innerHTML = `SubTotal: ${String(sTN.toFixed(2))}`;
 taxNum.innerHTML = `Tax: ${String(tN.toFixed(2))}`;
 totalNum.innerHTML = `Total: ${String((sTN + tN).toFixed(2))}`
}

$(tabs).on('click', takeE);
displayTotal();
function takeE() {
  window.onclick = e => {
    e.preventDefault();
    const productName = e.target.parentNode.children[0].innerHTML;
    const productPrice = Number(e.target.parentNode.children[1].innerHTML).toFixed(2);
    // Plus
    if (productName === '<br><br>+' || !e.target.parentNode.matches('.leftPage_tab')) {
      console.log('plusE');
      return;
    } else if (arr.find((e, i, arr) => arr[i][0] === productName)) {
      // Area
      const arrMatch = arr.find((e, i, arr) => arr[i][0] === productName);
      areaQuantity[arrMatch[4]].innerHTML = ++arrMatch[1];
      areaTotal[arrMatch[4]].innerHTML = String((arrMatch[3] * arrMatch[1]).toFixed(2));
      console.log(arr);
      displayTotal();
    } else {
      arr.splice(arr.length - 1, 0, [productName, 1, productPrice, productPrice, tabPosition++]);
      arr[tabs.length - 1][2] = tabPosition;
       console.log(arr);
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
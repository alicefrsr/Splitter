'use strict';
//////// DOM Elements
// inputs
const billAmount = document.getElementById('billAmount');
const numPeople = document.getElementById('numPeople');
const btnTipCustom = document.getElementById('customTipPercentage');

// btns
const btnTip5 = document.querySelector('.tip-btn-5');
const btnTip10 = document.querySelector('.tip-btn-10');
const btnTip15 = document.querySelector('.tip-btn-15');
const btnTip25 = document.querySelector('.tip-btn-25');
const btnTip50 = document.querySelector('.tip-btn-50');
const btnReset = document.querySelector('.reset-btn');

// outputs
const tipAmountLabel = document.querySelector('.tip-amount-pp');
const totalAmountLabel = document.querySelector('.total-amount-pp');
const totalLabel = document.querySelector('.bill-tip-total');

// errors
const errorBill = document.querySelector('.error-bill');
const errorNumPeople = document.querySelector('.error-numPeople');
const errorCustomTip = document.querySelector('.error-customTip');

//////// Function
const calcOutputs = function (percent) {
  if (billAmount.value === '' || isNaN(billAmount.value)) {
    errorBill.innerHTML = 'Please enter the bill amount';
    billAmount.classList.add('error-border');
    return;
  } else {
    errorBill.innerHTML = '';
    billAmount.classList.remove('error-border');
  }

  if (numPeople.value === '' || isNaN(numPeople.value) || numPeople.value === '0') {
    errorNumPeople.innerHTML = 'Please enter 1 or more';
    // errorNumPeople.textContent = "(Can't be zero)"; (difference?)
    numPeople.classList.add('error-border');
  } else {
    errorNumPeople.innerHTML = '';
    numPeople.classList.remove('error-border');

    const totalTipAmount = (billAmount.value * percent) / 100;
    const tipAmountpp = totalTipAmount / numPeople.value;
    tipAmountLabel.textContent = tipAmountpp.toFixed(2);

    const totalBillAmount = +billAmount.value + totalTipAmount;
    const totalBillpp = totalBillAmount / numPeople.value;
    totalAmountLabel.textContent = totalBillpp.toFixed(2);
    totalLabel.textContent = totalBillAmount.toFixed(2);
  }
};

//////// Events handlers
btnTip5.addEventListener('click', () => calcOutputs(5));
btnTip10.addEventListener('click', () => calcOutputs(10));
btnTip15.addEventListener('click', () => calcOutputs(15));
btnTip25.addEventListener('click', () => calcOutputs(25));
btnTip50.addEventListener('click', () => calcOutputs(50));

btnTipCustom.addEventListener('change', function (e) {
  if (isNaN(btnTipCustom.value)) {
    errorCustomTip.innerHTML = 'Please enter a number (0 for no tips)';
    btnTipCustom.classList.add('error-border');
  } else {
    errorCustomTip.innerHTML = '';
    btnTipCustom.classList.remove('error-border');

    calcOutputs(+btnTipCustom.value);
  }
});

btnReset.addEventListener('click', function () {
  billAmount.value = '';
  numPeople.value = '';

  tipAmountLabel.textContent = '0.00';
  totalAmountLabel.textContent = '0.00';
  totalLabel.textContent = '0.00';

  errorBill.innerHTML = '';
  errorNumPeople.innerHTML = '';
  errorCustomTip.innerHTML = '';

  billAmount.classList.remove('error-border');
  numPeople.classList.remove('error-border');
  btnTipCustom.classList.remove('error-border');

  btnTipCustom.value = '';
});

/*----- constants -----*/
const TOTAL_STEPS = 4;
const PRICES_MTH = {
  arcade: 9,
  advanced: 12,
  pro: 15,
  addOn1: 1,
  addOn2: 2,
  addOn3: 3,
}

/*----- app's state (variables) -----*/
let currentStep = 0;
let planSelected = ''; // arcade, advanced, pro
let billingCycle = 0; // 0 = monthly, 1 = yearly
let addOns = []; // addOn1, addOn2, addOn3

/*----- cached element references -----*/
// Sidebar elements
const step1Sidebar = document.getElementById('step1');
const step2Sidebar = document.getElementById('step2');
const step3Sidebar = document.getElementById('step3');
const step4Sidebar = document.getElementById('step4');
// Step 1 elements
const personalInfoEl = document.getElementById('personal-info');
const textInputs = document.querySelectorAll('.info-input');
// Step 2 elements
const selectPlanEl = document.getElementById('select-plan');
const arcadePlan = document.getElementById('arcade');
const advancedPlan = document.getElementById('advanced');
const proPlan = document.getElementById('pro');
const billingSelect = document.getElementById('mo-yr')
const monthlyEl = document.querySelector('#billing-toggle > span:first-child');
const yearlyEl = document.querySelector('#billing-toggle > span:last-child');
const planCards = document.getElementsByClassName('card');
const planCardsDiv = document.getElementById('plan-cards');
// Step 3 elements
const addOnsEl = document.getElementById('add-ons');
const addOnCards = document.getElementsByClassName('add-on-grid');
const addOn1Input = document.getElementById('#add-on-1');
const addOn2Input = document.getElementById('#add-on-2');
const addOn3Input = document.getElementById('#add-on-3');
// Step 4 elements
const planName = document.getElementById('plan-name');
const confirmationEl = document.getElementById('confirmation');
const billingCycleSpan = document.getElementById('user-billing-cycle');
const billingCycleSpan2 = document.querySelector('#total-cost > span:first-child > span');
// Common elements
const allNextButtons = document.querySelectorAll('.next-btn');
const allBackLinks = document.getElementsByClassName('back');

/*----- event listeners -----*/
for (input of textInputs) {
  input.addEventListener('input', validateTextInputs);
}

for (let i = 0; i < allNextButtons.length; i++) {
  allNextButtons[i].addEventListener('click', handleNextClick);
}

for (let i = 0; i < allBackLinks.length; i++) {
  allBackLinks[i].addEventListener('click', handleBackClick);
}

for (let i = 0; i < addOnCards.length; i++) {
  addOnCards[i].addEventListener('change', handleAddOnClick);
}

billingSelect.addEventListener('change', handleBillingChange);
arcadePlan.addEventListener('click', handlePlanClick);
advancedPlan.addEventListener('click', handlePlanClick);
proPlan.addEventListener('click', handlePlanClick);
addOn1Input?.addEventListener('change', handleAddOnClick);
addOn2Input?.addEventListener('change', handleAddOnClick);
addOn3Input?.addEventListener('change', handleAddOnClick);
planCardsDiv.addEventListener('click', validatePlanClick);

/*----- functions -----*/
function init() {
  for (let i = 0; i < 2; i++) {
    allNextButtons[i].classList.add('next-btn-disabled');
    allNextButtons[i].disabled = true;
  }
}

function disableNextBtn() {
  allNextButtons[currentStep].classList.add('next-btn-disabled');
  allNextButtons[currentStep].disabled = true;
}

function enableNextBtn() {
  allNextButtons[currentStep].classList.remove('next-btn-disabled');
  allNextButtons[currentStep].disabled = false;
}

function validateTextInputs(evt) {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;

  // Add validation for name, email, and phone number
  const isValidName = name.trim() !== '';
  const isValidEmail = email.trim() !== '' && email.includes('@') && email.includes('.');
  const isValidPhone = phone.trim() !== '' && phone.length >= 10;

  if (isValidName && isValidEmail && isValidPhone) {
    enableNextBtn();
  } else {
    if (!allNextButtons[0].classList.contains('next-btn-disabled')) {
      disableNextBtn();
    }
  }
}

function handleNextClick(evt) {
  evt.preventDefault();
  const stepSidebarArr = [step1Sidebar, step2Sidebar, step3Sidebar, step4Sidebar];
  const stepContentArr = [personalInfoEl, selectPlanEl, addOnsEl, confirmationEl];
  stepSidebarArr[currentStep].classList.remove('step-selected');
  stepContentArr[currentStep].classList.add('hidden');
  currentStep++;
  stepSidebarArr[currentStep].classList.add('step-selected');
  stepContentArr[currentStep].classList.remove('hidden');
}

function handleBackClick(evt) {
  evt.preventDefault();
  const stepSidebarArr = [step1Sidebar, step2Sidebar, step3Sidebar, step4Sidebar];
  const stepContentArr = [personalInfoEl, selectPlanEl, addOnsEl, confirmationEl];
  stepSidebarArr[currentStep].classList.remove('step-selected');
  stepContentArr[currentStep].classList.add('hidden');
  currentStep--;
  stepSidebarArr[currentStep].classList.add('step-selected');
  stepContentArr[currentStep].classList.remove('hidden');
}

function handleAddOnClick(evt) {
  const addOnSelected = evt.target.name;
  const addOnEl = document.getElementById(addOnSelected);

  if (evt.target.checked) {
    addOnEl.classList.add('add-on-checked');
    addOns.push(addOnSelected);
  } else {
    addOnEl.classList.remove('add-on-checked');
    addOns.splice(addOns.indexOf(addOnSelected), 1);
  }
  console.log(addOns);
}

function handleBillingChange(evt) {
  billingCycle = evt.target.value;

  if (billingCycle === '1') {
    monthlyEl.classList.remove('cycle-selected');
    yearlyEl.classList.add('cycle-selected');
    billingCycleSpan.textContent = '(Yearly)';
    billingCycleSpan2.textContent = 'year';
  } else {
    monthlyEl.classList.add('cycle-selected');
    yearlyEl.classList.remove('cycle-selected');
    billingCycleSpan.textContent = '(Monthly)';
    billingCycleSpan2.textContent = 'month';
  }
}

function handlePlanClick(evt) {
  const planId = evt.target.id;
  const planEl = document.getElementById(planId);
  planSelected = planId;
  
  // If user clicks on already selected plan, remove the selection
  if (planEl.classList.contains('add-on-checked')) {
    planEl.classList.remove('add-on-checked');
    planSelected = '';
  // If user clicks on a new plan, add the selection
  } else {
    planEl.classList.add('add-on-checked');
    planSelected = evt.target.id;
    // Remove the selection from other plans
    for (card of planCards) {
      if (card.id !== planId ) {
        card.classList = 'card';
      }
    }
  }
}

function validatePlanClick(evt) {
  if (planSelected) {
    enableNextBtn();
  } else {
    if (!allNextButtons[1].classList.contains('next-btn-disabled')) {
      disableNextBtn();
    }
  }
}

function handleAddOnClick(evt) {
  const addOnSelected = evt.target.value;
  const planId = `add-on-${evt.target.name[evt.target.name.length - 1]}`
  const addOnEl = document.getElementById(planId);

  if (evt.target.checked) {
    addOnEl.classList.add('add-on-checked');
    addOns.push(addOnSelected);
  } else {
    addOnEl.classList.remove('add-on-checked');
    addOns.splice(addOns.indexOf(addOnSelected), 1);
  }
}

init();
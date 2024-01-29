/*----- constants -----*/
const TOTAL_STEPS = 4;
const PRICES = {
  arcade: 9,
  advanced: 12,
  pro: 15,
}

/*----- app's state (variables) -----*/
let currentStep = 0;
let planSelected = ''; // arcade, advanced, pro
let billingCycle = 0; // 0 = monthly, 1 = yearly

/*----- cached element references -----*/
// Sidebar elements
const step1Sidebar = document.getElementById('step1');
const step2Sidebar = document.getElementById('step2');
const step3Sidebar = document.getElementById('step3');
const step4Sidebar = document.getElementById('step4');
// Step 1 elements
const personalInfoEl = document.getElementById('personal-info');
// Step 2 elements
const selectPlanEl = document.getElementById('select-plan');
const addOnCards = document.getElementsByClassName('add-on-grid');
const arcadePlan = document.getElementById('arcade');
const advancedPlan = document.getElementById('advanced');
const proPlan = document.getElementById('pro');
const billingSelect = document.getElementById('mo-yr')
const monthlyEl = document.querySelector('#billing-toggle > span:first-child');
const yearlyEl = document.querySelector('#billing-toggle > span:last-child');
// Step 3 elements
const addOnsEl = document.getElementById('add-ons');
// Step 4 elements
const confirmationEl = document.getElementById('confirmation');
// Common elements
const allNextButtons = document.getElementsByClassName('next-btn');
const allBackLinks = document.getElementsByClassName('back');

/*----- event listeners -----*/
// add event listener to all next buttons
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

/*----- functions -----*/
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
  } else {
    addOnEl.classList.remove('add-on-checked');
  }
}

function handleBillingChange(evt) {
  billingCycle = evt.target.value;

  if (billingCycle === '1') {
    monthlyEl.classList.remove('cycle-selected');
    yearlyEl.classList.add('cycle-selected');
  } else {
    monthlyEl.classList.add('cycle-selected');
    yearlyEl.classList.remove('cycle-selected');
  }
}

function handlePlanClick(evt) {
  planId = evt.target.id;
  const planEl = document.getElementById(planId);
  
  if (planEl.classList.contains('add-on-checked')) {
    planEl.classList.remove('add-on-checked');
    planSelected = '';
  } else {
    planEl.classList.add('add-on-checked');
    planSelected = evt.target.id;
  }
  
}
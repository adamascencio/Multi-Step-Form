/*----- constants -----*/
const TOTAL_STEPS = 4;

/*----- app's state (variables) -----*/
let currentStep = 0;

/*----- cached element references -----*/
const step1Sidebar = document.getElementById('step1');
const step2Sidebar = document.getElementById('step2');
const step3Sidebar = document.getElementById('step3');
const step4Sidebar = document.getElementById('step4');
const personalInfoEl = document.getElementById('personal-info');
const selectPlanEl = document.getElementById('select-plan');
const addOnsEl = document.getElementById('add-ons');
const confirmationEl = document.getElementById('confirmation');
const allNextButtons = document.getElementsByClassName('next-btn');
const allBackLinks = document.getElementsByClassName('back');
const addOnCards = document.getElementsByClassName('add-on-grid');

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
  console.log('clicked')
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
  console.log('clicked')
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
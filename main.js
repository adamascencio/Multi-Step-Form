/*----- constants -----*/
const TOTAL_STEPS = 4;

/*----- app's state (variables) -----*/
let currentStep = 0;

/*----- cached element references -----*/
const step1Sidebar = document.getElementById('step1');
const step2Sidebar = document.getElementById('step2');
const step3Sidebar = document.getElementById('step3');
const step4Sidebar = document.getElementById('step4');
const nextStepBtn = document.getElementsByClassName('next-btn')[0];
const personalInfoEl = document.getElementById('personal-info');
const selectPlanEl = document.getElementById('select-plan');
const addOnsEl = document.getElementById('add-ons');
const confirmationEl = document.getElementById('confirmation');

/*----- event listeners -----*/
/* listen for Next Step button click */
nextStepBtn.addEventListener('click', handleNextClick);


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
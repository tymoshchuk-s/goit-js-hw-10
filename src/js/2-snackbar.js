import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const inputEl = document.querySelector('.input-text');
const radioEL = document.querySelectorAll('input[name="state"]');
const createBtnEl = document.querySelector('.submit-button');

let delay = null;
let userChoice = null;

inputEl.addEventListener('input', returnDelay)
radioEL.forEach(radio => {
    radio.addEventListener('change', (event) => {
        userChoice = event.target.value
        console.log(userChoice)
    });
});
createBtnEl.addEventListener('click', createPromises)

function returnDelay(event) {
    delay = Number(event.target.value);
    console.log(delay)
}

function createPromises(event) {
    event.preventDefault();

    const promises = new Promise((resolve, reject) => {
        if (userChoice === 'fulfilled') {
            setTimeout(() => {
                resolve(delay);
            }, delay);
        } else if(userChoice === 'rejected'){
             setTimeout(() => {
                reject(delay);
            }, delay);
        } else {
        
        }
    })

    promises
        .then(value => 
            iziToast.success({
                title: 'Success',
                message: `✅ Fulfilled promise in ${delay}ms`
            }))
        .catch(error => 
            iziToast.error({
                title: 'Error',
                message: `Rejected promise in ${delay}ms`
            }))
    
};
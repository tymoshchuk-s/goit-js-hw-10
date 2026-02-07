import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const formEl = document.querySelector('.form')

formEl.addEventListener('submit', handleSubmit)

function handleSubmit (event) {
    event.preventDefault();

    const delay = Number(event.target.delay.value);
    console.log(delay);

    const state = event.target.state.value;
    console.log(state);

    const promises = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === 'fulfilled') {
                resolve(delay);
            } else {
                reject(delay);
            };
        }, delay);
    });

    promises
        .then(delay => {
            iziToast.success({
                title: 'Success',
                message: `✅ Fulfilled promise in ${delay}ms`
            });
        })
        .catch(delay => {
            iziToast.error({
                title: 'Error',
                message: `❌ Rejected promise in ${delay}ms`
            });
        });  
};
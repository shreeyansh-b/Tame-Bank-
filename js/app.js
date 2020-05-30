
const signIn = document.querySelector("#btn-sign");
const join = document.querySelector("#btn-join");
const modalLogin = document.querySelector(".modal__login");
const modalJoin = document.querySelector(".modal__register");
const modalBG = document.querySelector(".modal__background");
const modalClose1 = document.querySelector("#modal-close1");
const modalClose2 = document.querySelector("#modal-close2");
const uID = document.querySelector("#uID");
const user_name = document.querySelector('#user_name');
const warning_name = document.querySelector('.modal__error-name');
const warning_email = document.querySelector('.modal__error-email');
const warning_pass = document.querySelector('.modal__error-pass');
const warning_pass2 = document.querySelector('.modal__error-pass2');


//fetch, api, HTTP

const register_link = 'https://heroku-bank.herokuapp.com/users/register/';


//clear input fields and warnings

const clearinputsandwarning = () => {
    //register
    document.querySelector('#user_name').value = "";
    document.querySelector('#user_email').value = "";
    document.querySelector('#user_pass').value = "";
    document.querySelector('#user_pass2').value = "";
    const errors = document.querySelectorAll('.modal__error');
    errors.forEach((error) => {
        error.style.display = "";
    });
    //sign
    document.querySelector("#uID").value = "";
    document.querySelector('#pass').value = "";
    document.querySelector('.modal__warning').style.display = "none";
}



signIn.addEventListener('click', (e) => modalToggle(e));
join.addEventListener('click', (e) => modalToggle(e));



modalBG.addEventListener('click', (e) => {
    modalLogin.style.display = "none"; 
    modalJoin.style.display = "none"; 
    modalBG.style.display = "none";
    window.location.hash = "";  //else if one closes through clciking on bg the hash stays in url and messes the onhashchange method 
    clearinputsandwarning();
});

const clearWarnings = () => {
    // warning_name.style.display = "none";
    const warnings = document.querySelectorAll('.modal__error');
    warnings.style.display = 'none';
}



modalClose1.addEventListener('click', (e) => {
    modalLogin.style.display = "none"; 
    modalBG.style.display = "none";
    window.location.hash = ""; //else if one closes through close icon the hash stays in url and messes the onhashchange method 
    e.preventDefault();
    clearinputsandwarning();
});

modalClose2.addEventListener('click', (e) => {
    modalJoin.style.display = "none"; 
    modalBG.style.display = "none";
    window.location.hash = "";  //else if one closes through close icon the hash stays in url and messes the onhashchange method 
    e.preventDefault();
    clearinputsandwarning();
});

const modalToggle = (e) => {
    if(e.target.id === 'btn-sign'){
        modalLogin.style.display = "block"; 
        modalBG.style.display = "block";
        document.querySelector('.modal__login').classList.remove('hide');
        document.querySelector('.modal__background').classList.remove('hide');
        uID.focus();
    }else if(e.target.id === 'btn-join'){
        modalJoin.style.display = "block"; 
        modalBG.style.display = "block";
        document.querySelector('.modal__register').classList.remove('hide');
        document.querySelector('.modal__background').classList.remove('hide');
    }
    // e.preventDefault();
}
// @https://stackoverflow.com/questions/25377383/close-pop-up-on-back-button by raymond
// not toggle cause if one presses back twice it gets activated 


window.onhashchange = function(e){
    console.log(window.location.hash);
    if(window.location.hash !== '#modal-login' && window.location.hash !== '#modal-register'){
        document.querySelector('.modal__login').classList.add('hide');
        document.querySelector('.modal__background').classList.add('hide');
        document.querySelector('.modal__register').classList.add('hide');
    }
}


//form validation  @ https://stackoverflow.com/questions/50046841/proper-way-to-make-api-fetch-post-with-async-await/50047047





/*Register*/
const registerBtn = document.querySelector('#user_reg');

registerBtn.addEventListener('click', (e) => registerValidator(e));

const registerValidator = (e) => {
    const user_name = document.querySelector('#user_name').value;
    const user_email = document.querySelector('#user_email').value;
    user_email.toLowerCase();
    const user_pass = document.querySelector('#user_pass').value;
    const user_pass2 = document.querySelector('#user_pass2').value;
    let errorName = 0, errorEmail = 0, errorPass = 0, errorPass2 = 0;

    

    let re_name = /^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?\s)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/;
    let re_email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let re_pass = /^[a-zA-Z0-9]{6,}$/;

    if( !re_name.test(user_name) || user_name.length < 3){
        console.log("false");
        warning_name.style.display = 'block';
        errorName = 1;
    }else if ( re_name.test(user_name) && user_name.length > 3 ){
        warning_name.style.display = 'none';
        errorName = 0;
    }
    if( !re_email.test(user_email)){
        console.log("invalid email");
        warning_email.style.display = 'block';
        errorEmail = 1;
    }else if ( re_email.test(user_email) ){
        warning_email.style.display = 'none';
        errorEmail = 0;
        // checking for already registered 
        //fetch then check
        // @ https://stackoverflow.com/questions/39565706/post-request-with-fetch-api

        console.log(user_email);

    }
    if( !re_pass.test(user_pass)){
        console.log("pass too short");
        warning_pass.style.display = 'block';
        errorPass = 1;
    }else if ( re_pass.test(user_pass) ){
        warning_pass.style.display = 'none';
        errorPass = 0;
    }
    if( user_pass !== user_pass2){
        console.log("pass don't match");
        warning_pass2.style.display = 'block';
        errorPass2 = 1;
    }else if ( user_pass === user_pass2 ){
        warning_pass2.style.display = 'none';
        errorPass2 = 0;
    }

    // if no errors
    if(errorName === 0 && errorEmail === 0 && errorPass === 0 && errorPass2 === 0 ){
        //check for already registered
        async function checkForRegistered(){
            const res = await fetch(`https://heroku-bank.herokuapp.com/users/register/`, {
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_email: user_email,
                    user_pwd: user_pass,
                    user_name: user_name
                }),
            });
            if(res.status !== 200){
                document.querySelector('.modal__error-email-exists').style.display = 'block';
            }else{
                document.querySelector('.modal__error-email-exists').style.display = 'none';
                const data = await res.json();
                document.querySelector('.modal__register .modal__inputs').style.display = 'none';
                document.querySelector('.modal__register').style.background = `url(./images/check.gif)`;
                document.querySelector('.modal__register').style.backgroundSize = 'cover';
                document.querySelector('.modal__check').style.display = 'block';
                return data;
            }

        }
        checkForRegistered().then((data) => {console.log(data)});
    }
    console.log(user_name, user_email, user_pass, user_pass2);
    e.preventDefault();
}



/* Login */

const signInBtn = document.querySelector('#user_signin');

signInBtn.addEventListener('click', (e) => signInValidator(e));

const signInValidator = (e) => {
    const user_email = document.querySelector('#uID').value;
    const user_pass = document.querySelector('#pass').value;
    const warning = document.querySelector('.modal__warning');
    let re_email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let re_pass = /^[a-zA-Z0-9]{6,}$/;
    if(user_email === '' || user_pass === ''){
        warning.style.display = 'block';
    }else if ( re_email.test(user_email) && re_pass.test(user_pass) ){
        async function checkForRegistered(){
            const res = await fetch(`https://heroku-bank.herokuapp.com/users/login/`, {
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_email: user_email,
                    user_pwd: user_pass,
                }),
            });
            if(res.status !== 200){
                warning.style.display = 'block';
            }else{
                warning.style.display = 'none';
                const data = await res.json();
                return data;
            }

        }
        checkForRegistered().then((data) => {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user_id', data.id);
            window.location.href = 'dashboard.html';
        });
    }else{
        warning.style.display = 'block';
    }

    console.log(user_email, user_pass);

    e.preventDefault();
}
console.log(globalVariable);
new Vue({
    el: '#calendar',
    data: {
      // Data used by the date picker
      mode: 'single',
      selectedDate: null,
    }
  })

var ctx = document.getElementById('barGraph').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                display: false,
                gridLines: {
                    display:false
                }
            }],
            xAxes: [{
                gridLines: {
                    display:false
                }
            }],
        },
        legend: {
            display: false
        },


    }
    
});

var ctx = document.getElementById('doughnut').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: globalVariable.card_type,
        datasets: [{
            label: '# of Votes',
            data: globalVariable.card_balance,
            backgroundColor: globalVariable.card_color,
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                display: false
            }]
        },
        legend: {
            display: false
        },
        cutoutPercentage: 90
    }
});

setInterval(() => {
    myChart.update();
},2000);





//modal stuff

const btnSeeAll = document.querySelector("#btnSeeAll");
const btnTransactions = document.querySelector("#btnTransactions");
const modal = document.querySelector(".modal__transfers");
const modalAddCard = document.querySelector(".modal__addCard");
const modalClose1 = document.querySelector("#modal-close1");
const modalClose2 = document.querySelector("#modal-close2");
const modalClose3 = document.querySelector("#modal-close3");
const modalBG = document.querySelector(".modal__background");
const addCardBtn = document.querySelector('#addCard-btn');
const modalTransactions = document.querySelector(".modal__transactions");

const modalToggle = (e) => {
    modal.style.display = "block"; 
    modalBG.style.display = "block";
    document.querySelector(".modal__transfers").classList.remove('hide');
    document.querySelector('.modal__background').classList.remove('hide');
}
const modalToggleTransactions = (e) => {
    modalTransactions.style.display = "block"; 
    modalBG.style.display = "block";
    document.querySelector(".modal__transactions").classList.remove('hide');
    document.querySelector('.modal__background').classList.remove('hide');
}
const modalAddToggle = (e) => {
    modalAddCard.style.display = "block"; 
    modalBG.style.display = "block";
    document.querySelector(".modal__addCard").classList.remove('hide');
    document.querySelector('.modal__background').classList.remove('hide');
}

modalBG.addEventListener('click', (e) => {
    modal.style.display = "none"; 
    modalBG.style.display = "none";
    modalAddCard.style.display = "none";
    modalTransactions.style.display = "none"; 
    window.location.hash = ""; //else if one closes through close icon the hash stays in url and messes the onhashchange method 
});
modalClose1.addEventListener('click', (e) => {
    modal.style.display = "none"; 
    modalBG.style.display = "none";
    window.location.hash = ""; //else if one closes through close icon the hash stays in url and messes the onhashchange method 
});
modalClose2.addEventListener('click', (e) => {
    modalAddCard.style.display = "none"; 
    modalBG.style.display = "none";
    window.location.hash = ""; //else if one closes through close icon the hash stays in url and messes the onhashchange method 
});
modalClose3.addEventListener('click', (e) => {
    modalTransactions.style.display = "none"; 
    modalBG.style.display = "none";
    window.location.hash = ""; //else if one closes through close icon the hash stays in url and messes the onhashchange method 
});

btnSeeAll.addEventListener('click', (e) => modalToggle(e));
btnTransactions.addEventListener('click', (e) => modalToggleTransactions(e));
addCardBtn.addEventListener('click', (e) => modalAddToggle(e));

//logout
const profileBtn = document.querySelector("#profile-btn");
profileBtn.addEventListener('click', (e) => profileDisplay(e));

const profileDisplay = (e) => {
    document.querySelector(".profile__list").classList.toggle('active'); //should have used similar approach for modals! *facepalm*
    e.preventDefault();
}
const profileName = document.querySelector("#profile-name");
profileName.addEventListener('click' , e => {
    e.preventDefault();
});

const profileLogout = document.querySelector("#profile-logout");
profileLogout.addEventListener('click' , (e) => {
    window.localStorage.clear();
    document.location.href="/";
    e.preventDefault();
});

//hashchange to make back button to close the modal

window.onhashchange = function(e){
    console.log(window.location.hash);
    if(window.location.hash !== '#modal__transactions/' && window.location.hash !== '#modal__transfers/' && window.location.hash !== '#modal__addCard/'){ // '/' at end cause //@ https://stackoverflow.com/questions/7697917/prevent-page-scroll-after-click
        document.querySelector(".modal__transfers").classList.add('hide');
        document.querySelector(".modal__transactions").classList.add('hide');
        document.querySelector(".modal__addCard").classList.add('hide');
        document.querySelector('.modal__background').classList.add('hide');
    }
}
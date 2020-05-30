//load local storage
const token = localStorage.getItem('token');
const user_id = localStorage.getItem('user_id')
// dom content load
document.addEventListener('DOMContentLoaded', (event) => {
    if(!token || !user_id){
        document.location.href="/";
    }
});

// @ https://stackoverflow.com/questions/41255861/how-to-pass-variable-from-one-javascript-to-another-javascript-file
let globalVariable = {
    card_balance: [],
    card_type: [],
    card_color: [],
    total_balance: 0
};

// get dashboard

async function getDashboard(){
    const res = await fetch(`https://heroku-bank.herokuapp.com/dashboard/${user_id}`, {
        method: "get",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'auth-token': token
        }
    });
    if(res.status !== 200){
    }else{
        const data = await res.json();
        return data;
    }

}
getDashboard().then((data) => {
    data.cards.forEach((card) => {
        globalVariable.card_balance.push(card.card_balance);
        globalVariable.card_type.push(card.card_type);
        globalVariable.total_balance +=  card.card_balance;
        if(card.card_type === 'visa'){
            globalVariable.card_color.push('#FC0A8F');
        }else if(card.card_type === 'mastercard'){
            globalVariable.card_color.push('#07BCFD');
        }
    });
    document.querySelector("#profile-name").textContent = data.user_name;
    document.querySelector("#overall__amount").textContent = `$ ${globalVariable.total_balance}`;
    loadDOM(data);
});





async function loadDOM(data){
    /*
    wallet_blue = mastercard
    wallet_red = visa
    */
    const cards = data.cards;
    const wallet_card = document.querySelector('.wallet__cards');
    const dropdownList = document.querySelector('.dropdown-select');
    const dropdownList2 = document.querySelector('.dropdown-select2');
    let cardUI = "";    //if not initialised it displays undefined
    let cardsTransactionUI = "";
    cards.forEach((card) => {
        cardsTransactionUI += `
        <option value="${card.card_number}" id="${card._id}">${card.card_number}</option>
        ` ;

        if(card.card_type === 'visa'){
            cardUI +=  `
            <div class="wallet__card wallet__red" id="${card._id}">
            <div class="wallet__card__top">
                <img src="images/visa-logo.svg" alt="cardtypelogo" class="wallet__img">
                <a href="#" class="wallet__link"><img src="images/keyboard_control.svg" alt="menu" class="wallet__img wallet__dots"></a>
            </div>
            <div class="wallet__card__mid">
                <h1 class="wallet__balance">$${card.card_balance}</h1>
            </div>
            <div class="wallet__card__bot">
                <h1 class="wallet__cardnumber">${card.card_number}</h1>
            </div>
            </div>`;
        }else{
            cardUI +=  `
            <div class="wallet__card wallet__blue" id="${card._id}">
            <div class="wallet__card__top">
                <img src="images/mastercard.svg" alt="cardtypelogo" class="wallet__img">
                <a href="#" class="wallet__link"><img src="images/keyboard_control.svg" alt="menu" class="wallet__img wallet__dots"></a>
            </div>
            <div class="wallet__card__mid">
                <h1 class="wallet__balance">$${card.card_balance}</h1>
            </div>
            <div class="wallet__card__bot">
                <h1 class="wallet__cardnumber">${card.card_number}</h1>
            </div>
            </div>`;
        }

    });
    dropdownList.innerHTML = cardsTransactionUI;
    dropdownList2.innerHTML = cardsTransactionUI;
    wallet_card.innerHTML = cardUI;

    //transactions
    //date @ https://momentjs.com/docs/#/parsing/string-format/
    const transactions = data.transactions;
    const transactions_length = transactions.length;
    let lastest3 = '';
    let transactionUI = '';
    const notifications__viewer = document.querySelector('.notifications__viewer');
    const transfers = document.querySelector('.modal__transfers-notifications');
    transactions.forEach((transaction, index) => {
        let date = transaction.transaction_date;
        date = moment(date, "YYYY-MM-DD HH:mm:ss ").format('LL');
        if(index >= (transactions_length - 3 )){
            lastest3 += `
            <div class="notification">
                <div class="notification__icon notification__icon-${transaction.transaction_cardType}">
                    <img src="images/credit.svg" alt="credit" class="notification__svg">
                </div>
                <div class="notification__transfer">
                    <h1 class="notification__heading notification__heading-grey">
                        ${transaction.transaction_creditName}
                    </h1>
                    <h1 class="notification__heading">
                        $${transaction.transaction_amount}
                    </h1>
                </div>
                <div class="notification__date">
                    <h1 class="notification__heading notification__heading-grey">
                        ${date}
                    </h1>
                </div>
            </div>`;
        }if (transaction){
            transactionUI += 
            `<div class="notification">
                <div class="notification__icon notification__icon-${transaction.transaction_cardType}">
                    <img src="images/credit.svg" alt="credit" class="notification__svg">
                </div>
                <div class="notification__transfer">
                    <h1 class="notification__heading notification__heading-grey">
                        ${transaction.transaction_creditName}
                    </h1>
                    <h1 class="notification__heading">
                        $${transaction.transaction_amount}
                    </h1>
                </div>
                <div class="notification__date">
                    <h1 class="notification__heading notification__heading-grey"> 
                      ${date}
                    </h1>
                </div>
            </div>`;
        }

    });
    notifications__viewer.innerHTML = lastest3;
    transfers.innerHTML = transactionUI;

}

//Buttons & add card
btnvisa = document.querySelector('.modal__cardvisa');
btnmaster = document.querySelector('.modal__mastercard');

btnvisa.addEventListener('click', (e) => addCard(e));
btnmaster.addEventListener('click', (e) => addCard(e));

const addCard = (e) => {
    
    async function newCard(){
        const res = await fetch(`https://heroku-bank.herokuapp.com/dashboard/card/${user_id}&${e.target.alt}`, {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'auth-token': token
            }
        });
        if(res.status !== 200){
        }else{
            const data = await res.json();
            return data;
        }
    
    }
    newCard().then((data) => {
        const modal = document.querySelector('.modal__addCard');
        modal.style.background = 'url(./images/check_dark.gif)';
        modal.style.backgroundSize = 'cover';
        modal.style.height = '60vh';
        document.querySelector('.modal__cardSelect').style.display = "none";
        document.querySelector('#cardselecttext').textContent = `Your card has been added!`;
        setTimeout(() => {
            window.location.reload();
        }, 4000);
    });


    e.preventDefault();
}

// do transactions UI
let transaction_betweenAccounts = 'true';
document.querySelector('#betweenaccounts').style.display = 'block';
document.querySelector('#externalaccount').style.display = 'none';

const setBetweenAccts = () => {
    transaction_betweenAccounts = 'true';
    document.querySelector('#betweenaccounts').style.display = 'block';
    document.querySelector('#externalaccount').style.display = 'none';
}
const resetBetweenAccts = () => {
    transaction_betweenAccounts = 'false';
    document.querySelector('#betweenaccounts').style.display = 'none';
    document.querySelector('#externalaccount').style.display = 'block';
}

//logic for transaction
// getting value/id from select
// @ https://stackoverflow.com/questions/1085801/get-selected-value-in-dropdown-list-using-javascript


const transferBtn = document.querySelector("#btn-transfer");

transferBtn.addEventListener('click', (e) => makeTransfer(e));


async function makeTransfer(e){
    if(transaction_betweenAccounts === 'true'){
        //variables
        const id = document.getElementById("dropdownfrom");
        const id2 = document.getElementById("dropdownto");
        const cardId = id.options[id.selectedIndex].id;
        const transaction_betweenId = id2.options[id2.selectedIndex].id;
        const transferamt = document.querySelector('#transferamtbwaccts').value;

        const res = await fetch(`https://heroku-bank.herokuapp.com/dashboard/transaction/${user_id}&${cardId}`, {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'auth-token': token
            },
            body: JSON.stringify({
                transaction_betweenAccounts: 'true',
                transaction_type: 'credit',
                transaction_amount: transferamt,
                transaction_betweenId: transaction_betweenId
            }),
        });
        if(res.status !== 200){
            console.log('error');
        }else{
            const modal = document.querySelector('.modal__transactions');
            modal.style.background = 'url(./images/check_dark.gif)';
            modal.style.backgroundSize = 'cover';
            modal.style.height = '60vh';
            document.querySelector('.modal__transactions-select').style.display = "none";
            document.querySelector('.modal__transactions p').textContent = `Your transaction has been completed!`;
            setTimeout(() => {
                console.log("timeout running");
                window.location.reload();
            }, 4000);
        }
    }else if(transaction_betweenAccounts === 'false'){
        //variables
        const id = document.getElementById("dropdownfrom");
        const cardId = id.options[id.selectedIndex].id;
        const transferamt = document.querySelector('#transferamt').value;
        const transfernumber = document.querySelector('#transfernumber').value;
        const transfername = document.querySelector('#transfername').value;
        const res = await fetch(`https://heroku-bank.herokuapp.com/dashboard/transaction/${user_id}&${cardId}`, {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'auth-token': token
            },
            body: JSON.stringify({
                transaction_type: 'credit',
                transaction_amount: transferamt,
                transaction_creditNumber: transfernumber,
                transaction_creditName: transfername
            }),
        });
        if(res.status !== 200){
            console.log("error here");
        }else{
            const modal = document.querySelector('.modal__transactions');
            modal.style.background = 'url(./images/check_dark.gif)';
            modal.style.backgroundSize = 'cover';
            modal.style.height = '60vh';
            document.querySelector('.modal__transactions-select').style.display = "none";
            document.querySelector('.modal__transactions p').textContent = `Your transaction has been completed!`;
            setTimeout(() => {
                window.location.reload();
            }, 4000);
        }
    }
}


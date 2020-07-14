const votingSection = document.querySelector('.j-voting-section');

const btnCats = document.querySelector('.j-cats');
const btnDogs = document.querySelector('.j-dogs');
const btnParrots = document.querySelector('.j-parrots');

const progressCats = document.querySelector('.j-progress-bar-cats');
const progressDogs = document.querySelector('.j-progress-bar-dogs');
const progressParrots = document.querySelector('.j-progress-bar-parrots');

const resultBlock = document.querySelector('.j-rusult');

const btnBackToVote = document.querySelector('.j-back-to-vote');


const mainUrl = 'https://sf-pyw.mosyag.in/sse/vote/';


// функция реалезующая изменение вида страницы с голосования на результаты
function changePageView () {
    setTimeout(() => { resultBlock.classList.add('d-block');
    votingSection.classList.add('d-none'); }, 1000);
};

// POST-запросы на сервер
btnCats.addEventListener('click', async _ => {
    const response = await fetch(mainUrl + 'cats', {
        method: 'POST'
      });
    changePageView ();
});

btnDogs.addEventListener('click', async _ => {
    const response = await fetch(mainUrl + 'dogs', {
        method: 'POST'
      });
    changePageView ();
});

btnParrots.addEventListener('click', async _ => {
    const response = await fetch(mainUrl + 'parrots', {
        method: 'POST'
      });
    changePageView ();
});


// GET-запросы со статистикой голосования
const header = new Headers({
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Origin': '*'
});

const urlAnswer = new URL(mainUrl + 'stats')
const ES = new EventSource(urlAnswer, header)


ES.onerror = error => {
    ES.readyState ? progressCats.textContentL = "Some error" : null;
    ES.readyState ? progressDogs.textContent = "Some error" : null;
    ES.readyState ? progressParrots.textContent = "Some error" : null;
}

ES.onmessage = message => {
    let results = JSON.parse(message.data);
    let total = results.cats + results.dogs + results.parrots;
    let perPercent = total / 100;

    changeProgressStyle(perPercent, progressCats, results.cats);
    changeProgressStyle(perPercent, progressDogs, results.dogs); 
    changeProgressStyle(perPercent, progressParrots, results.parrots);  
}

// Функция изменяющая progress-bar в зависимотси от результатов голосования
function changeProgressStyle (perPercent, progress, result) {
    let percent = Math.round(result / perPercent);
    // let info = '';

    progress.style.width = percent + '%';
    progress.textContent = result + ' - ' + percent + '%';
    progress.setAttribute('aria-valuenow', percent);
};


// Кнопка возврата на страницу голосования
btnBackToVote.addEventListener('click', () => {
    setTimeout(() => { resultBlock.classList.toggle('d-block', false);
    votingSection.classList.toggle('d-none',false); }, 1000);
})


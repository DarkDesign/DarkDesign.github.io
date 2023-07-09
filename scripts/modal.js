const MODAL = {
    $header: document.querySelector('#ide-header'),
    $window: document.querySelector('#modal'),
    $close: document.querySelector('#modal-close'),
    $title: document.querySelector('#modal-title'),
    $text: document.querySelector('#modal-text')
}
const DUMMY_ELEMENT = 'dummy';
let openCounter = 0;

const DUMMY_STORY = [
    { title: `This site..`, text: `Sorry, it's not a real IDE.` },
    { title: `Well, that's...`, text: `Yes, it's also just a decoration.` },
    { title: `Nothing has changed`, text: `Yes, yes each button just opens this window..` },
    { title: `But maybe..`, text: `I may have cheated that each button does nothing.`},
    { title: `Do you understand?`, text: `The code for the modal window was written as a joke.` },
    { title: `Well, well!`, text: `It's hard to guess if the functionality of any of the buttons has changed.`},
    { title: `I'm sorry but..`, text: `As is often the case, the documentation lags behind the changes in the code.`},
    { title: `Interesting`, text: `Have you decided to check all the buttons?`},
    { title: `Or maybe..`, text: `You're just wondering how this is going to end?` },
    { title: ``, text: `Okay, that's the end of it.` },
    { title: `Really`, text: `I won't say anything else.` },
    null,
    null,
    { title: `THE END`, text: ``},
    { title: `Seriously?`, text: `Would you stop pushing buttons?` },
    { title: `Okay, okay..`, text: `Watch the terminal, what do you think will happen at the end of the download?` },
    { title: `Hmmm`, text: `Would there be an error?` },
    { title: `Or is it..`, text: `Are we in for a happy ending?` },
    { title: `Not known!`, text: `Do you know why?` },
    { title: `Ha ha`, text: `Because that's a joke, too! It's a decoration! Like everything else around here.`},
    { title: `Bye, bye.`, text: `` },
    null,
    null,
    { title: `My goodness.`, text: `You've pressed the buttons {count} times already!`},
    { text: `{count}`},
    { text: `{count}`},
    { text: `{count}`},
    { text: `{count}`},
    { text: `{count}`},
    { title: `Congratulations!`, text: `You pressed the button {count} times!!!` }
]

const DUMMY_RANDOM = [
    { title: `This site..`, text: `Sorry, it's not a real IDE.` },
    { title: `Buttons are decorations!`, text: `But you've already pressed them {count} times` },
    { title: `Hmm..`, text: `Did the terminal complete the installation of NPM packages?` }
]

document.addEventListener('click', dummyListener);
MODAL.$close.addEventListener('click', () => {
    MODAL.$window.classList.add('deactivate');
    MODAL.$header.classList.remove('deactivate');
})



function dummyListener(event) {
    const $element = event.target;
    if(!$element || !$element.classList.contains(DUMMY_ELEMENT)) return;
    openModal();
}

function openModal() {
    let item;
    if (openCounter < DUMMY_STORY.length) {
        item = DUMMY_STORY[openCounter];
    } else {
        item = DUMMY_RANDOM[getRandomInt(0, DUMMY_RANDOM.length)];
    }

    if (item === null) item = { title: '', text: '' };
    if (!item.title) item.title = '';
    if (!item.text) item.text = '';

    MODAL.$title.innerText = templating(item.title, openCounter + 1);
    MODAL.$text.innerText = templating(item.text, openCounter + 1);
    MODAL.$window.classList.remove('deactivate');
    MODAL.$header.classList.add('deactivate');

    openCounter++;
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function templating(string, openCount) {
    return string.replaceAll('{count}', openCount);
}

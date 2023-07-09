const TERMINAL = document.querySelector('#terminal-loader');
const CHARS = {
    blank: '.',
    fill: '#'
}

document.addEventListener("DOMContentLoaded", () => {
    const loader = document.createElement('span');
    loader.classList.add('terminal-loader');

    const loaderText = document.createElement('span');
    loaderText.classList.add('terminal-loader-text');

    TERMINAL.appendChild(loader);
    TERMINAL.appendChild(loaderText);

    let i = 0;
    let actions = getRandomActions();
    let spinner = '|'
    setInterval(() => {
        loaderChange(
            i,
            ` ${spinner[spinner.length-1]} ${actions}:@${randomString(getRandomInt(5, 15))}/${randomString(getRandomInt(3, 10))}:  <span class="system">${randomString(getRandomInt(5, 20))}</span><span class="git">@${getRandomInt(0, 10)}.${getRandomInt(1, 10)}.${getRandomInt(0, 10)}</span>`
        );
        if (i >= 100) i = 0;

        if (getRandomInt(0, 100) === 33) {
            i++;
        }

        if (getRandomInt(0,10) === 5) {
            actions = getRandomActions()
        }

        switch (spinner) {
            case '|': spinner += '/'; break;
            case '|/': spinner += '―'; break;
            case '|/―': spinner += '\\'; break;
            case '|/―\\': spinner += '/'; break;
            case '|/―\\/': spinner += '―'; break;
            case '|/―\\/―': spinner += '\\'; break;
            case '|/―\\/―\\': spinner = '|'; break;
        }

    }, 120)



    function loaderChange(percent, text) {
        const array = [];
        for (let i = 0; i < 100; i = i + 2) {
            if (i < percent) array.push(CHARS.fill);
            else array.push(CHARS.blank);
        }

        loader.innerHTML = `[${array.join('')}]`
        loaderText.innerHTML = text;
    }


    function randomString(len) {
        const chars = 'abcdefghijklmnopqrstuvwxyz';
        let string = '';
        for (let i = 0; i < len; i++) {
            const pos = getRandomInt(0, chars.length);
            string += chars.substring(pos, pos+1);
        }
        if (getRandomInt(0, 10) === 5) {
            string = `${string[0].toUpperCase()}${string.slice(1)}`
        }
        return string;
    }

    function getRandomActions() {
        const array = [
            'fetchMetadata',
            'extract',
            'extract',
            'loadDep',
            'diffTrees',
            'finalize'
        ];

        return array[getRandomInt(0, array.length)]
    }


    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

});

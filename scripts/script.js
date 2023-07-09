/**
 * A number, or a string containing a number.
 * @typedef {{
 * path: string,
 * fileName: string,
 * code:string,
 * elements: {
 *      $closeElement: HTMLSpanElement,
 *      $codeHeaderElement: HTMLDivElement
 * },
 * listeners: {
 *     close: function,
 *     header: function
 * }
 * }} IHeaderItem
 */


const $ELEMENTS = {
    code: {
        numbers: null,
        body: null,
        headers: {
            aboveCode: null
        }
    },
    menu: {
        body: null,
        items: []
    }
};

/**
 * @type { IHeaderItem[] } HEADER
 */
let HEADER_ITEMS = []

const ITEM_CLASS = 'ext-ts';

document.addEventListener("DOMContentLoaded", () => {
    $ELEMENTS.code.body = document.querySelector('#code-body');
    $ELEMENTS.code.numbers = document.querySelector('#code-numbers');
    $ELEMENTS.code.headers.aboveCode = document.querySelector('#code-header');
    $ELEMENTS.menu.body = document.querySelector('#menu-body');
    $ELEMENTS.menu.items = document.querySelectorAll(`#menu-body .${ITEM_CLASS}`);

    init()
});

/**
 * Get the file by name.
 * @param {string} path
 * @param {string} name
 * @returns {Promise<string | null>}
 */
async function uploadFile(path, name) {
    try {
        let response = await fetch(`../pages/${path}/${name}`);

        if (!response.ok) throw new Error('Failed to load page');

        return response.text();
    } catch (e) {
        console.error(e);
        return null;
    }
}

/**
 * Install the new code and restart the prism.
 * @param {string} text
 * @returns {void}
 */
function setCode(text) {
    if (!$ELEMENTS.code.body || !$ELEMENTS.code.numbers) return;
    $ELEMENTS.code.body.innerHTML = text;
    window.Prism.highlightElement($ELEMENTS.code.body);
}

/**
 * Controls the opening of files.
 * @param {{path: string, fileName: string, code:string}} data
 * @returns {void}
 */
function openingFileController(data) {
    codeHeaders(data);

    /**
     * Creates a clickable header above the code area.
     * @param {{path: string, fileName: string, code:string}} data
     * @returns {void}
     */
    function codeHeaders(data) {
        const foundItem = find(data.fileName, data.path);

        if (foundItem) {
            selectItem(foundItem);
        } else {
            const newItem = create(data);
            if (!newItem) return;

            const item = {
                fileName: data.fileName,
                path: data.path,
                code: data.code,
                elements: {
                    $closeElement: newItem.$close,
                    $codeHeaderElement: newItem.$item
                },
                listeners: {
                    close: newItem.closeListener,
                    header: newItem.headerListener
                }
            };

            HEADER_ITEMS.push(item);
            selectItem(item);
        }

        renderHeaders();


        /**
         * @param {string} name
         * @param {string} path
         * @returns {IHeaderItem | undefined}
         */
        function find(name, path) {
            return HEADER_ITEMS.find(
                item => item.fileName === name && item.path === path
            );
        }

        /**
         * @param {{path: string, fileName: string, code:string}} data
         * @returns {{$item: HTMLDivElement, $close: HTMLSpanElement, closeListener: function, headerListener: function} | null}
         */
        function create(data) {
            const $element = document.createElement('div');
            $element.classList.add('header-item');
            $element.innerText = data.fileName;
            $element.dataset.path = data.path;
            $element.dataset.name = data.fileName;
            $element.addEventListener('click', headerOnClickEventListener);


            const $close = document.createElement('span');
            $close.classList.add('header-item-close');
            $close.innerText = 'close';
            $close.addEventListener('click', closeOnClickEventListener);
            $element.appendChild($close);

            return {
                $item: $element,
                $close: $close,
                closeListener: closeOnClickEventListener,
                headerListener: headerOnClickEventListener
            };
        }

        /**
         * Click event handler for the close button.
         * @param {MouseEvent} event
         * @returns {void}
         */
        function closeOnClickEventListener(event) {
            const $target = event.target;
            if (!$target) return;
            const $parent = $target.parentElement;
            const foundItem = find($parent.dataset.name, $parent.dataset.path);
            if (!foundItem) return;

            closeFile(foundItem);
        }

        /**
         * Click event handler for the close button.
         * @param {MouseEvent} event
         * @returns {void}
         */
        function headerOnClickEventListener(event) {
            const $target = event.target;
            if (!$target) return;
            const foundItem = find($target.dataset.name, $target.dataset.path);
            if (!foundItem) return;

            selectItem(foundItem);
        }
    }


    /**
     * Closes the transferred file.
     * @param {IHeaderItem} item
     * @returns {void}
     */
    function closeFile(item) {
        item.elements.$closeElement.removeEventListener('click',item.listeners.close);
        item.elements.$codeHeaderElement.removeEventListener('click',item.listeners.header);

        if (item.elements.$codeHeaderElement.classList.contains('active')) {
            if (HEADER_ITEMS.length > 1) {
                let activeItem = null;
                let removeIndex = -1;
                for (let index = 0; index < HEADER_ITEMS.length; index++) {
                    const currentHeaderItem = HEADER_ITEMS[index];

                    if (item.elements.$codeHeaderElement === currentHeaderItem.elements.$codeHeaderElement) {
                        if ((index - 1) > -1) activeItem = HEADER_ITEMS[index-1];
                        else activeItem = HEADER_ITEMS[index + 1];
                        removeIndex = index;
                        break;
                    }
                }
                if (activeItem) {
                    activeItem.elements.$codeHeaderElement.classList.add('active');
                }
                HEADER_ITEMS = HEADER_ITEMS.filter(function (_, i) {
                    return i !== removeIndex;
                });
            } else {
                HEADER_ITEMS = [];
            }
        } else {
            for (let index = 0; index < HEADER_ITEMS.length; index++) {
                const currentHeaderItem = HEADER_ITEMS[index];
                if (item.elements.$codeHeaderElement === currentHeaderItem.elements.$codeHeaderElement) {
                    HEADER_ITEMS = HEADER_ITEMS.filter(function (_, i) {
                        return index !== i;
                    });
                    break;
                }
            }
        }
        renderHeaders()
    }

    function selectItem(item) {
        HEADER_ITEMS.forEach(item => item.elements.$codeHeaderElement.classList.remove('active'));
        item.elements.$codeHeaderElement.classList.add('active');
        renderHeaders();
    }

    function renderHeaders() {
        $ELEMENTS.code.headers.aboveCode.innerHTML = '';
        setCode('');
        HEADER_ITEMS
            .forEach(item => {
                $ELEMENTS.code.headers.aboveCode.appendChild(item.elements.$codeHeaderElement)
                if (item.elements.$codeHeaderElement.classList.contains('active')) {
                    setCode(item.code)
                }
            });
    }
}

/**
 * Gets the path to the file by going through the DOM elements.
 * @param {HTMLElement} $element
 * @returns {string}
 */
function createPath($element) {
    const pathArray = []

    const $parent = $element.parentElement;

    let $previous = $parent.previousElementSibling;

    let amountOfIndent = $parent.querySelectorAll('.line-v-gap').length;


    while (amountOfIndent > 1) {
        let dirName = checkDir($previous, amountOfIndent);
        if (dirName) {
            amountOfIndent = dirName.amountOfIndent;
            pathArray.push(dirName.name)
        }
        $previous = $previous.previousElementSibling;
    }

    return pathArray.reverse().join('/');


    /**
     * Checks the item, for the presence of folders.
     * @param {HTMLElement} $element
     * @param {number} amountOfIndent
     * @returns {{name: string, amountOfIndent: number} | null}
     */
    function checkDir($element, amountOfIndent) {
        const $foundElement = $element.querySelector('.dir');

        if (!$foundElement) return null;

        if (
            $element.querySelectorAll('.line-v-gap').length >= amountOfIndent
        ) return null;

        return {
            name: $foundElement.innerText,
            amountOfIndent: $element.querySelectorAll('.line-v-gap').length
        };
    }
}




async function init () {
    if(!$ELEMENTS.menu.body) return;
    $ELEMENTS.menu.body.addEventListener('click', menuOnClickEventListener);

    const code = await uploadFile('', 'main.ts');
    if (!code) return;
    openingFileController({path: '', fileName: 'main.ts', code: code})
}


/**
 * Click event handler for the menu.
 * @param {MouseEvent} event
 * @returns {void}
 */
async function menuOnClickEventListener(event) {
    const $target = event.target
    if (!$target || !$target.classList.contains(ITEM_CLASS)) return

    const fileName = $target.innerText.trim();
    const path = createPath($target);
    const code = await uploadFile(path, fileName);
    if (!code) return;
    openingFileController({
        fileName: fileName,
        path: path,
        code: code
    });
}





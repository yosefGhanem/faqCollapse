const tagsEl = document.getElementById('tags')
const textarea = document.getElementById('textarea')

/*when going to the page it will automatically put cursor there to start typing*/
textarea.focus()
/*You can search as well for setTimeOut */
textarea.addEventListener('keyup', (e) => {
    createTags(e.target.value)
    /*Wait couple of milli seconds before doing that*/
    if(e.key === 'Enter') {
        setTimeout(() => {
            /*clear input value*/
            e.target.value = ''
        }, 50)/*50 milliseconds*/

        randomSelect()
    }
})



function createTags(input) {
    /*this to remove spaces while adding to list*/
    const tags = input.split(',').filter(tag => tag.trim() !== '').map(tag => tag.trim())
    
    /*clear tags element*/
    tagsEl.innerHTML = ''

    tags.forEach(tag => {
        /*Hiding choice buttons */
        const tagEl = document.createElement('span')
        tagEl.classList.add('tag')
        tagEl.innerText = tag
        tagsEl.appendChild(tagEl)
    })
}

function randomSelect() {
    const times = 30

    /*This is causing shifting between tags
    also highlighting and highlighting*/
    const interval = setInterval(() => {
        const randomTag = pickRandomTag()
	
	if (randomTag !== undefined) {
        highlightTag(randomTag)

        setTimeout(() => {
            unHighlightTag(randomTag)
        }, 100)
	}
    }, 100);
    /*This is causing of stopping it*/
    setTimeout(() => {
        clearInterval(interval)
        /*pick a random tag to stop on*/
        setTimeout(() => {
            const randomTag = pickRandomTag()

            highlightTag(randomTag)
        }, 100)

    }, times * 100)
}

function pickRandomTag() {
    /*get all elements of class tag*/
    const tags = document.querySelectorAll('.tag')

    /*To give us a random tag
    in here a nodelist which is similar to an array*/
    return tags[Math.floor(Math.random() * tags.length)]
}

function highlightTag(tag) {
    tag.classList.add('highlight')
}

function unHighlightTag(tag) {
    tag.classList.remove('highlight')
}
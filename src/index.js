console.log('%c HI', 'color: firebrick')

document.addEventListener("DOMContentLoaded", () => {
    let container = document.getElementById("dog-image-container")
    // console.log(container);
    const imgURL = "https://dog.ceo/api/breeds/image/random/4";
    const breedUrl = 'https://dog.ceo/api/breeds/list/all';
    const ulContainer = document.getElementById("dog-breeds");
    const dropDown = document.getElementById("breed-dropdown")
    let breedsArray = [];

    ulContainer.addEventListener("click", handleClick);
    dropDown.addEventListener("change", handleChange)

    function getImages() {
        fetch(imgURL)
        .then(resp => resp.json())
        .then(images => { //receiving back the data
            const imgs = images.message
            // debugger;
            // take this array of elements, turn into img elements
            let imgsArray = createImgElement(imgs)
            // console.log(imgsArray);
            renderImgs(imgsArray)
        }) 
    }
    
    function createImgElement(imgs) {
        return imgs.map((img) => { // iterating the array, map() will modifiy each element and return an array with the modified element
            let i = `<img src=${img}>`
            // console.log(i)
            return i
        })
    }
    
    function renderImgs(imgsArray){
        // append each img element to the DOM
        imgsArray.forEach(element => {
            renderElement(element)
        })
    }
    
    function renderElement(element) {
        ulContainer.innerHTML += element // every time the array is iterated, it will add the next element instead of overwriting the innerHTML
        // = sign only shows one element
    }

    function getBreeds(){
        fetch(breedUrl)
        .then(resp => resp.json())
        .then(breeds => { 
            breedsArray = Object.keys(breeds.message)
            // debugger;
            const breedsLis = createLiElement(breedsArray)
            renderLis(breedsLis)
        }) 
    }

    function createLiElement(breedsArray) {
        return breedsArray.map((breed) => { // iterating the array, map() will modifiy each element and return an array with the modified element
            let li = `<li>${breed}</li>`
            // console.log(li)
            return li
        })
    }

    function renderLis(breedsLis){
        // append each img element to the DOM
        breedsLis.forEach(element => {
            renderElement(element)
        })
    }
    
    function handleClick(e) { // toggle the text from blue to black when clicked
        // debugger;
        if(e.target.nodeName === 'LI') { // highlighting only one specific li is clicked
            if (e.target.style.color === 'blue') {
                e.target.style.color = 'black'
            } else {
                e.target.style.color = 'blue'
            }

        }
    }

    function handleChange(e){ // Dropdown are input fields so use .value to locate element
        // debugger;
        const letter = e.target.value;
        // filter out the breeds
        // console.log(breedsArray)
        const filterBreeds = breedsArray.filter(breed => breed.startsWith(letter))
        const filterBreedsLis = createLiElement(filterBreeds)
        ulContainer.innerHTML = ''
        renderLis(filterBreedsLis)
    }

    getImages();
    getBreeds();
})
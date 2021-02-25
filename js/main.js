const pokedex = document.getElementById("pokedex")
const pokeSearch = document.getElementById("searchBox")
let pokeValue = ''
let pokemon = {}
const audio = document.querySelector('#pokeAudio')



// POKEMON STUFF





const fetchPokemon = () => {

  const promises = []
  for(let i=1;i<=150;i++){
  const url = ` https://pokeapi.co/api/v2/pokemon/${i}`
  promises.push(fetch(url).then((res) => res.json()))
  }

  Promise.all(promises).then((results) =>{

    pokemon = results.map((data) => ({
          
          name: data.name,
          id: data.id,
          image: data.sprites.front_default,
          pokemonType: data.types.map((type)=> type.type.name).join(", ")
      
    }))
    displayPokemon(pokemon)
  })
    
}

const displayPokemon = (pokemonObj) =>{
  const pokeHTMLString = pokemonObj.map(char=>`
    <li class="card">
        <img class="card-image" src="${char.image}">
        <h2 class="card-title">${char.id}. ${char.name} </h2>
        <p class="card-subtitle">Type: ${char.pokemonType} </p>
    </li>
    `).join('')
      pokedex.innerHTML = pokeHTMLString
}



const showPokemon = () => {
  audio.play()
  const showUrl = ` https://pokeapi.co/api/v2/pokemon/${pokeValue}`
  fetch(showUrl)
  .then((res)=> res.json())
  .then((data)=>{
    console.log(data)
    let pokeWeight = data.weight.toString()
    let fractionWeight = pokeWeight.length-1
    let displayWeight = pokeWeight.slice(0, fractionWeight) + "." + pokeWeight.slice(fractionWeight)+"KG"
    
    // let pokeWeight = pokeWeightData.insert(pokeWeightData.length -1, ".")
    let pokeHeight = data.height + "0"+"cm"
    // console.log(pokeWeight)
    let pokeId = data.id
    let pokeFind = pokemon[pokeId -1]
   
    document.querySelector('.modalImg').src = pokeFind.image
    document.querySelector('.modalTitle').innerText = pokeFind.name
    document.querySelector('.modalSubtitle').innerText = pokeFind.pokemonType
    document.querySelector('.modalHeight').innerText = `Height: ${pokeHeight}`
    document.querySelector('.modalWeight').innerText = `Weight: ${displayWeight}`
    
  })
}


// event listeners 

pokeSearch.addEventListener('keyup', (event)=>{
  pokeValue = pokeSearch.value.toLowerCase()
  
  if(event.key == "Enter"){
    modal.style.display = "block"
    showPokemon()

      }
})
// Modal WINDOW STUFF

let modal = document.getElementById("myModal");

// Get the button that opens the modal
let btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
  showPokemon()
}
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}




fetchPokemon()
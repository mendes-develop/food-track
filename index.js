
console.log("Hello app");

// API Keys and URL's
const clientID = "Om5-acai0P3D4mQ69JofQw";
const apiKey = ENV['KEY']
const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
const yelpURL = "https://api.yelp.com/v3/businesses/search"
const favoritesURL = "http://localhost:3000/favorites"

// Global DOM elements
let mainDIV = document.querySelector('.restaurants-collection')
let searchFORM = document.getElementById('search-form')
let locationArray = ["Manhattan", "Brooklyn", "Queens", "Staten Island", "Bronx", "Jersey City"]

// Search for restaurants
searchFORM.addEventListener('submit', (event) => {
  event.preventDefault()
  let location = event.target.location.value
  let category = event.target.category.value

  if (location === "" || category === "") {
    alert("Please, select a Location and a Category")
    return
  }
  mainDIV.innerHTML = ''
  loadRestaurants(location, category)
})


// Restaurants API GET Request
function loadRestaurants(location, category){
  fetch(proxyUrl + yelpURL + `?location=${location}&term=${category}`, {
    method: "GET",
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      "Authorization": `Bearer ${apiKey}`
    }
  })
  .then(resp => resp.json())
  .then(jsonObject => {

    jsonObject.businesses.forEach((restaurant) => {
      addElementsToDOM(restaurant)
    })
  })
}

// Populates the DOM with restaunrantes data
function addElementsToDOM(restaurant){

  let restaurantDIV = document.createElement('div')
  let restaurantNameH3 = document.createElement('h3')
  let restaurantPriceH4 = document.createElement('h4')
  let restaurantIMG = document.createElement('img')
  let restaurantLocP = document.createElement('p')
  let favoriteButton = document.createElement('button')

  restaurantDIV.className = 'restaurant-box'
  restaurantNameH3.innerText = restaurant.name
  restaurantPriceH4.innerText = (restaurant.price === undefined ? "No Record" : restaurant.price)
  restaurantIMG.className = 'restaurant-img'
  restaurantIMG.src = restaurant.image_url
  restaurantLocP.innerText = restaurant.location.address1 + ", " + restaurant.location.city
  favoriteButton.innerText = "Favorite"
  favoriteButton.className = "favorite-button"

  favoriteButton.addEventListener("click", (event) => {
    alert(`${restaurant.name} was added to your favorites.`)
    favoriteRestaurant(restaurant)
  })
  restaurantDIV.append(restaurantNameH3, restaurantPriceH4, restaurantIMG, restaurantLocP,favoriteButton)
  mainDIV.append(restaurantDIV)
}


function favoriteRestaurant(restaurant) {

  let restaurantName = restaurant.name
  let restaurantPrice = (restaurant.price === undefined ? "No Record" : restaurant.price)
  let restaurantImgURL = restaurant.image_url
  let restaurantStreet = restaurant.location.address1
  let restaurantCity = restaurant.location.city
  let restaurantCategory = restaurant.categories

  fetch(favoritesURL, {
    method: "POST",
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({

      name: restaurantName,
      price: restaurantPrice,
      imgURL: restaurantImgURL,
      street: restaurantStreet,
      city: restaurantCity,
      categories: restaurantCategory

    })
  })
  .then(resp => resp.json())
  .then(jsonObject => {
    console.log(jsonObject)
  })


}





//

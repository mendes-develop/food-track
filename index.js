
console.log("Hello app");

const clientID = "Om5-acai0P3D4mQ69JofQw";
const apiKey = "9rUochue7aPfDlW_vNORjwX51GSn7-gbT1e9QTM5o2DvfWPbnEP84OuC_MAtyLQphdyozV0UeFg5TX2ovHIeE8tgPSxtCoxRxrDtq8ywgWql9kIQmHZq-J7LJ76gXXYx"

const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
const yelpURL = "https://api.yelp.com/v3/businesses/search"

const mainDIV = document.querySelector('.restaurants-collection')

let locationArray = ["Manhattan", "Brooklyn", "Queens", "Staten Island", "Bronx", "Jersey City"]


fetch(proxyUrl + yelpURL + `?location=nyc&term=pizza`, {
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
    addElementsDOM(restaurant)
  })
})

function addElementsDOM(restaurant){

  let restaurantDIV = document.createElement('div')
  restaurantDIV.className = 'restaurant-box'
  let restaurantH2 = document.createElement('h2')
  let restaurantIMG = document.createElement('img')
  restaurantIMG.className = 'restaurant-img'
  let favoriteButton = document.createElement('button')

  favoriteButton.innerText = "Favorite"
  restaurantH2.innerText = restaurant.name
  restaurantIMG.src = restaurant.image_url

  mainDIV.append(restaurantDIV)
  restaurantDIV.append(restaurantH2, restaurantIMG, favoriteButton)







}



// fetch("https://api.yelp.com/v3/businesses", {
//
//   method: "POST",
//   headers: {
//
//     'Content-type':'application/json',
//     'Accept':'application/json',
//     "Authorization: Bearer <9rUochue7aPfDlW_vNORjwX51GSn7-gbT1e9QTM5o2DvfWPbnEP84OuC_MAtyLQphdyozV0UeFg5TX2ovHIeE8tgPSxtCoxRxrDtq8ywgWql9kIQmHZq-J7LJ76gXXYx>"
//
//   },
//   body: {}
// })
//
//
// .then(resp => resp.json())
// .then(jsonObject => {
//   console.log(jsonObject);
// })


  // fetch("https://api.yelp.com/v3/businesses/search?=newyork", {
  //   method: "POST",
  //   headers: {
  //     "Authorization" : `Bearer ${apiKey},
  //     "Content- Type" : "application/json",
  //     'Accept' : 'application/json'
  //   },
  //   body: {}
  // })
  //
  // then.(resp => resp.json())
  // then.(object => {
  // //   console.log(object);
  // })

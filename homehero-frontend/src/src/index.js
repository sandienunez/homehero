// ********* global constants = so I don't have to repeat myself ************
const BASE_URL = "http://localhost:3000/listings";
const main = document.querySelector('#main');
const listingFormDiv = document.getElementById("listing-form");
const addForm = document.querySelector("#add-listing-form")

  //initialize Listing class
//   const listing = new Listing()
// ********* startup routine => make fetch to get initial data *********** //

document.addEventListener('DOMContentLoaded', () => {
    fetchAllListings()
    // debugger
    addForm.addEventListener("click", createListing);

});
// ************************* requests to backend ************************ //
function fetchAllListings() { 
    fetch(BASE_URL)    // get request
    .then(response => response.json())
    .then(listings => {
        listings.forEach(element => { //iterate through collection of listings
     
            main.innerHTML += `
            <p>******************************************************************************************************************************************</p>
            <h3>Ad Name:</h3><p>${element.ad_name}</p>
            <h3>Business Name:</h3><p>${element.business_name}</p>
            ` 
// <h3>Home Service:</h3><p>${listing.home_service_id}</p>

        });
        
        // attachClicksToLinks()
    })
}

// ************************* helpers for generating HTML and adding event listeners ************************ //
function makeListingObjects(listing) {
    return (`
    <h3>${listing.ad_name}<h3>
    <p>${listing.business_name}</p>
    `)
}
   // html string with interpolation, give anchor tags id, interpolate stuff about listing

function attachClicksToLinks(){

}

// function displayListingForm(){
    
//     event.preventDefault()
// console.log("click")
// }

// Strategy:
// 1. grab node in console = confirm yu can get it in the console 
// 2. call add event listener = listen for event to be triggered
// 3. call that function (make it empty to begin with )
// 4. make a function that displaysForm 

function makeForm() {
    // debugger
    event.preventDefault()
    let createForm = document.getElementById("create-form")
    //in our index.html =saving location into a variable createForm, that location is saved
    //<!-- <button class=”submit”>Create</button> --> 
    createForm.innerHTML = ""
    createForm.innerHTML += `
    <form>
    <label>Home Service Name:</label>
    <br>
    <select id="home-service-name" size=5>
<option value="1">House Cleaning 
<option value="2">Painting
<option value="3">Floors/Sanding 
<option value="4">Roofing
<option value="5">Heating
<option value="6">Electricity 
<option value="7">Air Conditioning 
<option value="8">Window Washing
<option value="9">Carpet Cleaning
<option value="10">Plumbing
<option value="11">Landscaping 
<option value="12">House Remodeling/Building Decks
</select>
</option>
<br>
<br>
<label>Ad Name:</label>
<input type="text" id="ad-name">
<br>
<br>
<label>Business Name:</label>
<input type="text" id="business-name">
<br>

<br>

</input>
<input type="submit">
</form>
` 
document.getElementById("create-form").addEventListener("submit", createListing) //triggers that function
// debugger
    // in that location in the innerHTML add string 
}

// function displayListing(){ // event handler //
//     event.preventDefault()
//     // debugger
//     const listingsUL = document.querySelector("#main ul")
//     listingsUL.innerHTML = ""
//    const homeservice = event.target.querySelector("select").value
   
//     const listing = { 
//     // types: document.querySelector('#types').value,
//     ad_name: document.querySelector('#ad-name').value, //key value pair
//     business_name: document.querySelector('#business-name').value,
//     //add key
//     home_service_id: homeservice
// }
// document.querySelector("add-listing-form").reset(); //remove
//     const configObj = {
//         method: 'POST',
//         body: JSON.stringify(listing),
//         headers: {
//             'Content-Type': 'application/json', 
//             'Accept': 'application/json'
//         }
//     }
//     // debugger
// //post request to db
// //get what i need out of form, post request to backend API

// fetch(BASE_URL, configObj) //fetch resources asynchronously across the network
// //path to the resource you want to fetch
// .then(response => response.json()) //returns a promise containing the HTTP response object (not json
// //To extract the JSON body content from the response, we use the json() method )
// .then(listing => { 
//     console.log(listing)
//     //logic
//     //make nodes h3 set innertext 
//     let displayads = main.innerHTML `
//     <h3> ads here </h3>
//     `
    
// })
// }
function clearUL(){
    const listingsUL = document.querySelector("#main ul")
    listingsUL.innerHTML = ""

}
function createListing(){
    event.preventDefault()
    clearUL()
    const listing = { 
        ad_name: document.querySelector('#ad-name').value, 
    business_name: document.querySelector('#business-name').value,
    home_service_id: document.querySelector('#home-service-name').value
    }

    const configObj = {
        method: 'POST',
        body: JSON.stringify(listing),
        headers: {
            'Content-Type': 'application/json', 
            'Accept': 'application/json'
        }
    }
    
    fetch(BASE_URL, configObj)
    .then(response => response.json())
    .then(listing => {
        console.log(listing)
        const ls = new Listing(listing)
        main.querySelector("ul").innerHTML += ls.renderListing()
        attachClicksToLinks()
        listingFormDiv.innerHTML = ""
    }) 
}

function newUserForm() {
     const userForm =    `<div class="fullscreen" id="new-user-form">
                             <h2>Welcome traveler!</h2>
                             <h2>What is your name?"</h2><br>
                             <form>
                                 <input type="text" id="username" username="username" required minlength="2" placeholder="Name" size="30">
                                 <br><input type="submit" value="Lets go!">
                             </form>
                         </div>`;
     const userName = document.getElementById("user-form");
     userName.innerHTML = userForm;
     document.getElementById("new-user-form").addEventListener("submit", createUser)
    }
    function createUser() {
     event.preventDefault();
        const user = {
         username: document.getElementById("username").value,
     }
        fetch(BASE_URL + "/users", {
         method: "POST",
         body: JSON.stringify(user),
         headers: { 
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
     })
     .then(response => response.json())
     .then(user => {
         document.getElementById("username").innerHTML += "Hello, " + `${user.username}` + "!";
     })
     clearForm();
    }
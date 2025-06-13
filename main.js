const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search');
const resultContainer = document.getElementById('result-container');
const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
const cartTable = document.getElementById('cart-table');

const cartItems = [];

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        searchItems(searchTerm);
    }
});




// Drink card( Drink Name + Drink  Category+ Instructions(15 Letters) + Button (Add to group , Details) → 16

async function searchItems(searchTerm) {
    try {
        showLoading();
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`);
        const data = await response.json();
        console.log(data);
        if (data.drinks.length === 0 || data.drinks === null) {
            showNotFound();
        } else {
            showSearchResult(data.drinks);
        }
    } catch (error) {
        showNotFound();
        console.log(error);
    }
}



function showSearchResult(drinks) {
    let drinksHTML = '';
    drinks.forEach(drink => {
        drinksHTML += `
        <!-- single item card starts-->
        <div class="col-md-4 text-center">
            <div class="card p-2 mt-4">
            <div class="card-block">
            <img class="card-img-top rounded" src="${drink.strDrinkThumb}" alt="Card image cap">
                    <h4 class="card-title py-2">${drink.strDrink}</h4>
                    <p class="card-text text-muted">Category : ${drink.strCategory}</p>
                    <p class="card-text text-muted">${drink.strInstructions.slice(0, 15)}...</p>
                    <!-- Button trigger modal -->
                    <button type="button" class="btn btn-outline-warning" data-bs-toggle="modal" data-bs-target="#exampleModal_${drink.idDrink}">
                        Details
                    </button>

                    <!-- Modal -->
                    <div class="modal fade text-start" id="exampleModal_${drink.idDrink}" tabindex="-1" aria-labelledby="exampleModalLabel_${drink.idDrink}" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel_${drink.idDrink}">${drink.strDrink}</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                        <img class="card-img-top rounded my-2" src="${drink.strDrinkThumb}" alt="Card image cap">
                        <h4>Details</h4>
                        <p> <span class="rounded border p-1 font-weight-bold">Category</span> : ${drink.strCategory}</p>
                        <p> <span class="rounded border p-1 font-weight-bold">Alcoholic</span> : ${drink.strAlcoholic}</p>
                        <p> <span class="rounded border p-1 font-weight-bold">Glass</span> : ${drink.strGlass}</p>
                        <p> <span class="rounded border p-1 font-weight-bold">Instructions</span> : ${drink.strInstructions}</p>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                        </div>
                    </div>
                    </div>
                    <!-- Modal Ends -->


                    <button type="button" class="btn btn-warning ms-2 add-to-cart-btn" >Add to Cart </button>

                   
                </div>
            </div>
        </div>
        <!-- single item card ends-->
    `
    });

    resultContainer.innerHTML = drinksHTML;
}

document.body.addEventListener('click', function (e) {
    if (e.target && e.target.classList.contains('add-to-cart-btn')) {
      const mainCard = e.target.parentElement;
      const drinkName = mainCard.querySelector('.card-title').textContent;
      const drinkImage = mainCard.querySelector('.card-img-top').src;
      const drinkId = mainCard.querySelector('.card-img-top').alt;
      if(cartItems.length >=7){
          alert('You can only add 7 items to the cart');
      }else{
          cartItems.push({ drinkName, drinkImage, drinkId });
          propagateCart();
      }   
    }
  });
function propagateCart() {
    let cartHTML = `<tr class="table-header">
                        <th>SL</th>
                        <th>IMG</th>
                        <th>Item Name</th>
                    </tr>`;
    cartItems.forEach((item,index) => {
        const cartItemHTML = `
        <tr class="cart-item">
                        <td>${index+1}</td>
                        <td class="text-center vertical-align-middle"><img class="rounded-circle" width="50px" height="50px" src="${item.drinkImage}" alt=""></td>
                        <td class="vertical-align-middle">${item.drinkName}</td>
        </tr>
        `;
        cartHTML += cartItemHTML;
    });
    cartTable.innerHTML = cartHTML;
    document.getElementById('total-cart-items').textContent = cartItems.length;
}


function showNotFound() {
    const NOT_FOUND = `
     <!-- not found -->
      <div class="col-md-12" id="not-found">
        <div class="bg-danger text-white p-3 rounded text-center">
          <h2 class="text-center">Could Not Found Any Item !</h2>
          <p class="text-center">Please Try Again !</p>
          <p class="text-center">ভ্রুম ভ্রুম ভ্রুম 😛😛😛</p>
          <a href="/" class=" my-2 bg-warning p-2 rounded">Back to Home</a>
        </div>
      </div>
      <!-- not found ends -->
`

    resultContainer.innerHTML = NOT_FOUND;
}


function showLoading() {

    const LOADING = `
    <!-- loading -->
    <div class="col-md-12" id="loading">
    <div class="bg-warning text-white p-3 rounded">
        <h2 class="text-center">Loading...</h2>
        <p class="text-center">Please Wait !</p>
        <p class="text-center">ভ্রুম ভ্রুম ভ্রুম 😛😛😛</p>
    </div>
    </div>
    <!-- loading ends -->

`

    resultContainer.innerHTML = LOADING;
}







































const ITEM_DETAILS = `
<!-- item details starts -->
        <div class="col-md-12" id="item-details">
          <div class="card m-2 p-2">
            <img class="card-img-top rounded w-100 object-fit-cover" width="200px" height="300"  src="https://www.themealdb.com/images/media/meals/c9a3l31593261890.jpg" alt="Card image cap">
            <div class="card-block">
              <h4 class="card-title py-2">Item Name</h4>
              <p class="card-text text-muted">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <ul>
                <li>Item Name : quantity</li>
                <li>Item Name : quantity</li>
                <li>Item Name : quantity</li>
                <li>Item Name : quantity</li>
                <li>Item Name : quantity</li>
              </ul>
              <a href="#" class=" d-block w-100 my-2">See source</a>
            </div>
          </div>
        </div>
<!-- item details ends -->
`




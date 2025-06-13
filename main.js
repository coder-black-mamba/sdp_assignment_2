const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search');
const resultContainer = document.getElementById('result-container');

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
        }else{
            showSearchResult(data.drinks);
        }
    } catch (error) {
        showNotFound();
        console.log(error);
    }
}



function showSearchResult(drinks){
    let drinksHTML = '';
    drinks.forEach(drink => {
        drinksHTML += `
        <!-- single item card starts-->
        <div class="col-md-4 text-center">
            <div class="card p-2 mt-4">
                <img class="card-img-top rounded" src="${drink.strDrinkThumb}" alt="Card image cap">
                <div class="card-block">
                    <h4 class="card-title py-2">${drink.strDrink}</h4>
                    <p class="card-text text-muted">Category : ${drink.strCategory}</p>
                    <p class="card-text text-muted">${drink.strInstructions.slice(0, 15)}...</p>
                    <button type="button" class="btn btn-outline-warning  " onclick="showItemDetails(${drink.idDrink})">Details </button>
                    <button type="button" class="btn btn-warning ms-2" onclick="addToCart(${drink.idDrink})">Add to Cart </button>
                </div>
            </div>
        </div>
        <!-- single item card ends-->
    `
    }); 

    resultContainer.innerHTML = drinksHTML;
}
    

async function showItemDetails(drink_id){
    try {
        showLoading();
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drink_id}`);
        const data = await response.json();
        console.log(data);
        // scroool to top
        window.scrollTo(0, 0);
        if (data.drinks === null ||data.drinks.length === 0) {
            showNotFound();
        }else{
            resultContainer.innerHTML = `
            <!-- item details starts -->
                <div class="col-md-12" id="item-details">
                <div class="card m-2 p-2">
                    <img class="card-img-top rounded w-100 object-fit-cover" width="200px" height="300"  src="${data.drinks[0].strDrinkThumb}" alt="Card image cap">
                    <div class="card-block">
                    <h4 class="card-title py-2">${data.drinks[0].strDrink}</h4>
                    <p class="card-text text-muted">${data.drinks[0].strInstructions}</p>
                    <ul>
                        <li>${data.drinks[0].strIngredient1 || 'N/A'} : ${data.drinks[0].strMeasure1 || 'N/A'}</li>
                        <li>${data.drinks[0].strIngredient2 || 'N/A'} : ${data.drinks[0].strMeasure2 || 'N/A'}</li>
                        <li>${data.drinks[0].strIngredient3 || 'N/A'} : ${data.drinks[0].strMeasure3 || 'N/A'}</li>
                        <li>${data.drinks[0].strIngredient4 || 'N/A'} : ${data.drinks[0].strMeasure4 || 'N/A'}</li>
                        <li>${data.drinks[0].strIngredient5 || 'N/A'} : ${data.drinks[0].strMeasure5 || 'N/A'}</li>
                        <li>${data.drinks[0].strIngredient6 || 'N/A'} : ${data.drinks[0].strMeasure6 || 'N/A'}</li>
                        <li>${data.drinks[0].strIngredient7 || 'N/A'} : ${data.drinks[0].strMeasure7 || 'N/A'}</li>
                        <li>${data.drinks[0].strIngredient8 || 'N/A'} : ${data.drinks[0].strMeasure8 || 'N/A'}</li>
                        <li>${data.drinks[0].strIngredient9 || 'N/A'} : ${data.drinks[0].strMeasure9 || 'N/A'}</li>
                        <li>${data.drinks[0].strIngredient10 || 'N/A'} : ${data.drinks[0].strMeasure10 || 'N/A'}</li>
                        <li>${data.drinks[0].strIngredient11 || 'N/A'} : ${data.drinks[0].strMeasure11 || 'N/A'}</li>
                        <li>${data.drinks[0].strIngredient12 || 'N/A'} : ${data.drinks[0].strMeasure12 || 'N/A'}</li>
                        <li>${data.drinks[0].strIngredient13 || 'N/A'} : ${data.drinks[0].strMeasure13 || 'N/A'}</li>
                        <li>${data.drinks[0].strIngredient14 || 'N/A'} : ${data.drinks[0].strMeasure14 || 'N/A'}</li>
                        <li>${data.drinks[0].strIngredient15 || 'N/A'} : ${data.drinks[0].strMeasure15 || 'N/A'}</li>
                        <li>${data.drinks[0].strIngredient16 || 'N/A'} : ${data.drinks[0].strMeasure16 || 'N/A'}</li>
                        <li>${data.drinks[0].strIngredient17 || 'N/A'} : ${data.drinks[0].strMeasure17 || 'N/A'}</li>
                        <li>${data.drinks[0].strIngredient18 || 'N/A'} : ${data.drinks[0].strMeasure18 || 'N/A'}</li>
                        <li>${data.drinks[0].strIngredient19 || 'N/A'} : ${data.drinks[0].strMeasure19 || 'N/A'}</li>
                        <li>${data.drinks[0].strIngredient20 || 'N/A'} : ${data.drinks[0].strMeasure20 || 'N/A'}</li>
                    </ul>
                    <div class="my-4">
                    <iframe
                        width="100%"
                        height="400"
                        src="https://www.youtube.com/embed/${data.meals[0].strYoutube.split("v=")[1]}"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen>
                    </iframe>
                    </div>
                    <a href="${data.meals[0].strSource}" class=" d-block w-100 my-2">See source</a>
                </div>
                </div>
            <!-- item details ends -->
            
            `;
        }
    } catch (error) {
        showNotFound();
        console.log(error);
    }   
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




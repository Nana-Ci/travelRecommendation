// OnClick function
function createHTMLToShow(){
    const userSearchInput=document.getElementById("searchInput").value.toLowerCase();
    if(userSearchInput=== ""){
        alert("Please enter your keyword");
        return;
    }
    fetch('./travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {
    if (userSearchInput === "country" || userSearchInput === "countries") {
        dataToShow = data.countries.flatMap(country => country.cities);
        showSearchResult(dataToShow);
        resetInput();
    } else if (userSearchInput === "temple" || userSearchInput === "temples") {
        dataToShow = data.temples;
        showSearchResult(dataToShow);
        resetInput();
    } else if (userSearchInput === "beach" || userSearchInput === "beaches") {
        dataToShow = data.beaches;
        showSearchResult(dataToShow);
        resetInput();
    } else {
        const countryCities = data.countries.flatMap(country => country.cities);
        const dataToLook = [...countryCities, ...data.temples, ...data.beaches];

        dataToShow = searchKWMatch(userSearchInput, dataToLook);        
       
        if (dataToShow.length === 0){
            document.getElementById('searchInput').placeholder = "No match found"; 
        setTimeout(() => {
            document.getElementById("searchInput").placeholder = "Type your search...";
        }, 2000); 
            }
        
        showSearchResult(dataToShow);
        resetInput();
    }
    })       
      
}
// Keyword-Match function
function searchKWMatch(keyword, data) {
  const cities = [];
  const lowerKeyword = keyword.toLowerCase();

  for (const item of data) {
    if (
      item.name.toLowerCase().includes(lowerKeyword) ||
      item.description.toLowerCase().includes(lowerKeyword)
    ) {
      cities.push(item);
    }
  }
  return cities;
}
// Search Result Display function
function showSearchResult(data) {
  const htmlToShow = data.map(city => `
    <div class="destinationCard">
      <div class="destinationImage">
        <img src="${city.imageUrl}" alt="${city.name}" style="width: 100px; height: auto;">
      </div>
      <h6>${city.name}</h6>
      <p>${city.description}</p>
      <button>Visit</button>
    </div>
  `).join('');

  document.getElementById("searchResults").innerHTML = htmlToShow;
}

function resetInput(){
    document.getElementById("searchInput").value = "";
}
// Wait for DOM to load before attaching event listener
document.addEventListener('DOMContentLoaded', () => {
document.getElementById("search-btn").addEventListener('click', createHTMLToShow);
document.getElementById("reset-btn").addEventListener('click', resetInput)
});





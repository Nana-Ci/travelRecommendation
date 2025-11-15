/**
function searchDB() {
  const keyword = document.getElementById("searchInput").value;
  console.log('Search keyword:', keyword);
  
  if (keyword.trim() !== "" && ( 
        keyword.trim() === "beach" ||
        keyword.trim() === "temple" ||
        keyword.trim() === "country"
         )     
    ) {
    findRecommendations(keyword);
    document.getElementById("searchInput").value = "";
  } else {
    alert('Please enter beach, temple, or country');
    // clear previous results here
    document.getElementById("searchInput").value = "";
  }
}


function findRecommendations(keyword) {
  fetch('./travel_recommendation_api.json')
    .then(response => response.json())
    
    .then(data => {  
            
      console.log('Matching recommendations:', data.countries);      
      // TODO: display results in the UI    

        if(keyword==="country"){
            const items = data.countries; 
        
            const destinationCards=
                items.map (item =>{
                    let cities = item.cities;
                    console.log(cities);                              
                    return cities.map(city =>
                    `<div class="destinationCard">
                        <div id="destinationImage">
                        <img class="destinationImage" src="${city.imageUrl}" alt="${city.name}" style="width: 100px; height: auto;">
                        </div>
                        <h6>${city.name}</h6>
                        <p>${city.description}</p>
                        <button>Visit</button>
                    </div>
                    `).join('');                   
                                    
                }).join('');
            document.getElementById("searchResults").innerHTML = destinationCards;   

        } 
      
    })
    .catch(error => console.log('Error fetching data:', error));
}


// Wait for DOM to load before attaching event listener
document.addEventListener('DOMContentLoaded', () => {
document.getElementById("search-btn").addEventListener('click', searchDB);
});

**/

//START HERE----------------------------------------------------------


function createHTMLToShow(){
    const userSearchInput=document.getElementById("searchInput").value;
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
    } else if (userSearchInput === "temple" || userSearchInput === "temples") {
        dataToShow = data.temples;
        showSearchResult(dataToShow);
    } else if (userSearchInput === "beach" || userSearchInput === "beaches") {
        dataToShow = data.beaches;
        showSearchResult(dataToShow);
    } else {
        const countryCities = data.countries.flatMap(country => country.cities);
        const dataToLook = [...countryCities, ...data.temples, ...data.beaches];

        dataToShow = searchKWMatch(userSearchInput, dataToLook);
        showSearchResult(dataToShow);
    }
    })    
   
      document.getElementById("searchInput").value = "";
      
}

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


function showSearchResult(data) {
  if (data.length === 0) {    
    document.getElementById('searchInput').placeholder = "No match found"; 
    setTimeout(() => {
        document.getElementById("searchInput").placeholder = "Type your search...";
      }, 2000);   
    return;  // Stop further execution
  }

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
// Wait for DOM to load before attaching event listener
document.addEventListener('DOMContentLoaded', () => {
document.getElementById("search-btn").addEventListener('click', createHTMLToShow);
});
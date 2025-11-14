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
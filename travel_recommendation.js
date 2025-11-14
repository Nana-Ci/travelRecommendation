function searchDB() {
  const keyword = document.getElementById("searchInput").value;
  console.log('Search keyword:', keyword);
  
  if (keyword.trim() !== "") {
    findRecommendations(keyword);
  } else {
    console.log('Please enter a search keyword');
    // Optionally clear previous results here
  }
}

function filterByKey(data, keyword) {
    return data.filter(item => item[keyword] === value);
}  

function findRecommendations(keyword) {
  fetch('./travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {
      const results = data[keyword];      
      
      console.log('Matching recommendations:', results);
      // TODO: display results in the UI
    })
    .catch(error => console.error('Error fetching data:', error));
}

// Wait for DOM to load before attaching event listener
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById("search-btn").addEventListener('click', searchDB);
});
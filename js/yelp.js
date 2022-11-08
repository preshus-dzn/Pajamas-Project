window.onload = async function() {
    console.log('Food stuff');
    //populateList(0.5, 'rating', '');
    // populateList(0.5, 'rating', 'pizza');

    let restaurantCoordinates = [33.8829226, -117.8869261];
    //console.log(restaurantCoordinates);
    //userToCoords(restaurantCoordinates);
  }

  async function populateList(rating, sortBy, keywordSearch) {
    console.log('Getting list');
    document.getElementById('restaurants-table').innerHTML = '<tr></tr>';
    let restaurants = await getRestaurants(rating, sortBy, keywordSearch);
    for(let i=0; i < restaurants.businesses.length; i++) {
      let restaurant = restaurants.businesses[i];

      let rowHTML = `
        <tr>
          <td><img src= ${restaurant.image_url}></td>
          <td style="width: 259px; vertical-align:top; font-size:20px">
            <h5>${restaurant.name} - ${restaurant.rating} <img src="./images/star.svg" class="img2"></h5>
           <p> ${restaurant.location.address1}</p>
           <p>${restaurant.categories[0].title} ${restaurant.price != null ? "(" + restaurant.price + ")" : ""}</p></td>
          <td style="width: 259px;  horizontal-align:left; font-size:15px""><a href="#" style="color: blue;" onclick="getDirectionsToRestaurant(${restaurant.coordinates.longitude}, ${restaurant.coordinates.latitude})"><br> <img src="./images/map-icon.png" class ="img3">Get Directions</a></br>
          <br><a href="tel: ${restaurant.phone}" style="${restaurant.phone === '' ? 'display: none;' : ''}"><img src="./images/contact.png" class ="img3">${restaurant.display_phone}</a></br>
        </tr>
      `;
      $('#restaurants-table > tbody:last-child').append(rowHTML);
      console.log(restaurant);
    }
  }

  function getDirectionsToRestaurant(longitude, latitude) {
    let restaurantCoordinates = [latitude, longitude];
    //let restaurantCoordinates = [longitude, latitude];
    userToCoords(restaurantCoordinates);
  }


  async function getRestaurants(radiusInMiles, sortBy, searchString = '') {
    let promise = (radiusInMiles) => new Promise((res, rej) => {
      var url = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search";
      var API_KEY = 'QrGLVX2iIakqi2UhdGzIZENuErWa8KSQ70la_jjFtxBHAfrINb_As5gx5tYZjXTtaj-yasdm1inrG_49NHFxBoE27GJxO6GuuLZ3rEDMT8jiixeyMopQzi6Riwg2YnYx';

      $.ajax({
        url: url,
        method: "GET",
        headers: {
            "accept": "application/json",
            "x-requested-with": "xmlhttprequest",
            "Access-Control-Allow-Origin": "*",
            "Authorization": `Bearer ${API_KEY}`
        },
        data: {
            latitude: 33.8749965,
            longitude: -117.884496462,
            radius: Math.round(radiusInMiles * 1609),
            term: searchString,
            limit: 50,
            sort_by: sortBy, // Possible options are "best_match", "rating", "review_count", "distance"
        }
      }).then(function (data) {
        res(data);
      });
    });


    try {
        let result = await promise(radiusInMiles);
        return result;
    } catch(e) {
        console.log(e);
    }
  }

  function searchFood() {
    console.log('searching food');
    let keyword = document.getElementById('food-search-keyword').value;
    let radius = document.getElementById('food-search-radius').value;
    if(radius === "") {
      radius = 0.5;
    }
    console.log(keyword + " - " + radius);

    populateList(radius, 'rating', keyword);
  }

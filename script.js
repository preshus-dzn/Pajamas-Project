const eventsCardTemplate = document.querySelector("[data-events-template]")
const eventsCardTemplate2 = document.querySelector("[data-events-template2]")
const eventsCardContainer = document.querySelector("[data-events-cards-container]")
const eventsCardContainer2 = document.querySelector("[data-events-cards-container2]")
const searchInput = document.querySelector("[data-search]")
const searchInput2 = document.querySelector("[data-search]")

searchInput.addEventListener("input", e => {
   const value = e.target.value.toLowerCase()

   if (value != ""){
      $.ajax({
         type:"GET",
         url:"https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey=pWwiSAnfPrfAQCVnB9ul68zUWMcpfK6J",
         data: {
            keyword: value
         },
         async:true,
         dataType: "json",
         success: function(json) {
                     for (let i = 0; i < json._embedded.events.length; i++){
                        const eventName=json._embedded.events[i].name
                        const eventDate=json._embedded.events[i].dates.start.localDate
                        const eventMinimumPrice=json._embedded.events[i].priceRanges[0].min   
                        const card = eventsCardTemplate.content.cloneNode(true).children[0]
                        const header = card.querySelector("[data-header]")
                        const body = card.querySelector("[data-body]")
                        const body2 = card.querySelector("[data-body2]")
                        
                        header.textContent = eventName
                        body.textContent = eventMinimumPrice
                        body2.textContent = eventDate

                        $(eventsCardContainer).children().last().remove()
                        $(eventsCardContainer).append(card)
                     }
                  },
         });  
   }
   else{
      $(eventsCardContainer).children().last().remove()
   }
})

searchInput2.addEventListener("input", e => {
   const value = e.target.value

   if (value != ""){
      $.ajax({
         type:"GET",
         url:"https://api.seatgeek.com/2/events?client_id=MzA1Mjc2ODR8MTY2ODk3NTU4MC41NDIwNzE",
         data: {
            q: value
         },
         async:true,
         dataType: "json",
         success: function(json) {
                     for (let i = 0; i < json.events.length; i++){
                        const eventName=json.events[i].short_title
                        const eventDate=json.events[i].datetime_local
                        const eventMinimumPrice=json.events[i].stats.lowest_price 
                        const card = eventsCardTemplate2.content.cloneNode(true).children[0]
                        const header = card.querySelector("[data-header]")
                        const body = card.querySelector("[data-body]")
                        const body2 = card.querySelector("[data-body2]")
                     
                        header.textContent = eventName
                        body.textContent = eventMinimumPrice
                        body2.textContent = eventDate
                        
                        $(eventsCardContainer2).children().last().remove()
                        $(eventsCardContainer2).append(card)
                     }
                  },
         });  
   }
   else{
      $(eventsCardContainer).children().last().remove()
   }
})
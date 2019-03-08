    // Event listener for all button elements
    $("#submitbtn").on("click", function(event) {
      event.preventDefault();
      console.log("SUBMIT BUTTON CLICKED!");
      var keyword = $("#inlineFormInput").val(); 
      // Constructing a URL to search Ticketmaster for list of events by keyword entered
    var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?keyword=" + keyword + "&apikey=Hvspzyaf9sT79FRlHNKREkFSLhoIZkDW";

    $.ajax({url: queryURL, method: "GET" }).then(function(response) {
    var jString = JSON.stringify(response);
    var eventObj = JSON.parse(jString);

    var eventNameDisplay = $("<h2>").text('Event Results for "'+keyword+'"');
    $("#displayInfo").append(
        eventNameDisplay
    );


    // eventObj loop to access JSON key values
    for (var i = 0; i<5; i++) {
    var listDiv = $("<div>").attr("class", "card text-black bg-white mb-3");
      // console.log('listDiv created, contents: ' + listDiv);
    var eventPic = $("<img>").attr("src", eventObj._embedded.events[i].images[4].url).attr("class","card-img-top");
      // console.log('eventPic created, contents: ' + eventPic);
    
    var priceRange = Math.floor(Math.random() * (90 - 50) + 50);

    var cardHolder = $("<div>").attr("class", "card-body");
    
    var eventNameData = eventObj._embedded.events[i].name;
    // CHOSEN DATE IS BELOW // 
    var eventDatesData = eventObj._embedded.events[i].dates.start.localDate;
    var eventVenueNameData = eventObj._embedded.events[i]._embedded.venues[0].name;
    var eventZipData = eventObj._embedded.events[i]._embedded.venues[0].postalCode;
    var eventCityNameData = eventObj._embedded.events[i]._embedded.venues[0].city.name;
    var eventCityStateData = eventObj._embedded.events[i]._embedded.venues[0].state.stateCode;
    
    var eventName = $("<h5>").text(eventNameData).attr("class","text-black");
    var eventDates = $("<p>").text("Date: " + eventDatesData);
    var eventVenueName = $("<p>").text("Venue: " + eventVenueNameData);
    var eventZip = $("<p>").text("Zip: " + eventZipData);
    var eventVenueCity = $("<p>").text(`City: ${eventCityNameData}, ${eventCityStateData}`);
    var eventPriceDisplay = $("<p>").text("Avg Ticket Price: " + priceRange);
    
    /// DISPLAY LOCATION FORM WHEN EVENT IS SELECTED
    /// GET CITY NAME 
    /// AND DATE ON SELECT

    var cardBody = cardHolder.append(
      eventName,
      eventDates,
      eventVenueName,
      eventVenueCity,
      eventZip,
      eventPriceDisplay
    );
    // var eventBuyLink = $("<p>").append($("<a>").attr("src", ventObj._embedded.events[i].url));
    var cardFooter = $('<div>').attr("class", "card-footer").attr("id", "chooseEvent");
    var cardChoose = $('<a>').attr("href", "#").attr("class", "btn btn-block btn-outline-primary").text("Select Event");
  //   var cardBuy = $('<a>').attr("href", eventObj._embedded.events[i].url).attr("class", "btn btn-outline-warning").text("Select This Event");
    var eventBtn = cardFooter.append(cardChoose);

    var eventTotal = listDiv.append(eventPic, cardBody, eventBtn);


/////// NOTE fr Omar: Create <div> with id="results" for the results to display properly
    $("#resultsDisplay").append(eventTotal);
    }
});

});

// $("#chooseEvent").on("click", function(event) {
//   event.preventDefault();
//   console.log("EVENT SELECTED");

// });

//// 
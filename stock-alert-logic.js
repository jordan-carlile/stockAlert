  // Initialize Firebase
  var config = {
      apiKey: "AIzaSyA_WQT3KNgbf7iEOn44910WB7vlFN5dk1M",
      authDomain: "stockalert-8ace5.firebaseapp.com",
      databaseURL: "https://stockalert-8ace5.firebaseio.com",
      projectId: "stockalert-8ace5",
      storageBucket: "stockalert-8ace5.appspot.com",
      messagingSenderId: "1006834641151"
  };
  firebase.initializeApp(config);
  var stockData = firebase.database();

  function handleChildSnapshot(childSnapshot) {
    // Store everything into a variable.
    var stockName = childSnapshot.val().stockName;
    let maximum = childSnapshot.val().maximum;
    let minimum = childSnapshot.val().minimum;
    
    // fetches stock data and stores locally
    $.get(`https://api.iextrading.com/1.0/stock/${stockName}/delayed-quote`, function (data) {

        let lastPrice = data.delayedPrice
        let lastTime = new Date(data.delayedPriceTime)

        if (lastPrice > maximum || lastPrice < minimum) {
            alert(`Hey! your stock was sold outside your range\nminimum: ${minimum} and maximum ${maximum}. Its latest trade price was ${lastPrice}`)
        }
        // Add stock information to UI
        $("#stock-table > tbody").append(
            $("<tr>").append(
                $("<td>").text(stockName),
                $("<td>").text(minimum),
                $("<td>").text(maximum),
                $("<td>").text(lastPrice),
                $("<td>").text(lastTime)
            )
        );
    });
}

  // Button for adding stocks
  $("#add-stock-btn").on("click", function (event) {
      // Prevent the default form submit behavior
      event.preventDefault();

      // Grabs user input
      var stockName = $("#stock-name-input")
          .val()
          .trim();
      var minimum = $("#minimum-input")
          .val()
          .trim();
      var maximum = $("#maximum-input")
          .val()
          .trim();

      // Creates local "temporary" object for holding stock data
      var newstock = {
          stockName,
          minimum,
          maximum
      };

      // Uploads stock data to the database
      stockData.ref().push(newstock);

      // Logs everything to console
      console.log(`newstock.stockName: ${newstock.stockName}`);
      console.log(`newstock.minimum: ${newstock.minimum}`);
      console.log(`newstock.maximum: ${newstock.maximum}`);

      // Clears all of the text-boxes
      $("#stock-name-input").val("");
      $("#minimum-input").val("");
      $("#maximum-input").val("");
  });

  // Button for clearing database and existing table
  $("#wipe-database-btn").on("click", function (event) {
    // Prevent the default form submit behavior
    event.preventDefault();

    stockData.ref().remove();
    $("#stock-table tbody tr").remove();
});

  // Runs on page load or when ne child is added
  stockData.ref().on("child_added", function (childSnapshot, prevChildKey) {
      //   console.log(childSnapshot.val());
      handleChildSnapshot(childSnapshot);

  });

  // checkPrices clears the existing table and checks the prices of the saved stocks and repopulates the table
  // Depends on handleChildSnapshot
  function checkPrices() {
      $("#stock-table tbody tr").remove();
      stockData.ref().once("value", function (snapshot) {
          snapshot.forEach(function (childSnapshot) {
              handleChildSnapshot(childSnapshot);
          });
      });
  }

  let fiveMinutes = 1000 * 60 * 5
  setInterval(checkPrices, fiveMinutes)

  

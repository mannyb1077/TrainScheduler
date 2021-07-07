var config = 
{  
    apiKey: "AIzaSyCapFci4yRVZUDk1L5t2EEn1z9uLj-7UOA",
    authDomain: "shake-a-dice.firebaseapp.com",
    databaseURL: "https://shake-a-dice-default-rtdb.firebaseio.com/",
    projectId: "shake-a-dice",
    storageBucket: "shake-a-dice.appspot.com",
    messagingSenderId: "100418408407"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  Time()

  $("#add-train-button").on("click", function(event) 
  {
    
    event.preventDefault();
    
    var winnerName = $("#winner-name-input").val().trim();
    var winnerAmount = $("#winner-amount-input").val().trim();
    var winnerDate = $("#winner-date-input").val().trim(); 
   
    var newWinner = 
    {
      name: winnerName,
      amount: winnerAmount,
      date: winnerDate,
  
    };

    if (winnerName == "" || winnerDate == "")
    {
      alert("Please do not leave any empty fields");
    }
    else
    {
      database.ref().push(newWinner);

      //Info to firebase
      console.log("This is Pushing Train Name to Firebase: " + newWinner.name);
      console.log("This is Pushing Train Destination to Firebase: " + newWinner.amount);
      console.log("This is Pushing to First Train Start to Firebase: " + newWinner.date);
      //console.log("This is Pushing to Train Frequency to Firebase: " + newTrain.frequency);

      closeForm()

      alert(winnerName + " Winner successfully added");
      
    }

    

  });

  database.ref().on("child_added", function(childSnapshot) 
  {
    var winnerName = childSnapshot.val().name;
    var winnerAmount = childSnapshot.val().amount;
    var winnerDate = childSnapshot.val().date;
    //var trainFrequency = childSnapshot.val().frequency;
    //var nextArrival = "";
    //var minutesAway = " ";
    //var timeDisplay = " ";

    // Info from firebase
      console.log("This is Receiving Train Name from Firebase " + winnerName);
      console.log("This is Receiving Train Destination from Firebase " + winnerAmount);
      console.log("This is Receiving Train Start from Firebase " + winnerDate);
      // console.log("This is Receiving Train Frequency from Firebase " + trainFrequency);


     // Train Start Time (-1 year to make sure it comes before current time)
     console.log("trainStartTime = " + winnerDate);
     var winnerDateConverted = moment(winnerDate, "mm/dd/yyyy");
     console.log("startTimeConverted to seconds = " + winnerDateConverted);

      // Current Time
    //var currentTime = moment();
    //console.log("currentTime in Minutes = " + currentTime);

    // Time difference between trainStartTime and currentTime
    //var timeDifference = moment().diff(moment(trainStartTimeConverted), "minutes");
    //console.log("Time difference between startTime and currentTime = " + timeDifference);

    // // Time remaining
    // console.log("trainFrequency = " + trainFrequency);
    // var timeRemaining = timeDifference % trainFrequency;
    // console.log("Time remaining in Minutes = " + timeRemaining);

    // // Minutes Until Next Train
    // minutesAway = trainFrequency - timeRemaining;
    // console.log("Minutes Away Until Next Train = " + minutesAway);

    // // Next Arrival
    // var nextTrain = moment().add(minutesAway, "minutes");
    // nextArrival = moment(nextTrain).format("HH:mm");
    // if (nextArrival == "00:00")
    // {
    //   nextArrival = "12:00"
    // }

    // console.log("Next Train in Minutes = " + nextTrain);
    // console.log("Next Train arrives at: " + nextArrival);
          
      // New Row to Display information from firebase
    var newRow = $("<tr>").append
    (
      $("<td>").text(winnerName),
      $("<td>").text(winnerAmount),
      //$("<td>").text(trainFrequency + " minutes"),
      //$("<td>").text(nextArrival),
     // $("<td>").text(minutesAway + " minutes")
      //$("<td>").text("Sooner Than You Think"),
      //$("<td>").text("Be Patient!"),
    );
  
    // Append the new row to the table
    $("#winner-table > tbody").append(newRow);

  });

  //Current Local Time
  function Time() 
  {
    var current = moment().format('LT');
    timeDisplay = current;
    
    $("#time-display").text("Local Time: " + timeDisplay);
    setInterval(Time, 1000);
     
  }

  function clearFormInputs()
  {
    $("#winner-name-input").val("");
    $("#winner-amount-input").val("");
    $("#winner-date-input").val("");
  }

  function closeForm() 
  {
    clearFormInputs()
    modal.style.display = "none";
  }
  
  $(".cancelbtn, .close").on("click", function() 
  {
    clearFormInputs()
  });


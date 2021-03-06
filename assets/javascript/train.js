var config = 
{  
    apiKey: "AIzaSyAKCxA5oKSLftZ3MNXophwyB1FxlmnehtkL",
    authDomain: "trainscheduler-82dff.firebaseapp.com",
    databaseURL: "https://trainscheduler-82dff.firebaseio.com",
    projectId: "trainscheduler-82dff",
    storageBucket: "trainscheduler-82dff.appspot.com",
    messagingSenderId: "100418408407"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  Time()

  $("#add-train-button").on("click", function(event) 
  {
    
    event.preventDefault();
    
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#train-destination-input").val().trim();//.trim();
    var trainStartTime = $("#train-start-input").val().trim(); //.trim(), "HH:mm");
    var trainFrequency = $("#train-frequency-input").val().trim();//.trim();
    var newTrain = 
    {
      name: trainName,
      destination: trainDestination,
      start: trainStartTime,
      frequency: trainFrequency
    };

    if (trainName == "" || trainDestination == "" || trainStartTime == "" || trainFrequency == "")
    {
      alert("Please do not leave any empty fields");
    }
    else
    {
      database.ref().push(newTrain);

      //Info to firebase
      console.log("This is Pushing Train Name to Firebase: " + newTrain.name);
      console.log("This is Pushing Train Destination to Firebase: " + newTrain.destination);
      console.log("This is Pushing to First Train Start to Firebase: " + newTrain.start);
      console.log("This is Pushing to Train Frequency to Firebase: " + newTrain.frequency);

      closeForm()

      alert(trainName + " Train successfully added");
      
    }

    

  });

  database.ref().on("child_added", function(childSnapshot) 
  {
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainStartTime = childSnapshot.val().start;
    var trainFrequency = childSnapshot.val().frequency;
    var nextArrival = "";
    var minutesAway = " ";
    var timeDisplay = " ";

    // Info from firebase
      // console.log("This is Receiving Train Name from Firebase " + trainName);
      // console.log("This is Receiving Train Destination from Firebase " + trainDestination);
      // console.log("This is Receiving Train Start from Firebase " + trainStartTime);
      // console.log("This is Receiving Train Frequency from Firebase " + trainFrequency);


     // Train Start Time (-1 year to make sure it comes before current time)
     console.log("trainStartTime = " + trainStartTime);
     var trainStartTimeConverted = moment(trainStartTime, "hh:mm").subtract(1, "years");
     console.log("startTimeConverted to seconds = " + trainStartTimeConverted);

      // Current Time
    var currentTime = moment();
    console.log("currentTime in Minutes = " + currentTime);

    // Time difference between trainStartTime and currentTime
    var timeDifference = moment().diff(moment(trainStartTimeConverted), "minutes");
    console.log("Time difference between startTime and currentTime = " + timeDifference);

    // Time remaining
    console.log("trainFrequency = " + trainFrequency);
    var timeRemaining = timeDifference % trainFrequency;
    console.log("Time remaining in Minutes = " + timeRemaining);

    // Minutes Until Next Train
    minutesAway = trainFrequency - timeRemaining;
    console.log("Minutes Away Until Next Train = " + minutesAway);

    // Next Arrival
    var nextTrain = moment().add(minutesAway, "minutes");
    nextArrival = moment(nextTrain).format("HH:mm");
    if (nextArrival == "00:00")
    {
      nextArrival = "12:00"
    }

    console.log("Next Train in Minutes = " + nextTrain);
    console.log("Next Train arrives at: " + nextArrival);
          
      // New Row to Display information from firebase
    var newRow = $("<tr>").append
    (
      $("<td>").text(trainName),
      $("<td>").text(trainDestination),
      $("<td>").text(trainFrequency + " minutes"),
      $("<td>").text(nextArrival),
      $("<td>").text(minutesAway + " minutes")
      //$("<td>").text("Sooner Than You Think"),
      //$("<td>").text("Be Patient!"),
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);

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
    $("#train-name-input").val("");
    $("#train-destination-input").val("");
    $("#train-start-input").val("");
    $("#train-frequency-input").val("");
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


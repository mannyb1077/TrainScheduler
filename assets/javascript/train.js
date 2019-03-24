var config = 
{  
    // apiKey: "AIzaSyAKCxA5oKSLftZ3MNXophwyB1Fxlmnehtk",
    apiKey: "TxM4JnKtru1Gw11XL2uUnq0vIZLb3xshxPBDrkuL",
    authDomain: "trainscheduler-82dff.firebaseapp.com",
    databaseURL: "https://trainscheduler-82dff.firebaseio.com",
    projectId: "trainscheduler-82dff",
    storageBucket: "trainscheduler-82dff.appspot.com",
    messagingSenderId: "100418408407"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  $("#add-train-button").on("click", function(event) 
  {
    event.preventDefault();
    //console.log("Submit Button Working");

    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#train-destination-input").val();//.trim();
    var trainStartTime = $("#train-start-input").val(); //.trim(), "HH:mm");
    var trainFrequency = $("#train-frequency-input").val() + " mins";//.trim();
    var newTrain = 
    {
      name: trainName,
      destination: trainDestination,
      start: trainStartTime,
      frequency: trainFrequency
    };

    //console.log(newTrain);
    
    database.ref().push(newTrain);

    console.log("This is Pushing to Firebase " + newTrain.name);
    console.log("This is Pushing to Firebase " + newTrain.destination);
    console.log("This is Pushing to Firebase " + newTrain.start);
    console.log("This is Pushing to Firebase " + newTrain.frequency);

    $("#train-name-input").val("");
    $("#train-destination-input").val("");
    $("#train-start-input").val("");
    $("#train-frequency-input").val("");

    alert("Train successfully added");

  });

  database.ref().on("child_added", function(childSnapshot) 
  {
    //console.log("Child Snapshot" + childSnapshot.val());
  
    
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainStartTime = childSnapshot.val().start;
    var trainFrequency = childSnapshot.val().frequency;
  
    
    console.log("This is Receiving from Firebase " + trainName);
    console.log("This is Receiving from Firebase " + trainDestination);
    console.log("This is Receiving from Firebase " + trainStartTime);
    console.log("This is Receiving from Firebase " + trainFrequency);

    var nextArrival = "Sooner than you think"
    var minutesAway = "To be Determined";
    var newRow = $("<tr>").append
    (
      $("<td>").text(trainName),
      $("<td>").text(trainDestination),
      $("<td>").text(trainFrequency),
      $("<td>").text(nextArrival),
      $("<td>").text(minutesAway)
      
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);

  });


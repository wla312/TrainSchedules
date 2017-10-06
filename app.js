$(document).ready(function() {
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDLFtLmNnSJaZpLDyGPG9CLlcHbr0CDAKw",
    authDomain: "trainschedulesapp.firebaseapp.com",
    databaseURL: "https://trainschedulesapp.firebaseio.com",
    projectId: "trainschedulesapp",
    storageBucket: "",
    messagingSenderId: "610730353215"
  };

  firebase.initializeApp(config);

  // create a variable to reference the database
  var database = firebase.database();

  // Initial variables
  var name = "";
  var destination = "";
  var frequency = "";
  var firstTrain = "";
  var minAway;
  var nextArrival;
  

  // click button changes what is stored in firebase
  $("#submit-btn").on("click", function(event) {
    // prevent the page from refreshing
    event.preventDefault();

    // get inputs
    name = $("#trainName").val().trim();
    destination = $("#trainDest").val().trim();
    frequency = $("#trainFreq").val().trim();
    firstTrain = $("#firstTrain").val().trim();

    // test
    // console.log("all: ", name, destination, frequency, firstTrain);
    
    // take var firstTrain and push it back 1 year (to be sure it occurs before current time)
    var firstTrainConverted = moment(firstTrain, "hh:mm").subtract(1, "years");
    console.log(firstTrainConverted);

    // current time
    var currentTime = moment();
    console.log("Current Time: " + moment(currentTime).format("hh:mm"));

    // difference between the times
    var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
    console.log("Difference in time: " + diffTime);

    // Time apart = remainder
    var tRemainder = diffTime % frequency;
    console.log("Remainder: " + tRemainder);

    // minutes until train
    minAway = frequency - tRemainder;
    console.log("Minutes Until Train: " + minAway);

    // next train
    nextArrival = moment().add(minAway, "minutes");
    console.log("Next Train Arrival: " + moment(nextArrival).format("hh:mm"));


    var trainObj = {
    	name: name,
    	destination: destination,
    	frequency: frequency,
    	firstTrain: firstTrain,
    	minAway: minAway,
    	// nextArrival: nextArrival
    }

    // change what is saved in firebase
    database.ref().push(trainObj);

    // when a child is added to the database...
	    database.ref().on("child_added", function(childSnapshot) {

	    	// test
	    	console.log(childSnapshot.val());
	    })
	})
})
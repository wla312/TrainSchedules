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
  var nextArrival = "";
  var minAway = "";

  // click button changes what is stored in firebase
  $("#submit-btn").on("click", function(event) {
    // prevent the page from refreshing
    event.preventDefault();

    // get inputs
    name = $("#trainName").val().trim();
    destination = $("#trainDest").val().trim();
    frequency = $("#trainFreq").val().trim();
    // nextArrival = 
    // minAway = 

    console.log("all: ", name, destination, frequency);

    var trainObj = {
    	name: name,
    	destination: destination,
    	frequency: frequency
    	// nextArrival
    	// minAway
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
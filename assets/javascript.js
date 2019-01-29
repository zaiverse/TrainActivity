var firebaseRef = firebase.database();

$('#submit').on("click", function(event){
    event.preventDefault();

    var trainname = $('.addd').val();
    var traindestination = $('#destinationAdded').val();
    var traintime = $('#timeAdded').val();
    var trainfrequency = $('#frequencyAdded').val();

    
    var storeData = {
        name: trainname,
        destination: traindestination,
        frequency: trainfrequency,
        time: traintime,
    };

     firebaseRef.ref().push(storeData);

    $('.form-control').val('');


})

firebaseRef.ref().on("value", function(Snapshot) {

    trainname = Snapshot.val().name;
    traindestination = Snapshot.val().destination;
    trainfrequency = Snapshot.val().frequency;
    traintime = Snapshot.val().time;

    var trainOriginalTime = moment(traintime, "HH:mm").subtract(1, "years");
    var current = moment().diff(moment(trainOriginalTime), "minutes");
    var Remainder = current % trainfrequency;
    var MinutesTillTrain = trainfrequency - Remainder;
    var nextTrain = moment().add(MinutesTillTrain, "minutes");

    console.log(trainname);
    console.log(traindestination);
    console.log(nextTrain);

    var creatingTr= $("<tr>").append(
        $("<td>").append(trainname),
        $("<td>").append(traindestination),
        $("<td>").append(trainfrequency),
        $("<td>").append(nextTrain.format("hh:mm")),
        $("<td>").append(MinutesTillTrain),
    )

    $('tbody').append(creatingTr);

}, function(errorObject) {

    // In case of error this will print the error
    console.log("The read failed: " + errorObject.code);
  })
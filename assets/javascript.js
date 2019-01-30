var firebaseRef = firebase.database().ref('/table');

$('#submit').on("click", function(event){
    event.preventDefault();

    var trainname = $('.addd').val();
    var traindestination = $('#destinationAdded').val();
    var traintime = $('#timeAdded').val();
    var trainfrequency = $('#frequencyAdded').val();

    
    firebaseRef.set({
        name: trainname,
        destination: traindestination,
        time: traintime,
        frequency: trainfrequency,

    })

    $('.form-control').val('');

})

firebaseRef.on("value", function(Snapshot) {

    var trainname = Snapshot.val().name;
    var traindestination = Snapshot.val().destination;
    var traintime = Snapshot.val().time;
    var trainfrequency = Snapshot.val().frequency;

    var trainOriginalTime = moment(traintime, "HH:mm").subtract(1, "years");
    var current = moment().diff(moment(trainOriginalTime), "minutes");
    var Remainder = current % trainfrequency;
    var MinutesTillTrain = trainfrequency - Remainder;
    var nextTrain = moment().add(MinutesTillTrain, "minutes");

    var creatingTr= $("<tr>").append(
        $("<td>").append(trainname),
        $("<td>").append(traindestination),
        $("<td>").append(trainfrequency),
        $("<td>").append(nextTrain.format("hh:mm")),
        $("<td>").append(MinutesTillTrain),
    )

    console.log(creatingTr)


    $('tbody').append(creatingTr);

}, function(errorObject) {

    // In case of error this will print the error
    console.log("The read failed: " + errorObject.code);
  })
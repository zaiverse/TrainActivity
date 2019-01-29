var firebaseRef = firebase.database().ref();

$('#submit').on("click", function(event){
    event.preventDefault();

    var trainname = $('.addd').val();
    var traindestination = $('#destinationAdded').val();
    var traintime = $('#timeAdded').val();
    var trainfrequency = $('#frequencyAdded').val();

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
    
    firebaseRef.set({
        creating: creatingTr
    });

    $('tbody').text(creatingTr);
    
    $('.form-control').val('');


})

firebaseRef.on("value", function(Snapshot) {

    creatingTr = Snapshot.val().creating;
    
    $('tbody').text(creatingTr);

})
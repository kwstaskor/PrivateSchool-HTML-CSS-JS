const trForm = $("#trForm");
const addTrBtn = $("#addTrBtn");
trForm.submit((e) => e.preventDefault());

$(".my-form").hide();

addTrBtn.click(function () {
    $(".my-form").slideToggle(800);
    $(this).text($(this).text() == 'Add Trainer' ? 'Close Register Form' : 'Add Trainer');
    $(this).toggleClass("btn-danger");
});


function trainer(id, firstName, lastName, subject) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.subject = subject;
}

//Synthetic Data

let t1 = new trainer(1, "Mister", "Miyiagi", "Computer-Science");
let t2 = new trainer(2, "ObiWan", "Kenobi", "Computer-Science");
let t3 = new trainer(3, "Darth", "Veider", "Computer-Science");
let t4 = new trainer(4, "Gandalf", "Thegray", "Computer-Science");

let trainers = [t1, t2, t3, t4];

$.each(trainers, (i, trainer) => { addToTrainerTable(trainer) });

function addToTrainerTable(trainer) {
    $("table > tbody:last-child").append(`
                                <tr id="tr-${trainer.id}">
                                 <td class="trainerData" name="id">${trainer.id}</td>
                                 <td class="trainerData" name="firstName">${trainer.firstName}</td>
                                 <td class="trainerData" name="lastName">${trainer.lastName}</td>
                                 <td class="trainerData" name="subject">${trainer.subject}</td>
                                 <td>
                                        <button class="btn btn-success" onClick="editTrainer(${trainer.id})" data-toggle="modal" data-target="#trModal"><i class="fa fa-edit"></i></button>
                                        <button class="btn btn-danger" onClick="deleteTrainer(${trainer.id})"><i class="fa fa-trash"></i></button>
                                 </td>
                                </tr>
                                  `);
}

trForm.submit(() => {
    let trainer = {};
    trainer.id = trainers[trainers.length - 1].id + 1;
    trainer.firstName = $("#first-name").val();
    trainer.lastName = $("#last-name").val();
    trainer.subject = $("#subject").val();

    trainers.push(trainer);
    let msg = "Trainer successfully Created!";
    flashMessage(msg);
    addToTrainerTable(trainer);

    $("#first-name").val('');
    $("#last-name").val('');
    $("#subject").val('');
});

function deleteTrainer(id) {
    let action = confirm("Are you sure you want to delete this Trainer?");
    let msg = "Trainer deleted successfully!";
    trainers.forEach(function (trainer, index) {
        if (trainer.id == id && action) {
            trainers.splice(index, 1);
            $("#tr-" + trainer.id).remove();
            flashMessage(msg);
        }
    });
}

function editTrainer(id) {
    trainers.forEach(function (trainer, index) {
        if (trainer.id == id) {
            $(".modal").modal("toggle");

            $('#trModalLabel').text('Edit Trainer: ' + trainer.firstName + " " + trainer.lastName);

            $(".modal-body").empty();

            $(".modal-body").append(`
                                       <form id="updateTrainer" onsubmit="updateTrainer(${id}); return false;">

                                       <label for="first-name">First Name</label>
                                       <input id="first-name" pattern="^[A-Za-z]+$" type="text" class="form-control" name="firstName" value="${trainer.firstName}" placeholder="letters only(2 min characters)" required autocomplete="off" minlength="2">


                                       <label for="last-name">Last Name</label>
                                       <input id="last-name" pattern="^[A-Za-z]+$" type="text" class="form-control" name="lastName" value="${trainer.lastName}" placeholder="letters only(2 min characters)" required autocomplete="off" minlength="2">

                                       <label for="subject">Subject</label>
                                       <input id="subject" type="text" class="form-control" name="subject" value="${trainer.subject}" placeholder="(2 min characters)" required autocomplete="off" minlength="2">
                                          `);

            $(".modal-footer").empty().append(`
                                        <button type="submit" form="updateTrainer" class="btn btn-primary">Save changes</button>
                                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                    </form >
                                `);
        }
    });
}

function updateTrainer(id) {

    let msg = "Trainer updated successfully!";
    let trainer = {};
    trainer.id = id;
    trainers.forEach(function (trainer, index) {

        if (trainer.id == id) {
            $("#updateTrainer").children("input").each(function () {

                let value = $(this).val();
                let attr = $(this).attr("name");

                if (attr == "firstName") {
                    trainer.firstName = value;
                }
                else if (attr == "lastName") {
                    trainer.lastName = value;
                }
                else if (attr == "subject") {
                    trainer.subject = value;
                }

            });
            trainers.splice(index, 1);
            trainers.splice(trainer.id - 1, 0, trainer);

            $("tbody #tr-" + trainer.id).children(".trainerData").each(function () {

                let attr = $(this).attr("name");

                if (attr == "firstName") {
                    $(this).text(trainer.firstName);
                }
                else if (attr == "lastName") {
                    $(this).text(trainer.lastName);
                }
                else if (attr == "subject") {
                    $(this).text(trainer.subject);
                }
            });
            $(".modal").modal("toggle");
            flashMessage(msg);
            $("#updateTrainer").submit((e) => e.preventDefault());
        }
    });
}

function flashMessage(msg) {
    $(".flashMsg").remove();
    $("#TableContainer").append(`
                        <div class="col-sm-12 alert alert-dismissible alert-success" role="alert">
                           ${msg}
                         <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                             <span aria-hidden="true">&times;</span>
                         </button>
                        </div>
                              `);
}

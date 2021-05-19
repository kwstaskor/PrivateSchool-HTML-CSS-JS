const assForm = $("#assForm");
const addAssBtn = $("#addAssBtn");
assForm.submit((e) => e.preventDefault());

$(".my-form").hide();

addAssBtn.click(function () {
    $(".my-form").slideToggle(800);
    $(this).text($(this).text() == 'Add Assignment' ? 'Close Register Form' : 'Add Assignment');
    $(this).toggleClass("btn-danger");
});


function assignment(id, title, description, submissionDate) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.submissionDate = submissionDate;
}

//Synthetic Data

let a1 = new assignment(1, "C# Application", "Individual Project","2021-03-15");
let a2 = new assignment(2, "Unity 2D Game", "Group Project","2021-04-15");
let a3 = new assignment(3, "Web Application", "Group Project", "2021-05-10");
let a4 = new assignment(4, "Databases", "Individual Project", "2021-03-10");

let assignments = [a1, a2, a3, a4];

$.each(assignments, (i, assignment) => { addToAssignmentTable(assignment) });

function addToAssignmentTable(assignment) {
    $("table > tbody:last-child").append(`
                                <tr id="ass-${assignment.id}">
                                 <td class="assignmentData" name="id">${assignment.id}</td>
                                 <td class="assignmentData" name="title">${assignment.title}</td>
                                 <td class="assignmentData" name="description">${assignment.description}</td>
                                 <td class="assignmentData" name="submissionDate">${assignment.submissionDate}</td>
                                 <td>
                                        <button class="btn btn-success" onClick="editAssignment(${assignment.id})" data-toggle="modal" data-target="#assModal"><i class="fa fa-edit"></i></button>
                                        <button class="btn btn-danger" onClick="deleteAssignment(${assignment.id})"><i class="fa fa-trash"></i></button>
                                 </td>
                                </tr>
                                  `);
}

assForm.submit(() => {
    let assignment = {};
    assignment.id = assignments[assignments.length - 1].id + 1;
    assignment.title = $("#title").val();
    assignment.description = $("#description").val();
    assignment.submissionDate = $("#submissionDate").val();
   

    assignments.push(assignment);
    let msg = "Assignment successfully Created!";
    flashMessage(msg);
    addToAssignmentTable(assignment);

    $("#title").val('');
    $("#description").val('');
    $("#submissionDate").val('');
});

function deleteAssignment(id) {
    let action = confirm("Are you sure you want to delete this Assignment?");
    let msg = "Assignment deleted successfully!";
    assignments.forEach(function (assignment, index) {
        if (assignment.id == id && action) {
            assignments.splice(index, 1);
            $("#ass-" + assignment.id).remove();
            flashMessage(msg);
        }
    });
}

function editAssignment(id) {
    assignments.forEach(function (assignment, index) {
        if (assignment.id == id) {
            $(".modal").modal("toggle");

            $('#assModalLabel').text('Edit Assignment: ' + assignment.title + " " + assignment.description);

            $(".modal-body").empty();

            $(".modal-body").append(`
                                       <form id="updateAssignment" onsubmit="updateAssignment(${id}); return false;">

                                       <label for="title">Title</label>
                                       <input id="title" type="text" class="form-control" name="title" value="${assignment.title}" placeholder="letters only(2 min characters)" required autocomplete="off" minlength="2"> 
                                       
                                       <label for="description">Description</label>
                                       <input id="description" type="text" class="form-control" name="description" value="${assignment.description}" placeholder="letters only(2 min characters)" required autocomplete="off" minlength="2"> 
                                    
                                       <label for="submissionDate">Submission Date</label>
                                       <input id="submissionDate" type="date" class="form-control" name="submissionDate" value="${assignment.submissionDate}" min="2015-12-31" required>
                                          `);

            $(".modal-footer").empty().append(`
                                        <button type="submit" form="updateAssignment" class="btn btn-primary">Save changes</button>
                                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                    </form >
                                `);
        }
    });
}

function updateAssignment(id) {

    let msg = "Assignment updated successfully!";
    let assignment = {};
    assignment.id = id;
    assignments.forEach(function (assignment, index) {

        if (assignment.id == id) {
            $("#updateAssignment").children("input").each(function () {

                let value = $(this).val();
                let attr = $(this).attr("name");

                if (attr == "title") {
                    assignment.title = value;
                }
                else if (attr == "description") {
                    assignment.description = value;
                }
                else if (attr == "submissionDate") {
                    assignment.submissionDate = value;
                }

            });
            assignments.splice(index, 1);
            assignments.splice(assignment.id - 1, 0, assignment);

            $("tbody #ass-" + assignment.id).children(".assignmentData").each(function () {

                let attr = $(this).attr("name");

                if (attr == "title") {
                    $(this).text(assignment.title);
                }
                else if (attr == "description") {
                    $(this).text(assignment.description);
                }
                else if (attr == "submissionDate") {
                    $(this).text(assignment.submissionDate);
                }

            });
            $(".modal").modal("toggle");
            flashMessage(msg);
            $("#updateAssignment").submit((e) => e.preventDefault());
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

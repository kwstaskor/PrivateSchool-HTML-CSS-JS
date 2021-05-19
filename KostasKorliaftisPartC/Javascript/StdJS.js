const stdForm = $("#stdForm");
const addStdBtn = $("#addStdBtn");
stdForm.submit((e) => e.preventDefault());

$(".my-form").hide();

addStdBtn.click(function () {
    $(".my-form").slideToggle(800);
    $(this).text($(this).text() == 'Add Student' ? 'Close Register Form' : 'Add Student');
    $(this).toggleClass("btn-danger");
});


function student(id, firstName, lastName, dateOfBirth) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.dateOfBirth = dateOfBirth;
}

//Synthetic Data

let s1 = new student(1, "Kostas", "Papandreou", "1990-11-28");
let s2 = new student(2, "Petros", "Papapetrou", "1991-12-28");
let s3 = new student(3, "Nikos", "Nikolaou", "1989-02-28");
let s4 = new student(4, "Giannis", "Papagiannis", "1993-12-28");
let s5 = new student(5, "Anaksimadros", "Evaggelou", "1993-02-28");
let s6 = new student(6, "Giorgos", "Georgiou", "1990-02-22");

let students = [s1, s2, s3, s4, s5, s6];

$.each(students, (i, student) => { addToStudentTable(student) });

function addToStudentTable(student) {
    $("table > tbody:last-child").append(`
                                <tr id="std-${student.id}">
                                 <td class="studentData" name="id">${student.id}</td>
                                 <td class="studentData" name="firstName">${student.firstName}</td>
                                 <td class="studentData" name="lastName">${student.lastName}</td>
                                 <td class="studentData" name="dateOfBirth">${student.dateOfBirth}</td>
                                 <td>
                                        <button class="btn btn-success" onClick="editStudent(${student.id})" data-toggle="modal" data-target="#stdModal"><i class="fa fa-edit"></i></button>
                                        <button class="btn btn-danger" onClick="deleteStudent(${student.id})"><i class="fa fa-trash"></i></button>
                                 </td>
                                </tr>
                                  `);
}

stdForm.submit(() => {
    let student = {};
    student.id = students[students.length - 1].id + 1;
    student.firstName = $("#first-name").val();
    student.lastName = $("#last-name").val();
    student.dateOfBirth = $("#dateOfBirth").val();

    students.push(student);
    let msg = "Student successfully Created!";
    flashMessage(msg);
    addToStudentTable(student);

    $("#first-name").val('');
    $("#last-name").val('');
    $("#dateOfBirth").val('');
});

function deleteStudent(id) {
    let action = confirm("Are you sure you want to delete this Student?");
    let msg = "Student deleted successfully!";
    students.forEach(function (student, index) {
        if (student.id == id && action) {
            students.splice(index, 1);
            $("#std-" + student.id).remove();
            flashMessage(msg);
        }
    });
}

function editStudent(id) {
    students.forEach(function (student, index) {
        if (student.id == id) {
            $(".modal").modal("toggle");

            $('#stdModalLabel').text('Edit Student: ' + student.firstName + " " + student.lastName);

            $(".modal-body").empty();

            $(".modal-body").append(`
                                       <form id="updateStudent" onsubmit="updateStudent(${id}); return false;">

                                       <label for="first-name">First Name</label>
                                       <input id="first-name" pattern="^[A-Za-z]+$" type="text" class="form-control" name="firstName" value="${student.firstName}" placeholder="letters only(2 min characters)" required autocomplete="off" minlength="2">


                                       <label for="last-name">Last Name</label>
                                       <input id="last-name" pattern="^[A-Za-z]+$" type="text" class="form-control" name="lastName" value="${student.lastName}" placeholder="letters only(2 min characters)" required autocomplete="off" minlength="2">

                                       <label for="dateOfBirth">Date of Birth</label>
                                       <input id="dateOfBirth" type="date" class="form-control" name="dateOfBirth" value="${student.dateOfBirth}" min="1950-12-31" max="2001-12-30" required>

                                          `);

            $(".modal-footer").empty().append(`
                                        <button type="submit" form="updateStudent" class="btn btn-primary">Save changes</button>
                                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                    </form >
                                `);
        }
    });
}

function updateStudent(id) {

    let msg = "Student updated successfully!";
    let student = {};
    student.id = id;
    students.forEach(function (student, index) {

        if (student.id == id) {
            $("#updateStudent").children("input").each(function () {

                let value = $(this).val();
                let attr = $(this).attr("name");

                if (attr == "firstName") {
                    student.firstName = value;
                }
                else if (attr == "lastName") {
                    student.lastName = value;
                }
                else if (attr == "dateOfBirth") {
                    student.dateOfBirth = value;
                }

            });
            students.splice(index, 1);
            students.splice(student.id - 1, 0, student);

            $("tbody #std-" + student.id).children(".studentData").each(function () {

                let attr = $(this).attr("name");

                if (attr == "firstName") {
                    $(this).text(student.firstName);
                }
                else if (attr == "lastName") {
                    $(this).text(student.lastName);
                }
                else if (attr == "dateOfBirth") {
                    $(this).text(student.dateOfBirth);
                }
            });
            $(".modal").modal("toggle");
            flashMessage(msg);
            $("#updateStudent").submit((e) => e.preventDefault());
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

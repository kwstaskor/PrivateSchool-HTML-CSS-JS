$(function () {
    $('.selectpicker').selectpicker();
});

//Course
const crsForm = $("#crsForm");
const addCrsBtn = $("#addCrsBtn");
crsForm.submit((e) => e.preventDefault());

$(".my-form").hide();

addCrsBtn.click(function () {
    $(".my-form").slideToggle(800);
    $(this).text($(this).text() == 'Add Course' ? 'Close Register Form' : 'Add Course');
    $(this).toggleClass("btn-danger");
});


function course(id, title, stream, type, startDate, endDate) {
    this.id = id;
    this.title = title;
    this.stream = stream;
    this.type = type;
    this.startDate = startDate;
    this.endDate = endDate;
}

//Synthetic Data

let c1 = new course(1, "Databases", "Java", "Part-time", "2021-02-15", "2021-09-15");
let c2 = new course(2, "HTML-CSS", "Java", "Part-time", "2021-02-15", "2021-09-15");
let c3 = new course(3, "ASP.NET", "C#", "Full-time", "2021-02-15", "2021-05-15");
let c4 = new course(4, "Unity", "C#", "Full-time", "2021-02-15", "2021-05-15");

var courses = [c1, c2, c3, c4];

$.each(courses, (i, course) => { addToCourseTable(course) });

function addToCourseTable(course) {
    $("#crsTable > tbody:last-child").append(`
                                <tr id="crs-${course.id}">
                                 <td class="courseData" name="id">${course.id}</td>
                                 <td class="courseData" name="title">${course.title}</td>
                                 <td class="courseData" name="stream">${course.stream}</td>
                                 <td class="courseData" name="type">${course.type}</td>
                                 <td class="courseData" name="startDate">${course.startDate}</td>
                                 <td class="courseData" name="endDate">${course.endDate}</td>
                                 <td>
                                        <button class="btn btn-success" onClick="editCourse(${course.id})" data-toggle="modal" data-target="#crsModal"><i class="fa fa-edit"></i></button>
                                        <button class="btn btn-danger" onClick="deleteCourse(${course.id})"><i class="fa fa-trash"></i></button>
                                 </td>
                                </tr>
                                  `);
}

crsForm.submit(() => {
    let course = {};
    course.id = courses[courses.length - 1].id + 1;
    course.title = $("#title").val();
    course.stream = $("#stream").val();
    course.type = $("#type").val();
    course.startDate = $("#startDate").val();
    course.endDate = $("#endDate").val();

    courses.push(course);
    let msg = "Course successfully Created!";
    flashMessage(msg);
    addToCourseTable(course);

    $("#title").val('');
    $("#stream").val('');
    $("#type").val('');
    $("#startDate").val('');
    $("#endDate").val('');
});

function deleteCourse(id) {
    let action = confirm("Are you sure you want to delete this Course?");
    let msg = "Course deleted successfully!";
    courses.forEach(function (course, index) {
        if (course.id == id && action) {
            courses.splice(index, 1);
            $("#crs-" + course.id).remove();
            flashMessage(msg);
        }
    });
}

function editCourse(id) {
    courses.forEach(function (course, index) {
        if (course.id == id) {
            $(".modal").modal("toggle");

            $('#crsModalLabel').text('Edit Course: ' + course.title + " " + course.stream);

            $(".modal-body").empty();

            $(".modal-body").append(`
                                       <form id="updateCourse" onsubmit="updateCourse(${id}); return false;">

                                       <label for="title">Title</label>
                                       <input id="title" type="text" class="form-control" name="title" value="${course.title}" placeholder="letters only(2 min characters)" required autocomplete="off" minlength="2"> 
                                       
                                       <label for="stream">Strean</label>
                                       <input id="stream" type="text" class="form-control" name="stream" value="${course.stream}" placeholder="letters only(2 min characters)" required autocomplete="off" minlength="2"> 
                                    
                                       <label for="type">Type</label>
                                       <input id="type" type="text" class="form-control" name="type" value="${course.type}" placeholder="letters only(2 min characters)" required autocomplete="off" minlength="2">

                                        <label for="startDate">Start Date</label>
                                        <input id="startDate" type="date" class="form-control" name="startDate" value="${course.startDate}" min="2015-12-31" required>
                                    
                                        <label for="endDate">End Date</label>
                                        <input id="endDate" type="date" class="form-control" name="endDate" value="${course.endDate}" min="2015-12-31" required>
                                   
                                          `);

            $(".modal-footer").empty().append(`
                                        <button type="submit" form="updateCourse" class="btn btn-primary">Save changes</button>
                                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                    </form >
                                `);
        }
    });
}

function updateCourse(id) {

    let msg = "Course updated successfully!";
    let course = {};
    course.id = id;
    courses.forEach(function (course, index) {

        if (course.id == id) {
            $("#updateCourse").children("input").each(function () {

                let value = $(this).val();
                let attr = $(this).attr("name");

                if (attr == "title") {
                    course.title = value;
                }
                else if (attr == "stream") {
                    course.stream = value;
                }
                else if (attr == "type") {
                    course.type = value;
                }
                else if (attr == "startDate") {
                    course.startDate = value;
                }
                else if (attr == "endDate") {
                    course.endDate = value;
                }

            });
            courses.splice(index, 1);
            courses.splice(course.id - 1, 0, course);

            $("tbody #crs-" + course.id).children(".courseData").each(function () {

                let attr = $(this).attr("name");

                if (attr == "title") {
                    $(this).text(course.title);
                }
                else if (attr == "stream") {
                    $(this).text(course.stream);
                }
                else if (attr == "type") {
                    $(this).text(course.type);
                }
                else if (attr == "startDate") {
                    $(this).text(course.startDate);
                }
                else if (attr == "endDate") {
                    $(this).text(course.endDate);
                }

            });
            $(".modal").modal("toggle");
            flashMessage(msg);
            $("#updateCourse").submit((e) => e.preventDefault());
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



//ASSIGNMNET
const assForm = $("#assForm");
const addAssBtn = $("#addAssBtn");
assForm.submit((e) => e.preventDefault());

$(".my-form").hide();

addAssBtn.click(function () {
    $(".my-form").slideToggle(800);
    $(this).text($(this).text() == 'Add Assignment' ? 'Close Register Form' : 'Add Assignment');
    $(this).toggleClass("btn-danger");
});


function assignment(id, title, description, submissionDate, oralMark, totalMark) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.submissionDate = submissionDate;
    this.oralMark = oralMark;
    this.totalMark = totalMark;
}

//Synthetic Data

var a1 = new assignment(1, "C# Application", "Individual Project", "2021-03-15", 50, 100);
var a2 = new assignment(2, "Unity 2D Game", "Group Project", "2021-04-15", 50, 100);
var a3 = new assignment(3, "Web Application", "Group Project", "2021-05-10", 50, 100);
var a4 = new assignment(4, "Mobile Application", "Individual Project", "2021-03-10", 50, 100);

var assignments = [a1, a2, a3, a4];

$.each(assignments, (i, assignment) => { addToAssignmentTable(assignment) });

function addToAssignmentTable(assignment) {
    $("#assTable > tbody:last-child").append(`
                                <tr id="ass-${assignment.id}">
                                 <td class="assignmentData" name="id">${assignment.id}</td>
                                 <td class="assignmentData" name="title">${assignment.title}</td>
                                 <td class="assignmentData" name="description">${assignment.description}</td>
                                 <td class="assignmentData" name="submissionDate">${assignment.submissionDate}</td>
                                 <td class="assignmentData" name="oralMark">${assignment.oralMark}</td>
                                 <td class="assignmentData" name="totalMark">${assignment.totalMark}</td>
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
    assignment.oralMark = $("#oralMark").val();
    assignment.totalMark = $("#totalMark").val();


    assignments.push(assignment);
    let msg = "Assignment successfully Created!";
    flashMessage(msg);
    addToAssignmentTable(assignment);

    $("#title").val('');
    $("#description").val('');
    $("#submissionDate").val('');
    $("#oralMark").val('');
    $("#totalMark").val('');
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
                                      
                                       <label for="oralMark">Oral Mark</label>
                                       <input id="oralMark" type="number" step="0.01" class="form-control" name="oralMark" value="${assignment.oralMark}"
                                              required placeholder="only digits(min 0 max 100)" min="0" max="100"> 

                                       <label for="oralMark">Total Mark</label>
                                       <input id="totalMark" type="number" step="0.01" class="form-control" name="totalMark" value="${assignment.totalMark}"
                                              required placeholder="only digits(min 0 max 100)" min="0" max="100">

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
                else if (attr == "oralMark") {
                    assignment.oralMark = value;
                }
                else if (attr == "totalMark") {
                    assignment.totalMark = value;
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
                else if (attr == "oralMark") {
                    $(this).text(assignment.oralMark);
                }
                else if (attr == "totalMark") {
                    $(this).text(assignment.totalMark);
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


//STUDENT
const stdForm = $("#stdForm");
const addStdBtn = $("#addStdBtn");
stdForm.submit((e) => e.preventDefault());

$(".my-form").hide();

addStdBtn.click(function () {
    $(".my-form").slideToggle(800);
    $(this).text($(this).text() == 'Add Student' ? 'Close Register Form' : 'Add Student');
    $(this).toggleClass("btn-danger");
});


function student(id, firstName, lastName, dateOfBirth, tuitionFee, courses, assignments) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.dateOfBirth = dateOfBirth;
    this.tuitionFee = tuitionFee;
    this.courses = courses;
    this.assignments = assignments;
}

//Synthetic Data

let s1 = new student(1, "Kostas", "Papandreou", "1990-11-28", 2500, [c1], [a2]);
let s2 = new student(2, "Petros", "Papapetrou", "1991-12-28", 2500, [c2], [a2, a1]);
let s3 = new student(3, "Nikos", "Nikolaou", "1989-02-28", 2500, [c2, c1], [a2, a1]);
let s4 = new student(4, "Giannis", "Papagiannis", "1993-12-28", 2500, [c3], [a3, a4]);
let s5 = new student(5, "Anaksimadros", "Evaggelou", "1993-02-28", 2500, [c4], [a3, a4]);
let s6 = new student(6, "Giorgos", "Georgiou", "1990-02-22", 2500, [c3, c4], [a3, a4, a1]);

var students = [s1, s2, s3, s4, s5, s6];

$.each(students, (i, student) => { addToStudentTable(student) });

function addToStudentTable(student) {
    $("#stdTable > tbody:last-child").append(`
                                <tr id="std-${student.id}">
                                 <td class="studentData" name="id">${student.id}</td>
                                 <td class="studentData" name="firstName">${student.firstName}</td>
                                 <td class="studentData" name="lastName">${student.lastName}</td>
                                 <td class="studentData" name="dateOfBirth">${student.dateOfBirth}</td>
                                 <td class="studentData" name="tuitionFee">${student.tuitionFee}€</td>
                                 <td class="studentData" name="courses"><ul>${showStdCourses(student)}</ul></td>
                                 <td class="studentData" name="assignments"><ul>${showAssignments(student)}</ul></td>
                                 <td>
                                        <button class="btn btn-success" onClick="editStudent(${student.id})" data-toggle="modal" data-target="#stdModal"><i class="fa fa-edit"></i></button>
                                        <button class="btn btn-danger" onClick="deleteStudent(${student.id})"><i class="fa fa-trash"></i></button>
                                 </td>
                                </tr>
                                  `);
}

function showStdCourses(student) {
    var template = "";
    for (var course of student.courses) {
        template += `
                     <li> ${course.title}</li >
                    `
    }
    return template;
}


function showAssignments(student) {
    var template = "";
    for (var assignment of student.assignments) {
        template += `
                     <li> ${assignment.title}</li >
                    `
    }
    return template;
}

function studentAvailableCourses(course) {

    $("#stdSelectC").append(`
                            <option value="${course.id}">${course.title}</option>
                          `);
}

$.each(courses, (i, course) => studentAvailableCourses(course));

function studentAvailableAssignments(assignment) {

    $("#stdSelectA").append(`
                            <option value="${assignment.id}">${assignment.title}</option>
                          `);
}

$.each(assignments, (i, assignment) => studentAvailableAssignments(assignment));

stdForm.submit(() => {
    let student = {};
    student.id = students[students.length - 1].id + 1;
    student.firstName = $("#first-name").val();
    student.lastName = $("#last-name").val();
    student.dateOfBirth = $("#dateOfBirth").val();
    student.tuitionFee = $("#tuitionFee").val();
    student.courses = [];
    student.assignments = [];

    $.each($("#stdSelectC").children("option:selected"), function () {
        student.courses.push({
            'id': $(this).val(),
            'title': $(this).text()
        });
    });

    $.each($("#stdSelectA").children("option:selected"), function () {
        student.assignments.push({
            'id': $(this).val(),
            'title': $(this).text()
        });
    });

    students.push(student);
    let msg = "Student successfully Created!";
    flashMessage(msg);
    addToStudentTable(student);

    $("#first-name").val('');
    $("#last-name").val('');
    $("#dateOfBirth").val('');
    $("#tuitionFee").val('');
    $("#stdSelectC").children("option:selected").prop("selected", false);
    $("#stdSelectA").children("option:selected").prop("selected", false);
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
                   
                                       <label for="tuitonFee">Tuition Fee</label>
                                       <input id="tuitionFee" type="number" step="0.01" class="form-control" name="tuitionFee"  value="${student.tuitionFee}"
                                                   required placeholder="Tuition Fee" min="1" max="10000">

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
                else if (attr == "tuitionFee") {
                    student.tuitionFee = value;
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
                else if (attr == "tuitionFee") {
                    $(this).text(student.tuitionFee);
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


//TRAINER

const trForm = $("#trForm");
const addTrBtn = $("#addTrBtn");
trForm.submit((e) => e.preventDefault());

$(".my-form").hide();

addTrBtn.click(function () {
    $(".my-form").slideToggle(800);
    $(this).text($(this).text() == 'Add Trainer' ? 'Close Register Form' : 'Add Trainer');
    $(this).toggleClass("btn-danger");
});


function trainer(id, firstName, lastName, subject, courses) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.subject = subject;
    this.courses = courses;
}

//Synthetic Data

let t1 = new trainer(1, "Mister", "Miyiagi", "Computer-Science", [c1, c2]);
let t2 = new trainer(2, "ObiWan", "Kenobi", "Computer-Science", [c1]);
let t3 = new trainer(3, "Darth", "Veider", "Computer-Science", [c3]);
let t4 = new trainer(4, "Gandalf", "Thegray", "Computer-Science", [c4]);

var trainers = [t1, t2, t3, t4];

$.each(trainers, (i, trainer) => { addToTrainerTable(trainer) });

function addToTrainerTable(trainer) {
    $("#trTable > tbody:last-child").append(`
                                <tr id="tr-${trainer.id}">
                                 <td class="trainerData" name="id">${trainer.id}</td>
                                 <td class="trainerData" name="firstName">${trainer.firstName}</td>
                                 <td class="trainerData" name="lastName">${trainer.lastName}</td>
                                 <td class="trainerData" name="subject">${trainer.subject}</td>
                                 <td class="trainerData" name="courses"><ul>${trainer.courses.map(trc => `<li> ${trc.title}</li>`).join('')}</ul></td>
                                 <td>
                                        <button class="btn btn-success" onClick="editTrainer(${trainer.id})" data-toggle="modal" data-target="#trModal"><i class="fa fa-edit"></i></button>
                                        <button class="btn btn-danger" onClick="deleteTrainer(${trainer.id})"><i class="fa fa-trash"></i></button>
                                 </td>
                                </tr>
                                  `);
}

function trainerAvailableCourses(course) {

    $("#trSelect").append(`
                            <option value="${course.id}">${course.title}</option>
                          `);
}

$.each(courses, (i, course) => trainerAvailableCourses(course));

trForm.submit(() => {
    let trainer = {};
    trainer.id = trainers[trainers.length - 1].id + 1;
    trainer.firstName = $("#first-name").val();
    trainer.lastName = $("#last-name").val();
    trainer.subject = $("#subject").val();
    trainer.courses = [];

    $.each($("#trSelect").children("option:selected"), function () {
        trainer.courses.push({
            'id': $(this).val(),
            'title': $(this).text()
        });
    });


    trainers.push(trainer);
    let msg = "Trainer successfully Created!";
    flashMessage(msg);
    addToTrainerTable(trainer);

    $("#first-name").val('');
    $("#last-name").val('');
    $("#subject").val('');
    $("#trSelect").children("option:selected").prop("selected", false);
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




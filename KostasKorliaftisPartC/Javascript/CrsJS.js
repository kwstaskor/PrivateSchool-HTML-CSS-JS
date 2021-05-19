const crsForm = $("#crsForm");
const addCrsBtn = $("#addCrsBtn");
crsForm.submit((e) => e.preventDefault());

$(".my-form").hide();

addCrsBtn.click(function () {
    $(".my-form").slideToggle(800);
    $(this).text($(this).text() == 'Add Course' ? 'Close Register Form' : 'Add Course');
    $(this).toggleClass("btn-danger");
});


function course(id, title, stream, type , startDate , endDate) {
    this.id = id;
    this.title = title;
    this.stream = stream;
    this.type = type;
    this.startDate = startDate;
    this.endDate = endDate;
}

//Synthetic Data

let c1 = new course(1, "Database", "Java", "Part-time" , "2021-02-15" , "2021-09-15");
let c2 = new course(2, "HTML-CSS", "Java", "Part-time", "2021-02-15", "2021-09-15");
let c3 = new course(3, "ASP.NET", "C#", "Full-time", "2021-02-15", "2021-05-15");
let c4 = new course(4, "Unity", "C#", "Full-time", "2021-02-15", "2021-05-15");

var courses = [c1, c2, c3, c4];

$.each(courses, (i, course) => { addToCourseTable(course) });

function addToCourseTable(course) {
    $("table > tbody:last-child").append(`
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

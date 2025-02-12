// Add your API endpoint here
var API_ENDPOINT = "https://1hluspa5b0.execute-api.us-east-1.amazonaws.com/prod";

// AJAX POST request to save student data
document.getElementById("savestudent").onclick = function(){
    var inputData = {
        "studentid": $('#studentid').val(),
        "name": $('#name').val(),
        "class": $('#class').val(),
        "age": $('#age').val()
    };
    $.ajax({
        url: API_ENDPOINT,
        type: 'POST',
        data:  JSON.stringify(inputData),
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            document.getElementById("studentSaved").innerHTML = "Student Data Saved!";
        },
        error: function () {
            alert("Error saving student data.");
        }
    });
}

// AJAX GET request to retrieve all students
document.getElementById("getstudents").onclick = function(){  
    $.ajax({
        url: API_ENDPOINT,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            // Clear existing table rows (except header)
            $('#studentTable tr').slice(1).remove();

            // Sort students by ID in ascending order
            response.sort((a, b) => a.studentid - b.studentid);

            // Append sorted students to table
            jQuery.each(response, function(i, data) {          
                $("#studentTable").append("<tr> \
                    <td>" + data['studentid'] + "</td> \
                    <td>" + data['name'] + "</td> \
                    <td>" + data['class'] + "</td> \
                    <td>" + data['age'] + "</td> \
                    </tr>");
            });
        },
        error: function () {
            alert("Error retrieving student data.");
        }
    });
}
        // success: function (response) {
//             $('#studentTable tr').slice(1).remove();
//             jQuery.each(response, function(i, data) {          
//                 $("#studentTable").append("<tr> \
//                     <td>" + data['studentid'] + "</td> \
//                     <td>" + data['name'] + "</td> \
//                     <td>" + data['class'] + "</td> \
//                     <td>" + data['age'] + "</td> \
//                     </tr>");
//             });
//         },
//         error: function () {
//             alert("Error retrieving student data.");
//         }
//     });
// }

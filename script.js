$(function () {
    getAPI();
    $("#data").on("click", "#delete", deleteRecipe);
    $("#addRecipe").click(postRecipe);
    $("#data").on("click", "#edit", editRecipe);
    $("#save").click(updateRecipe);
});

function deleteRecipe() {
    var del = $(this);
    var parent = del.closest(".recipe");
    let id = parent.attr("id");

    $.ajax({
        url: "https://usman-fake-api.herokuapp.com/api/recipes/" + id,
        method: "DELETE",
        success: function () {
            parent.remove();
        }
    });
}

function getAPI() {
    $.ajax({
        url: "https://usman-fake-api.herokuapp.com/api/recipes/",
        method: "GET",
        success: function (response) {
            for (var i = 0; i < response.length; i++) {
                $("#data").append(`<div class="recipe" id=${response[i]._id}><h2>${response[i].title}</h2><br><p>${response[i].body}</p><button type="button" id="delete" class="btn btn-danger">Delete</button><button type="button" class="btn btn-info" id="edit">Edit</button></div>`);
            }
        }
    });
}

function postRecipe() {
    var title = $("#title").val();
    var body = $("#body").val();

    $.ajax({
        url: "https://usman-fake-api.herokuapp.com/api/recipes/",
        data: { title, body },
        method: "POST",
        success: function () {
            getAPI();
        }
    });
}

function editRecipe() {
    var editBtn = $(this);
    var parent = editBtn.closest(".recipe");
    let id = parent.attr("id");

    $.get("https://usman-fake-api.herokuapp.com/api/recipes/" + id, function (response) {
        $("#updateId").val(response._id);
        $("#updateTitle").val(response.title);
        $("#updateDescription").val(response.body);
        $("#updateModal").modal("show");
    });
}

function updateRecipe() {
    var id = $("#updateId").val();
    var title = $("#updateTitle").val();
    var body = $("#updateDescription").val();

    $.ajax({
        url: "https://usman-fake-api.herokuapp.com/api/recipes/" + id,
        data: { title, body },
        method: "PUT",
        success: function () {
            $("#updateModal").modal("hide");
            getAPI();
        }
    });
}


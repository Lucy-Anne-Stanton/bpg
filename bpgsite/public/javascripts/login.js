$(document).ready(function () {
    $("#btnLogin").click(function () {
        if(loginValidate())
        login();
    })
})

function login()
{
    var param = {};
    var username = $("#txtEmail").val();
    var password = MD5($("#txtPassword").val());
    param.username = $.trim(username);
    param.password = $.trim(password);
    param.mode = "login";
    $.post("functionality.php",param,function(data){
        
    })
}

function loginValidate()
{
    var result = true;
    var username = $("#txtEmail").val();
    var password = $("#txtPassword").val();

    $("#txtEmail").css("border-color", "");
    $("#txtPassword").css("border-color", "");
    
    if (username == "") {
        $("#txtEmail").attr("placeholder", "Email is Mandatory");
        $("#txtEmail").css("border-color", "red");
        $("#txtEmail").focus();
        result = false;
    }
    else if (!validateEmail(username)) {
    $("#txtEmail").val("");
        $("#txtEmail").attr("placeholder", "Enter correct Email");
        $("#txtEmail").css("border-color", "red");
        $("#txtEmail").focus();
        result = false;
    }
    else if (password == "") {
        $("#txtPassword").attr("placeholder", "Password is Mandatory");
        $("#txtPassword").css("border-color", "red");
        $("#txtPassword").focus();
        result = false;
    }

    return result;
}

function validateEmail($email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (!emailReg.test($email)) {
        return false;
    }
    else {
        return true;
    }
}
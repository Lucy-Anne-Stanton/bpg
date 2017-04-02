$(document).ready(function(){
    $( "#txtDOB" ).datepicker({changeYear: true});
    $("#btnSignup").click(function () {
        if(signUpValidate())
        signUp();
    })
})
function signUp()
{
    var param = {};
    var firstName = $("#txtFirstName").val();
    var lastName = $("#txtLastName").val();
    var mobile = $("#txtMobile").val();
    var email = $("#txtEmail").val();
    var password = MD5($("#txtPassword").val());
    var dob = $("#txtDOB").val();
    var gender = $("#txtGender").val();

    param.firstName = $.trim(firstName);
    param.lastName = $.trim(lastName);
    param.mobile = $.trim(mobile);
    param.email = $.trim(email);
    param.password = $.trim(password);
    param.dob = $.trim(dob);
    param.gender = $.trim(gender);
    param.mode = "signUp";

    $.post("functionality.php",param,function(data){
        
    })
}
function signUpValidate()
{
    var result = true;
    var firstName = $("#txtFirstName").val();
    var lastName = $("#txtLastName").val();
    var mobile = $("#txtMobile").val();
    var email = $("#txtEmail").val();
    var password = $("#txtPassword").val();
    var dob = $("#txtDOB").val();
    var gender = $("#txtGender").val();

    $("#txtFirstName").css("border-color", "");
    $("#txtLastName").css("border-color", "");
    $("#txtMobile").css("border-color", "");
    $("#txtEmail").css("border-color", "");
    $("#txtDOB").css("border-color", "");
    $("#txtGender").css("border-color", "");

    if(firstName=="")
    {
        $("#txtFirstName").attr("placeholder", "First name is Mandatory");
        $("#txtFirstName").css("border-color", "red");
        $("#txtFirstName").focus();
        result = false;
    }
    else if(lastName=="")
    {
        $("#txtLastName").attr("placeholder", "Last name is Mandatory");
        $("#txtLastName").css("border-color", "red");
        $("#txtLastName").focus();
        result = false;
    }
    else if(mobile=="")
    {
        $("#txtMobile").attr("placeholder", "Mobile is Mandatory");
        $("#txtMobile").css("border-color", "red");
        $("#txtMobile").focus();
        result = false;
    }
    else if(!(mobile.length>=10 && mobile.length<=11))
    {
        $("#txtMobile").attr("placeholder", "Mobile is invalid");
        $("#txtMobile").css("border-color", "red");
        $("#txtMobile").focus();
        result = false;
    }
    else if(email=="")
    {
        $("#txtEmail").attr("placeholder", "Email is Mandatory");
        $("#txtEmail").css("border-color", "red");
        $("#txtEmail").focus();
        result = false;
    }
    else if(!validateEmail(email))
    {
        $("#txtEmail").attr("placeholder", "Email is incorrect");
        $("#txtEmail").css("border-color", "red");
        $("#txtEmail").focus();
        result = false;
    }
    else if(password=="")
    {
        $("#txtPassword").attr("placeholder", "Password is mandatory");
        $("#txtPassword").css("border-color", "red");
        $("#txtPassword").focus();
        result = false;
    }
    else if(dob=="")
    {
        $("#txtDOB").attr("placeholder", "DOB is mandatory");
        $("#txtDOB").css("border-color", "red");
        $("#txtDOB").focus();
        result = false;
    }
    else if(gender=="")
    {
        $("#txtGender").attr("placeholder", "Gender is mandatory");
        $("#txtGender").css("border-color", "red");
        $("#txtGender").focus();
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
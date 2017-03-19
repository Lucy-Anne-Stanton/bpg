


var register = function (Handlebars) {
    var helpers = {
    listItem: function (from, to, context, options) {
        
        var item = "";
        for (var i = from, j = to; i < j; i++) {
            item = item + options.fn(context[i]);
        }
            return item;
        }
    };

    Handlebars.registerHelper('listFirstThree', function (context, options) {
         var ret = ""; for (var i = 0, j = 3; i < j; i++) {
              ret = ret + options.fn(context[i]); 
            } return ret; 
        });


if (Handlebars && typeof Handlebars.registerHelper === "function") {
    for (var prop in helpers) {
        Handlebars.registerHelper(prop, helpers[prop]);
    }
} else {
    return helpers;
}

};

module.exports.register = register;
module.exports.helpers = register(null);
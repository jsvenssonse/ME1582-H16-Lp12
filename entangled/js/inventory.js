$(document).ready(function(){
var item;
function inventory(item) {
    var saveInventory;
    saveInventory = [{
       "name" : item
    }]; 

var setCookie = Cookies.set("name", saveInventory, {expires : 0.00001});


    return Cookies.get("name");
}


console.log(inventory("item"));
});



  
    
    
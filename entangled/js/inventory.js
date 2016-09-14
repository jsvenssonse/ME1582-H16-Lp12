$(document).ready(function(){
var item;
function inventory(item) {
    var saveInventory = document.cookie;
    saveInventory = [{
       "name" : item,
        "expires" : "Mon, 12 Sep 2016 16:00:00 GMT+1"
    }]; 
 
    return saveInventory;
}
});



  
    
    
Cookies.set("name", "value");
console.log(Cookies.get("name")); // => 'value'
$(document).ready(function(){
var item;
function inventory(item) {
    var saveInventory;
    saveInventory = [{
       "name" : item
    }]; 

var setCookie = Cookies.set("name", saveInventory);


    return Cookies.get("name");
}

//Static items for the game
function itemArray() {
    var itemArray;
    itemArray = [
    {
       "name" : "keyOne",
       "img" : "../graphics/nyckel1.png"
    },
    {
       "name" : "keyTwo",
       "img" : "../graphics/nyckel2.png"
    }
    ]; 


    return itemArray;
}
for (i in itemArray()) {
    $('#items').append('<img src="'+ itemArray()[i].img  +'" />');
}

});



  
    
    
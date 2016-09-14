$(document).ready(function(){
    var item;
    // fix dynamisk to add more objects the more items we add for loop
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

    function saveState(unlocked, index) {
        var saveState;


        saveState = [
        {
        
        "name" : "DoorOne",
        "img" : "../graphics/door1.png",
        "unlocked" : unlocked
        },
        {
        
        "name" : "DoorTwo",
        "img" : "../graphics/door2.png",
        "unlocked" : unlocked
        },
        {
        
        "name" : "DoorThree",
        "img" : "../graphics/door3.png",
        "unlocked" : unlocked
        }
        ];

        if (unlocked == 0) {
        $('#items .door').removeClass('locked');
        $('#items .door').addClass('unlocked');
        }
        
        Cookies.set("save", saveState[index-1]);
        
        for (i = 0; i < saveState.length; i++) {
            $('#items').append('<img class="door locked" src="'+ saveState[i].img  +'" />');
        }


        return saveState;


    }

            console.log($('#items'));

    console.log(saveState(0, 1));

    console.log(Cookies.getJSON('save'))


});



  
    
    
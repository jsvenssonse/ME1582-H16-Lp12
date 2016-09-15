

    // fix dynamisk to add more objects the more items we add for loop
    function inventory(item, top,left) {
        var saveInventory;
        saveInventory = [{
        "name" : item,
        "top" : top,
        "left" : left
        }];
        
        

        var setCookie = Cookies.set("items", saveInventory);
        
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

            /*console.log($('#items'));

    console.log(saveState(0, 1));*/

    console.log(Cookies.getJSON('name'))

  
    
    
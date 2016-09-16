

   
    function inventory(item, top,left,inInventory) {
        var saveInventory;
        saveInventory = [{
        "name" : item,   // FIX dynamisk to add more objects the more items we add for loop
        "top" : top,
        "left" : left,
        "inInventory" : inInventory
        }];
        

        

        var setCookie = Cookies.set("items", saveInventory);
        
    }

    function inInventory() {
       
    }
    
    function updateCookies() {

        var items = [Cookies.get("items").replace(/\[|\]|\{|\}|top|left|inInventory|/g,'').split(",").splice(1, 4)]
        var top = items[0][0].replace(/\"|:|/g, '');
        var left = items[0][1].replace(/\"|:|/g, '');
        var inInventory = items[0][2].replace(/\"|:|/g, '');
        var positions = [{
            top: top,
            left: left,
            inInventory: inInventory
        }]
       
        return positions;
    }
    function updateField(removeDiv) {

        
            $("#" + removeDiv + "").css("display", "none");
            $("#" + removeDiv + "").remove(removeDiv);
             $("#inventory").prepend("<img  src='img/"+ removeDiv +".png' id='item'/>").position();
   
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


  
    
    
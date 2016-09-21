    

            //Kan spelaren röra på sig?
            var canMove = [true];
            //var nearMovable = [];

            //Array med alla block inlagda som objekt.
            var blocks = [];
            var map = {};
            var player = {};


            // ** VARIABLER **//


            //-----------------------------------------------------------------------------------------------
            
            // ** FUNKTIONER **// 

            //calculateBlocks: Hämtar all information från alla divar med klassen .stop, 
            //och organiserar det som objekt i 'blocks[];'

            //--------------------------------------------------------------------------------------[calculate()]

            function calculatePlayer() {
                $("#box").each(function(i) {
                    var getPosition =  $(this).position(); 
                        player.top = getPosition.top;  
                        player.left = getPosition.left;  
                        player.bottom = getPosition.top + $(this).height(); 
                        player.right =  getPosition.left + $(this).width(); 
                        player.size = $(this).height();  // Den vertikala positionen
                        player.speed =  10; // Den horisontella positionen
                }); 
            }

            function calculateMapSize() {
                $(".displayContent").each(function(i) {
                        map.top = 0;  
                        map.left = 0;  
                        map.bottom = $(this).height()  - 5;  // Den vertikala positionen
                        map.right =  $(this).width() - 5; // Den horisontella positionen
                        map.id =  $(this).attr('id'); // Den horisontella positionen
                   
                });
            }

            function calculateBlocks() {
                $(".collision").each(function(i) {
                    var getPosition =  $(this).position(); // Hämta blockets position på kartan
                    var first = $(this).attr('class').split(" ")[0]; // Hämta den första klassen (door, stop)

                    blocks.push({
                        id: $(this).attr('id'), // Blockets ID (samma som ID:et på diven)
                        top: (getPosition.top - player.size),   
                        left: (getPosition.left - player.size),  
                        bottom: (getPosition.top + $(this).height() -5) ,  
                        image: $(this).css('background-image'),  
                        right: (getPosition.left + $(this).width()) -5,  
                        height: $(this).height(), // Höjden
                        width: $(this).width(), // Bredden
                        type: first, // Första klassen (Door, Collision, etc)
                    });
                        //nearMovable.push(false);


                });
            }


            
            //colliding(): En funktion för att kolla om spelaren har gått in i ett block.

            //-------------------------------------------------------------------------------[checkForBlocks()]

            function colliding(object, radius) {
                if ((object.top >= blocks[i].top + 5 - radius) && (object.top <= blocks[i].bottom - 5 + radius) && (object.left <= blocks[i].right - 5 + radius)  && (object.left > blocks[i].left - radius))  {
                    return true;
                } else {
                    return false;
                }
            }

            //------------------------------------------------------------------------------------------------
            
            //checkForBlocks: Körs när man går, använder sig av colliding().

            //-------------------------------------------------------------------------------[checkForBlocks()]
            function checkForBlocks(x) {

                //Loopar igenom objekten i blocks[]
                for (i = 0; i < blocks.length; i++) {

                    //Om objektet är ett hinder eller en dörr
                    if (blocks[i].type !== "movable") {
                        //Är spelaren nära?
                        var collide = colliding(player, 0);
                            if(collide == true) {

                                //Om ja: Nej, vi kan inte gå åt det hållet.
                                canMove[i] = false;

                    if (blocks[i].type == "entry") { 

                        newPage =  blocks[i].id;
                        $(".displayContent").fadeOut(2000);
                        setTimeout(function(){$(location).attr('href', 'file:///C:/Users/Isa/Desktop/movement/' + newPage + '.html');}, 2000);

                    }  

                 

                            }      
                            else {
                                //Om nej: Ja, vi kan gå åt det hållet.     
                                canMove[i] = true;

                            }



                    }  
      
            }
            }


            //------------------------------------------------------------------------------------------------
            
            //checkForDoors: Undersöker ifall spelaren är i närheten av en dörr när de trycker på mellanslag.

            //-------------------------------------------------------------------------------[checkForDoors()]

            function checkForDoors() {

                //Loopa igenom alla objekten först.
                for (i = 0; i < blocks.length; i++) {

                    if (blocks[i].type == "door") {
                        var collide = colliding(player, 10);

                         if(collide == true) {
                            var bg =  blocks[i].image;

                            var newbg = bg.replace('.png','').replace(')','').replace(/\"/g, "").replace(/url\(/g, "");
                            console.log(newbg);


                            $("#" + blocks[i].id + "").removeClass("collision"); //Ta bort klassen 'stop' på dörren.

                            //Ändra bakgrundsbilden till en öppen dörr.
                            $("#" + blocks[i].id + "").css({'background-image':'url(' + newbg  +'Open.png)'});
                            $(".displayContent").append("<img src='"+ newbg  + "Half.png' class='openDoor' style='top: " + (blocks[i].top + player.size) + "px; left: " + (blocks[i].left + player.size) +"px;'/>");
                            console.log(blocks[i].left);

                            //Ta bort dörren från blocks[]
                            blocks.splice(0,blocks.length);
                            calculateBlocks();
                            canMove[i] = true;
                        }  
                    }  
                }
            }

            //------------------------------------------------------------------------------------------------


            //------------------------------------------------------------------------------------------------
            
            //checkForItems: Undersöker ifall spelaren är i närheten av ett item när de trycker på mellanslag.

            //-------------------------------------------------------------------------------[checkForItems()]

            function checkForItems() {

                //Loopa igenom alla objekten först.
                for (i = 0; i < blocks.length; i++) {

                    if (blocks[i].type == "item") {
                        var collide = colliding(player, 10);
                         if(collide == true) {

                            console.log(blocks[i].id);
                            $("#" + blocks[i].id + "").removeClass("stop"); //Ta bort klassen 'stop' på items.

                            $("#" + blocks[i].id + "").hide(); //Ta bort klassen 'stop' på items.
                            
                            var newPosition = $("#inventory").prepend("<img  src='img/"+ blocks[i].id +".png' id='item'/>").position(); //Ta bort klassen 'stop' på items.
                            console.log(newPosition);
                            inventory(blocks[i].id, newPosition.top, newPosition.left)
                            
                            //Ta bort items från blocks[]
                            blocks.splice(0,blocks.length);
                            calculateBlocks();
                            canMove[i] = true;
                        }      
                    }                 
                }
            }



            function risingEffect(howmany, type, right, left, top, bottom) {

                var i = 0, howManyTimes = howmany;
                    function effect() {
                        var effectRight = Math.floor((Math.random()*(left-right+1)+right));
                        var effectSpeed = Math.floor((Math.random()*(1500-1000+1)+1000));
                        var effectShape = Math.floor((Math.random()*(2-1+1)+1));
                        var effectTop = Math.floor((Math.random()*(top-bottom+1)+top));
                        $(".displayContent").append("<div class='" + type +" " + type +"" + i + "' style='left: "+ effectRight + "px; top: " + bottom +"px; background-image: url(img/" + type +"" + effectShape + ".png')></div>");
                        $("." + type +"" + i + "").animate({
                        top: "" + effectTop +"",
                        opacity: 0,
                        }, effectSpeed);
                        $("." + type +"" + i + "").fadeOut(500);

                        i++;
                        if( i < howManyTimes ){
                            setTimeout( effect, 50 );
                        }
                    }
                    effect();

                    setTimeout(function(){$("." + type +"").remove();}, (howmany * 100));
            }


            function putInInventory(objectID, objectTop) {
               $("#" + objectID + "").animate({
                      top: "" + objectTop + "",
                      opacity: 0,
                }, 500);
               $("#" + objectID + "").removeClass("collision");
               var padding = ((51 - blocks[i].height)/ 4 + 3);
               $("#inventory").prepend("<div id='item" + objectID + "'><img  src='img/"+ objectID +".png'  style='padding-top: " + padding + "px'/></div>"); 
                blocks.splice(0,blocks.length);
                calculateBlocks();   
            }


             



            //------------------------------------------------------------------------------------------------



            $(document).ready(function() {
            //------------------------------------------------------------------------------------------------

            //Kalkylera och lägg in all information i blocks[];

            calculatePlayer();
            calculateMapSize();
            calculateBlocks();
            //------------------------------------------------------------------------------------------------

            if (map.id == "entangledMap") {
            calculateMirror();
            }

            if (map.id =="diffractionMap") {
                setInterval(function(){ twinklingStars(1); }, 2500);
                setInterval(function(){ twinklingStars(2); }, 2500);
                setInterval(function(){ twinklingStars(3); }, 2500);
            }

            //------------------------------------------------------------------------------------------------
            
            //document-keydown: Alla tangentryckningar.

            //------------------------------------------------------------------------------[document-keydown]


            $(document).keydown(function(pk){
            calculatePlayer();

            if (map.id == "entangledMap") {
                mirroredWalk(pk);
            }
             else {

                     //Gå till vänster (vänsterpil).
            if(pk.keyCode == '37' && player.left > map.left) {
                player.left -= player.speed;
                checkForBlocks('left');
                if(jQuery.inArray(false, canMove) == -1) {
                $('#box').css('left', player.left + 'px'); 
                }}

            //Gå till höger (högerpil).
            if(pk.keyCode == '39' && player.right < map.right) {
                player.left += player.speed;
                checkForBlocks('right');
                if(jQuery.inArray(false, canMove) == -1) {
                $('#box').css('left', player.left + 'px');      
                }}

            //Gå uppåt (pil uppåt).
            if(pk.keyCode == '38' && player.top > map.top) {    
                player.top -= player.speed;
                checkForBlocks('up');
                if(jQuery.inArray(false, canMove) == -1) {
                $('#box').css('top', player.top +'px');
                }}

            //Gå neråt (pil neråt).
            if(pk.keyCode == '40' && player.bottom < map.bottom) {

                player.top += player.speed;     
                checkForBlocks('down');
                if(jQuery.inArray(false, canMove) == -1) {
                $('#box').css('top', player.top + 'px');
                
                }}
             }
       
            //Öppna dörrar (Mellanslag)
            if(pk.keyCode == '32') {
                checkForDoors();
                checkForItems();

                if (map.id == "secretMap") {
                swapPainting();
                }

                if (map.id == "diffractionMap") {
                placeDiamond();
                }
                }
            });

            //------------------------------------------------------------------------------------------------

            //------------------------------------------------------------------------------------------------

    });
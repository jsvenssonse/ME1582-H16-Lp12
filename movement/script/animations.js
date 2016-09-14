    $(document).ready(function() {

            // ** VARIABLER **//

            //Spelarens hastighet
            var playerSpeed = 10; // Hur många pixlar framåt den rör sig när man trycker "gå".

            //Spelarens storlek i pixlar
            var playerSize = 40;

            //Kan spelaren röra på sig?
            var canMove = [true];

            //Array med alla block inlagda som objekt.
            var blocks = [];

            //-----------------------------------------------------------------------------------------------
            
            // ** FUNKTIONER **// - att göra: mapsize.

            //calculateBlocks: Hämtar all information från alla divar med klassen .stop, 
            //och organiserar det som objekt i 'blocks[];'

            //-------------------------------------------------------------------------------[calculatelocks()]
            function calculateBlocks() {
                $(".stop").each(function(i) {
                    var getPosition =  $(this).position(); // Hämta blockets position på kartan
                    var first = $(this).attr('class').split(" ")[0]; // Hämta den första klassen (door, stop)

                    blocks.push({
                        id: $(this).attr('id'), // Blockets ID (samma som ID:et på diven)
                        top: getPosition.top,  // Den vertikala positionen
                        left: getPosition.left, // Den horisontella positionen
                        height: $(this).height(), // Höjden
                        width: $(this).width(), // Bredden
                        type: first, // Första klassen (Door, Stop, etc)
                    });

                });
            }

            //------------------------------------------------------------------------------------------------

            //Kalkylera och lägg in information i blocks[];
            calculateBlocks();

            //------------------------------------------------------------------------------------------------
            
            //checkForBlocks: Undersöker ifall spelaren är i närheten av ett av objekten i blocks[].

            //-------------------------------------------------------------------------------[checkForBlocks()]
            function checkForBlocks(a, x) {

                //Loopar igenom objekten i blocks[]
                for (i = 0; i < blocks.length; i++) {
                    
                    var bBox = (blocks[i].height + blocks[i].top);  //Hur nära man kan komma den underifrån
                    var tBox = (blocks[i].top - playerSize);        //Hur nära man kan komma den ovanfrån
                    var rBox = (blocks[i].left + blocks[i].width);  //Hur nära man kan komma den från höger
                    var lBox = (blocks[i].left - playerSize);       //Hur nära man kan komma den från vänster

                    //-----------------------------------------------------------------------[checkForBlocks()]

                    //Om objektet är ett hinder eller en dörr
                    if (blocks[i].type == "stop" || blocks[i].type == "door" || blocks[i].type == "item") {

                        //Är spelaren nära?
                        if (a.top > tBox && (a.top < bBox) && a.left < rBox  && (a.left > lBox))  {

                            //Om ja: Nej, vi kan inte gå åt det hållet.
                            canMove[i] = false;
                        }      
                        else {
                            //Om nej: Ja, vi kan gå åt det hållet.     
                            canMove[i] = true;
                            }
                    }  
 

                    //-----------------------------------------------------------------------[checkForBlocks()]

                    //Om objektet är ett flyttbart block

                    if (blocks[i].type == "movable") {

                        //Är spelaren nära?
                        if (a.top > tBox && (a.top < bBox) && a.left < rBox  && (a.left > lBox))  {

                            //Om ja: Ja, vi kan gå dit - för blocket är knuffbart.
                            canMove[i] = true;

                            //Här knuffar vi blocket åt höger.
                            if (x == 'right') {
                                blocks[i].left += playerSpeed;                                      // Rör blocket åt höger i samma hastighet som spelaren.
                                $('#' + blocks[i].id + '').css('left', blocks[i].left + 'px');      // Ompositionera blocket på kartan.
                            }

                            //Här knuffar vi blocket neråt
                            if (x == 'left') {
                                blocks[i].left -= playerSpeed;                                      // Rör blocket åt höger i samma hastighet som spelaren.
                                $('#' + blocks[i].id + '').css('left', blocks[i].left + 'px');  
                            }

                            //Här knuffar vi blocket åt höger.
                            if (x == 'down') {
                                blocks[i].top += playerSpeed;                                      // Rör blocket åt höger i samma hastighet som spelaren.
                                $('#' + blocks[i].id + '').css('top', blocks[i].top + 'px');      // Ompositionera blocket på kartan. 
                            }

                            //Här knuffar vi blocket åt höger.
                            if (x == 'up') {
                                blocks[i].top -= playerSpeed;                                      // Rör blocket åt höger i samma hastighet som spelaren.
                                $('#' + blocks[i].id + '').css('top', blocks[i].top + 'px');      // Ompositionera blocket på kartan.  
                            }

                        }      

                    }       
               }
            }


            //------------------------------------------------------------------------------------------------
            
            //checkForDoors: Undersöker ifall spelaren är i närheten av en dörr när de trycker på mellanslag.

            //-------------------------------------------------------------------------------[checkForDoors()]

            function checkForDoors(a) {

                //Loopa igenom alla objekten först.
                for (i = 0; i < blocks.length; i++) {

                    //Hitta dörrarna.
                    if (blocks[i].type == "door") {
                    var bBox = (blocks[i].height + (blocks[i].top + 10));
                    var rBox = (blocks[i].left + (blocks[i].width + 10));
                    var lBox = (blocks[i].left - (playerSize + 10));
                    var tBox = (blocks[i].top - (playerSize + 10)); 

                    //-----------------------------------------------------------------------[checkForDoors()]

                    //Undersök ifall spelaren är nära dörren.

                        if (a.top > tBox && (a.top < bBox) && a.left < rBox  && (a.left > lBox))  {

                            $("#" + blocks[i].id + "").removeClass("stop"); //Ta bort klassen 'stop' på dörren.

                            //Ändra bakgrundsbilden till en öppen dörr.
                            $("#" + blocks[i].id + "").css({'background-image':'url(img/' + blocks[i].type + 'Open.png)'});

                            //Ta bort dörren från blocks[]
                            blocks.splice(0,blocks.length);
                            calculateBlocks();
                            canMove[i] = true;
                        }      
                    }                 
                }
            }

            function checkForItems(a) {

                //Loopa igenom alla objekten först.
                for (i = 0; i < blocks.length; i++) {

                    //Hitta dörrarna.
                    if (blocks[i].type == "item") {
                    var bBox = (blocks[i].height + (blocks[i].top + 10));
                    var rBox = (blocks[i].left + (blocks[i].width + 10));
                    var lBox = (blocks[i].left - (playerSize + 10));
                    var tBox = (blocks[i].top - (playerSize + 10)); 

                    //-----------------------------------------------------------------------[checkForItems()]

                    //Undersök ifall spelaren är nära items.

                        if (a.top > tBox && (a.top < bBox) && a.left < rBox  && (a.left > lBox))  {
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

            //------------------------------------------------------------------------------------------------

            //Knapptryckningar

            //------------------------------------------------------------------------------[Knapptryckningar]

            $(document).keydown(function(pk){

                //Hämta spelarens position.
                var getPos =  $('#box');
                var pos = getPos.position();

                //Gå till vänster (vänsterpil).
                if(pk.keyCode == '37' && pos.left >= '1') {
                    pos.left -= playerSpeed;
                    checkForBlocks(pos, "left");
                    if(jQuery.inArray(false, canMove) == -1) {
                    $('#box').css('left', pos.left + 'px'); }
                    }

                //Gå till höger (högerpil).
                if(pk.keyCode == '39' && pos.left <= '790') {
                    pos.left += playerSpeed;
                    checkForBlocks(pos, "right");
                    if(jQuery.inArray(false, canMove) == -1) {
                    $('#box').css('left', pos.left + 'px');}   
                    }

                //Gå neråt (pil neråt).
                if(pk.keyCode == '38' && pos.top >= '1') {    
                    pos.top -= playerSpeed;
                    checkForBlocks(pos, "up");
                    if(jQuery.inArray(false, canMove) == -1) {
                    $('#box').css('top', pos.top +'px');}
                    }

                //Gå uppåt (pil uppåt).
                if(pk.keyCode == '40' && pos.top <= '450') {
                    pos.top += playerSpeed;
                    checkForBlocks(pos, "down");
                    if(jQuery.inArray(false, canMove) == -1) {
                    $('#box').css('top', pos.top + 'px');}
                    }

                //Öppna dörrar (Mellanslag)
                if(pk.keyCode == '32') {
                    checkForDoors(pos);
                    checkForItems(pos);
                    }


            });

            //------------------------------------------------------------------------------------------------
            var items = [Cookies.get("items").replace('[','').replace(']','').replace('{','').replace('}','')]
console.log(items);
    });

    $(document).ready(function() {


            //Spelarens hastighet
            var playerSpeed = 10;

            //Spelarens storlek i pixlar
            var playerSize = 40;

            //Kan spelaren röra på sig?
            var canMove = [true];
            currentKey = 0;

            var blocks = [];

            //En each-funktion för att hämta ut och pusha in positioner/storlekar från .stop-divarna till arrayerna.
            function calculateBlocks() {
            $(".stop").each(function(i) {
                var getPosition =  $(this).position();
                var first = $(this).attr('class').split(" ")[0];
                blocks.push({
                  id: $(this).attr('id'),
                  top: getPosition.top,
                  left: getPosition.left,
                  height: $(this).height(),
                  width: $(this).width(),
                  type: first,
            });
                    // ^that shit doesnt work, alla blocken får samma properties som första blocket.

            });
        }

            calculateBlocks();

            
            //En funktion som kollar ifall spelaren är i närheten av .stop-divarna.
            function checkForBlocks(a) {

                //För varje .stopdiv (genom att använda antalet platser i stopTop-arrayen)
                for (i = 0; i < blocks.length; i++) {
                    //Bara matte...
                    
                    var bottomBox = (blocks[i].height + blocks[i].top);
                    var rightBox = (blocks[i].left + blocks[i].width);
                    var leftBox = (blocks[i].left - playerSize);
                    var topBox = (blocks[i].top - playerSize);

                    if (a.top > topBox && (a.top < bottomBox) && a.left < rightBox  && (a.left > leftBox))  {

                        //Pusha in "false" i rätt plats i canMove.
                        canMove[i] = false;
                    }      
                    //Om inte:         
                    else {
                        //Pusha in "true" i rätt plats i canMove.
                        canMove[i] = true;
                        }
                    }       
            }

           //Öppna dörrhelvetena
            function checkForDoors(a) {

                for (i = 0; i < blocks.length; i++) {

                    if (blocks[i].type == "door") {
                    var bottomBox = (blocks[i].height + (blocks[i].top + 5));
                    var rightBox = (blocks[i].left + (blocks[i].width + 5));
                    var leftBox = (blocks[i].left - (playerSize - 5));
                    var topBox = (blocks[i].top - (playerSize - 5)); 


                    if (a.top > topBox && (a.top < bottomBox) && a.left < rightBox  && (a.left > leftBox))  {

                        $("#" + blocks[i].id + "").removeClass("stop");
                        $("#" + blocks[i].id + "").css({'background-image':'url(img/' + blocks[i].type + 'Open.png)'});
                        console.log(blocks[i].id);
                       blocks.splice(0,blocks.length);
                        calculateBlocks();
                        canMove[i] = true;
                    }      
                    //Om inte:         
                    else {
                        }
                        console.log(blocks);
                    }   
                    }
                   
            }


            //Rör på spelaren
            $(document).keydown(function(pk){

                //Hämta spelarens position.
                var getPos =  $('#box');
                var pos = getPos.position();

                //Gå till höger.
                if(pk.keyCode == '37' && pos.left >= '1') {
                    pos.left -= playerSpeed;
                    checkForBlocks(pos);
                    if(jQuery.inArray(false, canMove) == -1) {
                    $('#box').css('left', pos.left + 'px'); }
                    }

                //Gå till vänster.
                if(pk.keyCode == '39' && pos.left <= '790') {
                    pos.left += playerSpeed;
                    checkForBlocks(pos);
                    if(jQuery.inArray(false, canMove) == -1) {
                    $('#box').css('left', pos.left + 'px');}   
                    }

                //Gå neråt.
                if(pk.keyCode == '38' && pos.top >= '1') {    
                    pos.top -= playerSpeed;
                    checkForBlocks(pos);
                    if(jQuery.inArray(false, canMove) == -1) {
                    $('#box').css('top', pos.top +'px');}
                    }

                //Gå uppåt.
                if(pk.keyCode == '40' && pos.top <= '450') {
                    pos.top += playerSpeed;
                    checkForBlocks(pos);
                    if(jQuery.inArray(false, canMove) == -1) {
                    $('#box').css('top', pos.top + 'px');}
                    }

                //öppna
                if(pk.keyCode == '32') {
                    checkForDoors(pos);
                    }

            });

    });
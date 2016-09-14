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

            $(".stop").each(function(i) {
                var getPosition =  $(this).position();
                var first = $(this).attr('class').split(" ")[0];
                blocks.push({
                  top: getPosition.top,
                  left: getPosition.left,
                  height: $(this).height(),
                  width: $(this).width(),
                  type: first,
            });

                console.log(blocks);
                    // ^that shit doesnt work, alla blocken får samma properties som första blocket.

            });

            
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



            //Rör på spelaren
            $(document).keydown(function(pk){

                //Hämta spelarens position.
                var getPos =  $('#box');
                var pos = getPos.position();

                //Gå till höger.
                if(pk.keyCode == '37' && pos.left >= '1') {
                    currentKey == 37;
                    pos.left -= playerSpeed;
                    checkForBlocks(pos);
                    if(jQuery.inArray(false, canMove) == -1) {
                    $('#box').css('left', pos.left + 'px'); }
                    }

                //Gå till vänster.
                if(pk.keyCode == '39' && pos.left <= '790') {
                    currentKey == 39;
                    pos.left += playerSpeed;
                    checkForBlocks(pos);
                    if(jQuery.inArray(false, canMove) == -1) {
                    $('#box').css('left', pos.left + 'px');}   
                    }

                //Gå neråt.
                if(pk.keyCode == '38' && pos.top >= '1') {    
                    currentKey == 38;  
                    pos.top -= playerSpeed;
                    checkForBlocks(pos);
                    if(jQuery.inArray(false, canMove) == -1) {
                    $('#box').css('top', pos.top +'px');}
                    }

                //Gå uppåt.
                if(pk.keyCode == '40' && pos.top <= '435') {
                    currentKey == 40;
                    pos.top += playerSpeed;
                    checkForBlocks(pos);
                    if(jQuery.inArray(false, canMove) == -1) {
                    $('#box').css('top', pos.top + 'px');}
                    }

            });

    });
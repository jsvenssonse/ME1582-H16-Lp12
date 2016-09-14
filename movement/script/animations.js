    $(document).ready(function() {


            //Spelarens hastighet
            var playerSpeed = 10;

            //Spelarens storlek i pixlar
            var playerSize = 40;

            //Tomma arrays att pusha in .stop-divarnas positioner och storlekar i.
            var stopTop = [];
            var stopLeft = [];
            var stopHeight = [];
            var stopWidth = [];

            //Kan spelaren röra på sig?
            var canMove = [true];


            //En each-funktion för att hämta ut och pusha in positioner/storlekar från .stop-divarna till arrayerna.

            $(".stop").each(function(i) {

                //Hämta bredden och höjden av alla .stop-divar.
                var getWidth = $(this).width();
                var getHeight = $(this).height();

                //Pusha in värdena i Arrays.
                stopWidth.push(getWidth);
                stopHeight.push(getHeight);

                //Hämta positionen på alla .stop-divar.
                var getPositions =  $(this).position();
                var newTop = getPositions.top;
                var newLeft = getPositions.left;

                //Pusha in värdena i Arrays.
                stopTop.push(newTop);
                stopLeft.push(newLeft);

            });

            
            //En funktion som kollar ifall spelaren är i närheten av .stop-divarna.
            function checkForBlocks(a) {

                //För varje .stopdiv (genom att använda antalet platser i stopTop-arrayen)
                for (i = 0; i < stopTop.length; i++) {
                    //Bara matte...
                    var bottomBox = ((stopHeight[i] + stopTop[i]));
                    var rightBox = (stopLeft[i] + stopWidth[i]);
                    var leftBox = (stopLeft[i] - playerSize);
                    var topBox = (stopTop[i] - playerSize);

                    //Om spelaren är för nära en .stop-div.
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

            //Uppdatera spelarens position i webbläsaren så man kan se (ska tas bort sen)
            $('#box').html("Left:" + $('#box').position().left + "<br> Top" +  $('#box').position().top);


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
                if(pk.keyCode == '40' && pos.top <= '435') {
                    pos.top += playerSpeed;
                    checkForBlocks(pos);
                    if(jQuery.inArray(false, canMove) == -1) {
                    $('#box').css('top', pos.top + 'px');}
                    }

                    //Uppdatera spelarens position i webbläsaren så man kan se (ska tas bort sen)
                    $('#box').html("Left:" + pos.left + "<br> Top" + pos.top);


            });

    });
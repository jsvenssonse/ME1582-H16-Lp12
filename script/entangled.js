          function openEntangledChest() {

                            $("#entangledChest").html("<img src='img/chestOpen.png' style='margin-top: -20px;'>");


                             var i = 0, howManyTimes = 15;
                                function sparkles() {
                                    var sparkleRight = Math.floor((Math.random()*(458-495+1)+495));
                                    var sparkleSpeed = Math.floor((Math.random()*(1500-1000+1)+1000));
                                    var sparkleShape = Math.floor((Math.random()*(3-2+1)+2));
                                    var sparkleTop = Math.floor((Math.random()*(273-300+1)+273));
                                    console.log(sparkleShape);
                                    $(".displayContent").append("<div class='sparkle' style='left: "+ sparkleRight + "px; background-image: url(img/sparkle" + sparkleShape + ".png')></div>");
                                    $(".sparkle").animate({
                                    top: "" + sparkleTop +"",
                                    opacity: 0,
                                    }, sparkleSpeed);
                                    $(".sparkle").fadeOut();

                                    i++;
                                    if( i < howManyTimes ){
                                        setTimeout( sparkles, 50 );
                                    }
                                }
                                sparkles();

            }

            function explodeBars() {
                            $("#bars").css("background", "url(img/entangled/bars.gif)");
                            $("#bars").animate({
                                  height: "0",
                                  top: "360",
                              }, 4000);


                                var i = 0, howManyTimes = 50;
                                function smokeCloud() {
                                    var smokeRight = Math.floor((Math.random()*(475-509+1)+509));
                                    var smokeSpeed = Math.floor((Math.random()*(1500-1000+1)+1000));
                                    var smokeShape = Math.floor((Math.random()*(2-1+1)+1));
                                    var smokeTop = Math.floor((Math.random()*(300-280+1)+320));
                                    $(".displayContent").append("<div class='smoke' style='left: "+ smokeRight + "px; background-image: url(img/smoke" + smokeShape + ".png')></div>");
                                    $(".smoke").animate({
                                    top: "" + smokeTop +"",
                                    opacity: 0,
                                    }, smokeSpeed);
                                    $(".smoke").fadeOut();

                                    i++;
                                    if( i < howManyTimes ){
                                        setTimeout( smokeCloud, 50 );
                                    }
                                }
                                smokeCloud();
            }



            function removeBars() {

                //Loopa igenom alla objekten först.
                for (i = 0; i < blocks.length; i++) {

                    if (blocks[i].type == "button") {
                        var collide = colliding(player, 10);
                         if(collide == true) {

                            if (blocks[i].id == "greenButton") {
                            $("#bars").removeClass("stop"); //Ta bort klassen 'stop' 

                            explodeBars();
                            $("#" + blocks[i].id + "").removeClass("button");
                            $("#col45").removeClass("stop"); //Ta bort klassen 'stop' 
                            $("#col45").hide(); //Ta bort klassen 'stop' på items.
                            $("#greenButtonMirror").removeClass("stop"); //Ta bort klassen 'stop' 
                            $("#greenButtonMirror").hide(); //Ta bort klassen 'stop' på items.
                            //Ta bort items från blocks[]
                            blocks.splice(0,blocks.length);
                            calculateBlocks();   
                            }



                            if (blocks[i].id == "greenButtonMirror") {  
                                 $("#mirrorExpression, #boxExpression").show();
                                 $("#boxExpression").html("<img src='img/entangled/exclamationMark.png'/>");
                                 $("#mirrorExpression").html("<img src='img/entangled/questionMark.png'/>");
                                 $("#mirrorExpression, #boxExpression").delay(800).fadeOut(500);

                            }                            
                        }      
                    }                 
                }
            }


            var mirror = {};

             function calculateMirror() {
                    $("#mirror").each(function(i) {
                        var getPosition =  $(this).position(); 
                            mirror.top = getPosition.top;  
                            mirror.left = getPosition.left;  
                            mirror.bottom = getPosition.top + $(this).height(); 
                            mirror.right =  getPosition.left + $(this).width(); 
                            mirror.size = $(this).height();  // Den vertikala positionen
                            mirror.speed =  10; // Den horisontella positionen
                    }); 
                }

            function mirroredWalk(pk) {     
            calculateMirror();

            //Gå till vänster (vänsterpil).
            if(pk.keyCode == '37' && player.left > map.left) {
                player.left -= player.speed;
                mirror.left += player.speed;
                checkForBlocks();
                if(jQuery.inArray(false, canMove) == -1) {
                $('#box').css('left', player.left + 'px'); 
                $('#mirror').css('left', mirror.left + 'px'); 
                $('#box', '#mirror').html(''); 

                }}



            //Gå till höger (högerpil).
            if(pk.keyCode == '39' && player.right < map.right) {
                player.left += player.speed;
                mirror.left -= player.speed;
                checkForBlocks();
                if(jQuery.inArray(false, canMove) == -1) {
                $('#box').css('left', player.left + 'px');   
                $('#mirror').css('left', mirror.left + 'px'); 
                $('#box', '#mirror').html('');   
                }}

            //Gå uppåt (pil uppåt).
            if(pk.keyCode == '38' && player.top > map.top) {    
                player.top -= player.speed;
                mirror.top += player.speed;
                checkForBlocks();
                if(jQuery.inArray(false, canMove) == -1) {
                $('#box').css('top', player.top +'px');
                $('#mirror').css('top', mirror.top + 'px'); 
                $('#box', '#mirror').html(''); 
                }}

            //Gå neråt (pil neråt).
            if(pk.keyCode == '40' && player.bottom < map.bottom) {

                player.top += player.speed;      
                mirror.top -= player.speed;
          
                checkForBlocks();
                if(jQuery.inArray(false, canMove) == -1) {
                $('#box').css('top', player.top + 'px');
                $('#mirror').css('top', mirror.top + 'px');
                
                }}

            //Öppna dörrar (Mellanslag)
            if(pk.keyCode == '32') {
                removeBars();
                $('#box', '#mirror').html(''); 
                }



            //Öppna dörrar (Mellanslag)
            if(pk.keyCode == '69') {
                explodeBars();
                openEntangledChest();
                }}


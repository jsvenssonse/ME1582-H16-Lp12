
            //--------------------------------------------------------------------------------------[Variabler]
            //Variabler som tillåter en att plocka upp items

            var diffKey = false;
            var pickupDiamond = false;

            //--------------------------------------------------------------------------------------[explodeBars]
            //Ta sönder gallret

            function explodeBars() {
                            $("#bars").css("background", "url(img/entangled/bars.gif)");
                            $("#bars").animate({
                                  height: "0",
                                  top: "440",
                              }, 2000);

                                risingEffect(20, "smoke", 515, 475, 400, 435);

            }

            //--------------------------------------------------------------------------------------[checkInteractable]
            //Kollar allt som kan göras
            

            function checkInteractable() {

                //Loopa igenom alla objekten först.
                for (i = 0; i < blocks.length; i++) {

                    //KNAPPAR

                    if (blocks[i].type == "button") {
                        var collide = colliding(player, 10);
                         if(collide == true) {

                            //GREEN BUTTON
                            if (blocks[i].id == "greenButton") {

                            explodeBars(); 

                            $("#greenButton, #col45, #greenButtonMirror, #bars").removeClass("collision");
                            blocks.splice(0,blocks.length);
                            calculateBlocks();   
                            }

                            //BLACK BUTTON
                            if (blocks[i].id == "greenButtonMirror") {  
                                 $("#mirrorExpression, #boxExpression").show();
                                 $("#boxExpression").html("<img src='img/entangled/exclamationMark.png'/>");
                                 $("#mirrorExpression").html("<img src='img/entangled/questionMark.png'/>");
                                 $("#mirrorExpression, #boxExpression").delay(800).fadeOut(500);

                            }                            
                        }      
                    }

                    //KISTA
                    if (blocks[i].type == "chest") {
                        var collide = colliding(player, 10);
                         if(collide == true) {
                            $("#entangledChest").html("<img src='img/chestOpen.png' style='margin-top: -20px;'>");
                            $(".diffractionKey").css("display", "block");
                                if (diffKey == false) {
                                risingEffect(15, "sparkle", 495, 458, 323, 363);
                                }
                             setTimeout(function(){diffKey = true;}, (200));
                        }
                    }     

                    //TAVLA
                    if (blocks[i].type == "enPainting") {
                        var collide = colliding(player, 40);
                         if(collide == true) {

                            $(".enPainting").animate({
                                  height: "0",
                                  top: "76",
                              }, 2000);

                            $(".enPainting").removeClass("collision");
                            setTimeout(function(){pickupDiamond = true;}, 1000);

                            blocks.splice(0,blocks.length);
                            calculateBlocks();   

                        }      
                    }   

                    //DIFFRAKTIONSNYCKEL
                    if (blocks[i].type == "diffractionKey") {
                        var collide = colliding(player, 500);
                        if(collide == true) {
                            if (diffKey == true) {
                               putInInventory("diffractionKey", 320);

                            }
                        }      
                    }         


                    //GLYPH
                    if (blocks[i].type == "diamond") {
                        var collide = colliding(player, 500);
                        if(collide == true) {
                            if (pickupDiamond == true) {
                               putInInventory("diamond", 15); 
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
                checkInteractable();
                $('#box', '#mirror').html(''); 
                }

}


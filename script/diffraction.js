
            //--------------------------------------------------------------------------------------[SwapPainting]
            //Scrolla mellan bilderna i tavlorna.

            function twinklingStars(number) { 
                var effectSpeed = Math.floor((Math.random()*(4500-1500+1)+1500));
                $(".twinkle" + number + "").fadeIn(effectSpeed);
                setTimeout(function(){  var effectSpeed = Math.floor((Math.random()*(4500-1500+1)+1500));}, effectSpeed);
                $(".twinkle" + number + "").fadeOut(effectSpeed);
            }


            function placeDiamond() {

                 for (i = 0; i < blocks.length; i++) {

                    if (blocks[i].id == "diffBlock") {
                        var collide = colliding(player, 10);
                         if(collide == true) {

                             $("#itemDiamond").remove();
                             $(".displayContent").append("<img src='img/diamond.PNG' style='top: 221px; left: 308px; position: absolute; z-index: 700;'/>");
                                risingEffect(40, "sparkle", 338, 308, 221, 241);
                                 setTimeout(function(){ $(".diffSolution").fadeIn(2500);}, 500);




                                                     
                        }      
                    }
                }

            } 
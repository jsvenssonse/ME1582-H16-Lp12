            
        var canPress = true;
        var paintingNumber = true;

          function swapPainting() {


                for (i = 0; i < blocks.length; i++) {
                    if (blocks[i].type == "painting") {
                        var collide = colliding(player, 20);



                         if(collide == true) {
                            var paintingSlide =  $("#" + blocks[i].id + "").children();
                            var getPosition = paintingSlide.css('margin-top'); 
                            typePosition = getPosition.replace('px','');
                            currentPosition = parseInt(typePosition, 10);

                            if (canPress == true) {
                            if (currentPosition == -230) {
                                paintingSlide.css('margin-top' , '90px'); 
                            var getPosition = paintingSlide.css('margin-top'); 
                            typePosition = getPosition.replace('px','');
                            currentPosition = parseInt(typePosition, 10);
                            }

                            canPress = false;
                            console.log(canPress);
                            console.log("Gamla: " + currentPosition);
                            newPosition = (currentPosition -= 80);
                            console.log(newPosition);

                            paintingSlide.animate({
                                    marginTop: "" + newPosition + "px",
                                    }, 500); 

                                setTimeout(function(){canPress = true; console.log(canPress);}, 500);
                            
                            }
                         
                     }

            }
        } } 
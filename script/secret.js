
            //--------------------------------------------------------------------------------------[Variabler]

            var canPress = true;                        //Om vi får trycka på målningen än; den förra måste hinna glida ner igen.
            var paintings = [10, 10, 10, 10];           //Ordningen på tavlorna.
            var pSolution = [-150, -230, 10, -310];          //Lösningen på tavlorna.
            var solved = [false, false, false, false];  //Om pusslet är löst.


            //--------------------------------------------------------------------------------------[SwapPainting]
            //Scrolla mellan bilderna i tavlorna.

            function swapPainting() {


                for (i = 0; i < blocks.length; i++) {

                    if (blocks[i].type == "painting") {

                        var collide = colliding(player, 20);


                         if(collide == true) {

                            var paintingSlide =  $("#" + blocks[i].id + "").children();blocks[i].id.replace('"','');
                            paintingNumber = blocks[i].id.replace('painting','');
                            var getPosition = paintingSlide.css('margin-top'); 
                            typePosition = getPosition.replace('px','');
                            currentPosition = parseInt(typePosition, 10);

                            if (canPress == true) {

                                if (currentPosition == -310) {
                                    paintingSlide.css('margin-top' , '90px'); 
                                    var getPosition = paintingSlide.css('margin-top'); 
                                    typePosition = getPosition.replace('px','');
                                    currentPosition = parseInt(typePosition, 10);
                                }

                                canPress = false;
                                newPosition = (currentPosition -= 80);

                                paintingSlide.animate({
                                    marginTop: "" + newPosition + "px",
                                    }, 500);

                                paintings[paintingNumber] = newPosition;

                                    for (var b = 0; b < paintings.length; ++b) {
                                        if (paintings[b] !== pSolution[b]) {
                                            solved[b] = false;
                                        }
                                        else {
                                            solved[b] = true;
                                        }
                                    }

                                    if(jQuery.inArray(false, solved) == -1) {
                                        risingEffect(40, "sparkle", 255, 205, 90, 110);
                                        risingEffect(40, "sparkle", 355, 305, 90, 110);
                                        risingEffect(40, "sparkle", 455, 405, 90, 110);
                                        risingEffect(40, "sparkle", 555, 505, 90, 110);
                                    }

                                setTimeout(function(){canPress = true;}, 500);
    
                            }
                         
                     }

            }
        } } 
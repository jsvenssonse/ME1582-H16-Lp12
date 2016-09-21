

// Add item to inventory and make value true
function inventory(item) {

    localStorage.setItem(item, true);

}
// Adding items with basic remove animations
    function addToInventory(removeDiv) {
        var remvDiv = $("#" + removeDiv );
        var padding = ((51 - remvDiv.height)/ 4 + 3);
        $("#inventory").prepend("<div><img  src='img/"+ removeDiv +".png' id='item' style='padding-top: " + padding + "px'/></div>");
        $("#" + removeDiv ).remove()
   
    }
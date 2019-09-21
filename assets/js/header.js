// Function taken from SO user "gpvos" , thank you!
String.prototype.format = function () {
    var args = arguments;
    return this.replace(/\{\{|\}\}|\{(\d+)\}/g, function (m, n) {
      if (m == "{{") { return "{"; }
      if (m == "}}") { return "}"; }
      return args[n];
    });
  };
$(document).ready(function(){

    // Main function

    $(".float-Contents").click(function (e) { 
        $(".float-Element").removeClass("float-Highlight");
        $(".float-Element").addClass("float-Lowlight");
        $(this).parent().removeClass("float-Lowlight");
        $(this).parent().addClass("float-Highlight");
        
        if($(this).parent().hasClass("float-Weapons"))
        {
            $("#tech-tree-weapons").removeClass("float-NoDisplay");
            $("#tech-tree-shields").addClass("float-NoDisplay");
            $("#tech-tree-armor").addClass("float-NoDisplay");
            $("#tech-tree-utility").addClass("float-NoDisplay");
        }
        if($(this).parent().hasClass("float-Shields"))
        {
            $("#tech-tree-weapons").addClass("float-NoDisplay");
            $("#tech-tree-shields").removeClass("float-NoDisplay");
            $("#tech-tree-armor").addClass("float-NoDisplay");
            $("#tech-tree-utility").addClass("float-NoDisplay");
        }
        if($(this).parent().hasClass("float-Armor"))
        {
            $("#tech-tree-weapons").addClass("float-NoDisplay");
            $("#tech-tree-shields").addClass("float-NoDisplay");
            $("#tech-tree-armor").removeClass("float-NoDisplay");
            $("#tech-tree-utility").addClass("float-NoDisplay");
        }
        if($(this).parent().hasClass("float-Utility"))
        {
            $("#tech-tree-weapons").addClass("float-NoDisplay");
            $("#tech-tree-shields").addClass("float-NoDisplay");
            $("#tech-tree-armor").addClass("float-NoDisplay");
            $("#tech-tree-utility").removeClass("float-NoDisplay");
        }
        if($(this).parent().hasClass("float-All"))
        {
            $("#tech-tree-weapons").removeClass("float-NoDisplay");
            $("#tech-tree-shields").removeClass("float-NoDisplay");
            $("#tech-tree-armor").removeClass("float-NoDisplay");
            $("#tech-tree-utility").removeClass("float-NoDisplay");
        }
        
    });

    // Make some button go to the top of the page

    $("a[href='#top']").click(function() {
        window.scrollTo(0,0);
    });


    // Auto-resize header to browser body width

    // Unfortunately, Resize event on mobile are very badly supported ... and zooming is worse :(
    // I'm using CSS to set the width to 100% however

    /*var size = $(window).width() + "px";
    $(".float-Holder").css("width",size);

    $(window).resize(function(){
        var size = $(window).width() + "px";
        $(".float-Holder").css("width",size);
    });*/

    /*var handleTouchyPinch = function (e, $target, data) {
        var size = $(window).width() + "px";
        $(".float-Holder").css("width",size);
    };
    $(window).bind('touchy-pinch', handleTouchyPinch);*/

    // Cool Right-side buttons

    var bgCss = "";
    var topLeft = true; // 135deg
    var topRight = false; // 225deg
    var bottomRight = true; // 315deg
    var bottomLeft = false; // 45deg

    var backgroundColor = "#333";
    var borderColor = "#2F6458";
    var gradientTop = "#2b574e";
    var gradientBottom = "#0D1717";
    

    var borderSize = "2"; // pixels
    var borderDepth = "8"; // pixels
    
    var borderEnd = parseInt(borderDepth) + parseInt(borderSize);

    if(topLeft)
    {
        bgCss += "linear-gradient(135deg, {0} {1}px, {2} {1}px,{2} {3}px, transparent {3}px),".format(backgroundColor,borderDepth,borderColor,borderEnd);
    }
    if(topRight)
    {
        bgCss += "linear-gradient(225deg, {0} {1}px, {2} {1}px,{2} {3}px, transparent {3}px),".format(backgroundColor,borderDepth,borderColor,borderEnd);
    }
    if(bottomRight)
    {
        bgCss += "linear-gradient(315deg, {0} {1}px, {2} {1}px,{2} {3}px, transparent {3}px),".format(backgroundColor,borderDepth,borderColor,borderEnd);
    }
    if(bottomLeft)
    {
        bgCss += "linear-gradient(45deg, {0} {1}px, {2} {1}px,{2} {3}px, transparent {3}px),".format(backgroundColor,borderDepth,borderColor,borderEnd);
    }
    bgCss += "linear-gradient(to left, {0} {1}px,transparent {1}px),".format(borderColor,borderSize) +
             "linear-gradient(to right, {0} {1}px,transparent {1}px),".format(borderColor,borderSize) +
             "linear-gradient(to bottom, {0} {1}px,transparent {1}px),".format(borderColor,borderSize) +
             "linear-gradient(to top, {0} {1}px,transparent {1}px),".format(borderColor,borderSize);

    bgCss += "linear-gradient({0},{1})".format(gradientTop,gradientBottom);

    $(".float-RightElement").css("background",bgCss);
    
});
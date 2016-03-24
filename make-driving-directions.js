var webpage = require('webpage');
var page = webpage.create();
var system = require('system');

page.viewportSize = {width:1000, height:800}

page.onError=function(msg, trace){
    console.log("page error",msg,trace);
};

page.onConsoleMessage = function(msg, lineNum, sourceId){
    console.log("page console message",msg,lineNum,sourceId);
};

var url = 'https://www.google.com/maps/dir/8500+College+Blvd,+Overland+Park,+KS+66210/9520+Metcalf+Ave,+Overland+Park/'

page.open(url,function(status){
    
    setTimeout(function() {
        
        page.sendEvent('click', 50, 350)
        
        setTimeout(function(){
            
            page.sendEvent('click', 361, 122)
            setTimeout(function(){
        
                page.render('map.png')
    
    
                phantom.exit(); 
            },1000)
        }, 1000)
    }, 1000);

})
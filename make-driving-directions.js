var webpage = require('webpage');
var page = webpage.create();
var system = require('system');
var fs = require('fs');

page.viewportSize = {width:800, height:800}

page.onError=function(msg, trace){
    console.log("page error",msg,trace);
};

page.onConsoleMessage = function(msg, lineNum, sourceId){
    
    if(msg == 'ready'){
        doTheStuff();
    }
    
    else if(msg == 'render'){
        setTimeout(function() {
            //page.render('output/' +new Date().getTime() + 'map.pdf')
            var delivery = deliveries[deliveriesIdx];
            var name =  (delivery[0].trim() + ', ' + delivery[1].trim()).replace('/', ' ')
            page.render('output/'+name + ' ' +new Date().getTime() + '.png')
            deliveriesIdx++;
            makeDirections();
        }, 1000);
    }
    
    else{
        console.log('from page', msg)
    }
    
    
};

var deliveries = [];
var deliveriesIdx = 0;
function doTheStuff(){
    var data = fs.read('Mulch_2016.txt').trim().split('\n');
    for (var index = 1; index < data.length; index++) {
        var delivery = data[index].split('\t');
        deliveries.push(delivery)
    }
    makeDirections();
}

function makeDirections(){
    //if(deliveriesIdx == 3){
    if(deliveriesIdx == deliveries.length){
        phantom.exit();
    }
    var delivery = deliveries[deliveriesIdx];
    
    var to = delivery[3].trim();
    if(to){
        console.log('get directions',delivery)
        to = to + ", " + delivery[4].trim() + ", KS, "+ ", " + delivery[4].trim();
        var from = '21300 College Blvd, olathe, ks';
        var details = delivery[1].trim() + ' ' + delivery[0].trim()
            + "<br>" + delivery[2].trim()
            + "<br>" + delivery[6].trim();
        if(delivery[8].trim()){
            details = details + "<br>Cypress - " + delivery[8].trim()
        }
        if(delivery[9].trim()){
            details = details + "<br>Cedar - " + delivery[9].trim()
        }
        if(delivery[10].trim()){
            details = details + "<br>Brown - " + delivery[10].trim()
        }
        if(delivery[11].trim()){
            details = details + "<br>Red - " + delivery[11].trim()
        }
        if(delivery[12].trim()){
            details = details + "<br>Compost - " + delivery[12].trim()
        }
        if(delivery[13].trim()){
            details = details + "<br>Black - " + delivery[13].trim()
        }
        details = details + "<br>Total - " + delivery[7].trim()
        //console.log(details);
        page.evaluate(function(f,t, d){
            
            //console.log('evaluate',f,t, d);
            getDirections(f,t, d)
        },from, to, details);
        
        
    }
    else{
        console.log('cannot get directions',delivery)
        deliveriesIdx++;
        makeDirections();
    }
    
}



var url = 'http://localhost:8080/'

page.open(url,function(status){
    
    
    //page.render('open-map.png')
    //phantom.exit()
})
var webpage = require('webpage');
var page = webpage.create();
var system = require('system');
var fs = require('fs');

var now = new Date();
var today = now.getMonth() + 1 + "-" + now.getDate() + "-" + now.getFullYear(); 

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
            var name =  delivery[0].trim() + ' ' + delivery[2].trim().replace(/\//gi, '_') + ' ' + today
            console.log(name)
            page.render('output/'+name +  '.png')
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
    if(deliveriesIdx == 50){
    //if(deliveriesIdx == deliveries.length){
        phantom.exit();
    }
    var delivery = deliveries[deliveriesIdx];
    
    var to = delivery[5].trim();
    if(to){
        console.log('get directions',delivery)
        to = to + ", " + delivery[6].trim() + ", KS, "+ ", " + delivery[7].trim();
        var from = '21300 College Blvd, olathe, ks';
        
        var details = delivery[0].trim() + ', ' + delivery[4].trim() +', ' + delivery[2].trim() +', ' + delivery[3].trim()
            + "<br>" + delivery[8].trim();
        if(delivery[10].trim()){
            details = details + "<br>Brown - " + delivery[10].trim()
        }
        if(delivery[11].trim()){
            details = details + "<br>Black - " + delivery[11].trim()
        }
        if(delivery[12].trim()){
            details = details + "<br>Cypress - " + delivery[12].trim()
        }
        if(delivery[13].trim()){
            details = details + "<br>Cedar - " + delivery[13].trim()
        }
        if(delivery[14].trim()){
            details = details + "<br>Red - " + delivery[14].trim()
        }
        if(delivery[15].trim()){
            details = details + "<br>Compost - " + delivery[15].trim()
        }
        details = details + "<br>Total - " + delivery[9].trim()
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
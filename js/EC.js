function convertCur(){
   var eur = document.getElementById("eurInput").value;
    
if(document.getElementById("usd").checked){

   var cur = (eur*1.08887).toFixed(2)+" USD";
    
}
      if(document.getElementById("gbp").checked){
          var cur = (eur*0.87344).toFixed(2)+" GBP";
   
}
          if(document.getElementById("aud").checked){
              var cur = (eur*1.43688).toFixed(2)+" AUD";

}
        if(document.getElementById("czk").checked){
            var cur = (eur*27.0220).toFixed(2)+" CZK";
            
} 
        if(document.getElementById("cad").checked){
               var cur = (eur*1.46707).toFixed(2)+" CAD";
     
} 
     if(document.getElementById("chf").checked){
               var cur = (eur*1.07414).toFixed(2)+" CHF";
     
} 
    document.getElementById("calculated").value = cur;
}


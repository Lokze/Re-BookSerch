import axios from "axios";
import lodash from 'lodash';
import '../css/books.css';

let submit = document.getElementById("submit");

submit.onclick= async function bookSerch() {
    document.getElementById("output").innerHTML="";
    
    document.getElementById("output").innerHTML+="<div id='loader'></div>";
    
    let response;

         response= await axios.get ("https://openlibrary.org/subjects/"+document.getElementById("genere").value+".json?details=true")
         .catch(function(error){
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                
            }
            else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
              }
              else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
              }
              console.log(error.config);
              document.getElementById("output").removeChild(document.getElementById('loader'));
         });
   
    var data = response.data;

    document.getElementById("output").removeChild(document.getElementById('loader'));
    
    for(var i=0; i<data.works.length; i++){
        const responseKey = await axios.get("https://openlibrary.org"+data.works[i].key+".json") .catch(function(error){
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                
            }
            else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
              }
              else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
              }
              console.log(error.config);
              document.getElementById("output").removeChild(document.getElementById('loader'));
         });

        var dataKey = responseKey.data;
        
        document.getElementById("output").innerHTML+="<div id='container'>"
        for(var e=0; e<data.works[i].authors.length; e++){
            document.getElementById("output").innerHTML+="<p class='author'>"+lodash.get(data, ['works',i,'authors',e,'name'])+" </p>";
        }
        document.getElementById("output").innerHTML+="<a href='#anchor' class='books' onclick='showDesc("+i+");' id='bookTitle'>"+lodash.get(data, ['works',i,'title'])+"</a>";
      
        
        if(typeof dataKey.description == 'string')
        document.getElementById("output").innerHTML+="<p id='"+i+"' class='description' hidden>"+lodash.get(dataKey, ['description'])+"</p></div>";
        else
        document.getElementById("output").innerHTML+="<p id='"+i+"' class='description' hidden>"+lodash.get(dataKey, ['description','value'])+"</p></div>";
        
    }

    
}


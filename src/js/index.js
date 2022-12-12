import axios from "axios";
import lodash from 'lodash';
import '../css/books.css';

let submit = document.getElementById("submit");
let output= document.getElementById("output");

submit.onclick= async function bookSerch() {
    output.innerHTML="";
    
    output.innerHTML+="<div id='loader'></div>";
    
    let response;

         response= await axios.get (`https://openlibrary.org/subjects/${document.getElementById("genere").value}.json?details=true`)
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
             output.removeChild(document.getElementById('loader'));
         });
   
    var data = response.data;

   output.removeChild(document.getElementById('loader'));

   var bookWorks = lodash.get(data, 'works'); 
   
   bookWorks.forEach( async work => {
    const responseKey = await axios.get(`https://openlibrary.org${work.key}.json`) .catch(function(error){
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
             output.removeChild(document.getElementById('loader'));
         });

        var dataKey = responseKey.data;
        
        output.innerHTML+="<div id='container'>"
       
        work.authors.forEach( author => {

          output.innerHTML+=`<p class='author'>${author.name} </p>`;
          
        });
      
       output.innerHTML+=`<a href='#anchor' class='books' onclick="showDesc('${work.key}')" id='bookTitle'>${work.title}</a>`;
      

       var desc;
       if(typeof dataKey.description == 'string')
       desc= lodash.get(dataKey, ['description']);
        else
       desc= lodash.get(dataKey, ['description','value']);

       output.innerHTML+=`<p id='${work.key}' class='description' hidden>${desc}</p></div>`;
   });
       
       /* if(typeof dataKey.description == 'string')
       output.innerHTML+=`<p id='${work.key}' class='description' hidden>${lodash.get(dataKey, ['description'])}</p></div>`;
        else
       output.innerHTML+=`<p id='${work.key}' class='description' hidden>${lodash.get(dataKey, ['description','value'])}</p></div>`;
        
   });*/
   
}


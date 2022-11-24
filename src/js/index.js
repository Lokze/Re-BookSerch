import axios from "axios";
import lodash from 'lodash';

let submit = document.getElementById("form");

submit.onsubmit= async function bookSerch() {
    document.getElementById("output").innerHTML="";
    
    
    const response= await axios.get ("https://openlibrary.org/subjects/"+document.getElementById("genere").value+".json?details=true");
    if(response.status!= 200){
        throw new Error('Request faild with status ${'+response.status+'}');
    }
    var data = response.data;
    
    for(var i=0; i<data.works.length; i++){
        const responseKey = await axios.get("https://openlibrary.org"+data.works[i].key+".json");
        if(response.status!= 200){
            throw new Error('Request faild with status {'+response.status+'}');
        }
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
        
        console.log (dataKey);
    }
}


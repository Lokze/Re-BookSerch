import axios from "axios";
import lodash from 'lodash';
import '../css/books.css';

let submit = document.getElementById("submit");

submit.onclick= async function bookSerch() {
    document.getElementById("output").innerHTML="";
    
    document.getElementById("output").innerHTML+="<div id='loader'></div>";
    
    const response= await axios.get ("https://openlibrary.org/subjects/"+document.getElementById("genere").value+".json?details=true");
    if(response.status!= 200){
        throw new Error('Request faild with status ${'+response.status+'}');
    }
    var data = response.data;

    document.getElementById("output").removeChild(document.getElementById('loader'));
    
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
        
    }

    
}


# BookSearch



Hello this is BookSerch, a site that uses the API from OpenLibrary to find books based on the genere you chose

![image](https://user-images.githubusercontent.com/51636003/205328441-ac489d86-7b0b-4789-a9a7-6436f3b3f290.png)


The site uses the axios get method to call the api and extract the data, in case of some error it uses the catch method
to stop the code and send a message in the console.

![image](https://user-images.githubusercontent.com/51636003/207113040-102b07ef-92ef-4cd0-b47f-5076e6806019.png)
![image](https://user-images.githubusercontent.com/51636003/207113197-c3ebf121-6386-4986-9878-bd09999d2093.png)

Then using the lodash method get it extract the data from the response and print it on html

![image](https://user-images.githubusercontent.com/51636003/207113422-3dab35e3-5005-457b-86e6-991407d6e576.png)
![image](https://user-images.githubusercontent.com/51636003/205338895-6b2a8898-1e05-421b-ac7f-6a4405153f22.png)

The user can click the title of the book to show the description.

![image](https://user-images.githubusercontent.com/51636003/205339042-01028000-df3c-48b2-917f-cf3e0786b92a.png)

Or hide it in case is alredy showing.

![image](https://user-images.githubusercontent.com/51636003/205339174-47c0eb6d-43eb-415a-b00d-93d454e87732.png)

This is possible thanks to this small funcion inside the html that reads whether the description is hiden or not.
The function is written in the html file since webpack does not allow direct access to the js file

![image](https://user-images.githubusercontent.com/51636003/207113571-05c5484a-f35b-45f4-9eb9-680a13a4a115.png)


Here the link to the site https://bookserch.netlify.app
 

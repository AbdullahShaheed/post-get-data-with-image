A full example of POST/GET data with files. For post, it is one request of multipart form-data send from
client to server. The text data goes to the mysql database while the image file stored in 
the server's file system with unique names. The filename generated 
by multer will be saved to the database for that resource.

For GET, it is two subsequent request. The first request is to get the text data as json, 
the second request is invoked by the end of the first request to get the image file as 'blob'.

You need the folowing command to render the file you got in response.data in an img element:
const dataURL = URL.createObjectURL(response.data)
<img src={dataURL}/>

Note that postman doesn't work properly with form-data request, so you need to test your app via your client 
app, like React in my case.

multer is very important to deal with form-data. req.body will holds text fields, req.file holds the file
submitted by the form.

Note: if you are using simple html document as your client such as 'template engine' in Node,
then you need to specify the action attribute of theform like this: <form action="multipart/form-data">...<form/>
  
some useful links:  
  
How to send a File from React to NodeJS with Multer 2.0 (Express) https://www.youtube.com/watch?v=KoWTJ5XiYm4 very very good

Node.js Image Uploading With Multer https://www.youtube.com/watch?v=9Qzmri1WaaE Traversy Media Channel

React File Uploader With Express (Using React Hooks) https://www.youtube.com/watch?v=b6Oe2puTdMQ Traversy Media Channel

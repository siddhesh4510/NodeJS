**Step 1**

Download and extract folder

**Step 2**

Open command prompt or terminal in that folder and type

*$ npm install*

**Step 3**

type command

*$ npm start*

Server will start on port port which define in .env file ( i.e 4518)


Import file
***API for NodeJS Server 1.postman_collection.json*** 
   in Postman to load api. If evrything is present (i.e all api load properly) execute api by following steps other wise do changes according to steps .

If you uses this file you need to change only images (in register and in update if you want to update image) and tockenes in Authorization headers (in update profile , in update password and get your own information api ).Use tocken which riceived after login.


**Step 4**

register user by 

http://localhost:4518/user/register

api .
Request type should be POST , in body section select **form-data**  and in header section Content-type set as **application/x-www-form-urlencoded**
in form body name , email , image , mobile and password are required



**Step 5**

After registration do login by 

http://localhost:4518/user/login

Request method should be POST , in body section select **raw** and then **json**
and pass json object of email and password .

After succesfull login this api will give you tocken . This tocken will require for further api call .

**Step 6**

You can get your own information  by 

http://localhost:4518/user

this is GET request . This request will required authorization you need pass your tocken in Authorization.

Authorization>>Select Type Bearer Tocken >> paste that tocken .


**Step7**

To get other user information use

http://localhost:4518/user/ email

Request method should be GET .This will not require authentication .


**Step8**

To update information use .

http://localhost:4518/user/update

This POST method . This will required tocken . Paste tocken after selecting Bearer Tocken as step 6 . Enter feild you want to update .In body section select **form-data**  and in header section Content-type set as **application/x-www-form-urlencoded**
in form body enter field you wanted to update name , email , image , mobile .

**Step9**

to update password use 

http://localhost:4518/user/update/password

This api . This will required tocken . Paste tocken after selecting Bearer Tocken as step 6 .Request method should be POST , in body section select **raw** and then **json**
and pass json object of oldpassword and password .








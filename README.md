# back-end-api

### How to Setup:
1. Clone the repository:
`git clone https://github.com/isaiasgabriel/back-end-api`
2. Inside the project folder type:
`npm run dev`
___
### The routes:
I've implemented 4 methods:
- GET -> list users.
- POST -> create users.
- PUT -> update users.
- DELETE -> delete users
___
### How to use it:
You'll need **_Insomnia_** to make the requests to our API,so inside **_Insomnia_** the default link will be:
`http://localhost:3334/users`  

##### GET:
The GET route without **query** parameters return the list of all users, but we can also search:
![](https://i.imgur.com/nVAr68l.png)

##### POST:
The POST route is used to create users:
![](https://i.imgur.com/yKLfgBl.png)

##### PUT:
The PUT route is used to update users value like name and email, this route differs from GET and POST because it needs the id.
###### How to get the ID:
We use our GET route:
![](https://i.imgur.com/g3MrurB.png)
###### Using the ID:
We copy the ID and put it inside our URL with the name and email that we want to modify:
![](https://i.imgur.com/pv00qOQ.png)

##### DELETE:
Finally the DELETE route we simply copy the user ID that we want to delete and paste inside the URL:
![](https://i.imgur.com/gssqLCl.png)
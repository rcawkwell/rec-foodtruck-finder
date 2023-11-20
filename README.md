# rec-foodtruck-finder

### How to run 
To run the server: 
```
cd server
npm start
```
The server will be listening on localhost:3001 



To run the client: 
```
cd client
npm start
```
The client will be listening on localhost:3000

### Tradeoffs

* It wasn't specified that the food trucks found are the three closest food trucks to the user, so instead this simply returns the first three found that satisfy all the requirements. This oddly skews results based on the arbitrary order of the JSON. It would make the search slower since instead of ending early, it would need to go through every food truck in the JSON.
* For the most part, I tried to use libraries wherever I could to make things simpler. For instance, there's a library for calculating the haversine distance. Rather than writing out the mathematical equation in code here, I simply used that library. Similarly, in the client, I used React Bootstrap to quickly make responsive buttons and cards. However, longer term, if we are planning to do a lot of custom styling using a pre-made FE library can often become more frustrating than helpful.
* As a shortcut, I also left the client in the App.js file. Considering this is an app to build upon, we would want to separate out the food truck into their own component. It would make it easier to test separate parts of the front end as well as easier to read as we add more complexity to the code. 
* Additionally since I don't have tons of Node experience, I followed some [starter code]( https://www.freecodecamp.org/news/how-to-create-a-react-app-with-a-node-backend-the-complete-guide/ ) for setting up the app. However, I later realized I should've added typescript from the start as it was annoying to try to add later. 


### Production Ready Needs

* Databse Design - Currently the foodtruck data is being pulled from a JSON file and while this works, it adds some complexity to the code based on how the json formatted the dates. 
* Testing - I didn't go through and add testing. It would be a good idea to have some unit tests on various of the functions within foodtruck.js. There is a lot of logic there for calculating if a food truck is open that I would want to verify. 
* User Experience Thoughts - It would also be smart to spend a bit logner thinking through what is the most important information to display to the user. For instance, right now I only displayed the most basic information of the name of food truck, distance from user and hours open. However, it would be low lift and helpful for the users to include some more information: type of food, address, link to directions, etc.  


### Next features 

* If we are expanding to 100k food trucks and 1k city, I think the most important feature to think through is how to improve the search plan for nearby food trucks. FOr instance, we could think through having a list of cities and finding the nearest city to a user first and then only searching through food trucks that are in that city. 
* For user-facing features, I think users probably would want more control over the types of food trucks returned. The easiest next feature would be to give users the ability to adjust how far away the food trucks are. This would be fairly simple to implement but would give users more choice. A similar but more difficult to implement would be giving users the ability to search the type of food the food truck serves.
# GameTrade
A online platform where people can trade games that they dont play for ones that they want to play.

## todo

- integrate igdb api so user can add games 
- move the google api access to routes/backend. clients doesnt need to see or have access to key.
- figure out how to get image and send data to front end in a readable format

## notes

- Set up system and connected to mongodb using mongoose.
- used loginapp as a foundation to create accounts and login. 
- created a js function that used axios js to convert address into lat and lng using google maps api when the user registers
- use bcrypt to hash password
- use passport to authenticate user
- created a global list variable that keeps track of current seach data because i was having a hard time sending data to the client side
- js helper function creates a list of games
- 


## known bugs/issues

- need to check if the address is a real address when the user registers
- nav bar not highlighted properly when navigated to different page
- 

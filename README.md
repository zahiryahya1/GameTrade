# GameTrade
A online platform where people can trade games that they dont play for ones that they want to play.

## todo (in no particular order)
- make sure each email is unique
- move the google api access to routes/backend. clients doesnt need to see or have access to key.
- display matches on dashbord
- implement user chat (last)

## notes

- Set up system and connected to mongodb using mongoose.
- used loginapp as a foundation to create accounts and login. 
- created a js function that used axios js to convert address into lat and lng using google maps api when the user registers
- use bcrypt to hash password
- use passport to authenticate user
- created a global list variable that keeps track of current seach data because i was having a hard time sending data to the client side
- js helper function creates a list of games
- use igdb to search for games
- user can add games to their personal have or want list
- created js function to dynamically display games the user haves or wants
- user can delete game from their list
- user can update account location and password


## known bugs/issues

- need to check if the address is a real address when the user registers
- nav bar not highlighted properly when navigated to different page
- when the user goes back a page, the current search was displayed, not the old.
- after a user searches for a game, the platform resets to pc instead of remaining previous value.
- there can be duplicate emails
- 


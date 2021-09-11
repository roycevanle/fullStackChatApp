# FullStackChatApp
You may find the project hosted here: https://superchat-49f2a.web.app

## Description
### Overview
This project is a chat application which where users may sign-in to get authenticated and then chat in a chatroom in real-time. The chat is organized chronologically and will display the user messages & their profile picture.

### Technologies Used
Utilizes Bootstrap, Firebase, React, HTML, & CSS. This application authenticates users via Google Sign-In and handles real-time data using Firestore & React hooks.

### Challenges Faced
One challenge I faced while building this application was the deployment. I built the web app first and was displaying fine when I tested it using _npm run build_ but when it came to deploying it and integrating with firebase, I ran into issues of a white screen of death, getting 500 internal errors etc… After digging around, one of the solutions that worked for me was changing the firebase.json file that was built using firebase init, removing the “functions” aspect & fixing my index.html that was replaced in the process.

Another challenge I face while building this application was getting the application to correctly read the data displayed in the Firebase Cloud Firestore. When I was creating my data base and inserted an example message, I couldn’t see that message being displayed in my application. My solution was to go into “Rules” of the database settings and change a one-liner from allow read/write from false to true, but that in itself took about an hour just to figure out! 

### Features I hope to implement in the future
One feature I hope to implement in the future is a limit function in order to stop people from spamming over 50 messages in one day. Another feature I hope to implement in the future is a language filter that will ban users who uses bad words.

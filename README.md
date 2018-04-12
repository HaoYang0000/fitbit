Introduction
------------
### Prerequisites:
- Ensure that you have one of the following required operating systems:  
  * [Node.js](https://nodejs.org/en/)

### Installation
- Using mac terminal, using the following command to change current directory to fitbit folder(E.G: put the folder in desktop)
* On Mac:
  ```  
    $ cd ~/Desktop/fitbit/
  ```

- In command line:
* On Mac:
  ```  
    $ npm install
  ```

### Run
- In command line:
* On Mac:
  ```  
    $ npm start
  ```
### NOTE FOR YUSHUO
- Using mac terminal, using the following command to change current directory to fitbit folder
* On Mac:
  ```  
    $ cd ~/Desktop/fitbit/
  ```
- Run the following command to run local front end testing environment(ReactJS) and backend server(Express)
* On Mac:
```  
  $ npm run run
```

### File Structure Explain(Only for critical files)
```
-  fitbit
| - index.js (Main app entry)
| - package.json (Use for npm install)
| - webpack.config.js (For backend declare path)
| | frontend (Main reactjs folder)
| | / asset (folder reserved for public pictures, logos)
| | / dist (folder for reserved libraries)
| | / src (front end source code)
| | | / styles (Folder for global css seetings)
| | | / component (Folder for ReactJs components)
| | | | / Activity (Folder for activity settings components)
| | | | / Dashboard (Folder for main dashboard components)
| | | | / FitbitData (Folder for fitbit data components)
| | | | / Header (Folder for navigation header components)
| | | | / Home (Folder reserved for other components)
| | | | / Layout (Folder for main structure of the app, first entry structure set up)
| | | | / Login (Folder reserved for login components)
| | | | / Register (Folder reserved for register components)
| | backend (Express based, basic environment has set up, need further development later)
| | config (reserved for some global settings, for example: mongodb account)
| | design (Folder reserved for Yushuo to upload front design ideas)
```

# Description
The project is a Signle Page Appliation, it uses react as frontend framework, Nest as backend framework. Both frontend and backend are using typescript. 
It has the following features:

## Backend 
- JWT authorization and authentication
- Generaral Entity CRUD Web Api
- Type Orm as entity framework
## Frontend
- User Login and User Profile 
- User CRUD and Client CRUD
- Material UI Design

# Share code between frontend and backend
Authough both frontend and backend are written by typescript, we need some tricks to put code in to same repository
## the code structure 
- package.json
- -src
- -[nest code]
- -src\client
- -scr\client\package.json
- -src\client\src
- -scr\client\src\share
- -src\client\src\[react code]

the root directory of the project is the headend code, it was generated by nest cli
the src\client direcotry is frontend code, it is a react app  generated by 'create react app'
both nest app and react app have their own package.json, so frontend and backend are two independant projects.<
add the following line to src\client\.env, otherwise react app won't compile
```
SKIP_PREFLIGHT_CHECK=true
```
## the file structure of the published

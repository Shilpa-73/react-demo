import {createStore} from 'redux';

export const store = createStore((state={userlist:[], isLoggedin:false},action)=>{
    switch(action.type){
        case 'add':
            return {
               ...state,
                userlist:[...state.userlist, ...action.data]
            }
            break;
        case 'setLoginStatus':
            return {
                ...state,
                loginUserDetail:action.data.loginUserDetail,
                isLoggedin:action.data.isLoggedin,
            }
            break;
        case 'singleUserDetail':
            return {
                ...state,
                userDetail:{...action.data}
            }
            break;
        case 'remove':
            let usersList = [...state.userlist]
            usersList.splice(usersList.findIndex(u=>u['_id']===action.id),1)
            return {
                ...state,
                userlist:[...usersList]
            }
            break;
        default:
            return {...state}
    }
})

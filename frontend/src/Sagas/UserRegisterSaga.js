import { takeEvery,put,call } from "redux-saga/effects";
import { USER_REGISTER_REQUEST, userRegisterError, userRegisterSuccess } from "../Actions/UsersRegiserAction";



function register(formData,api){
    fetch(api,{
        method: 'POST', 
        body: formData
    }).then(((response) =>{
        if(!response){
            return response.json().then(errorData =>{
                throw new Error(errorData.detail || "something went wrong");
            });
           
        }
        return response.json();
    }));

}

function* registerWorker(action){
    const {username,password,method}= action.payload;
    try{
        const formData = new FormData();
        formData.append('username',username);
        formData.append('password',password);
        if(method === 'login'){
           const  api = "http://127.0.0.1:8000/api/token/access";
           const tokens = yield call(register,formData,api);
           const { access, refresh } = tokens;
           localStorage.setItem('accessToken', access);
           localStorage.setItem('refreshToken', refresh);


        }
        else{
            localStorage.clear();
           const  api = "http://127.0.0.1:8000/api/register";
            yield call(register,formData,api);
        }
        yield put(userRegisterSuccess());
    }
    catch(e){
       yield put(userRegisterError(e.message));
    }
}
function* registerSaga(){
    yield takeEvery(USER_REGISTER_REQUEST,registerWorker);
}
export default registerSaga;
import { userServ } from "./Services/userServ";
export const fetchUserList=async (dispatch)=>{
try{const res = await userServ.fetchUserList()
dispatch({
    type:"GET_USER_LIST",
    payload: res.data
})
}catch(err){
    
}};
export const userLogin = (userData)=>async (dispatch)=>{
    try{const res = await userServ.userLogin(userData)
        document.getElementById('login-result').innerHTML='Đăng nhập thành công!'
        document.getElementById('login-result').style.color='green'
        dispatch({
            type:"USER_LOGIN_LOGOUT",
            payload: res.data
        })

        localStorage.setItem("authKey",res.data.accessToken)
    }catch(err){
        document.getElementById('login-result').innerHTML='Đăng nhập thành công... cốc!'
        document.getElementById('login-result').style.color='red'
        
    }};

    export const fetchLoggedInData = async (dispatch)=>{
        try{const res = await userServ.fetchLoggedInUserData()
            dispatch({
                type:"FETCH_LOGIN_DATA",
                payload: res.data
            })
        }catch(err){
    
            
        }};

        export const fetchLoggedInUserProfile = async (dispatch)=>{
            try{const res= await userServ.fetchLoggedInUserProfile()
            dispatch({
                type: "FETCH_PROFILE",
                payload:res.data
            })}catch(err){}
        }


        export const updateProfile = (userData) => async (dispatch)=>{
try {const res = await userServ.updateProfile(userData)
dispatch({
    type:"FETCH_PROFILE",
    payload: res.data
})}catch(err){}
        }


    export const userLogout = (dispatch)=>{

            dispatch({
                type:"USER_LOGIN_LOGOUT",
                payload: {}
            })
            dispatch({
                type:"FETCH_LOGIN_DATA",
                payload:{}
            })
            localStorage.removeItem("authKey")
        };
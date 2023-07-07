import { createSlice} from '@reduxjs/toolkit'

const authSlice=createSlice({
    name:'auth',
    initialState:{
        id:"",
        status:" ",
        message:" ",
        isLoggedIn:false,
        user:{
            userName:"",
            email:"",
            name:" ",
            phone:" ",
        },
    },
    reducers:{
        registerUser:(state,action)=>{
            const {id,status,message}=action.payload;
            state.id=id;
            state.message=message;
            state.status=status;
            state.isLoggedIn=true;
        },
        loginUser:(state,action)=>{
            const {id,status,message}=action.payload;
            state.id=id;
            state.message=message;
            state.status=status;
            state.isLoggedIn=true;
        },
        logoutUser:(state)=>{
            state.id=" ";
            state.message=" ";
            state.status=" ";
            state.isLoggedIn=false;
            state.user.userName="";
            state.user.email="";
            state.user.name="";
            state.user.phone="";
        },
        setUser:(state,action)=>{
            const {firstName,lastName,email,userName,phone}=action.payload;
            state.user.userName=userName;
            state.user.email=email;
            state.user.name=`${firstName} ${lastName}`;
            state.user.phone=phone;
        },
    },
});

export const { registerUser,loginUser,logoutUser,setUser} = authSlice.actions

export default authSlice.reducer
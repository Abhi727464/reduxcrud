import axios from "axios"
import { toast } from "react-toastify"
import Updateuser from "../Component/Updateuser"
import { ADD_USER, DELETE_USER, FAIL_REQUEST, GET_USER_LIST, GET_USER_OBJ, MAKE_REQUEST, UPDATE_USER } from "./ActionType"

export const makeRequest=()=>{
    return{
        type:MAKE_REQUEST
    }
}
export const failRequest=(err)=>{
    return{
        type:FAIL_REQUEST,
        payload:err
    }
}
export const getUserList=(data)=>{
    return{
        type:GET_USER_LIST,
        payload:data
    }
}
export const deleteUser=()=>{
    return{
        type:DELETE_USER
    }
}
export const addUser=()=>{
    return{
        type:ADD_USER
    }
}
export const updateUser=()=>{
    return{
        type:UPDATE_USER
    }
}
export const getUserObj=(data)=>{
    return{
        type:GET_USER_OBJ,
        payload:data
    }
}



export const FetchUserList = () => {
  return (dispatch) => {
    dispatch(makeRequest());
    try {
      const userlist = JSON.parse(localStorage.getItem("userList")) || [];
      dispatch(getUserList(userlist));
    } catch (err) {
      dispatch(failRequest(err.message));
    }
  };
};

export const Removeuser = (code) => {
  return (dispatch) => {
    dispatch(makeRequest());
    try {
      const userlist = JSON.parse(localStorage.getItem("userList")) || [];
      const updatedList = userlist.filter((user) => user.code !== code);
      localStorage.setItem("userList", JSON.stringify(updatedList));
      dispatch(deleteUser());
    } catch (err) {
      dispatch(failRequest(err.message));
    }
  };
};


export const FunctionAddUser = (data) => {
  return (dispatch) => {
    dispatch(makeRequest());
    try {
      const userlist = JSON.parse(localStorage.getItem("userList")) || [];
      const newUserList = [...userlist, data];
      localStorage.setItem("userList", JSON.stringify(newUserList));
      dispatch(addUser());
      toast.success("User added successfully.");
    } catch (err) {
      dispatch(failRequest(err.message));
    }
  };
};

export const FunctionUpdateUser = (data, code) => {
  return (dispatch) => {
    dispatch(makeRequest());
    try {
      const userlist = JSON.parse(localStorage.getItem("userList")) || [];
      const updatedList = userlist.map((user) => {
        if (user.code === code) {
          return {
            ...user,
            ...data,
          };
        }
        return user;
      });
      localStorage.setItem("userList", JSON.stringify(updatedList));
      dispatch(updateUser());
      toast.success("User updated successfully.");
    } catch (err) {
      dispatch(failRequest(err.message));
    }
  };
};

export const FetchUserObj = (code) => {
  return (dispatch) => {
    dispatch(makeRequest());
    try {
      const userlist = JSON.parse(localStorage.getItem("userList")) || [];
      const user = userlist.find((user) => user.code === code);
      dispatch(getUserObj(user));
    } catch (err) {
      dispatch(failRequest(err.message));
    }
  };
}
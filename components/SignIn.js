
import React, {useRef,Fragment, useEffect} from 'react'
import {connect} from "react-redux";
import axios from 'axios';
import Router from 'next/router'
import { toast } from 'react-toastify';

let SignInComponent =({setLoginStatus, isLoggedin})=>{

    const userNameRef = useRef()
    const passwordRef = useRef()

    useEffect(()=>{
        if(isLoggedin===true){
            Router.push('/users')
        }
    },[isLoggedin])

    let handleSubmit = async(e)=>{
        e.preventDefault();
        axios.post(`http://localhost:3001/auth/signin`,{
            username:userNameRef.current.value,
            password:passwordRef.current.value,
        })
            .then(res => {
                const userData = res.data;
                console.log(`after login data is here!`, userData)
                if(userData.flag){
                    // handleSingleEdit(userData)
                    localStorage.setItem('token', userData.token);
                    setLoginStatus({
                        loginUserDetail:{username: userData.username},
                        isLoggedin:true,
                    })
                }
                else {
                    toast(userData.message)
                }

            })

        passwordRef.current.value = ""
        userNameRef.current.value = ""
    }

    return (
        <Fragment>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="col-md-12">
                        <label htmlFor="uname_text" className="form-label">User Name</label>
                        <input id={'uname_text'} className="form-control" placeholder={"Enter User Name"} ref={userNameRef} required/>
                    </div>

                    <div className="col-md-12">
                        <label htmlFor="password_text" className="form-label">Password</label>
                        <input id={'password_text'} className="form-control" placeholder={"Enter Password"} ref={passwordRef} required/>
                    </div>

                    <br/>
                    <br/>

                    <button type={'submit'}
                            className="btn-success"
                            onSubmit={(e)=>handleSubmit(e)}>Submit</button>
                </form>

                <br/>
                <button type={'button'} className="btn-info" onClick={(e)=>{ Router.push('/signup')}}>Sign Up</button>
                Please click here if you are new user!
            </div>
        </Fragment>
    )
}

const mapStateToProps = (state)=>{
    return {
        loginUserDetail : state.loginUserDetail,
        isLoggedin : state.isLoggedin,
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        setLoginStatus:(data)=>dispatch({type:'setLoginStatus',data})
    }
}

export const SignIn = connect(mapStateToProps,mapDispatchToProps)(SignInComponent)
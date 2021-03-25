
import React, {useRef,Fragment, useEffect} from 'react'
import {connect} from "react-redux";
import axios from 'axios';
import Router from 'next/router'
import { toast } from 'react-toastify';

let SignUpComponent =({userDetail={},handleSingleEdit, isLoggedin})=>{

    const userNameRef = useRef()
    const nameRef = useRef()
    const emailRef = useRef()
    const pwdRef = useRef()
    const cpwdRef = useRef()

    let options = {}

    useEffect(()=>{
        let token = localStorage.getItem('token');

        options.headers = {
            'Authorization': `Basic ${token}`
        }
    },[])

    useEffect(()=>{
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const id = params.get('id');
        let token = localStorage.getItem('token');

        options.headers = {
            'Authorization': `Basic ${token}`
        }


        if(id){
            axios.get(`http://localhost:3001/users/detail/${id}`,options)
                .then(res => {
                    const userData = res.data;

                    handleSingleEdit(userData)
                })
        }
        else{
            if(isLoggedin===true){
                Router.push('/users')
            }
        }
    },[isLoggedin])

    useEffect(()=>{
        if(Object.keys(userDetail).length){
            nameRef.current.value = userDetail.name
            userNameRef.current.value = userDetail.username
            emailRef.current.value = userDetail.email
        }
    },[userDetail])

    let handleSubmit = async(e)=>{
        e.preventDefault();

        if(Object.keys(userDetail).length){
            let token = localStorage.getItem('token');

            options.headers = {
                'Authorization': `Basic ${token}`
            }
            console.log(`options is here`, options)
            //Update Existing user detail
            axios({
                method:'put',
                url:`http://localhost:3001/users/${userDetail['_id']}`,
                data:{
                    name:nameRef.current.value,
                    username:userNameRef.current.value,
                    //email:emailRef.current.value,
                },
                ...options
            })
                .then(res => {
                    const userData = res.data;
                    if(!userData.flag) return toast(userData.message)
                    toast(userData.message)
                })
        }
        else{

            if(pwdRef.current.value!==cpwdRef.current.value){
                return alert(`Invalid confirm password!`)
            }

            //Register new user detail
            axios.post(`http://localhost:3001/users/save`,{
                name:nameRef.current.value,
                username:userNameRef.current.value,
                email:emailRef.current.value,
                password:pwdRef.current.value,
            } , options)
                .then(res => {
                    const userData = res.data;
                    if(!userData.flag)
                    return toast(userData.message)
                    handleSingleEdit(userData)

                    Router.push('/signin')
                })

            nameRef.current.value = ""
            userNameRef.current.value = ""
            emailRef.current.value = ""
            pwdRef.current.value = ""
            cpwdRef.current.value = ""
        }



    }

    return (
        <Fragment>

            {
                !Object.keys(userDetail).length ?
                    (
                        <div>Sign Up (Fill the below details for the new registration!)</div>
                    )
                    : (
                        <div>
                           Edit your detail <button type={'button'} className="btn-info" onClick={(e)=>{ Router.push('/users')}}>View List</button>
                        </div>
                    )
            }

            <div>
                <form onSubmit={handleSubmit}>
                    <div className="col-md-12">
                        <label htmlFor="name_text" className="form-label">Name</label>
                        <input id={'name_text'} className="form-control" placeholder={"Enter Name"} ref={nameRef} required/>
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="uname_text" className="form-label">User Name</label>
                        <input id={'uname_text'} className="form-control" placeholder={"Enter User Name"} ref={userNameRef} required/>
                    </div>

                    <div className="col-md-12">
                        <label htmlFor="email_text" className="form-label">Email Id</label>
                        <input id={'email_text'} className="form-control" disabled={Object.keys(userDetail).length ? true : false} placeholder={"Enter EmailId"} ref={emailRef} required/>
                    </div>

                    {
                        !Object.keys(userDetail).length ?
                        (
                            <div className="col-md-12">
                                <label htmlFor="pwd_text" className="form-label">Password</label>
                                <input id={'pwd_text'}
                                       type={"password"}
                                       className="form-control"
                                       placeholder={"Enter Password"} ref={pwdRef} required/>
                            </div>
                        )    : ''

                    }

                    {
                        !Object.keys(userDetail).length ?
                        (
                            <div className="col-md-12">
                                <label htmlFor="cpwd_text" className="form-label">Confirm Password</label>
                                <input id={'cpwd_text'}
                                       type={"password"}
                                       className="form-control"
                                       placeholder={"Enter Confirm Password"} ref={cpwdRef} required/>
                            </div>
                        )    : ''

                    }
                    <br/>
                    <button type="submit"
                            className="btn-success"
                            onSubmit={(e)=>handleSubmit(e)}>{Object.keys(userDetail).length ? 'Update' : 'submit'}</button>
                </form>
            </div>
        </Fragment>
    )
}

const mapStateToProps = (state)=>{
    return {
        userDetail: state.userDetail,
        isLoggedin : state.isLoggedin,
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        handleSingleEdit:(data)=>dispatch({type:'singleUserDetail',data})
    }
}

export const SignUp = connect(mapStateToProps,mapDispatchToProps)(SignUpComponent)
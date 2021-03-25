
import React, {useRef,Fragment, useEffect} from 'react'
import {connect} from "react-redux";
import axios from 'axios';
import Router from 'next/router'
import { toast } from 'react-toastify';

let UserListComponent =({items,handleAdd,handleRemove})=>{

    useEffect(()=>{
        axios.get(`http://localhost:3001/users/list`)
            .then(res => {
                const persons = res.data;
                handleAdd(persons.data || [])
            })
    },[])


    let handleRemoveFn = (e,user)=>{
        e.preventDefault();
        console.log(`remove user detail is`, user)
        let token = localStorage.getItem('token');
        let options = {}
        options.headers = {
            'Authorization': `Basic ${token}`
        }

        //Update Existing user detail
        axios.delete(`http://localhost:3001/users/${user['_id']}`, options)
            .then(res => {
                const userData = res.data;
                toast(userData.message)
                handleRemove(user['_id'])
            })
    }

    let handleEditFn = (e,user)=>{
        e.preventDefault();
        console.log(`edit user detail is`, user)
        Router.push({
            pathname: '/edit',
            query: { id: user['_id'] }
        })
    }

    return (
        <Fragment>
            {/*Display the List*/}

            {
                items.length ?
                    (
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Id</th>
                                <th>username</th>
                                <th>email</th>
                                <th>action</th>

                            </tr>
                            </thead>
                            {

                                items.map((item,itemindex)=>{

                                    return (
                                        <tr key={itemindex+1}>
                                            <td>{itemindex+1}</td>
                                            <td>{item.username}</td>
                                            <td>{item.email}</td>
                                            <td>
                                                <button type={'button'} className="btn-info" onClick={(e)=>handleEditFn(e, item)}>Edit</button>
                                                <button type={'button'} className="btn-success" onClick={(e)=>handleRemoveFn(e, item)}>Remove</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </table>
                    ) : 'No Records found!'
            }
        </Fragment>
    )
}

const mapStateToProps = (state)=>{
    return {
        items: state.userlist,
        isLoggedin : state.isLoggedin,
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        handleAdd:(data)=>dispatch({type:'add',data}),
        handleRemove:(id)=>dispatch({type:'remove',id})
    }
}

export const UserList = connect(mapStateToProps,mapDispatchToProps)(UserListComponent)
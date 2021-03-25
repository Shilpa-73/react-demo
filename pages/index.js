import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Router from "next/router";
import React, {Fragment} from "react";

export default function Home() {
  return (
    <div className={styles.container}>
      Welcome to the React JS practical
        <div>
            <button type={'button'} className="btn-success" onClick={(e)=>{ Router.push('/signin')}}>Sign In</button>
            <br/>
            <br/>
            <button type={'button'} className="btn-info" onClick={(e)=>{ Router.push('/signup')}}>Sign Up</button>
        </div>
    </div>
  )
}
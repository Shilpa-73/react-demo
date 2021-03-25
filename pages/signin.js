import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { SignIn } from '../components/SignIn'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Signin() {
    return (
        <div className={styles.container}>
            <SignIn />
            <ToastContainer />
        </div>
    )
}
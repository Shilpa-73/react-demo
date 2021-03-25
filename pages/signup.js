import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { SignUp } from '../components/SignUp'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Signup() {
    return (
        <div className={styles.container}>
            <SignUp />
            <ToastContainer/>
        </div>
    )
}
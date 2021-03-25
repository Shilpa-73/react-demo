import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { UserList } from '../components/UserList'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Users() {

    console.log(`styles.container is `, styles.container)
    return (
        <div className={styles.container}>
            <UserList />
            <ToastContainer/>
        </div>
    )
}
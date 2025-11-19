import styles from './Dashboard.module.css'
import ClientDashboard from '../../components/client_dashboard/ClientDashboard'
import ProDashboard from '../../components/pro_dashboard/ProDashboard'
import { useEffect } from 'react'

function Dashboard() {


    useEffect(() => {
        fetch('http://localhost:3000/dashboard', {
            method: 'GET',
            headers: { 'Content-Type' : 'application/json'},
            credentials: 'include'
        })
        .then(async (res) => {
            console.log(await res.json());
            //el res ya contiene la informacion del usuario (mongo_id, role, username)
        })
        .catch(error => {
            console.log(error);
        });
    });

    return (
        <>  
            <ClientDashboard/>
            <ProDashboard />
        </>
    )
}

export default Dashboard
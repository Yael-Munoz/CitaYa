import styles from './Dashboard.module.css'
import ClientDashboard from '../../components/client_dashboard/ClientDashboard'
import ProDashboard from '../../components/pro_dashboard/ProDashboard'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Dashboard() {

    const [user, setUser] = useState({
        _id: '',
        role: '',
        username: ''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:3000/dashboard', {
            method: 'GET',
            headers: { 'Content-Type' : 'application/json'},
            credentials: 'include'
        })
        .then(async (res) => {
            if(!res.ok) {
                throw new Error('Unauthorized');
            }

            const data = await res.json();
            
            setUser(
                {
                    _id: data._id,
                    role: data.role,
                    username: data.username
                });
            setLoading(true);
            
        })
        .catch(error => {
            // navigate('/login');
            console.log(error);
        });
    });

    return (
        <>  
        {loading ? 
        
        <div>
            {user.role === 'client' ? <ClientDashboard/> : <ProDashboard/>}


        </div> : 
        
        <div></div>}
        
        </>
    )
}

export default Dashboard
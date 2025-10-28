import styles from './Dashboard.module.css'
import ClientDashboard from '../../components/client_dashboard/ClientDashboard'
import ProDashboard from '../../components/pro_dashboard/ProDashboard'

function Dashboard() {

    return (
        <>  
            <ClientDashboard/>
            <ProDashboard />
        </>
    )
}

export default Dashboard
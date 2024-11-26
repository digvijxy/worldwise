import React from 'react'
import Sidebar from '../Componenets/Sidebar'
import styles from './AppLayout.module.css'
import Map from '../Componenets/Map'
import User from '../Componenets/User';
function AppLayout() {
  return (
    <div className={styles.app}>
    <Sidebar/>
    <Map/>
    <User/>
    </div>
  );
}
export default AppLayout;
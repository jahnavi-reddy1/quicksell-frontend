import React, { useEffect } from 'react'
import './App.css';
import NavBar from './Components/NavBar/NavBar';
//import Card from './Components/Card/Card';
import DashBoard from './Components/Dashboard/Dashboard';
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllData } from './Action/DataAction';
import Loading from './Components/Loading/Loading';
const App = () => {
  const dispatch = useDispatch();
  const { allTickets } = useSelector(state => state.DataReducer);
  useEffect(() => {
    dispatch(fetchAllData());
  }, [dispatch])
  return allTickets ? (
    <div style={{ paddingTop: "10px" }} >
      <NavBar />
      <hr style={{ marginTop: "10px" }} />
      <DashBoard />
    </div>
  ) : <Loading />
}
export default App
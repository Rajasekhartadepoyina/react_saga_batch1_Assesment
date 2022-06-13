import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthTypes } from '../redux/action_types/auth_types';
import { DashboardTypes } from '../redux/action_types/dashboard_types';
import '../Styles/styles.css'
import { Button } from 'react-bootstrap';




const Dashboard = (props) => {

  let { user } = useParams();
  const [state, setstate] = useState({
    userdata: ''
  })

  const dashboardReduxData = useSelector((state) => state.Dashboard);

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const Logout = () => {
    // localStorage.removeItem('token')
    dispatch({
      type: AuthTypes.LOGOUT_REQUEST,
      callback: () => {
        navigate("/login");
      }
    })

  }
  const getUserData = () => {
    dispatch({
      type: DashboardTypes.USER_DATA_REQUEST,
    })

  }
  useEffect(() => {
    getUserData()
  }, [])


  console.log(dashboardReduxData.UserDataRequests)
  const list = dashboardReduxData.UserDataRequests;
  return (
    <div className='flx'>

      <div className="inner_div">
        <table className="table table-striped">
          <thead className="thead-dark text-center">
            <tr>
              <th>First  Name</th>
              <th>Last Name</th>
              <th>Email</th>


              {/* <th>Country</th> */}
            </tr>
          </thead>
          <tbody>

            {

              list && list.map((data, index) => {
                return (

                  <tr key={index} onClick={() => navigate(`/dashboard/${data.id}`)}>
                    <td>{data.first_name}</td>
                    <td>{data.last_name}</td>
                    <td>{data.email}</td>
                  </tr>
                );
              }
              )
            }
          </tbody>

        </table>

      </div>

      <Button onClick={Logout}>Logout</Button>

    </div>
  )
}

export default Dashboard
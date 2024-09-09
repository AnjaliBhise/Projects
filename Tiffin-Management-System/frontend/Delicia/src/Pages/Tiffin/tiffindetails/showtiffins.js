import { useState } from 'react'
import Tiffin from './tiffin'
import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useLocation } from 'react-router'
import { toast } from 'react-toastify'
import Footcomponent from '../../../Components/footer'
import NavUser from '../../../Components/navUser'
import config from '../../../config'

const ShowTiffins = () => {
  const [tiffins, setTiffins] = useState([])
  const { state } = useLocation('')

  const searchTiffins = () => {
    const url = config.serverURL + `/tiffin/details`
    axios
      .get(url, { headers: { Authorization: `Bearer ${localStorage['jwt']}` } })
      .then((response) => {
        const result = response.data
        setTiffins(result['data'])
        console.log(tiffins)
        // if (result!=null) {
        //   setTiffins(result)
        // } else {
        //   alert('something went wrong..')
        // }
      })
  }
  const navigate = useNavigate()

  useEffect(() => {
    searchTiffins()
    console.log('getting called')
    if (state) {
      toast.info(state.message)
    }
  }, [])

  return (
    <div>
      <NavUser></NavUser>
      <div className='container-fluid'>
        <div
          className='row'
          style={{ marginTop: '20px', marginBottom: '20px', display: 'flex' }}>
          <div className='col'>
            <div className='row row-cols-md-3' marginBottom='10px'>
              {tiffins.map((tiffin) => {
                console.log(tiffin)
                return (
                  <div class='col'>
                    <Tiffin tiffin={tiffin} />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      <Footcomponent />
    </div>
  )
}

export default ShowTiffins

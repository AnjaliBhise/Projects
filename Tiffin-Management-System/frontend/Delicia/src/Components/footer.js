import { color } from '@mui/system'

const Footer = () => {
  return (
    <div className='container-fluid' style={sty.footer}>
      <footer className='page-footer font-small blue pt-4'>
        <div className='container-fluid text-center text-md-left'>
          <div className='row'>
            <div className='col-md-6 mt-md-0 mt-3'>
              <h5 className='text-uppercase'>Delicia</h5>
              <p>
                One cannot think well, love well, sleep well, if one has not
                dined well.
              </p>
            </div>

            <hr className='clearfix w-100 d-md-none pb-3' />

            <div className='col-md-3 mb-md-0 mb-3'></div>
            <div className='col-md-3 mb-md-0 mb-3'>
              <h5 className='text-uppercase'>Social Media</h5>

              <ul className='list-unstyled'>
                <li>
                  <i class='bi bi-instagram' style={{ padding: 5 }}></i>
                  Instagram
                </li>
                <li>
                  <i class='bi bi-linkedin' style={{ padding: 5 }}></i>LinkedIn
                </li>
                <li>
                  <i class='bi bi-twitter' style={{ padding: 5 }}></i>Twitter
                </li>
                <li>
                  <i class='bi bi-facebook' style={{ padding: 5 }}></i>Facebook
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className='footer-copyright text-center py-3'>
          © 2022 Copyright:
          <a href='/'> MDBootstrap.com</a>
        </div>
      </footer>
    </div>
  )
}

const sty = {
  footer: {
    position: 'relative',
    color: 'white',
    backgroundColor: '#4caf95',
    bottom: 0,
    right: 0,
    textAlign: 'center',
    width: '100%',
  },
}
export default Footer

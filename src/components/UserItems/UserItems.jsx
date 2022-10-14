import {Link} from 'react-router-dom';
import './UserItems.css';


function Users({info}) {

  return (
    <li className='list__item user'>
        <div className='user__info'>
          <h3 className='user__name'>{info.name} <span>#{info.id}</span></h3>
            <div className='block'>
              <div>
                <p className='user__company'>Company:  "{info.company.name}"</p>
                <p className='user__email'>E-mail:  {info.email}</p>
              </div>
              <div>
                <p className='user__city'>City:  {info.address.city}</p>
                <p className='user__phone'>Phone:  {info.phone}</p>
              </div>
            </div>
        </div>
        <div className='link-box'>
          <Link className="link" to={`${info.id}/posts`}>Posts</Link>
        </div>
    </li>
  );
}

export default Users;

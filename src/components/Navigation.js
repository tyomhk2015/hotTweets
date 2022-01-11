import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Navigation = ({ user }) => {
  return (
    <nav>
      <ul className='navList'>
        <li>
          <Link to='/' className='navLinkHome'>
            <FontAwesomeIcon icon={faTwitter} color={'#04AAFF'} size='2x' />
          </Link>
        </li>
        <li>
          <Link to='/profile' className='navLinkProfile'>
            {' '}
            <FontAwesomeIcon icon={faUser} color={'#04AAFF'} size='2x' />
            <span style={{ marginTop: 10 }}>
              {user.displayName
                ? `${user.displayName}'s Profile`
                : 'Profile'}
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;

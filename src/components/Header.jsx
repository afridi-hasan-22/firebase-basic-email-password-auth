import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className='my-container flex justify-between items-center '>
            <div><h1 className='text-2xl'>Auth System</h1></div>
            <div className='flex space-x-5 font-bold'>
            <Link to='/'>Home</Link>
            <Link to='/login'>Login</Link>
            {/* <Link to='/register'>Register</Link> */}
            {/* <Link to='/register-mui'>Register MUI</Link> */}
            <Link to='/register-tail'>Register Tail</Link>
            </div>
        </div>
    );
};

export default Header;
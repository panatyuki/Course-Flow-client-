import classes from '../style/Header.module.css';
import { useNavigate } from 'react-router-dom';
import { imageHeader } from '../data/imageBackground';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';

function Header() {
  const [openDropdown, setOpenDropdown] = useState(false);

  const navigate = useNavigate();
  const { session, supabase } = useAuth();

  const handleLogout = async() => {
    const { error } = await supabase.auth.signOut();

    if (session) {
      navigate('/');
    }
    else {
      console.error(error);
    }
  };
    
  return (
    <div className={classes.header}>
      <div className={classes.courseFlowLogo}>
        <img src={imageHeader.courseFlow} alt='courseFlowLogo' onClick={() => {
          navigate('/');
        }}/>
      </div>
      <div className={classes.headerRight}>
        <div className={classes.ourCourses} onClick={() => navigate('/our-course')}>
          <p className='cf-body-2' style={{ lineHeight: '0', fontWeight: '700' }}>Our Courses</p>
        </div>
        {!session ? <button onClick={() => {
          navigate('/login');
        }} className={classes.logInButton}>
          <p className='cf-body-2' style={{ lineHeight: '0', fontWeight: '700' }}>Log in</p>
        </button> : (
          <div className={classes.profile}>
            <img src={imageHeader.profile} alt='profile' className={classes.setProfileImage} width='40' height='40' onClick={() => navigate('/my-courses')} />
            <p className='cf-body-2' style={{ color: '#424C6B' }}>Hello {session.user.user_metadata.name}</p>
            <img src={imageHeader.arrowDropdown} alt='arrowDropdown' className={classes.arrowDropdown} onClick={() => 
              setOpenDropdown((prev) => !(prev))
            } />
            {
              openDropdown && (
                <div className={classes.dropdownContainer}>
                  <div className={classes.sectionUp}>
                    <div className={classes.dropdownTextSectionUpContainer}>
                      <img src={imageHeader.profileIcon} alt='profileIcon' />
                      <span className='cf-body-3' style={{ color: '#646D89' }}>Profile</span>
                    </div>
                    <div className={classes.dropdownTextSectionUpContainer} onClick={() => navigate('/my-courses') }>
                      <img src={imageHeader.myCourseIcon} alt='myCourseIcon' />
                      <span className='cf-body-3' style={{ color: '#646D89' }}>My Course</span>
                    </div>
                    <div className={classes.dropdownTextSectionUpContainer}>
                      <img src={imageHeader.myHomeworkIcon} alt='myHomeworkIcon' />
                      <span className='cf-body-3' style={{ color: '#646D89' }}>My Homework</span>
                    </div>
                    <div className={classes.dropdownTextSectionUpContainer} onClick={(()=>{navigate('/desired-courses');})}>
                      <img src={imageHeader.myDesireCourseIcon} alt='myDesireCourseIcon' />
                      <span className='cf-body-3' style={{ color: '#646D89' }}>My Desire Courses</span>
                    </div>
                  </div>
                  <div className={classes.dropdownTextSectionDownContainer} onClick={() => (handleLogout())}>
                    <img src={imageHeader.logoutIcon} alt='logoutIcon' />
                    <span className='cf-body-3' style={{ color: '#646D89' }}>Log out</span>
                  </div>
                </div> 
              )
            }   
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
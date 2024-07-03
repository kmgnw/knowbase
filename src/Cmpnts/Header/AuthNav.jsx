import './Styles/NavBar.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { crntUserState } from '../../recoil';

import { useRecoilState } from 'recoil';
import { selectedMainNavbarState } from '../../recoil';

function AuthNav({isLogined=false, name=''}) {
    const navigator = useNavigate();
    const [crntUser, setCrntUser] = useRecoilState(crntUserState)
    const [selectedNavbar, setSelectedNavbar] = useRecoilState(selectedMainNavbarState);
    const titles = ['로그인', '회원가입'];

    function navBarClickHandler(title) {
        setSelectedNavbar(title);
        switch (title) {
            case '로그인':
                navigator('/');
                break;
            case '회원가입':
                navigator('/mentoring');
                break;
            default:
                break;
        }
    }

        return (
            <div className='navbar-wrap' style={{gap:'3rem'}}>
                {
                    !isLogined ? <div className='hd_logined-name'>
                        {
                            
                        }{crntUser.nickName} 님 환영합니다!</div> :
                    titles.map((title, i) => {
                        const classNames = `nav ${selectedNavbar === title ? 'selected' : ''}`;
                        return (
                            <div key={i} className={classNames} onClick={()=>navBarClickHandler(title)}>
                                {title}
                            </div>
                        )
                    })
                }
            </div>
        )
        
    
}
export default AuthNav;

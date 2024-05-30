import '../Styles/MentoringHomepage.css'
import { useRef } from 'react'

import testImg from '../../../assets/testImg.png'

import { useRecoilState, useRecoilValue } from 'recoil';
import { crntMentorState, isContactClickedState } from '../../../recoil';

function ProfileSection({ btnClickedHandler, isIdentified }) {
    let crntMentor = useRecoilValue(crntMentorState)
    const btnRef = useRef(null);
    const [_, setIsContactClicked] = useRecoilState(isContactClickedState)

    return (
        <div className='mh_profile-wrap'>
            <div className='mh_proflie-img-wrap'>
                <img src={crntMentor.profileImgPath} alt={`${crntMentor.nickName}의 프로필 이미지`} />
            </div>
            <div className='mh_proflie-info-wrap'>
                <div className='mh_name'>{crntMentor.nickName}</div>
                <div className='mh_id'>@{crntMentor.userName}</div>
                <div className='mh_btn-wrap'>
                    <div ref={btnRef} className='mh_ask-btn' onClick={() => btnClickedHandler(btnRef)}>{isIdentified ? '프로필 수정하기' : '문의하기'}</div>
                    <div className={isIdentified ? 'mh_req-btn-identified': 'mh_req-btn'} onClick={()=>setIsContactClicked(true)}>멘토링 신청하기</div>
                </div>
            </div>
        </div>
    );
}

export default ProfileSection;

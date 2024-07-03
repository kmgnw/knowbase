import Header from './Header/Header';
import Info from './Info';
import '../Styles/Home.css'
// import Footer from './Footer/Footer'

import { useEffect } from 'react';
import { mentorInfoState, crntMentorIdxState } from '../recoil';
import { useRecoilState } from 'recoil';

import mentor from '../assets/home/mentor.svg'
import mentee from '../assets/home/mentee.svg'
import GreenBubble from '../assets/home/GreenBubble';
import MintBubble from '../assets/home/MintBubble';
import MentoringImage1 from '../assets/home/MentoringImage1'
import Ex1 from '../assets/home/Ex1.svg'
import Ex2 from '../assets/home/Ex2.svg'
import Ex3 from '../assets/home/Ex3.svg'
function Home() {
    return (
        <>
        <Header />
        <div className="background_wrap">
        <div className="top_text"> Know BASE 는<br/> 이런 분들을 위한 서비스예요</div>
        <div className="mentor_wrap">
            <div className="mentor_left">
                <GreenBubble className="green"/>
                    <div className="overlay_green">
                    <div className="first_green_ment"><b>인테리어 디자이너</b>로서 <br/>저를 더 알리고 싶어요</div>
                    <div className="second_green_ment">멘티들에게 자신을 소개하고<br/> 다양한 홈스타일링을 멘토링 할수있어요!</div>
                </div>
            </div>

            <div className="mentor_middle">
                <p className="mentortitle">멘토</p>
                <img className="mentorImg" src={mentor}/>
            </div>
            <div className="mentor_right">
                <MintBubble className="mint"/>
                <div className="overlay_mint">
                    <div className="first_mint_ment">인테리어 디자이너가 아니지만 <br/> <b>홈스타일링 멘토링</b>을 진행하고 싶어요!</div>
                    <div className="second_mint_ment">인테리어 디자이너가 아니여도<br/>멘토링 포인트를 모아  <br/>홈스타일링 멘토링을 할수있어요!</div>
                </div></div>
        </div>
        <div className="mentee_wrap">
            <div className="mentee_left"> 
                <img src={mentee}/>
                <div className="overlay_mentee">저도 남들처럼 <br/> 제 공간을 <br/> 예쁘게 꾸미고 싶어요!</div>
            </div>
            <div className="mentee_right">
                <p className="menteeTitle">멘티</p>
                <div>내가 원하는 멘토를 찾고 <b>1대1 멘토링</b>을 통해서<br/> 내 공간을 예쁘게 꾸며보세요</div></div>

        </div>
        </div>
        
        <div className="users">
            <p style={{marginTop: '22.4rem'}}> Know Base는</p>
            <div className="circle_wrap"> 
                <div className="circle1"></div>
                <div className="circle2"></div>
                <div className="circle3"></div>
            </div>
            
            <div className="promote_text">
                <div> 등로된 멘토수 <p> 2,600명</p></div>
                <div>현재까지 진행된 멘토링 <p>1,800건</p></div>
                <div>멘티가 작성한 멘토링 후기 <p>1,000건</p></div>
            </div>
            
        </div>
        <div className="mentoring_services">
            <p style={{marginTop: '37.4rem'}}>멘토링 서비스</p>
            <div className="mentoring_text">
                <div>이제 내가<b>원하는 멘토</b>를 선택해 <b>홈스타일링</b>을 진행해보세요!</div>
                <div>Know BASE의 멘토가 <b>1대1</b>로 홈스타일링의 <b>처음부터 끝</b>까지 책임져 드립니다!</div>
            </div>
            <div className="mentoring_examples">
                <div className="example1">
                    <MentoringImage1/>
                    <div> 내가 원하는 멘토 탐색</div>
                    <img src={Ex1}  />
                    </div>
                <div className="example2">
                    <MentoringImage1/>
                    <div>멘토와 <br/>1대1 멘토링 진행</div>
                    <img src={Ex2}  />
                </div>
                <div className="example3">
                    <MentoringImage1/>
                    <div>홈스타일링 완료 후 <br/>후기 작성</div>
                    <img src={Ex3} />
                </div>
            </div>
        </div>
        <div className="bottom_text"> 
        <span>‘홈스타일링’</span>
        <div>Know BASE 에서 멘토링 받으며 시작하기</div>
        </div>
        {/* <Footer /> */}
        </>
    );
}

export default Home;

import postImg from '../../../assets/postImg.png'

// PortfolioSection.js
import { useEffect } from 'react';
import './Portfolio.css'

import { useRecoilState, useRecoilValue }  from 'recoil'
import { isMorePortfolioClickedState, portfolioState } from './recoil';
import { baseUrl, crntMentorState } from '../../../recoil';

function PortfolioSection() {
    const crntMentor = useRecoilValue(crntMentorState)
    const [isMorePortfolioClicked, setIsMorePortfolioClicked] = useRecoilState(isMorePortfolioClickedState)
    const [portfolios, setPortfolios] = useRecoilState(portfolioState)

    useEffect(() => {
        if (crntMentor) {
          fetch(`${baseUrl}/api/portfolio?userId=${crntMentor.userId}`, { method: 'GET' })
            .then(response => response.json())
            .then(data => {
                setPortfolios(data.data.portfolios)
            //   setPortfolios(data)
          })
          .catch(error => {
            console.error('Error fetching mentor portfolio:', error);
          });
        }
      }, []);
    return (
        <>
            <div className='pf_section-upper'>
                <div className='mtt_title'>멘토 개인 포트폴리오</div>
                <div className='btn-more'>
                    <div onClick={()=>{setIsMorePortfolioClicked(true)}}>더보기</div>
            </div>
            </div>
            <div className='pf_contents-wrap'>
                {portfolios.slice(0,2).map((e, index) => (
                    <div key={index} className='pf_content'>
                        <img src={e.portfolioImagePath} alt="Portfolio" />
                    </div>
                ))}
            </div>
        </>
    );
}

export default PortfolioSection;

//dummy
import testImg from '../../../../assets/testPortfolioImg.png'

import { useRecoilState } from 'recoil';

import './PortfolioEdit.css'
import { useEffect } from 'react';
import { isPortfolioEditClickedState, portfoilioEditInputState, portfolioState } from '../recoil';
import { crntMentorState } from '../../../../recoil';
import { crntUserState } from '../../../../recoil';
function PortfolioEdit(){
    const [isPortfolioEditClicked, setIsPortfolioEditClicked] = useRecoilState(isPortfolioEditClickedState)
    const [portfolioEditInput, setPortfolioEditInput] = useRecoilState(portfoilioEditInputState)
    const [crntMentor, setCrntMentor] = useRecoilState(crntMentorState)
    const [portfolios, setPortfolios] = useRecoilState(portfolioState)
    let inputPhotos = []
    const [crntUser, setCrntUser] = useRecoilState(crntUserState) 

    function handleFileChange(event) {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setPortfolioEditInput({...portfolios, img: reader.result});
          };
          reader.readAsDataURL(file);
        }
      }
    

      function uploadBtnHandler(){
        let newNode = {
            porofolioId: portfolios.length,
            portfolioImagePath: portfolioEditInput.img || ''
          };
          console.log(newNode)
        
          setPortfolios([...portfolios, newNode])
          // stylings배열을 post하기
          console.log(portfolios)
          setPortfolioEditInput({});
          setIsPortfolioEditClicked(false);
      }

      function portfolioDeleteBtnHandler(i){
        console.log('clicked')
        setPortfolios(portfolios.filter((_,idx)=>{
          return idx !== i
        }))
      }
    return (
    <div className="pf-edit_wrap">
        <div style={{height: '4rem'}} />
        <div className="pf-edit_upper">
            <div className="pf-edit_upload-btn" onClick={uploadBtnHandler}>
                <div>업로드</div>
            </div>
        </div>
        {portfolios.map((e, i) => (
        <div key={i} style={{ position: 'relative', width: '100%', height: '65rem', objectFit: 'cover', marginBottom: '5.6rem' }}>
          <img src={e.portfolioImagePath} alt="" style={{ width: '100%', height: '65rem', borderRadius: '20px' }}/>
          <div style={{position: 'absolute',top: '0.5rem', right: '1vw', color: 'white', fontSize: '2.8rem'}} onClick={() => portfolioDeleteBtnHandler(i)}>X</div>
        </div>
      ))}

    {portfolioEditInput.img && (
        <div className="preview-image">
          <img src={portfolioEditInput.img} alt="Preview" style={{ width: '100%', height: 'auto', borderRadius: '20px', marginBottom: '1rem' }} />
        </div>
    )}
        <div className='pf-edit_content-input-wrap'>
            <div>
                <div>자신있는 나의 포트폴리오를 업로드 해보세요.</div>
                <div>최대 n장까지 가능해요!</div>
                <div className='pf-edit_upload-btn'>
                <input type="file" id="fileInputPortfolio" accept="image/*" style={{display: 'none'}} onChange={(e)=>handleFileChange(e)}/>
                <label for="fileInputPortfolio">사진 첨부하기</label>
                </div>
            </div>
        </div>
    </div> 
    )
}

export default PortfolioEdit;
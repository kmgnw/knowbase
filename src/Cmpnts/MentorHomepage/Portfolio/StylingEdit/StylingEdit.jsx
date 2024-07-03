//dummy
import testImg from '../../../../assets/testImg.png';

import { useRecoilState } from 'recoil';

import '../PortfolioEdit/PortfolioEdit.css';
import { useEffect } from 'react';
import { isMorePortfolioClickedState, isMoreStylingClickedState, isStylingEditClickedState,stylingEditInputState, stylingsState } from '../recoil';
import { baseUrl } from '../../../../recoil';


function StylingEdit() {
  const [isStylingEditClicked, setIsStylingEditClicked] = useRecoilState(isStylingEditClickedState);
  const [stylingEditInput, setStylingEditInput] = useRecoilState(stylingEditInputState)
  const [stylings, setStylings] = useRecoilState(stylingsState)
  const formData = new FormData();


  function uploadBtnClickHandler(){
    console.log(stylingEditInput);
formData.append('homestylingCreateDto', new Blob([JSON.stringify({
    userId: 1,
    homestylingTitle:"수정 타이틀3",
    homestylingDescription:"수정 설명3",
    homestylingImg:"수정 사진3"
})], { type: "application/json" }));

// POST 요청 보내기
fetch(`${baseUrl}/api/homeStyle`, {
  method: 'POST',
  body: formData
})
.then(response => response.json())
.then(data =>console.log(data))
.catch(error => console.error('Error:', error));



    let newNode = {
      homestylingTitle: stylingEditInput.title || '',
      homestylingDescription: stylingEditInput.content || '',
      homestylingImagePath: stylingEditInput.img || ''
    };
  
    setStylings([...stylings, newNode])
    // stylings배열을 post하기
    
    setStylingEditInput({});
    setIsStylingEditClicked(false);
  }
  

  function stylingDeleteBtnHandler(i){
    console.log('clicked')
    setStylings(stylings.filter((_,idx)=>{
      return idx !== i
    }))
  }

  function handleFileChange(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      formData.append('homestylingImg', file); // file은 사용자가 
      reader.onloadend = () => {
        setStylingEditInput((prevState) => ({
          ...prevState,
          img: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <div className="pf-edit_wrap">
      <div style={{height: '4rem'}} />
      <div className="pf-edit_upper">
        <div className="pf-edit_upload-btn" onClick={() => uploadBtnClickHandler()}>
          <div>업로드</div>
        </div>
      </div>

      {stylings.map((e, i) => (
        <div key={i} style={{position:'relative', width: '100%', height: '65rem', objectFit: 'cover', marginBottom: '5.6rem' }}>
          <img src={e.homestylingImagePath} alt="" style={{ width: '100%', height: '65rem', borderRadius: '20px' }}/>
          <div style={{position: 'absolute',top: '0.5rem', right: '1vw', color: 'white', fontSize: '2.8rem'}} onClick={() => stylingDeleteBtnHandler(i)}>X</div>
        </div>
      ))}


      <div className='st-edit_content-title-wrap'>
        <input type='text' placeholder='제목을 작성해 주세요.' value={stylingEditInput.title} onChange={(e)=>setStylingEditInput({...stylingEditInput, title: e.target.value})}/>
      </div>


      {stylingEditInput.img && (
        <div className="preview-image">
          <img src={stylingEditInput.img} alt="Preview" style={{ width: '100%', height: 'auto', borderRadius: '20px', marginBottom: '1rem' }} />
        </div>
      )}

      <div className='pf-edit_content-input-wrap'>
        <div>
          <div>자신있는 나의 홈 스타일링 예시를 업로드 해보세요.</div>
          <div>최대 n장까지 가능해요!</div>
          <div className='pf-edit_upload-btn'>
            <input type="file" id="fileInputPortfolio" accept="image/*" style={{ display: 'none' }} onChange={(e)=>handleFileChange(e)}/>
            <label htmlFor="fileInputPortfolio">사진 첨부하기</label>
          </div>
        </div>
      </div>

      <div className='st-edit_content-content-wrap'>
        <textarea placeholder='내용을 작성해 주세요.' value = {stylingEditInput.content} onChange={(e)=>setStylingEditInput({...stylingEditInput, content: e.target.value})}/>
      </div>

    </div>
  );
}

export default StylingEdit;

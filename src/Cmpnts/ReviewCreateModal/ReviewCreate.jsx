import ProfileBlock from './ProfileBlock';
import ImageUpload from './ImageUpload';
import ReviewContent from './ReviewContent';
import ReviewGrid from './ReviewGrid';
import '../ReviewModal/ReviewModal.css'

import close from '../../assets/close.png'
import testImg from '../../assets/testImg.png'
import gallery from '../../assets/gallery.png'

import { dateExtractor } from '../validator'

import { useRef, useEffect, useState } from 'react'

import { useRecoilState } from 'recoil'
import { isReviewCreateClickedState, isReviewEditClickedState } from '../../recoil';
import { reviewInputState } from './recoil';
import { ReviewListState } from '../MentorHomepage/recoil';
import { baseUrl } from '../../recoil';
import { crntUserState } from '../../recoil';
import { crntMentorState } from '../../recoil';


function ReviewCreate (){
    const [crntUser, setCrntUser] = useRecoilState(crntUserState)
    const [crntMentor, setCrntMentor] = useRecoilState(crntMentorState)
    const [starRating, setStarRating] = useState(1);
    const numberRating = starRating.toFixed(1);

    const mountRef = useRef(null);
    const [reviewInput ,setReviewInput] = useRecoilState(reviewInputState)
    const [isReviewCreateClicked, setIsReviewCreateClicked] = useRecoilState(isReviewCreateClickedState);
    const [isReviewEditClicked, setIsReviewEditClicked] = useRecoilState(isReviewEditClickedState)
    const [reviewList, setReviewList] = useRecoilState(ReviewListState)

    const [imageBeforeSrc, setImageBeforeSrc] = useState('');
    const [imageAfterSrc, setImageAfterSrc] = useState('');

    const handleImageBeforeChange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
  
      reader.onloadend = () => {
        setImageBeforeSrc(reader.result);
        setReviewInput({...reviewInput, before: reader.result})
      };
  
      if (file) {
        reader.readAsDataURL(file);
      }
    };

    const handleImageAfterChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
    
        reader.onloadend = () => {
          setImageAfterSrc(reader.result);
          setReviewInput({...reviewInput, after: reader.result})
        };  
    
        if (file) {
          reader.readAsDataURL(file);
        }
      };


      function cancelClickHandler(){
        setIsReviewCreateClicked(false)
        setIsReviewEditClicked(false)
      }
    
    useEffect(() => {
      if (mountRef.current) {
        mountRef.current.style.display = isReviewCreateClicked ? 'block' : 'none';
      }
    }, [isReviewCreateClicked]);


  
    const titleChangeHandler = (e) => setReviewInput({ ...reviewInput, reviewTitle: e.target.value });
    const contentChangeHandler = (e) => setReviewInput({ ...reviewInput, reviewContent: e.target.value });
    const termChangeHandler = (e) => setReviewInput({ ...reviewInput, period: e.target.value });
    const budgetChangeHandler = (e) => setReviewInput({ ...reviewInput, budget: e.target.value });

    // const formData = new FormData();
    // function saveClickedHandler(){
    //   let userid = parseInt(window.sessionStorage.getItem('userid'), 10);
    //   // let now = new Date().toISOString();
    //   // dateExtractor(now)
    //   setIsReviewCreateClicked(false);
    //   setReviewInput(prevState => ({...prevState, menteeId: userid , nickname: 'tmpNickName'}));
    //   setReviewList(prevList => [...prevList, {...reviewInput, menteeId: crntUser.userId , nickname: crntUser.nickname}]);
    //   console.log(crntMentor.userId, crntUser.userId, reviewInput.title, reviewInput.nickname);
    
      
    //   formData.append('mentorId', 1);
    //   formData.append('menteeId', 25);
    //   formData.append('reviewTitle', 'reviewTitle');
    //   formData.append('nickname', 'nickname');
    //   formData.append('reviewContent', 'reviewContent');
    //   formData.append('satisfaction', 3);
    //   formData.append('period', 'period');
    //   formData.append('budget', 'budget');
    //   // if (beforeImgPath) formData.append('beforeImgPath', beforeImgPath);
    //   // if (afterReImgPath) formData.append('afterReImgPath', afterReImgPath);
      
    //     fetch(`${baseUrl}/api/review`, {
    //         method: 'POST',
    //         body: formData,
    //     })
    //     .then((res) => res.json())
    //     .then((data) => console.log(data))
    //     .catch((error) => console.error('Error:', error));
    // };
      function saveClickedHandler(){
        setReviewList([...reviewList, {
          reviewId: reviewList.length,
          "mentorId": crntMentor.userId,
          "menteeId": crntUser.userId,
          "reviewTitle": reviewInput.reviewTitle,
          "nickname": crntUser.nickname,
          "date": "2024.05.31",
          "beforeReImgPath": reviewInput.before,
          "afterReImgPath": reviewInput.after,
          "reviewContent": reviewInput.reviewContent,
          "satisfaction": reviewInput.starRating,
          "period": reviewInput.term,
          "budget": reviewInput.budget
        }])
        setReviewInput({})
        setIsReviewCreateClicked(false)
        setIsReviewEditClicked(false)
      }
      
    
    


    return (
    <div ref={mountRef} className="review-create-modal_wrap">
      <div className="modal_content-wrap">
      <div className="modal_cancel" onClick={() => {cancelClickHandler()}}>
        <img className="modal_cancel" src={close} alt="close" />
      </div>
      <div className="review-create_title-wrap">
      <input type='text' value={reviewInput.reviewTitle} placeholder='제목을 입력해 주세요.' onChange={titleChangeHandler}/>
      </div>

      <div className="modal_line"></div>

      <ProfileBlock />

      <div className="modal_pics-wrap">
        <ImageUpload label="before" id="review-create-pic1" imageSrc={imageBeforeSrc} gallery={gallery} onChange={handleImageBeforeChange} />
        <ImageUpload label="after" id="review-create-pic2" imageSrc={imageAfterSrc} gallery={gallery} onChange={handleImageAfterChange} />
      </div>

      <ReviewContent value={reviewInput.reviewContent} onChange={contentChangeHandler} />

      <ReviewGrid reviewInput={reviewInput} onTermChange={termChangeHandler} onBudgetChange={budgetChangeHandler} />

      <div className='review-create_save-btn' onClick={saveClickedHandler}><div>저장하기</div></div>
    </div>
  </div>
  );
    }
  
export default ReviewCreate;
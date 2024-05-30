import testImg from '../../assets/testImg.png';
import ReviewGrid from './ReviewGrid';

import close from '../../assets/close.png';
import './ReviewModal.css';
import { useEffect, useRef } from 'react';

import { useRecoilState } from 'recoil';
import { isReviewEditClickedState, isReviewClickedState } from '../../recoil';
import { crntClickedReviewState } from '../MentorHomepage/recoil';
import { ReviewListState } from '../MentorHomepage/recoil';

function ReviewModal({ name, title, content, imgs, date, starRating, term, budget }) {
  const [reviewList, setReviewList] = useRecoilState(ReviewListState)
  const [isReviewEditClicked, setIsReviewEditClicked] = useRecoilState(isReviewEditClickedState)
  const [crntClickedReview, setCrntClickedReview] = useRecoilState(crntClickedReviewState)
  const mountRef = useRef(null);
  const [isReviewClicked, setIsReviewClicked] = useRecoilState(isReviewClickedState);

  useEffect(() => {
    if (mountRef.current) {
      mountRef.current.style.display = isReviewClicked ? 'block' : 'none';
    }
  }, [isReviewClicked]);

  function saveClickedHandler(){
      
      const index = reviewList.findIndex(e => e.reviewId === crntClickedReview.reviewId);
      
      const updatedReviewList = [...reviewList];
      
      if (index !== -1) {
        updatedReviewList[index] = crntClickedReview;
      }

      setReviewList(updatedReviewList);
      setCrntClickedReview({})
      setIsReviewClicked(false)
  }

  function cancelClickHandler(){
    setIsReviewClicked(false)
    setIsReviewEditClicked(false)
  }

  useEffect(()=>{
    console.log(crntClickedReview)
    console.log(crntClickedReview.satisfaction)
  }, [])

  return (
    <div ref={mountRef} className="review-modal_wrap">
      <div className="modal_content-wrap">
        <div className="modal_cancel" onClick={cancelClickHandler}>
          <img className="modal_cancel" src={close} alt="close" />
        </div>
        <div className="modal_title">
          <input type='text' readOnly={isReviewEditClicked ? false : true} placeholder={crntClickedReview.reviewTitle} value={crntClickedReview.reviewTitle} onChange={(e)=>{setCrntClickedReview({...crntClickedReview, reviewTitle: e.target.value})}} />
        </div>

        <div className="modal_line"></div>

        <div className="modal_info-wrap">
          <div className="modal_profile-block">
            <div className="modal_profile-img">
              <img src={testImg} alt="profile" />
            </div>
            <div className="modal_profile-name">{crntClickedReview.nickname}</div>
          </div>
          <div className="modal_date">
            {crntClickedReview.date}
          </div>
        </div>

        <div className="modal_pics-wrap">
              <div>
                <div className="modal_pic">
                  <img src={crntClickedReview.before} alt="before" />
                </div>
                <div className="modal_caption">before</div>
              </div>
              <div>
                <div className="modal_pic">
                  <img src={crntClickedReview.after} alt="after" />
                </div>
                <div className="modal_caption">after</div>
              </div>
        </div>

        <div className="modal_review-title">
        후기 내용
        </div>
        <textarea className='review-content-textarea' type='text' readOnly={isReviewEditClicked ? false : true} value={crntClickedReview.reviewContent} onChange={(e)=>setCrntClickedReview({...crntClickedReview, reviewContent: e.target.value})} />
        
        <ReviewGrid starRating={parseInt(crntClickedReview.satisfaction)} term={crntClickedReview.period} budget={crntClickedReview.budget} isReviewEditClicked={isReviewEditClicked} />

        {isReviewEditClicked && <div className='review-create_save-btn' onClick={saveClickedHandler}><div>저장하기</div></div>}
      </div>
    </div>
  );
}

export default ReviewModal;

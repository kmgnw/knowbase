// import before from '../assets/before.png'
// import after from '../assets/after.png'
import './ReviewBlock.css'
import './MentorReview.css'
import '../MentoringComponent.css'
import testImg from '../../../assets/testImg.png'
import { useState } from 'react';
import { PiStarFill, PiStarLight } from "react-icons/pi";

import { useRecoilState } from 'recoil';




export default function ReviewBlock({ review, editBtnHandler, deleteBtnHandler }) {
    const userid = parseInt(window.sessionStorage.getItem('userid'), 10)

    // 평점을 표시하는 함수
    const renderRatingStars = () => {
        const starIcons = [];
        for (let i = 0; i < 5; i++) {
            if (i < Math.ceil(review.satisfaction)) {
                starIcons.push(<PiStarFill key={i} />);
            } else {
                starIcons.push(<PiStarLight key={i} />);
            }
        }
        return starIcons;
    };

    

    return (
        <div className="mentroing_review_wrap">
            <div className="review_img_wrap">
                <div className="before_img">
                    <img src={review.beforeReImgPath} alt="Before"/>
                    <div>
                    <div className='review_text'>before</div>
                    </div>
                    
                </div>
                <div className="after_img">
                    <img src={review.afterReImgPath} alt="After"/>
                    <div />
                    <div className='review_text'>after</div>
                </div>
            </div>
            <div className="review_content">
                <div>
                <div className="review_title">{review.reviewTitle}</div>
                <div className="review_rating">{renderRatingStars()}</div>
                </div>
                <div>
                <div className="review_date">{review.date}</div>
                <div className="review_comment">{review.reviewContent}</div>
                </div>
                <div className='review-block_btn-wrap'>
                <div className="review_detail_btn">
                    <button>더보기</button>
                    </div>
                    {review.menteeId === userid &&
                        <div style={{display: 'flex', gap: '1vw'}}>
                        <div className='review-block_edit-unselect' onClick={(e)=>editBtnHandler(e, review)}><div>수정</div></div>
                        <div className='review-block_delete-unselect' onClick={(e)=>deleteBtnHandler(e, review)}><div>삭제</div></div>
                        </div>}
                </div>
            </div>
        </div>
    );
}
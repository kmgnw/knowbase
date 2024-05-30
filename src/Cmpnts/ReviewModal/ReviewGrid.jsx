import './ReviewModal.css'
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil'
import { crntClickedReviewState } from '../MentorHomepage/recoil'
import { PiEnvelopeSimple, PiStarFill, PiStarLight } from "react-icons/pi";

function ReviewGrid({starRating, term, budget, isReviewEditClicked}){
    const [star, setStar] = useState(starRating);
    const [crntClickedReview, setCrntClickedReview] = useRecoilState(crntClickedReviewState) 

    const renderRatingStars = () => {
        const starIcons = [];
        for (let i = 0; i < 5; i++) {
            if (i < starRating) {
                starIcons.push(<PiStarFill key={i} />);
            } else {
                starIcons.push(<PiStarLight key={i} />);
            }
        }
        return starIcons;
    };

    return(
    <div className="grid-container">
        <div className="review-grid_title">만족도</div>
        <div className="review-grid_content">
        <span className="star_rating"> 
        {renderRatingStars()}
        {/* {[...Array(1)].map((a, i) => (
            <PiStarFill className="fill_star" key={i} onClick={() => setStar(i + 1)} />))}
        {[...Array(4)].map((a, i) => (
            <PiStarLight className="vacant_star" key={i} onClick={() => setStar(parseInt(starRating, 10) + i + 1)} />))} */}
        </span>
        </div>
        <div className="review-grid_title">멘토링 기간</div>
        <div className="review-grid_content">
            <input type='text' value={term} readOnly={isReviewEditClicked ? false : true} onChange={(e)=>setCrntClickedReview({...crntClickedReview, period: e.target.value})}/>
        </div>
        <div className="review-grid_title">예산</div>
        <div className="review-grid_content">
            <input type='text' value={budget} readOnly={isReviewEditClicked ? false : true} onChange={(e)=>setCrntClickedReview({...crntClickedReview, budget: e.target.value})}/>
        </div>
    </div>
    )
}


export default ReviewGrid
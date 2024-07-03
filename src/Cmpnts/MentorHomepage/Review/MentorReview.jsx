import './MentorReview.css'

import { useEffect, useState } from "react";    
import { PiEnvelopeSimple, PiStarFill, PiStarLight } from "react-icons/pi";
import { ReviewListState } from "../recoil";
import ReviewBlock from "./ReviewBlock";
import { crntMentorState } from '../../../recoil';
import { useRecoilState } from "recoil";
import { baseUrl, isReviewCreateClickedState } from "../../../recoil";
import { crntUserState } from '../../../recoil';

import { isReviewClickedState, isReviewEditClickedState } from '../../../recoil';
import { crntClickedReviewState } from '../recoil';

export default function MentorReview(){
    const [crntUser, setCrntUser] = useRecoilState(crntUserState)
    const [starRating, setStarRating] = useState(0);
    // const numberRating = starRating.toFixed(1);

    const [reviewList, setReviewList] = useRecoilState(ReviewListState)
    const [isReviewClicked, setIsReviewClicked] = useRecoilState(isReviewClickedState)
    const [crntClickedReview, setCrntClickedReview] = useRecoilState(crntClickedReviewState)
    const [isReviewCreateClicked, setIsReviewCreateClicked] = useRecoilState(isReviewCreateClickedState)
    const [isReviewEditClicked, setIsReviewEditClicked] = useRecoilState(isReviewEditClickedState)
    const [crntMentor, setCrntMentor] = useRecoilState(crntMentorState)

    const renderRatingStars = () => {
        const starIcons = [];
        for (let i = 0; i < 5; i++) {
            if (i < Math.ceil(starRating)) {
                starIcons.push(<PiStarFill key={i} />);
            } else {
                starIcons.push(<PiStarLight key={i} />);
            }
        }
        return starIcons;
    };
    
    useEffect(()=>{
        console.log('crntUser id is', crntUser.userId)
        console.log('crntMentor id is', crntMentor.userId)
        fetch(`${baseUrl}/api/review/myreview?userId=${crntMentor.userId}`, {method: 'GET'})
        .then(res => res.json())
        .then(data=> {
            console.log(data.data.review)
            setReviewList(data.data.review)
        })

        fetch(`${baseUrl}/api/review/highstar?userId=${crntMentor.userId}`, {method: 'GET'})
        .then(res => res.json())
        .then(data => {setStarRating(parseInt(data.data.highStar, 10))}) 
    }, [])

    function moreBtnHandler(e){
        setCrntClickedReview(e)
        setIsReviewClicked(true)
        setIsReviewEditClicked(false)
    }


    function editBtnHandler(event, e){
        event.stopPropagation()
        setCrntClickedReview(e)
        setIsReviewClicked(true)
        console.log(e.menteeId)
        if(e.menteeId === parseInt(window.sessionStorage.getItem('userid', 10))){
            setIsReviewEditClicked(true)
        }else{
            setIsReviewEditClicked(false)
        }
    }

    function deleteBtnHandler(event, review){
        event.stopPropagation()
        const index = reviewList.findIndex((e) => e.reviewId === review.reviewId);

        if (index !== -1) {
        const newReviewList = [
            ...reviewList.slice(0, index),
            ...reviewList.slice(index + 1)
        ];

        setReviewList(newReviewList);
        }
    }

    function newReviewHandler(){
        setIsReviewCreateClicked(true)
    }

    return(
        <>
        {!(crntUser.userId === crntMentor.userId) &&
        <div className="review_input">
            <span className='review-title'> 후기</span>
            <div style={{display: 'flex', gap: '17.8rem'}}>
            <div className='star-ranking-wrap'>
            <span className="star_rating">
            {renderRatingStars()}
            </span>
            <span className="number_rating">{starRating}</span>
            </div>
            <button className="review_btn" onClick={newReviewHandler}> 후기 작성하기</button>
            </div>
        </div>
        }
        
        
        <div className="review_block_container">
            {reviewList.map((e,i)=>
        <div onClick={()=>moreBtnHandler(e)}><ReviewBlock key={i} review={e} editBtnHandler = {editBtnHandler} deleteBtnHandler={deleteBtnHandler}/> </div>)}
        </div>
        </>
    );
}
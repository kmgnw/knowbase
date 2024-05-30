import { useEffect, useState } from "react";
import { baseUrl } from "../../../recoil";
import ReviewBlock from "../../MentorHomepage/Review/ReviewBlock";
import { crntClickedReviewState } from "../../MentorHomepage/recoil";
import { useRecoilState } from "recoil";
import {  crntMenteeState, isReviewClickedState, isReviewEditClickedState } from "../../../recoil";


function MentiReviewsTab(){
    const [crntMentee, setCrntMentee] = useRecoilState(crntMenteeState)
    const [myReviewList, setMyReviewList] = useState([])
    const [crntClickedReview, setCrntClickedReview] = useRecoilState(crntClickedReviewState)
    const [isReviewClicked, setIsReviewClicked] = useRecoilState(isReviewClickedState)
    const [isReviewEditClicked, setIsReviewEditClicked] = useRecoilState(isReviewEditClickedState)
    
    useEffect(()=>{
        fetch(`${baseUrl}/api/review/wrotereview?userId=${crntMentee.userId}`, {method:"GET"})
        .then(res => res.json())
        .then(data => setMyReviewList(data.data.review))
    },[])

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
        const index = myReviewList.findIndex((e) => e.reviewId === review.reviewId);

        if (index !== -1) {
        const newReviewList = [
            ...myReviewList.slice(0, index),
            ...myReviewList.slice(index + 1)
        ];

        setMyReviewList(newReviewList);
        }
    }

    function moreBtnHandler(e){
        // setCrntClickedReview(e)
        // setIsReviewClicked(true)
        // setIsReviewEditClicked(false)
    }

    return (
        <div className="review_block_container">
            {myReviewList.map((e,i)=>
        <div onClick={()=>moreBtnHandler(e)}><ReviewBlock key={i} review={e} editBtnHandler = {editBtnHandler} deleteBtnHandler={deleteBtnHandler}/> </div>)}
        </div>
    )
}

export default MentiReviewsTab;
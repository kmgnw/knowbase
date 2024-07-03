import './Comment.css';
import testImg from '../../../../assets/testImg.png';

import heart_empty from '../../../../assets/heart.png';
import heart_filled from '../../../../assets/heart_filled.png';
import { useRecoilCallback, useRecoilState, useRecoilValue } from 'recoil';
import { baseUrl, crntUserState, postState, crntPostState, mentorListState, menteeListState, crntMenteeState, crntMentorState } from '../../../../recoil';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function Comment({userId, isMentor, name, img, grade, content, likes, isIdentified, isAdopt, isCmtIdentified, isLike, commentId, isBtnsInit=true}){
    const [crntMentor, setCrntMentor] = useRecoilState(crntMentorState)
    const [crntMentee, setCrntMentee] = useRecoilState(crntMenteeState)
    const [mentorList, setMentorList] = useRecoilState(mentorListState)
    const [menteeList, setMenteeList] = useRecoilState(menteeListState)
    const crntUser = useRecoilValue(crntUserState)
    const [isLiked, setIsLiked] = useState(isLike);
    const likeCntRef = useRef(null);
    const [cmtContent, setCmtContent] = useState(content)
    const [readable, setReadable] = useState(true)

    const navigator = useNavigate()
    function findMentor(userid) {
        let mentor = mentorList.find((e) => {
            return e.userId === userid;
        });
        return mentor;
    }

    function findMentee(userid) {
        let mentee = menteeList.find((e) => {
            return parseInt(e.userId, 10) === parseInt(userid, 10);
        });
        return mentee;
    }

    function adoptClickHandler(e){
        if(!isBtnsInit){return}
        console.log('clicked')
        e.stopPropagation(); 
        // if(isIdentified){
            if(e.target.className === 'cmt_select'){
                window.alert('이미 채택된 댓글입니다.');    
            }
            else {
                fetch(`${baseUrl}/api/post`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json', // 서버에 JSON 형태의 데이터임을 알림
                    },
                    body: JSON.stringify({ // 객체를 JSON 문자열로 변환
                        "commentId": commentId,
                        "userId": crntUser.userId
                    })
                })
                .then(response => response.json()) // 응답을 JSON으로 파싱
                .then(data => {
                    // 성공적으로 데이터를 받아온 후의 처리
                    console.log(data);

                })
                .catch(error => {
                    // 오류 처리
                    console.error('Error:', error);
                });
                
                // 댓글 채택 API 호출
                window.alert('댓글이 채택되었습니다.');
        //     }
        }
    }

    
    function likeClickHandler(e){
        if(!isBtnsInit){return}
        e.stopPropagation();
        let currentLikes = parseInt(likeCntRef.current.textContent, 10);
        if(isLiked){
            fetch(`${baseUrl}/api/commentlike/unlike`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    
                    "commentId" : commentId,
                    "userId" : crntUser.userId

                })
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                
            })
            .catch(error => {
                console.error('Error:', error);
            });
            setIsLiked(false);
            likeCntRef.current.textContent = currentLikes - 1;
        }else {
            fetch(`${baseUrl}/api/commentlike/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    
                    "commentId" : commentId,
                    "userId" : crntUser.userId

                })
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                
            })
            .catch(error => {
                console.error('Error:', error);
            });
            setIsLiked(true);
            likeCntRef.current.textContent = currentLikes + 1;
        }
    }

    useEffect(()=>{
        console.log(isCmtIdentified);
    });

    function cmtClickedHandler() {
        console.log(isMentor)
        if (isMentor) {
            console.log(userId)
            setCrntMentor(findMentor(userId))
            navigator('/mentor_homepage');
        } else {
            setCrntMentee(findMentee(userId))
            navigator('/menti_homepage')
        }
    }

    function editClickHandler(e){
        const buttonText = e.target.textContent;
        switch (buttonText) {
            case '수정':
                setReadable(false);
                break;
            case '확인':
                setReadable(true);
                break;
            default:
                break;
        }
    }
    function deleteClickHandler(){}


    return(
        <div className="cmt_wrap">
            <div className="cmd_profile-img" onClick={cmtClickedHandler}>
                <img src={img || testImg} alt="profile"/>
            </div>
            <div className="cmt_content-wrap">
                <div className="cmt_profile-wrap">
                    <div>
                        <div className="cmt_name" onClick={cmtClickedHandler}>{name}</div>
                        <div className="cmt_grade">{grade}</div>
                    </div>
                        <div className={isAdopt? 'cmt_select' : 'cmt_unselect'} onClick={(e)=>adoptClickHandler(e)}><div>채택</div></div>
                </div>
                <div style={{display: 'flex',justifyContent: 'space-between'}}>
                <input className='cmt_content' type='text' value={cmtContent} onChange={(e) => setCmtContent(e.target.value)} readOnly={readable} />
                
                {isCmtIdentified && (
                    <div style={{display: 'flex', gap: '1.2rem'}}>
                    <div className={readable ? 'cmt_edit-unselect' : 'cmt_select'} onClick={(e)=>editClickHandler(e)}>{readable ? '수정' : '확인'}</div>
                    <div className='cmt_unselect' onClick={(e)=>deleteClickHandler(e)}>삭제</div>
                    </div>
                )}
                
                </div>
                <div className="cmt_likes-wrap" onClick={(e)=>likeClickHandler(e)}>
                    <div><img src={isLiked ? heart_filled : heart_empty} alt="like"/></div>
                    <div ref={likeCntRef}>{likes}</div>
                </div>
            </div>
        </div>
    );
}

export default Comment;

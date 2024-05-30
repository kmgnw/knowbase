import './CommunityDetail.css'
import Comment from './Comment/Comment'
import Header from '../../Header/Header'
import testImg from '../../../assets/testImg.png'
import award from '../../../assets/Award.png'

import { useRecoilState, useRecoilValue } from 'recoil'
import { crntPostState, crntMentorState, crntMenteeState, mentorListState, menteeListState, postState, baseUrl, crntUserState } from '../../../recoil'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { isIdentifiedUser } from '../../validator'

function CommunityDetail() {
    const crntUser = useRecoilValue(crntUserState)
    const [isIdentified, setIsIdentified] = useState(false)
    const navigator = useNavigate()
    const [cmtInput, setCmtInput] = useState('')
    const [crntPost,setCrntPost] = useRecoilState(crntPostState)
    const [mentorList, setMentorList] = useRecoilState(mentorListState)
    const [menteeList, setMenteeList] = useRecoilState(menteeListState)
    const [crntMentor, setCrntMentor] = useRecoilState(crntMentorState)
    const [crntMentee, setCrntMentee] = useRecoilState(crntMenteeState)
    const [posts, setPosts] = useRecoilState(postState)

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
    
    function cmtSubmitHandler(){
        fetch(`${baseUrl}/api/comment`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                "userId" : crntUser.userId,
                "postId" : crntPost.postId,
                "commentContent" : cmtInput
            })
    })
    .then(res => res.json())
    .then(data=>console.log(data))

    setCmtInput('')
    }

    useEffect(() => {

        // setPosts(posts.map((post, idx) => {
        //     if (post === crntPost) {
        //         return {
        //             ...post, cmts:
        //                 [
                            
        //                 ]
        //         };
        //     }
        //     return post;
        // }));
        setIsIdentified(isIdentifiedUser(parseInt(crntPost.postId,10)))


        fetch(`${baseUrl}/api/comment/all?postId=${crntPost.postId}&userId=${crntUser.userId}`, { method: "GET" })
        .then((res) => res.json())
        .then((data) => {
                console.log('cmt is')
                console.log(data.data.comments)
                setCrntPost({...crntPost, cmts: data.data.comments})
        })
        .catch((error) => {
        console.error("Error fetching data: ", error);
        });

    }, [])

    useEffect(()=>{
        if(isIdentified){
            console.log('tres')
        }
    }, [])
    return (
        <>
            <Header />
            <div className='side-margin-142vw-lined'>
                <div className='cmd_title'>{crntPost.postTitle}</div>
                <div className='cmd_line'></div>
                <div className='cmd_profile-wrap'>
                    <div>
                        <div className='cmd_profile-img'>
                            <img src={crntPost.postAuthorProfImg} />
                        </div>
                        <div className='cmd_name'>{crntPost.nickname}</div>
                    </div>
                    <div className='cmd_date'>
                        {crntPost.updateAt}
                    </div>
                </div>
                <div className='cmd_postImg'>
                <img src={crntPost.postImgPath} />
                </ div>
                <div className='cmd_content'>
                    {crntPost.postContent}
                </div>

                <div className='cmd_cmts-wrap'>
                    <div className='cmd_cmts-info-wrap'>
                        <div className='cmd_cmts-cnt'>
                            공감 <span style={{ color: '#FF719C' }}>{crntPost.cmts?.length}</span></div>
                        <div className='cmd_cmts-cnt'>
                            댓글 <span style={{ color: '#1CA764' }}>{crntPost.cmts?.length}</span></div>
                    </div>

                    <div style={{ paddingLeft: '1.9rem' }}>

                        <div className='cmd_input-wrap'>
                            <div className='cmd_profile'>
                                <img src={crntUser.profileImgPath} />
                            </div>
                            <div>
                                <input placeholder='댓글 작성이 가능합니다.' value={cmtInput} onChange={(e)=>setCmtInput(e.target.value)} />
                                <div className='cmd_submit' onClick={cmtSubmitHandler}>등록</div>
                            </div>
                        </div>
                        {crntPost.cmts?.map((comment, i) => (
                            <div key={i} style={{ marginBottom: '3.8rem' }}>
                                <Comment
                                    userId = {comment.userId}
                                    isMentor = {comment.isMentor}
                                    commentId = {comment.commentId}
                                    name={comment.nickname}
                                    img={comment.profImgPath}
                                    grade={
                                        comment.isMentor ? 
                                        (
                                          <>
                                            <img src={award} alt="Award" />{' '}
                                             멘토
                                          </>
                                        ) : 
                                        '멘티'
                                      }
                                    content={comment.commentContent}
                                    likes={comment.likeCount}
                                    isIdentified={isIdentified}
                                    isAdopt = {comment.isAdopt}
                                    isCmtIdentified={isIdentifiedUser(comment.userId)}
                                    isLike={comment.isLike}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                {/* <div className='side-line-right' /> */}
            </div>
        </>
    )
}

export default CommunityDetail;

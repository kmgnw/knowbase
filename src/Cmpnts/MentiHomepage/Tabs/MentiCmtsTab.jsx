import '../Styles/MentiCmtsTab.css'
import Comment from '../../Community/CommunityDetail/Comment/Comment';
import { useRecoilValue } from 'recoil'
import { postState, crntMenteeState, baseUrl, crntUserState } from '../../../recoil';
import { useEffect, useState } from 'react';

function MentiCmtsTab(){
    const crntUser = useRecoilValue(crntUserState)
    const [myCmtList, setMyCmtList] = useState([])
    useEffect(()=>{
        fetch(`${baseUrl}/api/comment/my?userId=${crntUser.userId}`, {method: 'GET'})
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            setMyCmtList(data.data.comments)
        })
    }, [])
    return (
    <div className='mct_wrap'>
        <div className='mtt_title'>내가 작성한 댓글</div>
        {myCmtList.map((e,i)=>(
            <div className='mct_cmt-wrap'>
            <Comment 
                key={i}
                name= {e.nickname}
                img= {e.profImgPath}
                grade = {e.isMentor}
                content = {e.commentContent}
                likes={e.likeCount}
                isLike={e.isLike}
                isAdopt={e.isAdopt}
                isBtnsInit={false}
                isCmtIdentified={true}
            />
            </div>
        ))}
    </div>
    )
}

export default MentiCmtsTab;
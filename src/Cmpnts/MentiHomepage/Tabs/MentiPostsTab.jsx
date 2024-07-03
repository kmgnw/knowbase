import CareerSlider from '../../Slider/CareerSlider';
import Block from '../../Model/Block';
import '../Styles/MentiPostsTab.css'
import { useRecoilState } from 'recoil'
import { baseUrl, mentorListState, crntMenteeState, crntPostState } from '../../../recoil'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { crntUserState } from '../../../recoil';


function MentiPostsTab(){
    const navigator = useNavigate()
    const [crntPost, setCrntPost] = useRecoilState(crntPostState)
    const [crntMentee, setCrntMentee] = useRecoilState(crntMenteeState)
    const [mypostList, setMypostList] = useState([])
    const [crntUser, setCrntUser] = useRecoilState(crntUserState)

    function blockClickHandler(e){
        setCrntPost(e)
        console.log('crntPost', crntPost)
        navigator('/community_detail')
    }

    useEffect(()=>{
        fetch(`${baseUrl}/api/post/mypost?userId=${crntUser.userId}`, {method: 'GET'})
        .then(res => res.json())
        .then(data => {
            console.log(data.data.posts)
            setMypostList(data.data.posts)
        })
    }, [])

    return (
    <div className='mpt_wrap'>
        <div className='mtt_title'>내가 작성한 글</div>
        <div className='block-grid'>
        {mypostList.map((e, i)=>(
            <div onClick={()=>{blockClickHandler(e)}}>
                <Block key={i} mentoringPath={e.postImgPath} name={e.nickname} content={e.postTitle} />
            </div>
        ))}
    </div>
    </div>
    )
}

export default MentiPostsTab;
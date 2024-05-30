import CareerSlider from '../../Slider/CareerSlider';
import Block from '../../Model/Block';
import '../Styles/MentiPostsTab.css'
import { useRecoilState } from 'recoil'
import { baseUrl, mentorListState, crntMenteeState, crntPostState } from '../../../recoil'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


function MentiPostsTab(){
    const navigator = useNavigate()
    const [crntPost, setCrntPost] = useRecoilState(crntPostState)
    const [crntMentee, setCrntMentee] = useRecoilState(crntMenteeState)
    const [mypostList, setMypostList] = useState([])

    function blockClickHandler(e){
        setCrntPost(e)
        console.log('crntPost', crntPost)
        navigator('/community_detail')
    }

    useEffect(()=>{
        fetch(`${baseUrl}/api/post/mypost?userId=${crntMentee.userId}`, {method: 'GET'})
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
                <Block key={i} mentoringPath={e.postImgPath} name={e.nickName} score={e.score} count={e.count} content={e.postTitle} tag1={e.tag1} tag2={e.tag2} tag3={e.tag3}
                />
            </div>
        ))}
    </div>
    </div>
    )
}

export default MentiPostsTab;
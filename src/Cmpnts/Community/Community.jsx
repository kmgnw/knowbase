import './Community.css'
import testImg from '../../assets/testImg.png'
import postImg from '../../assets/postImg.png'
import Header from '../Header/Header'
;
import Info from '../Info';
import Pagination from '../Pagination';
import CommunityInput from './CommunityDetail/CommunityInput';
import MentoringHomepageNavBar from '../MentorHomepage/Main/MentoringHomepageNavBar';

import { useRecoilValue, useRecoilState } from 'recoil';
import { postState, crntPostState, crntClickedCategoryState, baseUrl } from '../../recoil';
import Block from '../Model/Block';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Community() {
    const navigator = useNavigate()
    const [posts,setPosts] = useRecoilState(postState);
    const [crntPost,setCrntPost] = useRecoilState(crntPostState);
    const [crntClickedCategory, setCrntClickedCategory] = useRecoilState(crntClickedCategoryState)
    
    
    function blockClickHandler(e){
        setCrntPost(e)
        navigator('/community_detail')
    }

    useEffect(()=>{
        setCrntClickedCategory('조회순')

        fetch(`${baseUrl}/api/post/all`, { method: 'GET'})
            .then(response => {
              return response.json()

            })
            .then(data => {
                setPosts(data.data.posts)
                console.log(data.data.posts)
            })
          .catch(error =>console.error('Error fetching mentor portfolio:', error));
    }, [])

    return (
        <>
            <Header />
            <Info
                title='COMMUNITY'
                content={<>혼자서만 해결하려고 했던 궁금증을 커뮤니티 안에서 해결해 볼까요?</>}
            />
            {/* <div className='block-grid'>
            {posts.map((e, i) => (
            <div onClick={()=>{blockClickHandler(e)}}>
                
                <Block key={i} img={e.postImgPath} name={e.nickname} content={e.postContent} />
                
            </div>
        
      ))}
      
    </div> */}
            <div className='side-padding-20vw' >
                {<Pagination items={posts} itemsPerPage={24} onClick={blockClickHandler} />}
            </div>
        </>
    );
}

export default Community;

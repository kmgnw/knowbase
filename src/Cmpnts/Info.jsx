import '../Styles/Info.css'
import DropdownMultiClickable from './Model/DropdownMultiClickable';
import DropdownSingleClickable from './Model/DropdownSingleClickable';
import search from '../assets/search.png'
import edit from '../assets/edit.png'

import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CommunityInput from './Community/CommunityDetail/CommunityInput';
import { baseUrl } from '../recoil';

import { crntClickedCategoriesState } from '../recoil';
import { useRecoilState } from 'recoil';
import { postState } from '../recoil';
import { mentorListState } from '../recoil';

function Info({title: initialTitle, content: initialContent, profilePic = '', name=''}){
    const [crntClickedCategories, setCrntClickedCategories] = useRecoilState(crntClickedCategoriesState)
    const location = useLocation()
    const navigator = useNavigate()
    const profileRef = useRef(null)
    const mentoring_dropdownsRef = useRef(null)
    const cm_dropdownRef = useRef(null)
    const navRef = useRef(null)
    const btnRef = useRef(null)
    const searchRef = useRef(null)
    
    const [title, setTitle] = useState(initialTitle);
    const [content, setContent] = useState(initialContent);
    const [description, setDescription] = useState('');
    const [posts, setPosts] = useRecoilState(postState)
    const [mentorList, setMentorList] = useRecoilState(mentorListState)

    function searchClickHandler(){
        setMentorList([mentorList[0], mentorList[1], mentorList[2]])
        // fetch(`${baseUrl}/api/user/mentors?interest=${crntClickedCategories.interest}&housingType=${'단독주택'}&spaceType=${crntClickedCategories.spaceType}&style=${crntClickedCategories.style}`, {method: 'GET'})
        // .then(res => res.json())
        // .then(data => console.log(data))
    }

    useEffect(() => {
        if (location.pathname === '/mentor_homepage') {
            setTitle('Mentor Homepage');
            setContent('멘토에 대한 정보와 멘토링 후기들을 확인해보세요!')
            setDescription('멘토에 대한 정보와 멘토링 후기들을 확인해보세요!');
            btnRef.current.style.display = 'none'
            mentoring_dropdownsRef.current.style.display = 'none';
            cm_dropdownRef.current.style.display = 'none'
            searchRef.current.style.display = 'none'
        } else if(location.pathname === '/community'){
            // profileRef.current.style.display = 'none';
            mentoring_dropdownsRef.current.style.display = 'none';
        }else if(location.pathname === '/mentoring'){
            mentoring_dropdownsRef.current.style.display = 'block';
            btnRef.current.style.display = 'none';
            searchRef.current.style.display = 'none'
            cm_dropdownRef.current.style.display = 'none'
        }
    }, [location.pathname]);

    function postClickHandler(){
        navigator('/post')
    }

    function cm_dropdownHandler(e){
        switch (e) {
            case '최신순':
                fetch(`${baseUrl}/api/post/recently`, {method: "GET"})
                .then(res => res.json())
                .then(data => setPosts(data.data.post))
                break;
            case '댓글 많은 순':
                fetch(`${baseUrl}/api/post/descending`, {method: "GET"})
                .then(res => res.json())
                // .then(data => setPosts(data.data.post))
                break;
            case '댓글 적은 순':
            fetch(`${baseUrl}/api/post/ascending`, {method: "GET"})
            .then(res => res.json())
                // .then(data => setPosts(data.data.post))
            break;
            default:
                break;
        }
    }

    function mt_dropdownHandler(e){
        switch (e) {
            case '최신순':
                fetch(`${baseUrl}/api/user/mentors/all/latest`, {method: "GET"})
                .then((res)=>res.json())
                .then(data=>console.log(data))
                break;
            case '별점 높은 순':
                fetch(`${baseUrl}/api/user/mentors/satisfaction-desc`, {method: "GET"})
                .then((res)=>res.json())
                .then(data=>console.log(data))
                break;
            case '별점 낮은 순':
                fetch(`${baseUrl}/api/user/mentors/satisfaction-asc`, {method: "GET"})
                .then((res)=>res.json())
                .then(data=>console.log(data))
            break;
            default:
                break;
        }
    }

    return(
        <div className='info_wrap'>
        <div className="info_upper">
                <div className='info_subtitle'>"노베이스가 추천하는"</div>
                <span className='info_title'>{title}</span>
                <span className='info_content'>{content}</span>
            {/* <div ref={profileRef} className='profile-card-wrap'>
                <Profile name={name} profilePic={profilePic}/>
            </div> */}
        </div>
        {/* <div ref={navRef}><MentoringHomepageNavBar /></div> */}
        <div ref={mentoring_dropdownsRef} className='info_dropdown-wrap'>
        <div className='info_dropdown'>
            <div>
                <DropdownMultiClickable title="주거형태" children={['단독주택', '아파트', '오피스텔','빌라', '원룸']}/>
                <DropdownMultiClickable title="공간유형" children={['주거 공간', '사무 공간', '상업 공간']}/>
                <DropdownMultiClickable title="스타일" children={['맥시멀', '미니멀', '모던','상업 공간', '클래식', '내추럴', '사이버', '믹스앤매치']}/>
                <DropdownMultiClickable title="관심사" children={['스포츠', '운동', '음악/미술', '게임', '사진', '패션', 'DIY', '요리', '홈텐딩', '홈시어터', '문화']}/>
                <div className='info_search-wrap' onClick={searchClickHandler}>
                    <img src={search} />
                </div>
            </div>
            <DropdownSingleClickable title={'최신순'} children={['최신순', '별점 높은 순', '별점 낮은 순']} onClick={mt_dropdownHandler} 
/>
            </div>
        </div>

        <div ref={searchRef} className='cm_search-wrap'>
            <div>
                <CommunityInput />
            </div>
        </div>


        <div ref={cm_dropdownRef} className='cm_dropdown-wrap'>
            <div>
                <DropdownSingleClickable title='최신순' children={['최신순', '댓글 많은 순', '댓글 적은 순']} onClick={cm_dropdownHandler} />
            </div>
        </div>


        <div ref={btnRef} className='cm_btn-wrap'>
        <div></div>
            <div className='cm_btn' onClick={postClickHandler}>
                <div>글쓰기</div>
                <div><img src={edit} /></div>
            </div>
            </div>
    </div>
    )
}

export default Info;
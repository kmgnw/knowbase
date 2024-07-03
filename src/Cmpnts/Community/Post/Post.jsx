import './Post.css'
import Header from '../../Header/Header';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { useRecoilState } from 'recoil'
import { baseUrl, crntMentorState, postTitleState, postContentState, crntUserState } from '../../../recoil'
import { useEffect, useRef } from 'react';
import { postState } from '../../../recoil';

function Post(){
    const[crntUser, setCrntUser] = useRecoilState(crntUserState)
    let btnRef = useRef(null)
    const [postTitle ,setPostTitle] = useRecoilState(postTitleState)
    const [postContent ,setPostContent] = useRecoilState(postContentState)
    const [crntMentor, setCrntMentor] = useRecoilState(crntMentorState)
    const [postImgs, setPostImgs]= useState([])
    const formData = new FormData()
    const navigator = useNavigate()
    const [image, setImage] = useState();
    const [posts, setPosts] = useRecoilState(postState)


    function postTitleChange(e){
        setPostTitle(e)
    }
    function postContentChange(e){
        setPostContent(e)
    }


    useEffect(()=>{
        if(postContent !== ''&& postTitle !==''){
            btnRef.current.style.backgroundColor = '#1CA764'
        }else{
            btnRef.current.style.backgroundColor = '#D9D9D9'
        }
    },[postContent, postTitle])

    const onChangeImageInput = (e) => {
        const file = e.target.files[0];
        if (file) {
            formData.append('postImg', file);
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPostImgs((prevImgs) => [...prevImgs, reader.result]);
            };
            reader.readAsDataURL(file);
        }
    };
    
    const submitClickHandler = () => {
        let newPost = {
             postId: posts.length,
            postTitle: postTitle,
            postContent: postContent,
            postImgPath: postImgs[0],
            nickname: crntUser.nickname,
            userId : crntUser.userId,
            postAuthorProfImg: crntUser.profileImgPath,
            updatedAt: "2024-05-25"
        }
        setPosts([...posts, newPost])
        console.log(posts)
        navigator('/community')
        // const post = {
        //     userId: crntUser.userId,
        //     postTitle: postTitle,
        //     postContent: postContent,
        // }

        // formData.append('post', JSON.stringify(post));
        // for (let [key, value] of formData.entries()){
        //     console.log(key, value)
        // }

        // fetch(`${baseUrl}/api/post`, {
        //     method: 'POST',
        //     body: formData
        // })
        // .then((response) => response.json())
        // .then((data) => console.log(data))
        // .catch((error) => console.error('Error:', error));
    };
    
return(
    <>
    <Header />
    <div className='side-margin-142vw-lined' style={{height:'100vh'}}>
    <div className='post_input-wrap'>
        <input
        placeholder='제목을 입력해주세요.'
        value={postTitle}
        onChange={(e)=>postTitleChange(e.target.value)}
        ></input>
        <div style={{display: "flex", gap:"1.2rem"}}>
        <div className='post_gallery'>
        <input type="file" id="fileInput" accept="image/*" style={{display: 'none'}} onChange={(e)=>onChangeImageInput(e)}/>
            <div><label for="fileInput" class="button">사진 첨부하기</label></div>
            </div>
            <div
            ref={btnRef}
            className='post_submit' onClick={submitClickHandler}><div>질문하기</div></div>
        </div>
    </div>
    <div className='post_line'></div>
    <div className='post_preview-imgs'>
        {postImgs.map((e)=>(
            <div><img src={e}></img></div>
        ))}
    </div>
    <div className='post_content-input' >
        <textarea type='text' placeholder='내용을 작성해주세요'
        value={postContent}
        onChange={(e)=>postContentChange(e.target.value)}
        />
    </div>
    </div>
    </>
)
}

export default Post;
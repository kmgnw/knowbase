import './Post.css'
import Header from '../../Header/Header';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { useRecoilState } from 'recoil'
import { baseUrl, crntMentorState, postTitleState, postContentState, crntUserState } from '../../../recoil'
import { useEffect, useRef } from 'react';
function Post(){
    const[crntUser, setCrntUser] = useRecoilState(crntUserState)
    let btnRef = useRef(null)
    const [postTitle ,setPostTitle] = useRecoilState(postTitleState)
    const [postContent ,setPostContent] = useRecoilState(postContentState)
    const [crntMentor, setCrntMentor] = useRecoilState(crntMentorState)
    const [postImgs, setPostImgs]= useState([])
    const formData = new FormData()
    const navigator = useNavigate()
    const [image, setImage] = useState('');


    const onChangeImageInput = e => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            formData.append('postImgPath', file);
    
            const reader = new FileReader();
            reader.onloadend = () => {
                setPostImgs((prevImgs) => [...prevImgs, reader.result]);
                console.log(postImgs) 
            };
            reader.readAsDataURL(file);
        }
    };
    


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

    function submitClickHandler(){
        formData.append("userId", crntUser.userId)
        formData.append("postTitle", postTitle)
        formData.append("postContent", postContent)

        console.log(crntUser.userId, postTitle, postContent)
        fetch(`${baseUrl}/api/post`, {
            method: 'POST',
            body: formData
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
        navigator('/community')
        // uploadFileAWS()
//     }
    }

    

    // function handleFileChange(event) {
    //     const file = event.target.files[0];
    //     if (file) {
    //       const reader = new FileReader();
    //       reader.onloadend = () => {
    //         setPostImgs((prevImgs) => [...prevImgs, reader.result]);
    //         // uploadFileAWS(file); 
    //         console.log(postImgs)
    //       };
    //       reader.readAsDataURL(file);
    //     }
    //   }
    
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
        <input type="file" id="fileInput" accept="image/*" style={{display: 'none'}} onChange={onChangeImageInput}/>
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
import '../Styles/EditProfile.css'
import testImg from '../assets/testImg.png'
import gallery from '../assets/gallery.png'

import {
    crntMentorState,
    profileIDState,
    profileNameState,
    crntUserState,
    baseUrl
} from '../recoil'
import { useRecoilState } from 'recoil'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function EditProfile(){
    const [crntUser, setCrntUser] = useRecoilState(crntUserState)
    const navigator = useNavigate()
    const [profileImg, setProfileImg] = useState(testImg);
    const [promotionImg, setPromotionImg] = useState(testImg);
    const [crntMentor, setCrntMentor] = useRecoilState(crntMentorState)
    const [profileID, setProfileID] = useRecoilState(profileIDState)
    const [profileName, setProfileName] = useRecoilState(profileNameState)
    const inputProfileRef = useRef(null);
    const inputPromotionRef = useRef(null);
    let isMentor = window.sessionStorage.getItem('isMentor')

    function saveBtnHandler(){
        //name 과 id, crntMentor.id를 post
        console.log(crntUser.userId, profileID, profileName)
        const formData = new FormData()
        const data = JSON.stringify({
            userId: crntUser.userId,
            userName: profileID,
            nickName: profileName,
        })
        formData.append('user', data)
        for (let [key, value] of formData.entries()){
            console.log(key, value)
        }
        
        fetch(`${baseUrl}/api/user/update/${crntUser.userId}`, {
            method: 'POST',
            body: formData,
          })
            .then((response) => response.json())
            .then((data) => {
              console.log('Success:', data);
            })
            .catch((error) => {
              console.error('Error:', error);
            });
          
        setProfileName('')
        setProfileID('')
        navigator('/mentor_homepage')
    }

    const handleProfileGalleryClick = () => {
        inputProfileRef.current.click();
    };

    const handlePromotionGalleryClick = () => {
        inputPromotionRef.current.click();
    };

    const handleProfileFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImg(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePromotionFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPromotionImg(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    //2. 장착한 그 파일을 S3로 전송
//   const uploadFileAWS = (file) => {
//     //2-1. aws에서 시킨 양식 그대로 따름
//     const param = {
//       ACL: 'public-read', //일단 public으로 누구나 다 읽을 수 있다...임시로 이렇게 함(나중에 바꿔야)
//       //ContentType: "image/png",  //일단 주석처리함
//       Body: file,
//       Bucket: 'artory-s3-arbitary',
//       Key: 'upload/' + file.name, //`upload/${imageSrcReal.name}`,
//     };

//     //2-2. AWS가 정한 양식대로 보내기
//     myBucket.putObject(param).send((error) => {
//       if (error) {
//         console.log(error);
//       } else {
//         //const url = myBucket.getSignedUrl("getObject", {Key: param.Key}); 기존의 코드..그런데 이렇게 하면 짤림
//         const signedUrl = myBucket.getSignedUrl('getObject', {
//           Key: param.Key,
//         });
//         const pureUrl = signedUrl.match(/^(https:\/\/[^?]+)/)[1];
//         console.log('awsurl: ', pureUrl);
//         setImgUrl(pureUrl);
//       }
//     });
//   };


    return(
    <div className='edit-prof_wrap'>
        <div style={{height: '4rem'}} />
        <div className='edit-prof_card'>
            <div className='edit-prof_profile-img-wrap'>
                <div className='edit-prof_profile-img'>
                {/* 추후 crntMentor.profileImgPath로 전환필요 */}
                    <img src={profileImg}/>
                    <div className='edit-prof_img-overlay'></div>
                    <div className='edit-prof_gallery'><img src={gallery} onClick={handleProfileGalleryClick}/></div>
                </div>
                <input 
                    type="file" 
                    ref={inputProfileRef} 
                    onChange={(e)=>handleProfileFileChange(e)} 
                    style={{display: 'none'}} 
                />
            </div>
            <div className='edit-prof_title'>닉네임</div>
            <div className='edit-prof_input-wrap'>
            <input type='text' placeholder={'8자 이내로만 가능'} value={profileName} onChange={(e)=>setProfileName(e.target.value)}/>
            </div>
            <div className='edit-prof_title'>아이디</div>
            <div className='edit-prof_input-wrap'>
                <input type='text' placeholder={'아이디 (6~12자 이내, 영문, 숫자 사용가능)'} value={profileID} onChange={(e)=>setProfileID(e.target.value)}/>
            </div>
            <div style={{height: '10.5rem'}} />
            <div className='edit-prof_submit'>
                <div onClick={saveBtnHandler}>저장하기</div>
            </div>
        </div>

        <div style={{height: '4.5rem'}} />

        {
        // isMentor && 
    //     <div className='edit-prof_card'>
    //     <div className='ep_promotion-title'>홍보 이미지</div>
    //     <div className='ep_edit-prof_profile-img-wrap'>
    //         <div className='ep_edit-prof_profile-img'>
    //         {/* 추후 crntMentor.profileImgPath로 전환필요 */}
    //             <img src={profileImg}/>
    //             <div className='ep_edit-prof_img-overlay'></div>
    //             <div className='edit-prof_gallery'><img src={gallery} onClick={handlePromotionGalleryClick}/></div>
    //         </div>
    //         <input 
    //             type="file" 
    //             ref={inputPromotionRef} 
    //             onChange={(e)=>handlePromotionFileChange(e)} 
    //             style={{display: 'none'}} 
    //         />
    //     </div>
    //     <div className='edit-prof_title'>닉네임</div>
    //     <div className='edit-prof_input-wrap'>
    //     <input type='text' placeholder={'8자 이내로만 가능'} value={profileName} onChange={(e)=>setProfileName(e.target.value)}/>
    //     </div>
    //     <div className='edit-prof_title'>아이디</div>
    //     <div className='edit-prof_input-wrap'>
    //         <input type='text' placeholder={'아이디 (6~12자 이내, 영문, 숫자 사용가능)'} value={profileID} onChange={(e)=>setProfileID(e.target.value)}/>
    //     </div>
    //     <div style={{height: '10.5rem'}} />
    //     <div className='edit-prof_submit'>
    //         <div onClick={saveBtnHandler}>저장하기</div>
    //     </div>
    // </div>
        }
    </div>
    )
}

export default EditProfile;
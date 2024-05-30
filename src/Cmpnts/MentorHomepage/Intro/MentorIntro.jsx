import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { mentorIntroState, isEditState } from '../recoil';
import MentorInput from '../../OnBoarding/Model/MentorInput';
import { isValidatedInput } from '../../validator';

import {
    introState,
    probableTimeState,
    prosState,
    beforeRoadmapState,
    whileRoadmapState,
    afterRoadmapState,
    isIntroEditClickedState,
    isStrengthEditClickedState,
    isRoadmapEditClickedState
} from '../mc_recoil';
import { crntMentorState, baseUrl } from '../../../recoil';


export default function MentorIntro({isIdentified}) {
    const [crntMentor, setCrntMentor] = useRecoilState(crntMentorState)
    const [intro, setIntro] = useRecoilState(introState);
    const [availableTime, setAvailableTime] = useRecoilState(probableTimeState);
    const [strength, setStrength] = useRecoilState(prosState);
    const [beforeRoadmap, setBeforeRoadmap] = useRecoilState(beforeRoadmapState);
    const [whileRoadmap, setWhileRoadmap] = useRecoilState(whileRoadmapState);
    const [afterRoadmap, setAfterRoadmap] = useRecoilState(afterRoadmapState);
    const [isIntroEditClicked, setIsIntroEditClicked] = useRecoilState(isIntroEditClickedState)
    const [isRoadmapEditClicked, setIsRoadmapEditClicked] = useRecoilState(isRoadmapEditClickedState)
    const [isStrengthEditClicked, setIsStrengthEditClicked] = useRecoilState(isStrengthEditClickedState)
    const [introId, setIntroId] = useState(-1)
    useEffect(()=>{
        fetch(`${baseUrl}/api/introduce?userId=${crntMentor.userId}`, {method: 'GET'})
        .then((res)=>res.json())
        .then(data=>{
            if (data && data.data && data.data.introduces) {
                setIntro(data.data.introduces[0].introContent || '');
                setAvailableTime(data.data.introduces[0].availableTime || '');
                setStrength(data.data.introduces[0].strength || '');
                setIntroId(data.data.introduces[0].introId || -1);
            }
        })
    }, [])

    function editBtnHandler(){
        setIsIntroEditClicked(true)
    }

    function saveBtnHandler(){
        if(isValidatedInput([intro, availableTime, strength])){
            fetch(`${baseUrl}/api/introduce/${introId}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "userId": crntMentor.userId,
                "introContent": intro,
                "availableTime": availableTime,
                "strength": strength,
            })
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));

        setIsIntroEditClicked(false)
        }
        
    }
    return (
        <div className='mentoring_intro_container'>
            <div style={{height: '4rem'}} />
            <MentorInput title='나는 누구인가요?' height='12.7rem' value={intro} inputChange={setIntro} isEdit={isIntroEditClicked}/>
            
            <MentorInput title='시간은 언제가 가능한가요?' value={availableTime} height='12.7rem' inputChange={setAvailableTime} isEdit={isIntroEditClicked}/>

            <MentorInput title='나의 강점은 무엇이라고 생각하나요?' value={strength} height='12.7rem' inputChange={setStrength} isEdit={isIntroEditClicked}/>

            <div className='mentorIntro_btn_container'>
            <div className="mentorIntro_btn_wrap">
              {isIdentified && (isIntroEditClicked ?<button className="save_btn" onClick={saveBtnHandler}>저장하기</button>:
              <button className="modify_btn" onClick={editBtnHandler}>수정하기</button> )
              }  
                </div>
            </div>       
        </div>
    );
}

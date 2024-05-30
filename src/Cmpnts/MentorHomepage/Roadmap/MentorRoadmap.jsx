import '../../OnBoarding/Model/MentorInput.css'

import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import MentoringComponent from '../MentoringComponent';
import { mentorIntroState, isEditState } from '../recoil';
import MentorInput from '../../OnBoarding/Model/MentorInput';
import before from '../../../assets/before.png'
import during from '../../../assets/while.png'
import after from '../../../assets/after.png'

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
import { baseUrl, crntUserState, crntMentorState } from '../../../recoil';


export default function MentorRoadmap({isIdentified}) {
    const [beforeRoadmap, setBeforeRoadmap] = useRecoilState(beforeRoadmapState);
    const [whileRoadmap, setWhileRoadmap] = useRecoilState(whileRoadmapState);
    const [afterRoadmap, setAfterRoadmap] = useRecoilState(afterRoadmapState);
    const [isRoadmapEditClicked, setIsRoadmapEditClicked] = useRecoilState(isRoadmapEditClickedState)
    const [crntMentor, setCrntMentor] = useRecoilState(crntMentorState)
    const [crntUser, setCrntUser] = useRecoilState(crntUserState)
    const [roadmapId, setRoadmapId] = useState(-1)

    useEffect(() => {        
        fetch(`${baseUrl}/api/roadmap?userId=${crntMentor.userId}`, { method: 'GET' })
            .then(res => res.json())
            .then(data => {
                if (data && data.data && data.data.roadmap && data.data.roadmap.length > 0) {
                    setBeforeRoadmap(data.data.roadmap[0].roadmapBefore || '');
                    setAfterRoadmap(data.data.roadmap[0].roadmapAfter || '');
                    setWhileRoadmap(data.data.roadmap[0].roadmapStart || '');
                    setRoadmapId(data.data.roadmap[0].roadmapId || -1);
                    console.log(data.data.roadmap[0].roadmapId)
                }
            })
            .catch(error => console.error('Error:', error));
    }, [crntMentor.userId]);

    function editBtnHandler() {
        setIsRoadmapEditClicked(true);
    }

    function saveBtnHandler() {
        console.log(crntUser.userId);


        if (isValidatedInput([beforeRoadmap, whileRoadmap, afterRoadmap])) {

            fetch(`${baseUrl}/api/roadmap/${roadmapId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "userId": crntMentor.userId,
                    "roadmapBefore": beforeRoadmap,
                    "roadmapStart": whileRoadmap,
                    "roadmapAfter": afterRoadmap
                })
            })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.error('Error:', error));
            setIsRoadmapEditClicked(false);
        }
    }

    return (
        <div className='mentoring_intro_container'>
            <div style={{ height: '4rem' }} />

            <div style={{ position: "relative" }}>
                <MentorInput title='멘토링 전' height='15.5rem' value={beforeRoadmap} inputChange={setBeforeRoadmap} isEdit={isRoadmapEditClicked} />
                <img src={before} style={{ position: 'absolute', top: '7rem', right: '0' }} />
            </div>

            <div style={{ position: "relative" }}>
                <MentorInput title='멘토링 시작' height='15.5rem' value={whileRoadmap} inputChange={setWhileRoadmap} isEdit={isRoadmapEditClicked} />
                <img src={during} style={{ position: 'absolute', top: '7rem', right: '0' }} />
            </div>

            <div style={{ position: "relative" }}>
                <MentorInput title='멘토링 후' height='15.5rem' value={afterRoadmap} inputChange={setAfterRoadmap} isEdit={isRoadmapEditClicked} />
                <img src={after} style={{ position: 'absolute', top: '7rem', right: '0' }} />
            </div>
            <div className='mentorIntro_btn_container'>
                <div className="mentorIntro_btn_wrap">
                {isIdentified && (isRoadmapEditClicked ?<button className="save_btn" onClick={saveBtnHandler}>저장하기</button>:
              <button className="modify_btn" onClick={editBtnHandler}>수정하기</button> )
              }  
                </div>
            </div>
        </div>
    );
}

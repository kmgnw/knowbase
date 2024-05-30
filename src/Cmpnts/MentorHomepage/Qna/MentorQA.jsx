import './MentorQA.css';

import React, { useEffect, useState } from "react";

import { useRecoilState, useRecoilValue } from "recoil";
import { q1State, q2State, q3State, q4State, a1State, a2State, a3State, a4State, isQAEditClickedState } from '../mc_recoil';
import { baseUrl, crntMentorState } from '../../../recoil';

import { isValidatedInput } from '../../validator';

function MentorQA({isIdentified}) {
  const [isQAEditClicked, setIsQAEditClicked] = useRecoilState(isQAEditClickedState);
  const [q1, setQ1] = useRecoilState(q1State);
  const [q2, setQ2] = useRecoilState(q2State);
  const [q3, setQ3] = useRecoilState(q3State);
  const [q4, setQ4] = useRecoilState(q4State);
  const [a1, setA1] = useRecoilState(a1State);
  const [a2, setA2] = useRecoilState(a2State);
  const [a3, setA3] = useRecoilState(a3State);
  const [a4, setA4] = useRecoilState(a4State);
  const crntMentor = useRecoilValue(crntMentorState)
  const qList = [q1, q2, q3, q4];
  const qSetList = [setQ1, setQ2, setQ3, setQ4];
  const aList = [a1, a2, a3, a4];
  const aSetList = [setA1, setA2, setA3, setA4];
  const [QID, setQID] = useState(-1)
  useEffect(()=>{
    fetch(`${baseUrl}/api/question?userId=${crntMentor.userId}`)
    .then(res=>res.json())
    .then(data=>{
      if (data && data.data && data.data.roadmap && data.data.roadmap.length > 0) {
        setA1(data.data.roadmap[0].answerContent1)
      setA2(data.data.roadmap[0].answerContent2)
      setA3(data.data.roadmap[0].answerContent3)
      setA4(data.data.roadmap[0].answerContent4)
      setQ1(data.data.roadmap[0].questionContent1)
      setQ2(data.data.roadmap[0].questionContent2)
      setQ3(data.data.roadmap[0].questionContent3)
      setQ4(data.data.roadmap[0].questionContent4)
      setQID(data.data.roadmap[0].questionId)
        // setBeforeRoadmap(data.data.roadmap[0].roadmapBefore || '');
        // setAfterRoadmap(data.data.roadmap[0].roadmapAfter || '');
        // setWhileRoadmap(data.data.roadmap[0].roadmapStart || '');
        // setRoadmapId(data.data.roadmap[0].roadmapId || -1);
    }
      // setQ1(data.data)
    })
  }, [])

  function editBtnHandler() {
    setIsQAEditClicked(true);
  }

  function saveBtnHandler() {
    if(isValidatedInput([q1, q2, q3, q4, a1, a2, a3, a4])){
      fetch(`${baseUrl}/api/question/${QID}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(
            {
              "userId": crntMentor.userId,
              "questionContent1": q1,
              "answerContent1": a1,
              "questionContent2": q2,
              "answerContent2": a2,
              "questionContent3": q3,
              "answerContent3": a3,
              "questionContent4": q4,
              "answerContent4": a4
            })
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));

      setIsQAEditClicked(false);
    } 
  }
  

  return (
    <div className='qa_wrap'>
      <div className='mtt_title'>자주 묻는 질문</div>
      {qList.map((question, i) => (
        <div className='qa_qna-wrap' key={i}>
          <div className={isQAEditClicked ? 'qa_q-wrap-edit' : 'qa_q-wrap'}>
            <div className='qa_q-mark'>Q{i + 1}</div>
            <input 
              type='text' 
              value={question} 
              placeholder={question} 
              onChange={(event) => qSetList[i](event.target.value)} 
              readOnly={!isQAEditClicked} 
            />
          </div>
          <div className={isQAEditClicked ? 'qa_a-wrap-edit' : 'qa_a-wrap'}>
            <div className='qa_a-mark'>A{i + 1}</div>
            <textarea 
              type='text' 
              value={aList[i]} 
              placeholder={aList[i]} 
              onChange={(event) => aSetList[i](event.target.value)} 
              readOnly={!isQAEditClicked}
            />
          </div>
        </div>
      ))}

      <div className='mentorIntro_btn_container'>
        <div className='mentorIntro_btn_wrap'>
        {isIdentified && (isQAEditClicked ?<button className="save_btn" onClick={saveBtnHandler}>저장하기</button>:
              <button className="modify_btn" onClick={editBtnHandler}>수정하기</button> )
              }  
        </div>
      </div>
    </div>
  );
}
export default MentorQA;
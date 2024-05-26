import '../Styles/Layout.css'

import step_empty from '../../../assets/stepImg_empty.png'
import step_filled from '../../../assets/stepImg_filled.png'
import { crntCategoryIdxState, infoState, availableTimeState, idState, strengthState, beforeMentoringState, whileMentoringState, afterMentoringState, clickedDwellingTypeState, clickedSpaceTypeState, clickedMentoringTypeState, clickedInterestTypeState } from '../recoil'
import { useRecoilState } from 'recoil'
import { useNavigate } from 'react-router-dom'
import { useEffect, useRef } from 'react'

function Layout({element}) {
    let navigator = useNavigate()

    let nextBtnRef = useRef(null)
    let prevBtnRef = useRef(null)

    let [crntCategoryIdx, setCrntCategoryIdx] = useRecoilState(crntCategoryIdxState);
    const steps = ['카테고리 선택', '멘토 소개 작성', '로드맵 작성', '가입완료'];

    const [info, setInfo] = useRecoilState(infoState)
    const [availableTime, setAvailableTime] = useRecoilState(availableTimeState)
    const [id, setId] = useRecoilState(idState)
    const [strength, setStrength] = useRecoilState(strengthState)
    const [beforeMentoring, setBeforeMentoring] = useRecoilState(beforeMentoringState)
    const [whileMentoring, setWhileMentoring] = useRecoilState(whileMentoringState)
    const [afterMentoring, setAfterMentring] = useRecoilState(afterMentoringState)

    const [dwellings, setClickedDwellingTypes] = useRecoilState(clickedDwellingTypeState)
    const [spaces, setClickedSpaceTypes] = useRecoilState(clickedSpaceTypeState)
    const [mentorings, setClickedMentoringTypes] = useRecoilState(clickedMentoringTypeState)
    const [interests, setClickedInterestTypes] = useRecoilState(clickedInterestTypeState)

    const categoryCondition = (dwellings.length > 0 && spaces.length > 0 && mentorings.length > 0 && interests.length > 0)
    const infoCondition = (info !== '' && availableTime !== '' && id !== '' && strength !== '')
    const roadmapCondition = (beforeMentoring !== '' && whileMentoring !== '' && afterMentoring !== '')

    function prevBtnHandler() {
        if (crntCategoryIdx === 0) {
            window.alert('입력 요망 메시지 필요');
        } else {
            if(
                info !== '' &&
                availableTime !== '' &&
                id !== '' &&
                strength !== ''
            ){
                btnColoredWhen([''])
                nextBtnRef.current.textContent = '다음'
                setCrntCategoryIdx(crntCategoryIdx - 1);
            }
        }
    }
    
    function nextBtnHandler() {
        if (crntCategoryIdx === 0 && categoryCondition) {
            btnColoredWhen(['']); // 버튼 색상 초기화
            setCrntCategoryIdx(crntCategoryIdx + 1);
        } else if (crntCategoryIdx === 1 && infoCondition) {
            btnColoredWhen(['']);
            setCrntCategoryIdx(crntCategoryIdx + 1);
        } else if (crntCategoryIdx === 2 && roadmapCondition) {
            nextBtnRef.current.textContent = '메인페이지로 이동';
            btnColoredWhen(['']);
            setCrntCategoryIdx(crntCategoryIdx + 1);
        } else if (crntCategoryIdx === 3) {
            navigator('/');
        }
    }

    useEffect(() => {
        buttonHighlighter();
    }, [info, availableTime, id, strength, beforeMentoring, whileMentoring, afterMentoring, dwellings, spaces, mentorings, interests]);

    useEffect(() => {
        buttonHighlighter()
    }, [crntCategoryIdx]);

    
    useEffect(() => {
        buttonHighlighter();
        btnColoredWhen([''])
    }, []);

    function buttonHighlighter() {
        
        switch (crntCategoryIdx) {
            case 0:
                // btnColoredWhen(['']);
                prevBtnRef.current.style.visibility = 'hidden';
                btnColoredWhen([dwellings, spaces, mentorings, interests]);
                break;

            case 1:
                prevBtnRef.current.style.visibility = 'visible';
                // btnColoredWhen(['']);
                btnColoredWhen([info, availableTime, id, strength]);
                break;

            case 2:
                // btnColoredWhen(['']);
                btnColoredWhen([beforeMentoring, whileMentoring, afterMentoring]);
                break;

            case 3:
                btnColoredWhen(['fill']);
                break;

            default:
                break;
        }
    }

    function btnColoredWhen(inputList) {
        if (inputList.every(item => item !== '')) {
            prevBtnRef.current.style.backgroundColor = 'transparent';
            prevBtnRef.current.style.border = '2px solid #1CA764';
            prevBtnRef.current.style.color = '#1CA764';

            nextBtnRef.current.style.backgroundColor = '#1CA764';
            nextBtnRef.current.style.color = 'white';
            nextBtnRef.current.style.fontSize = '1.8rem';
        } else {
            prevBtnRef.current.style.backgroundColor = '#F0EFEF';
            prevBtnRef.current.style.border = '#F0EFEF';

            nextBtnRef.current.style.backgroundColor = '#F0EFEF';
            nextBtnRef.current.style.color = '#908F8F';
        }
    }
    
    return (
        <div className='layout_wrap'>
            <div className='layout_content-wrap'>
                <div>몇가지 정보를 입력하면<br /> 멘토가입이 완료됩니다! </div>

                <div className='layout_steps-wrap'>
                    {steps.map((step, i) =>
                        <div key={i} className='step'>
                            <div>
                            {crntCategoryIdx === i ? (
                                <div>
                                <img src={step_filled} className='filled_step' alt="현재 단계"/>
                                </div>
                                
                            ) : (
                                <div>
                                <img src={step_empty} className='empty_step 'alt="미완료 단계"/>
                                </div>
                            )}
                            </div>
                            <div
                            className={crntCategoryIdx === i ? 'layout_selected': 'layout_unselected'
                            }
                            >{step}</div>
                        </div>
                    )}
                </div>
                <div className='layout_input-wrap'>
                    {element}
                </div>

                <div className='layout_btn-wrap'>
                    <div ref={prevBtnRef} className='layout_prev-btn' onClick={prevBtnHandler}>
                        <div>이전</div>
                    </div>


                    <div ref={nextBtnRef} className='layout_next-btn' onClick={nextBtnHandler}>
                        <div>다음</div>
                    </div>


                </div>
            </div>
        </div>
    );
}
export default Layout;
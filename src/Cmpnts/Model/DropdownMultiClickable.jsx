import '../../Styles/DropdownMultiClickable.css'
import downArrow from '../../assets/downArrow.png'

import { useEffect, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import { crntClickedCategoriesState } from '../../recoil'

import CheckBox from './CheckBox'

function DropdownMultiClickable({title, children}){
    let ddContentRef = useRef(null) 
    let contents = children
    const [crntClickedCategories, setCrntClickedCategories] = useRecoilState(crntClickedCategoriesState)
    function titleOverHandler(){
        ddContentRef.current.style.display = 'block'
    }

    function titleDownHandler(){
        ddContentRef.current.style.display = 'none'
    }

    function contentClickHandler(content){
        switch (title) {
            case '주거형태':
                if(crntClickedCategories.housingType === content){

                }
                setCrntClickedCategories(prevState => ({
                    ...prevState,
                    housingType: content
                }));
                break;
            case '공간유형':
                if(crntClickedCategories.spaceType === content){

                }
                setCrntClickedCategories(prevState => ({
                    ...prevState,
                    spaceType: content
                }));
            break;
            case '스타일':
                if(crntClickedCategories.spaceType === content){

                }
                setCrntClickedCategories(prevState => ({
                    ...prevState,
                    style: content
                }));
            break;
            case '스타일':
                if(crntClickedCategories.interest === content){

                }
                setCrntClickedCategories(prevState => ({
                    ...prevState,
                    interest: content
                }));
            break;
            default:
                break;
        }

        // if(crntClickedCategories.includes(content)){
        //     setCrntClickedCategories(crntClickedCategories.filter(item => item !== content));
        // }else{
        //     setCrntClickedCategories(prev => [...prev, content])
        // }
    }

    useEffect(()=>{
        console.log(crntClickedCategories)
    },[crntClickedCategories])

    function checkHandler(content){
        switch (title) {
            case '주거형태':
                if(crntClickedCategories.housingType === content){
                    return true
                }
                else {return false}
            case '공간유형':
                if(crntClickedCategories.spaceType === content){
                    return true
                }
                else {return false}
            case '스타일':
                if(crntClickedCategories.style === content){
                    return true
                }
                else {return false}
            case '관심사':
                if(crntClickedCategories.interest === content){
                    return true
                }
                else {return false}
            default:
                break;
        }
    }
    return (
        <div onMouseOver={titleOverHandler} onMouseLeave={titleDownHandler}>
            <div className='dd_title-wrap'>
                <div className='dd_title'>{title}</div>
                <div><img src={downArrow} alt=""/></div>
            </div>

            <div ref={ddContentRef} className='dd_content-wrap'>
                {contents.map((content, index) => {
                    const isChecked = checkHandler(content)
                    return (
                        <div key={content} className={isChecked ? 'dd_content dd_selected' : 'dd_content'} onClick={(e) => contentClickHandler(content)}>
                            <CheckBox isChecked={isChecked} />
                            {content}
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default DropdownMultiClickable;

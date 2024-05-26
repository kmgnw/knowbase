import '../Styles/pagination.css'

import testImg from '../assets/testImg.png'
import prevBtn from '../assets/prevBtn.png'
import nextBtn from '../assets/nextBtn.png'

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Block from './Model/Block';

import { useRecoilValue } from 'recoil'
import { mentorListState } from '../recoil';

const Pagination = ({ items, itemsPerPage, onClick }) => {
    const mentorList = useRecoilValue(mentorListState)
        const [currentPage, setCurrentPage] = useState(1);

      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      
      const numOfPages = Math.floor(items.length / itemsPerPage);

    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);


      const goToNextPage = () => {
        if(currentPage < numOfPages){ // 현재 페이지가 마지막 페이지보다 작을 경우에만
          setCurrentPage(page => page + 1);
          console.log('next'); // 조건문 내부로 이동
        }
      }
      
  
      const goToPreviousPage = () => {
          if(currentPage > 1){ // 현재 페이지가 1보다 클 경우에만 (첫 페이지가 아닐 경우에만)
          setCurrentPage(page => page - 1)
          console.log('prev')
          }
      };



  // 페이지네이션 컨트롤 렌더링
  const renderPaginationControls = () => (
    <div className='pagination_btns-wrap'>
        <div className='pagination_prevBtn' onClick={goToPreviousPage}>
            <div><img src={prevBtn} /></div>
            <div>이전</div>
        </div>
        <div className='pagination_nextBtn' onClick={goToNextPage}>
            <div>다음 페이지</div>
            <div><img src={nextBtn} /></div>
        </div>
    </div>
  );
  

  return (
    <>
    <div className='block-grid'>
      {currentItems.map((e, i) => (
        
            <div onClick={()=>{onClick(e)}}>
                {items === mentorList ?
                <Block key={i} img={testImg} name={e.name} score={'e.score'} count={'e.count'} content={e.mentorContent} 
                /> :
                <Block key={i} img={e.postImgPath} name={e.nickname} content={e.postContent} />
                }
                
            </div>
        
      ))}
      
    </div>
    {renderPaginationControls()}
    </>
  );
};

export default Pagination;

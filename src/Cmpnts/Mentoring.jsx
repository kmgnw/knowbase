import '../Styles/Mentoring.css'
import testImg from '../assets/testImg.png'

import Header from './Header/Header'
import Info from './Info'
import PaginationExample from './Pagination'

import { useNavigate } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { crntMentorState, crntClickedCategoriesState, crntClickedCategoryState, mentorListState, baseUrl } from '../recoil'
import { useEffect } from 'react'

function Mentoring (){
    const navigator = useNavigate()
    const [mentorList, setMentorList] = useRecoilState(mentorListState)
    const [crntMentor, setCrntMentor] = useRecoilState(crntMentorState)
    const [crntClickedCategories, setCrntClickedCategories] = useRecoilState(crntClickedCategoriesState)
    const [crntClickedCategory, setCrntClickedCategory] = useRecoilState(crntClickedCategoryState)
    
    function blockClickHandler(e){
        setCrntMentor(e)
        console.log('crntClickedMentor'+ crntMentor)
        navigator('/mentor_homepage');
    }

    useEffect(()=>{
        setCrntClickedCategory('조회순')
        setCrntClickedCategories([])
        fetch(`${baseUrl}/api/user/mentors/all`, {method: "GET"})
        .then((res) => res.json())
          .then((data) => {
              setMentorList(data.data.mentors);
          })
          .catch((error) => {
              console.error("Error fetching data: ", error);
          });
    },[])

    
      


    return(
    <div>
    <Header />
    <Info title='Mentoring' content={<>멘토와 멘티가 함께 만들어간 방 투어의 기회!<br/>후기도 같이 확인하고 나의 취향인 멘토에게 멘토링을 신청해보아요</>}
    />
    <div className='side-padding-20vw'>
        <PaginationExample items={mentorList} itemsPerPage={24} onClick={blockClickHandler} />
    </div>
    </div>
    )
}

export default Mentoring;
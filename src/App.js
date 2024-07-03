import './App.css';
import Home from './Cmpnts/Home'
import Mentoring from './Cmpnts/Mentoring'
import MentorHomepage from './Cmpnts/MentorHomepage/Main/MentorHomepage.jsx';
import Community from './Cmpnts/Community/Community';
import CommunityDetail from './Cmpnts/Community/CommunityDetail/CommunityDetail.jsx'
import MentiHomepage from './Cmpnts/MentiHomepage/MentiHomepage.jsx';
import EditProfile from './Cmpnts/EditProfile';
import Post from './Cmpnts/Community/Post/Post';
import OnBoarding from './Cmpnts/OnBoarding/OnBoarding.jsx';
import { Routes, Route } from 'react-router-dom';
import MenteeSignup from './Signup/MenteeSignup.jsx';
import MentorSignup from './Signup/MentorSignup.jsx';


import testImg from './assets/testImg.png'


import { useEffect } from 'react';
import { mentorListState, crntUserState, menteeListState, crntMenteeState, baseUrl } from './recoil';
import { useRecoilState } from 'recoil';


// 로그인 시 고유 id, isMentor값 response
function App() {

  const [mentorList, setMentorList] = useRecoilState(mentorListState)
  const [menteeList, setMenteeList] = useRecoilState(menteeListState)
  const [crntUser, setCrntUser] = useRecoilState(crntUserState)
  useEffect(() => {
    let isMentor = window.sessionStorage.getItem('isMentor')
    console.log(isMentor)
    let userid = window.sessionStorage.getItem('userid');

    if(isMentor==="true"){
          fetch(`http://52.78.165.203:8080/api/user/mentors/all`, { method: 'GET' })
            .then(response => {
              return response.json()
            })
            .then(data => {
              const mentors = data.data.mentors
              setMentorList(mentors)
              console.log(mentors)
              const crntMentor = mentors.find((e) => {
                return e.userId === parseInt(userid);
              })
              setCrntUser(crntMentor)
              console.log("crntMentor : ",crntMentor)

              fetch(`http://52.78.165.203:8080/api/user/mentees/all`, { method: 'GET' })
              .then(response => {
                return response.json()
              })
              .then(data => {
                const mentees = data.data.mentees
                setMenteeList(mentees)
              })

          })
          .catch(error => {
            console.error('Error fetching mentor portfolio:', error);
          });
    }else{
      fetch(`http://52.78.165.203:8080/api/user/mentees/all`, { method: 'GET' })
            .then(response => {
              return response.json()
            })
            .then(data => {
              const mentees = data.data.mentees
              setMenteeList(mentees)
              console.log(mentees)
              const crntMentee = mentees.find((e) => {
                return e.userId === parseInt(userid);
              })
              setCrntUser(crntMentee)
              console.log("crntMentee : ",crntMentee)
              
          })
          .catch(error => {
            console.error('Error fetching mentor portfolio:', error);
          });
    };
    }, []);
  
    useEffect(() => {
      console.log(mentorList);
    }, [mentorList]);
  


  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mentoring" element={<Mentoring />} />
        <Route path="/mentor_homepage" element={<MentorHomepage />} />
        <Route path="/menti_homepage" element={<MentiHomepage/>} />
        <Route path="/community" element={<Community/>} />
        <Route path="/community_detail" element={<CommunityDetail/>} />
        <Route path="/post" element={<Post />} />
        <Route path="/edit_profile" element={<EditProfile />} />
        <Route path="/onboarding" element={<OnBoarding />} />
        <Route path="/signup_mentee" element={<MenteeSignup />} />
        <Route path="/signup_mentor" element={<MentorSignup />} />
    </Routes>
  );
}

export default App;

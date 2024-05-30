import './Styles/NavBar.css';
import testImg from '../../assets/testImg.png'
import { useNavigate } from 'react-router-dom';
import { useRecoilState , useRecoilValue} from 'recoil';

import { mentorListState, menteeListState, crntMentorState, crntMenteeState,selectedMainNavbarState, crntUserState } from '../../recoil';

import { isMentor } from '../validator';

function MainNav() {
    const navigator = useNavigate();
    const [selectedNavbar, setSelectedNavbar] = useRecoilState(selectedMainNavbarState);
    const crntUser = useRecoilValue(crntUserState)

    const titles = ['홈', '멘토링', '커뮤니티', '마이페이지'];
    const [mentorList, setMentorList] = useRecoilState(mentorListState);
    const [menteeList, setMenteeList] = useRecoilState(menteeListState);
    const [crntMentor, setCrntMentor] = useRecoilState(crntMentorState)
    const [crntMentee, setCrntMentee] = useRecoilState(crntMenteeState)

    function findMentor(userid) {
        let mentor = mentorList.find((e) => {
            return parseInt(e.id, 10) === parseInt(userid, 10);
        });
        return mentor;
    }
    
    function findMentee(userid) {
        let mentee = menteeList.find((e) => {
            return parseInt(e.userId, 10) === parseInt(userid, 10);
        });
        return mentee;
    }
    

    function navBarClickHandler(title) {
        setSelectedNavbar(title);
        switch (title) {
            case '홈':
                navigator('/');
                break;
            case '멘토링':
                navigator('/mentoring');
                break;
            case '커뮤니티':
                navigator('/community');
                break;
            case '마이페이지':
                if (isMentor()) {
                    setCrntMentor(crntUser)
                    navigator('/mentor_homepage');
                } else {
                    setCrntMentee(findMentee(parseInt(window.sessionStorage.getItem('userid'), 10)))
                    console.log('crntMentee', crntMentee)
                    navigator('/menti_homepage');
                }
                break;
                
            default:
                break;
        }
    }

    return (
    <div className='hd_navbar-wrap'>
    {titles.map((title, i) => {
        const classNames = `hd_nav ${selectedNavbar === title ? 'selected' : ''}`;
        return (
            <div key={i} className={classNames} onClick={() => navBarClickHandler(title)}>{title}</div>
        )
    })}
    </div>
    )
}
export default MainNav;

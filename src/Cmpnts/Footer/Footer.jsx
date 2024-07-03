import Logo from "../../assets/Footer/Logo";
import NameLogo from '../../assets/Footer/KNOWBASE.svg'
import testImg from '../../assets/testImg.png'
import './Footer.css'
export default function Footer(){
    return(<>
    <div className="footer_wrap">
        <div className="footer_logo_wrap">
        <Logo style={{width: '62px', height: '62px'}} fill="black"/>
        <div className="footer_info">
            <img src={NameLogo} />
            <div> personal home styling mentoring service</div>
        </div>
        </div>
        
        <div className="footer_contact">
            <div className="footer_contact_mail">contact : knowbase@gmail.com</div>
            <div className="footer_contact_comment">
                <div>고객센터</div>
                <div>공지사항</div>
                <div>개인정보 처리 방침</div> 
            </div>
        </div>
        <hr className="footer_line"/>
        <div className="footer_copyright">ⓒ Know BASE . All rights reserved.</div>
    </div>
        </>
    )
}
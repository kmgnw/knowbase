// import React, { useState, useEffect } from "react";
// import { useRecoilState } from "recoil";
// import {
//     inputGenderState,
//     inputAgeState,
//     inputNameState,
//     inputPasswordState,
//     inputPasswordConfirmedState,
//     inputNickNameState,
//     inputIdState,
//     inputCertificateState
// } from "../recoil";
// import Header from "./Header";
// import { useNavigate } from "react-router";
// import '../Styles/MenteeSignup.css';
// import downArrow from '../assets/downArrow.png';
// import Signin from "./Signin";

// export default function MentorSignup() {
//     const navigate = useNavigate();
//     const [inputGender, setInputGender] = useRecoilState(inputGenderState);
//     const [inputAge, setInputAge] = useRecoilState(inputAgeState);
//     const [inputName, setInputName] = useRecoilState(inputNameState);
//     const [inputPassword, setInputPassword] = useRecoilState(inputPasswordState);
//     const [inputId, setInputId] = useRecoilState(inputIdState);
//     const [inputPasswordConfirmed, setInputPasswordConfirmed] = useRecoilState(inputPasswordConfirmedState);
//     const [inputNickname, setInputNickName] = useRecoilState(inputNickNameState);
//     const [inputCertificate, setInputCertificate] = useRecoilState(inputCertificateState)
//     const [showGenderDropdown, setShowGenderDropdown] = useState(false);
//     const [showAgeDropdown, setShowAgeDropdown] = useState(false);

//     const [isFormValid, setIsFormValid] = useState(false);
//     const [inputErrors, setInputErrors] = useState({
//         nameError: '',
//         idError: '',
//         passwordError: '',
//         passwordConfirmedError: '',
//         nicknameError: ''
//     });

//     const genderOptions = ["남성", "여성"].filter(gender => gender !== inputGender);
//     const ageOptions = ["10대", "20대", "30대", "40대 이상"].filter(age => age !== inputAge);

//     const handleGenderChange = (value) => {
//         setInputGender(value);
//         setShowGenderDropdown(false);
//     };

//     const handleAgeChange = (value) => {
//         setInputGender(value === "여성" ? false : true);
//         setShowAgeDropdown(false);
//     };

//     const validatePassword = (password) => {
//         const passwordRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
//         return passwordRegExp.test(password);
//     };

//     const validateId = (id) => {
//         const idRegExp = /^[a-zA-Z0-9]{6,12}$/;
//         return idRegExp.test(id);
//     };

//     const validateNickname = (nickname) => {
//         const nicknameRegExp = /^[a-zA-Z0-9]{6,12}$/;
//         return nicknameRegExp.test(nickname);
//     };

//     const checkFormValidity = () => {
//         const errors = {
//             nameError: '',
//             idError: '',
//             passwordError: '',
//             passwordConfirmedError: '',
//             nicknameError: '',
//             certificateError: ''
//         };

//         if (!inputName) {
//             errors.nameError = '이름을 입력하세요.';
//         }
//         if (!inputId) {
//             errors.idError = '아이디를 입력하세요.';
//         } else if (!validateId(inputId)) {
//             errors.idError = '아이디는 6~12자 이내의 영문 또는 숫자만 사용 가능합니다.';
//         }
//         if (!inputPassword) {
//             errors.passwordError = '비밀번호를 입력하세요.';
//         } else if (!validatePassword(inputPassword)) {
//             errors.passwordError = '비밀번호는 8자 이상의 문자, 숫자, 특수기호 조합이어야 합니다.';
//         }
//         if (!inputPasswordConfirmed) {
//             errors.passwordConfirmedError = '비밀번호를 확인하세요.';
//         } else if (inputPasswordConfirmed !== inputPassword) {
//             errors.passwordConfirmedError = '비밀번호가 일치하지 않습니다.';
//         }
//         if (!inputNickname) {
//             errors.nicknameError = '닉네임을 입력하세요.';
//         } else if (!validateNickname(inputNickname)) {
//             errors.nicknameError = '닉네임은 6~12자 이내의 영문 또는 숫자만 사용 가능합니다.';
//         }
//         if(!inputCertificate){
//             errors.certificateError = "재직자 인증 확인 후 가입이 완료됩니다.";
//         }

//         setInputErrors(errors);

//         // 모든 필드가 유효한지 확인
//         const isValid = Object.values(errors).every(error => error === '');
//         setIsFormValid(isValid);
//     };

//     useEffect(() => {
//         checkFormValidity();
//     }, [inputName, inputGender, inputAge, inputId, inputPassword, inputPasswordConfirmed, inputNickname, inputCertificate]);


//     const handleSignUp = async () => {
//         try {
//           const response = await fetch("http://52.78.165.203:8080/api/user/register/mentor", {
//                 method : "POST",         
//                 headers : {            
//                     "Content-Type":"application/json; charset=utf-8"
//                 },
    
//                 body: JSON.stringify({
//                 "name": inputName, //이름
//                 "userName": inputId, //로그인할 때 쓰는 아이디
//                 "password": inputPassword, 
//                 "nickname" : inputNickname, //닉네임
//                 "employmentPath": inputCertificate,
//                 "isMentor" : false,
//                 "gender" : inputGender ==='남자', // 남자 -> true , 여자 -> false
//                 "age" : inputAge,
//                 }),  
//             })
    
//           const data = await response.json();
//           console.log(data);
    
//           if (response.status === 200) {
//             alert('회원가입에 성공하였습니다.');
//           } else if(response.status === 400){
//             alert('입력값이 올바르지 않습니다.')
//           }
//           else if(response.status === 409){
//             alert('이미 존재하는 회원입니다.')
//           }
//           else {
//             alert('회원가입 실패');
//           }
//         } catch (error) {
//           alert('에러 발생');
//         }
    
//         navigate('/Signin');
//         setInputName='';
//         setInputGender = '';
//         setInputAge = '';
//         setInputId = '';
//         setInputPassword = '';
//         setInputPasswordConfirmed='';
//         setInputNickName ='';
//         setInputCertificate = '';
//       };

//     return (
//         <>
//             <Header />
//             <div className="mentee_signup_wrap">
//                 <div className="input_info">
//                     <div className="input_name">
//                         <b>이름</b>
//                         <input
//                             type="text"
//                             placeholder="* (필수) 이름"
//                             className="input_field"
//                             value={inputName}
//                             onChange={(e) => setInputName(e.target.value)}
//                         />
//                         <div className="error_message">{inputErrors.nameError}</div>
//                     </div>
//                     <div className="dropdown">
//                         <div className="input_gender">
//                             <div className="gender_wrapper">
//                                 <div
//                                     className={`selected_gender ${inputGender ? 'selected' : ''}`}
//                                     onClick={() => setShowGenderDropdown(!showGenderDropdown)}
//                                 >
//                                     {inputGender || "성별"}
//                                     {!inputGender && <img src={downArrow} className="dropdown_icon" alt="down arrow" />}
//                                 </div>
//                                 {showGenderDropdown && (
//                                     <div className="gender_dropdown">
//                                         {genderOptions.map(gender => (
//                                             <div className="gender_option" key={gender} onClick={() => handleGenderChange(gender)}>
//                                                 {gender}
//                                             </div>
//                                         ))}
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                         <div className="input_age">
//                             <div className="age_wrapper">
//                                 <div
//                                     className={`selected_age ${inputAge ? 'selected' : ''}`}
//                                     onClick={() => setShowAgeDropdown(!showAgeDropdown)}
//                                 >
//                                     {inputAge || "연령대"}
//                                     {!inputAge && <img src={downArrow} className="dropdown_icon" alt="down arrow" />}
//                                 </div>
//                                 {showAgeDropdown && (
//                                     <div className="age_dropdown">
//                                         {ageOptions.map(age => (
//                                             <div className="age_option" key={age} onClick={() => handleAgeChange(age)}>
//                                                 {age}
//                                             </div>
//                                         ))}
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                         <div className="dropdwon_comment"> *(필수) </div>
//                     </div>
//                     <div className="input_id">
//                         <b>아이디</b>
//                         <div className="id_wrap">
//                             <input
//                                 type="text"
//                                 placeholder="* (필수) 아이디 6~12자 이내, 영문, 숫자 사용가능"
//                                 className="input_field"
//                                 value={inputId}
//                                 onChange={(e) => setInputId(e.target.value)}
//                             />
//                             <button className="check_double"> 중복확인</button>
//                         </div>
//                         <div className="error_message">{inputErrors.idError}</div>

//                     </div>
//                     <div className="input_pw">
//                         <b>비밀번호</b>
//                         <input
//                             type="password"
//                             placeholder="* (필수) 비밀번호 8자 이상, 문자, 숫자, 특수기호 필수"
//                             className="input_field"
//                             value={inputPassword}
//                             onChange={(e) => setInputPassword(e.target.value)}
//                         />
//                         <div className="error_message">{inputErrors.passwordError}</div>
//                     </div>
//                     <div className="input_pwconfirmed">
//                         <input
//                             type="password"
//                             placeholder="비밀번호 확인"
//                             className="input_field"
//                             value={inputPasswordConfirmed}
//                             onChange={(e) => setInputPasswordConfirmed(e.target.value)}
//                         />
//                         <div className="error_message">{inputErrors.passwordConfirmedError}</div>
//                     </div>
//                     <div className="input_nickname">
//                         <b>닉네임</b>
//                         <div className="nickname_wrap">
//                             <input
//                                 type="text"
//                                 placeholder="* (필수) 닉네임 6~12자 이내, 영문, 숫자 사용가능"
//                                 className="input_field"
//                                 value={inputNickname}
//                                 onChange={(e) => setInputNickName(e.target.value)}
//                             />
//                             <button className="check_double"> 중복확인</button>
//                         </div>
//                     </div>
//                     <div className="error_message">{inputErrors.nicknameError}</div>
//                 </div>
//                 <div className="input_certificate">
//                     <b>증명서 </b>
//                     <div className="certificate_wrap">
//                     <input
//                         type="file"
//                         placeholder="* (필수) 자격증 또는 재직증명서 첨부 "
//                         className="input_field"
//                         value={inputCertificate}
//                         onChange={(e)=>setInputCertificate(e.target.value)}
//                         />
//                         <button className="check_double"> 첨부확인</button>
//                     </div>
//                     <div className="error_message">{inputErrors.certificateError}</div>
//                 </div>
//                 <button className="join_btn" disabled={!isFormValid}  onClick={handleSignUp}>가입하기</button>
//             </div>
//         </>
//     );
// }

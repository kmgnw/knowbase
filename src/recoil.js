import { atom } from 'recoil'
import testImg from './assets/testImg.png'// dummy img
import postImg from './assets/postImg.png'// dummy img

//더미 데이터 (추후 fetching한 json 데이터 매핑 필요)
export const mentorListState = atom({
    key: 'mentorListState',
    default:[]
})

export const crntUserState = atom({
  key: 'crntUserState',
  default: {}
})

export const crntMentorState = atom({
    key: 'crntMentorState',
    default: {}
})

export const crntMenteeState = atom({
    key: 'crntMenteeState',
    default: {}
})

export const menteeListState = atom({
    key: 'menteeListState',
    default: []
})


export const selectedMainNavbarState = atom({
    key:'selectedMainNavBarState',
    default:''
})

export const selectedNavbarState = atom({
    key:'selectedNavBarState',
    default:'소개'
})

export const selectedMentiNavbarState = atom({
    key:'selectedMentiNavbarState',
    default:'작성 글'
})

export const postState = atom({
    key: 'postState',
    default: [
        {
            "postId": 1,
            "postTitle": "제목",
            "postContent": "내용",
            "postImgPath": postImg,
            "nickname": "nickname",
            "postAuthorProfImg": "string",
            "updatedAt": "2024-05-25T16:44:10.199599",
            'cmts': [
                {
                    "commentId": 1,
                    "userId": 6,
                    "nickname": "nickname",
                    "profImgPath": "string",
                    "isMentor": true,
                    "commentContent": "userId 1이 쓴 댓글1",
                    "likeCount" : 9,
                    "isLike": true,
                    "isAdopt" : true,
                },
            ]
        },
        {
            "postId": 2,
            "postTitle": "제목",
            "postContent": "내용",
            "postImgPath": postImg,
            "nickname": "nickname",
            "postAuthorProfImg": "string",
            "updatedAt": "2024-05-25T16:44:14.114309"
        },
        {
            "postId": 3,
            
            "postTitle": "제목",
            "postContent": "내용",
            "postImgPath": postImg,
            "nickname": "mentorNickname",
            "postAuthorProfImg": "string",
            "updatedAt": "2024-05-25T16:44:19.207289"
        },
        {
            "postId": 4,
            "postTitle": "제목",
            "postContent": "내용",
            "postImgPath": postImg,
            "nickname": "mentorNickname",
            "postAuthorProfImg": "string",
            "updatedAt": "2024-05-25T16:44:22.670628"
        },
        {
            "postId": 5,
            "postTitle": "제목",
            "postContent": "내용",
            "postImgPath": postImg,
            "nickname": "nickname",
            "postAuthorProfImg": "string",
            "updatedAt": "2024-05-25T16:44:27.979651"
        },
        {
            "postId": 6,
            "postTitle": "제목",
            "postContent": "내용",
            "postImgPath": postImg,
            "nickname": "nickname",
            "postAuthorProfImg": "string",
            "updatedAt": "2024-05-25T16:44:31.325159"
        },
        {
            "postId": 7,
            "postTitle": "제목",
            "postContent": "내용",
            "postImgPath": postImg,
            "nickname": "nickname",
            "postAuthorProfImg": "string",
            "updatedAt": "2024-05-25T16:44:37.524719"
        },
        {
            "postId": 8,
            "postTitle": "제목",
            "postContent": "내용",
            "postImgPath": postImg,
            "nickname": "MenteeNickname2",
            "postAuthorProfImg": "string",
            "updatedAt": "2024-05-25T16:45:10.341813",
            "cmts": [
                {
                    "commentId": 1,
                    "userId": 1,
                    "nickname": "nickname",
                    "profImgPath": "string",
                    "isMentor": true,
                    "commentContent": "userId 1이 쓴 댓글1",
                    "likeCount" : 1,
                    "isLike": true,
                    "isAdopt" : true,
                },
                {
                    "commentId": 1,
                    "userId": 2,
                    "nickname": "nickname",
                    "profImgPath": "string",
                    "isMentor": true,
                    "commentContent": "userId 1이 쓴 댓글1",
                    "likeCount" : 7,
                    "isLike": false,
                    "isAdopt" : true,
                },
                {
                    "commentId": 1,
                    "userId": 3,
                    "nickname": "user32",
                    "profImgPath": "string",
                    "isMentor": false,
                    "commentContent": "userId 1이 쓴 댓글1",
                    "likeCount" : 1,
                    "isLike": true,
                    "isAdopt" : false,
                },{
                    "commentId": 1,
                    "userId": 4,
                    "nickname": "nickname",
                    "profImgPath": "string",
                    "isMentor": true,
                    "commentContent": "userId 1이 쓴 댓글1",
                    "likeCount" : 9,
                    "isLike": true,
                    "isAdopt" : true,
                }
            ]        },
    ]
})

export const crntPostState = atom({
    key: 'crntPostState',
    default: {}
})

export const postTitleState = atom({
    key: 'postTitleState',
    default: ''
})

export const postContentState = atom({
    key: 'postContentState',
    default: ''
})

export const crntClickedCategoriesState = atom({
    key: 'crntClickedCategoriesState',
    default:{
        interest: '',
        housingType: '',
        spaceType: '',
        style: ''
    }
})

export const crntClickedCategoryState = atom({
    key: 'crntClickedCategoryState',
    default:'조회순'
})

export const isReviewClickedState = atom({
    key: 'isReviewClickedState',
    default: false
})

export const isReviewCreateClickedState = atom({
    key: 'isReviewCreateClickedState',
    default: false
})

export const isContactClickedState = atom({
    key: 'isContactClickedState',
    default: false
})

export const profileNameState = atom({
    key: 'profileNameState',
    default: ''
})

export const profileIDState = atom({
    key: 'profileIDState',
    default: ''
})

export const isReviewEditClickedState = atom({
    key: 'isReviewEditClickedState',
    default: true
})

export const baseUrl = 'http://52.78.165.203:8080'

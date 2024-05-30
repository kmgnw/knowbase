import { atom } from 'recoil'
import testImg from '../../assets/testImg.png'

export const isEditState = atom ({
    key: 'isEditState',
    default: false
})

export const mentorIntroState = atom({
    key: 'mentorIntroState',
    default:[
        {
            title: '나는 누구인가요?',
            content: '영화보는걸 좋아하는 5년차 작곡가입니다 뭐 사용자의 자유에 의해 내용은 더 길어질수도있습니다 제가 더이상 쓸만한 내용이 없어서 지금 이렇게 쓰고있는데 최대 세줄정도가 적당하겠네요',
        },
        {
            title:'시간은 언제가 가능한가요?',
            content: '연락가능 시간 : 월,화: 오후 6시이후/그외: 언제나 가능',
        },
        { 
            title: '나의 강점은 무엇이라고 생각하나요?',
            content: '시중에 나온 프로젝터는 다써봤다고 생각합니다 예상 예산과 방환경에 맞춰서 적절한 홈시어터환경을 조성해드리는데 강점이있다고 생각합니다 음악일을 하는만큼 사운드역시 충분한 지식을 갖고있으며 최적의 사운드 환경도 추가로 조성해드릴수있습니다',
        }
    ],
    // effects_UNSTABLE: [persistAtom],
})

export const mentorRoadmapState = atom({
    key:'mentorRoadmapState',
    default:[{
        title:'로드맵 전',
        content: '필요한 정보를 수집합니다. 예를 들면 평수, 현재 방구조, 희망 스타일, 희망 예산 정도 멘토링 시간을 조정합니다.',
    },
    {
        title:'로드맵 시작',
        content: '버려야 할 가구와 남겨둘 가구를 선정합니다.<br/>3D 인테리어 프로그램을 통한 가구배치를 해보고 예상기간 등 세부사항을 정합니다.<br/>최종 디자인을 선정합니다. <br/>홈스타일링 중 질문사항을 답변하는 시간을 가집니다',
    },
    {
        title:'로드맵 후',
        content: '변경된 최종 방 사진을 가지고 최종 피드백을 주고 받으며 멘토링은 끝이납니다. 정보를 수집합니다. 예를 들면 평수, 현재 방구조, 희망 스타일, 희망 예산 정도 멘토링 시간을 조정합니다.',
    }
    ]
})

export const mentorQAstate = atom({
    key: 'mentorQAState',
    default:[
        {
            question: '질문 내용을 입력해주세요.',
            answer: '질문 답변을 입력해주세요답변도 최대 세줄이좋을 것 같네용',
        },
        {
            question: '질문 내용을 입력해주세요.',
            answer: '질문 답변을 입력해주세요답변도 최대 세줄이좋을 것 같네용',
        },
        {
            question: '질문 내용을 입력해주세요.',
            answer: '질문 답변을 입력해주세요답변도 최대 세줄이좋을 것 같네용',
        },
    ]
})

export const ReviewListState = atom({
    key:'reviewListState',
    default:[
        {
            userId: 4,
            mentorId: 4,
            menteeId: 6,
            reviewTitle: '우리집에 생겨버린 영화관!',
            nickname: "nickname!",
            before: testImg,
            after: testImg,
            rating: 0,
            date: '2024.00.00',
            reviewContent:'멘토님 덕분에 완전 쉽게 홈시어터 구축했습니당 최고에요. 특히 홈시어터 구축할때 예산때문에 망설이는 경우가 많은데 예산에 맞는 프로젝 최대 세줄까지만나오고 나머지는 더보기 페이지!',
            satisfaction: 3,
            period: "6개월",
            budget: "100만원"
        },
        {
            mentorId: 1,
            menteeId: 3,
            reviewTitle: '우리집에 생겨버린 영화관!',
            nickname: "nickname!",
            before: testImg,
            after: testImg,
            rating: 0,
            date: '2024.00.00',
            reviewContent:'멘토님 덕분에 완전 쉽게 홈시어터 구축했습니당 최고에요. 특히 홈시어터 구축할때 예산때문에 망설이는 경우가 많은데 예산에 맞는 프로젝 최대 세줄까지만나오고 나머지는 더보기 페이지!',
            satisfaction: 3,
            period: "6개월",
            budget: "100만원"
        },
        {
            mentorId: 1,
            menteeId: 3,
            reviewTitle: '우리집에 생겨버린 영화관!',
            nickname: "nickname!",
            before: testImg,
            after: testImg,
            rating: 0,
            date: '2024.00.00',
            reviewContent:'멘토님 덕분에 완전 쉽게 홈시어터 구축했습니당 최고에요. 특히 홈시어터 구축할때 예산때문에 망설이는 경우가 많은데 예산에 맞는 프로젝 최대 세줄까지만나오고 나머지는 더보기 페이지!',
            satisfaction: 4,
            period: "6개월",
            budget: "100만원"
        },
        {
            mentorId: 1,
            menteeId: 3,
            reviewTitle: '우리집에 생겨버린 영화관!',
            nickname: "nickname!",
            before: testImg,
            after: testImg,
            rating: 0,
            date: '2024.00.00',
            reviewContent:'멘토님 덕분에 완전 쉽게 홈시어터 구축했습니당 최고에요. 특히 홈시어터 구축할때 예산때문에 망설이는 경우가 많은데 예산에 맞는 프로젝 최대 세줄까지만나오고 나머지는 더보기 페이지!',
            satisfaction: 3,
            period: "6개월",
            budget: "100만원"
        },
        {
            mentorId: 1,
            menteeId: 3,
            reviewTitle: '우리집에 생겨버린 영화관!',
            nickname: "nickname!",
            before: testImg,
            after: testImg,
            date: '2024.00.00',
            reviewContent:'멘토님 덕분에 완전 쉽게 홈시어터 구축했습니당 최고에요. 특히 홈시어터 구축할때 예산때문에 망설이는 경우가 많은데 예산에 맞는 프로젝 최대 세줄까지만나오고 나머지는 더보기 페이지!',
            satisfaction: 4,
            period: "6개월",
            budget: "100만원"
        },
        
    ]
})

export const crntClickedReviewState = atom({
    key: 'crntClickedReviewState',
    default: {
    }
})
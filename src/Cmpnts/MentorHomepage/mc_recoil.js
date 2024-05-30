import { atom } from 'recoil'

export const introState = atom({
    key: 'introState',
    default: '영화보는걸 좋아하는 5년차 작곡가입니다뭐 사용자의 자유에 의해 내용은 더 길어질수도있습니다 제가 더이상 쓸만한 내용이 없어서 지금 이렇게 쓰고있는데 최대 세줄정도가 적당하겠네요'
})

export const probableTimeState = atom({
    key: 'probableTimeState',
    default: '연락가능 시간 : 월,화: 오후 6시이후/그외: 언제나 가능'
})

export const prosState = atom({
    key: 'prosState',
    default: '시중에 나온 프로젝터는 다써봤다고 생각합니다 예상 예산과 방환경에 맞춰서 적절한 홈시어터환경을 조성해드리는데 강점이있다고 생각합니다 음악일을 하는만큼 사운드역시 충분한 지식을 갖고있으며 최적의 사운드 환경도 추가로 조성해드릴수있습니다'
})

export const beforeRoadmapState = atom({
    key: 'beforeRoadmapState',
    default: '필요한 정보를 수집합니다. 예를 들면 평수, 현재 방구조, 희망 스타일, 희망 예산 정도 멘토링 시간을 조정합니다. '
})

export const whileRoadmapState = atom({
    key: 'whileRoadmapState',
    default: '버려야 할 가구와 남겨둘 가구를 선정합니다. 3D 인테리어 프로그램을 통한 가구배치를 해보고 예상기간 등 세부사항을 정합니다.최종 디자인을 선정합니다. 홈스타일링 중 질문사항을 답변하는 시간을 가집니다'
})

export const afterRoadmapState = atom({
    key: 'afterRoadmapState',
    default: '변경된 최종 방 사진을 가지고 최종 피드백을 주고 받으며 멘토링은 끝이납니다.'
})

export const q1State = atom({
    key: 'q1State',
    default: '질문 내용을 입력해주세요'
})

export const a1State = atom({
    key: 'a1State',
    default: '답변 내용을 입력해 주세요.'
})

export const q2State = atom({
    key: 'q2State',
    default: '질문 내용을 입력해주세요'
})

export const a2State = atom({
    key: 'a2State',
    default: '답변 내용을 입력해 주세요.'
})

export const q3State = atom({
    key: 'q3State',
    default: '질문 내용을 입력해주세요'
})

export const a3State = atom({
    key: 'a3State',
    default: '답변 내용을 입력해 주세요.'
})

export const q4State = atom({
    key: 'q4State',
    default: '질문 내용을 입력해주세요'
})

export const a4State = atom({
    key: 'a4State',
    default: '답변 내용을 입력해 주세요.'
})

export const isIntroEditClickedState = atom({
    key: 'isIntorEditClickedState',
    default: false
})

export const isRoadmapEditClickedState = atom({
    key: 'isRoadmapEditClickedState',
    default: false
})

export const isQAEditClickedState = atom({
    key: 'isQAEditClickedState',
    default: false
})

export const isStrengthEditClickedState = atom({
    key: 'isStrengthEditClickedState',
    default: false
})
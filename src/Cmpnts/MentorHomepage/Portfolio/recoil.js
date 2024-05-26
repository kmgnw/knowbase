import { atom } from 'recoil'
import testImg from '../../../assets/testImg.png'
import postImg from '../../../assets/postImg.png'
import stylingImg from '../../../assets/stylingImg.png'

export const portfolioState = atom({
    key: 'portfolioState',
    default: [{
        "portfolioId": 1,
        "portfolioImagePath": postImg,
        "updatedAt": "2024-05-26T14:52:30.620722"
    },
    {
        "portfolioId": 2,
        "portfolioImagePath": postImg,
        "updatedAt": "2024-05-26T14:52:30.620722"
    },
    {
        "portfolioId": 3,
        "portfolioImagePath": postImg,
        "updatedAt": "2024-05-26T14:52:30.620722"
    }
]
})

export const stylingsState = atom({
    key: 'stylingState',
    default: [
        {
            "homestylingId": 1,
            "homestylingTitle": "타이틀1",
            "homestylingImagePath": stylingImg,
            "homestylingDescription": "설명1",
            "updatedAt": null
        },
        {
            "homestylingId": 2,
            "homestylingTitle": "타이틀2",
            "homestylingImagePath": stylingImg,
            "homestylingDescription": "설명2",  
            "updatedAt": null
        },
        {
            "homestylingId": 3,
            "homestylingTitle": "타이틀3",
            "homestylingImagePath": stylingImg,
            "homestylingDescription": "설명3",
            "updatedAt": null
        },
        {
            "homestylingId": 4,
            "homestylingTitle": "타이틀4",
            "homestylingImagePath": stylingImg,
            "homestylingDescription": "설명4",
            "updatedAt": null
        },
    ]
})

export const isMorePortfolioClickedState = atom({
    key: 'isMorePortfoloiClickedState',
    default: false
})

export const isMoreStylingClickedState = atom({
    key: 'isMoreStylingiClickedState',
    default: false
})

export const isPortfolioEditClickedState = atom({
    key: 'isPortfolioEditClickedState',
    default: false
})

export const isStylingEditClickedState = atom({
    key: 'isStylingEditClickedState',
    default: false
})

export const portfoilioEditInputState = atom ({
    key: 'portfoilioEditInputState',
    default: {
        title: '',
        imgs: '',
        content: ''
    }
})

export const stylingEditInputState = atom ({
    key: 'stylingEditInputState',
    default: {
        title: '',
        img: '',
        content: ''
    }
})
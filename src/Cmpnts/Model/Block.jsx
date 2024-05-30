import testImg from '../../assets/testImg.png'
import '../../Styles/Block.css'

export default function Block({profileImgPath, mentoringPath, name, score, count, content, tag1, tag2, tag3}){


    return(
        <div className="mentoring-block-wrap">
            <div className="mentoring-block-image">
                <img src={mentoringPath}/>
            </div>
            <div>
                <div className='mentoring-block-profile-wrap'>
                    <div className='mentoring-block-profile-img'>
                        <img src={profileImgPath}/>
                    </div>
                    <span className='mentoring-block-name'>{name}</span>
                    </div>
                    {/* 별 아이콘 삽입 필요 */}
                {/* <div>
                    <span>{score} </span>
                    <span>({count})</span>
                </div> */}
            </div>
            <div className='mentoring-block-content'>{content}</div>
            {/* <div className='tags'> */}
                {/* <div className='tag'>{tag1}</div>
                <div className='tag'>{tag2}</div>
                <div className='tag'>{tag3}</div> */}
            {/* </div> */}
        </div>
    )
}
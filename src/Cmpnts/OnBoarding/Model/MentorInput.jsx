import './MentorInput.css'

function MentorInput({title, height= '7rem', value, inputChange, isEdit}){

    return(
        <div className="mi_input-wrap">
            <div className="mtt_title">{title}</div>
            <div className={isEdit ? 'mi_textarea_edit' : 'mi_textarea'} style={{minHeight: height}}>
                <textarea placeholder={value === null ? '입력해 주세요.': value} value={value} onChange={(e)=>inputChange(e.target.value)} readOnly={isEdit ? false : true}/>
            </div>
        </div>
    )
}

export default MentorInput;
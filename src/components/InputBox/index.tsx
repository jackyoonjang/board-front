import React, { ChangeEvent, KeyboardEvent, forwardRef } from 'react'
import './style.css'

// interface : Properties
interface Props {
    label: string;
    type: 'text' | 'password';
    placeholder: string;
    value: string;
    onChange: (event : ChangeEvent<HTMLInputElement>) => void;
    error:boolean;

    // ?: 선택요소
    icon?: 'eye-light-on-icon' | 'eye-light-off-icon' | 'expand-right-light-icon'; 
    onButtonClick? : () => void; // 만들어서 전달한다.

    message? : string;

    onKeyDown? : (event: KeyboardEvent<HTMLInputElement>) => void; 

}

// component . ref -> 다음 버튼으로 이동여부
const InputBox = forwardRef<HTMLInputElement, Props>((props: Props, ref) => {

    // state: properties
    const {label,type, placeholder, value, error, icon, message} = props;
    const {onChange, onButtonClick, onKeyDown} = props;

    // event Handler : input 키 이벤트 처리 함수 
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if(!onKeyDown) return;
        onKeyDown(event);
    };

    // render
    return (
        <div className='inputbox'>
            <div className='inputbox-label'>{label}</div>
            <div className={error ? 'inputbox-container-error':'inputbox-container'}>
                <input ref={ref} className='input' type={type} placeholder={placeholder} value={value} onChange={onChange} onKeyDown={onKeyDownHandler}/>
                {onButtonClick !== undefined && 
                    <div className='icon-button' onClick={onButtonClick}>
                        {icon !== undefined && <div className={`icon ${icon}`}></div>}
                    </div>
                }
            </div>
            {message !== undefined && <div className='inputbox-message'>{message}</div>}
        </div>
    )
})

export default InputBox;
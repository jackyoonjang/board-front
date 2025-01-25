import React from 'react'
import './style.css'


// component 풋터 레이아웃
export default function Footer() {

    // event Handler : 깃허브 아이콘 버튼 클릭 이벤트 처리
    const onGithubIconButtonClickHandler = () => {
        window.open('https://github.com/jackyoonjang?tab=repositories');
    }

    // event Handler : 티스토리 블로그 버튼 클릭 이벤트 처리
    const onTstoryIconButtonClickHandler = () => {
        window.open('https://backendjack.tistory.com');
    }


    //render
    return (
        <div id='footer'>
            <div className='footer-container'>
                <div className='footer-top'>
                    <div className='footer-logo-box'>
                        <div className='icon-box'>
                            <div className='icon logo-light-icon'></div>
                        </div>
                        <div className='footer-logo-text'>{'JangGeol\'s board'}</div>
                    </div>
                    <div className='footer-link-box'>
                        <div className='footer-email-link'>{'skan9672@email.com'}</div>
                        <div className='icon-button' onClick={onGithubIconButtonClickHandler}>
                            <div className='icon github-icon'></div>
                        </div>
                        <div className='icon-button' onClick={onTstoryIconButtonClickHandler}>
                            <div className='icon tstory-icon'></div>
                        </div>
                    </div>
                </div>
                <div className='footer-bottom'>
                    <div className='footer-copyright'>{'Welcome To My Portfolio Website!! I\'ve Been Waiting You!! ⓒ 2025 Janggeol Build this things.'}</div>
                </div>
            </div>
        </div>
    )
}

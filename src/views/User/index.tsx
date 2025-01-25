import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import './style.css'
import defaultProfileImage from 'assets/image/default-profile-image.png';
import { useNavigate, useParams } from 'react-router-dom';
import { BoardListItem } from 'types/interface';
import { latestBoardListMock } from 'mocks';
import BoardItem from '../../components/BoardItem/index';
import { BOARD_PATH, BOARD_WRITE_PATH, MAIN_PATH, USER_PATH } from 'constant';
import { useLoginUserStore } from 'stores';
import { fileUploadRequest, getUserBoardListRequest, getUserRequest, patchNicknameRequest } from 'apis';
import { GetUserResponseDto, PatchNicknameResponseDto, PatchProfileImageResponseDto } from 'apis/response/user';
import { ResponseDto } from 'apis/response';
import { patchProfileImageRequest } from '../../apis/index';
import { PatchNicknameRequestDto, PatchProfileImageRequestDto } from 'apis/request/user';
import { useCookies } from 'react-cookie';
import { usePagination } from 'hooks';
import { GetUserBoardListResponseDto } from 'apis/response/board';
import Pagination from 'components/Pagination';


// component: 유저 화면 
export default function User() {
  
  // state : 유저 이메일
  const { userEmail } = useParams();
  // state : 로그인 유저
  const { loginUser } = useLoginUserStore();
  // state : 쿠키 상태
  const [ cookies, setCookie ] = useCookies();
  // state : 마이페이지 상태 여부
  const [isMyPage, setMyPage] = useState<boolean>(true);

  // function : 네비게이트 함수
  const navigate = useNavigate();

  // component : 유저 화면 상단 컴포넌트
  const UserTop = () => {
    
    // state : 이미지 파일 인풋 
    const imageInputRef = useRef<HTMLInputElement | null>(null);
    // state : 닉네임 변경 상태 여부
    const [isNicknamgeChange, setNicknameChange] = useState<boolean>(false);
    // state : 닉네임 상태 여부
    const [nickname, setNickname] = useState<string>('');
    // state : 변경한 닉네임 상태 여부
    const [changeNickname, setChangeNickname] = useState<string>('');
    // state : 프로필 이미지 상태 여부
    const [profileImage, setProfileImage] = useState<string | null>(null);

    // function : get user response 처리 함수
    const getUserResponse = (responseBody: GetUserResponseDto | ResponseDto | null) => {
      if(!responseBody) return;
      const { code } = responseBody;
      if(code === 'NU') alert('존재하지 않는 유저입니다.');
      if(code === 'DBE') alert('데이터베이스 오류입니다.');
      if(code !== 'SU'){
        navigate(MAIN_PATH());
        return;
      } 

      const { email, nickname, profileImage } = responseBody as GetUserResponseDto;
      setNickname(nickname);
      setProfileImage(profileImage);
      const isMyPage = email === loginUser?.email;
      setMyPage(isMyPage);
    }

    // function : file upload response 처리 함수
    const fileUploadResponse = (profileImage:string | null) => {
      if(!profileImage) return;
      if(!cookies.accessToken) return;
      const requestBody: PatchProfileImageRequestDto = { profileImage };
      patchProfileImageRequest(requestBody, cookies.accessToken).then(patchProfileImageResponse);
      
    }

    // function : patch profile image response 처리 함수
    const patchProfileImageResponse = (responseBody: PatchProfileImageResponseDto | ResponseDto | null) => {
      if(!responseBody) return;
      const { code } = responseBody;
      if(code === 'AF') alert('인증에 실패했습니다.');
      if(code === 'NU') alert('존재하지 않는 유저입니다.');
      if(code === 'DBE') alert('데이터베이스 오류입니다.');
      if(code !== 'SU') return;

      if(!userEmail) return;
      getUserRequest(userEmail).then(getUserResponse);
    }

    // function : patch nickname response 처리 함수
    const patchNicknameResponse = (responseBody: PatchNicknameResponseDto | ResponseDto | null) => {
      if(!responseBody) return;
      const { code } = responseBody;
      if(code === 'VF') alert('닉네임은 필수 입니다.');
      if(code === 'AF') alert('인증에 실패했습니다.');
      if(code === 'DN') alert('중복되는 닉네임입니다.');
      if(code === 'NU') alert('존재하지 않는 유저입니다.');
      if(code === 'DBE') alert('데이터베이스 오류입니다.');
      if(code !== 'SU') return;

      if(!userEmail) return;
      getUserRequest(userEmail).then(getUserResponse);
      setNicknameChange(false);
    }
    
    // event handler : profile box click
    const onProfileBoxClickHandler = () => {
      if(!isMyPage) return;
      if(!imageInputRef.current) return;
      imageInputRef.current.click();
    }
    // event handler : nickname edit button click
    const onNicknameEditButtonClickHandler = () => {
      if(!isNicknamgeChange){
        setChangeNickname(nickname);
        setNicknameChange(!isNicknamgeChange);
        return;
      }
      
      if(!cookies.accessToken) return;
      const requestBody : PatchNicknameRequestDto = {
        nickname : changeNickname
      };
      patchNicknameRequest(requestBody, cookies.accessToken).then(patchNicknameResponse);
    }

    // event handler : 프로필 이미지 변경 처리
    const onProfileImageChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      if(!event.target.files || event.target.files.length === 0) return;
      const file = event.target.files[0];
      const data = new FormData();
      data.append('file',file);

      fileUploadRequest(data).then(fileUploadResponse);
    }

    // event handler : 닉네임 변경 처리
    const onNicknameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const {value} = event.target;
      setChangeNickname(value);
    }
    
    // effect : user email path variable 감시 함수
    useEffect(() => {
      if(!userEmail) return;
      getUserRequest(userEmail).then(getUserResponse);

    },[userEmail]);

    // render : 유저 화면 상단 컴포넌트
    return (
      <div id='user-top-wrapper'>
        <div className='user-top-container'>
          {isMyPage ?
          <div className='user-top-my-profile-image-box' onClick={onProfileBoxClickHandler}>
            {profileImage !== null ?
              <div className='user-top-profile-image' style={{backgroundImage : `url(${profileImage})`}}></div> :
              <div className='icon-box-large'>
                <div className='icon image-box-white-icon'></div>
              </div>
            }
            <input ref={imageInputRef} type="file" accept='image/*' style={{display:'none'}} onChange={onProfileImageChangeHandler}/>
          </div>  :
          <div className='user-top-profile-image-box' style={{backgroundImage : `url(${profileImage ? profileImage : defaultProfileImage })`}}></div> 
          }
          <div className='user-top-info-box'>
            <div className='user-top-info-nickname-box'>
              {isMyPage ? 
                <>
                  {isNicknamgeChange ?
                    <input className='user-top-info-nickname-input' type="text" size={changeNickname.length + 2} value={changeNickname} onChange={onNicknameChangeHandler}/> :
                    <div className='user-top-info-nickname'>{nickname}</div>
                  }
                  <div className='icon-button' onClick={onNicknameEditButtonClickHandler}>
                    <div className='icon edit-icon'></div>
                  </div>
                </> :
                <div className='user-top-info-nickname'>{nickname}</div>
              }
            </div>
            <div className='user-top-info-email'>{userEmail}</div>
          </div>
        </div>
      </div>
    );
  };

  // component : 유저 화면 하단 컴포넌트
  const UserBottom = () => {


    // state : 페이지네이션 관련 상태
    const {
      currentPage, currentSection, viewList, viewPageList, totalSection,
      setCurrentPage, setCurrentSection, setTotalList
    } = usePagination<BoardListItem>(5);
    // state : 게시물 개수 상태
    const [count, setCount] = useState<number>(2)

    // function : get user board list response 처리 함수
    const getUserBoardListResponse = (responseBody: GetUserBoardListResponseDto | ResponseDto | null) => {
      if(!responseBody) return;
      const { code } = responseBody;
      if(code === 'NU') {
        alert('존재하지 않는 유저입니다.')
        navigate(MAIN_PATH());
        return;
      };
      if(code === 'DBE') alert('데이터베이스 오류입니다.');
      if(code !== 'SU') return;

      const { userBoardList } = responseBody as GetUserBoardListResponseDto;
      setTotalList(userBoardList);
      setCount(userBoardList.length);
    }

    // event handler : 사이드 카드 클릭 이벤트 처리
    const onSideCardClickHandler = () => {
      if(isMyPage) navigate(BOARD_PATH() + '/' + BOARD_WRITE_PATH());
      else if(loginUser) navigate(USER_PATH(loginUser.email));
    }

    // effect : userEmail path variable 감시 함수
    useEffect(() => {
      if(!userEmail) return;
      getUserBoardListRequest(userEmail).then(getUserBoardListResponse);
    },[userEmail]);

    // render : 유저 화면 하단 컴포넌트
    return (
      <div id='user-bottom-wrapper'>
        <div className='user-bottom-container'>
          <div className='user-bottom-title'>{isMyPage ? '내 게시물 ' : '게시물 '}<span className='emphasis'>{count}</span></div>
          <div className='user-bottom-contents-box'>
            {count === 0 ? 
              <div className='user-bottom-contents-nothing'>{'게시물이 없습니다.'}</div> : 
              <div className='user-bottom-contents'>
                {viewList.map(boardListItem => <BoardItem boardListItem={boardListItem} />)}
              </div>
            }
            <div className='user-bottom-side-box'>
              <div className='user-bottom-side-card' onClick={onSideCardClickHandler}>
                <div className='user-bottom-side-container'>
                  {isMyPage ? 
                    <>
                      <div className='icon-box'>
                        <div className='icon edit-icon'></div>
                      </div>
                      <div className='user-bottom-side-text'>{'글쓰기'}</div>
                    </> :
                    <>
                      <div className='user-bottom-side-text'>{'내 게시물로 가기'}</div>
                      <div className='icon-box'>
                        <div className='icon arrow-right-icon'></div>
                      </div>
                    </>
                  }
                </div>
              </div>
            </div>
          </div>
          <div className='user-bottom-pagination-box'>
            {count !== 0 && 
              <Pagination 
                currentPage={currentPage}
                currentSection={currentSection}
                setCurrentPage={setCurrentPage}
                setCurrentSection={setCurrentSection}
                viewPageList={viewPageList}
                totalSection={totalSection}  
              /> 
            }
          </div>
        </div>
      </div>
    )
  };

  // render
  return (
    <>
      <UserTop/>
      <UserBottom/>
    </>
  )
}

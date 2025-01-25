import React, { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react'
import './style.css'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { MAIN_PATH, SEARCH_PATH, USER_PATH, AUTH_PATH, BOARD_DETAIL_PATH, BOARD_WRITE_PATH, BOARD_UPDATE_PATH, BOARD_PATH } from 'constant';
import { useCookies } from 'react-cookie';
import { useBoardStore, useLoginUserStore } from 'stores';
import { fileUploadRequest, patchBoardRequest, postBoardRequest } from 'apis';
import { PatchBoardRequestDto, PostBoardRequestDto } from 'apis/request/board';
import PostBoardResponseDto from '../../apis/response/board/post-board.response.dto';
import { ResponseDto } from 'apis/response';
import { PatchBoardResponseDto } from 'apis/response/board';


// component : 헤더 레이아웃
export default function Header() {

    // state : 로그인 유저 상태
    const {loginUser, setLoginUser, resetloginUser} = useLoginUserStore();
    // state : path 상태
    const { pathname } = useLocation(); 
    // state : cookie 상태
    const [cookies, setCookies] = useCookies();
    // state : 로그인 상태
    const [isLogin, setLogin] = useState<boolean>(false);
    
    // state : 인증 페이지 상태 
    const [isAuthPage, setAuthPage] = useState<boolean>(false);
    // state : 메인 페이지 상태 
    const [isMainPage, setMainPage] = useState<boolean>(false);
    // state : 검색 페이지 상태 
    const [isSearchPage, setSearchPage] = useState<boolean>(false);
    // state : 게시물 상세 페이지 상태 
    const [isBoardDetailPage, setBoardDetailPage] = useState<boolean>(false);
    // state : 게시물 작성 페이지 상태 
    const [isBoardWritePage, setBoardWritePage] = useState<boolean>(false);
    // state : 게시물 수정 페이지 상태 
    const [isBoardUpdatePage, setBoardUpdatePage] = useState<boolean>(false);
    // state : 유저 페이지 상태 
    const [isUserPage, setUserPage] = useState<boolean>(false);

    
    // function : 네비게이트 함수
    const navigate = useNavigate();

    // event Handler : 로고 클릭 이벤트 처리 함수
    const onLogoClickHandler = () => {
        navigate(MAIN_PATH());
    }

    // component : 검색 버튼 컴포넌트 
    const SearchButton = () => {

        //state : 검색 버튼 요소 참조 상태
        const searchButtonRef = useRef<HTMLDivElement | null>(null)
        // state : 검색 버튼 상태
        const [status, setStatus] = useState<boolean>(false);
        // state : 검색어 상태
        const [word, setWord] = useState<string>('');
        // state : 검색어 path variable 상태 // App.tsx에서 SEARCH_PATH(':searchWord')를 똑같이 사용해야 한다.
        const {searchWord} = useParams();

        
        // event handler : 검색어 변경 이벤트 처리 함수
        const onwordChangeHandler = (event: ChangeEvent<HTMLInputElement>) =>{
            const value = event.target.value;
            setWord(value);
        };
        
        // event handler : 검색어 키 이벤트 처리 함수
        const onwordKeyDownHandler = (event:KeyboardEvent<HTMLInputElement>) => {
            // 키보드에서 누른 버튼이 enter일 경우만 실행
            if(event.key !== 'Enter') return;
            // 연재 위치가 searchButtonRef함수가 불러온 div이고 해당 요소가 생성되어 있을 경우에만 실행
            if(!searchButtonRef.current) return;
            // searchButtonRef요소를 실행시킨다.
            searchButtonRef.current.click();
        };

        // event handler : 검색 버튼 클릭 이벤트 처리 함수
        const onSearchButtonClickHandler = () => {
            if(!status) {
                setStatus(!status);
                return;
            }
            navigate(SEARCH_PATH(word));
        };
        
        // effect : 검색어 path variable 변경 될때마다 실행될 함수
        useEffect(() => {
            // 검색어가 있다면 입력창에 검색어를 유지시키는 함수
            if(searchWord){
                setWord(searchWord);
                //true로 설정해야 검색창이 활성화 된 상태로 기존 검색어가 보인다.
                setStatus(true);
            }
            
        },[searchWord]);

        
        if(!status)
        // render 검색 버튼 클릭 false 상태
        return (
            <div className='icon-button' onClick={onSearchButtonClickHandler}>
                <div className='icon search-light-icon'></div>
            </div>
        );
        // render 검색 버튼 클릭 true 상태
        return (
            <div className='header-search-input-box'>
                <input className='header-search-input' type="text" placeholder='검색어를 입력해주세요.' value={word} onChange={onwordChangeHandler} onKeyDown={onwordKeyDownHandler}/>
                <div ref={searchButtonRef} className='icon-button' onClick={onSearchButtonClickHandler}>
                    <div className='icon search-light-icon'></div> 
                </div>
            </div>
        );
    };

    // component : 마이페이지 버튼 컴포넌트
    const MyPageButton = () =>{

        // state : userEmail path variable 상태
        const { userEmail } = useParams();


        // event handler : 마이페이지 버튼 클릭 이벤트 처리 함수
        const onMyPageButtonClickHandler = () =>{
            if(!loginUser) return;
            const {email} = loginUser;
            navigate(USER_PATH(email));
        };
        // event handler : 로그아웃 버튼 클릭 이벤트 처리 함수
        const onSignOutButtonClickHandler = () =>{
            resetloginUser();
            setCookies('accessToken', '', {path : MAIN_PATH(), expires:new Date()})
            navigate(MAIN_PATH());
        };
        // event handler : 로그인 버튼 클릭 이벤트 처리 함수
        const onSignInButtonClickHandler = () =>{
            navigate(AUTH_PATH());
        };

        // render : 로그아웃 버튼
        if(isLogin && userEmail === loginUser?.email) 
        return <div className='white-button' onClick={onSignOutButtonClickHandler}>{'로그아웃'}</div>
        if(isLogin)
        // render : 마이페이지 버튼 
        return <div className='white-button' onClick={onMyPageButtonClickHandler}>{'마이페이지'}</div>
        // render : 로그인 버튼 
        return <div className='black-button' onClick={onSignInButtonClickHandler}>{'로그인'}</div>
    };
    
    // component : 업로드 버튼 컴포넌트
    const UploadButton = () => {

        // state : 게시물 번호 path variale 상태
        const { boardNumber } = useParams();
        // state : 게시물 상태 
        const {title, content, boardImageFileList, resetBoard} = useBoardStore();

        // function : post board response 처리 함수
        const postBoardResponse = (responseBody : PostBoardResponseDto | ResponseDto | null) => {
            if(!responseBody) return ;
            const { code } = responseBody;
            if(code === 'AF' || code === 'NU') navigate(AUTH_PATH());
            if(code === 'VF') alert('제목과 내용은 필수입니다.');
            if(code !== 'SU') return;

            resetBoard();
            if(!loginUser) return;
            const { email } = loginUser;
            navigate(USER_PATH(email));
        }

        // function : patch board response 처리 함수
        const patchBoardResponse = (responseBody: PatchBoardResponseDto | ResponseDto | null) => {
            if(!responseBody) return ;
            const { code } = responseBody;
            if(code === 'DBE') alert('데이터베이스 오류입니다.')
            if(code === 'AF' || code === 'NU' || code === 'NB' || code === 'NP') navigate(AUTH_PATH());
            if(code === 'VF') alert('제목과 내용은 필수입니다.');
            if(code !== 'SU') return;

            if(!boardNumber) return;
            navigate(BOARD_PATH() + '/' + BOARD_DETAIL_PATH(boardNumber));
        }

        // event handler : 업로드 버튼 클릭 처리 함수
        const onUploadButtonClickHandler = async () =>{
            const accessToken = cookies.accessToken;
            if(!accessToken) return;


            const boardImageList: string[] = [];
            
            // 파일 업로드 결과인 URL을 하나씩 추가한다.
            for(const file of boardImageFileList) {
                const data = new FormData();
                data.append('file',file);
                
                const url = await fileUploadRequest(data);
                if(url) boardImageList.push(url);
            }

            const isWriterPage = pathname === BOARD_PATH() + '/' + BOARD_WRITE_PATH();
            if(isWriterPage){
                const requestBody: PostBoardRequestDto = {
                    title, content, boardImageList
                }
                postBoardRequest(requestBody, accessToken).then(postBoardResponse);
            } else {
                if(!boardNumber) return;
                const requestBody : PatchBoardRequestDto = {
                    title, content, boardImageList
                }
                patchBoardRequest(boardNumber, requestBody, accessToken).then(patchBoardResponse);
            }
        }

        // render : 업로드 버튼 
        if(title && content)
        return <div className='black-button' onClick={onUploadButtonClickHandler}>{'업로드'}</div>
        // render : 업로드 불가 버튼 
        return <div className='disable-button'>{'업로드'}</div>
        
    }

    // effect : path 감시 함수
    useEffect(() => {
        const isAuthPage = pathname.startsWith(AUTH_PATH());
        setAuthPage(isAuthPage);
        const isMainPage = pathname === MAIN_PATH();
        setMainPage(isMainPage);
        const isSearchPage = pathname.startsWith(SEARCH_PATH(''));
        setSearchPage(isSearchPage);
        const isBoardDetailPage = pathname.startsWith(BOARD_PATH() + '/' + BOARD_DETAIL_PATH(''));
        setBoardDetailPage(isBoardDetailPage);
        const isBoardWritePage = pathname.startsWith(BOARD_PATH() + '/' +BOARD_WRITE_PATH());
        setBoardWritePage(isBoardWritePage);
        const isBoardUpdatePage = pathname.startsWith(BOARD_PATH() + '/' +BOARD_UPDATE_PATH(''));
        setBoardUpdatePage(isBoardUpdatePage);
        const isUserPage = pathname.startsWith(USER_PATH(''));
        setUserPage(isUserPage);
    },[pathname])

    // effect : login user 감시 함수
    useEffect(() => {
        setLogin(loginUser !== null);
    }, [loginUser])

    //render
    return (
        <div id='header'>
            <div className='header-container'>
                <div className='header-left-box' onClick={onLogoClickHandler}>
                    <div className='icon-box'>
                        <div className='icon logo-dark-icon'></div>
                    </div>
                    <div className='header-logo'>{'JangGeol\'s Board'}</div>
                </div>
                <div className='header-right-box'>
                    {(isAuthPage || isMainPage || isSearchPage || isBoardDetailPage) && <SearchButton/>}
                    {(isMainPage || isSearchPage || isBoardDetailPage || isUserPage) && <MyPageButton/>}
                    {(isBoardWritePage || isBoardUpdatePage) && <UploadButton/>}
                </div>
            </div>
            
        </div>
    )
}
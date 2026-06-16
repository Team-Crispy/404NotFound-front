import { Fragment, useEffect, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';

import laptopLockScreen from '../../assets/노트북잠금화면.svg';
import Timer from '../../components/game/Timer';

const posts = [
  {
    id: 1,
    title: '[일상] 눈 감았다 뜨니 새해야',
    corruptTitle: '[4상] 처?으로 ??????하기~',
    date: '2026.05.12',
    image: 'post1',
    detailImages: ['/blog-assets/blog1-body.png'],
    detailImageSlots: [2],
    excerpt:
      '갑자기 바다가 보고 싶어서 혼자 서해 다녀왔다 ~_~ 생각보다 안 추워서 바다 보면서 한참 멍 때리고 왔음,, 파도 소리 듣고 있으니까 괜히 기분 차분해지고 좋더라',
    body: [
      '내가 벌써 고삼이라는 게 진짜 1도 안 믿긴다 ( º﹏º｡ )',
      '그래도 올해는 진짜 정신 차리고 열심히 공부해서 꼭 원하는 대학 가야지 !!',
      '라고 거창하게 결심해놓고',
      '역시 새해 첫날엔 떡국 야무지게 먹고 푸데데 자는게 국룰이지..',
      '하루 종일 이불 속에서 굴러다니는 중 ㅋㅋㅋ 원래 고3은 체력 보충 해야돼',
      '그나저나 이틀 뒤에 민후오빠 만나기로 했는데 뭐 입고 나가지... ㅎㅎ??',
      '날씨 추운데 옷장에 입을 옷이 왜 이렇게 없는지 모르겠다 ᐡ⸝⸝⸝⸝ᐡ💦',
      '생각해 보니까 우리가 벌써 일년 넘게 사귀었다는게 신기해',
      '그동안 투닥거리기도 많이 했지만 앞으로도 오래오래 예쁘게 잘 사귀고 싶어 ( ♡‧̫♡ )',
      '내 로망은 오빠랑 같은 대학 가서 CC도 하고 수능 끝나면 같이 해외여행도 가는건데 //',
      '내 로망 다 이룰 수 있게 올해 딱 집중해서 열공해야지.',
      '고삼 파이팅 🔥',
    ],
    corruptBody: [
      '갑자기 바다가 보고 싶어서 혼자 서해 다녀왔다 --',
      '생각보다 ??추웠고 바다를 보는데 같은 장면이 계속 반복됐다. 파도 소리는 분명 들리는데 어딘가 끊겨 있었다.',
      '사진첩에는 찍은 기억 없는 컷이 하나씩 섞여 있었다. 검은 문, 계단, 열린 손잡이. 처음에는 오류라고 생각했는데 스크롤할수록 같은 사진이 반복된다.',
    ],
  },
  {
    id: 2,
    title: '[일상] 봄 날씨가 너무 좋아서 그래',
    corruptTitle: '[???] #즉???이렇게; &!비?',
    date: '2026.05.11',
    image: 'post2',
    detailImages: ['/blog-assets/blog2-body-1.png', '/blog-assets/blog2-body-2.png'],
    detailImageSlots: [1, 4],
    imageCaption: '구름이 쿼카랑 강아지처럼 보이길래 .. ﾍ(=￣∇￣)ﾉ',
    excerpt:
      '일찍 일어나서 혼자 여행 갔다. 갑자기 바다 보고 싶다는 생각 들어서 충동적으로 동네 버스까지 예약해버렸다는 이야기.',
    body: [
      '학교 끝나고 집 가려고 하는데 날이 너무 좋아서 산책 좀 했어 ଘ(੭ˊ꒳ˋ)੭✧ !!',
      '남친이나 친구 없이 혼자 산책 하는건 올만이라 어색했지만 바람도 선선하고 좋아하는 노래 들으면서 걸으니까 나름 이것도 좋더라 .. (˘ᵕ˘)',
      '고삼은 낭만 챙길 시기 아니라고는 하지만 아직 새학기니까 괜찮겠지 (っ •̀ ̫•́ )︎‪‪っ',
      '오늘까지만 놀고 내일부터는 열심히 공부 해야지 !!',
      '그리고 오늘 오빠가 고삼 고생한다구 카페 깊티도 보내줬는데 이런 남친 또 없다 진짜⸝⸝› ‹⸝⸝',
      '친구들이랑 같이 가라고 했는데 나중에 오빠랑 가야지 !!',
      '나중엔 내가 오빠한테 이런 도움이 되고싶어(∩˃ω˂∩)',
    ],
    corruptBody: [
      '예약 내역은 정상인데 도착지가 조금 이상하다. 지도에 없는 정류장 이름이 자꾸 뜨고, 취소 버튼은 눌리지 않는다.',
      '그래도 가야 하는 것 같다. 내가 계속 기다린다고 말했는지, 지도가 나를 기다리는지 모르겠다.',
    ],
  },
  {
    id: 3,
    title: '[일상] 시험공부 파이팅 해야지',
    corruptTitle: '[독서] 해바라기가 피지 않는 ....',
    date: '2026.05.08',
    image: 'post1',
    listImage: '/blog-assets/blog3-body.png',
    detailImages: ['/blog-assets/blog3-body.png'],
    detailImageSlots: [7],
    excerpt:
      '시험기간 시작... 진짜 공부해야지 해야지 하는데 왜 책만 펴면 갑자기 졸린건지. 그래도 이번엔 후회 안 남게 준비해야지.',
    body: [
      '시험기간 시작...',
      '진짜 공부해야지 해야지 하는데 왜 책만 펴면 갑자기 졸린건지( ⚆ ⚆)',
      '분명 책상에 앉은 건 맞는데 정신 차려보면 핸드폰 보고 있어서 민후 오빠랑 카공하려고 만났는데 결국 떠들기만 했네(꜆꜄ `ㆆ⩊ㆆ)꜆꜄꜆',
      '그래도 담날에 만났을 땐 진짜 열심히 한 것 같아서 뿌듯했다',
      '그리고 모르는 문제는 민후 오빠가 설명 해주면서 풀어줘서 이해가 쏙쏙 된 듯',
      '진짜 울 오빠 밖에 없다(⌯˃̶᷄ ﹏ ˂̶᷄⌯)ﾟ',
      '중간중간 간식도 먹으면서 "우리 진짜 열심히 하고 있다" 하고 응원도 해줬어 !!',
      '공부는 힘들지만 끝나고 나면 뿌듯하겠지??',
      '오빠가 시험 결과보다는 준비하는 과정이 중요한거라고 했는데 아직은 잘 모르겠어.. ( º﹏º｡ )',
      '어디에서 후회 안남게 열심히 준비해서 좋은 결과를 만들어내야지 !!',
      '다들 시험 파이팅!!',
    ],
    corruptBody: [
      '요즘 자기 전에 조금씩 읽는 책. 그런데 책갈피가 매일 같은 페이지로 돌아간다.',
      '밑줄 친 검은 문장들이 연결되어 이름을 만들고, 마지막 문장은 아직 쓰이지 않았다.',
    ],
  },
];

const categories = ['전체보기 (3)', '일상 (3)'];

function BlogSidebar({ isCorrupt }) {
  return (
    <aside className="blog-profile">
      <img
        className="profile-image"
        src={`/blog-assets/profile-${isCorrupt ? 'corrupt' : 'normal'}.jpg`}
        alt="jiihyunlog 프로필"
      />
      <h2>jiihyunlog &lt;3</h2>
      <p className="profile-counts">
        게시물 · 27개
        <br />
        팔로워 · 39명
      </p>
      <p className="profile-copy">안녕하세요 박지현의 델로그에 오신것을 환영합니다 ~ 소통해요(❁´▽`❁)</p>
      <div className="profile-actions">
        <button type="button">{isCorrupt ? '???' : '+ 팔로우'}</button>
        <button type="button">{isCorrupt ? '?차단' : '× 차단'}</button>
      </div>

      <section className="blog-categories">
        <h3>카테고리</h3>
        {categories.map((category) => (
          <p key={category}>{category}</p>
        ))}
      </section>

      <section className="recent-images" aria-label="최근 이미지">
        <h3>최근 이미지</h3>
        <div>
          <img src="/blog-assets/post1-normal.jpg" alt="" />
          <img src="/blog-assets/post2-normal.jpg" alt="" />
        </div>
      </section>
    </aside>
  );
}

function BlogList({ isCorrupt }) {
  const navigate = useNavigate();
  const basePath = isCorrupt ? '/blog-corrupt' : '/blog';

  const handleSearch = (event) => {
    event.preventDefault();
    navigate(isCorrupt ? '/blog' : '/blog-corrupt');
  };

  return (
    <section className="blog-feed" aria-label="블로그 글 목록">
      <form className="blog-search" onSubmit={handleSearch}>
        <input placeholder={isCorrupt ? '9생활 ?]??블???&??' : '검색할 글을 입력하세요'} aria-label="블로그 검색" />
        <button type="submit" aria-label="검색" />
      </form>

      <section className="blog-ad" aria-label="광고">
        <img src={`/blog-assets/ad-${isCorrupt ? 'corrupt' : 'normal'}.jpg`} alt="광고 배너" />
      </section>

      {posts.map((post) => (
        <Link className="blog-post-link" to={`${basePath}/${post.id}`} key={post.id}>
          <article className="blog-post">
            <img
              className="post-image"
              src={!isCorrupt && post.listImage ? post.listImage : `/blog-assets/${post.image}-${isCorrupt ? 'corrupt' : 'normal'}.jpg`}
              alt=""
            />
            <div className="post-content">
              <h2>{isCorrupt ? post.corruptTitle : post.title}</h2>
              <time dateTime={post.date.replaceAll('.', '-')}>{post.date}</time>
              <p>{isCorrupt ? post.corruptBody.join(' ') : post.excerpt}</p>
            </div>
          </article>
        </Link>
      ))}
    </section>
  );
}

function BlogDetail({ isCorrupt }) {
  const { postId } = useParams();
  const post = posts.find((item) => item.id === Number(postId));

  if (!post) {
    return <Navigate to={isCorrupt ? '/blog-corrupt' : '/blog'} replace />;
  }

  const body = isCorrupt ? post.corruptBody : post.body;
  const hasInlineImages = !isCorrupt && post.detailImages?.length;
  const fallbackImage = `/blog-assets/${post.image}-${isCorrupt ? 'corrupt' : 'normal'}.jpg`;
  const imageSlots = post.detailImageSlots ?? [];

  const renderMedia = (images, caption) => (
    <figure className="detail-media" key={images.join('|')}>
      {images.map((image) => (
        <img className="detail-image" src={image} alt="" key={image} />
      ))}
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );

  return (
    <article className="blog-detail">
      <Link className="detail-back" to={isCorrupt ? '/blog-corrupt' : '/blog'}>
        &lt; 나가기
      </Link>
      <header className="detail-header">
        <h2>{isCorrupt ? post.corruptTitle : post.title}</h2>
        <time dateTime={post.date.replaceAll('.', '-')}>{post.date}</time>
      </header>

      <div className="detail-divider" />

      {!hasInlineImages ? renderMedia([fallbackImage]) : null}

      <div className="detail-body">
        {body.map((paragraph, index) => (
          <Fragment key={paragraph}>
            <p key={paragraph}>{paragraph}</p>
            {hasInlineImages
              ? post.detailImages.map((image, imageIndex) =>
                  imageSlots[imageIndex] === index + 1
                    ? renderMedia([image], imageIndex === 0 ? post.imageCaption : null)
                    : null,
                )
              : null}
          </Fragment>
        ))}
      </div>
    </article>
  );
}

function BlogPage({ variant }) {
  const isCorrupt = variant === 'corrupt';
  const { postId } = useParams();
  const navigate = useNavigate();
  const [hasOpened, setHasOpened] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      setHasOpened(true);
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    window.setTimeout(() => {
      navigate('/room');
    }, 520);
  };

  const handleUnlock = (event) => {
    event.preventDefault();

    if (password === '1234') {
      setIsUnlocked(true);
      setPasswordError(false);
      return;
    }

    setPassword('');
    setPasswordError(true);
  };

  return (
    <main className={isCorrupt ? 'blog-page corrupt' : 'blog-page'}>
      <img className="blog-room-bg" src="/room-assets/background.png" alt="" />
      <Timer className="blog-background-timer" />
      <section className={`blog-laptop ${!isUnlocked ? 'locked' : ''} ${hasOpened ? 'opening' : ''} ${isClosing ? 'closing' : ''}`} aria-label={isCorrupt ? '깨진 블로그 화면' : '블로그 화면'}>
        <button className="blog-back" type="button" onClick={handleClose} aria-label="그만보기">
          <img src="/blog-assets/close-button.svg" alt="" />
        </button>

        {isUnlocked ? (
          <div className="blog-document">
            <header className="blog-titlebar">
              <h1>jiihyunlog님의 델로그</h1>
              <nav aria-label="블로그 메뉴">
                <span>델로그</span>
                <b />
                <span>메일 보내기</span>
              </nav>
            </header>

            <div className="blog-grid">
              <BlogSidebar isCorrupt={isCorrupt} />
              {postId ? <BlogDetail isCorrupt={isCorrupt} /> : <BlogList isCorrupt={isCorrupt} />}
            </div>
          </div>
        ) : (
          <div className="blog-lock-screen">
            <img className="blog-lock-image" src={laptopLockScreen} alt="" />
            <form className="blog-lock-form" onSubmit={handleUnlock}>
              <label className="blog-lock-label" htmlFor="laptop-password">
                비밀번호
              </label>
              <input
                id="laptop-password"
                className={passwordError ? 'is-error' : ''}
                type="password"
                inputMode="numeric"
                autoComplete="off"
                autoFocus
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setPasswordError(false);
                }}
                aria-invalid={passwordError}
                aria-describedby={passwordError ? 'laptop-password-error' : undefined}
              />
              {passwordError ? (
                <p id="laptop-password-error" className="blog-lock-error">
                  비밀번호가 틀렸습니다
                </p>
              ) : null}
            </form>
          </div>
        )}
      </section>
    </main>
  );
}

export default BlogPage;

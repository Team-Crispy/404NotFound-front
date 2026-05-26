import { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';

import Timer from '../../components/game/Timer';

const posts = [
  {
    id: 1,
    title: '[일상] 처음으로 혼자 서해 여행하기~',
    corruptTitle: '[4상] 처?으로 ??????하기~',
    date: '2026.05.12',
    image: 'post1',
    excerpt:
      '갑자기 바다가 보고 싶어서 혼자 서해 다녀왔다 ~_~ 생각보다 안 추워서 바다 보면서 한참 멍 때리고 왔음,, 파도 소리 듣고 있으니까 괜히 기분 차분해지고 좋더라',
    body: [
      '갑자기 바다가 보고 싶어서 혼자 서해 다녀왔다 ~_~',
      '생각보다 안 추워서 바다 보면서 한참 멍 때리고 왔음,, 파도 소리 듣고 있으니까 괜히 기분 차분해지고 좋더라 ( ´ ▽ ` )',
      '근처 카페 들어가서 따뜻한 라떼 마시고 사진도 엄청 찍었는데 혼자 여행은 뭔가 색다른 느낌이었다. 사실 처음에는 혼자 가는 게 조금 어색했는데, 막상 가보니까 신경 쓰이는 사람도 없고 마음 편했다.',
      '다음에는 하루 더 길게 가보고 싶다는 생각도 들었음!',
    ],
    corruptBody: [
      '갑자기 바다가 보고 싶어서 혼자 서해 다녀왔다 --',
      '생각보다 ??추웠고 바다를 보는데 같은 장면이 계속 반복됐다. 파도 소리는 분명 들리는데 어딘가 끊겨 있었다.',
      '사진첩에는 찍은 기억 없는 컷이 하나씩 섞여 있었다. 검은 문, 계단, 열린 손잡이. 처음에는 오류라고 생각했는데 스크롤할수록 같은 사진이 반복된다.',
    ],
  },
  {
    id: 2,
    title: '[일상] 즉흥적인 버스 여행',
    corruptTitle: '[???] #즉???이렇게; &!비?',
    date: '2026.05.11',
    image: 'post2',
    excerpt:
      '일찍 일어나서 혼자 여행 갔다. 갑자기 바다 보고 싶다는 생각 들어서 충동적으로 동네 버스까지 예약해버렸다는 이야기.',
    body: [
      '일찍 일어나서 혼자 여행 갔다 ( ´ ▽ ` )',
      '갑자기 바다 보고 싶다는 생각이 들어서 충동적으로 동네 버스까지 예약해버렸다. 이제서야 진짜 가는구나 싶었음.',
      '혼자 멀리 가는 건 거의 처음이라 조금 떨리기도 했는데 이상하게 긴장보다 기대가 더 컸다. 가서 바다 보고, 면도 사고, 맛있는 것도 먹고, 사진도 많이 찍고 올 예정!',
    ],
    corruptBody: [
      '예약 내역은 정상인데 도착지가 조금 이상하다. 지도에 없는 정류장 이름이 자꾸 뜨고, 취소 버튼은 눌리지 않는다.',
      '그래도 가야 하는 것 같다. 내가 계속 기다린다고 말했는지, 지도가 나를 기다리는지 모르겠다.',
    ],
  },
  {
    id: 3,
    title: '[독서] 해바라기가 피지 않는 밤',
    corruptTitle: '[독서] 해바라기가 피지 않는 ....',
    date: '2026.05.08',
    image: 'post1',
    excerpt:
      '요즘 자기 전에 조금씩 읽는 책. 제목은 예쁜데 읽을수록 묘하게 서늘해서 자꾸 다음 장을 넘기게 된다.',
    body: [
      '요즘 자기 전에 조금씩 읽는 책. 제목은 예쁜데 읽을수록 묘하게 서늘해서 자꾸 다음 장을 넘기게 된다.',
      '평범한 일상 기록처럼 시작하다가 중간부터 문장들이 삐걱거리는 구성이 좋았다. 마지막까지 다 읽으면 짧게 감상문도 남겨야지.',
    ],
    corruptBody: [
      '요즘 자기 전에 조금씩 읽는 책. 그런데 책갈피가 매일 같은 페이지로 돌아간다.',
      '밑줄 친 검은 문장들이 연결되어 이름을 만들고, 마지막 문장은 아직 쓰이지 않았다.',
    ],
  },
  {
    id: 4,
    title: '[자격증] ITQ 파워포인트 자격증 준비',
    corruptTitle: '[자격증] ITQ 파워포인트????....',
    date: '2026.05.05',
    image: 'post2',
    excerpt:
      '미뤄뒀던 자격증 공부를 다시 시작했다. 처음엔 단축키가 헷갈렸는데 몇 번 반복하니까 손에 익는 중.',
    body: [
      '미뤄뒀던 자격증 공부를 다시 시작했다.',
      '처음엔 단축키가 헷갈렸는데 몇 번 반복하니까 손에 익는 중. 이번 주는 샘플 문제 위주로 연습할 생각!',
    ],
    corruptBody: [
      '미뤄뒀던 자격증 공부를 다시 시작했다. 저장한 파일 이름이 전부 404로 바뀌었다.',
      '열어보면 슬라이드마다 같은 얼굴이 아주 작게 들어가 있다.',
    ],
  },
];

const categories = ['전체보기 (27)', '자기개발 (3)', '나의 취미 베이킹 (6)', '여행을 떠나요 (18)'];

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
              src={`/blog-assets/${post.image}-${isCorrupt ? 'corrupt' : 'normal'}.jpg`}
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

      <img
        className="detail-image"
        src={`/blog-assets/${post.image}-${isCorrupt ? 'corrupt' : 'normal'}.jpg`}
        alt=""
      />

      <div className="detail-body">
        {(isCorrupt ? post.corruptBody : post.body).map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
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

  return (
    <main className={isCorrupt ? 'blog-page corrupt' : 'blog-page'}>
      <img className="blog-room-bg" src="/room-assets/background.png" alt="" />
      <Timer className="blog-background-timer" />
      <section className={`blog-laptop ${hasOpened ? 'opening' : ''} ${isClosing ? 'closing' : ''}`} aria-label={isCorrupt ? '깨진 블로그 화면' : '블로그 화면'}>
        <button className="blog-back" type="button" onClick={handleClose}>
          그만보기
        </button>

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
      </section>
    </main>
  );
}

export default BlogPage;

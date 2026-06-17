import { Fragment, useEffect, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';

import Timer from '../../components/game/Timer';
import laptopLockScreen from '../../assets/노트북잠금화면.svg';

const posts = [
  {
    id: 1,
    title: '[공지] 당분간 블로그 및 SNS 활동을 쉬어갑니다. (공부 집중)',
    corruptTitle: '[공지] 로그아웃',
    date: '2026.05.12',
    image: 'post2',
    excerpt: '오늘 올린 서해 여행 글을 마지막으로, 당분간 블로그와 인스타그램을 포함한 모든 SNS를 쉬어갑니다.',
    body: [
      '여러분, 방금 서해 여행을 마치고 돌아오는 길에 진지하게 고민을 좀 했습니다.',
      '그동안 매일 블로그를 올리며 소통하는 것도 즐거웠지만, 정작 가장 중요한 공부를 너무 미뤄두고 있었다는 생각이 들었습니다.',
      '이번에 혼자 바다를 보며 생각을 정리해보니, 지금은 다른 것보다 학업에 완전히 집중해야 할 시기라는 결론을 내렸습니다.',
      '따라서 오늘 올린 서해 여행 글을 마지막으로, 당분간 블로그와 인스타그램을 포함한 모든 SNS를 로그아웃하고 공부에만 매진하려고 합니다.',
      '스마트폰도 공부에 방해가 되니 아예 멀리 치워두거나 당분간 정지시켜 둘 생각입니다. 독하게 마음을 먹었습니다.',
      '이웃분들, 제가 없는 동안 다들 잘 지내고 계시길 바랍니다.',
      '시험이 끝나거나 목표한 바를 이룬 후에, 훨씬 더 성장한 모습으로 돌아오겠습니다.',
      '그때까지 모두 건강하게 잘 지내세요.',
      '감사합니다.',
    ],
    corruptBody: [
      '로그아웃 이후의 기록이 비어 있다.',
      '마지막 글이라는 말만 반복된다.',
    ],
    comments: [
      {
        author: 'minhoo0401',
        text: '잘 생각했어. 당분간 연락 안 해도 괜찮아.',
        time: '2026.05.12',
      },
      {
        author: 'gangjae000',
        text: '갑자기? 방금까지 여행 글 올렸잖아. 무슨 일 있어?',
        time: '2026.05.12',
      },
    ],
  },
  {
    id: 2,
    title: '[일상] 갑자기 바다가 보고 싶어서 혼자 서해에 다녀왔다.',
    corruptTitle: '[404] 깨진 기록',
    date: '2026.05.12',
    image: 'post1',
    detailImages: ['/blog-assets/blog1-body.png'],
    detailImageSlots: [6],
    excerpt: '갑자기 바다가 보고 싶어서 혼자 서해 바다에 다녀왔다. 혼자 하는 여행도 은근히 매력 있는 듯하다.',
    body: [
      '어제 블로그에 썼던 대로, 오늘 드디어 혼자 서해 바다에 다녀왔다.',
      '오랜만에 혼자 밖으로 나오니까 머리가 비는 느낌도 들고 여러모로 괜찮았던 것 같다.',
      '(참고로 부모님께는 따로 말씀 안 드리고 온 비밀 일탈 여행이다.)',
      '바람은 생각보다 안 추웠다. 그래서 바다를 보면서 한참 동안 멍하게 서 있었다.',
      '파도 소리를 가만히 듣고 있으니까 기분이 차분해지는 효과가 있는 것 같다.',
      '근처에 보이는 카페에 들어가서 라떼도 마셨다. 삼각대를 챙겨간 덕분에 혼자서도 사진을 많이 찍을 수 있었다. 혼자 하는 여행도 은근히 매력 있는 듯하다.',
      '사실 출발하기 전에는 혼자 가는 게 조금 어색하게 느껴졌는데, 막상 도착해보니 타인의 시선을 신경 쓸 필요가 없어서 오히려 편했다.',
      '바다 앞에서 이어폰을 끼고 좋아하는 노래를 들으며 걸을 때는 마치 드라마 주인공이 된 것 같은 기분도 들었다.',
      '저녁 시간이 되니까 노을이 정말 예쁘게 졌는데, 카메라에 그 풍경이 다 담기지 않아서 아쉬운 마음이 든다.',
      '아무튼 혼자서 알차게 잘 놀다 온 하루였다.',
      '다음에는 시간을 더 길게 내서 와보고 싶다.',
    ],
    corruptBody: [
      '페이지가 이상하게 반복된다.',
      '사진 속 계단과 문장이 계속 연결되는 것처럼 보인다.',
    ],
    comments: [
      {
        author: 'gangjae000',
        text: '그날 바람 많이 불었지. 네가 계단 쪽에서 사진 찍던 것도 기억나.',
        time: '2026.05.12',
      },
      {
        author: 'gangjae000',
        text: '다음에 또 가면 알려줘. 아니, 안 알려줘도 아마 알게 될 것 같아.',
        time: '2026.05.12',
      },
      {
        author: 'minhoo0401',
        text: '사진 확인했다. 다음 일정은 미리 말해줘.',
        time: '2026.05.13',
      },
    ],
  },
  {
    id: 3,
    title: '[일상] 봄 날씨가 좋다',
    corruptTitle: '[???] 예약 내역 오류',
    date: '2026.05.11',
    image: 'post2',
    detailImages: ['/blog-assets/blog2-body-1.png', '/blog-assets/blog2-body-2.png'],
    detailImageSlots: [1, 3],
    excerpt: '날씨가 좋아서 오래 걸었다. 카페에서 받은 쿠키도 맛있었다.',
    body: [
      '오늘은 날씨가 너무 좋아서 산책을 했다.',
      '친구가 보내준 쿠폰으로 음료도 마셨다.',
      '해야 할 일은 많지만 잠깐 쉬는 것도 필요하다.',
      '내일은 다시 공부를 해야겠다.',
    ],
    corruptBody: [
      '예약 내역은 정상인데 위치가 조금 이상하다.',
      '기다린다는 말이 계속 같은 자리에서 반복된다.',
    ],
    comments: [
      { author: 'minhoo0401', text: '쿠폰 쓴 건 잘했다. 늦게까지 밖에 있지는 마.', time: '2026.05.11' },
      { author: 'gangjae000', text: '그 카페 창가 자리였지? 네가 좋아할 줄 알았어.', time: '2026.05.11' },
    ],
  },
  {
    id: 4,
    title: '[일상] 시험 공부 이야기',
    corruptTitle: '[입력] 마지막 문장',
    date: '2026.05.08',
    image: 'post1',
    listImage: '/blog-assets/blog3-body.png',
    detailImages: ['/blog-assets/blog3-body.png'],
    detailImageSlots: [2],
    excerpt: '시험 기간이 시작됐다. 준비하는 과정도 결과만큼 중요하다고 믿고 싶다.',
    body: [
      '시험 기간이 시작됐다.',
      '책만 펴면 졸리지만 그래도 해야 한다.',
      '중간중간 간식을 먹으면서 버티는 중이다.',
      '끝나고 나면 제대로 쉬어야겠다.',
    ],
    corruptBody: [
      '문장들이 연결되어 이름을 만든다.',
      '마지막 문장은 아직 저장되지 않았다.',
    ],
    comments: [
      { author: 'gangjae000', text: '어제도 늦게까지 불 켜져 있던데, 너무 무리하지 마.', time: '2026.05.08' },
      { author: 'minhoo0401', text: '공부 계획대로 진행해. 끝나면 연락해.', time: '2026.05.09' },
    ],
  },
];

const categories = ['전체보기 (4)', '공지 (1)', '일상 (3)'];

function BlogSidebar({ isCorrupt }) {
  return (
    <aside className="blog-profile">
      <img
        className="profile-image"
        src={`/blog-assets/profile-${isCorrupt ? 'corrupt' : 'normal'}.jpg`}
        alt="jiihyunlog profile"
      />
      <h2>jiihyunlog &lt;3</h2>
      <p className="profile-counts">
        게시물 · 27개
        <br />
        이웃 · 39명
      </p>
      <p className="profile-copy">안녕하세요. 지현이의 블로그입니다.</p>
      <div className="profile-actions">
        <button type="button">{isCorrupt ? '???' : '+ 이웃'}</button>
        <button type="button">{isCorrupt ? '차단' : '차단'}</button>
      </div>

      <section className="blog-categories">
        <h3>카테고리</h3>
        {categories.map((category) => (
          <p key={category}>{category}</p>
        ))}
      </section>

      <section className="recent-images" aria-label="recent images">
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
    <section className="blog-feed" aria-label="blog posts">
      <form className="blog-search" onSubmit={handleSearch}>
        <input placeholder={isCorrupt ? '검색 결과가 깨졌습니다.' : '검색할 글을 입력하세요'} aria-label="blog search" />
        <button type="submit" aria-label="search" />
      </form>

      <section className="blog-ad" aria-label="ad">
        <img src={`/blog-assets/ad-${isCorrupt ? 'corrupt' : 'normal'}.jpg`} alt="ad banner" />
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

function BlogComments({ initialComments }) {
  return (
    <section className="blog-comments" aria-label="comments">
      <div className="comment-disabled-box">
        <textarea value="" placeholder="댓글을 입력할 수 없습니다." readOnly aria-label="댓글을 입력할 수 없습니다." />
        <button type="button" aria-label="댓글 작성">
          <span aria-hidden="true">✎</span>
        </button>
      </div>

      <div className="comment-list">
        {initialComments.map((comment, index) => (
          <article className="comment-item" key={`${comment.author}-${comment.time}-${index}`}>
            <img className="comment-avatar" src="/blog-assets/profile-normal.jpg" alt="" />
            <div className="comment-body">
              <div className="comment-meta">
                <strong>{comment.author}</strong>
                <time>{comment.time}</time>
              </div>
              <p>{comment.text}</p>
            </div>
          </article>
        ))}
      </div>
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

  const renderMedia = (images) => (
    <figure className="detail-media" key={images.join('|')}>
      {images.map((image) => (
        <img className="detail-image" src={image} alt="" key={image} />
      ))}
    </figure>
  );

  return (
    <article className="blog-detail">
      <Link className="detail-back" to={isCorrupt ? '/blog-corrupt' : '/blog'}>
        &lt; 돌아가기
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
            <p>{paragraph}</p>
            {hasInlineImages
              ? post.detailImages.map((image, imageIndex) =>
                  imageSlots[imageIndex] === index + 1 ? renderMedia([image]) : null,
                )
              : null}
          </Fragment>
        ))}
      </div>

      {!isCorrupt ? <BlogComments initialComments={post.comments ?? []} /> : null}
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
      <section
        className={`blog-laptop ${!isUnlocked ? 'locked' : ''} ${hasOpened ? 'opening' : ''} ${isClosing ? 'closing' : ''}`}
        aria-label={isCorrupt ? 'corrupt blog screen' : 'blog screen'}
      >
        <button className="blog-back" type="button" onClick={handleClose} aria-label="close blog">
          <img src="/blog-assets/close-button.svg" alt="" />
        </button>

        {isUnlocked ? (
          <div className="blog-document">
            <header className="blog-titlebar">
              <h1>jiihyunlog의 블로그</h1>
              <nav aria-label="blog menu">
                <span>블로그</span>
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
                placeholder="비밀번호"
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
                  비밀번호가 맞지 않습니다
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

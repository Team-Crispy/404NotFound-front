import { Fragment, useEffect, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';

import Timer from '../../components/game/Timer';

const posts = [
  {
    id: 1,
    title: '[일상] 여행 다녀온 날',
    corruptTitle: '[404] 깨진 기록',
    date: '2026.05.12',
    image: 'post1',
    detailImages: ['/blog-assets/blog1-body.png'],
    detailImageSlots: [2],
    excerpt: '갑자기 바다가 보고 싶어서 다녀왔다. 생각보다 추웠지만 기분은 좋았다.',
    body: [
      '벌써 고3이라는 게 믿기지 않는다.',
      '그래도 올해는 꼭 하고 싶은 일을 하나씩 해보기로 했다.',
      '바다는 생각보다 추웠고, 사진은 전부 마음에 들었다.',
      '다음에는 친구들이랑 같이 가고 싶다.',
    ],
    corruptBody: [
      '페이지가 이상하게 반복된다.',
      '사진 속 계단과 문장이 계속 연결되는 것처럼 보인다.',
    ],
    comments: [
      {
        author: 'gangjae000',
        text: '대충글씨대충글씨대충글씨대충글씨대충글씨대충글씨대충글씨대충글씨대충글씨대충글씨',
        time: '2026.06.17',
      },
      {
        author: 'gangjae000',
        text: '대충글씨대충글씨대충글씨대충글씨대충글씨대충글씨대충글씨두줄형식두줄형식두줄형식두줄형식두줄형식',
        time: '2026.06.17',
      },
      {
        author: 'minhoo0401',
        text: '대충글씨대충글씨대충글씨대충글씨대충글씨대충글씨대충글씨대충글씨대충글씨대충글씨',
        time: '2026.06.17',
      },
    ],
  },
  {
    id: 2,
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
      { author: 'minhoo0401', text: '사진 잘 봤어. 다음에는 같이 가자.', time: '2026.05.11' },
      { author: 'gangjae000', text: '날씨 진짜 좋았겠다.', time: '2026.05.11' },
    ],
  },
  {
    id: 3,
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
      { author: 'gangjae000', text: '끝까지 힘내.', time: '2026.05.08' },
      { author: 'minhoo0401', text: '결과보다 과정이 중요할 때도 있어.', time: '2026.05.09' },
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

function BlogComments({ initialComments, postId }) {
  const [comments, setComments] = useState(initialComments);

  useEffect(() => {
    setComments(initialComments);
  }, [initialComments, postId]);

  return (
    <section className="blog-comments" aria-label="comments">
      <div className="comment-disabled-box">
        <textarea value="" placeholder="댓글을 입력할 수 없습니다." readOnly aria-label="댓글을 입력할 수 없습니다." />
        <button type="button" aria-label="댓글 작성">
          <span aria-hidden="true">✎</span>
        </button>
      </div>

      <div className="comment-list">
        {comments.map((comment, index) => (
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

      {!isCorrupt ? <BlogComments initialComments={post.comments ?? []} postId={post.id} /> : null}
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
            <div className="blog-lock-image" aria-hidden="true" />
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

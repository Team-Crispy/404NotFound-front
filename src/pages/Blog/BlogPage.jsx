import { Fragment, useEffect, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';

import Timer from '../../components/game/Timer';
import jihyunBlogImage1 from '../../assets/블로그1본문이미지.png';
import jihyunBlogImage2A from '../../assets/블로그2본문이미지1.png';
import jihyunBlogImage2B from '../../assets/블로그2본문이미지2.png';
import jihyunBlogImage3 from '../../assets/블로그3본문이미지.png';
import minhooBlogImage1 from '../../assets/블로그(민후버전)1본문이미지.png';
import minhooBlogImage2 from '../../assets/블로그(민후버전)2본문이미지.png';
import minhooBlogImage3 from '../../assets/블로그(민후버전)3본문이미지.png';
import gangjaeProfileImage from '../../assets/kangj.svg';
import minhooProfileImage from '../../assets/jang.svg';
import laptopLockScreen from '../../assets/노트북잠금화면.svg';
import blogProfileImage from '../../assets/프로필.svg';

const commentAvatarByAuthor = {
  minhoo0401: {
    className: 'comment-avatar-card minhoo',
    src: minhooProfileImage,
  },
  gangjae000: {
    className: 'comment-avatar-card gangjae',
    src: gangjaeProfileImage,
  },
};

const posts = [
  {
    id: 1,
    title: '[공지] 당분간 블로그 및 SNS 활동을 쉬어갑니다. (공부 집중)',
    corruptTitle: '[공지] 로그아웃',
    date: '2026.05.12',
    image: 'post2',
    listImage: blogProfileImage,
    hideDetailImage: true,
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
    listImage: minhooBlogImage3,
    detailImages: [minhooBlogImage1, minhooBlogImage2, minhooBlogImage3],
    detailImageSlots: [1, 6, 9],
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
    title: '[일상] 시험공부 파이팅 해야지',
    corruptTitle: '[404] 깨진 기록',
    date: '2026.05.08',
    image: 'post1',
    listImage: jihyunBlogImage3,
    detailImages: [jihyunBlogImage3],
    detailImageSlots: [3],
    excerpt: '시험기간 시작... 공부해야지 하는데 왜 책만 펴면 갑자기 졸린건지.',
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
      '문장들이 연결되어 이름을 만든다.',
      '마지막 문장은 아직 저장되지 않았다.',
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
    id: 4,
    title: '[일상] 봄 날씨가 너무 좋아서 그래',
    corruptTitle: '[???] 예약 내역 오류',
    date: '2026.05.11',
    image: 'post2',
    listImage: jihyunBlogImage2A,
    detailImages: [jihyunBlogImage2A, jihyunBlogImage2B],
    detailImageCaptions: ['구름이 쿼카랑 강아지처럼 보이길래 .. ﾍ(=￣∇￣)ﾉ'],
    detailImageSlots: [1, 3],
    excerpt: '학교 끝나고 집 가려고 하는데 날이 너무 좋아서 산책 좀 했다. 오늘까지만 놀고 내일부터는 열심히 공부 해야지.',
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
      '예약 내역은 정상인데 위치가 조금 이상하다.',
      '기다린다는 말이 계속 같은 자리에서 반복된다.',
    ],
    comments: [
      { author: 'minhoo0401', text: '쿠폰 쓴 건 잘했다. 늦게까지 밖에 있지는 마.', time: '2026.05.11' },
      { author: 'gangjae000', text: '그 카페 창가 자리였지? 네가 좋아할 줄 알았어.', time: '2026.05.11' },
    ],
  },
  {
    id: 5,
    title: '[일상]눈 감았다 뜨니 새해야',
    corruptTitle: '[입력] 마지막 문장',
    date: '2026.01.01',
    image: 'post1',
    listImage: jihyunBlogImage1,
    detailImages: [jihyunBlogImage1],
    detailImageSlots: [3],
    excerpt: '내가 벌써 고삼이라는 게 진짜 1도 안 믿긴다. 그래도 올해는 진짜 정신 차리고 열심히 공부해야지.',
    body: [
      '내가 벌써 고삼이라는 게 진짜 1도 안 믿긴다 ( º﹏º｡ )',
      '그래도 올해는 진짜 정신 차리고 열심히 공부해서 꼭 원하는 대학 가야지 !!',
      '라고 거창하게 결심해놓고 역시 새해 첫날엔 떡국 야무지게 먹고 푸데데 자는게 국룰이지..',
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
      '문장들이 연결되어 이름을 만든다.',
      '마지막 문장은 아직 저장되지 않았다.',
    ],
    comments: [
      { author: 'gangjae000', text: '어제도 늦게까지 불 켜져 있던데, 너무 무리하지 마.', time: '2026.05.08' },
      { author: 'minhoo0401', text: '공부 계획대로 진행해. 끝나면 연락해.', time: '2026.05.09' },
    ],
  },
];

const categories = ['전체보기 (5)', '공지 (1)', '일상 (4)'];

function getPostListImage(post, isCorrupt) {
  if (!isCorrupt && post.listImage) {
    return post.listImage;
  }

  return `/blog-assets/${post.image}-${isCorrupt ? 'corrupt' : 'normal'}.jpg`;
}

function BlogSidebar({ isCorrupt }) {
  const recentImages = posts.slice(0, 2).map((post) => getPostListImage(post, isCorrupt));

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
          {recentImages.map((image) => (
            <img src={image} alt="" key={image} />
          ))}
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
              src={getPostListImage(post, isCorrupt)}
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
            {commentAvatarByAuthor[comment.author] ? (
              <span className="comment-avatar" aria-hidden="true">
                <img
                  className={commentAvatarByAuthor[comment.author].className}
                  src={commentAvatarByAuthor[comment.author].src}
                  alt=""
                />
              </span>
            ) : (
              <img className="comment-avatar" src="/blog-assets/profile-normal.jpg" alt="" />
            )}
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
  const shouldShowFallbackImage = !hasInlineImages && !post.hideDetailImage;
  const fallbackImage = `/blog-assets/${post.image}-${isCorrupt ? 'corrupt' : 'normal'}.jpg`;
  const imageSlots = post.detailImageSlots ?? [];

  const renderMedia = (images, captions = []) => (
    <figure className="detail-media" key={images.join('|')}>
      {images.map((image, index) => (
        <Fragment key={image}>
          <img className="detail-image" src={image} alt="" />
          {captions[index] ? <figcaption>{captions[index]}</figcaption> : null}
        </Fragment>
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

      {shouldShowFallbackImage ? renderMedia([fallbackImage]) : null}

      <div className="detail-body">
        {body.map((paragraph, index) => (
          <Fragment key={paragraph}>
            <p>{paragraph}</p>
            {hasInlineImages
              ? post.detailImages.map((image, imageIndex) =>
                  imageSlots[imageIndex] === index + 1
                    ? renderMedia([image], [post.detailImageCaptions?.[imageIndex]])
                    : null,
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

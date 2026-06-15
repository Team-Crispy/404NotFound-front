import { Link } from 'react-router-dom';

import evidenceImage from '../../assets/evidence.svg';

function EvidencePage() {
  return (
    <main className="inspection-screen">
      <img className="inspection-bg" src="/room-assets/background.png" alt="" />
      <Link className="inspection-back" to="/room">
        그만보기
      </Link>

      <section className="evidence-viewer" aria-label="evidence viewer">
        <img className="evidence-image" src={evidenceImage} alt="evidence" />
      </section>
    </main>
  );
}

export default EvidencePage;

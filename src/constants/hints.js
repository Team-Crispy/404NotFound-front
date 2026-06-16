import hintCard1 from '../assets/힌트1.svg';
import hintCard2 from '../assets/힌트2번.svg';
import hintCard3 from '../assets/힌트3.svg';
import hintDetail1 from '../assets/힌트1상세페이지.svg';
import hintDetail2 from '../assets/힌트2상세페이지.svg';
import hintDetail3 from '../assets/힌트3상세페이지.svg';
import hintSelectPanel from '../assets/힌트선택화면.svg';

export const hintSelectPanelImage = hintSelectPanel;

export const hints = [
  { id: '1', label: '노트북 비밀번호', image: hintCard1, detailImage: hintDetail1 },
  { id: '2', label: '결정적인 글', image: hintCard2, detailImage: hintDetail2 },
  { id: '3', label: '노트북 비밀번호', image: hintCard3, detailImage: hintDetail3 },
];

export function getHintById(hintId) {
  return hints.find((hint) => hint.id === hintId);
}

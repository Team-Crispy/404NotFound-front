import { useNavigate } from 'react-router-dom';
import Background from "../../assets/Back_tutorial.svg"
import "../../styles/Tutorial.css"
import OkBtn from '../../assets/Ok.svg'
import BackBtn from '../../assets/back_Button.svg'

function Tutorial() {
    const navigate = useNavigate();
    const handleNextPage = () => {
        navigate('/');
    };

    return (
        <div
            className="tutorial-background"
            style={{ backgroundImage: `url(${Background})` }}
        >
            <button type="button" className="tutorial-back-btn" onClick={handleNextPage}>
                <img src={BackBtn} alt="뒤로가기" />
            </button>

            <button type="button" className="ok_btn" onClick={handleNextPage}>
                <img src={OkBtn} alt="확인" />
            </button>
        </div>
    );
}

export default Tutorial;

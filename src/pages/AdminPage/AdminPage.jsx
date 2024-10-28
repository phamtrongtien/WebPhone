import './App.css'
import MainDash from "../../components/AdminComponent/MainDash/MainDash";
import RightSide from '../../components/AdminComponent/RigtSide/RightSide';
import Sidebar from '../../components/AdminComponent/Sidebar';

function AdminPage() {
    return (
        <div className="App">
            <div className="AppGlass">
                <Sidebar />
                <MainDash />
                <RightSide />
            </div>
        </div>
    );
}

export default AdminPage;

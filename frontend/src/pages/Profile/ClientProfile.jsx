import { useNavigate, useParams } from "react-router-dom";


const ClientProfile = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const handleClick = () => {
        console.log('Navigate to journal show for user : ', id);
        navigate(`/view-journal/${id}`, {replace: false});
    }

    return (
        <div className="h-40 w-40 mx-auto my-4">
            <button className="btn btn-primary text-xl"
            onClick={handleClick}>See journals</button>
        </div>
    );
};

export default ClientProfile;
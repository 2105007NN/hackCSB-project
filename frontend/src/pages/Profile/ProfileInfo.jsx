import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { useQuery } from '@tanstack/react-query';
import Loading from "../../components/ui/Loading";
import DeviceInfo from "../../components/ui/DisplayDevice";
import UserLocation from "../../components/ui/UserLocation";

const ProfileInfo = () => {
    const { user } = useContext(AuthContext);
    console.log(user);

    const { data: scores, isLoading } = useQuery({
        queryKey: ['scores'],
        queryFn: async () => {
            try {
                const res = await fetch('http://localhost:3000/categories/user-category/single', {
                    headers: {
                        // 'content-type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`
                    }
                });
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await res.json();
                return data.data; // assuming the data is in the 'data' property
            } catch (error) {
                console.log(error);
                return [];
            }
        }
    });

    if (isLoading) {
        return <Loading />;
    }
    console.log(scores);
    console.log(localStorage.getItem('access_token'));
    return (
        <div>
            {/* <h1>Profile Information</h1> */}
            <section className="border p-4 rounded-sm">
                <h2 className="text-lg bg-gradient-to-r from-primary to-secondary p-1 text-white">My Profile</h2>
                <div className="grid grid-cols-2 text-xl">
                <div className="font-light text-sm p-4">First Name 
                        <p className="text-white font-sm text-lg">{user?.firstname}</p>
                    </div>
                    <div className="font-light text-sm p-4">Last Name 
                        <p className="text-white font-sm text-lg">{user?.lastname}</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 my-5">
                    <div className="font-light text-sm p-4">Gender 
                        <p className="text-white font-sm text-lg">{user?.gender}</p>
                    </div>
                    <div className="font-light text-sm p-4">Contact No 
                        <p className="text-white font-sm text-lg">{user?.contactNo}</p>
                    </div>
                </div>
                <div className="grid grid-cols-2">
                <div className="font-light text-sm p-4">Device Info 
                        <p className="text-white font-sm text-lg"><DeviceInfo /></p>
                    </div>
                    <div className="font-light text-sm p-4"> Location
                        <UserLocation></UserLocation>
                    </div>
                </div>
            </section>

            {/* Category-wise stats */}
            {/* <section className="border">
                <h2 className="text-lg">Category-wise Stats</h2>
                <div>
                    {scores.map((score) => (
                        <div key={score.id}>
                            <p>Category: {score.category_name}</p>
                            <p>Score: {score.score}</p>
                        </div>
                    ))}
                </div>
            </section> */}
        </div>
    );
};

export default ProfileInfo;

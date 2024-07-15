import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";

const PassChange = () => {
    const {user} = useContext(AuthContext);
    const [selectedDate, setDate] = useState(new Date());
    const user_id = user?.id;
    console.log(selectedDate);
   
    // console.log(formattedDate)
    // const date = new Date();
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0'); // Add leading zero if needed
    const day = String(selectedDate.getDate()).padStart(2, '0'); // Add leading zero if needed
    const formattedDate = `${year}-${month}-${day}`;
    console.log(formattedDate);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        console.log("heloo")
        const country = form.country.value;
        const education = form.education.value;
        console.log(country, education, formattedDate);
        //date_of_birth, country, city, years_of_experience, institution, mentored_students, teacher_description
        // /update/:userId/:teacherId
        try {
            console.log(user?.teacher_id);
            
          const response = await fetch(`http://localhost:5002/update/Profile/${user?.id}/${user?.student_id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                education: education,
                country: country,
                city: city,
                profession : profession,
                date_of_birth: selectedDate,
                job_profile: job_profile
            }),
          });
          console.log({
            education : education, 
            country: country,
            city: city,
            profession : profession,
            date_of_birth: selectedDate,
            job_profile: job_profile
        })
          if (response.ok) {
            const result = await response.json();
            console.log('Course added successfully. Course ID:', result.courseId);
            // Add any additional logic or UI updates here
          } else {
            console.error('Failed to add course.');
          }
          //reset the form
        //   form.reset();
        } catch (error) {
          console.error('Error:', error);
          
        }
      };
    
    return (
        <div className="border rounded-xl text-black">
            <form onSubmit={handleSubmit}  className='w-full my-5 p-8'>
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text text-primary"><span className="text-red-500">*</span>New Password</span>
                    </label>
                    <input type="password" name='newpassword' placeholder="Enter new password" className="input input-bordered w-full bg-slate-300"  required/>
                    </div>
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text text-primary"><span className="text-red-500">*</span>Old Password</span>
                    </label>
                    <input type="password" name='oldpassword' placeholder="Enter old password" className="input input-bordered w-full bg-slate-300"  required/>
                </div>
                <button type="submit" className="w-full inline-block border mt-5 border-primary text-md text-primary font-medium leading-normal uppercase rounded hover:bg-primary hover:text-white  focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
                    Update password
                </button>
                </form>
        </div>
    );
};

export default PassChange;
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt } from "react-icons/fa";

const Settings = () => {
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
        const city = form.city.value;
        const profession = form.profession.value;
        const job_profile = form.job_profile.value;
        console.log(country, education, city, profession, job_profile, formattedDate);
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
        <div className='mx-auto border rounded-xl my-4 text-black'>
                <form onSubmit={handleSubmit}  className='w-full my-5 p-8'>
                {/* <h1 className='text-4xl font-semibold text-blue-600 mb-5'>ADD NEW COURSE</h1> */}
                {/* name */}
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text text-primary"><span className="text-red-500">*</span>First Name</span>
                    </label>
                    <input  type="text"  name='firstname' placeholder="eg. Bangladesh" className="input input-bordered w-full bg-slate-200"  required/>
                </div>
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text text-primary">Last Name</span>
                    </label>
                    <input type="text" name='lastname' placeholder="eg. Dhaka" className="input input-bordered w-full bg-slate-200"  />
                    </div>
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text text-primary"><span className="text-red-500">*</span>Gender</span>
                    </label>
                    <input type="text" name='gender' placeholder="eg. male, female, other" className="input input-bordered w-full bg-slate-200"  required/>
                    </div>
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text text-primary"><span className="text-red-500">*</span>Contact No.</span>
                    </label>
                    <input type="text" name='job_profile' placeholder="enter your contact number" className="input input-bordered w-full bg-slate-200"  required/>
                </div>
                {/* date picker  */}
                {/* <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text text-blue-500"><span className="text-red-500">*</span>What is your date of birth?</span>
                    </label>
                    <label  className="flex items-center gap-3 p-3 rounded-xl bg-slate-200">
                        <FaCalendarAlt/>
                        <div>|</div>
                        <DatePicker className="p-2 bg-slate-200" selected={selectedDate} dateFormat="MM-DD-YYYY" onChange={date=> setDate(date)}></DatePicker>
                    </label>
                </div> */}
                <div className="form-control">
                <label className="label">
                    <span className="label-text text-primary">Bio</span>
                    <span className="label-text-alt"></span>
                </label> 
                <textarea className="textarea textarea-bordered h-24 bg-slate-200" name='profession' placeholder="Enter your bio" required></textarea>
                </div>
                <button type="submit" className="w-full inline-block border mt-5 border-primary text-md text-primary font-medium leading-normal uppercase rounded hover:bg-primary hover:text-white  focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
                    Save Changes
                </button>
                </form>
            </div>
      )
}
 
export default Settings;
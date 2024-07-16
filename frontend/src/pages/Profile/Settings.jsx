import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt } from "react-icons/fa";

const Settings = () => {
    const {user} = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const firstname = form.firstname.value;
        const lastname = form.lastname.value;
        const contactNo = form.contactNo.value;
        const gender = form.gender.value;
        const ageGroup = form.ageGroup.value;
        console.log(firstname, lastname, contactNo, gender, ageGroup);

        try {
            console.log(user?.teacher_id);
            
          const response = await fetch(`http://localhost:3000/users/update-client-profile`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Authorization : `'Bearer ${localStorage.getItem('access_token')}`
            },
            body: JSON.stringify({
                firstname: firstname,
                lastname: lastname,
                contactNo: contactNo,
                ageGroup : ageGroup,
                gender: gender,
            }),
          });
          console.log({
            firstname: firstname,
            lastname: lastname,
            contactNo: contactNo,
            ageGroup : ageGroup,
            gender: gender,
        })
          if (response.ok) {
            const result = await response.json();
            console.log('Course added successfully. Course ID:', result.courseId);
            // Add any additional logic or UI updates here
          } else {
            console.error('Failed to add course.');
          }
          //reseting the form
          form.reset();
        } catch (error) {
          console.error('Error:', error);
          
        }
      };
    
      return (
        <div className='mx-auto border rounded-xl my-4 text-black'>
                <form onSubmit={handleSubmit}  className='w-full my-5 p-8'>
                {/* <h1 className='text-4xl font-semibold text-blue-600 mb-5'>ADD NEW COURSE</h1> */}
                {/* name */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="form-control w-full col-span-1">
                        <label className="label">
                            <span className="label-text text-primary"><span className="text-red-500">*</span>First Name</span>
                        </label>
                        <input  type="text"  name='firstname' value={user?.firstname} placeholder="Your first name" className="input input-bordered w-full text-slate-400"  required/>
                    </div>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text text-primary">Last Name</span>
                        </label>
                        <input type="text" name='lastname' value={user?.lastname} placeholder="your lastname" className="input input-bordered w-full text-slate-400"  />
                    </div>
                </div>
               <div className="grid grid-cols-2 gap-3">
               <div className="form-control w-full col-span-1">
                    <label className="label">
                        <span className="label-text text-primary"><span className="text-red-500">*</span>Gender</span>
                    </label>
                    <input type="text" name='gender' value={user?.gender} placeholder="eg. male, female, other" className="input input-bordered w-full text-slate-400"  required/>
                    </div>
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text text-primary"><span className="text-red-500">*</span>Contact No.</span>
                    </label>
                    <input type="text" name='contactNo' value={user?.contactNo} placeholder="enter your contact number" className="input input-bordered w-full text-slate-400"  required/>
                </div>
               </div>


               <div className="form-control w-full col-span-1">
                        <label className="label">
                            <span className="label-text text-primary"><span className="text-red-500">*</span>Age Group</span>
                        </label>
                        <select name="ageGroup" value={user?.ageGroup} className="select select-bordered w-full text-slate-400">
                            <option disabled selected>Your age gruop?</option>
                            <option>0-10</option>
                            <option>10-18</option>
                            <option>18-25</option>
                            <option>25-40</option>
                            <option>40-60</option>
                            <option>60++</option>
                        </select>
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
                {/* <div className="form-control">
                <label className="label">
                    <span className="label-text text-primary">Bio</span>
                    <span className="label-text-alt"></span>
                </label> 
                <textarea className="textarea textarea-bordered h-24" name='profession' placeholder="Enter your bio" required></textarea>
                </div> */}
                <button type="submit" className="w-full inline-block border mt-5 border-primary text-md text-primary font-medium leading-normal uppercase rounded hover:bg-primary hover:text-white  focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
                    Save Changes
                </button>
                </form>
            </div>
      )
}
 
export default Settings;
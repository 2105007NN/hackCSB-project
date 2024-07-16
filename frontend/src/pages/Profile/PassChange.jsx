import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";

const PassChange = () => {
    const {user} = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;

        const newpassword = form.newpassword.value;
        const oldpassword = form.oldpassword.value;
        console.log(newpassword, oldpassword);
        
        try {
            console.log(user?.teacher_id);
            
          const response = await fetch(`http://localhost:3000/auth/change-password`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            },
            body: JSON.stringify({
                newpassword : newpassword,
                oldpassword : oldpassword
            }),
          });
          console.log({
            newpassword : newpassword,
            oldpassword : oldpassword
        })
          if (response.ok) {
            const result = await response.json();
            console.log('Course added successfully. Course ID:', result.courseId);
            // Add any additional logic or UI updates here
          } else {
            console.error('Failed to add course.');
          }
          //reset the form
          form.reset();

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
                    <input type="password" name='newpassword' placeholder="Enter new password" className="input input-bordered w-full text-slate-400"  required/>
                    </div>
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text text-primary"><span className="text-red-500">*</span>Old Password</span>
                    </label>
                    <input type="password" name='oldpassword' placeholder="Enter old password" className="input input-bordered w-full text-slate-400"  required/>
                </div>
                <button type="submit" className="w-full inline-block border mt-5 border-primary text-md text-primary font-sm leading-normal uppercase rounded hover:bg-primary hover:text-white  focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
                    Change password
                </button>
                </form>
        </div>
    );
};

export default PassChange;
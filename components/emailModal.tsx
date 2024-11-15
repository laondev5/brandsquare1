'use client'
import Image from 'next/image'
import React, { useState, FormEvent } from 'react'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster, toast } from "sonner";
 import { FaAngleDown } from 'react-icons/fa';

interface FormErrors {
    email?: string;
     message?: string;
  }

  interface FormState {
    email: string;
    message: string;
  }

  interface Props {
     setEmailModal: (value: boolean) => void;
  }

const emailModal:React.FC<Props> = ({  setEmailModal}) => {
    const [formState, setFormState] = useState<FormState>({
        email: "",
        message: "",
      });
       
//   const [loading, setLoading] = useState<boolean>(false);
const closeModal = () => {
    setEmailModal(false)
}

    const validateForm = (): FormErrors => {
        const errors: FormErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
        if (!formState.email) {
         toast.error("Email is required");
        } else if (!emailRegex.test(formState.email)) {
          toast.error("Please enter a valid email address");
        }
    
        if (!formState.message) {
          toast.error(" Message is required");
        } 
    
        return errors;
      };

      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const { name, value } = e.target;
        setFormState((prev) => ({
          ...prev,
          [name]: value,
        }));
      };

      const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
    // setLoading(true);
      validateForm();

      }
  return (
    
<div>  
<div className="fixed top-28  left-1/2   transform -translate-x-1/2 md:-translate-x-0 md:left-[60%]  min-h-[80vh] md:h-[70vh]  md:w-[40vw] w-[70vw] lg:w-[30vw] rounded-lg p-6 bg-white shadow-lg">
  <div className="bg-[#000035] max-w-[800px] w-full p-6 rounded-lg">
  <div className="header flex justify-between items-center">
        <Image src='/images/logo.png' alt='logo' width={100} height={100} />
        <div onClick={closeModal}>
            <FaAngleDown className='text-white cursor-pointer' />
        </div>
       </div>

       
  </div>

  <form   onSubmit={handleSubmit} className=' mt-10'>
      <div className="space-y-4">
        <h1 className=' text-center font-semibold text-[20px]'>Submit Your Questions</h1>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="name@example.com"
            // value={ }
            onChange={handleInputChange}

             
            // disabled={loading}
            // aria-describedby={error ? "email-error" : undefined}
          />
        </div>
        <div className="space-y-2 w-full py-4">
          <Label htmlFor="message" className='block'>Message</Label>
          <textarea className='border rounded-md min-h-[100px] text-sm p-1 w-full'
            id="message"
            name="message"
            placeholder="Enter your message"
            // value={formState.message}
            onChange={handleInputChange}
             
            // disabled={loading}
            // aria-describedby={error ? "error" : undefined}
            
          />
        </div>
      </div>
      <div>
        <Button
          type="submit"
          className="w-full bg-yellow-400   hover:bg-yellow-500 text-black"
        //   disabled={loading}
        //   aria-busy={loading}
        >
          {/* {loading && (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )} */}
Submit        </Button>
      </div>
      
    </form>
</div>
<Toaster position="bottom-right" expand={false} richColors /></div>
  )
}

export default emailModal
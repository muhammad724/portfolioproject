'use client';

import { verifyRecaptcha } from "@/lib/recaptcha";
import {
  checkRateLimit,
  increaseAttempts,
  resetAttempts,
} from "@/lib/rate-limit";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  Loader2,
  LogIn,
  ShieldCheck
} from "lucide-react";


const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  token: z.string().min(1),
});


type LoginValues = z.infer<typeof loginSchema>;



export default function AdminLoginPage() {


  const router = useRouter();


  const [showPassword, setShowPassword] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);



  const {
    register,
    handleSubmit,
    formState:{
      errors
    }

  } = useForm<LoginValues>({

    resolver:zodResolver(loginSchema),

    defaultValues:{
      email:"",
      password:"",
    }

  });



  async function onSubmit(values:LoginValues){


    setIsSubmitting(true);


    try{


      const res = await fetch("/api/auth/login",{

        method:"POST",

        headers:{
          "Content-Type":"application/json",
        },

        body:JSON.stringify(values),

      });



      const data = await res.json().catch(()=>null);



      if(!res.ok){

        window.alert(
          data?.error ?? "Login failed."
        );

        return;

      }



      window.alert("Login successful!");

      router.push("/admin/dashboard");



    }catch(error){

      console.error(error);

      window.alert(
        "Something went wrong. Please try again."
      );


    }finally{

      setIsSubmitting(false);

    }


  }




  return (

    <div
      className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-[#02120D]
      px-5
      py-10
      overflow-hidden
      "
    >



      {/* Glow */}

      <div
        className="
        fixed
        top-20
        left-1/2
        -translate-x-1/2
        h-96
        w-96
        rounded-full
        bg-[#C9A24D]/10
        blur-[120px]
        "
      />





      <motion.div

        initial={{
          opacity:0,
          y:30
        }}

        animate={{
          opacity:1,
          y:0
        }}

        transition={{
          duration:.4
        }}

        className="
        relative
        w-full
        max-w-md
        "

      >



        <div
          className="
          rounded-[2rem]
          border
          border-white/10
          bg-white/[0.05]
          backdrop-blur-xl
          p-8
          shadow-2xl
          "
        >




          <div className="
          mb-8
          text-center
          ">


            <div
              className="
              mx-auto
              mb-5
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-2xl
              bg-[#C9A24D]/10
              text-[#C9A24D]
              "
            >

              <ShieldCheck size={32}/>

            </div>



            <h1
              className="
              text-3xl
              font-bold
              text-white
              "
            >
              Admin Login
            </h1>



            <p className="
            mt-2
            text-sm
            text-white/50
            ">
              Sign in to manage your dashboard.
            </p>


          </div>







          <form
            onSubmit={handleSubmit(onSubmit)}
            className="
            space-y-5
            "
          >




            <div>


              <label
                className="
                mb-2
                block
                text-sm
                text-white/70
                "
              >
                Email
              </label>



              <input

                type="email"

                {...register("email")}

                className="
                w-full
                rounded-xl
                border
                border-white/10
                bg-black/20
                px-4
                py-3
                text-white
                outline-none
                focus:border-[#C9A24D]
                transition
                "

                placeholder="admin@example.com"

              />



              {
                errors.email &&

                <p className="
                mt-2
                text-xs
                text-red-400
                ">
                  {errors.email.message}
                </p>

              }



            </div>







            <div>


              <label
                className="
                mb-2
                block
                text-sm
                text-white/70
                "
              >
                Password
              </label>




              <div className="relative">


                <input

                  type={
                    showPassword
                    ? "text"
                    : "password"
                  }

                  {...register("password")}


                  className="
                  w-full
                  rounded-xl
                  border
                  border-white/10
                  bg-black/20
                  px-4
                  py-3
                  pr-12
                  text-white
                  outline-none
                  focus:border-[#C9A24D]
                  transition
                  "

                  placeholder="••••••••"

                />




                <button

                  type="button"

                  onClick={()=>
                    setShowPassword(!showPassword)
                  }

                  className="
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                  text-white/50
                  hover:text-[#C9A24D]
                  "

                >

                  {
                    showPassword
                    ?
                    <EyeOff size={18}/>
                    :
                    <Eye size={18}/>
                  }


                </button>



              </div>




              {
                errors.password &&

                <p className="
                mt-2
                text-xs
                text-red-400
                ">
                  {errors.password.message}
                </p>

              }


            </div>
  <p className="mt-6 text-center text-sm text-white/60">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="text-[#C9A24D] hover:underline"
            >
              Login
            </button>
          </p>







            <motion.button

              whileHover={{
                y:-2
              }}

              whileTap={{
                scale:.97
              }}


              disabled={isSubmitting}


              type="submit"


              className="
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-[#C9A24D]
              py-3
              font-semibold
              text-[#02120D]
              transition
              disabled:opacity-50
              "

            >


              {
                isSubmitting
                ?

                <>
                  <Loader2
                    className="animate-spin"
                    size={18}
                  />

                  Signing in...

                </>

                :

                <>

                  <LogIn size={18}/>

                  Login

                </>

              }



            </motion.button>




          </form>






        </div>



      </motion.div>



    </div>

  );

}
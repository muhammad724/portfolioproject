import { prisma } from "@/lib/prisma";
import {
  Star,
  Mail,
  Building2,
  Calendar,
  MessageSquare
} from "lucide-react";


export default async function AdminFeedbackPage() {

  const feedback = await prisma.feedback.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });


  return (
    <div className="min-h-screen bg-[#02120D] p-5 md:p-10">


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
        pointer-events-none
        "
      />


      <div className="relative mb-12">


        <div className="flex items-center gap-3 mb-3">

          <div className="
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-2xl
          bg-[#C9A24D]/10
          text-[#C9A24D]
          ">

            <MessageSquare />

          </div>


          <p className="
          text-sm
          uppercase
          tracking-[0.35em]
          text-[#C9A24D]
          ">
            Dashboard
          </p>


        </div>



        <h1 className="
        text-4xl
        md:text-5xl
        font-extrabold
        text-white
        ">
          User Feedback
        </h1>


        <p className="mt-3 text-white/50">
          Review customer opinions, ratings and experiences.
        </p>


      </div>



      {
        feedback.length === 0 ? (

          <div className="
          rounded-3xl
          border
          border-white/10
          bg-white/5
          p-12
          text-center
          backdrop-blur-xl
          ">

            <MessageSquare
              className="mx-auto mb-4 text-[#C9A24D]"
              size={40}
            />

            <h2 className="
            text-2xl
            font-bold
            text-white
            ">
              No Feedback Yet
            </h2>


            <p className="mt-2 text-white/50">
              Customer feedback will appear here.
            </p>


          </div>


        ) : (


          <div className="
          grid
          gap-7
          sm:grid-cols-2
          xl:grid-cols-3
          ">


            {
              feedback.map((item) => (


                <div
                  key={item.id}
                  className="
                  group
                  relative
                  overflow-hidden
                  rounded-[2rem]
                  border
                  border-white/10
                  bg-white/[0.04]
                  p-6
                  backdrop-blur-xl
                  shadow-2xl
                  hover:border-[#C9A24D]/40
                  transition
                  "
                >



                  <div className="
                  absolute
                  -right-10
                  -top-10
                  h-32
                  w-32
                  rounded-full
                  bg-[#C9A24D]/10
                  blur-3xl
                  " />



                  <div className="flex gap-1 mb-6">

                    {
                      Array.from({
                        length: item.rating
                      }).map((_, i) => (

                        <Star
                          key={i}
                          size={18}
                          className="
                          fill-[#C9A24D]
                          text-[#C9A24D]
                          "
                        />

                      ))
                    }

                  </div>




                  <h2 className="
                  text-xl
                  font-bold
                  text-white
                  ">
                    {item.name}
                  </h2>




                  <div className="
                  mt-4
                  space-y-3
                  text-sm
                  text-white/60
                  ">


                    <p className="flex gap-3 items-center">

                      <Mail
                        size={16}
                        className="text-[#C9A24D]"
                      />

                      {item.email}

                    </p>




                    {
                      item.company && (

                        <p className="flex gap-3 items-center">

                          <Building2
                            size={16}
                            className="text-[#C9A24D]"
                          />

                          {item.company}

                        </p>

                      )
                    }





                    <p className="flex gap-3 items-center">

                      <Calendar
                        size={16}
                        className="text-[#C9A24D]"
                      />

                      {item.createdAt.toLocaleDateString()}

                    </p>



                  </div>





                  <div className="
                  mt-6
                  rounded-2xl
                  border
                  border-white/10
                  bg-black/20
                  p-5
                  text-sm
                  leading-7
                  text-white/80
                  ">

                    "{item.message}"

                  </div>




                </div>


              ))
            }


          </div>


        )
      }


    </div>
  );
}
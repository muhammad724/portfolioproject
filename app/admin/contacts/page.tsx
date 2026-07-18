import { prisma } from "@/lib/prisma";
import { Mail, Calendar, User, MessageSquare } from "lucide-react";


export default async function AdminContactsPage() {

  const contacts = await prisma.contact.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });


  return (

    <div className="min-h-screen bg-[#02120D] p-5 md:p-10">


      {/* Background Glow */}

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



      {/* Header */}

      <div className="relative mb-12">


        <div className="flex items-center gap-3 mb-4">


          <div
            className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            bg-[#C9A24D]/10
            text-[#C9A24D]
            "
          >

            <MessageSquare size={24}/>

          </div>



          <p
            className="
            text-sm
            uppercase
            tracking-[0.3em]
            text-[#C9A24D]
            "
          >
            Dashboard
          </p>


        </div>




        <h1
          className="
          text-4xl
          md:text-5xl
          font-bold
          text-white
          "
        >
          Contact Messages
        </h1>



        <p className="
        mt-3
        text-white/50
        ">
          View and manage messages submitted by users.
        </p>


      </div>





      {
        contacts.length === 0 ? (


          <div
            className="
            rounded-3xl
            border
            border-white/10
            bg-white/5
            p-10
            text-center
            backdrop-blur-xl
            "
          >


            <MessageSquare
              className="
              mx-auto
              mb-4
              text-[#C9A24D]
              "
              size={40}
            />


            <h2 className="
            text-xl
            font-bold
            text-white
            ">
              No Messages Yet
            </h2>


            <p className="
            mt-2
            text-white/50
            ">
              Contact messages will appear here.
            </p>


          </div>


        ) : (


          <div
            className="
            overflow-hidden
            rounded-3xl
            border
            border-white/10
            bg-white/[0.04]
            backdrop-blur-xl
            shadow-2xl
            "
          >



            <div className="overflow-x-auto">


              <table className="w-full text-left">


                <thead>


                  <tr
                    className="
                    border-b
                    border-white/10
                    text-white/60
                    text-sm
                    "
                  >


                    <th className="p-5">
                      User
                    </th>


                    <th className="p-5">
                      Email
                    </th>


                    <th className="p-5">
                      Message
                    </th>


                    <th className="p-5">
                      Date
                    </th>


                  </tr>


                </thead>




                <tbody>


                  {
                    contacts.map((contact)=>(


                      <tr
                        key={contact.id}
                        className="
                        border-b
                        border-white/10
                        hover:bg-white/5
                        transition
                        "
                      >



                        <td className="p-5">


                          <div className="
                          flex
                          items-center
                          gap-3
                          ">


                            <div
                              className="
                              h-10
                              w-10
                              rounded-xl
                              bg-[#C9A24D]/10
                              flex
                              items-center
                              justify-center
                              text-[#C9A24D]
                              "
                            >

                              <User size={18}/>

                            </div>


                            <span className="
                            text-white
                            font-medium
                            ">
                              {contact.name}
                            </span>


                          </div>


                        </td>





                        <td className="
                        p-5
                        text-white/70
                        ">


                          <div className="
                          flex
                          items-center
                          gap-2
                          ">


                            <Mail
                              size={16}
                              className="text-[#C9A24D]"
                            />


                            {contact.email}


                          </div>


                        </td>





                        <td className="
                        p-5
                        max-w-md
                        text-white/70
                        ">


                          <p className="line-clamp-2">
                            {contact.message}
                          </p>


                        </td>





                        <td className="
                        p-5
                        text-white/60
                        ">


                          <div className="
                          flex
                          items-center
                          gap-2
                          ">


                            <Calendar
                              size={16}
                              className="text-[#C9A24D]"
                            />


                            {contact.createdAt.toLocaleDateString()}


                          </div>


                        </td>



                      </tr>


                    ))
                  }



                </tbody>


              </table>


            </div>


          </div>


        )
      }



    </div>

  );
}
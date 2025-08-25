import PrivateRoute from "@/components/PrivateRoute";

export default function({children}:{children:React.ReactNode}){

    return (
        <div>
              <PrivateRoute allowedRole="DEVELOPER">


            {children}
              </PrivateRoute>
        </div>
    )
}
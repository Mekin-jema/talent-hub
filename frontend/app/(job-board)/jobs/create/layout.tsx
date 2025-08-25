import PrivateRoute from "@/components/PrivateRoute";

export default  function ({children}:{children:React.ReactNode}){

    return (
        <div>
              <PrivateRoute allowedRole="EMPLOYER">

            {children}
              </PrivateRoute>
                

        </div>
    )
}
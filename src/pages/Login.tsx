import { Auth } from "@supabase/auth-ui-react";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/");
      }
    };
    checkUser();
  }, [navigate]);

  return (
    <div className="container max-w-md mx-auto py-8">
      <div className="brutal-border bg-brutal-white p-8">
        <h1 className="text-3xl font-bold mb-8">Welcome to Crypto Tracker</h1>
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: "light",
            style: {
              button: {
                background: "#000",
                color: "#fff",
                border: "4px solid #000",
                borderRadius: "0",
                textTransform: "uppercase",
                fontWeight: "bold",
              },
              input: {
                background: "#fff",
                border: "4px solid #000",
                borderRadius: "0",
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default Login;
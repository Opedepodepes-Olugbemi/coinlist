import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/");
      }
    };
    checkUser();
  }, [navigate]);

  const handleAnonymousSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInAnonymously();
      
      if (error) {
        if (error.message.includes("anonymous_provider_disabled")) {
          toast({
            title: "Authentication Error",
            description: "Anonymous sign-in is currently disabled. Please contact the administrator to enable this feature.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Error signing in",
            description: error.message,
            variant: "destructive",
          });
        }
      } else {
        navigate("/");
      }
    } catch (error) {
      toast({
        title: "Error signing in",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container max-w-md mx-auto py-8">
      <div className="brutal-border bg-brutal-white p-8">
        <h1 className="text-3xl font-bold mb-8">Welcome to Crypto Tracker</h1>
        <div className="flex flex-col items-center gap-4">
          <p className="text-center mb-4">
            Click below to start tracking your crypto assets anonymously
          </p>
          <Button 
            onClick={handleAnonymousSignIn}
            className="w-full"
          >
            Continue Anonymously
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
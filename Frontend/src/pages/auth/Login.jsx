import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/authSlice";

// 🛡️ Validation Schema (email & password only)
const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["candidate", "recruiter"], { message: "Select a role" }),

});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      dispatch(setLoading(true));
      const res = await axios.post("http://localhost:5000/api/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log("response", res.data);
      if (res.data.success) {
        navigate("/signup");
        toast.success(res.data.message);
      }
      reset();
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.res.data.message);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 space-y-6">
          <h2 className="text-2xl font-bold text-center text-gray-800">Log In</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register("email")} placeholder="you@example.com" />
              {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" {...register("password")} placeholder="••••••••" />
              {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
            </div>

            <div className="space-y-2">
              <Label>Role</Label>
              <div className="flex flex-col gap-2 mt-1">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="candidate"
                    {...register("role")}
                    className="accent-[#F83002]"
                  />
                  <span>Candidate</span>
                </label>

                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="recruiter"
                    {...register("role")}
                    className="accent-[#F83002]"
                  />
                  <span>Recruiter</span>
                </label>
              </div>
              {errors.role && <p className="text-sm text-red-500">{errors.role.message}</p>}
            </div>

            <Button type="submit" className="mt-2 w-full bg-[#F83002] hover:bg-[#d62600] text-white font-medium">
              Log In
            </Button>
          </form>

          <p className="text-sm text-center text-gray-600">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-[#F83002] hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
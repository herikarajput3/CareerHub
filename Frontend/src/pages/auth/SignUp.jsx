import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  role: z.enum(["candidate", "recruiter"], { message: "Select a role" }),
  // profile: z.any(),
});

const SignUp = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  // const onSubmit = async (data) => {
  //   const formData = new FormData();
  //   formData.append("fullName", data.fullName);
  //   formData.append("email", data.email);
  //   formData.append("password", data.password);
  //   formData.append("phoneNumber", data.phoneNumber);
  //   formData.append("role", data.role);
  //   // if(data.profile){
  //   //   formData.append("profile", data.file[0]);
  //   // }

  //   try {
  //     const res = await axios.post("http://localhost:5000/api/register", formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",

  //       },
  //       withCredentials: true
  //     });
  //     console.log("response", res.data);
  //     reset();
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }

  // };

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:5000/api/register", data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      // console.log("response", res);
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
      reset();
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.res.data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">Create an Account</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" {...register("fullName")} placeholder="Herika Rajput" />
            {errors.fullName && <p className="text-sm text-red-500">{errors.fullName.message}</p>}
          </div>

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
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input id="phoneNumber" type="tel" {...register("phoneNumber")} placeholder="+91-9876543210" />
            {errors.phoneNumber && <p className="text-sm text-red-500">{errors.phoneNumber.message}</p>}
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

          {/* <div className="space-y-2">
            <Label htmlFor="profile">Profile</Label>
            <Input accept="image/*" id="profile" type="file" {...register("profile")} />
          </div> */}

          <Button type="submit" className="w-full bg-[#F83002] hover:bg-[#d62600] text-white font-medium">
            Sign Up
          </Button>
        </form>

        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-[#F83002] hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
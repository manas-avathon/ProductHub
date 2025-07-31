import type React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import {z} from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
    name : z.string().min(3,{message : "name must be atleast 3 characters"}).max(20,{message:"name must be less than 20 charaters"}),
    email : z.string().email({message : "please enter a valid email address"}),
    prefferedTime : z.string().optional(),
})

// eslint-disable-next-line react-refresh/only-export-components
export function logData(data: unknown): void {
  console.log(data);
}

type Inputs = z.infer<typeof formSchema>;

const InterestForm : React.FC = () => {

    const{
        register,
        handleSubmit,
        formState : {errors},
        reset,
    } = useForm<Inputs>({
        resolver : zodResolver(formSchema),
    });

    const onSubmit : SubmitHandler<Inputs> = (data) => { 
            logData(data);
            reset({
                name : "",
                email: "",
                prefferedTime: "Before 8 AM",
            });
    };

    return(
        <form onSubmit={handleSubmit(onSubmit)} className="pt-2 pl-8 pr-8">
            <div>
                <label className="font-semibold" >Name* : </label>
                <br/>
                <input {...register("name",{required: true, minLength:3, maxLength:20})} className="border border-black rounded-md mt-2 pl-2 w-full"/>
                {errors.name && <p className="text-red-500 text-sm">*{errors.name.message}*</p>}
            </div>

            <div>
                <label className="font-semibold">Email* : </label>
                <br/>
                <input {...register("email",{required:true})}
                className="border border-black rounded-md mt-2 pl-2 w-full"/>
                {errors.email && <p className="text-red-500 text-sm">*{errors.email.message}*</p>}
            </div>

            <div>
                <label className="font-semibold">Preffered Time (Optional)</label>
                <br/>
                <select {...register("prefferedTime",{required:true})}
                className="border border-black rounded-md mr-4 mt-2 w-full">
                    <option value="Before 8 AM">Before 8 AM</option>
                    <option value="Between 8 AM and 4 PM">Between 8 AM and 4 PM</option>
                    <option value="After 4 PM">After 4 PM</option>
                </select>
            </div>
            <div className="flex">
            <input className="font-semibold border border-black w-full
             rounded-md mt-4 bg-black text-white cursor-pointer" type="submit" />
            </div>
        </form>
    )
};

export default InterestForm;
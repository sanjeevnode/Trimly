"use client";

import CustomButton from "@/components/custom/CustomButton";
import CustomTextField from "@/components/custom/CustomTextField";
import { Edit, SaveAll, X } from "lucide-react";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

export default function Profile() {
    const [isLoading, setIsLoading] = useState(false);
    const [changePassword, setChangePassword] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const { register, handleSubmit } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            cpassword: "",
        },
    });

    const toggleChangePassword = () => {
        if (isLoading || !isEdit) return;
        setChangePassword(!changePassword);
    };

    const toggleEdit = () => {
        if (isLoading) return;
        setIsEdit(!isEdit);
    };

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);
        try {
            if (!isEdit) return; // Prevent submission if not in edit mode
            // Simulate an API call to update user profile
            console.log("Updating profile with data:", data);
            // Here you would typically call your API to update the user profile
            // await api.updateUserProfile(data);
            await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulating network delay
        } catch (error) {
            console.error("Failed to update profile:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="mx-auto max-w-4xl px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold gradient-text">Profile</h1>
                <p className="text-gray-600 mt-2">Manage your account settings</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 px-4 md:px-6">
                <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">

                    <CustomTextField
                        label="Name"
                        placeholder="Enter your name"
                        disabled={isLoading || !isEdit}
                        required
                        {...register("name", { required: true })}
                    />

                    <CustomTextField
                        type="email"
                        label="Email Address"
                        placeholder="Enter your email"
                        disabled={isLoading || !isEdit}
                        required
                        {...register("email", { required: true })}
                    />
                    <div>
                        <input
                            type="checkbox"
                            id="changePassword"
                            className="cursor-pointer"
                            disabled={isLoading || !isEdit}
                            checked={changePassword && isEdit}
                            onChange={toggleChangePassword}
                        />
                        <label htmlFor="changePassword" className="ml-2 cursor-pointer" onClick={toggleChangePassword}>
                            Change Password
                        </label>
                    </div>
                    <div>

                    </div>
                    {changePassword && (
                        <>
                            <CustomTextField
                                type="password"
                                label="New Password"
                                placeholder="Enter new password"
                                disabled={isLoading || !isEdit}
                                required
                                {...register("password", { required: true })}
                            />

                            <CustomTextField
                                type="password"
                                label="Confirm Password"
                                placeholder="Confirm your password"
                                disabled={isLoading || !isEdit}
                                required
                                {...register("cpassword", { required: true })}
                            />
                        </>
                    )}

                </div>

                <div className="w-full flex justify-end">
                    {
                        isEdit ? (
                            <div className="flex gap-2 items-center">
                                <CustomButton
                                    type="submit"
                                    isLoading={isLoading}
                                    loadingText="Saving..."
                                    className="w-fit"
                                >
                                    <div>
                                        <SaveAll className="inline mr-2 w-4 h-4" />
                                        <span className="">Save</span>
                                    </div>
                                </CustomButton>
                                <CustomButton
                                    type="button"
                                    disabled={isLoading}
                                    className="w-fit"
                                    variant="NORMAL"
                                    onClick={toggleEdit}
                                >
                                    <div>
                                        <X className="inline mr-2 w-4 h-4" />
                                        <span className="">Cancel</span>
                                    </div>
                                </CustomButton>
                            </div>
                        ) : (
                            <CustomButton
                                type="button"
                                onClick={toggleEdit}
                                className="w-fit"
                                variant="NORMAL"
                            >
                                <div>
                                    <Edit className="inline mr-2 w-4 h-4" />
                                    <span className="">Edit</span>
                                </div>
                            </CustomButton>
                        )
                    }
                </div>
            </form>
        </div>
    );
}

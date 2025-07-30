"use client"

import CustomButton from '@/components/custom/CustomButton';
import CustomTextField from '@/components/custom/CustomTextField';
import React, { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

export default function Profile() {
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            cpassword: "",
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);
        try {
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
    }

    return (

        <div className="mx-auto max-w-4xl px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold gradient-text">Profile</h1>
                <p className="text-gray-600 mt-2">Manage your account settings</p>
            </div>

            <div className="bg-white rounded shadow-sm border p-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div className="space-y-4">
                            <CustomTextField
                                label='Name'
                                placeholder="Enter your name"
                                disabled={isLoading}
                                required
                                className="w-full"
                                {...register("name", { required: true })}
                            />

                            <CustomTextField
                                type='email'
                                label='Email Address'
                                placeholder="Enter your email"
                                disabled={isLoading}
                                required
                                className="w-full"
                                {...register("email", { required: true })}
                            />

                        </div>




                        <div className="space-y-4">

                            <CustomTextField
                                label='New Password'
                                placeholder="Enter new password"
                                disabled={isLoading}
                                isPassword={true}
                                required
                                className="w-full"
                                {...register("password", { required: true, minLength: 6 })}
                            />

                            <CustomTextField
                                label='Confirm Password'
                                isPassword={true}
                                placeholder="Confirm new password"
                                disabled={isLoading}
                                required
                                className="w-full"
                                {...register("cpassword", {
                                    required: true,
                                })}
                            />
                        </div>
                    </div>

                    <div className='w-full flex justify-end'>
                        <CustomButton
                            type="submit"
                            isLoading={isLoading}
                            loadingText="Saving..."
                            className='w-36'
                        >
                            Save Changes
                        </CustomButton>
                    </div>
                </form>
            </div>
        </div>

    )
}

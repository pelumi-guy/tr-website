// This could be your `src/app/(admin)/properties/create/page.tsx` or similar file
'use client'; // Add this if you are using it in the Next.js App Router

import { useGetIdentity } from '@pankod/refine-core';
import { useForm } from '@pankod/refine-react-hook-form';
import { FieldValues } from 'react-hook-form';
import { useNavigate } from '@pankod/refine-react-router-v6'; // Use this for standard React SPAs
// import { useRouter } from 'next/navigation'; // Use this if you are in Next.js App Router and useNavigate doesn't work

// Import the new, improved Form component
import Form from '../components/common/Form'; // Make sure the path is correct

// Helper function to convert a file to a Base64 string for submission
const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
};

const CreatePropertyPage = () => {
    const navigate = useNavigate();
    const { data: user } = useGetIdentity<{ id: string; email: string; agencyId?: string }>(); // Add types for user

    // 1. --- CORRECTED useForm HOOK ---
    // We add `setValue` and `watch` for our new dynamic form features.
    const {
        refineCore: { onFinish, formLoading },
        register,
        handleSubmit,
        setValue, // Needed for features and photos
        watch,    // Needed for features
    } = useForm(); // This is the correct way to call it for your setup

    // 2. --- onFinishHandler LOGIC FOR THE NEW SCHEMA ---
    const onFinishHandler = async (data: FieldValues) => {
        // The 'data' object now comes with nested fields like data.price.amount

        // Handle multiple photos
        if (!data.photos || data.photos.length === 0) {
            return alert('Please select at least one image');
        }

        // Convert all selected photos to Base64 strings for the backend
        const photoUrls = await Promise.all(
            Array.from(data.photos).map(file => fileToBase64(file as File))
        );

        // 3. --- ASSEMBLE THE FINAL PAYLOAD ---
        // Create the final object that matches your backend schema exactly.
        const payload = {
            ...data,
            photos: photoUrls, // Replace the file list with the array of Base64 strings
            price: {
                amount: data.price.amount,
                currency: 'NGN', // Set default currency
            },
            creator: user?.id, // Get the creator ID from the logged-in user
            agency: user?.agencyId || 'YOUR_DEFAULT_AGENCY_ID_HERE', // Get agency from user or use a default
        };

        // This will send the correctly structured 'payload' to your API
        await onFinish(payload);

        // Refine will handle the redirection on success based on your <Refine> provider setup.
        // If it doesn't, you can manually navigate.
        navigate('/admin/properties');
    };

    return (
        <Form
            type="Create"
            register={register}
            formLoading={formLoading}
            handleSubmit={handleSubmit}
            onFinishHandler={onFinishHandler}
            setValue={setValue} // Pass setValue down to the form
            watch={watch}       // Pass watch down to the form
        />
    );
}

export default CreatePropertyPage;
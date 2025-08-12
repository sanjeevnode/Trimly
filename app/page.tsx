'use client'

import CustomButton from '@/components/custom/CustomButton';
import CustomTextField from '@/components/custom/CustomTextField';
import FeatureCard from '@/components/FeatureCard';
import { userStore } from '@/store/userStore';
import { Link2, Copy, Check, CopyCheck, ChartNoAxesCombined, BadgeCheck, Cpu } from 'lucide-react'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';


export default function Homepage() {

  const { user } = userStore();
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [trimedUrl, setTrimedUrl] = useState<string | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      url: '',
    },
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(trimedUrl || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      if (!user) {
        router.push('/login');
        return;
      }
      setIsLoading(true);
      const { url } = data;
      if (!url) return;
      console.log(data);
      setTimeout(() => setCopied(false), 3000);
      setUrl(url);
      setTrimedUrl('http://short.url');
    } catch (error) {
      console.error(error);
      toast.error('Failed to trim URL');
    }
    finally {
      setIsLoading(false);
      reset();
    }
  }

  return (

    <div className='w-full h-full flex flex-col items-center justify-center px-4 py-8'>
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
          <span className="gradient-text">Shorten Your Links</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4 leading-relaxed">
          Create short, memorable links that are easy to share. Track performance and manage all your URLs with powerful analytics.
        </p>
      </div>


      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white/80 w-full max-w-2xl">
        <CustomTextField
          label="Enter Long URL"
          placeholder="https://example.com/very-long-url"
          icon={<Link2 className=" text-gray-400 w-5 h-5" />}
          required
          disabled={isLoading}
          {...register("url", { required: true })}
        />

        <CustomButton
          type="submit"
          isLoading={isLoading}
          loadingText="processing..."
          className='w-full'
        >
          <span className="font-medium">
            {
              user ?
                <span>Trim Url</span>
                :
                <span>Login to Trim Url</span>
            }
          </span>
        </CustomButton>
      </form>

      {trimedUrl && (
        <div className="mt-8 p-4 sm:p-6 bg-slate-50 rounded border border-slate-100 w-full max-w-2xl flex flex-col space-y-2">
          <h3 className="text-lg font-semibold text-gray-700 flex items-center">
            <Check className="w-5 h-5 mr-2" />
            URL Trimed Successfully!
          </h3>
          <div className="flex flex-row items-center bg-gradient-to-r from-green-50 to-emerald-50 rounded border border-green-200 p-2 space-x-1 text-green-700">

            {
              copied ? <CopyCheck className='w-4 h-4' /> : <Copy onClick={handleCopy} className='cursor-pointer w-4 h-4' />
            }
            <span>
              {trimedUrl}
            </span>
          </div>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Original:</span> <span className="break-all">{url}</span>
          </p>

        </div>
      )}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-15 md:mt-20">
        <FeatureCard
          icon={<Cpu className="w-8 h-9 text-blue-600" />}
          title="Easy to Use"
          description="Simply paste your long URL and get a short link instantly"
          bgColor="bg-gradient-to-br from-blue-50 to-blue-100"
          borderColor="border-blue-200"
          titleColor="text-blue-900"
          descriptionColor="text-blue-700"
        />

        <FeatureCard
          icon={<BadgeCheck className="w-8 h-8 text-green-600" />}
          title="Reliable"
          description="Your short links will always work and redirect properly"
          bgColor="bg-gradient-to-br from-green-50 to-emerald-100"
          borderColor="border-green-200"
          titleColor="text-green-900"
          descriptionColor="text-green-700"
          className="sm:col-span-2 lg:col-span-1"
        />

        <FeatureCard
          icon={<ChartNoAxesCombined className="w-8 h-8 text-purple-600" />}
          title="Analytics"
          description="Track clicks and monitor your link performance"
          bgColor="bg-gradient-to-br from-purple-50 to-purple-100"
          borderColor="border-purple-200"
          titleColor="text-purple-900"
          descriptionColor="text-purple-700"
        />
      </div>

    </div >



  )
}
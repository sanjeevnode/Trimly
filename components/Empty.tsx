import { Settings } from 'lucide-react';
import React from 'react'

type EmptyProps = {
    title: string;
}

function Empty({ title }: EmptyProps) {
    return (
        <div id={title} className='bg-white  h-[80vh] w-full flex  flex-col items-center justify-center gap-4 '>
            <span className='text-3xl font-bold text-gray-800 '>{title}</span>
            <p className='text-gray-600  mt-4'> This Section is in progress, please come back later </p>
            <Settings
                className='text-blue-500 animate-spin'
                style={{ animationDuration: '2s' }}
                size={40}
            />
        </div>
    )
}

export default Empty

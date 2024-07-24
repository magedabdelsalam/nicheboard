'use client'

import Image from 'next/image'
import { useState } from 'react'

export default function Avatar({ url, size }) {
    const [isLoading, setIsLoading] = useState(true)

    return (
        <div className="avatar relative">
            {url ? (
                <>
                    <Image
                        src={url}
                        alt="Avatar"
                        width={size}
                        height={size}
                        className={`rounded-full transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                        style={{width: size, height: size, objectFit: 'cover'}}
                        onLoadingComplete={() => setIsLoading(false)}
                    />
                    {isLoading && (
                        <div className="bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center">
                            <span className="text-gray-500 text-xs">Loading...</span>
                        </div>
                    )}
                </>
            ) : (
                <div
                    className="bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center"
                    style={{width: size, height: size}}
                >
                    <span className="text-gray-500 text-xs">No Image</span>
                </div>
            )}
        </div>
    )
}

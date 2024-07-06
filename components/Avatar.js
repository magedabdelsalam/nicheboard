import Image from 'next/image'

export default function Avatar({ url, size = 40 }) {
    return (
        <div className="avatar">
        {url ? (
            <Image
            src={url}
            alt="Avatar"
            width={size}
            height={size}
            className="rounded-full"
            />
        ) : (
            <div
            className="bg-gray-200 rounded-full flex items-center justify-center"
            style={{ width: size, height: size }}
            >
            <span className="text-gray-500 text-xs">No Image</span>
            </div>
        )}
        </div>
    )
}

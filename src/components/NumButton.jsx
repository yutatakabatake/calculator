function NumButton({ value, handleClick }) {
    return (
        <button
            className="w-12 h-12 bg-gray-500 rounded-full text-white font-black"
            onClick={() => handleClick(value)}>
            {value}
        </button >
    )
}

export default NumButton
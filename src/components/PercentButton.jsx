function PercentButton({ handleClick }) {
    return (
        <button className="w-12 h-12 bg-gray-400 rounded-full text-white font-black"
            onClick={handleClick}>
            %
        </button>
    )
}

export default PercentButton
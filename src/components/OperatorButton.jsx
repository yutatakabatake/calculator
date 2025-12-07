function OperatorButton({ name, handleClick }) {
    return (
        <button
            className="w-12 h-12 bg-orange-400 rounded-full text-white font-black"
            onClick={() => handleClick(name)}>
            {name}
        </button >
    )
}
export default OperatorButton
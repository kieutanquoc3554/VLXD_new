const InputField = ({ type, placeholder, icon, value, onChange }) => {
  return (
    <div className="relative mb-4">
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-2 border border-gray-300 rounded-md bg-transparent text-white focus:outline-none"
      />
      <span className="absolute right-4 top-3 text-white">{icon}</span>
    </div>
  );
};

export default InputField;

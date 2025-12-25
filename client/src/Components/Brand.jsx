const Brand = ({ size = "text-2xl" }) => {
  return (
    <span
      className={`${size} tracking-widest font-bold`}
      style={{ fontFamily: "Pacifico" }}
    >
      Career<span className="text-orange-600">Hub</span>
    </span>
  );
};

export default Brand;

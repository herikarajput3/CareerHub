const SummaryCard = ({ label, value }) => {
    return (
        <div className="rounded-xl border border-base-200 bg-base-100 p-4 text-center">
            <p className="text-2xl font-bold text-orange-600">
                {value}
            </p>
            <p className="text-sm text-base-content/60 mt-1">
                {label}
            </p>
        </div>
    );
};

export default SummaryCard;

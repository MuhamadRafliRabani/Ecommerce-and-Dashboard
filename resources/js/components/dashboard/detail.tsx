const Detail = ({ title, item }: { title: string; item: string | number | undefined }) => {
    return (
        <div className="flex w-full items-center">
            <h2 className="min-w-1/2">{title}:</h2>
            <p>{item}</p>
        </div>
    );
};

export default Detail;

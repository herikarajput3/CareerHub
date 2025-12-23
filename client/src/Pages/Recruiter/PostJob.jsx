import JobForm from "../../Components/JobForm";

const PostJob = () => {

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Post a New Job</h1>
        <p className="text-base-content/60 mt-2 max-w-[65ch]">
          Fill in the details below to publish your job and start receiving applications.
        </p>
      </div>

      <JobForm mode="create" />
    </main>
  );
};

export default PostJob;

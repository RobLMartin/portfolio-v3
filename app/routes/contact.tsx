export default function ContactPage() {
  return (
    <div className="flex flex-col md:flex-row h-full w-full border-b border-t border-neutral-300 mt-20 lg:mt-0 relative">
      <div className="md:w-1/3 border-b md:border-b-0 md:border-r border-neutral-300">
        <div className="p-6 md:p-12 sticky top-20 lg:top-0">
          <h1 className="font-semibold text-2xl leading-[45px]">
            Let's Connect!
          </h1>
          <p className="text-md md:text-lg py-2">
            I'm always open to discussing new projects, creative ideas, or
            opportunities to be part of your visions.
          </p>
        </div>
      </div>
      <div className="md:w-2/3 flex flex-col justify-start p-6 md:p-12 border-neutral-300">
        <div className="text-lg md:text-xl text-left mb-8">
          <p>Greetings,</p>
          <p className="mt-4">
            I am available for discussions regarding potential collaborations,
            project inquiries, or any professional opportunities you believe
            align with my expertise.
          </p>
          <p className="mt-4">
            Please feel free to reach out directly via email for any proposals
            or queries.
          </p>
          <p className="my-4">
            I look forward to the possibility of working together.
          </p>
          <a
            href="mailto:hello@robertmartin.dev"
            className="text-primary-700 bg-primary-50 underline p-4 rounded-md inline-block mt-4 font-semibold"
          >
            hello@robertmartin.dev
          </a>
        </div>
      </div>
    </div>
  );
}

// <div className="md:w-2/3 flex items-center justify-center p-12 border-neutral-300 overflow-y-auto">
//   <p className="text-lg md:text-xl text-center">
//     Feel free to reach out to me directly at{" "}
//     <a
//       href="mailto:hello@robertmartin.dev"
//       className="text-blue-500 hover:underline"
//     >
//       hello@robertmartin.dev
//     </a>
//     .<br />I look forward to hearing from you!
//   </p>
// </div>

// Shared CTA Section component
export default function CTASection({ children }: { children: React.ReactNode }) {
  return (
    <section className="bg-gray-900 text-white flex justify-end py-20 px-8 sm:px-12 lg:px-16">
      <div className="pr-8 sm:pr-12 lg:pr-16 max-w-[55%] text-right">
        {children}
      </div>
    </section>
  );
}

// Shared CTA Section component
export default function CTASection({ children }: { children: React.ReactNode }) {
  return (
    <section className="brand-panel border-y flex justify-end py-16 md:py-20 px-6 sm:px-10 lg:px-16">
      <div className="w-full max-w-2xl text-left md:text-right md:pr-8 lg:pr-16">
        {children}
      </div>
    </section>
  );
}

export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="container py-12">
      <h1 className="text-3xl md:text-4xl">{title}</h1>
      {subtitle ? <p className="text-subtle mt-3 max-w-2xl">{subtitle}</p> : null}
    </div>
  )
}

export function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`container py-10 ${className}`}>{children}</section>
}

export function CTAButton({ href, label }: { href: string; label: string }) {
  return <a href={href} className="inline-block px-5 py-3 rounded-2xl bg-accent text-black">{label}</a>
}









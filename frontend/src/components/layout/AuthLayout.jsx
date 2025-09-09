function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="h-screen flex justify-center items-center bg-[var(--light-gray)]">
      <div className="flex flex-col justify-center gap-8 rounded-xl bg-white border border-[var(--neutral-gray)]/50 shadow-lg p-10 w-full max-w-sm sm:max-w-md md:max-w-lg">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-[var(--neutral-gray)]">
            {subtitle}
          </span>
          <h1 className="text-3xl font-bold">{title}</h1>
        </div>

        {/* Form */}
        {children}

        {/* Footer */}
        {footer && (
          <span className="text-sm text-[var(--neutral-gray)] text-center">
            {footer}
          </span>
        )}
      </div>
    </div>
  );
}

export default AuthLayout;

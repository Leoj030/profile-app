export default function JobPostLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // This layout intentionally omits the global Header and Footer.
    // The job-post page is a public, shareable endpoint with its own minimal footer.
    return <>{children}</>;
}

import Link from "next/link";
import { CallButtons, Container, Heading } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="bg-tint py-20 lg:py-28">
      <Container className="max-w-[720px]">
        <Heading as="h1">Sorry, we couldn’t find that page.</Heading>
        <p className="mt-5 text-[18px] leading-relaxed">It may have moved. Head back to the home page, or call us and we’ll help straight away.</p>
        <CallButtons className="mt-8" onNavy={false} />
        <p className="mt-6">
          <Link href="/" className="font-semibold text-brand hover:underline">
            Back to the home page
          </Link>
        </p>
      </Container>
    </section>
  );
}

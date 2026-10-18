import { site } from "@/lib/site";
import { Icon } from "./icons";

/** Phone users can always call or text in one tap, wherever they are on the page. */
export function MobileCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))] backdrop-blur lg:hidden">
      <div className="mx-auto grid max-w-md grid-cols-2 gap-3">
        <a href={site.phoneHref} className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-brand font-medium text-white">
          <Icon name="phone" size={18} />
          Call us
        </a>
        <a href={site.bookHref} className="inline-flex min-h-13 items-center justify-center rounded-full font-medium text-ink ring-1 ring-ink/20">
          Text us
        </a>
      </div>
    </div>
  );
}

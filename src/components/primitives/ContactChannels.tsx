import { useContent } from '../../content/runtime';
import { MailIcon, PhoneIcon } from './Icons';

export function ContactChannels({ className = '' }: { className?: string }) {
  const { site, ui } = useContent();
  const channels = [
    {
      href: site.contact.phoneHref,
      label: ui.phone,
      value: site.contact.phone,
      icon: PhoneIcon,
      phone: true,
    },
    {
      href: site.links.demoMail,
      label: ui.mail,
      value: site.contact.email,
      icon: MailIcon,
      phone: false,
    },
  ];

  return (
    <div
      className={`mx-auto flex w-full max-w-xl flex-col items-center gap-5 rounded-panel border border-line bg-surface/90 p-6 shadow-card sm:p-7 ${className}`}
    >
      <img
        src={site.contact.wecomQr}
        width={176}
        height={176}
        alt={ui.contactQrAlt}
        className="size-[176px] rounded-2xl bg-white p-2.5"
      />
      <div className="text-center">
        <p className="text-[0.95rem] font-medium">{ui.contactQrTitle}</p>
        <p className="mt-1 text-[0.82rem] leading-relaxed text-ink-muted">
          {ui.contactQrHint}
          <br />
          {ui.contactWecom}
        </p>
      </div>
      <div className="grid w-full grid-cols-1 gap-2.5 sm:grid-cols-2">
        {channels.map((channel) => {
          const Icon = channel.icon;
          return (
            <a
              key={channel.label}
              href={channel.href}
              className="flex min-w-0 items-center gap-3 rounded-2xl border border-line bg-surface-2/80 px-3 py-3 transition-colors hover:border-brand/35 hover:bg-brand-soft"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-bg-elev text-brand shadow-card">
                <Icon className="size-5" />
              </span>
              <span className="min-w-0 text-left">
                <span className="block text-[0.78rem] font-semibold">{channel.label}</span>
                <span
                  className={`mt-0.5 block text-[0.78rem] leading-snug text-ink-muted ${
                    channel.phone ? 'whitespace-nowrap' : '[overflow-wrap:anywhere]'
                  }`}
                >
                  {channel.value.includes('@') ? (
                    <>
                      {channel.value.slice(0, channel.value.indexOf('@') + 1)}
                      <wbr />
                      {channel.value.slice(channel.value.indexOf('@') + 1)}
                    </>
                  ) : (
                    channel.value
                  )}
                </span>
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}

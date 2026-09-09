import { site } from '../../content/site';
import { MailIcon, PhoneIcon } from './Icons';

const channels = [
  {
    href: site.contact.phoneHref,
    label: '电话',
    value: site.contact.phone,
    icon: PhoneIcon,
  },
  {
    href: site.links.demoMail,
    label: '邮件',
    value: site.contact.email,
    icon: MailIcon,
  },
] as const;

export function ContactChannels({ className = '' }: { className?: string }) {
  return (
    <div
      className={`mx-auto flex w-full max-w-xl flex-col items-center gap-5 rounded-panel border border-line bg-surface/90 p-6 shadow-card sm:p-7 ${className}`}
    >
      <img
        src={site.contact.wecomQr}
        width={176}
        height={176}
        alt="线索猎手销售经理企业微信二维码，长按识别"
        className="size-[176px] rounded-2xl bg-white p-2.5"
      />
      <div className="text-center">
        <p className="text-[0.95rem] font-medium">长按识别二维码</p>
        <p className="mt-1 text-[0.82rem] leading-relaxed text-ink-muted">
          添加线索猎手销售经理
          <br />
          企业微信
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
                    channel.label === '电话' ? 'whitespace-nowrap' : '[overflow-wrap:anywhere]'
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

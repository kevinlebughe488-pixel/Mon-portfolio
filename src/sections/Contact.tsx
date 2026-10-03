import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Check, Copy, Mail, MapPin } from 'lucide-react'
import { useRef } from 'react'
import { Button } from '../components/ui/Button'
import { SectionHeader } from '../components/ui/SectionHeader'
import { Tile } from '../components/ui/Tile'
import { contact, profile, sections, socials } from '../data/profile'
import { useCopyToClipboard } from '../hooks/useCopyToClipboard'

/**
 * Contact: e-mail feature tile (mailto + copy with live feedback), phone tile with full-row tel: links,
 * optional socials row (only when the list is not empty), and a bottom glow echoing the hero.
 */
export default function Contact() {
  const s = sections.contact
  const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(profile.emailSubject)}`

  return (
    <section id={s.id} aria-labelledby={`${s.id}-title`} className="section-pad relative isolate overflow-hidden">
      <div aria-hidden className="bg-glow-bottom pointer-events-none absolute inset-0 -z-10" />
      <div className="container-page">
        <SectionHeader index={s.index} label={s.label} title={s.title} intro={s.intro} titleId={`${s.id}-title`} />
        <div className="bento">
          <EmailTile mailto={mailto} />
          <PhoneTile />
          {socials.length > 0 && (
            <Tile rowIndex={2} className="sm:col-span-6 lg:col-span-12">
              <p className="type-eyebrow text-fg-3">{contact.socialsEyebrow}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {socials.map((social) => (
                  <li key={social.href}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex h-11 items-center gap-2 rounded-full border border-line bg-surface px-4 text-sm font-medium text-fg transition-colors hover:bg-surface-2"
                    >
                      {social.label}
                      <ArrowUpRight aria-hidden className="size-4 text-fg-3" strokeWidth={1.75} />
                    </a>
                  </li>
                ))}
              </ul>
            </Tile>
          )}
        </div>
      </div>
    </section>
  )
}

function EmailTile({ mailto }: { mailto: string }) {
  const reduce = useReducedMotion()
  const { copied, copy } = useCopyToClipboard(2000)
  const emailRef = useRef<HTMLParagraphElement>(null)

  const onCopy = async () => {
    const ok = await copy(profile.email)
    if (ok || !emailRef.current) return
    // Clipboard refused: select the address so it can be copied by hand.
    const range = document.createRange()
    range.selectNodeContents(emailRef.current)
    const selection = window.getSelection()
    selection?.removeAllRanges()
    selection?.addRange(range)
  }

  return (
    <Tile feature rowIndex={0} className="flex flex-col sm:col-span-6 lg:col-span-7">
      <span className="inline-flex w-fit items-center gap-2 rounded-full bg-success-soft px-3 py-1.5 text-[0.8125rem] font-medium text-success">
        <span aria-hidden className="relative flex size-2">
          <span className="animate-pulse-ring absolute inset-0 rounded-full bg-success" />
          <span className="relative size-2 rounded-full bg-success" />
        </span>
        {contact.availability}
      </span>

      <p className="type-eyebrow mt-8 text-fg-3 sm:mt-10">{contact.eyebrow}</p>
      <p ref={emailRef} className="type-email mt-3 text-fg">
        {profile.email}
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap">
        <Button href={mailto} icon={Mail} arrow={false} className="w-full sm:w-auto">
          {contact.send}
        </Button>
        <Button variant="secondary" onClick={onCopy} arrow={false} className="w-full sm:w-auto sm:min-w-[13.5rem]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={copied ? 'copied' : 'copy'}
              className="inline-flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.15 }}
            >
              {copied ? (
                <Check aria-hidden className="size-[18px] text-success" strokeWidth={2} />
              ) : (
                <Copy aria-hidden className="size-[18px]" strokeWidth={1.75} />
              )}
              {copied ? contact.copied : contact.copy}
            </motion.span>
          </AnimatePresence>
        </Button>
      </div>
      <p aria-live="polite" className="sr-only">
        {copied ? contact.copied : ''}
      </p>
    </Tile>
  )
}

function PhoneTile() {
  return (
    <Tile rowIndex={1} className="flex flex-col sm:col-span-6 lg:col-span-5">
      <p className="type-eyebrow text-fg-3">{contact.phoneEyebrow}</p>
      <ul className="mt-4 divide-y divide-line-subtle">
        {profile.phones.map((phone) => (
          <li key={phone.tel}>
            <a
              href={`tel:${phone.tel}`}
              className="group -mx-3 flex min-h-14 items-center justify-between gap-4 rounded-xl px-3 py-2 transition-colors duration-200 hover:bg-surface-2"
            >
              <span className="text-base font-semibold text-fg tabular-nums">{phone.display}</span>
              <span className="type-meta flex shrink-0 items-center gap-1.5 text-fg-3">
                {contact.call}
                <ArrowRight
                  aria-hidden
                  className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                  strokeWidth={1.75}
                />
              </span>
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-auto flex items-center gap-2 border-t border-line-subtle pt-5 text-sm text-fg-3 max-sm:mt-6">
        <MapPin aria-hidden className="size-4 shrink-0" strokeWidth={1.75} />
        {profile.location} · {profile.utcLabel}
      </p>
    </Tile>
  )
}

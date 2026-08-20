import { Link } from 'react-router-dom'
import { SelvedgeRule } from '../SelvedgeRule'
import { Logo, type FirmId } from '../brand/Logo'

export function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="container-site">
        <SelvedgeRule />
        
        {/* House wordmark above column grid */}
        <div className="pt-16 pb-8">
          <Logo variant="wordmark" height={32} className="text-paper" decorative />
        </div>

        <div className="grid grid-cols-1 gap-12 pb-20 pt-8 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <FirmColumn
            firm="jdt"
            line="GST 24ABCDE1234F1Z5"
            address={['Plot 17, GIDC Sachin', 'Surat 394230, Gujarat, India']}
          />
          <FirmColumn
            firm="jdw"
            line="GST 08ABCDE5678G1Z9"
            address={['B-22, Sitapura Industrial Area', 'Jaipur 302022, Rajasthan, India']}
          />
          <Column title="The house">
            <FooterLink to="/">Home</FooterLink>
            <FooterLink to="/sarees">Sarees</FooterLink>
            <FooterLink to="/lehengas">Lehengas</FooterLink>
            <FooterLink to="/collections">Collections</FooterLink>
            <FooterLink to="/craft">Craft</FooterLink>
            <FooterLink to="/partner">Partner with us</FooterLink>
            <FooterLink to="/contact">Contact</FooterLink>
            <FooterLink to="/enquiry">Enquiry basket</FooterLink>
          </Column>
          <Column title="Contact">
            <li className="font-utility text-xs text-paper/70">Wholesale · +91 95867 21213</li>
            <li className="font-utility text-xs text-paper/70">Sarees · jananidreamstexfab@gmail.com</li>
            <li className="font-utility text-xs text-paper/70">Lehengas · janani.sales.12@gmail.com</li>
            <li className="font-utility text-xs text-paper/70">Showrooms · Surat · Jaipur</li>
            <li className="mt-4 flex gap-4 font-utility text-xs">
              <Link to="/partner" className="text-paper/70 hover:text-paper underline decoration-zari/60 underline-offset-4">
                Catalogue 2026 (PDF)
              </Link>
            </li>
          </Column>
        </div>
      </div>
      <div className="border-t border-paper/15">
        <div className="container-site flex flex-col gap-2 py-6 font-utility text-xs text-paper/60 sm:flex-row sm:items-center sm:justify-between">
          <span>Janani, established 2016. Two firms, one loom-room.</span>
          <span>© {new Date().getFullYear()} Janani · All rights reserved</span>
        </div>
      </div>
    </footer>
  )
}

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="eyebrow mb-5 text-paper/60">{title}</p>
      <ul className="space-y-2 text-sm">{children}</ul>
    </div>
  )
}

function FirmColumn({
  firm,
  line,
  address
}: {
  firm: FirmId
  line: string
  address: string[]
}) {
  return (
    <div>
      <Logo variant="lockup" firm={firm} height={20} className="text-paper" decorative />
      <p className="mt-4 font-utility text-xs text-paper/60">{line}</p>
      <div className="mt-4 text-sm leading-relaxed text-paper/80 space-y-1">
        {address.map((line, i) => (
          <p key={i}>
            {line}
          </p>
        ))}
      </div>
    </div>
  )
}

function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <li>
      <Link to={to} className="text-paper/80 hover:text-paper focus-visible:text-paper hover:underline decoration-zari/60 underline-offset-4">
        {children}
      </Link>
    </li>
  )
}

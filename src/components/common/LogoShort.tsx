import Link from "next/link"

export default function LogoShort() {
  return (
    <Link href="/">
      <div className="font-brand flex text-2xl/5 font-semibold tracking-tight">
        <p className="text-primary-600">w</p>
        <p className="text-secondary-600 -ml-1">f</p>
      </div>
    </Link>
  )
}

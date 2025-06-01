import Link from "next/link"

export default function LogoShort() {
  return (
    <div className="w-fit">
      <Link href="/" className="transition-opacity duration-300 hover:opacity-75">
        <div className="font-brand flex text-2xl/5 font-semibold tracking-tight sm:text-3xl/6">
          <p className="text-primary-600 dark:text-primary-500">w</p>
          <p className="text-secondary-600 dark:text-secondary-500 -ml-0.5">f</p>
        </div>
      </Link>
    </div>
  )
}

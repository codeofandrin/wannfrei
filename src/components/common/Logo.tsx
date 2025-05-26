import Link from "next/link"

export default function Logo() {
  return (
    <Link href="/" className="transition-opacity duration-300 hover:opacity-75">
      <div className="font-brand flex text-2xl/5 font-semibold tracking-tight sm:text-3xl/6.5">
        <div className="flex flex-col text-right">
          <p>
            <span className="text-primary-600">w</span>ann
          </p>
          <p>
            <span className="text-secondary-600">f</span>rei
          </p>
        </div>
        <div className="relative ml-1">
          <p className="absolute bottom-0 mt-auto text-neutral-400">.ch</p>
        </div>
      </div>
    </Link>
  )
}

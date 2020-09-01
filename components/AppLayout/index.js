import styles, { globalStyles } from "./styles"

import Create from "components/Icons/Create"
import Search from "components/Icons/Search"
import Users from "components/Icons/Users"
import HomeUi from "components/Icons/HomeUi"

import Link from "next/link"

export default function AppLayout({ children }) {
  return (
    <>
      <div>
        <main>
          <>{children}</>
          <nav>
            <Link href="/compose/tweet">
              <a>
                <Create width={32} height={32} stroke="#09f" />
              </a>
            </Link>
            <Link href="/home">
              <a>
                <HomeUi width={32} height={32} stroke="#09f" />
              </a>
            </Link>
            <Link href="/compose/tweet">
              <a>
                <Search width={32} height={32} stroke="#09f" />
              </a>
            </Link>
            <Link href="/card">
              <a>
                <Users width={32} height={32} stroke="#09f" />
              </a>
            </Link>
          </nav>
        </main>
      </div>
      <style jsx>{styles}</style>
      <style jsx global>
        {globalStyles}
      </style>
    </>
  )
}

import React from "react"
import Head from "next/head"
import Link from "next/link"

export default function Layout({ children }) {

  const toggleMenu = () => {
    document.getElementById('navbarSupportedContent').classList.toggle('show');
  }

  return (
    <div>
      <Head>
        <title>Lulufremen</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ width: '100vw', position: 'fixed', left: 0, top: 0, paddingLeft: '5vw' }}>
        <span className="navbar-brand">lulufremen</span>
        <button className="navbar-toggler" type="button" data-toggle="collapse" onClick={toggleMenu}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link href="/" className="nav-link">Home</Link>
            </li>

          </ul>
        </div>
      </nav>
      <main style={{ marginTop: '100px', marginLeft: '5vw' }}>{children}</main>
    </div>
  )
}
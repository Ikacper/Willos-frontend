import React from 'react'
import { NavLink } from 'react-router-dom'

import styles from './Navbar.module.css'

function Navbar() {
    return (
        <ul className={styles.navLinks}>
            <li className={styles.navLink}>
                <NavLink exact to='/' activeClassName={styles.selected}>
                    <div className={styles.link}>
                        Homepage
                    </div>
                </NavLink>
            </li>

            <li className={styles.navLink}>
                <NavLink exact to='/about' activeClassName={styles.selected}>
                    <div className={styles.link}>
                        About
                    </div>
                </NavLink>
            </li>

            <li className={styles.navLink}>
                <NavLink exact to='/search' activeClassName={styles.selected}>
                    <div className={styles.link}>
                        Search
                    </div>
                </NavLink>
            </li>
        </ul>
    )
}

export default Navbar

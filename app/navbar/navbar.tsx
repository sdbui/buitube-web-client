import Link from "next/link";
import Image from "next/image";
import styles from "./navbar.module.css";

export default function Navbar () {
    return (
        <nav className={styles.nav}>
            <Link href="/">
                <Image src="/youtube.svg" alt="youtube logo" width={90} height={50}></Image>
            </Link>
            <Link href="/watch"> Watch </Link>
        </nav>
    )
}
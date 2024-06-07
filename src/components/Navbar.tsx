import Link from 'next/link';


export default function Navbar() {
    const data = [
        {
            title: "About",
            href: "/about",
        },
        {
            title: "Skills",
            href: "/skills",
        },
        {
            title: "Projects",
            href: "/projects",
        },
        {
            title: "Blog",
             href: "/blog",
        },
        {
            title: "Contact",
            href: "/contact",
        },
        {
            title: "Resume",
            href: "/resume",
        },
    ];
    return (
        <nav className='flex justify-end items-center flex-wrap relative px-20 py-10'>
            <ul className='flex items-center gap-x-8'>
                {data.map((link,id) => (
                    <li key = {id}>
                        <Link
                            href={link.href}
                            className='font-xl dark:text-white text-slate-100  hover:text-green-200 laser duration-200 text-base'>
                                {link.title}
                            </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
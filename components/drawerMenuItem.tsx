import Link from 'next/link';

type Props = { url: string; description: string };

export default function DrawerMenuItem(props: Props) {
    return (
        <li className="ml-4">
            <Link href={props.url}>{props.description}</Link>
        </li>
    );
}

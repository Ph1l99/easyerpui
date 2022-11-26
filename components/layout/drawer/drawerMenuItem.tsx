import Link from 'next/link';

type Props = {
    url?: string;
    description: string;
};

export default function DrawerMenuItem(props: Props) {
    return (
        <li>
            {props.url && <Link href={props.url!}>{props.description}</Link>}
            {!props.url && (
                <p className="cursor-default">{props.description}</p>
            )}
        </li>
    );
}

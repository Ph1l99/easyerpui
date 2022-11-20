import { useAuth } from '../../components/useAuth';

export default function Me() {
    const { user } = useAuth();

    return <p>The user&apos;s name is {user?.name}</p>;
}

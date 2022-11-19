export default function InputField(props: any) {
    return (
        <input
            type={props.type}
            className="p-2 bg-zinc-200 rounded-lg placeholder-zinc-700 w-full outline-none focus:outline focus:outline-offset-4 focus:outline-white"
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
        />
    );
}

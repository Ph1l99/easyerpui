import React, { HTMLProps } from 'react';

type Props = {} & HTMLProps<HTMLInputElement>;
type Ref = HTMLInputElement;

const InputField = React.forwardRef<Ref, Props>(function input(props, ref) {
    return (
        <input
            ref={ref}
            {...props}
            className="p-2 bg-zinc-200 rounded-lg placeholder-zinc-700 w-full outline-none focus:outline focus:outline-offset-4 focus:outline-white"
        />
    );
});
export default InputField;

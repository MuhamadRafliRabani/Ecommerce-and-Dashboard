import { Input } from '../ui/input';
import { Label } from '../ui/label';
import InputError from './input-error';

type InputGroupProps = {
    label: string;
    required?: boolean;
    error?: string;
} & React.ComponentProps<typeof Input>;

const InputGroup = ({ label, required, error, ...props }: InputGroupProps) => (
    <div>
        <Label htmlFor={props.name}>
            {label} {required && <span className="text-red-400">*</span>}
        </Label>
        <Input {...props} />
        {error && <InputError message={error} />}
    </div>
);

export default InputGroup;

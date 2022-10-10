export = CustomSelect;

type SelectOptions = {
    key?: string;
    value: string;
    text: string;
    icon?: React.ReactElement;
    [x: string]: any;
};

type CustomSelectProps = {
    label: string;
    value: string;
    onChange: ({ name, value }: { name: string; value: string }) => void;
    error?: string;
    name: string;
    formControlProps?: { [x: string]: any };
    fullWidth?: boolean;
    options: SelectOptions[];
    [x: string]: any;
};

/**
 * Custom select component, wrapper for FormControl, Select, and InputLabel
 * @param label Used as key for t(label) in InputLabel
 * @param name Field value
 * @param value Value for controlled component
 * @param onChange returns {name, value}
 * @param options Array used to build select options. Each item is an object with {key?, value, text, icon?, ...etc}
 * @param error If passed, displays FormHelperText with t(error)
 * @param formControlProps Props to be passed to <FormControl>
 * @param fullWidth If true, FormControl set to fullWidth
 */
declare function CustomSelect({
    label,
    value,
    onChange,
    error,
    name,
    formControlProps = {},
    fullWidth = true,
    options = [],
    ...rest
}: CustomSelectProps): React.ReactElement;

import { ChangeEvent, FormEvent, SetStateAction, useState } from 'react';

// validation item
type Validation = {
    required?: {
        value: boolean;
        message: string;
    };
    pattern?: {
        value: string;
        message: string;
    };
    custom?: {
        isValid: (value: string) => boolean;
        message: string;
    };
};

/*
    NOTE:
    - validation items stored in an object, which keys are the same as the form data's keys (Records)
    - all keys isn't required -> <Partial> type
*/
type Validations<T extends {}> = Partial<Record<keyof T, Validation>>;
/*
    - errors are record whose keys should match the keys of the form data
    - <Partial> allows empty objects {}
*/
type ErrorRecord<T> = Partial<Record<keyof T, string>>;

// form logic
const useForm = <T extends Record<keyof T, any> = {}>(options?: {
    // We will soon see how to create this interface
    validations?: Validations<T>;
    // Allows a subset of T
    initialValues?: Partial<T>;
    onSubmit?: () => void;
}) => {
    const [data, setData] = useState<T>((options?.initialValues || {}) as T); // form data
    const [errors, setErrors] = useState<ErrorRecord<T>>({}); // throwing error (validation)

    // set initial values from outside (sample: useEffect from db)
    const handleInitValues = (values: SetStateAction<T>) => {
        setData(values);
    };

    // input event handling (typing)
    const handleChange =
        <S extends unknown>(key: keyof T, sanitizeFn?: (value: string) => S) =>
        (e: ChangeEvent<HTMLInputElement & HTMLSelectElement>) => {
            const isCheckbox = e.target.type === 'checkbox';
            // isCheckbox — detect checkbox and work with true/false
            // key — form attribute for managing
            // sanitizeFn — optional handler (for example, transfer int to str)
            const value = isCheckbox
                ? e.target.checked
                : sanitizeFn
                ? sanitizeFn(e.target.value)
                : e.target.value;
            // change data of certain key (form item) in state {}
            setData({
                ...data,
                [key]: value,
            });
        };

    // sending completed form
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validations = options?.validations;
        // check whether validators specified
        if (validations) {
            let valid = true; // default validator state (good)
            const newErrors: ErrorRecord<T> = {}; // default errors
            // for each key check validators
            for (const key in validations) {
                const value = data[key]; // get key value
                const validation = validations[key]; // get key validators
                // CHECK REQUIRED
                if (validation?.required?.value && !value) {
                    valid = false; // validator rule is failed
                    newErrors[key] = validation?.required?.message; // add error msg to erros obj
                    // regexp and custom have equal logic (below)
                }
                // CHECK REGEXP
                const pattern = validation?.pattern;
                if (pattern?.value && !RegExp(pattern.value).test(value)) {
                    valid = false;
                    newErrors[key] = pattern.message;
                }
                // CHECK CUSTOM VALIDATORS
                const custom = validation?.custom;
                if (custom?.isValid && !custom.isValid(value)) {
                    valid = false;
                    newErrors[key] = custom.message;
                }
            }

            // if some validation rules failed -> update errors state
            if (!valid) {
                setErrors(newErrors);
                return;
            }
        }

        setErrors({}); // make errors state empty (there aren't validators)

        if (options?.onSubmit) {
            options.onSubmit();
        }
    };

    // reset field or all form
    const handleReset = (key?: keyof T) => {
        // NEED TO MAKE array of keys to reduce count of state changes to one
        if (key) {
            // change data of certain key
            // prevState allows us to run reset func sequentially several times
            setData((prevState) => ({
                ...prevState,
                [key]: options?.initialValues ? options.initialValues[key] : '',
            }));
        } else {
            // if no key arg -> reset all form
            setData((options?.initialValues || {}) as T);
        }
    };

    return {
        data,
        handleChange,
        handleSubmit,
        handleReset,
        handleInitValues,
        errors,
    };
};

export default useForm;

import type { Control, FieldValues, Path } from 'react-hook-form';
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';

interface Item {
    id: string;
    label: string;
}

interface CheckBoxFilterProps <TFormValues extends FieldValues> {
    control: Control<TFormValues>;
    name: Path<TFormValues>;
    items: readonly Item[];
    description?: string;
}

export default function CheckBoxFilter<TFormValues extends FieldValues>
({ control, name, items, description }: CheckBoxFilterProps<TFormValues>) {
  return (
    <div className="flex flex-col md:flex-row justify-start ms-8 gap-1 md:gap-16">
        {description && <FormDescription className='select-none'>{description}</FormDescription>}
            {items.map((item) => (
            <FormField
                key={item.id}
                control={control}
                name={name}
                render={({ field }) => {
                const currentValues = Array.isArray(field.value) ? field.value : [];

                return (
                    <FormItem
                        key={item.id}
                        className="flex flex-row md:flex-row items-center gap-2"
                    >
                        <FormControl>
                            <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                                return checked
                                ? field.onChange([...currentValues, item.id])
                                : field.onChange( currentValues.filter((value) => value !== item.id))
                            }}
                            />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                            {item.label}
                        </FormLabel>
                    </FormItem>
                )
                }}
            />
        ))}
    </div>
  )
}
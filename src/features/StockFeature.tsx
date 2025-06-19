import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormMessage,
} from "@/components/ui/form";
import SearchBar from "@/components/ui/custom/SearchBar";
import CheckBoxFilter from "@/components/ui/custom/CheckBoxFilter";

const items = [
  {
    id: "lorry",
    label: "Lorry",
  },
  {
    id: "warehouse",
    label: "Warehouse",
  },
] as const

const FormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
})

export default function StockFeature() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: ["lorry", "warehouse"],
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // toast("You submitted the following values", {
    //   description: (
    //     <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // })
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <div className="flex flex-row mb-4">
            <SearchBar />
          </div>
          <CheckBoxFilter
            control={form.control}
            name="items"
            items={items}
            description="Display items in:"
          />
          <FormMessage  />
        </div>
      </form>
    </Form>
  );
}
